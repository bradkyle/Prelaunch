from rethinkdb import RethinkDB
r = RethinkDB()

from .json_encoder import DatetimeJsonEncoder
from .response import ok
from .rethinkdb import RethinkResource
from marshmallow import Schema, fields
from enum import Enum
import uuid
from datetime import datetime


class Language(Enum):
    ENGLISH = 1
    MANDARIN = 2
    RUSSIAN = 3
    KOREAN = 4
    JAPANESE = 5
    SPANISH = 6
    FRENCH = 7
    HINDI = 8
    ARABIC = 9
    BENGALI = 10

class Card():
    def __init__(self, **kwargs):
        self.uid = uuid.uuid1()
        self.email = kwargs.get('email', None)
        self.name = kwargs.get('name', None)
        self.surname = kwargs.get('surname', None)
        self.referrer_id = kwargs.get('referrer_id', None)
        self.referral_source = kwargs.get('referral_source', None)
        self.referral_url = kwargs.get('referral_url', None)
        self.referrals = kwargs.get('referrals', 0)
        self.ip_address = kwargs.get('ip_address', None)
        self.card_agent = kwargs.get('card_agent', None)
        self.language = kwargs.get('language', None)
        self.country = kwargs.get('country', None)
        self.region = kwargs.get('region', None)
        self.cookies = kwargs.get('cookies', None)
        self.email_sent = kwargs.get('email_sent', False)
        self.created_at = datetime.utcnow()

    @staticmethod
    def schema():
        class CardSchema(Schema):
            uid = fields.Str(required=True)
            email = fields.Email(required=True)
            ip_address = fields.Str(required=True)
            name = fields.Str()
            surname = fields.Str()
            referrer_id = fields.Str()
            referral_source = fields.Str()
            referral_url = fields.Str()
            referrals_count = fields.Int()
            ip_address = fields.Str()
            card_agent = fields.Str()
            language = fields.Int()
            country = fields.Str()
            region = fields.Str()
            cookies = fields.Str()
            email_sent = fields.Boolean()
            created_at = fields.DateTime()
        return CardSchema

    @property
    def was_referred(self):
        return self.referrer_id != None

    @staticmethod
    def from_json(data):
        pass

    def to_record(self):
        pass

    def to_sanitized(self):
        pass

class Cards(RethinkResource):
    def __init__(self, *args, **kwargs):
        RethinkResource.__init__(self, *args, **kwargs)
        self._table_name = "cards"
        self.factory.create_table(self._table_name, ["epoch_datetime"])
        self.json_encoder = DatetimeJsonEncoder()
        self.table_ref = r.table(self._table_name)

    def encode(self, d: dict):
        return self.json_encoder.encode(d)

    def parse(self):
        pass

    def get_table(self):
        with self.conn as conn:
            return dict(self.table_ref.run(conn))

    def _incriment_card_referrals(self, card_id):
        """
        Increments the cards total referral count by one and then updates that
        card in the database.
        """
        with self.conn as conn:
           self.table_ref\
           .filter({"id": card_id})\
           .update({"referrals": r.row["referrals"]+1})\
           .run(conn)

    def _card_exists(self, card):
        """
        Returns true if the card email is located in the database else returns false.
        """
        pass

    def _create_card(self, card):
        """
        Checks to see if the card already exists, and throws error if it
        does, else
        Creates a card and adds this card to the database provided
        all validations have been successfull and then sends a referral email
        via sendgrid such that the campaign is propagated.
        Checks if the card was referred by another card and increments that
        referrers referral count.
        """
        if not self._card_exists(card):
            if card.was_referred:
                self._incriment_card_referrals(card.referrer_id)

            with self.conn as conn:
                self.table_ref\
                .insert(card.to_record())\
                .run(conn)
        else:
            pass #TODO throw error

    def _udpate_card(self, card):
        """
        Validates then updates a specific cards details then reinserts that 
        card back into the database.
        """
        if self._card_exists(card):
            with self.conn as conn:
                self.table_ref\
                .filter({"id": card.id})\
                .update(card.to_record())\
                .run(conn)
        else:
            pass #TODO throw error

    def _get_cards_by_rank(self, num=None, asc=False):
        """
        Get's a list of the top cards ordered by rank with a limit given by 
        num.
        """

        if asc:
            oby = r.asc("referrals")
        else:
            oby = r.desc("referrals")

        with self.conn as conn: #TODO internal server error
            if num is not None:
                return self.table_ref\
                .order_by(oby)\
                .run(conn)
            else:
                return self.table_ref\
                .order_by(oby)\
                .run(conn)

    def _get_card_rank(self, card):
        """
        Derives the rank of a given card id. #TODO update to allow for rank 
        """
        if self._card_exists(card):
            with self.conn as conn:
                return self.uref\
                .filter({"id": card.id})\
                .run(conn)
        else:
            pass # TODO raise error

    def on_get(self, req, resp):
        """A cute furry animal endpoint.
        ---
        description: Get a random pet
        responses:
            200:
                description: A pet to be returned
                schema: CardSchema
        """
        resp.body = self.encode(self.get_table())

    def on_post(self, req, resp):
        """A cute furry animal endpoint.
        ---
        description: Get a random pet
        responses:
            200:
                description: A pet to be returned
                schema: CardSchema
        """
        resp.body = self.encode(self.get_table())

    def on_put(self, req, resp):
        """A cute furry animal endpoint.
        ---
        description: Get a random pet
        responses:
            200:
                description: A pet to be returned
                schema: CardSchema
        """
        resp.body = self.encode(self.get_table())

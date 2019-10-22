from rethinkdb import RethinkDB
r = RethinkDB()

from .json_encoder import DatetimeJsonEncoder
from .response import ok
from .rethinkdb import RethinkResource
from .util import _error, _info, _debug, _warning

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

class User():
    def __init__(self, **kwargs):
        self.id = uuid.uuid1()
        self.email = kwargs.get('email', None)
        self.name = kwargs.get('name', None)
        self.surname = kwargs.get('surname', None)
        self.referrer_id = kwargs.get('referrer_id', None)
        self.referral_source = kwargs.get('referral_source', None)
        self.referral_url = kwargs.get('referral_url', None)
        self.referrals = kwargs.get('referrals', 0)
        self.ip_address = kwargs.get('ip_address', None)
        self.user_agent = kwargs.get('user_agent', None)
        self.language = kwargs.get('language', None)
        self.country = kwargs.get('country', None)
        self.region = kwargs.get('region', None)
        self.cookies = kwargs.get('cookies', None)
        self.email_sent = kwargs.get('email_sent', False)
        self.created_at = datetime.datetime.utcnow()

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


class Users(RethinkResource):
    def __init__(self, *args, **kwargs):
        RethinkResource.__init__(self, *args, **kwargs)
        self._table_name = "users"
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

    def _incriment_user_referrals(self, user_id):
        """
        Increments the users total referral count by one and then updates that
        user in the database.
        Used when creating a new user, if that new user was referred by someone
        then the refferer's referral count will be incremented.
        """
        with self.conn as conn:
           self.table_ref\
           .filter({"id": user_id})\
           .update({"referrals": r.row["referrals"]+1})\
           .run(conn)

    def _user_exists(self, user):
        """
        Returns true if the user email is located in the database else returns false.
        """
        pass

    def _create_user(self, user):
        """
        Checks to see if the user already exists, and throws error if it
        does, else
        Creates a user and adds this user to the database provided
        all validations have been successfull and then sends a referral email
        via sendgrid such that the campaign is propagated.
        Checks if the user was referred by another user and increments that
        referrers referral count.
        """
        if not self._user_exists(user):
            if user.was_referred:
                self._incriment_user_referrals(user.referrer_id)

            with self.conn as conn:
                self.table_ref\
                .insert(user.to_record())\
                .run(conn)
        else:
            pass #TODO throw error

    def _udpate_user(self, user):
        """
        Validates then updates a specific users details then reinserts that 
        user back into the database.
        """
        if self._user_exists(user):
            with self.conn as conn:
                self.table_ref\
                .filter({"id": user.id})\
                .update(user.to_record())\
                .run(conn)
        else:
            pass #TODO throw error

    def _get_users_by_rank(self, num=None, asc=False):
        """
        Get's a list of the top users ordered by rank with a limit given by 
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

    def _get_user_rank(self, user):
        """
        Derives the rank of a given user id. #TODO update to allow for rank 
        """
        if self._user_exists(user):
            with self.conn as conn:
                return self.uref\
                .filter({"id": user.id})\
                .run(conn)
        else:
            pass # TODO raise error

    def _send_referral_mail(self, user):
        #TODO multiple languages

        message = Mail(
            from_email=self.admin_email,
            to_emails=user.email,
            subject='Thanks, we have added your email address to the signup queue.',
            html_content='<strong>and easy to do anywhere, even with Python</strong>'
        )

        try: #TODO logging + time
            response = self.sg.send(message)
            if response.status_code==200:
                self.udpate_user(user, email_sent=True)
                _info("email successfully sent to user: {email}".format(
                    email=user.email
                ))
        except Exception as e:
                _error("Email was not sent to user: {email}".format(
                    email=user.email
                ), e)

    def on_get(self, req, resp):
        resp.body = self.encode(self.get_table())

    def on_post(self, req, resp):
        resp.body = self.encode(self.get_table())

    def on_put(self, req, resp):
        resp.body = self.encode(self.get_table())

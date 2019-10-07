from rethinkdb import RethinkDB
r = RethinkDB()

from .json_encoder import DatetimeJsonEncoder
from .response import ok
from .rethinkdb import RethinkResource


class Users(RethinkResource):
    def __init__(self, *args, **kwargs):
        RethinkResource.__init__(self, *args, **kwargs)
        self._table_name = "logs"
        self.factory.create_table(self._table_name, ["epoch_datetime"])
        self.json_encoder = DatetimeJsonEncoder()

    def encode(self, d: dict):
        return self.json_encoder.encode(d)

    def get_table(self):
        with self.conn as conn:
            return dict(r.table(self._table_name).run(conn))

    def on_get(self, req, resp):
        resp.body = self.encode(self.get_table())

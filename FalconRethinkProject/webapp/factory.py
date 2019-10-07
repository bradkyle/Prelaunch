import falcon
import yaml
from apispec import APISpec
from falcon_apispec import FalconPlugin

from .api import MyAPI
from .users import Users
from .default_config import default_config
from .rethinkdb import RethinkDBFactory

index_names = ["epoch_datetime"]


def read_conf(conf_file):
    try:
        dat = open(conf_file, "r", encoding="utf-8").read()
        conf = yaml.load(dat)
    except:
        conf = {}

    if conf is None:
        conf = {}
    for k, v in default_config.items():
        conf.setdefault(k, v)
    return conf


def create_app(config_filename=None):
    if config_filename is None:
        conf = default_config.copy()
    else:
        conf = read_conf(config_filename)
    app = falcon.API()
    rethink_factory = RethinkDBFactory(**conf["rethinkdb"])
    app.add_route("/myresource", MyAPI(rethink_factory))
    app.add_route("/users", Users(rethink_factory))
    return app

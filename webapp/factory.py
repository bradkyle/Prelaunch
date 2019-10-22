import falcon
import yaml
from apispec import APISpec
from falcon_apispec import FalconPlugin

from .api import MyAPI
from .users import Users, User
from .cards import Cards, Card
from .default_config import default_config
from .rethinkdb import RethinkDBFactory
from falcon_apispec import FalconPlugin
from marshmallow import Schema, fields
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin

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

    user_resource = Users(rethink_factory)
    card_resource = Cards(rethink_factory)

    app.add_route("/users", user_resource)
    app.add_route("/cards", card_resource)

    # Create an APISpec
    spec = APISpec(
        title='Swagger Prelaunch Spec',
        version='1.0.0',
        openapi_version='2.0',
        plugins=[
            FalconPlugin(app),
            MarshmallowPlugin(),
        ],
    )

    # Register entities and paths
    spec.components.schema('User', schema=User.schema())
    spec.components.schema('Card', schema=Card.schema())

    spec.path(resource=user_resource)
    spec.path(resource=card_resource)

    return app, spec

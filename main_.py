import uuid
from enum import Enum

import datetime
from flask import Flask, jsonify
from flasgger import Swagger
import logging

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import argparse



# Logging #TODO update
# ===================================================>
logPath = './'
fileName = 'logs.log'
logFormatter = logging.Formatter("%(asctime)s [%(threadName)-12.12s] [%(levelname)-5.5s]  %(message)s")
rootLogger = logging.getLogger()

fileHandler = logging.FileHandler("{0}/{1}.log".format(logPath, fileName))
fileHandler.setFormatter(logFormatter)
rootLogger.addHandler(fileHandler)

consoleHandler = logging.StreamHandler()
consoleHandler.setFormatter(logFormatter)
rootLogger.addHandler(consoleHandler)

from rethinkdb import RethinkDB
r = RethinkDB()

# User Model and functionality
# ===================================================>

class Referral():
    def __init__(self):
        pass




class UserResource():
    def __call__(self, *args, **kwargs):

        self.admin_email = kwargs.get('admin_email', None)
        self.sendgrid_api_key = kwargs.get('sendgrid_api_key', None)
        self.rdb_username = kwargs.get('rdb_username', None)
        self.rdb_password = kwargs.get('rdb_password', None)
        self.rdb_host = kwargs.get('rdb_host', None)
        self.rdb_port = kwargs.get('rdb_port', None)
        self.rdb_user_table = kwargs.get('rdb_user_table', None)
        self.rdb_db = kwargs.get('rdb_db', None)

        # SendGrid API client
        if self.sendgrid_api_key is not None:
            self.sg = SendGridAPIClient(
                self.sendgrid_api_key
            )
        else:
            _warn("Sendgrid api key is not set")

        # Rethinkdb connection pool
        self.conn = r.connect()
        self._setup()


    def _setup(self):
        """
        Create database tables and indicies where needed
        """
        with self.conn as conn:
            r.db_create(self.rdb_db).run(conn)

            r.db(self.rdb_db)\
            .table_create(self.rdb_user_table)\
            .run(conn)

            self.uref =  r.db(self.rdb_db).table(self.rdb_user_table)


    def _get_all_users(self):
        """
        Returns a list of all of the users.
        """
        with self.conn as conn:
            return self.uref.run(conn)

    

app = falcon.API()
core = Core()

# General utilities
# ===================================================>

class InvalidUsage(Exception):
    status_code = 400
    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


# Resources
# ===================================================>


# API
# ===================================================>

@app.route('/v1/user/', methods=['POST'])
def user_create():
    """
    Create an user
    Parameters:
        - user_email: user email string, such as 'example@email.com'
        - referrer_id: the id of the user that referred this person.
    Returns:
        - user_id: a short identifier (such as '3c657dbc')
        for the created user instance. The user_id is
        used in future API calls to identify the user to be
        manipulated
    """
    req = request.get_json()
    user_email = get_required_param(req, 'user_email')
    referrer_id = get_optional_param(req, 'referrer_id', None)
    
    """
    Creates a user and sends a email with referral details to 
    this person.
    """
    resp = core.create_user(
        email=user_email,
        referrer_id=referrer_id
    )

    return jsonify(user_id=resp["user_id"])

# Update user
# ---------------------------------------------------->

@app.route('/v1/users/<user_id>/', methods=['POST'])
def update_user(user_id):
    """
    Run one timestep of the environment's dynamics.
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
        for the environment instance
        - action: an action to take in the environment
    Returns:
        - observation: agent's observation of the current
        environment
        - reward: amount of reward returned after previous action
        - done: whether the episode has ended
        - info: a dict containing auxiliary diagnostic information
    """
    json = request.get_json()
    action = get_required_param(json, 'action')
    render = get_optional_param(json, 'render', False)

    resp = core.update_user(

    )
    
    return jsonify(user_id=resp["user_id"])

@app.route('/v1/users/<user_id>/', methods=['POST'])
def get_user_rank(user_id):
    """
    Run one timestep of the environment's dynamics.
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
        for the environment instance
        - action: an action to take in the environment
    Returns:
        - observation: agent's observation of the current
        environment
        - reward: amount of reward returned after previous action
        - done: whether the episode has ended
        - info: a dict containing auxiliary diagnostic information
    """
    json = request.get_json()
    action = get_required_param(json, 'action')
    render = get_optional_param(json, 'render', False)

    resp = core.update_user(

    )
    
    return jsonify(user_id=resp["user_id"])

# Update user
# ---------------------------------------------------->

@app.route('/v1/users/<limit>', methods=['GET'])
def user_list_by_rank(limit):
    """
    List all users on the server.
    """
    users = core.get_users_by_rank(limit)
    return jsonify(users = users)

# Update referral
# ---------------------------------------------------->

@app.route('/v1/users/', methods=['GET'])
def referral_viewed():
    """
    Marks a referral as being openend and recieves the source
    from where it was opened.
    """
    all_envs = core.list_all()
    return jsonify(all_envs = all_envs)




if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Start a Gym HTTP API server')
    parser.add_argument('-l', '--listen', help='interface to listen to', default='127.0.0.1')
    parser.add_argument('-p', '--port', default=5000, type=int, help='port for flask to listen to.')
    parser.add_argument('-rp', '--rdb_port', default=29015, type=int, help='rethinkdb port')
    parser.add_argument('-rh', '--rdb_host', default="0.0.0.0", type=str, help='rethinkdb host')
    parser.add_argument('-ruser', '--rdb_username', default=None, type=str, help='rethinkdb user')
    parser.add_argument('-rpass', '--rdb_password', default=None, type=str, help='rethinkdb password')
    parser.add_argument('-rut', '--rdb_user_table', default="users", type=str, help='name of the user table for rethinkdb')
    parser.add_argument('-rdb', '--rdb_db', default="main", type=str, help='name of the rethinkdb table to use')
    parser.add_argument('-sak', '--sendgrid_api_key', default=None, type=str, help='the api key for the sendgrid api')
    parser.add_argument('-ae', '--admin_email', default=None, type=str, help='the admin email to use for outgoing emails')
    args = parser.parse_args()
    _info('Server starting at: ' + 'http://{}:{}'.format(args.listen, args.port))

    core(**vars(args))

    # Run 
    httpd = simple_server.make_server('127.0.0.1', 8000, app)
    httpd.serve_forever()
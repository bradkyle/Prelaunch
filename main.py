import uuid
from pymongo import MongoClient
import datetime
from flask import Flask, jsonify
from flasgger import Swagger
import logging
logger = logging.getLogger('werkzeug')
logger.setLevel(logging.DEBUG)

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


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


# User Model and functionality
# ===================================================>

class Referral():
    def __init__(self):
        pass

class User():
    def __init__(self, **kwargs):
        self.id = uuid.uuid1()
        self.email = kwargs.get('email', None)
        self.name = kwargs.get('name', None)
        self.surname = kwargs.get('surname', None)
        self.referrer_id = kwargs.get('referrer_id', None)
        self.referral_source = kwargs.get('referral_source', None)
        self.referral_url = kwargs.get('referral_url', None)
        self.num_referred = kwargs.get('num_referred', 0)
        self.ip_address = kwargs.get('ip_address', None)
        self.user_agent = kwargs.get('user_agent', None)
        self.language = kwargs.get('language', None)
        self.country = kwargs.get('country', None)
        self.region = kwargs.get('region', None)
        self.cookies = kwargs.get('cookies', None)
        self.created_at = datetime.datetime.utcnow()

    def inc(self):
        """
        Increments the number of people this person has referred by one.
        """
        self.num_referred += 1



class App():
    def __init__(self, *args, **kwargs):
        self.client = MongoClient('localhost', 27017)


    def create_user(self):
        """
        Creates a user and adds this user to the mongodb database
        """
        pass

    def create_user_from_referral(self):
        pass

app = App()

# Email utilities
# ===================================================>
#TODO multiple languages

def send_referral_mail(to_email, ):
    message = Mail(
        from_email=os.environ.get('FROM_EMAIL'),
        to_emails='to@example.com',
        subject='Thanks, we have added your email address to the signup queue.',
        html_content='<strong>and easy to do anywhere, even with Python</strong>'
    )

    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)


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

def get_required_param(json, param):
    if json is None:
        logger.info("Request is not a valid json")
        raise InvalidUsage("Request is not a valid json")
    value = json.get(param, None)
    if (value is None) or (value=='') or (value==[]):
        logger.info("A required request parameter '{}' had value {}".format(param, value))
        raise InvalidUsage("A required request parameter '{}' was not provided".format(param))
    return value

def get_optional_param(json, param, default):
    if json is None:
        logger.info("Request is not a valid json")
        raise InvalidUsage("Request is not a valid json")
    value = json.get(param, None)
    if (value is None) or (value=='') or (value==[]):
        logger.info("An optional request parameter '{}' had value {} and was replaced with default value {}".format(param, value, default))
        value = default
    return value

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

# API
# ===================================================>

@app.route('/v1/user/', methods=['POST'])
def user_create():
    """
    Create an instance of the specified environment
    Parameters:
        - env_id: gym environment ID string, such as 'CartPole-v0'
        - seed: set the seed for this env's random number generator(s).
    Returns:
        - instance_id: a short identifier (such as '3c657dbc')
        for the created environment instance. The instance_id is
        used in future API calls to identify the environment to be
        manipulated
    """
    req = request.get_json()
    user_email = get_required_param(req, 'user_email')
    referrer_id = get_optional_param(req, 'referrer_id', None)
    
    if referrer_id is not None:
        """
        Creates user and then increments the user whom was the
        refferrer of this user. Then sends an email to this person.
        """
        resp = app.create_user_from_referral(
            email=user_email,
            referrer_id=referrer_id
        )

    else:
        """
        Creates a user and sends a email with referral details to 
        this person.
        """
        resp = app.create_user(
            email=user_email
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
    [obs_jsonable, reward, done, info] = envs.step(instance_id, action, render)
    return jsonify(observation = obs_jsonable,
                    reward = reward, done = done, info = info)

# Update user
# ---------------------------------------------------->

@app.route('/v1/users/', methods=['GET'])
def user_list_top_by_rank(number):
    """
    List all environments running on the server
    Returns:
        - envs: dict mapping instance_id to env_id
        (e.g. {'3c657dbc': 'CartPole-v0'}) for every env
        on the server
    """
    all_envs = envs.list_all()
    return jsonify(all_envs = all_envs)

@app.route('/v1/users/', methods=['GET'])
def user_list_all_by_rank():
    """
    List all environments running on the server
    Returns:
        - envs: dict mapping instance_id to env_id
        (e.g. {'3c657dbc': 'CartPole-v0'}) for every env
        on the server
    """
    all_envs = envs.list_all()
    return jsonify(all_envs = all_envs)

# Update referral
# ---------------------------------------------------->

@app.route('/v1/users/', methods=['GET'])
def referral_opened():
    """
    List all environments running on the server
    Returns:
        - envs: dict mapping instance_id to env_id
        (e.g. {'3c657dbc': 'CartPole-v0'}) for every env
        on the server
    """
    all_envs = envs.list_all()
    return jsonify(all_envs = all_envs)
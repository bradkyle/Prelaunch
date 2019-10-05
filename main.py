import uuid
from rethinkpool import RethinkPool

import datetime
from flask import Flask, jsonify
from flasgger import Swagger
import logging
logger = logging.getLogger('werkzeug')
logger.setLevel(logging.DEBUG)

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def _error():
    pass

def _info():
    pass

def _debug():
    pass

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



class App():
    def __init__(self, *args, **kwargs):

        self.admin_email = 0
        self.sendgrid_api_key = 0
        self.rdb_username = 0
        self.rdb_password = 0
        self.rdb_host = 0
        self.rdb_port = 0
        self.rdb_timeout = 0
        self.rdb_max_conns = 0
        self.rdb_initial_conns = 0
        self.rdb_table = 0
        self.rdb_db = 0

        # SendGrid API client
        self.sg = SendGridAPIClient(
            self.sendgrid_api_key
        )

        # Rethinkdb connection pool
        self.pool = RethinkPool(
            max_conns=self.max_conns,
            initial_conns=self.initial_conns,
            get_timeout=self.get_timeout,
            host=self.host,
            port=self.port,
            username=self.username,
            password=self.password
        )

        self._setup()

        self.uref =  r.db(self.rdb_db).table(self.rdb_table)

    def _setup(self):
        """
        Create database tables and indicies where needed
        """
        with self.pool.get_resource() as res:
            pass

    def create_user(self, user):
        """
        Creates a user and adds this user to the mongodb database provided
        all validations have been successfull and then sends a referral email
        via sendgrid such that the campaign is propagated.
        """
        with self.pool.get_resource() as res:
            pass
        self.incriment_user_referrals(user.)

    def incriment_user_referrals(self, user_id):
        """
        Increments the users total referral count by one and then updates that
        user in the database.
        """
        with self.pool.get_resource() as res:
           self.uref\
           .filter({"id": user_id})\
           .update({"referrals": r.row["referrals"]+1})\
           .run(res)

    def incriment_referral_views(self, user_id):
        """
        Increments the users total referral count by one and then updates that
        user in the database.
        """
        with self.pool.get_resource() as res:
           self.uref\
           .filter({"id": user_id})\
           .update({"views": r.row["views"]+1})\
           .run(res)

    def udpate_user(self):
        """
        Validates then updates a specific users details then reinserts that 
        user back into the database.
        """
        with self.pool.get_resource() as res:
            pass

    def get_users_by_rank(self, num, asc=False):
        """
        Get's a list of the top users ordered by rank with a limit given by 
        num.
        """
        with self.pool.get_resource() as res: #TODO internal server error
            self.uref\
            .order_by(index="referrals")\
            .run(res)

    def get_user_rank(self, user_id):
        """
        Derives the rank of a given user id. #TODO update to allow for rank 
        """
        with self.pool.get_resource() as res:
            self.uref\
            .filter({"id": user_id})\
            .run(res)

    def get_all_users(self):
        """
        Returns a list of all of the users.
        """
        with self.pool.get_resource() as res:
            pass

    def send_referral_mail(self, user):
        #TODO multiple languages

        message = Mail(
            from_email=self.admin_email,
            to_emails=to_email,
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

app = App()

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
    resp = app.create_user(
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

    resp = app.update_user(

    )
    
    return jsonify(user_id=resp["user_id"])

# Update user
# ---------------------------------------------------->

@app.route('/v1/users/<limit>', methods=['GET'])
def user_list_by_rank(limit):
    """
    List all users on the server.
    """
    users = app.get_users_by_rank(limit)
    return jsonify(users = users)

# Update referral
# ---------------------------------------------------->

@app.route('/v1/users/', methods=['GET'])
def referral_viewed():
    """
    Marks a referral as being openend and recieves the source
    from where it was opened.
    """
    all_envs = envs.list_all()
    return jsonify(all_envs = all_envs)
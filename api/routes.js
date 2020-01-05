const express = require('express');
const uuid = require('uuid');
const basicAuth = require('express-basic-auth');
const config = require('./config');
const Joi = require('joi'); 
var _ = require('lodash');
const MongoClient = require('mongodb').MongoClient;


const USER_ROUTE = "users"
const URL = 'mongodb://localhost:27017';
const DB_NAME = 'myproject';

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(DB_NAME);

    insertDocuments(db, function() {
        findDocuments(db, function() {
        client.close();
        });
    });
});

const router = express.Router();

var authConfig = {};
authConfig[config.ADMIN_EMAIL.toString()] = config.ADMIN_PASSWORD.toString();
const basicAuthFunc = basicAuth({users: authConfig});

var schema = Joi.object().keys({
    id                : Joi.string().required(),
    email             : Joi.string().email().required(),
    ipaddress         : Joi.string().ip(),
    macaddress        : Joi.string(),
    firstname         : Joi.string(),
    lastname          : Joi.string(),
    phonenumber       : Joi.string(),
    phonezone         : Joi.string(),
    variantid         : Joi.string(),
    sourceurl         : Joi.string(),
    useragent         : Joi.string(),
    timetillsignup    : Joi.number(),
    latitude          : Joi.string(),
    longitude         : Joi.string(),
    locale            : Joi.string(),
    language          : Joi.string(),
    country           : Joi.string(),
    region            : Joi.string(),
    cookies           : Joi.string(),
    emailsent         : Joi.boolean(),
    emailopened       : Joi.boolean(),
    disabled          : Joi.boolean(),
    hasreferrals      : Joi.boolean(),
    hasemail          : Joi.boolean(),
    hasphone          : Joi.boolean(),
    whatsappsent      : Joi.boolean(),
    whatsappopened    : Joi.boolean(),
    messagesent       : Joi.boolean(),
    messageopened     : Joi.boolean(),
    referralcount     : Joi.number().integer().min(0)
})


/* 
Retrieves a list of all users (must secure)
*/
router.get('/'+ USER_ROUTE, basicAuthFunc, (req, res) => {
    try{
        Joi.validate({ username: 'abc', birthyear: 1994 }, schema, function (err, value) { 

        });
    } catch(e) {

    }
});

/* 
Retrieves a single user by id
*/
router.get('/'+USER_ROUTE+'/:id', (req, res) => {
    var id = req.params.id;

});

/* 
Creates a new user
*/ // TODO increment referrer user id if it exists
router.post('/'+USER_ROUTE, (req, res) => {
    
});

/* 
Deactivates a user
*/
router.delete('/'+USER_ROUTE+'/:id', (req, res) => {
    var id = req.params.id;
    
});

/* 
Updates a user
*/
router.put('/'+USER_ROUTE, (req, res) => {
    
});

/* 
Retrieves a list of top users by referral count with a limit and a maximum of 100
*/
router.get('/top', (req, res) => {
    
});

/* 
Retrieves a single users position in the waiting list.
*/
router.get('/position', (req, res) => {
    
});

module.exports = {
    router:router,
    USER:USER,
    dynamo:dynamo
}
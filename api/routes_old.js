const AWS = require('aws-sdk');
const express = require('express');
const uuid = require('uuid');
const basicAuth = require('express-basic-auth');
const config = require('./config')
var dynamo = require('dynamodb');
const Joi = require('joi'); 
var _ = require('lodash');

const USER_ROUTE = "users"
const REFERRAL_ROUTE = "referrals"

console.log(config.IS_OFFLINE);

if (config.IS_OFFLINE === true){
    dynamo.AWS.config.update({
        region: 'us-west-1',
        endpoint: 'http://127.0.0.1:8080',
    })
} else {
    dynamo.AWS.config.update({});
}

const router = express.Router();

var authConfig = {};
authConfig[config.ADMIN_EMAIL.toString()] = config.ADMIN_PASSWORD.toString();
const basicAuthFunc = basicAuth({users: authConfig});

var USER = dynamo.define('User', {
    hashKey : 'id',
    // rangeKey : 'referralcount',

    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,

    schema : {
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
    },

    indexes : [{
        hashKey : 'id', 
        rangeKey : 'referralcount', 
        name : 'NumReferrals', 
        type : 'global'
    }]
});


/* 
Retrieves a list of all users (must secure)
*/
router.get('/'+ USER_ROUTE, basicAuthFunc, (req, res) => {
    USER.scan()
    .loadAll()
    .exec((error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error retrieving Users' });
        }
        res.json(result.Items);
    });
});

/* 
Retrieves a single user by id
*/
router.get('/'+USER_ROUTE+'/:id', (req, res) => {
    var id = req.params.id;

    USER.get({id: id}, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error retrieving User' });
        }
        else if (result) {
            res.json(result);
        } 
        else {
            res.status(404).json({ error: `User with id: ${id} not found` });
        }
    })
});

/* 
Creates a new user
*/ // TODO increment referrer user id if it exists
router.post('/'+USER_ROUTE, (req, res) => {
    
    USER.create({
        id:uuid.v4(),
        email:req.body.email,
        ipadress:req.body.ipaddress
    }, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Could not create User'});
        }
        res.json(result);
    })

    // if (referred){
    //     console.log("User was referred")
    // }
    
    //TODO if user was referred
});

/* 
Deactivates a user
*/
router.delete('/'+USER_ROUTE+'/:id', (req, res) => {
    var id = req.params.id;
    USER.update({
        id:id,
        disabled: true
    }, 
    {
        expected: {id: id}
    }, 
    (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error disactivating User' });
        }
        else if (result) {
            res.json(result);
        } 
        else {
            res.status(404).json({ error: `User with id: ${id} not found` });
        }
    })
});

/* 
Updates a user
*/
router.put('/'+USER_ROUTE, (req, res) => {
    USER.update({
        id:req.body.id,
        email:req.body.email,
        ipaddress:req.body.ipaddress
    }, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Could not update User' });
        }
        res.json(result);
    })
});

/* 
Retrieves a list of top users by referral count with a limit and a maximum of 100
*/
router.get('/top', (req, res) => {
    try {
        USER
        .query("")
        .usingIndex('NumReferrals')
        .descending()
        .limit(parseInt(config.TOP_LIMIT))
        .exec((error, result) => {
            console.log(error);
            console.log(result)
            if (error) {
                res.status(400).json({ error: 'Error retrieving top Users by referral count' });
            }
            console.log(result);
            res.json(result);
        });
    } catch (e) {
        console.log(e);
    }
});

/* 
Retrieves a single users position in the waiting list.
*/
router.get('/position', (req, res) => {
    USER.query()
    .descending()
    .loadAll()
    .exec((error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error retrieving top Users by referral count' });
        }

        var rsp = {
            position:Object.keys(result).indexOf(req.body.id),
            count:Object.keys(result).length
        }
        
        res.json(rsp);
    });
});

module.exports = {
    router:router,
    USER:USER,
    dynamo:dynamo
}
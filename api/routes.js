const express = require('express');
const uuid = require('uuid');
const basicAuth = require('express-basic-auth');
const config = require('./config');
const Joi = require('joi'); 
var _ = require('lodash');
const mongoose = require('mongoose');
const Joigoose = require("joigoose")(mongoose);
const util = require('util')


const USER_ROUTE = "users"
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'prelaunch';
const MAX_NUM_TOP = 100

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const router = express.Router();

var authConfig = {};
authConfig[config.ADMIN_EMAIL.toString()] = config.ADMIN_PASSWORD.toString();
const basicAuthFunc = basicAuth({users: authConfig});

var JoiUserSchema = Joi.object({
    id                : Joi.string(),
    email             : Joi.string(),
    ipaddress         : Joi.string(),
    referrerid        : Joi.string(),
    hasrefferer       : Joi.string(),
    macaddress        : Joi.string(),
    firstname         : Joi.string(),
    lastname          : Joi.string(),
    phonenumber       : Joi.string(),
    phonezone         : Joi.string(),
    variantid         : Joi.string(),
    sourceurl         : Joi.string(),
    useragent         : Joi.string(),
    timetillsignup    : Joi.string(),
    latitude          : Joi.string(),
    longitude         : Joi.string(),
    locale            : Joi.string(),
    language          : Joi.string(),
    country           : Joi.string(),
    region            : Joi.string(),
    cookies           : Joi.string(),
    emailsent         : Joi.string(),
    emailopened       : Joi.string(),
    disabled          : Joi.string(),
    hasreferrals      : Joi.string(),
    hasemail          : Joi.string(),
    hasphone          : Joi.string(),
    whatsappsent      : Joi.string(),
    whatsappopened    : Joi.string(),
    messagesent       : Joi.string(),
    messageopened     : Joi.string(),
    referralcount     : Joi.string(),
});

const UserSchema = new mongoose.Schema({
    id                : String,
    email             : String,
    ipaddress         : String,
    referrerid        : String,
    macaddress        : String,
    firstname         : String,
    lastname          : String,
    phonenumber       : String,
    phonezone         : String,
    variantid         : String,
    sourceurl         : String,
    useragent         : String,
    timetillsignup    : String,
    latitude          : String,
    longitude         : String,
    locale            : String,
    language          : String,
    country           : String,
    region            : String,
    cookies           : String,
    hasrefferer       : {type: Boolean,default: false},
    emailsent         : {type: Boolean,default: false},
    emailopened       : {type: Boolean,default: false},
    disabled          : {type: Boolean,default: false},
    hasreferrals      : {type: Boolean,default: false},
    hasemail          : {type: Boolean,default: false},
    hasphone          : {type: Boolean,default: false},
    whatsappsent      : {type: Boolean,default: false},
    whatsappopened    : {type: Boolean,default: false},
    messagesent       : {type: Boolean,default: false},
    messageopened     : {type: Boolean,default: false},
    referralcount     : {type:Number,default:0},
});
const User = mongoose.model('User', UserSchema);

/* 
Retrieves a list of all users (must secure)
*/
router.get('/'+ USER_ROUTE, basicAuthFunc, (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
});

/* 
Retrieves a single user by id
*/
router.get('/'+USER_ROUTE+'/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
        });
    });
});

/* 
Creates a new user
*/ // TODO increment referrer user id if it exists
router.post('/'+USER_ROUTE, (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    var user = new User(req.body)

    if (user.hasrefferer || user.referrerid !== null){
        console.log("Has referrer!");
        User.findByIdAndUpdate(user.referrerid, {$inc: { referralcount: 1 } }, {new: true})
        .then(user => {
            if(!user) {
                console.error("user not found with id " + user.referrerid);
            }
            // TODO conditional notification
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                console.error("user not found with id " + user.referrerid);                
            }
            console.error("Error updating user with id " + user.referrerid);
        });
    }
    
    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
    
});

/* 
Deactivates a user
*/
router.delete('/'+USER_ROUTE+'/:id', basicAuthFunc, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {disabled:true}, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
});

/* 
Updates a user
*/
router.put('/'+USER_ROUTE+'/:id', basicAuthFunc, (req, res) => {
    if(!req.body || !Object.keys(req.body).length) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
});

/* 
Retrieves a list of top users by referral count with a limit and a maximum of 100
*/
router.get('/top', (req, res) => {
    try{
        var num = MAX_NUM_TOP
        if (req.query.num !== null){
            num = Math.min(req.query.num, MAX_NUM_TOP);
        }

        User.find().sort({referralcount:-1}).limit(num).then(users => {
            if (!users.length > 0){
                return res.status(404).send({
                    message: "No users present"
                });
            } // TODO sanitize output
            res.send(users)
        });
    } catch (e) {
        console.log(e);
    }
});

/* 
Retrieves a single users position in the waiting list.
*/
router.get('/position/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });            
        }

        User.find({referralcount: {$gt: user.referralcount}}).count(function (position) {
            res.send(position)
        });

    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
        });
    });

    
});

module.exports = {
    router:router,
    User:User
};
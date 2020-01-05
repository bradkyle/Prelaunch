const express = require('express');
const uuid = require('uuid');
const basicAuth = require('express-basic-auth');
const config = require('./config');
const Joi = require('joi'); 
var _ = require('lodash');
const mongoose = require('mongoose');
const joigoose = require("joigoose")(mongoose);

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

var JoiUserschema = Joi.object().keys({
    id                : Joi.string().required(),
    email             : Joi.string().email().required(),
    ipaddress         : Joi.string().ip(),
    referrerid        : Joi.string(),
    hasrefferer       : Joi.boolean(),
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

const UserSchema = new mongoose.Schema(joigoose.convert(JoiUserSchema));
const User = mongoose.model('User', UserSchema);

/* 
Retrieves a list of all users (must secure)
*/
router.get('/'+ USER_ROUTE, basicAuthFunc, (req, res) => {
    User.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
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
                message: "Note not found with id " + req.params.id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });
});

/* 
Creates a new user
*/ // TODO increment referrer user id if it exists
router.post('/'+USER_ROUTE, (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    var user = new User(req.body.content)


    if (user.hasrefferer || user.referrerid !== null){
        console.log("Has referrer!");
    }
    
    // Save Note in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
    
});

/* 
Deactivates a user
*/
router.delete('/'+USER_ROUTE+'/:id', basicAuthFunc, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {disabled:true}, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
});

/* 
Updates a user
*/
router.put('/'+USER_ROUTE+'/:id', basicAuthFunc, (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    
    User.findByIdAndUpdate(req.params.id, req.body.content, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
});

/* 
Retrieves a list of top users by referral count with a limit and a maximum of 100
*/
router.get('/top/:num', (req, res) => {
    User.find().sort([['referralcount', 'descending']]).limit(Math.min(req.params.num, MAX_NUM_TOP)).all(function (users) {
        if (!posts.length > 0){
            return res.status(404).send({
                message: "No users present"
            });
        } // TODO sanitize output
        res.send(users)
    });
});

/* 
Retrieves a single users position in the waiting list.
*/
router.get('/position/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });            
        }

        User.find({referralcount: {$gt: user.referralcount}}).count(function (err, position) {
            res.send(position)
        });

    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });

    
});

module.exports = {
    router:router,
    USER:USER,
    dynamo:dynamo
}
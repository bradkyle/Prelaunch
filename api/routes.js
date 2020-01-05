const express = require('express');
const uuid = require('uuid');
const basicAuth = require('express-basic-auth');
const config = require('./config');
const Joi = require('joi'); 
var _ = require('lodash');
const mongoose = require('mongoose');
const Joigoose = require("joigoose")(mongoose);
const util = require('util')
const handlebars = require('handlebars');
const chalk = require('chalk');
const mjml = require('mjml');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');

const USER_ROUTE = "users"
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'prelaunch';
const MAX_NUM_TOP = 100
const SENDGRID_API_KEY = "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"
sgMail.setApiKey(SENDGRID_API_KEY);

console.log('Reading content from example.hbs template...');
const mjmlTemplateFile = fs.readFileSync(`${__dirname}/public/even_better.mjml`, 'utf8');
const template = handlebars.compile(mjmlTemplateFile);

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

// TODO serve images

var JoiUserSchema = Joi.object({
    email             : Joi.string().email(),
    ipaddress         : Joi.string().ip(),
    referrerid        : Joi.string(),
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
    hasrefferer       : Joi.boolean(),
    hasreferrals      : Joi.boolean(),
    hasemail          : Joi.boolean(),
    hasphone          : Joi.boolean(),
    whatsappsent      : Joi.boolean(),
    whatsappopened    : Joi.boolean(),
    messagesent       : Joi.boolean(),
    messageopened     : Joi.boolean(),
    referralcount     : Joi.number(),
});

const UserSchema = new mongoose.Schema({
    email             : {type:String, required: true, unique: true},
    ipaddress         : {type:String, required: true, unique: true},
    referrerid        : String,
    macaddress        : String,
    firstname         : String,
    lastname          : String,
    phonenumber       : String,
    phonezone         : String,
    variantid         : String,
    sourceurl         : String,
    useragent         : String,
    timetillsignup    : Number,
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

function sendEmail(
    position, 
    count, 
    to, 
    from, 
    subject,
    done
){
    /*
    Sends an email via the sendgrid.com API.
    */

    const userInfo = {
        email: to,
        position: position,
        count: count
    }

    const hbsHtml = template({});
    const templateMarkup = mjml(hbsHtml);

    if (templateMarkup.errors.length === 0){
        const msg = {
            to: userInfo.email,
            from: from,
            subject: subject,
            html: templateMarkup.html
        }
        sgMail.send(msg).then(() => {
            console.log('Mail sent!');
        }, (error) => {
            console.log(error.message);    
        });
    } else {
        console.error('There are errors in your MJML markup:');
        console.error(templateMarkup.errors);
    }
    if (done){done()};
}

function sendMessage(accountSid, authToken){
    /*
    Sends a SMS confirmation message from the twilio.com API.
    */
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Your Account Sid and Auth Token from twilio.com/console
    // DANGER! This is insecure. See http://twil.io/secure
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({body: 'Hi there!', from: '+15017122661', to: '+15558675310'})
        .then(message => console.log(message.sid));
}

function sendWhatsapp(accountSid, authToken){
    /*
    Sends a whatsapp messsage as confirmation from the twilio.com API.
    */
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Your Account Sid and Auth Token from twilio.com/console
    // DANGER! This is insecure. See http://twil.io/secure
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        from: 'whatsapp:+14155238886',
        body: 'Hello there!',
        to: 'whatsapp:+15005550006'
    })
    .then(message => console.log(message.sid));
}

/* 
Retrieves a list of all users (must secure)
*/
router.get('/'+ USER_ROUTE, basicAuthFunc, (req, res) => {
    User.find({disabled: false})
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
    try{
        if(!req.body) {
            return res.status(400).send({
                message: "user content can not be empty"
            });
        } 
        
        JoiUserSchema.validate(req.body, (err, user) => {
            var user = new User(user);
            user.referralcount = 0
            if (err){
                return res.status(400).send({
                    message: err.message || "Some error occurred while creating the user."
                });
            }

            if (user.hasrefferer || user.referrerid){
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
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the user."
                });
            });
        })

     } catch (e) {
        console.error(e)
    }

    // TODO send email
    
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

        User.find({disabled: false})
        .sort({referralcount:-1})
        .limit(num).then(users => {
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

        User
        .find({referralcount: {$gt: user.referralcount}, disabled:false})
        .count(function (position) {
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

/* 
Retrieves a single users position in the waiting list.
*/
router.get('/count', (req, res) => {
        
});

module.exports = {
    router:router,
    User:User,
    sendEmail:sendEmail,
    sendMessage:sendMessage,
    sendWhatsapp:sendWhatsapp
};
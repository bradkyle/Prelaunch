const express = require('express');
const uuid = require('uuid');
const basicAuth = require('express-basic-auth');
const config = require('./config');
const trans = require('./trans');
const Joi = require('joi'); 
var _ = require('lodash');
const mongoose = require('mongoose');
const handlebars = require('handlebars');
const mjml = require('mjml');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
var validation=require("validator");

const USER_ROUTE = "users"
const MONGO_URL = config.MONGO_URL || 'mongodb://localhost:27017';
const MAX_NUM_TOP = config.TOP_LIMIT
const SENDGRID_API_KEY = config.SENDGRID_API_KEY
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
authConfig[config.ADMIN_USERNAME.toString()] = config.ADMIN_PASSWORD.toString();
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
    country           : String,
    region            : String,
    cookies           : String,
    language          : String,
    hasrefferer       : {type: Boolean,default: false},
    emailsent         : {type: Boolean,default: false},
    emailverified     : {type: Boolean,default: false},
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
    language,
    done
){
    try{
        /*
        Sends an email via the sendgrid.com API.
        */
        var userInfo = {email: to}
        
        if (language in trans){
            userInfo = Object.assign(userInfo, trans[language]())
        } else if (language){
            console.error("Language not in translations: "+language.toString())
            userInfo = Object.assign(userInfo, trans["eng"]())
        } else {
            console.error("Language is null, using default")
            userInfo = Object.assign(userInfo, trans["eng"]())
        }

        const hbsHtml = template(userInfo);
        const templateMarkup = mjml(hbsHtml);

        if (templateMarkup.errors.length === 0){
            const msg = {
                to: userInfo.email,
                from: from,
                subject: userInfo.subject,
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
        if (done){
            done()
        };

    } catch (e) {
        console.error(e);
        // TODO recursion
        // if (retry_count && num_retrys) {
        //     sendEmail(

        //     )
        // }
    }
}

/* 
Simple response
*/
router.get('/', (req, res) => {
    res.send({
        message: "Greetings Axiomite!"
    });
});


/* 
Retrieves a list of all users (must secure)
*/
router.get('/'+ USER_ROUTE+'/all', basicAuthFunc, (req, res) => {
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
Retrieves a single user by id # TODO get position
*/
router.get('/'+USER_ROUTE+'/find', (req, res) => {

    if (req.query.id) {

        // TODO sanitize
        var id = req.query.id

        User.findById(req.query.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.query.id
                });            
            }
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.query.id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.query.id
            });
        });

    // find by email
    } else if (req.query.email) {

        // TODO sanitize
        var email = req.query.email 
        if (validation.isEmail(email)){
                User.find({email: email})
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: "user not found with email " + email
                        });            
                    }
                    res.send(user);
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "user not found with email: " + email
                        });                
                    }
                    return res.status(500).send({
                        message: "Error retrieving user with email: " + email
                    });
                });
        } else {
                return res.status(400).send({
                    message: "Please provide a correct email."
                });
        }
    
    } else {
        return res.status(500).send({
            message: "Please provide a correct email or ip query parameter."
        });
    }
    
    
});

/* 
Retrieves a single user by id
*/
router.post('/resend/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });            
        }
        var position = 0
        var count = 0

        sendEmail(
            position, 
            count, 
            user.email, 
            config.ADMIN_EMAIL,  
            user.language
        )
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
                // TODO your in the top 500 , 100, 50, 60 etc.

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

            var position = 0
            var count = 5

            // Save user in the database
            user.save()
            .then(user => {
                sendEmail(
                    position, 
                    count, 
                    user.email, 
                    config.ADMIN_EMAIL,  
                    user.language
                )
                res.send(user);
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
router.get('/countn', (req, res) => {
    User.find({disabled: false}).count()
    .then(count => {
        res.send({count: count})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
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


module.exports = {
    router:router,
    User:User,
    sendEmail:sendEmail
};
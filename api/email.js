
const handlebars = require('handlebars');
const mjml = require('mjml');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const trans = require('./trans');

console.log('Reading content from example.hbs template...');
const mjmlTemplateFile = fs.readFileSync(`${__dirname}/public/even_better.mjml`, 'utf8');
const template = handlebars.compile(mjmlTemplateFile);

function Email(
    position, 
    count, 
    to, 
    from, 
    language
) {
    this.position = position;
    this.count = count;
    this.to = to;
    this.from = from;
    this.language = language;
}


Email.prototype.send = function(){
    try{
        /*
        Sends an email via the sendgrid.com API.
        */
        var userInfo = {email: this.to}
        console.log("========================");
        if (this.language in trans){
            userInfo = Object.assign(userInfo, trans[this.language]())
        } else if (this.language){
            console.error("Language not in translations: "+this.language.toString())
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
                from: this.from,
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

    } catch (e) {
        console.error(e);
        // TODO recursion
        // if (retry_count && num_retrys) {
        //     sendEmail(

        //     )
        // }
    }
}

module.exports = Email;
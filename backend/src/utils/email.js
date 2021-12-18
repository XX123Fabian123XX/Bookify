const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path:path.join(__dirname, "../../.env")})

class Email {
    constructor({userEmail=process.env.USER_EMAIL, userPassword=process.env.USER_EMAIL_PASSWORD}={}) {
        
        console.group(userPassword)
        this.userEmail = userEmail;

        this.transport = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            auth:{
                user:userEmail,
                pass:userPassword
            }
        })
        this.transport.verify().then(message => {console.log("Email has been set up correctly")}).catch(console.error);
    }

    sendEmail(emailReceiver, subjectLine, message)  {
        this.transport.sendMail({
            from:this.userEmail,
            to:emailReceiver,
            subject:subjectLine,
            text:message
        }).then(info => {console.log(info)}).catch(err => {console.log(err)})
    }
}

module.exports = Email
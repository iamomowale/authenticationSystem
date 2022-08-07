const { model } = require('mongoose')
const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = async (email, subject, content)=> {
    try{
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        await transporter.sendMail({
            from: 'Authentication Test API',
            to: email,
            subject: subject,
            text: content
        })

    }catch(error){
        console.log('Email not sent')

    }
}
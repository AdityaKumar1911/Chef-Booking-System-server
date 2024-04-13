const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send email
const sendEmail = (name, email, phonenumber, serviceDay, serviceStartTime, serviceEndTime) => {
    console.log(`Name ==> ${name}\n Email ==> ${email}`);
    const mailOptions = {
        from: `${name} <${email}>`,
        to: 'dituraj2017@gmail.com',
        subject: `You have got a new booking from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nContact: ${phonenumber}\nService day: ${serviceDay}\nService start time: ${serviceStartTime}\nService end time: ${serviceEndTime}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendEmail;

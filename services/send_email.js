require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: 'Test Subject',
  text: 'Test Text',
};
transporter.sendMail(mailOptions, err => {
  if(err) console.log(err);
});
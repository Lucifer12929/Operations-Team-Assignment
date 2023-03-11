const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const { google } = require("googleapis");
const { OAuth2 } = google.auth;



const userCtrl = {
  register: async (req, res) => {
  
    try {
      const { name, email, dob,phoneno} =
        req.body;
      
      if (!name || !email )
        return res.status(400).json({ msg: "Please fill in all fields." });
      const age = (new Date() - new Date(dob)) / (1000 * 60 * 60 * 24 * 365);
      if (age < 18) {
          return res.status(400).send('You must be at least 18 years old to submit this form');
        }
        if(phoneno<9){
          return res.status(400).send('You must enter valid phone number');
        }

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid email" });

      // const user = await Users.findOne({ email });
      // if (user)
      //   return res.status(400).json({ msg: "This email already exists." });
      
       
        const newUser = new Users({ name, email, dob,phoneno });
        await newUser.save();
      console.log(newUser)
      

// create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     // host: 'smtp.gmail.com',
//     // port: 465,
//     service: 'gmail',
//     // secure: true,
//     auth: {
//         user: 'lucifershaw90@gmail.com',
//         pass: 'nmzqzzvvcyvwkrwz'
//     }
// });

// // setup email data with unicode symbol
// let mailOptions = {
//     from: 'lucifershaw90@gmail.com',
//     to: email,
//     subject: 'Email Verification',
//     text: 'Please click the link below to verify your email:',
//     html: '<p>Please click the link below to verify your email:</p><a href="https://example.com/verify_email">Verify Email</a>'
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//   console.log("***");
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });
res.json({ msg: "Account has been activated!" });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  
  function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  getAllUser : async (req, res) => {
    try{
        const questionList = await Users.find();
        res.status(200).json(questionList);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
},
};
module.exports = userCtrl;
var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

var movies = [
   {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
   {id: 102, name: "Inception", year: 2010, rating: 8.7},
   {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
   {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
];


var express = require('express');
var router = express.Router();





var movies = [
   {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
   {id: 102, name: "Inception", year: 2010, rating: 8.7},
   {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
   {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
];


router.get('/send', function(req, res){
   

   const transporter = nodemailer.createTransport({
         host: 'smtp.ethereal.email',
         port: 587,
         auth: {
            user: 'kali25@ethereal.email',
            pass: 'ZX3XRX6VEr4UTj57vB'
         }
   });

   // send email
   transporter.sendMail({
      from: 'kali25@example.com',
      to: 'kali25@ethereal.email',
      subject: 'Test Email Subject',
      html: '<h1> This is amolc github</h1>'
   });

   res.json({message: "Email Sent"});




});

router.post('/', function(req, res){
   //Check if all fields are provided and are valid:
   if(!req.body.name ||
      !req.body.year.toString().match(/^[0-9]{4}$/g) ||
      !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){
      res.status(400);
      res.json({message: "Bad Request"});
   } else {
      var newId = movies[movies.length-1].id+1;
      movies.push({
         id: newId,
         name: req.body.name,
         year: req.body.year,
         rating: req.body.rating
      });
      res.json({message: "New movie created.", location: "/movies/" + newId});
   }
});




module.exports = router;
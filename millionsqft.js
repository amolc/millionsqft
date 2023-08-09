var express = require('express');
var nunjucks =require('nunjucks')
var app = express();
var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require("body-parser");
var multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const dotenv = require('dotenv');
dotenv.config();

// handle cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Credentials", false);
    next();
});

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb", extended: true, type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, type: "application/x-www-form-urlencoding" }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw({ limit: "50mb" }));


//Require the Router we defined in movies.js
var movies = require('./movies.js');
var sendemail = require('./sendemail.js');

//Use the Router on the sub route /movies
app.use('/sendemail', sendemail);

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/contact', (req, res) => {
    res.render('contact.html');
})

app.get('/marketplace', (req, res) => {
    res.render('marketplace.html');
})

app.get('/projects', (req, res) => {
    res.render('projects.html');
})


app.get('/property_details', (req, res) => {
    res.render('property_details.html');
})

app.get('/service', (req, res) => {
    res.render('services.html');
})


app.use('/', express.static(__dirname + '/public'));
global.appRoot = path.resolve(__dirname);
app.listen(41000);
console.log('millionsqft - is started at port: 41000');

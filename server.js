var express = require('express');
var app = express();

var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session')
var passport     = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//allows us to configure session so session info is encrypted. going to send browser info in cookie
// -that uniquely identifies user. send info from server to client. should be an authorized user
app.use(cookieParser());
app.use(session({
    secret: 'process.env.SESSION_SECRET',
    resave: true,
    saveUninitialized: true}));

//passport initialization. base library
//use session i've already initialized to store any info in cookie
app.use(passport.initialize());
app.use(passport.session());  //ask passport to remember using the session secret that was already created.

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


//added in class
//var assignment = require('./assignment/app.js')/*(app)*/;
//assignment(app);//bound to function in assignment/app.js

var project = require('./project/app.js');
project(app);

//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3030;//3000

app.listen(port, ipaddress);
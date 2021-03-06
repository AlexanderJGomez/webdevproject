var express = require('express');
var app = express();

var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session')
var passport     = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(session({
    secret: 'process.env.SESSION_SECRET',
    resave: true,
    saveUninitialized: true}));

//passport initialization. base library
app.use(passport.initialize());
app.use(passport.session());
//ask passport to remember using the session secret that was already created.

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));



var project = require('./project/app.js');
project(app);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3030;//3000

app.listen(port, ipaddress);
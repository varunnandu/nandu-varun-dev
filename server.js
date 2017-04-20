var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
    }

    )

);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require ("./assignment/app.js")(app);
require ("./project/app")(app);

var port = process.env.PORT || 3000;

app.listen(port);
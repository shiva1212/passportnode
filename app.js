var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser')
var expnbs = require('express-handlebars');
var expressvalidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local'),Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;

var routers = require('./routes/index');
var users = require('./routes/users');


// Init App

var app = express();

//view engine
app.set('view engine','handlebars');
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',expnbs({defaultLayout:'layout'}));


// BodyParser Middleware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieParser());

// set static folder

app.use(express.static(path.join(__dirname,'public')));

// Express Session

app.use(session({
secret:'secret',
resave: true,
saveuninitialized:true,
}));

//Passport init

app.use(passport.initialize());
app.use(passport.session());

//Express validator

app.use(expressvalidator({
    errorformatter: function(param,msg,value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formparam = root;
        while(namespace.length)
        {
            formparam += '[' + namespace.shift() + ']';

        }
        return{
            param : formparam,
            msg : msg,
            value : value
        };
    }
}));

//connect Flash
app.use(flash());

//Global Vars
app.use((req,res,next) => {
    res.locals.sucess_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/',routers);
app.use('/users',users);

//set port

app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'),() => {
    console.log('Server started on port' +app.get('port'));
})

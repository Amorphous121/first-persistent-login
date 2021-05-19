const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const logger =require('morgan');
const session = require('express-session');
const mongoStore = require('connect-mongo');
require('./passport');
require('dotenv').config();

// ----------Mongoose connection --------------
const dbOptions =  { 
    useFindAndModify : false , 
    useNewUrlParser : true, 
    useUnifiedTopology : true 
}

mongoose.connect(process.env.DB_URI, dbOptions)
    .then(() => { console.log("Database Connected"); })

// mongo store for storing sessions inside database.
const store = new mongoStore({ mongoUrl : process.env.DB_URI });


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));


// Session creation
app.use(session({
    secret : "secret",
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 60000000
    },
    store : store
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index-routes'));

app.use((req, res, next) => {
    res.render('error', { error : { message : "Not Found ", status : 404 } });
})

app.listen(8000, () => console.log("Server is up and running at  8000"));
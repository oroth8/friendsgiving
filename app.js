const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)


// Load config
dotenv.config({path: './config/config.env'})

const connectDB = require('./config/db');
connectDB();

const app = express();

// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body Parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// express-session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

// Static
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 8080


app.listen(PORT, console.log(`Server running on ${PORT}`));
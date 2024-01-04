const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// importing routes
const customerRoutes = require('./routes/customers');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const portDb = parseInt(process.env.PORTDB, 10);
// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
// for docker
    host: 'mysql',
// for localhost
//    host: 'localhost',
// for kubernetes
//    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    port: portDb,
    database: 'crudnodejs'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// variable env title
const pageTitle = process.env.TITLE;

app.locals.pageTitle = pageTitle;
// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000')
});

module.exports = app;
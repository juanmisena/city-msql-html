const express = require('express');
const mysql = require('mysql');
const path = require('path');
const myConnection = require('express-myconnection');
const morgan = require('morgan');
const session = require('express-session');
const app = express();
const routerController = require('./routes/nation');
require('dotenv').config({path: './src/.env'});
const port = process.env.JPORT || 3000;
const dbOptions = {host: process.env.JHOST, user: process.env.JUSER, password: process.env.JPASS, port: process.env.JPORTD, database: process.env.JDBS}
app.use(morgan('dev'));
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(session({resave: false, saveUninitialized: false, secret: 'secret'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname ,'public')));
// app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', routerController);

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port));
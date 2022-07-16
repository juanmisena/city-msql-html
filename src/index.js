const express = require('express');
const mysql = require('mysql');
const path = require('path');
const myConnection = require('express-myconnection');
const morgan = require('morgan');
const session = require('express-session');
const app = express();
const routerController = require('./routes/nation');
require('dotenv').config({path: './src/.env'});
const port = process.env.PORT || 3000;
const dbOptions = {host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, port: process.env.DB_PORT, database: process.env.DB_DATABASE}
app.use(morgan('dev'));
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(session({resave: false, saveUninitialized: false, secret: 'secret'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname ,'public')));
// app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', routerController);

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port));
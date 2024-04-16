require('dotenv').config();
require('./models/connection');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var travelRouter = require('./routes/travels');
var cartRouter = require('./routes/cart');
var bookingRouter = require('./routes/bookings');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/travels', travelRouter);
app.use('/cart', cartRouter);
app.use('/bookings', bookingRouter);

module.exports = app;

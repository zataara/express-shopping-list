const express = require('express');
const morgan = require('morgan');


const apiRoutes = require('./apiRoutes')

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/', apiRoutes);

module.exports = app;
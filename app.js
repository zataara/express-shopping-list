const express = require('express');
const morgan = require('morgan');
const Item = require('./item')

const apiRoutes = require('./apiRoutes')

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/items', apiRoutes);


app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message,
    });
});



module.exports = app;
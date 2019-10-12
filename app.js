require('dotenv').config();
const express = require('express');

var app = express();

// Get routes
var indexRoutes = require('./routes/index');

// Use routes
app.use('/', indexRoutes());

// Establish Connection
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening @ ${port}`);
});

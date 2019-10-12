require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');

var app = express();

// Use handlebars engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Serve static content
app.use(express.static('public'));

// Get routes
var indexRoutes = require('./routes/index');

// Use routes
app.use('/', indexRoutes());

// Establish Connection
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening @ ${port}`);
});

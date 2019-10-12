require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

var app = express();

// Get models
require('./models/stream');

// Connect to mongodb server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/1on1-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established MongoDB Connection!'))
    .catch(err => console.log(err));

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

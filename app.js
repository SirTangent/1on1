require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
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

// Register models
const stream = mongoose.model('stream');

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
var server = app.listen(port, () => {
    console.log(`Server listening @ ${port}`);
});

// Socket setup
var io = socket(server);

io.on('connection', function (socket) {
    socket.authed = false;
    socket.code = null;
    console.log(`made socket connection: ${socket.id}`);

    socket.on('bindCode', function (code) {
        socket.code = code;
    });

    socket.on('auth', function (data) {
        stream.findOne({
            code: socket.code
        })
            .then(this_stream => {
                if(this_stream && this_stream.passphrase == data.passphrase){
                    socket.authed = true;
                    socket.code = this_stream.code;
                    socket.emit('auth_resp', true);
                } else {
                    socket.authed = false;
                    socket.emit('auth_resp', false);
                }
            })
            .catch(err => {
                console.log(err);
                socket.authed = false;
                socket.emit('auth_resp', false);
            })
    })

    socket.on('sendMSG', function (data) {
        // Check if socket has authority
        if(socket.authed){
            // Add new message to DB
            stream.findOne({
                code: socket.code
            })
                .then(this_stream => {
                    const newMSG = {
                        content: data.content
                    };

                    this_stream.msg.unshift(newMSG);
                    this_stream.save()
                        .then(this_stream => {
                            io.sockets.emit(socket.code, {
                                method: 'add',
                                content: this_stream.msg[0]
                            })
                        })
                })
        }
    })
});



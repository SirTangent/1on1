//Make connection
var socket = io.connect('http://localhost:8000');
var code = window.location.pathname.replace(/\//g, "");
var pass = "";
var isHost = false;

function authorize(e) {
    pass = document.querySelector('#passphrase').value;
    data = {
        code: code,
        passphrase: pass
    };
    console.log(data);
    socket.emit('auth', data);
    //socket.emit('host', {
    //    code: window.
    //})
}

// Auth response
socket.on('auth_resp', function (value) {
   console.log(value);
});

document.querySelector('#host').addEventListener('click', e => authorize(e));

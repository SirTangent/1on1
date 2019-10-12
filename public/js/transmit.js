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
   isHost = value;
   console.log(isHost);
   if(isHost){
       document.querySelector('#host-auth').style.display = "none";
       document.querySelector('#msg-add').style.display = "block";
       document.querySelector('.error').style.display = "none";
       document.querySelector('#host-indicator').style.display = "inline"
   } else {
       document.querySelector('.error').style.display = "block"
   }
});

//

document.querySelector('#host').addEventListener('click', e => authorize(e));

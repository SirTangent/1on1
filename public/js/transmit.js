//Make connection
var code = window.location.pathname.replace(/\//g, "");
var socket = io.connect();
var pass = "";
var isHost = false;

socket.emit('bindCode', code);

function authorize(e) {
    pass = document.querySelector('#passphrase').value;
    data = {
        passphrase: pass
    };
    socket.emit('auth', data);
    //socket.emit('host', {
    //    code: window.
    //})
}

function addMSG(e) {
    let msg = document.querySelector('#msg').value;

    socket.emit('sendMSG', {
        content: msg
    });
}

// Auth response
socket.on('auth_resp', function (value) {
   isHost = value;
   if(isHost){
       document.querySelector('#host-auth').style.display = "none";
       document.querySelector('#msg-add').style.display = "block";
       document.querySelector('.error').style.display = "none";
       document.querySelector('#host-indicator').style.display = "inline"
   } else {
       document.querySelector('.error').style.display = "inline"
   }
});

// Update Listener
socket.on(code, function (data) {
    if(data.method == 'add'){
        let temp = document.querySelector('.msg-last').innerHTML;
        document.querySelector('.msg-last').innerHTML = data.content.content;
        if(!document.querySelector('.msg-last').classList.contains('no-msg')){
            let node = document.createElement("h3");
            let textnode = document.createTextNode(temp);
            node.appendChild(textnode);
            document.querySelector('.prev-msgs').prepend(node);
        } else {
            document.querySelector('.msg-last').classList.remove('no-msg');
        }
    }
});

document.querySelector('#host').addEventListener('click', e => authorize(e));
document.querySelector('#add').addEventListener('click', e => addMSG(e));

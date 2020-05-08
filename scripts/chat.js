var btnEnviar = document.querySelector("#btn");
var nomeUser = document.querySelector("#session-name");

let nome = sessionStorage.getItem('nome');
let codigo = sessionStorage.getItem('codigo');
let usuario = sessionStorage.getItem('usuario');
let senha = sessionStorage.getItem('senha');
let id = sessionStorage.getItem('id');

function sessionUname() {
    let item = document.createElement("span");
    item.innerHTML = nome + ": " + id;
    nomeUser.appendChild(item);
}
sessionUname();

var todosAmigos = document.querySelector("#allAmigos");

function sessionFriends() {
    $.ajax({

        url: "http://chatjs.gitedu.com.br/usuario-amigo/get-all-friends?callback=",
        type: "GET",
        dataType: "jsonp",
        data: { codigo: codigo, usuario_id: id},

        beforeSend: function() {
            console.log("listando amigos");
        },

        success: function(response, textStatus, jqXHR) {
            if(response[1] == "Não encontrado")
                alert("Nenhum amigo :(")
            else
                for(var i in response) {
                    let item = document.createElement("span");
                    item.innerHTML = "<br>" + response[i].nome + ": " + response[i].id;
                    todosAmigos.appendChild(item);
                }
        },

        error: function(response, textStatus, jqXHR) {
            console.log(jqXHR);
        }
    });
};
sessionFriends();

var friendId = document.querySelector("#idfriend");
var msg = document.getElementById('comment');

var sessionMsgsR = document.querySelector("#resultR");
var sessionMsgsL = document.querySelector("#resultL");

btnEnviar.addEventListener("click", function() {

    var systemDate = new Date();
    var dataLocal = (systemDate.getDay()+1) + '/' + (systemDate.getMonth()+1) + '/' + systemDate.getFullYear();

    //console.log(codigo, id, friendId.value, msg.value, dataLocal);

    $.ajax({
        url: "http://chatjs.gitedu.com.br/mensagem/add-msg?callback=",
        method: "GET",
        dataType: "jsonp",
        data: { codigo: codigo, remetente_id: id, receptor_id: friendId.value, mensagem: msg.value, data: dataLocal},

        beforeSend: function() {
            console.log("enviando!!");
        },

        success: function(response, textStatus, jqXHR) {
            console.log(response);
            //let item = document.createElement("span");
            //item.innerHTML = "<br>" + "You: " + msg.value;
            $("#comment").val("");
            //sessionMsgs.appendChild(item);
            carregarMsgsProprias();
            carregarMsgsEmisssor();
        },

        error: function(response, textStatus, jqXHR) {
            console.log(jqXHR);
        }
    });
});

function carregarMsgsProprias() {
    if (friendId.value == ""){
        console.log(friendId.value);
    } else {

        document.getElementById('resultR').innerHTML = "";
        var nomeAmg = '';
        
        $.ajax({
            url: "http://chatjs.gitedu.com.br/usuario/get-user?callback=",
            method: "GET",
            dataType: "jsonp",
            data: { codigo: codigo, id: friendId.value},

            beforeSend: function() {
                console.log("requisitado");
            },

            success: function(response) {
                nomeAmg = response.nome;
                console.log(nomeAmg);
            }
        });
        
        $.ajax({
            url: "http://chatjs.gitedu.com.br/mensagem/get-msgs?callback=",
            method: "GET",
            dataType: "jsonp",
            data: { codigo: codigo, remetente_id: id, receptor_id: friendId.value},

            beforeSend: function(jqXHR, settings) {
                console.log("recebendo");
            },

            success: function(response, textStatus, jqXHR) {
                for(i in response) {
                    let item = document.createElement("label");
                    item.innerHTML = response[i].data + " Voce: " + response[i].mensagem + "<br>";
                    sessionMsgsR.appendChild(item);
                }
            },

            error: function(response, textStatus, jqXHR) {
                console.log(jqXHR)
            }
            
        });
    }
};

function carregarMsgsEmisssor() {
    if (friendId.value == ""){
        console.log(friendId.value);
    } else {
        document.getElementById('resultL').innerHTML = "";
        var nomeAmg = '';
        
        $.ajax({
            url: "http://chatjs.gitedu.com.br/usuario/get-user?callback=",
            method: "GET",
            dataType: "jsonp",
            data: { codigo: codigo, id: friendId.value},

            beforeSend: function() {
                console.log("requisitado");
            },

            success: function(response) {
                nomeAmg = response.nome;
                console.log(nomeAmg);
            }
        });
        
        $.ajax({
            url: "http://chatjs.gitedu.com.br/mensagem/get-msgs?callback=",
            method: "GET",
            dataType: "jsonp",
            data: { codigo: codigo, remetente_id: friendId.value, receptor_id: id},

            beforeSend: function(jqXHR, settings) {
                console.log("recebendo");
            },

            success: function(response, textStatus, jqXHR) {
                for(i in response) {
                    let item = document.createElement("label");
                    item.innerHTML = response[i].data + " " + nomeAmg + ": " + response[i].mensagem + "<br>";
                    sessionMsgsL.appendChild(item);
                }
            },

            error: function(response, textStatus, jqXHR) {
                console.log(jqXHR)
            }
            
        });
    }
};

//carregarMsgs();
//setInterval('carregarMsgs()', 2000);
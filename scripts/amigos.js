var codAmigo = document.querySelector("#fCod");
var emailAmigo = document.querySelector("#fMail");
var butAdd = document.querySelector("#AddAmigo");

var idAmigo;

let clientCod = sessionStorage.getItem('codigo');
let clientId = sessionStorage.getItem('id');

butAdd.addEventListener("click", function() {
    var encontrado = false;

    $.ajax({
        url: "http://chatjs.gitedu.com.br/usuario/get-all-users?callback=",
        type: "GET",
        dataType: "jsonp",
        data: { codigo: codAmigo.value},

        beforeSend: function() {
            console.log("enviando req!!");
        },

        success: function(response, textStatus, jqXHR) {
            for(var i in  response) {
                if (response[i].codigo == codAmigo.value && response[i].email == emailAmigo.value) {
                    idAmigo = response[i].id;
                    encontrado = true;
                }
            }

            if (encontrado) {
                addFriend();
                document.getElementById('formfriends').reset();
            }
        },

        error: function(response, textStatus, jqXHR) {
            console.log(jqXHR);
        }

    });
});

function addFriend() {
    $.ajax({
        url: "http://chatjs.gitedu.com.br/usuario-amigo/add-friend?callback=",
        type: "GET",
        dataType: "jsonp",
        data: { codigo: clientCod, usuario_id: clientId, amigo_id: idAmigo},

        beforeSend: function() {
            console.log("Adicionando amigo");
        },

        success: function(response, textStatus, jqXHR) {
            alert(response + ' com ' + textStatus);
        },

        error: function(response, textStatus, jqXHR) {
            console.log(jqXHR);
        }

    });
}
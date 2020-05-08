let cod = document.querySelector("#username");
let pass = document.querySelector("#password");
let btn = document.querySelector("#loginbutton");

btn.addEventListener("click", function() {
    var valido = "false";

    $.ajax({
        url: "http://chatjs.gitedu.com.br/usuario/get-all-users?callback=",
        type: "GET",
        dataType: "jsonp",
        data: { codigo: cod.value},

        beforeSend: function() {
            console.log("enviando!!");
        },

        success: function(response, textStatus, jqXHR) {

            for(var i in response) {
                if (response[i].codigo == cod.value && response[i].senha == pass.value) {
                    sessionStorage.setItem('usuario', response[i].usuario);
		 			sessionStorage.setItem('senha', pass.value);
		 			sessionStorage.setItem('codigo', cod.value);
		 			sessionStorage.setItem('nome', response[i].nome);
                    sessionStorage.setItem('id', response[i].id);
                     
                    document.getElementById('formlogin').reset();
                    valido = "true";
                    alert("Autenticado com sucesso!!");
                    location.href = "./paginas/chat.html";
                }
            }

            if(valido == "false") {
                alert("Codigo ou senha incorretos!!");
                window.location.reload();
            }

        },

        error: function(response, textStatus, jqXHR) {
            console.log(jqXHR);
        }

    });
});
var cod = document.querySelector("#codigo");
var nombre = document.querySelector("#reg_fullname");
var datNasc = document.querySelector("#DataNasc");
var mail = document.querySelector("#email");
var user = document.querySelector("#reg_username");
var pass = document.querySelector("#reg_password");
var btn = document.querySelector("#newreg");

btn.addEventListener("click",function() {

	$.ajax({ 
		url: "http://chatjs.gitedu.com.br/usuario/add-user?callback=",
		method: "GET",
		dataType: 'jsonp',
	 	data: { codigo: cod.value, nome: nombre.value, data_nasc: datNasc.value, email: mail.value, usuario: user.value, senha: pass.value},
	 	
	 	beforeSend: function(jqXHR, settings) {
	 		console.log("enviado!!");
	 	},

	 	success: function(response, textStatus, jqXHR) {

            console.log(response);

	 		if(response == "Adicionado!") {

				alert("Usuário cadastrado com sucesso!");
				location.href="../index.html";

			} else {

				alert("Usuário não cadastrado!");

			}

	 	},

	 	error: function(response, textStatus,jqXHR) {
	 		console.log(jqXHR);
	 	}

	});
});
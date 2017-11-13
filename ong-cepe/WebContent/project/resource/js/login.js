ONG.login = new Object();
ONG.entrada = {};

$(document).ready(function(){
	$(document).keypress(function(e) {
		if(e.which == 13) {
			ONG.login.entrada();
		}
	});
		
		ONG.login.entrada = function() {

			// do something in the background			
	
			var msg= "";
			
			msg += ONG.login.valida("Campo Login ", $("#login").val());
			msg += ONG.login.valida("Campo Senha ", $("#senha").val());
			
			var criptbase64=btoa($("#senha").val());
			$("#passwordhidden").val(criptbase64);
			
			//msg += ONG.login.valida("Campo Senha ", $("#passwordhidden").val()); //verificando a senha que esta sendo salva em um ID HIDDEN no index.html
			
			if(msg == "") {
				window.setTimeout(function() {	
	        		var dialog = bootbox.dialog({
	        		    title: 'Veriricando',
	        		    message: '<p><i class="fa fa-spin fa-spinner"></i> Carregando...</p>'
	        		});
	        	}, 2000);
				$.ajax({	
	                type:"POST",				
	                url: ONG.contextPath + "/LoginServlet",  
	                data: $("#formularioLogin").serialize(),
	                
	                success: function(msg){
	                	window.setTimeout(function() {	

		                	dialog.init(function(){
		                	    setTimeout(function(){
		                	        dialog.find('.bootbox-body').html('Acesso permitido!');
		                	    }, 2000);
		                	});
	                	}, 2000);
	                	var usuario = msg.usuario;
	 				    var tipo = msg.tipouser;
	
	                	document.cookie = tipo;					

	                	var intervalo = window.setInterval(function() {	}, 50);

	                	window.setTimeout(function() {	
	                	    clearInterval(intervalo);
	            			$(location).attr('href', '..' + msg.acesso );
	                	}, 6000);
	                },
	                
	                error: function(err){
	                	bootbox.alert({
	                	    message: "Login invalido! ",
	                	    size: 'small'
	                	});
	                }
	        	});	
			}else{
				bootbox.alert(msg);
			}
		}
		
		ONG.login.valida = function(campo, valor){
			var msg = "";
			if(valor == null ||  valor.trim() == ""){
				msg += " O campo: " + campo + " Está Vazio. </br>";
			}
			return msg;
		};
});

ONG.login = new Object();
ONG.entrada = {};

$(document).ready(function(){
	$(document).keypress(function(e) {
		if(e.which == 13) {
			ONG.login.entrada();
		}
	});
		
				
		
		
			
		ONG.login.entrada = function() {
	
			var msg= "";
			
			msg += ONG.login.valida("Campo Login ", $("#login").val());
			msg += ONG.login.valida("Campo Senha ", $("#senha").val());
			
			var criptbase64=btoa($("#senha").val());
			$("#passwordhidden").val(criptbase64);
			
			msg += ONG.login.valida("Campo Senha ", $("#passwordhidden").val());
			
			if(msg == "") {
				$.ajax({	
	                type:"POST",				
	                url: ONG.contextPath + "/LoginServlet",  
	                data: $("#formularioLogin").serialize(),
	                
	                success: function(msg){
	                	
	                	var usuario = msg.usuario;
	 				    var tipo = msg.tipouser;
	
	                	document.cookie = tipo;					
						                	
	                	var dialog = bootbox.dialog({
	        			    title: 'Verificando Dados',
	        			    message: '<p><i class="fa fa-spin fa-spinner"></i> Carregando...</p>'
	        			});
	                	dialog.init(function(){
	        	            setTimeout(function(){
	        	            	dialog.find('.bootbox-body').html("Acesso Permitido!");  
	        	            }, 3000);
	        	        });
	                	
	                	var intervalo = window.setInterval(function() {	}, 50);
	                	window.setTimeout(function() {	
	                	    clearInterval(intervalo);
	            			$(location).attr('href', '..' + msg.acesso );
	                	}, 5000);
	                },
	                
	                error: function(err){
	                	bootbox.alert("Login Invalido ! " );
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

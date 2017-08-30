$(document).ready(function(){
	buscapessojuridica=function(){
		
	    var valorBusca=$("#conspesf").val();
	  	
	    buscapesJuridica(undefined,valorBusca);
	}		
	
	buscapesJuridica = function(listPesj, busca){
				
		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += 

			"<thead class='table table-striped '>" +
				"<tr>" +
					"<p> Pessoas </p>  </br>" + 
					"<th> Razão Social </th> " +
					"<th> Responsavel </th>" +
					"<th> Cnpj </th>" + 
					"<th> E-mail </th>" +
					"<th> Tel Responsavel </th>" +
					"<th> Tel Comercial </th>" +
					"<th> Estado </th>" +
					"<th> Cidade </th>" +
					"<th> Bairro </th>" +
					"<th> Rua </th>" +
					"<th> Complemento </th>" +
					"<th> Número </th>" +
					"<th> Editar</th>" +
					"<th> Excluir</th>" +
				"</tr>" +
			"</thead>";					
		
		    if(listPesj != undefined && listPesj.length > 0 && listPesj[0].id != undefined){
			  
			  	for(var i = 0; i < listPesj.length; i++){

					html += "<tr>";

						html += "<td>";

							html += "<button type='button' class='btn btn-pencil' onclick='buscID("+listPesj[i].id+")'>Editar</button>"
						html += "</td>";

						html += "<td>";

							html += "<button type='button'class='btn btn-trash' onclick='confExcluir("+listPesj[i].id+")'>Excluir</button>"
						html += "</td>";

						html += "<td>" + listPesj[i].razaosocial + "</td>";
						html += "<td>" + listPesj[i].responsavel + "</td>";
						html += "<td>" + listPesj[i].cnpj + "</td>";
						html += "<td>" + listPesj[i].email + "</td>";
						html += "<td>" + listPesj[i].telresponsavel + "</td>";
						html += "<td>" + listPesj[i].telcomercial + "</td>";
						html += "<td>" + listPesj[i].estado + "</td>";
						html += "<td>" + listPesj[i].cidade + "</td>";
						html += "<td>" + listPesj[i].bairro + "</td>";
						html += "<td>" + listPesj[i].rua + "</td>";
						html += "<td>" + listPesj[i].complemento + "</td>";
						html += "<td>" + listPesj[i].numero + "</td>";
					html += "</tr>";  
			    }
		    }else{
			    if(listPesj == undefined || (listPesj != undefined && listPesj.length > 0)){
					

					var busca = $("#lista").val();
					
					if(busca == ""){						
						busca = null;
					}
					debugger;
					var cfg = {
							
						url: ONG.contextPath + "/rest/pessoa/nome/" + busca,
						
						success: function(listPesj,busca){													
							buscapesJuridica(listPesj,busca);
						},
						error: function(err){							
							bootbox.alert("Erro ao Buscar Pessoa, entrar em contato com o Administrador se o problema persistir!");
						}
					};					
					ONG.ajax.get(cfg);
				}else{					
					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
		    }
		html +="</table>";
		$("#resupesjuridica").html(html);
	}
	
	buscapesJuridica(undefined, "");

	// =====----------------------------------------------------------------------------------------------=====
	cadspesjuridica = function(){

		var msg, exp = "";
		msg+=validador("Razao Social: ", $("#razsocial").val());
		msg+=validador("Responsavel: ", $("#responsavel").val());
		msg+=validador("Cnpj: ", $("#cnpj").val());
		msg+=validador("Email: ", $("#email").val());
		msg+=validador("Telefone comercial: ", $("#telcomercial").val());
		msg+=validador("Telefone responsavel: ", $("#telresponsavel").val());
		msg+=validador("Estado: ", $("#estado").val());
		msg+=validador("Cidade: ", $("#cidade").val());
		msg+=validador("Bairro: ", $("#bairro").val());
		msg+=validador("Rua: ", $("#rua").val());
		msg+=validador("Complemento: ", $("#complemento").val());
		msg+=validador("Numero: ", $("#numero").val());

		if(msg == null){

			if($("#email").val().indexOf("@") == -1 || //valida se existe o @
                $("#email").val().indexOf(".") == -1 || //valida se existe o .
                $("#email").val().indexOf("@") == 0 || //valida se tem texto antes do @
                $("#email").val().lastIndexOf(".") + 1 == email.length || //valida se tem texto depois do ponto
                ($("#email").val().indexOf("@") + 1 == $("#email").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                    
                exp+="E-mail invalido" +"</br>"
                + "ex: teste_@teste.com.br"
                document.getElementById("email").focus();
            }
            if(!$("#cnpj").val().match(/^\d{14,15}$/)){
            	exp+="CNPJ invalido ! </br> " + "</br>";
            }
            if(!$("#telcomercial").val().match(/^\d{10,13}$/)){    
                exp+="Telefone Comercial invalido ! </br> " + "</br>";
            }
            if(!$("#telresponsavel").val().match(/^\d{10,13}$/)){    
                exp+="Telefone do responsavel invalido ! </br> " + "</br>";
            }
			if(exp==""){

            	var dadosPesFis= new Object();
            	
            	dadosPesFis.nome=$("#razsocial").val();
            	dadosPesFis.responsavel=$("#responsavel").val();
            	dadosPesFis.cnpj=$("#cnpj").val();
            	dadosPesFis.email=$("#email").val();
            	dadosPesFis.dt_nasc=$("#datanascimento").val();
            	dadosPesFis.fone_res=$("#telcomercial").val();
            	dadosPesFis.fone_cel=$("#telresponsavel").val();
            	dadosPesFis.estado=$("#estado").val();
            	dadosPesFis.cidade=$("#cidade").val()
            	dadosPesFis.rua=$("#rua").val();
            	dadosPesFis.complemento=$("#complemento").val();
            	dadosPesFis.numero=$("#numero").val();
            	
            	dadosPesFis.cep=$("#cep").val(); 
            	
        	    enviaServidor(dadosPesJur);
            }else{
                bootbox.alert(expressao);
            }
        }else{
            bootbox.alert("Caro usuário, gentileza verificar os seguintes campos: <br> " + msg);
        }
	}
	enviaServidor = function(dadosPesFis){

		var cfg = {
							
			url: ONG.contextPath+"/rest/pessoa/add",
			data:dadosPesJur,
			
			success: function(listPesj,busca){										
				buscapesJuridica(listPesj,busca);
			},
			error: function(err){								
				bootbox.alert("Erro ao Buscar Pessoa, entrar em contato com o Administrador se o problema persistir!");
			}
		};					
		ajax.get(cfg);
	}
	validador = function(campo, valor){

        var msg = "";

        if(valor == null ||  valor.trim() == ""){
            msg += "- " + campo + " Está Vazio. </br>";
        }
        return msg;
    };
});
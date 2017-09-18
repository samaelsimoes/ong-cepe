$(document).ready(function(){
	buscapessojuridica=function(){
		
	    var busca=$("#conspj").val();	  	
	    buscapesJuridica(undefined,busca);
	}		
	
	buscapesJuridica = function(listPesj, busca){
				
		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += 

			"<thead class='table table-striped '>" +
				"<tr>" +
					
					"<th> Cnpj </th>" + 
					"<th> Razão Social </th> " +
					"<th> E-mail </th>" +
					"<th> Telefone contato </th>" +
					"<th> Cep </th>" +
					/*"<th> Estado </th>" +
					"<th> Cidade </th>" +*/
					"<th> Rua </th>" +
					"<th> Complemento </th>" +
					"<th> Número </th>" +
					"<th> Ações</th>" +
				"</tr>" +
			"</thead>";					
		
		    if(listPesj != undefined && listPesj.length > 0 && listPesj[0].id != undefined){
			  
			  	for(var i = 0; i < listPesj.length; i++){

					html += "<tr>";					
						html += "<td>" + listPesj[i].cnpj + "</td>";
						html += "<td>" + listPesj[i].nome + "</td>";
						html += "<td>" + listPesj[i].email + "</td>";
						
						if(listPesj[i].foneFixo != null && listPesj[i].foneMovel != null){
							html += "<td>"+	 
										listPesj[i].foneFixo + " - " + listPesj[i].foneMovel +										
									"</td>";
						}else if(listPesj[i].foneFixo != null && listPesj[i].foneMovel == null){
							html += "<td>"+
										listPesj[i].foneFixo+
									"</td>"
						}else if( listPesj[i].foneMovel != null && listPesj[i].foneFixo == null){
							html += "<td>"+
										listPesj[i].foneMovel+
									"</td>"
						}
						
						html += "<td>" + listPesj[i].cep + "</td>";
						/*html += "<td>" + listPesj[i].estado + "</td>";
						html += "<td>" + listPesj[i].cidade + "</td>";*/
						html += "<td>" + listPesj[i].rua + "</td>";
						html += "<td>" + listPesj[i].complemento + "</td>";
						html += "<td>" + listPesj[i].numero + "</td>";

						html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='buscID("+listPesj[i].id+")'>Editar</button>"+ " " + " " +
									"<button type='button'class='btn btn-trash' onclick='confExcluir("+listPesj[i].id+")'>Excluir</button>"+
								"</td>";						
						html += "</tr>";  
			    }
		    }else{
			    if(listPesj == undefined || (listPesj != undefined && listPesj.length > 0)){

					if(busca == ""){						
						busca = null;
					}
					var tipo = 2;
					var cfg = {
							
						url: ONG.contextPath + "/rest/pessoa/tipo/" + tipo,
						
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

	cadspesjuridica = function(){

		var msg  = "";
		msg += validaVazio("Razao Social: ", $("#razaosocial").val());
		msg += validaVazio("Cnpj: ", $("#cnpj").val());
		msg += validaVazio("Email: ", $("#email").val());
		msg += validaVazio("Telefone Fixo: ", $("#telfixo").val());
		msg += validaVazio("Estado: ", $("#estado").val());
		msg += validaVazio("Cidade: ", $("#cidade").val());
		msg += validaVazio("Bairro: ", $("#bairro").val());
		msg += validaVazio("Rua: ", $("#rua").val());
		msg += validaVazio("Complemento: ", $("#complemento").val());
		msg += validaVazio("Numero: ", $("#numero").val());

		if(msg == ""){
			var exp = validaCampos();
            if(exp==""){

            	var dadosPJ = {
            	
	            	nome: $("#razaosocial").val(),
					tipo: 2,
					status: 5,
					cnpj: $("#cnpj").val(),
					email: $("#email").val(),
	            	dt_nasc: $("#datanascimento").val(),
	            	foneFixo: $("#telfixo").val(),
	            	foneMovel: $("#telmovel").val(),
					cidade:{ 
						id: $("#cidade").val()
					},
					rua: $("#rua").val(),
	            	complemento: $("#complemento").val(),
	            	numero: $("#numero").val(),
	            	cep: $("#cep").val() 
	            };
            	var cfg = {
        			url: ONG.contextPath +"/rest/pessoa/",
        			data: dadosPJ,
        			success: function(msg){		
        				bootbox.alert("Realizado cadastro com sucesso ");
        			},
        			error: function(err){								
        				bootbox.alert("Erro ao realizar cadastro, entrar em contato com o Administrador se o problema persistir!");
        			}
        		};					
        		ONG.ajax.post(cfg);
            }else{
                bootbox.alert(exp);
            }
        }else{
            bootbox.alert("Caro usuário, gentileza verificar os seguintes campos: <br> " + msg);
        }
	}
	
	//  ====----------------- VALIDAÇÕES
	
	validaVazio = function ( campo, valor ) {
		
        var msg = "";

        if(valor == null ||  valor.trim() == ""){
            msg += "- " + campo + " Está Vazio. </br>";
        }
        return msg;
    };
    validaCampos = function(){

    	var exp = "";

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
        if(!$("#cep").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }
        if(!$("#telfixo").val().match(/^\d{10,13}$/)){    
            exp+="Telefone Fixo invalido ! </br> " + "</br>";
        }
    	return exp;
    };
    // ------------------------

    buscID = function( id ){
    	$.ajax({
			  
			url: ONG.contextPath + "/rest/pessoa/id/" + id,				  
			success:function(dados){

				if(dados != ""){
		    		$("#razaosocial").val(dados.nome);
		    		$("#cnpj").val(dados.cnpj);
		    		$("#email").val(dados.email);
		    		$("#telfixo").val(dados.foneFixo);
		    		$("#telmovel").val(dados.foneMovel);
		    		$("#bairro").val(dados.bairro);
		    		$("#rua").val(dados.rua);
					$("#complemento").val(dados.complemento);
					$("#numero").val(dados.numero);
					$("#cep").val(dados.cep);
					buscaEstado();
		    	}			
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    };

    editarPJ = function(){

    	var msg  = "";
		msg += validaVazio("Razao Social: ", $("#razaosocial").val());
		msg += validaVazio("Cnpj: ", $("#cnpj").val());
		msg += validaVazio("Email: ", $("#email").val());
		msg += validaVazio("Telefone Fixo: ", $("#telfixo").val());
		msg += validaVazio("Estado: ", $("#estado").val());
		msg += validaVazio("Cidade: ", $("#cidade").val());
		msg += validaVazio("Bairro: ", $("#bairro").val());
		msg += validaVazio("Rua: ", $("#rua").val());
		msg += validaVazio("Complemento: ", $("#complemento").val());
		msg += validaVazio("Numero: ", $("#numero").val());

    	if(msg == ""){
    		var exp = validaCampos();
    		
    		if(exp == ""){
		    	var dadosPJ= {
		            	
		    		nome : $("#razsocial").val(),
		    		tipo : 2,
		    		status : 5,
		    		cnpj : $("#cnpj").val(),
		    		email : $("#email").val(),
		    		dt_nasc : $("#datanascimento").val(),
		    		foneFixo : $("#telfixo").val(),
		    		foneMovel : $("#telmovel").val(),
		    		rua : $("#rua").val(),
		    		complemento : $("#complemento").val(),
		    		numero : $("#numero").val(),
		    		cep : $("#cep").val(),
					cidade : { 
						id: $("#cidade").val() 
					}					
		    	}
		    	$.ajax({
				
					type: 'PUT',
					url:ONG.contextPath + "/rest/pessoa/",
					data: JSON.stringify(dadosPJ),
					
					dataType:'text',
					contentType:'application/json',
					
					success:function(data){	
						bootbox.alert(data);						
					},
					error: function(err){	
						bootbox.alert( err.responseText); 
					}
				});
		    }else{
		    	bootbox.laert(exp);
		    }
	    }else{
	    	bootbox.alert(msg);
	    }
    };

    confExcluir = function(id){
    	bootbox.confirm({

		    message: "Você Desejea EXCLUIr este beneficiario?",
		    buttons: {
		        confirm: {

		            label: 'Sim',
		            className: 'btn-success',
		        },
		        cancel: {

		            label: 'Não',
		            className: 'btn-danger'
		        }
		    },		    
		    callback: function (result) {		        
		        if(result == true){
		        	
		           var cfg={
			
					url:  ONG.contextPath + "/rest/pessoa/idexcluir/" + id,
					success: function (data){
						
						bootbox.alert(data);	
						buscapesJuridica();	            	
					},
					error: function (err){				
						bootbox.alert("Erro ao deletar o contato: " + err.responseText);
					}
				};
				ONG.ajax.delet(cfg);
		        }
		    }
		});		
    }

    buscaEstado = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/estado/" + 1,
			success: function(listEstado){													
				montaSelectEstado(listEstado);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }
    buscaCidade = function(id){
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade){		
				montaSelectCidade(listaCidade);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    montaSelectEstado = function(listEstado) {
    	if(listEstado != undefined && listEstado.length > 0 && listEstado[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado.length; i++) {
				var option = $( "<option></option>" ).appendTo($( '#estado' ));
				option.attr( "value", listEstado[i].id );
				option.html( listEstado[i].nome );
			}
			var items = document.querySelector('#estado');
			items.addEventListener('change', function(){
				var valor =	this.value // o valo
				buscaCidade( valor );
			});
		}
    }

    montaSelectCidade = function( listaCidade ) {
    	if(listaCidade != undefined && listaCidade.length > 0 && listaCidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade.length; i++){
				var option = $( "<option></option>" ).appendTo( $( '#cidade' ) );
				option.attr( "value", listaCidade[i].id );
				option.html( listaCidade[i].nome );
			}
		}
    }
});


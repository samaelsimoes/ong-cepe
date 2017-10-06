$(document).ready(function(){
	consultapesf=function(){
		
	    var busca=$("#conspf").val();	  	
	    buscapefisica(undefined,busca);
	}		
	
	buscapefisica = function(listPesF, busca){

		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += 
			"<thead class='table table-striped'>" +
				"<tr>" +	
					"<th> CPF </th>" + 
					"<th> Nome </th> " +
					"<th> RG </th>" + 
					"<th> E-mail </th>" +
					"<th> Telefone contato </th>" +
					"<th> Rua </th>" +
					"<th> Número </th>" +
					"<th> Ações</th>" +
				"</tr>" +
			"</thead>";							
		    if(listPesF != undefined && listPesF.length > 0 && listPesF[0].id != undefined){			  
			  	for(var i = 0; i < listPesF.length; i++){
					html += "<tr>";		
					html += "<td>" + listPesF[i].cpf + "</td>";
					html += "<td>" + listPesF[i].nome + "</td>";
					html += "<td>" + listPesF[i].rg + "</td>";
					//html += "<td>" + listPesF[i].nascimento + "</td>";
				    html += "<td>" + listPesF[i].email + "</td>";

					if(listPesF[i].foneFixo != null && listPesF[i].foneMovel != null){
						html += "<td>"+	 
									listPesF[i].foneFixo + " - " + listPesF[i].foneMovel +										
								"</td>";
					}else if(listPesF[i].foneFixo != null && listPesF[i].foneMovel == null){
						html += "<td>"+
									listPesF[i].foneFixo+
								"</td>"
					}else if( listPesF[i].foneMovel != null && listPesF[i].foneFixo == null){
						html += "<td>"+
									listPesF[i].foneMovel+
								"</td>"
					}
					//html += "<td>" + listPesF[i].responsavel + "</td>";
					//html += "<td>" + listPesF[i].estado + "</td>";
					//html += "<td>" + listPesF[i].cidade + "</td>";
					//html += "<td>" + listPesF[i].bairro + "</td>";
					html += "<td>" + listPesF[i].rua + "</td>";
					//html += "<td>" + listPesF[i].complemento + "</td>";
					html += "<td>" + listPesF[i].numero + "</td>";

					html += "<td>"+
							"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='buscID("+listPesF[i].id+")'>Editar</button>"+ " " + " " +
							"<button type='button'class='btn btn-trash' onclick='confExcluir("+listPesF[i].id+")'>Excluir</button>"+
						"</td>";						
					html += "</tr>";  

			    }
		    }else{
			    if(listPesF == undefined || (listPesF != undefined && listPesF.length > 0)){

					if(busca == ""){						
						busca = null;
					}

					var tipo = 1;
					ONG.pessoaRest.pesquisarTipo({
						data : tipo,
						success: function(listPesF,busca){													
							buscapefisica(listPesF,busca);
						},
						error: function(err){							
							bootbox.alert("Erro ao Buscar Pessoa Fisica, entrar em contato com o Administrador se o problema persistir!");
						}
					});
				}else{					
					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
		    }
		html +="</table>";
		$("#resupsfisica").html(html);
	}
	
	buscapefisica(undefined, "");

	cadpesFisica = function(){

		var msg  = "";
		msg += validaVazio("Nome: ", $("#nome").val());
		msg += validaVazio("CPF: ", $("#cpf").val());
		msg += validaVazio("RG: ", $("#rg").val());
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

            	var date = $("#datanascimento").val();
				var d = new Date(date.split("/").reverse().join("-"));
				
            	var dadosPF = {
            	
	            	nome: $("#nome").val(),
					tipo: 1,
					status: 1,
					cpf: $("#cpf").val(),
					rg: $("#rg").val(),
					email: $("#email").val(),
					bairro: $("#bairro").val(),
	            	nascimento: d.getTime(),

	            	foneFixo: $("#telfixo").val(),
	            	foneMovel: $("#telmovel").val(),

					cidade:{ 
						id: parseInt($("#cidade").val())
					},

					rua: $("#rua").val(),
	            	complemento: $("#complemento").val(),
	            	numero: $("#numero").val(),
	            	cep: $("#cep").val() 
	            };
				ONG.pessoaRest.inserir({
					data : dadosPJ,
        			success: function(msg){		
        				bootbox.alert("Realizado cadastro com sucesso ");
        				setTimeout(function(){
	    	    	         location.reload();
	    	    	    }, 2000);
        			},
        			error: function(err){								
        				bootbox.alert("Erro ao realizar cadastro, entrar em contato com o Administrador se o problema persistir!");
        			}
				});
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
            msg += "-" + campo + " Está Vazio. </br>";
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
        if(!$("#cpf").val().match(/^\d{11,12}$/)){
        	exp+="cpf invalido ! </br> " + "</br>";
        }
        if(!$("#rg").val().match(/^\d{9,13}$/)){
        	exp+="rg invalido ! </br> " + "</br>";
        }
        if(!$("#cep").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }
        if(!$("#telfixo").val().match(/^\d{10,13}$/)){    
            exp+="Telefone Fixo invalido ! </br> " + "</br>";
        }
    	return exp;
    };
    validaCamposEdit = function(){
    	var exp = "";
    	if($("#emailedit").val().indexOf("@") == -1 || //valida se existe o @
            $("#emailedit").val().indexOf(".") == -1 || //valida se existe o .
            $("#emailedit").val().indexOf("@") == 0 || //valida se tem texto antes do @
            $("#emailedit").val().lastIndexOf(".") + 1 == email.length || //valida se tem texto depois do ponto
            ($("#emailedit").val().indexOf("@") + 1 == $("#email").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                
            exp += "E-mail invalido" +"</br>"
            + "ex: teste_@teste.com.br"
            document.getElementById("emailedit").focus();
        }
        if(!$("#cpfedit").val().match(/^\d{11,12}$/)){
        	exp += "cpf invalido ! </br> " + "</br>";
        }
        if(!$("#rgedit").val().match(/^\d{9,13}$/)){
        	exp += "rg invalido ! </br> " + "</br>";
        }
        if(!$("#cepedit").val().match(/^\d{8,9}$/)){
        	exp += "Cep invalido ! </br> " + "</br>";
        }
        if(!$("#telfixoedit").val().match(/^\d{10,13}$/)){    
            exp += "Telefone Fixo invalido ! </br> " + "</br>";
        }
    	return exp;
    };
    // ------------------------

    buscID = function( id ){
    	
		ONG.pessoaRest.pesquisarId({
			data : id,
			success:function(dados){

				if(dados != ""){
					
					$("#id").val(dados.id);
		    		$("#nomeedit").val(dados.nome);
		    		$("#rgedit").val(dados.rg);
		    		$("#cpfedit").val(dados.cpf);
		    		$("#emailedit").val(dados.email);
		    		$("#telfixoedit").val(dados.foneFixo);
		    		$("#telmoveledit").val(dados.foneMovel);
		    		$("#bairroedit").val(dados.bairro);
		    		$("#ruaedit").val(dados.rua);
					$("#complementoedit").val(dados.complemento);
					$("#numeroedit").val(dados.numero);
					$("#cepedit").val(dados.cep);
					buscaEstadoEdit();
		    	}			
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    };

    editarPF = function() {

    	var msg  = "";
    	
    	if($("#id").val() == ""){
    		msg += " Entrar em contato com o administrador, falha ao editar pessoas, campo id vindo vazio";
    	}
    	
		msg += validaVazio("Nome ", $("#nomeedit").val());
		msg += validaVazio("CPF: ", $("#cpfedit").val());
		msg += validaVazio("RG: ", $("#rgedit").val());
		msg += validaVazio("Email: ", $("#emailedit").val());
		msg += validaVazio("Telefone Fixo: ", $("#telfixoedit").val());
		msg += validaVazio("Estado: ", $("#estadoedit").val());
		msg += validaVazio("Cidade: ", $("#cidadeedit").val());
		msg += validaVazio("Bairro: ", $("#bairroedit").val());
		msg += validaVazio("Rua: ", $("#ruaedit").val());
		msg += validaVazio("Complemento: ", $("#complementoedit").val());
		msg += validaVazio("Numero: ", $("#numeroedit").val());

    	if(msg == ""){
    		var exp = validaCamposEdit();    		
    		if(exp == ""){
		    	var dadosPF = {
		            
		    		id: $("#id").val(),
		    		nome: $("#nomeedit").val(),
		    		tipo: 1,
		    		status: 1,
		    		cpf: $("#cpfedit").val(),
		    		rg: $("#rgedit").val(),
		    		email: $("#emailedit").val(),
		    		bairro: $("#bairroedit").val(),
		    		nascimento: $("#datanascimentoedit").val(),
		    		foneFixo: $("#telfixoedit").val(),
		    		foneMovel: $("#telmoveledit").val(),
		    		rua: $("#ruaedit").val(),
		    		complemento: $("#complementoedit").val(),
		    		numero: $("#numeroedit").val(),
		    		cep: $("#cepedit").val(),		    		
					cidade: { 
						id: $("#cidadeedit").val() 
					}	
		    	}
				ONG.pessoaRest.editar({
					data : dadosPF,
					success:function(data){	
						
						bootbox.alert(data);
						
						setTimeout(function(){
	    	    	        location.reload();
	    	    	    }, 2000);					
					},
					error: function(err){	
						bootbox.alert( err.responseText); 
					}
				});
		    }else{
		    	bootbox.alert(exp);
		    }
	    }else{
	    	bootbox.alert(msg);
	    }
    };

    confExcluir = function(id){
    	bootbox.confirm({

		    message: "Você Deseja excluir?",
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
					ONG.pessoaRest.excluir({
						data : id,
						success: function (data){
							
							bootbox.alert(data);	
							setTimeout(function(){
		    	    	         location.reload();
		    	    	    }, 1000);           	
						},
						error: function (err){				
							bootbox.alert("Erro ao deletar o contato: " + err.responseText);
						}
					});
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
				var option = $( "<option></option>" ).appendTo($('#estado'));
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

    // EDITAR

    buscaEstadoEdit = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/estado/" + 1,
			success: function(listEstado){													
				montaSelectEstadoEdit(listEstado);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    buscaCidadeEdit = function(id){
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade){		
				montaSelectCidadeEdit(listaCidade);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    montaSelectEstadoEdit = function(listEstado) {
    	if(listEstado != undefined && listEstado.length > 0 && listEstado[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#estadoedit'));
				option.attr( "value", listEstado[i].id );
				option.html( listEstado[i].nome );
			}

			var itemsedit = document.querySelector('#estadoedit');
			itemsedit.addEventListener('change', function(){
				var valor =	this.value // o valo
				buscaCidadeEdit( valor );
			});
		}
    }

    montaSelectCidadeEdit = function( listaCidade ) {
    	if(listaCidade != undefined && listaCidade.length > 0 && listaCidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade.length; i++){
				var option = $( "<option></option>" ).appendTo( $( '#cidadeedit' ) );
				option.attr( "value", listaCidade[i].id );
				option.html( listaCidade[i].nome );
			}
		}
    }
});


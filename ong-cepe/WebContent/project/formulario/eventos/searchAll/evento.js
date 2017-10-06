$(document).ready(function(){
	searchAllEvent=function(){ 		
	    var busca=$("#conspj").val();	  	
	    searchEvent(undefined,busca);
	}		 	
	searchEvent = function(listEvent, busca){

		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += 
			"<thead class='table table-striped '>" +
				"<tr>" +
					
					"<th> Custo </th>" + 
					"<th> Nome </th> " +
					"<th> Descrição </th>" +
					"<th> Data </th>" +
					"<th> Cep </th>" +
					"<th> Estado </th>" +
					"<th> Cidade </th>" +
					"<th> Bairro </th>" +
					"<th> Rua </th>" +
					"<th> Número </th>" +
					"<th> Complemento </th>" +
					"<th style='width: 15%;'> Ações</th>" +
				"</tr>" +
			"</thead>";					
		
		    if(listEvent != undefined && listEvent.length > 0 && listEvent[0].id != undefined){
			  
			  	for(var i = 0; i < listEvent.length; i++){

					html += "<tr>";					
						html += "<td>" + listEvent[i].custo + "</td>";
						html += "<td>" + listEvent[i].nome + "</td>";
						html += "<td>" + listEvent[i].descricao + "</td>";
						html += "<td>" + listEvent[i].data + "</td>";
						html += "<td>" + listEvent[i].hora + "</td>";
						html += "<td>" + listEvent[i].estado + "</td>";
						html += "<td>" + listEvent[i].cidade + "</td>";
						html += "<td>" + listEvent[i].bairro + "</td>";
						html += "<td>" + listEvent[i].rua + "</td>";
						html += "<td>" + listEvent[i].numero + "</td>";
						html += "<td>" + listEvent[i].complemento + "</td>";

						html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='buscID("+listEvent[i].id+")'>Editar</button>"+ " " + " " +
									"<button type='button'class='btn btn-trash' onclick='confExcluir("+listEvent[i].id+")'>Excluir</button>"+
								"</td>";						
					html += "</tr>";  
			    }
		    }else{
			    if(listEvent == undefined || (listEvent != undefined && listEvent.length > 0)){
			    	
			    	var tipo = 0;
					var cfg = {
							
						url: ONG.contextPath + "/rest/evento/tipo/" + tipo,
						
						success: function(listEvent,busca){													
							searchEvent(listEvent,busca);
						},
						error: function(err){							
							bootbox.alert("Erro ao Buscar Eventos, entrar em contato com o Administrador se o problema persistir!");
						}
					};					
					ONG.ajax.get(cfg);
				}else{					
					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
		    }
		html +="</table>";
		$("#resuAllEvents").html(html);
	}
	
	searchEvent(undefined, "");

	addevent = function(){

		var msg  = "";
		msg += validaVazio("Nome: ", $("#nome").val());
		msg += validaVazio("Tipo evento: ", $("#typeevent").val());		
		msg += validaVazio("Cep: ", $("#cep").val());
		msg += validaVazio("Data: ", $("#data").val());
		msg += validaVazio("Hora: ", $("#horario").val());
		msg += validaVazio("Estado: ", $("#estado").val());
		msg += validaVazio("Cidade: ", $("#cidade").val());
		msg += validaVazio("Bairro: ", $("#bairro").val());			
		msg += validaVazio("Rua: ", $("#rua").val());
		msg += validaVazio("Complemento: ", $("#complemento").val());
		msg += validaVazio("Descrição: ", $("#descricao").val());
		//msg += validaVazio("Modalidade: ", $("#modalidade").val());

		if(msg == ""){
			var exp = validaCampos();
			
			var date = $("#data").val();
			var d = new Date(date.split("/").reverse().join("-"));
			
            if(exp==""){
            	
            	var dadosPJ = {
            			
	            	nome: $("#nome").val(),
					tipo: $("#typeevent").val(),
					//status: 1,
					data: d.getTime(),
					hora: $("#hora").val(),					
					cidade:{ 
						id: parseInt($("#cidade").val())
					},
	            	bairro: $("#bairro").val(),
					rua: $("#rua").val(),
	            	complemento: $("#complemento").val(),
	            	numero: $("#numero").val(),
	            	cep: $("#cep").val(),
	            	descricao: $("#descricao").val(),
	            	modalidade: 1
	            };
            	var cfg = {
        			url: ONG.contextPath +"/rest/evento/",
        			data: dadosPJ,
        			success: function(msg){		
        				bootbox.alert(msg);
        				setTimeout(function(){
	    	    	         location.reload();
	    	    	    }, 2000);            	
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

        if(!$("#cep").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }

    	return exp;
    };
    /*
    validaCamposedit = function(){

    	var exp = "";

    	if($("#emailedit").val().indexOf("@") == -1 || //valida se existe o @
            $("#emailedit").val().indexOf(".") == -1 || //valida se existe o .
            $("#emailedit").val().indexOf("@") == 0 || //valida se tem texto antes do @
            $("#emailedit").val().lastIndexOf(".") + 1 == email.length || //valida se tem texto depois do ponto
            ($("#emailedit").val().indexOf("@") + 1 == $("#email").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                
            exp+="E-mail invalido" +"</br>"
            + "ex: teste_@teste.com.br"
            document.getElementById("emailedit").focus();
        }
        if(!$("#cnpjedit").val().match(/^\d{14,15}$/)){
        	exp+="CNPJ invalido ! </br> " + "</br>";
        }
        if(!$("#cepedit").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }
        if(!$("#telfixoedit").val().match(/^\d{10,13}$/)){    
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
					$("#id").val(dados.id);
		    		$("#razaosocialedit").val(dados.nome);
		    		$("#cnpjedit").val(dados.cnpj);
		    		$("#emailedit").val(dados.email);
		    		$("#telfixoedit").val(dados.foneFixo);
		    		$("#telmoveledit").val(dados.foneMovel);
		    		$("#bairroedit").val(dados.bairro);
		    		$("#ruaedit").val(dados.rua);
					$("#complementoedit").val(dados.complemento);
					$("#numeroedit").val(dados.numero);
					$("#cepedit").val(dados.cep);
					buscaEstadoedit();
		    	}			
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    };

    editarPJ = function(){

    	var msg  = "";
    	
    	if($("#id").val() == ""){
    		msg += " Impossivel editar pessoa Juridica, gentileza entrar em contato com o administrador, motivo sem campo id";
    	}
    	
		msg += validaVazio("Razao Social: ", $("#razaosocialedit").val());
		msg += validaVazio("Cnpj: ", $("#cnpjedit").val());
		msg += validaVazio("Email: ", $("#emailedit").val());
		msg += validaVazio("Telefone Fixo: ", $("#telfixoedit").val());
		msg += validaVazio("Estado: ", $("#estadoedit").val());
		msg += validaVazio("Cidade: ", $("#cidadeedit").val());
		msg += validaVazio("Bairro: ", $("#bairroedit").val());
		msg += validaVazio("Rua: ", $("#ruaedit").val());
		msg += validaVazio("Complemento: ", $("#complementoedit").val());
		msg += validaVazio("Numero: ", $("#numeroedit").val());

    	if(msg == ""){
    		var exp = validaCamposedit();
    		
    		if(exp == ""){
		    	var dadosPJ= {
		            
		    		id: $("#id").val(),
		    		nome: $("#razaosocialedit").val(),
		    		tipo: 2,
		    		status: 1,
		    		cnpj: $("#cnpjedit").val(),
		    		email: $("#emailedit").val(),
		    		nascimento: $("#datanascimentoedit").val(),
		    		foneFixo: $("#telfixoedit").val(),
		    		foneMovel: $("#telmoveledit").val(),
		    		rua: $("#ruaedit").val(),
		    		complemento: $("#complementoedit").val(),
		    		numero: $("#numeroedit").val(),
		    		cep: $("#cepedit").val(),
		    		
					cidade : { 
						id: parseInt($("#cidadeedit").val())
					}					
		    	}
		    	$.ajax({
				
					type: 'PUT',
					url:ONG.contextPath + "/rest/pessoa/",
					data: JSON.stringify(dadosPJ),
					
					dataType:'text',
					contentType:'application/json',
					
					success:function(data) {	
						bootbox.alert(data);	
						setTimeout(function(){
	    	    	         location.reload();
	    	    	    }, 1000);
					},
					error: function(err) {	
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

    confExcluir = function(id) {
    	bootbox.confirm({
		    message: "Você Desejea excluir?",
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
		        	
		           var cfg = {
			
					url: ONG.contextPath + "/rest/pessoa/idexcluir/" + id,
					success: function (data) {						
						bootbox.alert(data);	
						setTimeout(function(){
	    	    	         location.reload();
	    	    	    }, 1000);	            	
					},
					error: function (err) {				
						bootbox.alert("Erro ao deletar: " + err.responseText);
					}
				};
				ONG.ajax.delet(cfg);
		        }
		    }
		});		
    }
*/
    buscaEstado = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/estado/" + 1,
			success: function(listEstado){													
				montaSelectEstado(listEstado);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }
    buscaCidade = function(id) {
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade) {		
				montaSelectCidade(listaCidade);
			},
			error: function(err) {							
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

    // EDITAR CIDADE E ESTADO
    buscaEstadoedit = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/estado/" + 1,
			success: function(listEstado){													
				montaSelectEstadoedit(listEstado);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }
    buscaCidadeedit = function(id) {
    	console.log(cidade);
    	console.log(id);
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade) {	
				console.log(listaCidade);
				montaSelectCidadeedit(listaCidade);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    montaSelectEstadoedit = function(listEstado) {
    	if(listEstado != undefined && listEstado.length > 0 && listEstado[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#estadoedit'));
				option.attr( "value", listEstado[i].id );
				option.html( listEstado[i].nome );
			}
			var items = document.querySelector('#estadoedit');
			items.addEventListener('change', function() {
				var valor =	this.value // o valo
				buscaCidadeedit( valor );
			});
		}
    }

    montaSelectCidadeedit = function( listaCidade ) {
    	if(listaCidade != undefined && listaCidade.length > 0 && listaCidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade.length; i++){
				var option = $( "<option></option>" ).appendTo( $( '#cidadeedit' ) );
				option.attr( "value", listaCidade[i].id );
				option.html( listaCidade[i].nome );
			}
		}
    }
});


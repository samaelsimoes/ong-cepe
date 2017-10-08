ONG.evento = new Object();

$(document).ready(function(){
	ONG.evento.searchAllEvent=function(){ 	
		
	    var busca=$("#conspj").val();	  	
	    ONG.evento.searchEvent(undefined,busca);
	}		 	
	ONG.evento.searchEvent = function(listEvent, busca){

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
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.evento.buscID("+listEvent[i].id+")'>Editar</button>"+ " " + " " +
									"<button type='button'class='btn btn-trash' onclick='ONG.evento.confExcluir("+listEvent[i].id+")'>Excluir</button>"+
								"</td>";						
					html += "</tr>";  
			    }
		    }else{
			    if(listEvent == undefined || (listEvent != undefined && listEvent.length > 0)){
			    	
			    	var tipo = 0;
					var cfg = {
							
						url: ONG.contextPath + "/rest/evento/tipo/" + tipo,
						
						success: function(listEvent,busca){													
							ONG.evento.searchEvent(listEvent,busca);
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
	
	ONG.evento.searchEvent(undefined, "");

	ONG.evento.addevent = function(){

		var msg  = "";
		msg += ONG.evento.validaVazio("Nome: ", $("#nome").val());
		msg += ONG.evento.validaVazio("Tipo evento: ", $("#typeevent").val());		
		msg += ONG.evento.validaVazio("Cep: ", $("#cep").val());
		msg += ONG.evento.validaVazio("Data: ", $("#data").val());
		msg += ONG.evento.validaVazio("Hora: ", $("#horario").val());
		msg += ONG.evento.validaVazio("Estado: ", $("#addestado").val());
		msg += ONG.evento.validaVazio("Cidade: ", $("#addcidade").val());
		msg += ONG.evento.validaVazio("Bairro: ", $("#bairro").val());			
		msg += ONG.evento.validaVazio("Rua: ", $("#rua").val());
		msg += ONG.evento.validaVazio("Complemento: ", $("#complemento").val());
		msg += ONG.evento.validaVazio("Descrição: ", $("#descricao").val());
		//msg += validaVazio("Modalidade: ", $("#modalidade").val());

		if(msg == ""){
			var exp = ONG.evento.validaCampos();
			
			var date = $("#data").val();
			var d = new Date(date.split("/").reverse().join("-"));
			var b= 2;
            if(exp==""){
            	
            	var dadosPJ = {
            			
	            	nome: $("#nome").val(),
					tipo: $("#typeevent").val(),
	            	descricao: $("#descricao").val(),
					data: d.getTime(),
					hora: $("#hora").val(),					
	            	cep: $("#cep").val(),
	            	cidade:{ 
						id: parseInt($("#addcidade").val())
					},
	            	bairro: $("#bairro").val(),
	            	numero: $("#numero").val(),
	            	complemento: $("#complemento").val(),				
					rua: $("#rua").val(),
	            	modalidade: {
	            		id: parseInt(b)
	            	},
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
	
	ONG.evento.validaVazio = function ( campo, valor ) {
		
        var msg = "";

        if(valor == null ||  valor.trim() == ""){
            msg += "- " + campo + " Está Vazio. </br>";
        }
        return msg;
    };
    ONG.evento.validaCampos = function(){

    	var exp = "";

        if(!$("#cep").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }

    	return exp;
    };
    /*
    ONG.evento.validaCamposedit = function(){

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

    ONG.evento.buscID = function( id ){
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
					ONG.evento.buscaEstadoedit();
		    	}			
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    };

    ONG.evento.editarPJ = function(){

    	var msg  = "";
    	
    	if($("#id").val() == ""){
    		msg += " Impossivel editar pessoa Juridica, gentileza entrar em contato com o administrador, motivo sem campo id";
    	}
    	
		msg += ONG.evento.validaVazio("Razao Social: ", $("#razaosocialedit").val());
		msg += ONG.evento.validaVazio("Cnpj: ", $("#cnpjedit").val());
		msg += ONG.evento.validaVazio("Email: ", $("#emailedit").val());
		msg += ONG.evento.validaVazio("Telefone Fixo: ", $("#telfixoedit").val());
		msg += ONG.evento.validaVazio("Estado: ", $("#estadoedit").val());
		msg += ONG.evento.validaVazio("Cidade: ", $("#cidadeedit").val());
		msg += ONG.evento.validaVazio("Bairro: ", $("#bairroedit").val());
		msg += ONG.evento.validaVazio("Rua: ", $("#ruaedit").val());
		msg += ONG.evento.validaVazio("Complemento: ", $("#complementoedit").val());
		msg += ONG.evento.validaVazio("Numero: ", $("#numeroedit").val());

    	if(msg == ""){
    		var exp = ONG.evento.validaCamposedit();
    		
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
    ONG.evento.buscaEstado = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/estado/" + 1,
			success: function(listEstado){		
				console.log(listEstado);
				ONG.evento.montaSelectEstado(listEstado);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }
    ONG.evento.buscaCidade = function(id) {
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade) {
				console.log(listaCidade)
				ONG.evento.montaSelectCidade(listaCidade);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.evento.montaSelectEstado = function(listEstado) {
    	if(listEstado != undefined && listEstado.length > 0 && listEstado[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#addestado'));
				option.attr( "value", listEstado[i].id );
				option.html( listEstado[i].nome );
			}
			var items = document.querySelector('#addestado');
			items.addEventListener('change', function(){
				var valor =	this.value // o valo
				ONG.evento.buscaCidade( valor );
			});
		}
    }

    ONG.evento.montaSelectCidade = function( listaCidade ) {
    	if(listaCidade != undefined && listaCidade.length > 0 && listaCidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade.length; i++){
				var option = $( "<option></option>" ).appendTo( $( '#addcidade' ) );
				option.attr( "value", listaCidade[i].id );
				option.html( listaCidade[i].nome );
			}
		}
    }

    // EDITAR CIDADE E ESTADO
    ONG.evento.buscaEstadoedit = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/estado/" + 1,
			success: function(listEstado){													
				ONG.evento.montaSelectEstadoedit(listEstado);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }
    ONG.evento.buscaCidadeedit = function(id) {
    	console.log(id);
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade) {	
				console.log(listaCidade);
				ONG.evento.montaSelectCidadeedit(listaCidade);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.evento.montaSelectEstadoedit = function(listEstado) {
    	if(listEstado != undefined && listEstado.length > 0 && listEstado[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#estadoedit'));
				option.attr( "value", listEstado[i].id );
				option.html( listEstado[i].nome );
			}
			var items = document.querySelector('#estadoedit');
			items.addEventListener('change', function() {
				var valor =	this.value // o valo
				ONG.evento.buscaCidadeedit( valor );
			});
		}
    }

    ONG.evento.montaSelectCidadeedit = function( listaCidade ) {
    	if(listaCidade != undefined && listaCidade.length > 0 && listaCidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade.length; i++){
				var option = $( "<option></option>" ).appendTo( $( '#cidadeedit' ) );
				option.attr( "value", listaCidade[i].id );
				option.html( listaCidade[i].nome );
			}
		}
    }
});


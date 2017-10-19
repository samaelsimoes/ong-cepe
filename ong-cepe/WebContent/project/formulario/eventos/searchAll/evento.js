ONG.evento = new Object();

$(document).ready(function(){
	ONG.evento.searchAllEvent=function(){ 	
		
	    var busca=$("#consuev").val();	  	
	    ONG.evento.searchEvent(undefined,busca);
	}		 	
	ONG.evento.searchEvent = function(listEvent, busca){

		var html = "<table id='tabela' class='tablesorter table table-responsive custom-table-margin-b'>";
		
		html += 
			"<thead class='table table-striped '>" +
				"<tr>" +
					
					"<th> Nome </th> " +
					"<th> Descrição </th>" +
					"<th> Tipo </th>" +
					"<th> Cep </th>" +
					"<th> Data </th>" +
					"<th> Estado </th>" +
					"<th> Cidade </th>" +
					"<th> Bairro </th>" +
					"<th> Rua </th>" +
					"<th> Número </th>" +
					"<th> Complemento </th>" +
					"<th style='width: 15%;'> Ações</th>" +
				"</tr>" +
			"</thead>" +
			"<tbody>";					
		
		    if(listEvent != undefined && listEvent.length > 0 && listEvent[0].id != undefined){
			  
			  	for(var i = 0; i < listEvent.length; i++){
			  		
					html += "<tr>";					
						html += "<td>" + listEvent[i].nome + "</td>";
						html += "<td>" + listEvent[i].descricao + "</td>";
						
						if(listEvent[i].tipo = 1){
							html += "<td>"+	 
											"Beneficiente" +
									"</td>";
						}else if(listEvent[i].tipo = 2){
							html += "<td>"
										+"Sessao"+
									"</td>"
						}else if( listEvent[i].tipo = 3){
							html += "<td>"
										+"Viagem"+
									"</td>"
						}
						
						html += "<td>" + listEvent[i].cep + "</td>";
						html += "<td>" + listEvent[i].data + "</td>";
						html += "<td>" + listEvent[i].cidade + "</td>";
						html += "<td>" + listEvent[i].cidade.nome + "</td>";
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
			    	var buscaEvento;
			    	console.log(busca);
			    	if ( busca != "" ) {
			    		buscaEvento = busca;
			    	}else if (busca == "") {
			    		buscaEvento = "*"
			    	}
			    	
					var cfg = {
							
						url: ONG.contextPath + "/rest/evento/nome/" + buscaEvento,
						
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
		html +="</tbody>";
		html +="</table>";
		$("#resuAllEvents").html(html);
		$('#tabela').tablesorter({
			headers: { 			// (começa do zero)
				11: {			// Desativa a ordenação para essa coluna 
					sorter: false 
				},
			},
		});
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
			var modalidade = $("#modalidade").val();
			
            if(exp==""){
            	
            	var dadosEvent = {
            			
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
	            		id: parseInt(modalidade)
	            	},
	            };
            	var cfg = {
        			url: ONG.contextPath +"/rest/evento/",
        			data: dadosEvent,
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
    
    // ------------------------

    ONG.evento.buscID = function( id ){
    	$.ajax({
			  
			url: ONG.contextPath + "/rest/evento/id/" + id,				  
			success:function(dados){

				if(dados != ""){
					$("#id").val(dados.id);
		    		$("#nomeedit").val(dados.nome);
		    		$("#typeeventedit").val(dados.tipo);
		    		$("#cepedit").val(dados.cep);
		    		$("#modalidadeedit").val(dados.modalidade);
		    		$("#horarioedit").val(dados.hora);
		    		$("#estadoedit").val(dados.cidade.estado.nome);
		    		$("#cidadeedit").val(dados.cidade.nome);
					$("#bairroedit").val(dados.bairro);
					$("#ruaedit").val(dados.rua);
					$("#numeroedit").val(dados.numero);
					$("#complementoedit").val(dados.complemento);
					$("#descricaoedit").val(dados.descricao);

					ONG.evento.buscaEstadoedit();
		    	}			
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    };

    ONG.evento.editarEvent = function(){

    	var msg  = "";
    	
    	if($("#id").val() == ""){
    		msg += " Impossivel editar Evento, gentileza entrar em contato com o administrador, motivo sem campo id";
    	}
    	
		msg += ONG.evento.validaVazio("Nome: ", $("#nomeedit").val());
		msg += ONG.evento.validaVazio("Tipo de evento: ", $("#typeeventedit").val());
		msg += ONG.evento.validaVazio("Cep: ", $("#cepedit").val());
		msg += ONG.evento.validaVazio("Bairro: ", $("#bairroedit").val());
		msg += ONG.evento.validaVazio("Data: ", $("#dataedit").val());
		msg += ONG.evento.validaVazio("Horario: ", $("#horarioedit").val());
		msg += ONG.evento.validaVazio("Estado: ", $("#estadoedit").val());
		msg += ONG.evento.validaVazio("Cidade: ", $("#cidadeedit").val());
		msg += ONG.evento.validaVazio("Modalidade: ", $("#modalidadeedit").val());
		msg += ONG.evento.validaVazio("Rua: ", $("#ruaedit").val());
		msg += ONG.evento.validaVazio("Numero: ", $("#numeroedit").val());
		msg += ONG.evento.validaVazio("Complemento: ", $("#complementoedit").val());
		msg += ONG.evento.validaVazio("Descrição: ", $("#descricaoedit").val());

		
		var dateedit = $("#dataedit").val();
		var d = new Date(dateedit.split("/").reverse().join("-"));
		var editmodalidade = $("#modalidade").val();
		
    	if(msg == ""){
    		
	    	var dadosEvEdit= {		 
    			nome: $("#nomeedit").val(),
				tipo: $("#typeeventedit").val(),
				descricao: $("#descricaoedit").val(),
				data: d.getTime,
				hora: $("#horarioedit").val(),					
            	cep: $("cepedit").val(),
            	cidade:{ 
					id: parseInt($("#cidadeedit").val())
				},
            	bairro: $("#bairroedit").val(),
            	numero: $("#numeroedit").val(),
            	complemento: $("#complementoedit").val(),				
				rua: $("#ruaedit").val(),
            	modalidade: {
            		id: parseInt(editmodalidade)
	            	},				
	    	}
	    	$.ajax({
			
				type: 'PUT',
				url:ONG.contextPath + "/rest/evento/",
				data: JSON.stringify(dadosEvEdit),
				
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
	    	bootbox.alert(msg);
	    }
    };

    ONG.evento.confExcluir = function(id) {
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
			
					url: ONG.contextPath + "/rest/evento/id/" + id,
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
			ONG.evento.buscamodalidade();
		}
    }
    
    ONG.evento.buscamodalidade = function(){
    	
    	var cfg = {							 
    			url: ONG.contextPath +  "/rest/modalidade/nome/*",
    			success: function(modalidade) {
    				console.log(modalidade)
    				ONG.evento.montaModalidade(modalidade);
    			},
    			error: function(err) {							
    				bootbox.alert("Erro ao Buscar Modalidade, entrar em contato com o Administrador se o problema persistir! " + err);
    			}
    		};					
    		ONG.ajax.get(cfg);
    }
    ONG.evento.montaModalidade = function(listModalidade){    	
    	if(listModalidade != undefined && listModalidade.length > 0 && listModalidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listModalidade.length; i++){
				var option = $( "<option></option>" ).appendTo( $( '#modalidade' ) );
				option.attr( "value", listModalidade[i].id );
				option.html( listModalidade[i].nome );
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
			ONG.evento.buscamodalidadeedit();
		}
    }
    ONG.evento.buscamodalidadeedit = function(){
    	
    	var cfg = {							 
    			url: ONG.contextPath +  "/rest/modalidade/nome/*",
    			success: function(modalidade) {
    				console.log(modalidade)
    				ONG.evento.montaModalidadeEdit(modalidade);
    			},
    			error: function(err) {							
    				bootbox.alert("Erro ao Buscar Modalidade, entrar em contato com o Administrador se o problema persistir! " + err);
    			}
    		};					
    		ONG.ajax.get(cfg);
    }
    ONG.evento.montaModalidadeEdit = function(listModalidade){    	
    	if(listModalidade != undefined && listModalidade.length > 0 && listModalidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listModalidade.length; i++){
				var option = $( "<option></option>" ).appendTo( $( '#modalidadeedit' ) );
				option.attr( "value", listModalidade[i].id );
				option.html( listModalidade[i].nome );
			}
		}    	
    }
});


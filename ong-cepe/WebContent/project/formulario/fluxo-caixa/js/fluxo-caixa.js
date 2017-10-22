ONG.fluxocaixa = new Object();

$(document).ready(function(){
	ONG.fluxocaixa.buscaTdFluxo=function(){ 	
		
	    var busca=$("#consuev").val();	  	
	    ONG.fluxocaixa.buscaeFluxo(undefined,busca);
	}		 	
	ONG.fluxocaixa.buscaeFluxo = function(listFluxo, busca){

		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += 
			"<thead class='table table-striped '>" +
				"<tr>" +					
					"<th> Centro de Custo </th> " +
					"<th> Tipo </th>" +
					"<th> Data </th>" +
					"<th> Classificação </th>" +
					"<th> pessoa </th>" +
					"<th> evento </th>" +
					"<th> Valor </th>" +
					"<th> Destino </th>" +
					"<th style='width: 15%;'> Ações</th>" +
				"</tr>" +
			"</thead>";					
		
		    if ( listFluxo != undefined && listFluxo.length > 0 && listFluxo[0].id != undefined ) {
			  	for(var i = 0; i < listFluxo.length; i++){
			  		
					html += "<tr>";					
					html += "<td>" + listFluxo[i].centroCusto.nome + "</td>";
						if(listFluxo[i].tipo = 0){ // ?? ainda nao sei vou ver
							html += "<td>" +	 
											"Entrada" +
									"</td>";
						}else if(listFluxo[i].tipo = 1){
							html += "<td>" +
										"Saida" +
									"</td>"
						}else if( listFluxo[i].tipo = 2){
							html += "<td>" + 
										"Transferencia"+
									"</td>"
						}
						
						html += "<td>" + listFluxo[i].data + "</td>";
						
						if(listFluxo[i].classificacao = 0){ // ?? ainda nao sei vou ver
							html += "<td>" +	 
										"Compra" +
									"</td>";
						}else if(listFluxo[i].classificacao = 1){
							html += "<td>" +
										"venda" +
									"</td>"
						}else if( listFluxo[i].classificacao = 2){
							html += "<td>" + 
										"Doação"+
									"</td>"
						}else if( listFluxo[i].classificacao = 3){
							html += "<td>" + 
							"Custo operacional"+
						"</td>"
						}
						html += "<td>" + listFluxo[i].pessoa.nome + "</td>";
						
						
						if(listFluxo[i].evento == undefined || listFluxo[i].evento == null){
							html += "<td>" + "sem evento vinculado"+ "</td>";

						}else if(listFluxo[i].evento != undefined && listFluxo[i].evento != null){
							html += "<td>" + listFluxo[i].evento + "</td>";
						}

						html += "<td>" + listFluxo[i].valor + "</td>";
						html += "<td>" + listFluxo[i].centroCustoDestino.nome + "</td>";

						html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.fluxocaixa.buscID("+listFluxo[i].id+")'>Editar</button>"+ " " + " " +
									"<button type='button'class='btn btn-trash' onclick='ONG.fluxocaixa.confExcluir("+listFluxo[i].id+")'>Excluir</button>"+
								"</td>";						
					html += "</tr>";  
			    }
		    }else{
			    if(listFluxo == undefined || (listFluxo != undefined && listFluxo.length > 0)){
			    							    
					var cfg = {
							
						url: ONG.contextPath + "/rest/operacao/*",
						
						success: function(listFluxo,busca){													
							ONG.fluxocaixa.buscaeFluxo(listFluxo,busca);
						},
						error: function(err){							
							bootbox.alert("Erro ao Buscar informações de Fluxo de caixa, entrar em contato com o Administrador se o problema persistir!");
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
	
	ONG.fluxocaixa.buscaeFluxo(undefined, "");
	
	ONG.fluxocaixa.addFluxo = function () {
		console.log("teste");
		var msg = "";
		
		msg += ONG.fluxocaixa.validaVazio("Tipo: ", $("#tipofluxoadd").val());
		msg += ONG.fluxocaixa.validaVazio("Centro Custo: ", $("#centrocusto2").val());		
		msg += ONG.fluxocaixa.validaVazio("Data: ", $("#data").val());
		msg += ONG.fluxocaixa.validaVazio("Evento: ", $("#evento").val());
		msg += ONG.fluxocaixa.validaVazio("Classificação: ", $("#classificacao").val());
		msg += ONG.fluxocaixa.validaVazio("Pessoa: ", $("#pessoa").val());
		msg += ONG.fluxocaixa.validaVazio("Valor: ", $("#valor").val());
		msg += ONG.fluxocaixa.validaVazio("Destino Centro de Custo: ", $("#centrodecusto3").val());
		msg += ONG.fluxocaixa.validaVazio("Descricao: ", $("#descricao").val());

		if ( msg == "") {
			var date = $("#data").val();
			var d = new Date(date.split("/").reverse().join("-"));
			var eventoadd;
			if($("#evento").val() != ""){
				eventoadd = $("#evento").val();
			}else {
				eventoadd = null;
			}
			var dadosFluxo = {
					
				data: d.getTime(),
	            tipo: $("#tipofluxoadd").val(),
	            classificacao: $("#classificacao").val(),
	            valor: $("#valor").val(),
	            descricao: $("#descricao").val(),
	            centroCusto:{
	            	id: parseInt($("#centrocusto2").val())
	            },
	            centroCustoDestino:{
	            	id: parseInt($("#centrodecusto3").val())
	            },
	            usuario:{
	            	id: 1
	            },
	            pessoa:{
	            	id: parseInt($("#pessoa").val())
	            },
	            evento:null	           
			};
			var cfg = {
						
				url: ONG.contextPath + "/rest/operacao/",
				data: dadosFluxo,
				
				success: function(msg){	
					bootbox.alert(msg);
					setTimeout(function(){
	   	    	         location.reload();
	   	    	    }, 2000);
				},
				error: function(err){							
					bootbox.alert("Erro" + err);
				}
			};					
			ONG.ajax.post(cfg);
		}else{
			bootbox.alert(msg);
		}
	}
	
	ONG.fluxocaixa.validaVazio = function ( campo, valor ) {
		
        var msg = "";

        if(valor == null || valor.trim() == ""){
            msg += "- " + campo + " Está Vazio. </br>";
        }
        return msg;
    };
    ONG.fluxocaixa.validaCampos = function(){

    	var exp = "";

        if(!$("#cep").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }
    	return exp;
    };
    
    // BUSCA CENTRO DE CUSTO  --- -- - -- - - 
    
    ONG.fluxocaixa.buscacusto = function() {
    	ONG.centroCustoRest.pesquisarNome({
			data : "*",
			success: function(lcenter){							
				ONG.fluxocaixa.montaSelect(lcenter);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca do centro de custo:"+err.responseText);
			}
		});
    }
    
    ONG.fluxocaixa.montaSelect = function(listaCentroCusto) {
    	if(listaCentroCusto != undefined && listaCentroCusto.length > 0 && listaCentroCusto[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCentroCusto.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#tipofluxo'));
				option.attr( "value", listaCentroCusto[i].id );
				option.html( listaCentroCusto[i].nome );
			}

			var itemsedit2 = document.querySelector('#tipofluxo');
			itemsedit2.addEventListener('change', function(){
				var valor2 =	this.value // o valo
			});
		}
    }

	// MODAL CADASTRAR, busca todos dados do campos html-selected PESSOA EVENTO CENTRO DE CUSTO E SL

    ONG.fluxocaixa.buscomponenteAdd = function() {
    	ONG.centroCustoRest.pesquisarNome({
			data : "*",
			success: function(lcenter){							
				ONG.fluxocaixa.montaSelectcentrocust (lcenter);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca do centro de custo:"+err.responseText);
			}
		});
    }
    ONG.fluxocaixa.montaSelectcentrocust = function(listaCentroCusto){
    	if(listaCentroCusto != undefined && listaCentroCusto.length > 0 && listaCentroCusto[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCentroCusto.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#centrocusto2'));
				option.attr( "value", listaCentroCusto[i].id );
				option.html( listaCentroCusto[i].nome );
			}

			var item1 = document.querySelector('#centrocusto2');
			item1.addEventListener('change', function(){
				var valor1 = this.value // o valo
			});
			
			for(var i = 0; i < listaCentroCusto.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#centrodecusto3'));
				option.attr( "value", listaCentroCusto[i].id );
				option.html( listaCentroCusto[i].nome );
			}

			var item2 = document.querySelector('#centrodecusto3');
			item2.addEventListener('change', function(){
				var item2 =	this.value // o valo
			});
			ONG.fluxocaixa.buscaEventos();
		}
    }
    ONG.fluxocaixa.buscaEventos = function() {
    	var cfg = {
				
			url: ONG.contextPath + "/rest/evento/nome/*",
		
			success: function(bevento){							
				ONG.fluxocaixa.montaselectevento(bevento);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca de evento:"+err.responseText);
			}
		};
		ONG.ajax.get(cfg);
    }
    ONG.fluxocaixa.montaselectevento = function(listevn) {
    	if(listevn != undefined && listevn.length > 0 && listevn[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listevn.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#evento'));
				option.attr( "value", listevn[i].id );
				option.html( listevn[i].nome );
			}

			var item1 = document.querySelector('#evento');
			item1.addEventListener('change', function(){
				var valor1 = this.value // o valo
			});
			ONG.fluxocaixa.buscaPes();
    	}
    }
    ONG.fluxocaixa.buscaPes = function() {
    	
    	var cfg = {
				
			url: ONG.contextPath + "/rest/pessoa/nome/*",
		
			success: function(listapessoa){							
				ONG.fluxocaixa.montaselectpessoas(listapessoa);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca de pessoas:"+err.responseText);
			}
		};
		ONG.ajax.get(cfg);
    }
    ONG.fluxocaixa.montaselectpessoas = function(listapessoa) {
    	if(listapessoa != undefined && listapessoa.length > 0 && listapessoa[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listapessoa.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#pessoa'));
				option.attr( "value", listapessoa[i].id );
				option.html( listapessoa[i].nome );
			}

			var item1 = document.querySelector('#pessoa');  
			item1.addEventListener('change', function(){
				var valor1 = this.value // o valo
			});
			
    	}
    }
    
    //Excluir    
    ONG.fluxocaixa.confExcluir = function(id){
    	console.log(id);
    	var cfg = {
				
			url: ONG.contextPath + "/rest/operacao/idexcluir/"+id,
		
			success: function(msg){							
				bootbox.alert(msg);
				setTimeout(function(){
   	    	         location.reload();
   	    	    }, 2000);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca de pessoas:"+err.responseText);
			}
		};
		ONG.ajax.delet(cfg);
    }
    
    // ---------------------------------= = = = = = EDITAR
    
    ONG.fluxocaixa.buscID = function(id){
    	var cfg = {
				
			url: ONG.contextPath + "/rest/operacao/id"+id,
			
			success: function(inf){													
				console.log(inf);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar informações de Fluxo de caixa, entrar em contato com o Administrador se o problema persistir!");
			}
		};					
		ONG.ajax.get(cfg);
    }
});
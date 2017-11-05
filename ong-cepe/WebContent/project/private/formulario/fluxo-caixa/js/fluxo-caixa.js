ONG.fluxocaixa = new Object();

$(document).ready(function(){

	ONG.fluxocaixa.pesquisar = function(){
		var cc = $("#tipoCC").val();
		var de = $("#datade").val();
		var ate = $("#dataate").val();
		
		if(cc == "" && de == "" && ate == ""){
			ONG.fluxocaixa.buscarFluxo(undefined, "");
			return false;
		} else if(cc == "" || de == "" || ate == ""){
			bootbox.alert("Selecione um Centro de Custo e o Período.");
			return false;
		}
		
		var d = new Date(de.split("/").reverse().join("-"));
		de = d.getTime();
		d = new Date(ate.split("/").reverse().join("-"));
		ate = d.getTime();
		
    	ONG.fluxoCaixaRest.pesquisarPeriodoCC({
			data : de+"/"+ate+"/"+parseInt(cc),
			success: function(listPesq){													
			    ONG.fluxocaixa.buscarFluxo(listPesq);
			},
			error: function(err){							
				bootbox.alert("Erro ao pesquisar, entrar em contato com o Administrador se o problema persistir!");
			}
		});			
	}		 	
	ONG.fluxocaixa.buscarFluxo = function(listFluxo, busca){

		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += 
			"<thead class='table table-striped '>" +
				"<tr>" +					
					"<th> Centro de Custo </th> " +
					"<th> Tipo </th>" +
					"<th> Data </th>" +
					"<th> Classificação </th>" +
					"<th> Pessoa </th>" +
					"<th> Evento </th>" +
					"<th> Destino </th>" +
					"<th> Descrição </th>" +
					"<th> Valor </th>" +
					"<th actions col-md-2> Ações</th>" +
				"</tr>" +
			"</thead>";					
		
		    if ( listFluxo != undefined && listFluxo.length > 0 && listFluxo[0].id != undefined ) {
			  	for(var i = 0; i < listFluxo.length; i++){
					html += "<tr>";					
					html += "<td>" + listFluxo[i].centroCusto.nome + "</td>";
						if(listFluxo[i].tipo == 0){ // ?? ainda nao sei vou ver
							html += "<td>Entrada</td>";
						}else if(listFluxo[i].tipo == 1){
							html += "<td>Saída</td>";
						}else if(listFluxo[i].tipo == 2){
							html += "<td>Transferência</td>";
						}
						
						html += "<td>" + listFluxo[i].data + "</td>";
						
						if(listFluxo[i].classificacao == 0){ // ?? ainda nao sei vou ver
							html += "<td>Compra</td>";
						}else if(listFluxo[i].classificacao == 1){
							html += "<td>Venda</td>";
						}else if(listFluxo[i].classificacao == 2){
							html += "<td>Doação</td>";
						}else if(listFluxo[i].classificacao == 3){
							html += "<td>Custo operacional</td>";
						}
						
						if(listFluxo[i].pessoa == null || listFluxo[i].pessoa == undefined){
							html += "<td></td>";
						}else if(listFluxo[i].pessoa != null && listFluxo[i].pessoa != undefined){
							html += "<td>" + listFluxo[i].pessoa.nome + "</td>";
						}
						
						if(listFluxo[i].evento == null || listFluxo[i].evento == undefined){
							html += "<td></td>";
						}else if(listFluxo[i].evento != null && listFluxo[i].evento != undefined){
							html += "<td>" + listFluxo[i].evento.nome + "</td>";
						}
						
						if(listFluxo[i].centroCustoDestino == null || listFluxo[i].centroCustoDestino == undefined){
							html += "<td></td>";
						}else if(listFluxo[i].centroCustoDestino != null && listFluxo[i].centroCustoDestino != undefined){
							html += "<td>" + listFluxo[i].centroCustoDestino.nome + "</td>";
						}
						
						html += "<td>" + listFluxo[i].descricao + "</td>";
						html += "<td>" + "R$ " + parseFloat(listFluxo[i].valor).toFixed(2).replace('.',',') + "</td>";
						html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.fluxocaixa.buscID("+listFluxo[i].id+")'>Editar</button>"+
//									"<button type='button'class='btn btn-trash' onclick='ONG.fluxocaixa.confExcluir("+listFluxo[i].id+")'>Excluir</button>"+
								"</td>";						
					html += "</tr>";  
			    }
		    }else{
			    if(listFluxo == undefined || (listFluxo != undefined && listFluxo.length > 0)){
			    	ONG.fluxoCaixaRest.pesquisarNome({
						data : "*",
						success: function(listFluxo,busca){													
							ONG.fluxocaixa.buscarFluxo(listFluxo,busca);
						},
						error: function(err){							
							bootbox.alert("Erro ao Buscar informações de Fluxo de caixa, entrar em contato com o Administrador se o problema persistir!");
						}
					});						    
				}else{					
					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
		    }
		html +="</table>";
		$("#resuAllEvents").html(html);
	}
	
	ONG.fluxocaixa.buscarFluxo(undefined, "");
	
	ONG.fluxocaixa.addFluxo = function () {
		console.log("teste");
		var msg = "";
		
		msg += ONG.fluxocaixa.validaVazio("Tipo: ", $("#tipofluxoadd").val());
		msg += ONG.fluxocaixa.validaVazio("Centro Custo: ", $("#centrocusto2").val());		
		msg += ONG.fluxocaixa.validaVazio("Data: ", $("#data").val());
//		msg += ONG.fluxocaixa.validaVazio("Evento: ", $("#evento").val());
		msg += ONG.fluxocaixa.validaVazio("Classificação: ", $("#classificacao").val());
//		msg += ONG.fluxocaixa.validaVazio("Pessoa: ", $("#pessoa").val());
		msg += ONG.fluxocaixa.validaVazio("Valor: ", $("#valor").val());
		if($("#tipofluxoadd").val() == 2)
			msg += ONG.fluxocaixa.validaVazio("Destino Centro de Custo: ", $("#centrodecusto3").val());
		msg += ONG.fluxocaixa.validaVazio("Descricao: ", $("#descricao").val());

		if ( msg == "") {
			var date = $("#data").val();
			var d = new Date(date.split("/").reverse().join("-"));
			debugger;
			var dadosFluxo = {
				data: d.getTime(),
	            tipo: $("#tipofluxoadd").val(),
	            classificacao: $("#classificacao").val(),
	            valor: $("#valor").val(),
	            descricao: $("#descricao").val(),
	            centroCusto:{
	            	id: parseInt($("#centrocusto2").val())
	            },
	            usuario:{
	            	id: 1
	            }
			};
			if(dadosFluxo.tipo == parseInt(2)){
				if($("#centrodecusto3").val() != ""){
					dadosFluxo.centroCustoDestino = {id: parseInt($("#centrodecusto3").val())};
				}
			}else {
				dadosFluxo.centroCustoDestino = null;
			}
			if($("#evento").val() != ""){
				dadosFluxo.evento = {id: parseInt($("#evento").val())};
			}else {
				dadosFluxo.evento = null;
			}			
			if($("#pessoa").val() != ""){
				dadosFluxo.pessoa = {id: parseInt($("#pessoa").val())};
			}else {
				dadosFluxo.pessoa = null;
			}
			ONG.fluxoCaixaRest.inserir({
				data : dadosFluxo,
				success: function(msg){	
					bootbox.alert(msg);
					setTimeout(function(){
	   	    	         location.reload();
	   	    	    }, 2000);
				},
				error: function(err){							
					bootbox.alert("Erro" + err);
				}
			});			
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
    	ONG.centrocustoRest.pesquisarNome({
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
				var option = $( "<option></option>" ).appendTo($('#tipoCC'));
				option.attr( "value", listaCentroCusto[i].id );
				option.html( listaCentroCusto[i].nome );
			}

			var itemsedit2 = document.querySelector('#tipoCC');
			itemsedit2.addEventListener('change', function(){
				var valor2 =	this.value // o valo
			});
		}
    }

	// MODAL CADASTRAR, busca todos dados do campos html-selected PESSOA EVENTO CENTRO DE CUSTO E SL

    ONG.fluxocaixa.buscomponenteAdd = function() {
    	ONG.centrocustoRest.pesquisarNome({
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
		ONG.fluxoCaixaRest.excluir({
			data : id,
			success: function(msg){							
				bootbox.alert(msg);
				setTimeout(function(){
   	    	         location.reload();
   	    	    }, 2000);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca de pessoas:"+err.responseText);
			}
		});
    }
    
    // ---------------------------------= = = = = = EDITAR
    
    ONG.fluxocaixa.buscID = function(id){
    	console.log(id);
		ONG.fluxoCaixaRest.pesquisarId({
			data : id,
			success: function(inf){									
				if(inf != ""){
					$("#id").val(inf.id);
					$("#tipofluxoedit").val(inf.tipo);
					$("#centrocustoedit1").val(inf.centroCusto.id);
					$("#dataedit").val(inf.data);
					$("#classificacaoedit").val(inf.classificacao);
					$("#valoredit").val(inf.valor);
					$("#descricaoedit").val(inf.descricao);	
					ONG.fluxocaixa.buscacomponentesedit();

					if(inf.evento != null )
						$("#eventoedit").val(inf.evento.id);
					if(inf.pessoa != null )
						$("#pessoaedit").val(inf.pessoa.id);
					if(inf.centroCustoDestino != null )
						$("#centrodecustoedit2").val(inf.centroCustoDestino.id);
				}
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar informações de Fluxo de caixa, entrar em contato com o Administrador se o problema persistir!");
			}
		});
    }
    
    ONG.fluxocaixa.buscacomponentesedit = function(){
    	ONG.centrocustoRest.pesquisarNome({
    		data : "*",
    		success: function(lcenter){							
    			ONG.fluxocaixa.montaselectedcentrocustoedit(lcenter);
    		},
    		error: function(err){	
    			bootbox.alert("Erro ao realizar busca do centro de custo:"+err.responseText);
    		}
    	});
    }
    ONG.fluxocaixa.montaselectedcentrocustoedit = function(listCentroCusto){
    	if(listCentroCusto != undefined && listCentroCusto.length > 0 && listCentroCusto[0].id != undefined) { // montando meus estados
    		for(var i = 0; i < listCentroCusto.length; i++) {
    			var option = $( "<option></option>" ).appendTo($('#centrocustoedit1'));
    			option.attr( "value", listCentroCusto[i].id );
    			option.html( listCentroCusto[i].nome );
    		}
    		var item1 = document.querySelector('#centrocustoedit1');
    		item1.addEventListener('change', function(){
    			var valor1 = this.value // o valo
    		});   
    		
    		for(var i = 0; i < listCentroCusto.length; i++) {
    			var option = $( "<option></option>" ).appendTo($('#centrodecustoedit2'));
    			option.attr( "value", listCentroCusto[i].id );
    			option.html( listCentroCusto[i].nome );
    		}
    		var item2 = document.querySelector('#centrodecustoedit2');
    		item2.addEventListener('change', function(){
    			var item2 =	this.value // o valo
    		});
    		ONG.fluxocaixa.buscaEventosEdit();
    	}
    }
    ONG.fluxocaixa.buscaEventosEdit = function(){
    	var cfg = {
    			
			url: ONG.contextPath + "/rest/evento/nome/*",
		
			success: function(bevento){							
				ONG.fluxocaixa.montaselecteventoEdit(bevento);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca de evento:"+err.responseText);
			}
		};
		ONG.ajax.get(cfg);
    }
    ONG.fluxocaixa.montaselecteventoEdit = function(listevn){
    	if(listevn != undefined && listevn.length > 0 && listevn[0].id != undefined) { // montando meus estados
    		for(var i = 0; i < listevn.length; i++) {
    			var option = $( "<option></option>" ).appendTo($('#eventoedit'));
    			option.attr( "value", listevn[i].id );
    			option.html( listevn[i].nome );
    		}

    		var item1 = document.querySelector('#eventoedit');
    		item1.addEventListener('change', function(){
    			var valor1 = this.value // o valo
    		});
    		ONG.fluxocaixa.buscaPesEdit();
    	}
    }
    ONG.fluxocaixa.buscaPesEdit = function(){
    	var cfg = {
    			
			url: ONG.contextPath + "/rest/pessoa/nome/*",
		
			success: function(listapessoa){							
				ONG.fluxocaixa.montaselectpessoaEdit(listapessoa);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca de pessoas:"+err.responseText);
			}
		};
		ONG.ajax.get(cfg);
    }
    ONG.fluxocaixa.montaselectpessoaEdit = function(listapessoa){
    	if(listapessoa != undefined && listapessoa.length > 0 && listapessoa[0].id != undefined) { // montando meus estados
    		for(var i = 0; i < listapessoa.length; i++) {
    			var option = $( "<option></option>" ).appendTo($('#pessoaedit'));
    			option.attr( "value", listapessoa[i].id );
    			option.html( listapessoa[i].nome );
    		}

    		var item1 = document.querySelector('#pessoaedit');  
    		item1.addEventListener('change', function(){
    			var valor1 = this.value // o valo
    		});    		
    	}
    }
    ONG.fluxocaixa.editarFluxo = function(){
    	
    	var msg = "";
		msg += ONG.fluxocaixa.validaVazio("Tipo: ", $("#tipofluxoedit").val());
		msg += ONG.fluxocaixa.validaVazio("Centro Custo: ", $("#centrocustoedit1").val());		
		msg += ONG.fluxocaixa.validaVazio("Data: ", $("#dataedit").val());
		msg += ONG.fluxocaixa.validaVazio("Evento: ", $("#eventoedit").val());
		msg += ONG.fluxocaixa.validaVazio("Classificação: ", $("#classificacaoedit").val());
		msg += ONG.fluxocaixa.validaVazio("Pessoa: ", $("#pessoaedit").val());
		msg += ONG.fluxocaixa.validaVazio("Valor: ", $("#valoredit").val());
		msg += ONG.fluxocaixa.validaVazio("Destino Centro de Custo: ", $("#centrodecustoedit2").val());
		msg += ONG.fluxocaixa.validaVazio("Descricao: ", $("#descricaoedit").val());
		
		if(msg == ""){
			var date = $("#dataedit").val();
			var d = new Date(date.split("/").reverse().join("-"));
			var eventoedit;

			if($("#dataedit").val() != ""){
				eventoedit = $("#evento").val();
			}else {
				eventoedit = null;
			}
			var dadosFluxo = {
				id: $("#id").val(),	
				data: d.getTime(),
			    tipo: $("#tipofluxoedit").val(),
			    classificacao: $("#classificacaoedit").val(),
			    valor: $("#valoredit").val(),
			    descricao: $("#descricaoedit").val(),
			    centroCusto:{
			    	id: parseInt($("#centrocustoedit1").val())
			    },
			    centroCustoDestino:{
			    	id: parseInt($("#centrodecustoedit2").val())
			    },
			    usuario:{
			    	id: 1
			    },
			    pessoa:{
			    	id: parseInt($("#pessoaedit").val())
			    },
			    evento: null          
			};
			ONG.fluxoCaixaRest.editar({
				data : EditCad,
				success: function(msg){	
					bootbox.alert(msg);
					setTimeout(function(){
	   	    	         location.reload();
	   	    	    }, 2000);
				},
				error: function(err){							
					bootbox.alert("Erro" + err);
				}
			});
		}else{
			bootbox.alert(msg);
		}
    }
 	//BUSCA TIPO FLUXO CAIXA 
//    var itens = document.querySelector("#tipoCC");
//    itens.addEventListener('change', function(){    	
//    	var valor =	this.value // o valor que procuras é: this.value
//    	ONG.fluxocaixa.buscatipo(valor);    	
//    });
//    ONG.fluxocaixa.buscatipo = function(valor){
//    	if(valor != null){
//    		var cfg = {
//				
//				url: ONG.contextPath + "/rest/operacao/tipo/"+valor,
//				
//				success: function(listFluxo){			
//			    	var html = "<table class='table table-responsive custom-table-margin-b'>";
//					
//			    	html += 
//					"<thead class='table table-striped '>" +
//						"<tr>" +					
//							"<th> Centro de Custo </th> " +
//							"<th> Tipo </th>" +
//							"<th> Data </th>" +
//							"<th> Classificação </th>" +
//							"<th> pessoa </th>" +
//							"<th> evento </th>" +
//							"<th> Valor </th>" +
//							"<th> Destino </th>" +
//							"<th> Descrição </th>" +
//					
//							"<th style='width: 15%;'> Ações</th>" +
//						"</tr>" +
//					"</thead>";					
//			
//				    if ( listFluxo != undefined && listFluxo.length > 0 && listFluxo[0].id != undefined ) {
//				    	for(var i = 0; i < listFluxo.length; i++){
//							html += "<tr>";					
//							html += "<td>" + listFluxo[i].centroCusto.nome + "</td>";
//								if(listFluxo[i].tipo == 0){ // ?? ainda nao sei vou ver
//									html += "<td>" +	 
//													"Entrada" +
//											"</td>";
//								}else if(listFluxo[i].tipo == 1){
//									html += "<td>" +
//												"Saida" +
//											"</td>"
//								}else if( listFluxo[i].tipo == 2){
//									html += "<td>" + 
//												"Transferência"+
//											"</td>"
//								}
//								
//								html += "<td>" + listFluxo[i].data + "</td>";
//								
//								if(listFluxo[i].classificacao == 0){ // ?? ainda nao sei vou ver
//									html += "<td>" +	 
//												"Compra" +
//											"</td>";
//								}else if(listFluxo[i].classificacao == 1){
//									html += "<td>" +
//												"Venda" +
//											"</td>"
//								}else if( listFluxo[i].classificacao == 2){
//									html += "<td>" + 
//												"Doação"+
//											"</td>"
//								}else if( listFluxo[i].classificacao == 3){
//									html += "<td>" + 
//									"Custo operacional"+
//								"</td>"
//								}
//								
//								if(listFluxo[i].pessoa == null || listFluxo[i].pessoa == undefined){
//									html += "<td>" + "Não possuí"+ "</td>";
//								}else if(listFluxo[i].pessoa != null && listFluxo[i].pessoa != undefined){
//									html += "<td>" + listFluxo[i].pessoa.nome + "</td>";
//								}
//								if(listFluxo[i].evento == null || listFluxo[i].evento == undefined){
//									html += "<td>" + "Não possuí"+ "</td>";
//								}else if(listFluxo[i].evento != null && listFluxo[i].evento != undefined){
//									html += "<td>" + listFluxo[i].evento.nome + "</td>";
//								}
//
//								html += "<td>" + "R$" + listFluxo[i].valor + "</td>";
//								
//								if(listFluxo[i].centroCustoDestino == null || listFluxo[i].centroCustoDestino == undefined){
//									html += "<td>" + "Não possuí"+ "</td>";
//								}else if(listFluxo[i].centroCustoDestino != null && listFluxo[i].centroCustoDestino != undefined){
//									html += "<td>" + listFluxo[i].centroCustoDestino.nome + "</td>";
//								}
//								
//								html += "<td>" + listFluxo[i].descricao + "</td>";
//
//								html += "<td>"+
//											"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.fluxocaixa.buscID("+listFluxo[i].id+")'>Editar</button>"+ " " + " " +
//											"<button type='button'class='btn btn-trash' onclick='ONG.fluxocaixa.confExcluir("+listFluxo[i].id+")'>Excluir</button>"+
//										"</td>";						
//							html += "</tr>";  
//					    }
//				    }
//				    html +="</table>";
//					$("#resuAllEvents").html(html);
//				},
//				error: function(err){							
//					bootbox.alert("Erro ao Buscar informações de Fluxo de caixa, entrar em contato com o Administrador se o problema persistir!");
//				}
//			};					
//			ONG.ajax.get(cfg);   
//	    }
//    }
    
    
    $(document).on('change','#tipofluxoadd',function(){
		if(parseInt($("#tipofluxoadd").val()) == 2){
			$('#centrodecusto3').prop("disabled", false);
		} else {
			$('#centrodecusto3').prop("disabled", true);
		}    
	});
    $(document).on('change','#valor',function(){
			$('#valor').val(parseFloat($('#valor').val()).toFixed(2));	

	});    
});
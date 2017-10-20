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
					"<th style='width: 15%;'> Ações</th>" +
				"</tr>" +
			"</thead>";					
		
		    if ( listFluxo != undefined && listFluxo.length > 0 && listFluxo[0].id != undefined ) {
			  	for(var i = 0; i < listFluxo.length; i++){
			  		
					html += "<tr>";					
						html += "<td>" + listFluxo[i].centrocusto + "</td>";						
						if(listFluxo[i].tipo = 1){ // ?? ainda nao sei vou ver
							html += "<td>" +	 
											"??" +
									"</td>";
						}else if(listFluxo[i].tipo = 2){
							html += "<td>" +
										"???" +
									"</td>"
						}else if( listFluxo[i].tipo = 3){
							html += "<td>" + 
										"????"+
									"</td>"
						}
						html += "<td>" + listFluxo[i].data + "</td>";
						html += "<td>" + listFluxo[i].pessoa + "</td>";
						html += "<td>" + listFluxo[i].fluxocaixa + "</td>";
						html += "<td>" + listFluxo[i].valor + "</td>";
						html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.fluxocaixa.buscID("+listFluxo[i].id+")'>Editar</button>"+ " " + " " +
									"<button type='button'class='btn btn-trash' onclick='ONG.fluxocaixa.confExcluir("+listFluxo[i].id+")'>Excluir</button>"+
								"</td>";						
					html += "</tr>";  
			    }
		    }else{
			    if(listFluxo == undefined || (listFluxo != undefined && listFluxo.length > 0)){
			    	
			    	var buscafluxocaixa;
			    	
			    	if ( busca != "" ) {
			    		buscaFluxo = busca;
			    	}else if (busca == "") {
			    		buscaFluxo = "*"
			    	}
			    	
					var cfg = {
							
						url: ONG.contextPath + "/rest/operacao/" + buscaFluxo,
						
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
	
	ONG.fluxocaixa.add = function () {
		
		var msg = "";
		
		msg += ONG.fluxocaixa.validaVazio("Nome: ", $("#nome").val());
		msg += ONG.fluxocaixa.validaVazio("Tipo fluxocaixa: ", $("#typeevent").val());		
		msg += ONG.fluxocaixa.validaVazio("Cep: ", $("#cep").val());
		msg += ONG.fluxocaixa.validaVazio("Data: ", $("#data").val());
		msg += ONG.fluxocaixa.validaVazio("Hora: ", $("#horario").val());
		msg += ONG.fluxocaixa.validaVazio("Estado: ", $("#addestado").val());
		msg += ONG.fluxocaixa.validaVazio("Cidade: ", $("#addcidade").val());
		msg += ONG.fluxocaixa.validaVazio("Bairro: ", $("#bairro").val());			
		msg += ONG.fluxocaixa.validaVazio("Rua: ", $("#rua").val());
		msg += ONG.fluxocaixa.validaVazio("Complemento: ", $("#complemento").val());
		msg += ONG.fluxocaixa.validaVazio("Descrição: ", $("#descricao").val());
		
		if ( msg == "") {
			
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
    	var cfg ={
				
			url: ONG.contextPath + "/rest/centroCusto/nome/*",
		
			success: function(lcenter){							
				ONG.fluxocaixa.montaSelect(lcenter);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca do centro de custo:"+err.responseText);
			}
		};
			
			ONG.ajax.get(cfg);
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

	// MODAL CADASTRAR, busca todos dados do campos html-selected

    ONG.fluxocaixa.buscomponenteAdd = function() {
    	var cfg ={
				
			url: ONG.contextPath + "/rest/centroCusto/nome/*",
		
			success: function(lcenter2){							
				ONG.fluxocaixa.montaSelectcentrocust(lcenter2);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca do centro de custo:"+err.responseText);
			}
		};
		ONG.ajax.get(cfg);
    }
    ONG.fluxocaixa.montaSelectcentrocust = function(listaCentroCusto){
    	if(listaCentroCusto != undefined && listaCentroCusto.length > 0 && listaCentroCusto[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCentroCusto.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#centrocusto2'));
				option.attr( "value", listaCentroCusto[i].id );
				option.html( listaCentroCusto[i].nome );
			}

			var itemsedit2 = document.querySelector('#centrocusto2');
			itemsedit2.addEventListener('change', function(){
				var valor2 =	this.value // o valo
			});
		}
    }
});
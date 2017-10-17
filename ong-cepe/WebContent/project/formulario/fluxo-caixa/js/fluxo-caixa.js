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
					"<th> Data </th>" +
					"<th> Pessoa </th>" +
					"<th> Evento </th>" +
					"<th> Valor </th>" +
					"<th style='width: 15%;'> Ações</th>" +
				"</tr>" +
			"</thead>";					
		
		    if ( listFluxo != undefined && listFluxo.length > 0 && listFluxo[0].id != undefined ) {
			  
			  	for(var i = 0; i < listFluxo.length; i++){
			  		
					html += "<tr>";					
						html += "<td>" + listFluxo[i].nome + "</td>";
						html += "<td>" + listFluxo[i].descricao + "</td>";
						
						if(listFluxo[i].tipo = 1){
							html += "<td>"+	 
											"Beneficiente" +
									"</td>";
						}else if(listFluxo[i].tipo = 2){
							html += "<td>"
										+"Sessao"+
									"</td>"
						}else if( listFluxo[i].tipo = 3){
							html += "<td>"
										+"Viagem"+
									"</td>"
						}
						
						html += "<td>" + listFluxo[i].cep + "</td>";
						html += "<td>" + listFluxo[i].data + "</td>";
						html += "<td>" + listFluxo[i].cidade + "</td>";
						html += "<td>" + listFluxo[i].cidade + "</td>";
						html += "<td>" + listFluxo[i].bairro + "</td>";
						html += "<td>" + listFluxo[i].rua + "</td>";
						html += "<td>" + listFluxo[i].numero + "</td>";
						html += "<td>" + listFluxo[i].complemento + "</td>";

						html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.evento.buscID("+listFluxo[i].id+")'>Editar</button>"+ " " + " " +
									"<button type='button'class='btn btn-trash' onclick='ONG.evento.confExcluir("+listFluxo[i].id+")'>Excluir</button>"+
								"</td>";						
					html += "</tr>";  
			    }
		    }else{
			    if(listFluxo == undefined || (listFluxo != undefined && listFluxo.length > 0)){
			    	
			    	var buscaEvento;
			    	
			    	if ( busca != "" ) {
			    		buscaEvento = busca;
			    	}else if (busca == "") {
			    		buscaEvento = "*"
			    	}
			    	
					var cfg = {
							
						url: ONG.contextPath + "/rest/fluxocaixa/nome/" + buscaEvento,
						
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
});
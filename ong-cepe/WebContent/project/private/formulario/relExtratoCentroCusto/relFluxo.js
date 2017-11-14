ONG.relFlox = new Object();

$(document).ready(function(){
	ONG.relFlox.buscacusto = function() {
		ONG.centrocustoRest.pesquisarNome({
			data : "*",
			success: function(lcenter){							
				ONG.relFlox.montaSelectCentroCusto(lcenter);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca do centro de custo:"+err.responseText);
			}
		});
	}
	ONG.relFlox.montaSelectCentroCusto = function(listaCentroCusto) {
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
			
			ONG.relFlox.buscarFluxo();
		}
	} // FIM BUSCA PARA ALIMENTAR SELECTED
	
	ONG.relFlox.pesquisar = function(){
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
		
    	ONG.relFlox.pesquisarPeriodoCC({
			data : de+"/"+ate+"/"+parseInt(cc),
			success: function(listPesq){													
				ONG.relFlox.buscarFluxo(listPesq);
			},
			error: function(err){							
				bootbox.alert("Erro ao pesquisar, entrar em contato com o Administrador se o problema persistir!");
			}
    	});			
	}	
	
	
	ONG.relFlox.buscarFluxo = function(listFluxo, busca){

		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += 
			"<thead class='table table-striped '>" +
				"<tr>" +					
					"<th> Centro de Custo </th> " +
					"<th> Data </th>" +
					"<th> Tipo </th>" +
					"<th> Descrição </th>" +
					"<th> Usuario </th>" +
					"<th> Evento </th>" +
					"<th> Valor </th>" +
				"</tr>" +
			"</thead>";					
		
		    if ( listFluxo != undefined && listFluxo.length > 0 && listFluxo[0].id != undefined ) {
			  	for(var i = 0; i < listFluxo.length; i++){
			  		html += "<tr>";					
			  		html += "<td>" + listFluxo[i].centroCusto.nome + "</td>";

			  			html += "<td>" + listFluxo[i].data + "</td>";

			  			if(listFluxo[i].tipo == 0){ 
			  				html += "<td>Entrada</td>";
			  			}else if(listFluxo[i].tipo == 1){
			  				html += "<td>Saída</td>";
			  			}else if(listFluxo[i].tipo == 2){
			  				html += "<td>Transferência</td>";
			  			}
			  			html += "<td>" + listFluxo[i].descricao + "</td>";
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
			  			html += "<td>" + "R$ " + parseFloat(listFluxo[i].valor).toFixed(2).replace('.',',') + "</td>";	
			  		html += "</tr>";  
			    }
		    }else{
			    if(listFluxo == undefined || (listFluxo != undefined && listFluxo.length > 0)){
			    	ONG.fluxoCaixaRest.pesquisarNome({
						data : "*",
						success: function(listFluxo,busca){													
							ONG.relFlox.buscarFluxo(listFluxo,busca);
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
		$("#rextratocentrocusto").html(html);
	}
	
	ONG.relFlox.buscarFluxo(undefined, "");	 	
})
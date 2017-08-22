$(document).ready(function(){
	buscapefisica=function(){
		
	    var valorBusca=$("#conspesf").val();
	  	
	    buscapesJuridica(valorBusca);
	}		
	
	buscapesJuridica = function(listPesj, busca){
				
		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += "<thead class='table table-striped '>"+
					"<tr>" +
						"<p> Pessoas </p>  </br>"+ 
						"<th> Razão Social </th> " +
						"<th> Responsavel </th>" +
						"<th> Cnpj </th>" + 
						"<th> E-mail </th>" +
						"<th> Tel Responsavel </th>" +
						"<th> Tel Comercial </th>" +
						"<th> Estado </th>" +
						"<th> Cidade </th>" +
						"<th> Bairro </th>" +
						"<th> Rua </th>" +
						"<th> Complemento </th>" +
						"<th> Número </th>" +
						"<th> Editar</th>"+
						"<th> Excluir</th>"+
					"</tr>" +
				"</thead>";					
		
		    if(listPesj != undefined && listPesj.length > 0 && listPesj[0].id != undefined){
			  
			  	for(var i = 0; i < listPesj.length; i++){

					html += "<tr>";
						html += "<td>" + listPesj[i].razaosocial + "</td>";
						html += "<td>" + listPesj[i].responsavel + "</td>";
						html += "<td>" + listPesj[i].cnpj + "</td>";
						html += "<td>" + listPesj[i].email + "</td>";
						html += "<td>" + listPesj[i].telresponsavel + "</td>";
						html += "<td>" + listPesj[i].telcomercial + "</td>";
						html += "<td>" + listPesj[i].estado + "</td>";
						html += "<td>" + listPesj[i].cidade + "</td>";
						html += "<td>" + listPesj[i].bairro + "</td>";
						html += "<td>" + listPesj[i].rua + "</td>";
						html += "<td>" + listPesj[i].complemento + "</td>";
						html += "<td>" + listPesj[i].numero + "</td>";

						html += "<td>";

							html += "<button type='button' class='btn btn-pencil' onclick='buscID("+listPesj[i].id+")'>Editar</button>"
						html += "</td>";

						html += "<td>";

							html += "<button type='button'class='btn btn-trash' onclick='confExcluir("+listPesj[i].id+")'>Excluir</button>"
						html += "</td>";
					html += "</tr>";  
			    }
		    }else{
			    if(listPesj == undefined || (listPesj != undefined && listPesj.length > 0)){
					if(busca == ""){						
						busca = null;
					}

					var valorLista = $("#lista").val();

					var cfg = {
							
						url: "sem url",
						
						success: function(listPesj,busca){
													
							buscapefisica(listPesj,busca);
						},
						error: function(err){				
							
							bootbox.alert("Erro ao Buscar Pessoa, entrar em contato com o Administrador se o problema persistir!");
						}
					};
					
					ajax.get(cfg);
				}else{					
					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
		  }
		  
		  html +="</table>";
		  $("#resupesjuridica").html(html);
	}
	
	buscapefisica(undefined, "");


	// =====----------------------------------------------------------------------------------------------=====

	
});
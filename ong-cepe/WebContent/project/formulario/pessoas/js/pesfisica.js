$(document).ready(function(){
	conspesfisi=function(){
		
	    var valorBusca=$("#conspesf").val();
	  	
	    buscapefisica(valorBusca);
	}		
	
	buscapefisica = function(listPesF, busca){
				
		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += "<thead class='table table-striped '>"+
					"<tr>" +
						"<p> Pessoas </p>  </br>"+ 
						"<th> Nome </th> " +
						"<th> Sobrenome </th>" +
						"<th> Cpf </th>" + 
						"<th> Rg </th>" + 
						"<th> DataNascimento </th>" + 
						"<th> Contato Responsavel </th>" +
						"<th> E-mail </th>" +
						"<th> Tel Responsavel </th>" +
						"<th> Tel Comercial </th>" +
						"<th> E-mail </th>" +
						"<th> Responsavel </th>" +
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
		
		    if(listPesF != undefined && listPesF.length > 0 && listPesF[0].id != undefined){
			  
			  	for(var i = 0; i < listPesF.length; i++){

					html += "<tr>";
						html += "<td>" + listPesF[i].nome + "</td>";
						html += "<td>" + listPesF[i].sobrenome + "</td>";
						html += "<td>" + listPesF[i].cpf + "</td>";
						html += "<td>" + listPesF[i].rg + "</td>";
						html += "<td>" + listPesF[i].datanascimento + "</td>";
						html += "<td>" + listPesF[i].telresponsavel + "</td>";
						html += "<td>" + listPesF[i].telcomercial + "</td>";
					    html += "<td>" + listPesF[i].email + "</td>";
						html += "<td>" + listPesF[i].responsavel + "</td>";
						html += "<td>" + listPesF[i].estado + "</td>";
						html += "<td>" + listPesF[i].cidade + "</td>";
						html += "<td>" + listPesF[i].bairro + "</td>";
						html += "<td>" + listPesF[i].rua + "</td>";
						html += "<td>" + listPesF[i].complemento + "</td>";
						html += "<td>" + listPesF[i].numero + "</td>";

						html += "<td>";

							html += "<button type='button' class='btn btn-pencil' onclick='buscID("+listPesF[i].id+")'>Editar</button>"
						html += "</td>";

						html += "<td>";

							html += "<button type='button'class='btn btn-trash' onclick='confExcluir("+listPesF[i].id+")'>Excluir</button>"
						html += "</td>";
					html += "</tr>";  
			    }
		    }else{
			    if(listPesF == undefined || (listPesF != undefined && listPesF.length > 0)){
					if(busca == ""){						
						busca = null;
					}

					var valorLista = $("#lista").val();

					var cfg ={
							
						url:  "sem url",
						
						success: function(listPesF,busca){
													
							buscapefisica(listPesF,busca);
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
		  $("#resupesfis").html(html);
	}
	
	buscapefisica(undefined, "");
});
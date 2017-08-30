$(document).ready(function(){
//	buscapessojuridica=function(){
//		
//	    var valorBusca=$("#conspesf").val();
//	  	
//	    buscapesJuridica(undefined,valorBusca);
//	}		
//	
//	buscapesJuridica = function(listPesj, busca){
//				
//		var html = "<table class='table table-responsive custom-table-margin-b'>";
//		
//		html += 
//
//			"<thead class='table table-striped '>" +
//				"<tr>" +
//					"<th> Razão Social </th> " +
//					"<th> Responsavel </th>" +
//					"<th> Cnpj </th>" + 
//					"<th> E-mail </th>" +
//					"<th> Tel Responsavel </th>" +
//					"<th> Tel Comercial </th>" +
//					"<th> Cidade </th>" +
//					"<th> Bairro </th>" +
//					"<th> Ações </th>" +
//				"</tr>" +
//			"</thead>";					
//		
//		    if(listPesj != undefined && listPesj.length > 0 && listPesj[0].id != undefined){
//			  
//			  	for(var i = 0; i < listPesj.length; i++){
//
//					html += "<tr>";
//
//						html += "<td>";
//
//							html += "<button type='button' class='btn btn-pencil' onclick='buscID("+listPesj[i].id+")'>Editar</button>"
//						html += "</td>";
//
//						html += "<td>";
//
//							html += "<button type='button'class='btn btn-trash' onclick='confExcluir("+listPesj[i].id+")'>Excluir</button>"
//						html += "</td>";
//
//						html += "<td>" + listPesj[i].razaosocial + "</td>";
//						html += "<td>" + listPesj[i].responsavel + "</td>";
//						html += "<td>" + listPesj[i].cnpj + "</td>";
//						html += "<td>" + listPesj[i].email + "</td>";
//						html += "<td>" + listPesj[i].telresponsavel + "</td>";
//						html += "<td>" + listPesj[i].telcomercial + "</td>";
//						html += "<td>" + listPesj[i].cidade + "</td>";
//						html += "<td>" + listPesj[i].bairro + "</td>";
//						html += "<a class='btn btn-warning btn-xs' href='#' >Editar</a>";
//						html += "<a class='btn btn-danger btn-xs'  href='#' >Excluir</a>";
//						html += "<td class='actions  text-center'>";
//						html += "</td>";
//
//					html += "</tr>";  
//			    }
//		    }else{
//			    if(listPesj == undefined || (listPesj != undefined && listPesj.length > 0)){
//					if(busca == ""){						
//						busca = null;
//					}
//
//					var valorLista = $("#lista").val();
//
//					var cfg = {
//							
//						url: ONG.contextPath + "/rest/pessoa/nome/" + valorLista,
//						
//						success: function(listPesj,busca){													
//							buscapesJuridica(listPesj,busca);
//						},
//						error: function(err){							
//							bootbox.alert("Erro ao Buscar Pessoa, entrar em contato com o Administrador se o problema persistir!");
//						}
//					};					
//					ONG.ajax.get(cfg);
//				}else{					
//					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
//				}
//		    }
//		html +="</table>";
//		$("#resupesjuridica").html(html);
//	}
//	
//	buscapesJuridica(undefined, "");

	// =====----------------------------------------------------------------------------------------------=====
	cadspesjuridica = function(){
		debugger;
            	var dadosPJ= new Object();
            	
            	dadosPJ.tipo= 5;
            	dadosPJ.nome=$("#razsocial").val();
            	dadosPJ.responsavel=$("#responsavel").val();
            	dadosPJ.cnpj=$("#cnpj").val();
            	dadosPJ.email=$("#email").val();
//            	dadosPJ.dt_nasc=$("#datanascimento").val();
            	dadosPJ.fone_res=$("#telcomercial").val();
            	dadosPJ.fone_cel=$("#telresponsavel").val();
            	dadosPJ.estado=$("#estado").val();
            	dadosPJ.cidade=$("#cidade").val()
            	dadosPJ.rua=$("#rua").val();
            	dadosPJ.complemento=$("#complemento").val();
            	dadosPJ.numero=$("#numero").val();
            	dadosPJ.cep=$("#cep").val(); 
        		console.log('novo cadastro',dadosPJ);
        		
//        		if(validar(dadosPJ)) {
//        			ONG.ajax.post({        			
//    					url: ONG.contextPath + "/rest/pessoa/adicionar",	
//	        			data : dadosPJ,
//	    				success : function(msg) {
//	    					console.log('success', msg);
//	    					bootbox.alert(msg);
//	    				},
//	    				error : function(err) {
//	    					console.log('err' ,err);
//	    					bootbox.alert("Erro ao cadastrar: <br/>"	+ err.responseText);
//	    				} 
//        			});
        			
//        		}
	}
//	enviaServidor = function(dadosPJ){
//
//		var cfg = {
//							
//			url: "sem url",
//			
//			success: function(listPesj,busca){										
//				buscapesJuridica(listPesj,busca);
//			},
//			error: function(err){								
//				bootbox.alert("Erro ao Buscar Pessoa, entrar em contato com o Administrador se o problema persistir!");
//			}
//		};					
//		ajax.get(cfg);
//	}
	
	
//	validar = function(cad){
//		var msg, exp = "";
//		msg+=validador("Razao Social: ", $("#razsocial").val());
//		msg+=validador("Responsavel: ", $("#responsavel").val());
//		msg+=validador("Cnpj: ", $("#cnpj").val());
//		msg+=validador("Email: ", $("#email").val());
//		msg+=validador("Telefone comercial: ", $("#telcomercial").val());
//		msg+=validador("Telefone responsável: ", $("#telresponsavel").val());
//		msg+=validador("Estado: ", $("#estado").val());
//		msg+=validador("Cidade: ", $("#cidade").val());
//		msg+=validador("Bairro: ", $("#bairro").val());
//		msg+=validador("Rua: ", $("#rua").val());
//		msg+=validador("Complemento: ", $("#complemento").val());
//		msg+=validador("Numero: ", $("#numero").val());
//
//		if(msg == ""){
//
//			if($("#email").val().indexOf("@") == -1 || //valida se existe o @
//                $("#email").val().indexOf(".") == -1 || //valida se existe o .
//                $("#email").val().indexOf("@") == 0 || //valida se tem texto antes do @
//                $("#email").val().lastIndexOf(".") + 1 == email.length || //valida se tem texto depois do ponto
//                ($("#email").val().indexOf("@") + 1 == $("#email").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
//                    
//                exp+="E-mail invalido" +"</br>"
//                + "ex: teste_@teste.com.br"
//                document.getElementById("email").focus();
//            }
//            if(!$("#cnpj").val().match(/^\d{14,15}$/)){
//            	exp+="CNPJ invalido ! </br> " + "</br>";
//            }
//            if(!$("#telcomercial").val().match(/^\d{10,13}$/)){    
//                exp+="Telefone Comercial invalido ! </br> " + "</br>";
//            }
//            if(!$("#telresponsavel").val().match(/^\d{10,13}$/)){    
//                exp+="Telefone do responsável invalido ! </br> " + "</br>";
//            }
//            if(exp!= ""){
//            	bootbox.alert(expressao);
//    			return false;
//            }
//        }else{
//            bootbox.alert("Caro usuário, gentileza verificar os seguintes campos: <br> " + msg);
//			return false;
//        }
//		return true;
//		
//	}
	
});
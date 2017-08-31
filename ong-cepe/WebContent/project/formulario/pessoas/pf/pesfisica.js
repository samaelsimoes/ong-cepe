//ONG.pf = new Object(); //verificar colocar padrao em todos metodos ajustar caminhos

$(document).ready(function(){
	
	conspesfisi=function(){
	    var valorBusca=$("#conspesf").val();
	    buscapefisica(undefined,valorBusca);
	}		
	
	buscapefisica = function(listPesF, busca){
		
		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += 
			"<thead class='table table-striped '>"+
				"<tr>" +
					"<th> Editar</th>"+
					"<th> Excluir</th>"+
					"<p> Pessoas </p>  </br>"+ 
					"<th> Nome </th> " +
					//"<th> Sobrenome </th>" +
					"<th> Cpf </th>" + 
					"<th> Rg </th>" + 
					"<th> DataNascimento </th>" + 
					"<th> Contato Responsavel </th>" +
					"<th> E-mail </th>" +
					"<th> Tel Responsavel </th>" +
					"<th> Tel Comercial </th>" +
					"<th> E-mail </th>" +
					//"<th> Responsavel </th>" +
					"<th> Estado </th>" +
					"<th> Cidade </th>" +
					"<th> Bairro </th>" +
					"<th> Rua </th>" +
					"<th> Complemento </th>" +
					"<th> Número </th>" +
				"</tr>" +
			"</thead>";			

		if(listPesF != undefined && listPesF.length > 0 && listPesF[0].id != undefined){
			  
		  	for(var i = 0; i < listPesF.length; i++){

				html += "<tr>";
					html += "<td>";
					
						html += "<button type='button' class='btn btn-pencil' onclick='buscID("+listPesF[i].id+")'>Editar</button>"
					html += "</td>";

					html += "<td>";

						html += "<button type='button'class='btn btn-trash' onclick='confExcluir("+listPesF[i].id+")'>Excluir</button>"
					html += "</td>";

					html += "<td>" + listPesF[i].nome + "</td>";
					//html += "<td>" + listPesF[i].sobrenome + "</td>";
					html += "<td>" + listPesF[i].cpf + "</td>";
					html += "<td>" + listPesF[i].rg + "</td>";
					html += "<td>" + listPesF[i].datanascimento + "</td>";
					//html += "<td>" + listPesF[i].telresponsavel + "</td>";
					html += "<td>" + listPesF[i].telcomercial + "</td>";
				    html += "<td>" + listPesF[i].email + "</td>";
					html += "<td>" + listPesF[i].responsavel + "</td>";
					html += "<td>" + listPesF[i].estado + "</td>";
					html += "<td>" + listPesF[i].cidade + "</td>";
					html += "<td>" + listPesF[i].bairro + "</td>";
					html += "<td>" + listPesF[i].rua + "</td>";
					html += "<td>" + listPesF[i].complemento + "</td>";
					html += "<td>" + listPesF[i].numero + "</td>";
				html += "</tr>";  
		    }
		}else{
		     if(listPesF == undefined || (listPesF != undefined && listPesF.length > 0)){

				var busca = $("#conspesf").val();
				
				if(busca == ""){						
					busca = null;
				}
				
				var cfg ={
					url:  ONG.contextPath + "/rest/pessoa/nome/" + busca,
					success: function(listPesF,busca){									
						buscapefisica(listPesF,busca);
					},
					error: function(err){											
						bootbox.alert("Erro ao Buscar Pessoa, entrar em contato com o Administrador se o problema persistir!");
					}
				};					
				ONG.ajax.get(cfg);
			}else{					
				html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
			}
	  }
		  
		  html +="</table>";
		  $("#resupesfis").html(html);
	}
	
	buscapefisica(undefined, "");

	// ------------------------------------------------ ==================================== ------------------------------ ========================================
	
	cadpesfisica = function(){

		var msg = "";
		var exp = "";
		
		msg += validaVazio ("Nome: ", $("#nome").val());
		//msg+=validaVazio("Sobrenome: ", $("#sobrenome").val());
		msg += validaVazio ("Cpf: ", $("#cpf").val());
		msg += validaVazio ("Rg: ", $("#rg").val());
		msg += validaVazio ("Data nascimento: ", $("#datanascimento").val());
		msg += validaVazio ("Email: ", $("#email").val());
		msg += validaVazio ("Telefone Residencial: ", $("#fone_res").val());
		msg += validaVazio ("Telefone Celular: ", $("#fone_cel").val());
		//msg+=validaVazio ("Responsavel: ", $("#responsavel").val());
		msg += validaVazio ("Estado: ", $("#estado").val());
		msg += validaVazio ("Cidade: ", $("#cidade").val());
		msg += validaVazio ("Bairro: ", $("#bairro").val());
		msg += validaVazio ("Rua: ", $("#rua").val());
		msg += validaVazio ("Complemento: ", $("#complemento").val());
		msg += validaVazio ("Numero: ", $("#numero").val());
				
		if ( msg == "" ){

			if($("#email").val().indexOf("@") == -1 || //valida se existe o @
                $("#email").val().indexOf(".") == -1 || //valida se existe o .
                $("#email").val().indexOf("@") == 0 || //valida se tem texto antes do @
                $("#email").val().lastIndexOf(".") + 1 == email.length || //valida se tem texto depois do ponto
                ($("#email").val().indexOf("@") + 1 == $("#email").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                    
                exp+="E-mail invalido" +"</br>"
                + "ex: teste_@teste.com.br"
                document.getElementById("email").focus();
            }
            if(!$("#cpf").val().match(/^\d{10,12}$/)){
            	exp+="Cpf invalido ! </br> " + "</br>";
            }
            if(!$("#rg").val().match(/^\d{7,9}$/)){
            	exp+="RG invalido ! </br> " + "</br>";
            }
            if(!$("#fone_res").val().match(/^\d{10,13}$/)){    
                exp+="Telefone Residencial invalido ! </br> " + "</br>";
            }
            if(!$("#fone_cel").val().match(/^\d{10,13}$/)){    
                exp+="Telefone Celular invalido ! </br> " + "</br>";
            }
        
            /*if(!$("#cep").val().match(/^[0-9]{8}$/)){
                exp+=" Cep invalido por gentileza informar cep correto" + "<br>"+ "<br>";
            }  
            if(!$("#renda").val().match(/^[0-9]{0,15}[,]{0,1}[0-9]{0,4}$/)){
                exp+=" Gentileza informar a renda em formato numerico " + "<br>" + "<br>";
            } */
            
			if ( exp == "") {

            	var dadosFS= new Object();
            	
            	dadosFS.nome=$("#nome").val();
            	dadosFS.tipo=0;
            	//dadosFS.sobreNome=$("#sobreNome").val();
            	dadosFS.cpf=$("#cpf").val();
            	dadosFS.rg=$("#rg").val();
            	dadosFS.email=$("#email").val();
            	dadosFS.dt_nasc=$("#datanascimento").val();
            	dadosFS.fone_res=$("#fone_res").val();
            	dadosFS.fone_cel=$("#fone_cel").val();
            	dadosFS.rua=$("#rua").val();
            	dadosFS.bairro=$("#bairro").val();
            	dadosFS.numero=$("#numero").val();
            	dadosFS.cep=$("#cep").val(); 
            	dadosFS.complemento=$("#complemento").val();
            	dadosFS.cidade=$("#cidade").val()
            	dadosFS.estado=$("#estado").val();         	
            	
	     		var cfg = {
	     			
	     			url: ONG.contextPath + "/rest/pessoa/add",
	     			data: dadosFS,
	     			
	     			success: function(listPesj,busca){
	     				buscapesJuridica(listPesj,busca);
	     			},
	     			error: function(err){				
	     				bootbox.alert("Erro ao cadastrar Pessoa, entrar em contato com o Administrador se o problema persistir!");
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
	
	// -------------------------- ========================================================================== -----------------------
	
	validaVazio = function ( campo, valor ) {
		
        var msg = "";

        if(valor == null ||  valor.trim() == ""){
            msg += "- " + campo + " Está Vazio. </br>";
        }
        return msg;
    };
    // -------------------------------- ======================================================================= ------------------------------
});
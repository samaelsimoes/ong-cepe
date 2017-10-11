ONG.pessoa = new Object();

$(document).ready(function(){
	ONG.pessoa.gridbusca = function(){
		
	    var busca = $("#consutodos").val();	  	
	    ONG.pessoa.buscaTodos(undefined,busca);
	}		
	
	ONG.pessoa.buscaTodos = function(listallpes, busca){
				
		var html = "<table class='table table-responsive custom-table-margin-b'>";
		
		html += 

			"<thead class='table table-striped '>" +
				"<tr>" +
					
					"<th> Nome / Razão social </th>" + 
					"<th> Tipo </th> " +
					"<th> Cpf / CNPJ </th>" +
					"<th> Telefone contato </th>" +
					"<th> Email </th>" +
					/*"<th> Estado </th>" +
					"<th> Cidade </th>" +*/
					"<th> Ações</th>" +
				"</tr>" +
			"</thead>";					
		
		    if(listallpes != undefined && listallpes.length > 0 && listallpes[0].id != undefined){
			  
			  	for(var i = 0; i < listallpes.length; i++){

					html += "<tr>";					
						html += "<td>" + listallpes[i].nome + "</td>";
				
						if (listallpes[i].tipo == 1) {
							html += "<td>" + "Pessoa Física" + "</td>";
						}else if (listallpes[i].tipo == 2) {
							html += "<td>" + "Pessoa Juridica" + "</td>";
						}					
						
						
						if (listallpes[i].tipo == 2) {
							html += "<td>" + listallpes[i].cnpj + "</td>";
						}else if (listallpes[i].tipo  == 1){
							html += "<td>" + listallpes[i].cpf + "</td>";
				  		}
						
						if(listallpes[i].foneFixo != null && listallpes[i].foneMovel != null){
							html += "<td>"+	 
							listallpes[i].foneFixo + " - " + listallpes[i].foneMovel +										
									"</td>";
						}else if(listallpes[i].foneFixo != null && listallpes[i].foneMovel == null){
							html += "<td>"+
										listPesj[i].foneFixo+
									"</td>"
						}else if( listallpes[i].foneMovel != null && listallpes[i].foneFixo == null){
							html += "<td>"+
							listallpes[i].foneMovel+
									"</td>"
						}
						html += "<td>" + listallpes[i].email + "</td>";
							if ( listallpes[i].tipo == 1) { // pessoa JURIDICA
								html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaleditPF' data-whatever='@getbootstrap' onclick='ONG.pessoa.buscIDPF("+listallpes[i].id+")'>Editar</button>"+ " " + " " +
									"<button type='button'class='btn btn-trash' onclick='ONG.pessoa.confExcluir("+listallpes[i].id+")'>Excluir</button>"+
								"</td>";
							}else if (listallpes[i].tipo == 2){
								html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaleditPJ' data-whatever='@getbootstrap' onclick='ONG.pessoa.buscIDPJ("+listallpes[i].id+")'>Editar</button>"+ " " + " " +
									"<button type='button'class='btn btn-trash' onclick='ONG.pessoa.confExcluir("+listallpes[i].id+")'>Excluir</button>"+
								"</td>";
							}
							
					html += "</tr>";  
			    }
		    }else{
			    if(listallpes == undefined || (listallpes != undefined && listallpes.length > 0)){

					if(busca == ""){						
						busca = "*";
					}
					
					var cfg = {
							
							url: ONG.contextPath + "/rest/pessoa/nome/" + busca,
							
							success: function(listallpes,busca){													
								ONG.pessoa.buscaTodos(listallpes,busca);
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
		html +="</table>";
		$("#resupsall").html(html);
	}
	
	ONG.pessoa.buscaTodos (undefined, "");
	
	ONG.pessoa.confExcluir = function(id) {
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
					ONG.pessoaRest.excluir({
						data : id,
						success: function (data) {						
							bootbox.alert(data);	
							setTimeout(function(){
		    	    	         location.reload();
		    	    	    }, 1000);	            	
						},
						error: function (err) {				
							bootbox.alert("Erro ao deletar: " + err.responseText);
						}
					});
		        }
		    }
		});		
    }


	ONG.pessoa.buscIDPF = function( id ){
		ONG.pessoaRest.pesquisarId({
			data : id,
			success:function(dados){

				if(dados != ""){
					
					$("#id1").val(dados.id);
		    		$("#nomeedit1").val(dados.nome);
		    		$("#rgedit1").val(dados.rg);
		    		$("#cpfedit1").val(dados.cpf);
		    		$("#emailedit1").val(dados.email);
		    		$("#telfixoedit1").val(dados.foneFixo);
		    		$("#telmoveledit1").val(dados.foneMovel);
		    		$("#bairroedit1").val(dados.bairro);
		    		$("#ruaedit1").val(dados.rua);
					$("#complementoedit1").val(dados.complemento);
					$("#numeroedit1").val(dados.numero);
					$("#cepedit1").val(dados.cep);
					ONG.pessoa.buscaEstadoEdit1();
		    	}			
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    };
    
    ONG.pessoa.buscIDPJ = function( id ){
		ONG.pessoaRest.pesquisarId({
			data : id,
			success:function(dados){

				if(dados != ""){
					
					$("#id2").val(dados.id);
		    		$("#razaosocialedit2").val(dados.nome);
		    		$("#cnpjedit2").val(dados.cnpj);
		    		$("#emailedit2").val(dados.email);
		    		$("#telfixoedit2").val(dados.foneFixo);
		    		$("#telmoveledit2").val(dados.foneMovel);
		    		$("#bairroedit2").val(dados.bairro);
		    		$("#ruaedit2").val(dados.rua);
					$("#complementoedit2").val(dados.complemento);
					$("#numeroedit2").val(dados.numero);
					$("#cepedit2").val(dados.cep);
					ONG.pessoa.buscaEstadoEdit2();
		    	}			
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    };
    
    ONG.pessoa.buscaEstadoEdit2 = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/estado/" + 1,
			success: function(listEstado2){													
				ONG.pessoa.montaSelectEstadoEdit2(listEstado2);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoa.buscaCidadeEdit2 = function(id2){
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id2,
			success: function(listaCidade2){		
				ONG.pessoa.montaSelectCidadeEdit2(listaCidade2);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoa.montaSelectEstadoEdit2 = function(listEstado2) {
    	if(listEstado2 != undefined && listEstado2.length > 0 && listEstado2[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado2.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#estadoedit2'));
				option.attr( "value", listEstado2[i].id );
				option.html( listEstado2[i].nome );
			}

			var itemsedit2 = document.querySelector('#estadoedit2');
			itemsedit2.addEventListener('change', function(){
				var valor2 =	this.value // o valo
				ONG.pessoa.buscaCidadeEdit2( valor2 );
			});
		}
    }

    ONG.pessoa.montaSelectCidadeEdit2 = function( listaCidade2 ) {
    	if(listaCidade2 != undefined && listaCidade2.length > 0 && listaCidade2[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade2.length; i++){
				var option2 = $( "<option></option>" ).appendTo( $( '#cidadeedit2' ) );
				option2.attr( "value", listaCidade2[i].id );
				option2.html( listaCidade2[i].nome );
			}
		}
    }
    
    ONG.pessoa.buscaEstadoEdit1 = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/estado/" + 1,
			success: function(listEstado1){													
				ONG.pessoa.montaSelectEstadoEdit1(listEstado1);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoa.buscaCidadeEdit1 = function(id1){
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id1,
			success: function(listaCidade1){		
				ONG.pessoa.montaSelectCidadeEdit1(listaCidade1);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoa.montaSelectEstadoEdit1 = function(listEstado1) {
    	if(listEstado1 != undefined && listEstado1.length > 0 && listEstado1[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado1.length; i++) {
				var option1 = $( "<option></option>" ).appendTo($('#estadoedit1'));
				option1.attr( "value", listEstado1[i].id );
				option1.html( listEstado1[i].nome );
			}

			var itemsedit1 = document.querySelector('#estadoedit1');
			itemsedit1.addEventListener('change', function(){
				var valor1 =	this.value // o valo
				ONG.pessoa.buscaCidadeEdit1( valor1 );
			});
		}
    }

    ONG.pessoa.montaSelectCidadeEdit1 = function( listaCidade1 ) {
    	if(listaCidade1 != undefined && listaCidade1.length > 0 && listaCidade1[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade1.length; i++){
				var option1 = $( "<option></option>" ).appendTo( $( '#cidadeedit1' ) );
				option1.attr( "value", listaCidade1[i].id );
				option1.html( listaCidade1[i].nome );
			}
		}
    }
    
    /*edita pf*/
    
    ONG.pessoa.editarPF = function() {

    	var msg  = "";
    	
    	if($("#id1").val() == ""){
    		msg += " Entrar em contato com o administrador, falha ao editar pessoas, campo id vindo vazio";
    	}
    	
		msg += ONG.pessoa.validaVazio("Nome ", $("#nomeedit1").val());
		msg += ONG.pessoa.validaVazio("CPF: ", $("#cpfedit1").val());
		msg += ONG.pessoa.validaVazio("RG: ", $("#rgedit1").val());
		msg += ONG.pessoa.validaVazio("Email: ", $("#emailedit1").val());
		msg += ONG.pessoa.validaVazio("Telefone Fixo: ", $("#telfixoedit1").val());
		msg += ONG.pessoa.validaVazio("Estado: ", $("#estadoedit1").val());
		msg += ONG.pessoa.validaVazio("Cidade: ", $("#cidadeedit1").val());
		msg += ONG.pessoa.validaVazio("Bairro: ", $("#bairroedit1").val());
		msg += ONG.pessoa.validaVazio("Rua: ", $("#ruaedit1").val());
		msg += ONG.pessoa.validaVazio("Complemento: ", $("#complementoedit1").val());
		msg += ONG.pessoa.validaVazio("Numero: ", $("#numeroedit1").val());

    	if(msg == ""){
    		var exp = ONG.pessoa.validaCampos1();    		
    		if(exp == ""){
		    	var dadosPF = {
		            
		    		id: $("#id1").val(),
		    		nome: $("#nomeedit1").val(),
		    		tipo: 1,
		    		status: 1,
		    		cpf: $("#cpfedit1").val(),
		    		rg: $("#rgedit1").val(),
		    		email: $("#emailedit1").val(),
		    		bairro: $("#bairroedit1").val(),
		    		nascimento: $("#datanascimentoedit1").val(),
		    		foneFixo: $("#telfixoedit1").val(),
		    		foneMovel: $("#telmoveledit1").val(),
		    		rua: $("#ruaedit1").val(),
		    		complemento: $("#complementoedit1").val(),
		    		numero: $("#numeroedit1").val(),
		    		cep: $("#cepedit1").val(),		    		
					cidade: { 
						id: $("#cidadeedit1").val() 
					}	
		    	}
				ONG.pessoaRest.editar({
					data : dadosPF,
					success:function(data){	
						
						bootbox.alert(data);
						
						setTimeout(function(){
	    	    	        location.reload();
	    	    	    }, 2000);					
					},
					error: function(err){	
						bootbox.alert( err.responseText); 
					}
				});
		    }else{
		    	bootbox.alert(exp);
		    }
	    }else{
	    	bootbox.alert(msg);
	    }
    };
    
    ONG.pessoa.editarPJ = function(){

    	var msg  = "";
    	
    	if($("#id2").val() == ""){
    		msg += " Impossivel editar pessoa Juridica, gentileza entrar em contato com o administrador, motivo sem campo id";
    	}
    	
		msg += ONG.pessoa.validaVazio("Razao Social: ", $("#razaosocialedit2").val());
		msg += ONG.pessoa.validaVazio("Cnpj: ", $("#cnpjedit2").val());
		msg += ONG.pessoa.validaVazio("Email: ", $("#emailedit2").val());
		msg += ONG.pessoa.validaVazio("Telefone Fixo: ", $("#telfixoedit2").val());
		msg += ONG.pessoa.validaVazio("Estado: ", $("#estadoedit2").val());
		msg += ONG.pessoa.validaVazio("Cidade: ", $("#cidadeedit2").val());
		msg += ONG.pessoa.validaVazio("Bairro: ", $("#bairroedit2").val());
		msg += ONG.pessoa.validaVazio("Rua: ", $("#ruaedit2").val());
		msg += ONG.pessoa.validaVazio("Complemento: ", $("#complementoedit2").val());
		msg += ONG.pessoa.validaVazio("Numero: ", $("#numeroedit2").val());

    	if(msg == ""){
    		var exp = ONG.pessoa.validaCampos2();
    		
    		if(exp == ""){
		    	var dadosPJ= {
		            
		    		id: $("#id2").val(),
		    		nome: $("#razaosocialedit2").val(),
		    		tipo: 2,
		    		status: 1,
		    		cnpj: $("#cnpjedit2").val(),
		    		email: $("#emailedit2").val(),
		    		nascimento: $("#datanascimentoedit2").val(),
		    		foneFixo: $("#telfixoedit2").val(),
		    		foneMovel: $("#telmoveledit2").val(),
		    		rua: $("#ruaedit2").val(),
		    		complemento: $("#complementoedit2").val(),
		    		numero: $("#numeroedit2").val(),
		    		cep: $("#cepedit2").val(),
		    		
					cidade : { 
						id: parseInt($("#cidadeedit2").val())
					}					
		    	}
		    	
				ONG.pessoaRest.editar({
					data : dadosPJ,
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
		    	bootbox.alert(exp);
		    }
	    }else{
	    	bootbox.alert(msg);
	    }
    };
    
    //  ====----------------- VALIDAÇÕES PF

    ONG.pessoa.validaCampos1 = function(){
    	var exp = "";
    	if($("#emailedit1").val().indexOf("@") == -1 || //valida se existe o @
            $("#emailedit1").val().indexOf(".") == -1 || //valida se existe o .
            $("#emailedit1").val().indexOf("@") == 0 || //valida se tem texto antes do @
            $("#emailedit1").val().lastIndexOf(".") + 1 == emailedit1.length || //valida se tem texto depois do ponto
            ($("#emailedit1").val().indexOf("@") + 1 == $("#emailedit1").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                
            exp+="E-mail invalido" +"</br>"
            + "ex: teste_@teste.com.br"
            document.getElementById("emailedit1").focus();
        }
        if(!$("#cpfedit1").val().match(/^\d{11,12}$/)){
        	exp+="cpf invalido ! </br> " + "</br>";
        }
        if(!$("#rgedit1").val().match(/^\d{9,13}$/)){
        	exp+="rg invalido ! </br> " + "</br>";
        }
        if(!$("#cepedit1").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }
        if(!$("#telfixoedit1").val().match(/^\d{10,13}$/)){    
            exp+="Telefone Fixo invalido ! </br> " + "</br>";
        }
    	return exp;
    };
    	
	ONG.pessoa.validaVazio = function ( campo, valor ) {
        var msg = "";
        if(valor == null ||  valor.trim() == ""){
            msg += "-" + campo + " Está Vazio. </br>";
        }
        return msg;
    };

    ONG.pessoa.validaCampos2= function(){
    	var exp = "";

    	if($("#emailedit2").val().indexOf("@") == -1 || //valida se existe o @
            $("#emailedit2").val().indexOf(".") == -1 || //valida se existe o .
            $("#emailedit2").val().indexOf("@") == 0 || //valida se tem texto antes do @
            $("#emailedit2").val().lastIndexOf(".") + 1 == emailedit2.length || //valida se tem texto depois do ponto
            ($("#emailedit2").val().indexOf("@") + 1 == $("#emailedit2").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                
            exp+="E-mail invalido" +"</br>"
            + "ex: teste_@teste.com.br"
            document.getElementById("emailedit").focus();
        }
        if(!$("#cnpjedit2").val().match(/^\d{14,15}$/)){
        	exp+="CNPJ invalido ! </br> " + "</br>";
        }
        if(!$("#cepedit2").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }
        if(!$("#telfixoedit2").val().match(/^\d{10,13}$/)){    
            exp+="Telefone Fixo invalido ! </br> " + "</br>";
        }
    	return exp;
    };
});


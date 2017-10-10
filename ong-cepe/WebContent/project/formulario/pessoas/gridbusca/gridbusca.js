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

						html += "<td>"+
							//"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.pessoa.buscID("+listallpes[i].id+")'>Editar</button>"+ " " + " " +
							"<button type='button'class='btn btn-trash' onclick='ONG.pessoa.confExcluir("+listallpes[i].id+")'>Excluir</button>"+
						"</td>";						
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
	
	 ONG.pessoa.confExcluir = function(id){
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
			        	
			           var cfg = {
				
						url: ONG.contextPath + "rest/pessoa/idexcluir/" + id,
						success: function (data) {						
							bootbox.alert(data);	
							setTimeout(function(){
		    	    	         location.reload();
		    	    	    }, 1000);	            	
						},
						error: function (err) {				
							bootbox.alert("Erro ao deletar: " + err.responseText);
						}
					};
					ONG.ajax.delet(cfg);
			        }
			    }
			});	
	    }
/*
	ONG.pessoa.buscID = function( id ){
    	
		ONG.pessoaRest.pesquisarId({
			data : id,
			success:function(dados){

				if(dados != ""){
					
					$("#id").val(dados.id);
		    		$("#nomeedit").val(dados.nome);
		    		$("#rgedit").val(dados.rg);
		    		$("#cpfedit").val(dados.cpf);
		    		$("#emailedit").val(dados.email);
		    		$("#telfixoedit").val(dados.foneFixo);
		    		$("#telmoveledit").val(dados.foneMovel);
		    		$("#bairroedit").val(dados.bairro);
		    		$("#ruaedit").val(dados.rua);
					$("#complementoedit").val(dados.complemento);
					$("#numeroedit").val(dados.numero);
					$("#cepedit").val(dados.cep);
					ONG.pessoa.buscaEstadoEdit();
		    	}			
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    };
    NG.pessoa.buscaEstadoEdit = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/estado/" + 1,
			success: function(listEstado){													
				ONG.pessoa.montaSelectEstadoEdit(listEstado);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoa.buscaCidadeEdit = function(id){
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade){		
				ONG.pessoa.montaSelectCidadeEdit(listaCidade);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoa.montaSelectEstadoEdit = function(listEstado) {
    	if(listEstado != undefined && listEstado.length > 0 && listEstado[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#estadoedit'));
				option.attr( "value", listEstado[i].id );
				option.html( listEstado[i].nome );
			}

			var itemsedit = document.querySelector('#estadoedit');
			itemsedit.addEventListener('change', function(){
				var valor =	this.value // o valo
				ONG.pessoa.buscaCidadeEdit( valor );
			});
		}
    }

    ONG.pessoa.montaSelectCidadeEdit = function( listaCidade ) {
    	if(listaCidade != undefined && listaCidade.length > 0 && listaCidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade.length; i++){
				var option = $( "<option></option>" ).appendTo( $( '#cidadeedit' ) );
				option.attr( "value", listaCidade[i].id );
				option.html( listaCidade[i].nome );
			}
		}
    }*/
});


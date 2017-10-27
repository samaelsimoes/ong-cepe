ONG.centroCusto = new Object();
$(document).ready(function(){
	$('#header').load('header.html');
	$('#footer').load('footer.html');
	
/*	ONG.centroCusto.btnCadastrar = function() {
		$("#conteudo").load("formulario/centrocusto/cad.html",function(){
			$( "#exibiList" ).hide();		
		});
		return false;
	};*/
	ONG.centroCusto.btnCancelar = function() {
		$(location).attr('href', ONG.contextPath+'/project/centrocusto.html');
		return false;
	};
	$('#valorPesquisa').keypress(function(e) {
	    if(e.which == 13) 
	        ONG.centroCusto.pesquisar();
	});

	ONG.centroCusto.pesquisar = function() {
		var valorPesquisa = $("#valorPesquisa").val();
		ONG.centroCusto.exibirLista(undefined, valorPesquisa);
	};
	ONG.centroCusto.exibirLista = function(lista, valorPesquisa){
		var html = "<table id='tabela'  class='tablesorter table table-responsive custom-table-margin-b' >";
		html +=
					"<thead table table-striped>" +
						"<tr>" +
							"<th>Nome</th>" +
							"<th>Descrição</th>" +
							"<th class='actions col-md-2'>Ações</th>" +
						"</tr>" +
					"</thead>";
		html +=		"<tbody>";
		if(lista != undefined && lista.length > 0 && lista[0].id != undefined){
			for(var i=0; i<lista.length; i++){
				html += "<tr>"+
				"<td>"+lista[i].nome+"</td>"+
				"<td>"+lista[i].descricao+"</td>"+		
				"<td class='actions  text-center'>"+
				"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.centroCusto.carregarCC("+lista[i].id+")'>Editar</button>"+ " " + " " +
				"<button type='button' class='btn btn-trash' onclick='ONG.centroCusto.excluir("+ lista[i].id+ ")'>Excluir</button>"+
				"</td>"+
				"</tr>";
			}
		} else {
			if(lista == undefined || (lista != undefined && lista.length > 0)){
				if(valorPesquisa == ""){ valorPesquisa = "*"; }

				ONG.centroCustoRest.pesquisarNome({
					data : valorPesquisa,
					success : function(lista) {
						ONG.centroCusto.exibirLista(lista);
					},
					error : function(err) {	console.log('err lista' ,err); } 
				});
			} else {
				html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
			}
		}
		html += "</tbody>";
		html +="</table>";
		$("#exibiList").html(html);
		$('#tabela').tablesorter({
			headers: { 			// (começa do zero)
				2: {			// Desativa a ordenação para essa coluna 
					sorter: false 
				},
			},
		});
//		$('#tabela').tablesorter();
	};
	ONG.centroCusto.exibirLista(undefined, "");

	ONG.centroCusto.cadastrar = function(){

		var newCad = {
				nome: $("#nome").val(),
				descricao:$("#descricao").val(),
				modalidades: []
		};
		console.log('novo cadastro',newCad);
		if (ONG.centroCusto.validar(newCad)) {
			
			ONG.centroCustoRest.inserir({
				data : newCad,
				success : function(msg) {
					console.log('success', msg);
					bootbox.alert(msg, function(){ 
						$(location).attr('href', ONG.contextPath+'/project/centrocusto.html'); 
					});
				},
				error : function(err) {
					console.log('err' ,err);
					bootbox.alert("Erro ao cadastrar: <br/>"	+ err.responseText);
				} 
			});
		}// IF
	};// CADASTRAR

	ONG.centroCusto.excluir = function(id){
		bootbox.confirm("Deseja Excluir?", function(confirmed) {
			if(confirmed) {
				
				ONG.centroCustoRest.excluir({
					data : id,
					success : function(msg) {
						  console.log(msg);
						  ONG.centroCusto.pesquisar();
					},
					error : function(err) {
						  console.log('err' ,err);
						  bootbox.alert(err.responseText);
					} 
				});
			}
		}); 
	};
	
	ONG.centroCusto.carregarCC = function(id){
				ONG.centroCustoRest.pesquisarId({
					data : id,
					success : function(ccEdit) {
						$("#idEdit").val(ccEdit.id);
						$("#nomeEdit").val(ccEdit.nome);
						$("#descricaoEdit").val(ccEdit.descricao);
					},
					error : function(err) {
						bootbox.alert("Erro ao exibir a edição: " + err.responseText);
					} 
				});
	};
	
	ONG.centroCusto.editar = function(){
		
		var EditCad = {
				id: $("#idEdit").val(),
				nome: $("#nomeEdit").val(),
				descricao:$("#descricaoEdit").val()
		};
		console.log('editar cadastro',EditCad);
		if (ONG.centroCusto.validar(EditCad)) {
			ONG.centroCustoRest.editar({
				data : EditCad,
				success : function(msg) {
					bootbox.alert(msg, function(){ 
						debugger;
						ONG.centroCusto.exibirLista(undefined, "");
						$('input').val('');
						$('#modaledit').modal('toggle');
					});				
				},
				error : function(err) {
					console.log('err' ,err);
					bootbox.alert("Erro ao editar: "	+ err.responseText);
				} 
			});
		}// IF		
	};

	ONG.centroCusto.validar = function(cc) {
		debugger;		
		var aux = "";


		if (cc.nome == "" || cc.nome == undefined) {
			aux += "Nome é Obrigatório <br/>";
		}if (cc.descricao == "" || cc.descricao == undefined) {
			aux += "Descrição é Obrigatório <br/>";
		}
		
		
		if (aux != "") {
			bootbox.alert(aux)
			return false;
		}
		return true;
	};

});

ONG.usuario = new Object();
$(document).ready(function(){
	$('#header').load('header.html');
	$('#footer').load('footer.html');
	
	ONG.usuario.btnCadastrar = function() {
		$("#conteudo").load("formulario/usuarios/cad.html",function(){
			$( "#exibiList" ).hide();		
		});
		return false;
	};
	ONG.usuario.btnCancelar = function() {
		$(location).attr('href', ONG.contextPath+'/project/usuarios.html');
		return false;
	};
	$('#valorPesquisa').keypress(function(e) {
	    if(e.which == 13) 
	        	ONG.usuario.pesquisar();
	});

	ONG.usuario.pesquisar = function() {
		var valorPesquisa = $("#valorPesquisa").val();
		ONG.usuario.exibirLista(undefined, valorPesquisa);
	};
	ONG.usuario.exibirLista = function(lista, valorPesquisa){
		var html = "<table id='tabela'  class='table table-responsive custom-table-margin-b' >";
		html +=
					"<thead table table-striped>" +
						"<tr>" +
							"<th>Nome</th>" +
							"<th>Email</th>" +
							"<th>Tipo</th>" +
							"<th>Login</th>" +
							"<th class='actions col-md-2'>Ações</th>" +
						"</tr>" +
					"</thead>";
		html +=		"<tbody>";
		if(lista != undefined && lista.length > 0 && lista[0].id != undefined){
			for(var i=0; i<lista.length; i++){
				html += "<tr>"+
				"<td>"+lista[i].nome+"</td>"+
				"<td>"+lista[i].email+"</td>"+				
				"<td>"+lista[i].tipo+"</td>"+				
				"<td>"+lista[i].usuario+"</td>"+				
				"<td class='actions  text-center'>"+
				"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.usuario.carregarUsuario("+lista[i].id+")'>Editar</button>"+ " " + " " +
				"<button type='button' class='btn btn-trash' onclick='ONG.usuario.excluir("+ lista[i].id+ ")'>Excluir</button>"+
				"</td>"+
				"</tr>";
			}
		} else {
			if(lista == undefined || (lista != undefined && lista.length > 0)){
				if(valorPesquisa == ""){ valorPesquisa = "*"; }

				ONG.usuarioRest.pesquisarNome({
					data : valorPesquisa,
					success : function(lista) {
						ONG.usuario.exibirLista(lista);
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
//		$('#tabela').tablesorter({
//			headers: { 			// (começa do zero)
//				4: {			// Desativa a ordenação para essa coluna 
//					sorter: false 
//				},
//			},
//		});
		//$('#tabela').tablesorter();
	};
	ONG.usuario.exibirLista(undefined, "");

	ONG.usuario.cadastrar = function(){
		var senha = btoa($("#senha").val());

		var newCad = {
				nome: $("#nome").val(),
				email:$("#email").val(),
				usuario:$("#login").val(),
				tipo:$("#tipo").val(),
				senha:senha,
		};
		console.log('novo cadastro',newCad);
		if (ONG.usuario.validar(newCad)) {
			
			ONG.usuarioRest.inserir({
				data : newCad,
				success : function(msg) {
					console.log('success', msg);
					bootbox.alert(msg, function(){ 
						$(location).attr('href', ONG.contextPath+'/project/usuarios.html'); 
					});
				},
				error : function(err) {
					console.log('err' ,err);
					bootbox.alert("Erro ao cadastrar: <br/>"	+ err.responseText);
				} 
			});
		}// IF
	};// CADASTRAR

	ONG.usuario.excluir = function(id){
		bootbox.confirm("Deseja Excluir?", function(confirmed) {
			if(confirmed) {
				
				ONG.usuarioRest.excluir({
					data : id,
					success : function(msg) {
						  console.log(msg);
						  ONG.usuario.pesquisar();
					},
					error : function(err) {
						  console.log('err' ,err);
						  bootbox.alert(err.responseText);
					} 
				});
			}
		}); 
	};
	
	ONG.usuario.carregarUsuario = function(id){
				ONG.usuarioRest.pesquisarId({
					data : id,
					success : function(usuarioEdit) {
						$("#idEdit").val(usuarioEdit.id);
						$("#nomeEdit").val(usuarioEdit.nome);
						$("#emailEdit").val(usuarioEdit.email);
						$("#tipoEdit").val(usuarioEdit.tipo);
						$("#loginEdit").val(usuarioEdit.usuario);
					},
					error : function(err) {
						bootbox.alert("Erro ao exibir a edição: " + err.responseText);
					} 
				});
	};
	
	ONG.usuario.editar = function(){
		var senha = btoa($("#senhaEdit").val());
		
		var EditCad = {
				id: $("#idEdit").val(),
				nome: $("#nomeEdit").val(),
				email:$("#emailEdit").val(),
				usuario:$("#loginEdit").val(),
				tipo:$("#tipoEdit").val(),
				senha:senha,
		};
		console.log('editar cadastro',EditCad);
		if (ONG.usuario.validar(EditCad)) {
			ONG.usuarioRest.editar({
				data : EditCad,
				success : function(msg) {
					bootbox.alert(msg, function(){ 
						debugger;
						ONG.usuario.exibirLista(undefined, "");
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

	ONG.usuario.validar = function(usuario) {
		debugger;
		var senhaConf = btoa($("#senhaConf").val());
		
		var aux = "";


		if (usuario.nome == "") {
			aux += "Nome é Obrigatório <br/>";
		}if (usuario.email == "") {
			aux += "Email é Obrigatório <br/>";
		}if (usuario.tipo == "" ) {
			aux += "Tipo é Obrigatório <br/>";
		}if (usuario.usuario == "" ) {
			aux += "Login é Obrigatório <br/>";
		}if (usuario.senha ==""){
			aux += "Senha é Obrigatório <br/>";
		}if (usuario.senha != senhaConf ) {
				aux += "Senhas inválidas <br/>";
				$("#senha").val("");
				$("#senhaConf").val("");
		}
		
		
		if (aux != "") {
			bootbox.alert(aux)
			return false;
		}
		return true;
	};

});

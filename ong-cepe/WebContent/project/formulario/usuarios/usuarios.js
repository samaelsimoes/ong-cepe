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
//	TARGUS.aluno.btnCancelar = function() {
//		$("#conteudo").load("private/aluno/gerenciar.html",function(){
//			TARGUS.mask.maskUser();
//		});
//		return false;
//	};
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
				"<a class='btn btn-warning btn-xs' href='#' onclick='TARGUS.aluno.carregarAluno("+ lista[i].id+ ")'>Editar</a>" +
				"<a class='btn btn-danger btn-xs'  href='#' onclick='ONG.usuario.excluir("+ lista[i].id+ ")'>Excluir</a>"+ 
				"</td>"+
				"</tr>";
			}
		} else {
			if(lista == undefined || (lista != undefined && lista.length > 0)){
				if(valorPesquisa == ""){ valorPesquisa = "*"; }
//					data : {'valor1' : valorPesquisa, 'valor2' : 1},
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
//		
//	
//	TARGUS.aluno.preencheEstado = function(listaEstados, callback) {
//		var html = "<select class='form-control' id='estado'>"+
//		"<option value='0'>Selecione</option>";
//		if(listaEstados != undefined){
//			for(var i=0; i<listaEstados.length; i++){
//				html+="<option value='"+listaEstados[i].id+"'>"+listaEstados[i].uf +" - " + listaEstados[i].nome+"</option>";
//			}
//		} else {
//			if(listaEstados == undefined) {
//				
//				TARGUS.usuarioRest.pesquisarEstados({
//					success : function(listaEstados) {
//						TARGUS.aluno.preencheEstado(listaEstados, callback);
//					},
//					error : function(err) {	console.log('err listaEstados' ,err); } 
//				});
//			}
//		}
//		html += "</select>";
//		$("#resulEstado").html(html);
//		if(callback) callback();
//		TARGUS.aluno.listenerCidade();
//	};	
//	TARGUS.aluno.preencheCidade = function(listaCidades, callback) {
//		var idEstado =  $("#estado").find("option:selected").val();
//		var html = "<select class='form-control' id='cidade'>"+
//		"<option value='0'>Selecione</option>";
//		if(listaCidades != undefined){
//			for(var i=0; i<listaCidades.length; i++){
//				html+="<option value='"+listaCidades[i].id+"'>"+ listaCidades[i].nome+"</option>";
//			}
//		} else {
//			if(idEstado != undefined) {
//				
//				TARGUS.usuarioRest.pesquisarCidades({
//					data : idEstado,
//					success : function(listaCidades) {
//						TARGUS.aluno.preencheCidade(listaCidades, callback);
//					},
//					error : function(err) {	console.log('err listaCidades' ,err); } 
//				});
//			}
//		}
//		html += "</select>";
//		$("#resulCidade").html(html);
//		if(callback) callback();
//	};	
//
//	
	ONG.usuario.cadastrar = function(){
		var senha = btoa($("#senha").val());
//		var senhaConf = btoa($("#senhaConf").val());

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
						$(location).attr('href', ONG.contextPath+'/project/usuarios.html'); });
					
				},
				error : function(err) {
					console.log('err' ,err);
					bootbox.alert("Erro ao cadastrar: <br/>"	+ err.responseText);
				} 
			});
		}// IF
	};// CADASTRAR
//
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
//	
//	TARGUS.aluno.carregarAluno = function(id){
//		TARGUS.usuarioRest.pesquisarId({
//			data : {'valor1' : id, 'valor2' : 1},
//			success : function(alunoParam) {
//				console.log("carregarAluno "+alunoParam);
//				TARGUS.aluno.carregaEstados(alunoParam);
//			},
//			error : function(err) {	bootbox.alert(err.responseText); } 
//		});
//	};
//	TARGUS.aluno.carregaEstados = function(alunoParam){
//		TARGUS.usuarioRest.pesquisarEstados({
//			success : function(listaEstados) {
//				TARGUS.aluno.carregaCidades(alunoParam, listaEstados);
//				console.log("carregaEstados "+listaEstados);
//			},
//			error : function(err) { console.log('err listaEstados' ,err); } 
//		});
//	};
//	TARGUS.aluno.carregaCidades = function (aluno, estadosParam){
//		TARGUS.usuarioRest.pesquisarCidades({
//			data : aluno.endereco.cidade.estado.id,
//			success : function(listaCidades) {
//				$("#conteudo").load("private/aluno/editar.html", function (){
//					TARGUS.aluno.montaEstados(estadosParam);
//					TARGUS.aluno.montaCidades(listaCidades);
//					TARGUS.aluno.listenerCidade();
//					var dtNasc = TARGUS.mask.formataData(aluno.dtNasc);
//					var dtExame = TARGUS.mask.formataData(aluno.dtExame);
//					$("#idEdit").val(aluno.id);
//					$("#idEnderecoEdit").val(aluno.endereco.id);
//					$("#nomeEdit").val(aluno.nome);
//					$("#sexoEdit").val(aluno.sexo);
//					$("#cpfEdit").val(aluno.cpf);
//					$("#rgEdit").val(aluno.rg);
//					$("#dtNascEdit").val(dtNasc);
//					$("#emailEdit").val(aluno.email);
//					$("#foneResEdit").val(aluno.foneRes);
//					$("#foneCelEdit").val(aluno.foneCel);
//					$("#tipoEndeEdit").val(aluno.endereco.tipo);
//					$("#cepEdit").val(aluno.endereco.cep);
//					$("#ruaEdit").val(aluno.endereco.rua);
//					$("#numeroEdit").val(aluno.endereco.numero);
//					$("#complementoEdit").val(aluno.endereco.complemento);
//					$("#bairroEdit").val(aluno.endereco.bairro);
//					$("#cidade").val(aluno.endereco.cidade.id);
//					$("#estado").val(aluno.endereco.cidade.estado.id);
//					$("#dtExameEdit").val(dtExame);
//					$("#fileExameEdit").val(aluno.fileExame);
//					TARGUS.mask.maskUser();
//				});
//			},
//			error : function(err) {	console.log('err listaCidades' ,err); } 
//		});
//	};
//	
//	TARGUS.aluno.montaEstados = function (estados){
//			var html = "<select class='form-control' id='estado'>"+
//			"<option value='0'>Selecione</option>";
//			if(estados != undefined){
//				for(var i=0; i<estados.length; i++){
//					html+="<option value='"+estados[i].id+"'>"+estados[i].uf +" - " + estados[i].nome+"</option>";
//				}
//			}
//			html += "</select>";
//			$("#resulEstado").html(html);
//	};
//	TARGUS.aluno.montaCidades = function (cidades){
//		var html = "<select class='form-control' id='cidade'>"+
//		"<option value='0'>Selecione</option>";
//		if(cidades != undefined){
//			for(var i=0; i<cidades.length; i++){
//				html+="<option value='"+cidades[i].id+"'>"+ cidades[i].nome+"</option>";
//			}
//		}
//		html += "</select>";
//		$("#resulCidade").html(html);
//	};
//	
//	
//	TARGUS.aluno.editar = function(aluno){ 		
//		var fileExameHtml = ""; //se for em branco no rest, é pq não foi enviado um novo arquivo
//		if($("#fileExameTemp").val() != ""){
//			fileExameHtml = $("#fileExameTemp").val();
//		}
//		var senha = btoa($("#senhaEdit").val());
//		var EditCad = {
//				id:$("#idEdit").val(),
//				nome:$("#nomeEdit").val(),
//				sexo:$("#sexoEdit").val(),
//				cpf:$("#cpfEdit").val().replace(/[^0-9]/g,''),
//				rg:$("#rgEdit").val().replace(/[^0-9]/g,''),
//				dtNasc:TARGUS.cvtDateTime.bancoInsert($("#dtNascEdit").val()),
//				email:$("#emailEdit").val(),
//				foneRes:$("#foneResEdit").val().replace(/[^0-9]/g,''),
//				foneCel:$("#foneCelEdit").val().replace(/[^0-9]/g,''),
//				senha:senha,
//				dtExame:TARGUS.cvtDateTime.bancoInsert($("#dtExameEdit").val()),
//				fileExame: fileExameHtml,
//				tipo:1,
//				endereco: {
//					id:$("#idEnderecoEdit").val(),
//					tipo:$("#tipoEndeEdit").val(),
//					cep:$("#cepEdit").val().replace(/[^0-9]/g,''),
//					rua:$("#ruaEdit").val(),
//					numero:$("#numeroEdit").val(),
//					complemento:$("#complementoEdit").val(),
//					bairro:$("#bairroEdit").val(),
//						cidade: {
//							id: $("#cidade").val(),
//							estado: {
//								id: $("#estado").val()								
//							}
//						}
//				}
//		};
//		console.log('editar cadastro',EditCad);
//		if (TARGUS.aluno.validar(EditCad)) {
//			TARGUS.usuarioRest.editar({
//				data : EditCad,
//				success : function(msg) {
//					bootbox.alert(msg);
//					$("#conteudo").load("private/aluno/gerenciar.html");
//				},
//				error : function(err) {
//					console.log('err' ,err);
//					bootbox.alert("Erro ao editar: "	+ err.responseText);
//				} 
//			});
//		}// IF		
//	};

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

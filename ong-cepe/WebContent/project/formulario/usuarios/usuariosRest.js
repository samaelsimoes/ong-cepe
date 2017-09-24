ONG.usuarioRest = new Object();

$(document).ready(function(){
	
	ONG.usuarioRest.inserir = function(config){
		ONG.ajax.post({
			url : ONG.contextPath+"/rest/usuario/",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
	
	ONG.usuarioRest.pesquisarNome = function(config){
//		url : "rest/pessoas/pesquisarNome?nome="+config.data.valor1 + "&tipo=" + config.data.valor2 ,
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/usuario/nome/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.usuarioRest.pesquisarId = function(config){
		ONG.ajax.get({
			url : "rest/pessoas/pesquisarId?id="+config.data.valor1 + "&tipo=" + config.data.valor2,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.usuarioRest.excluir = function(config){
		ONG.ajax.delet({
			url : ONG.contextPath+"/rest/usuario/"+config.data ,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.usuarioRest.editar = function(config){
		ONG.ajax.put({
			url : "rest/pessoas/editar",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
});

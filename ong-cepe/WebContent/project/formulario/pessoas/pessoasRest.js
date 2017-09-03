ONG.pessoasRest = new Object();

$(document).ready(function(){
	
	ONG.pessoasRest.inserir = function(config){
		ONG.ajax.post({
			url : "rest/pessoas/inserir",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
	
	ONG.pessoasRest.pesquisarNome = function(config){
		ONG.ajax.get({
			url : "rest/pessoas/pesquisarNome?nome="+config.data.valor1 + "&tipo=" + config.data.valor2 ,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.pessoasRest.pesquisarId = function(config){
		ONG.ajax.get({
			url : "rest/pessoas/pesquisarId?id="+config.data.valor1 + "&tipo=" + config.data.valor2,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.pessoasRest.excluir = function(config){
		ONG.ajax.delet({
			url : "rest/pessoas/excluir/"+config.data ,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.pessoasRest.editar = function(config){
		ONG.ajax.put({
			url : "rest/pessoas/editar",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
});

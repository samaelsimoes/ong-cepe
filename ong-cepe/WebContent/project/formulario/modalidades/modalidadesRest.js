ONG.modalidadeRest = new Object();

$(document).ready(function(){
	
	ONG.modalidadeRest.inserir = function(config){
		ONG.ajax.post({
			url : ONG.contextPath+"/rest/modalidade/",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
	
	ONG.modalidadeRest.pesquisarNome = function(config){
//		url : "rest/pessoas/pesquisarNome?nome="+config.data.valor1 + "&tipo=" + config.data.valor2 ,
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/modalidade/nome/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.modalidadeRest.pesquisarId = function(config){
		ONG.ajax.get({
			url : "rest/pessoas/pesquisarId?id="+config.data.valor1 + "&tipo=" + config.data.valor2,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.modalidadeRest.excluir = function(config){
		ONG.ajax.delet({
			url : ONG.contextPath+"/rest/modalidade/"+config.data ,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.modalidadeRest.editar = function(config){
		ONG.ajax.put({
			url : "rest/pessoas/editar",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
});

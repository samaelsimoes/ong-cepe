$(document).ready(function(){
	
	$('#header').load('header.html');
	$('#footer').load('footer.html');

	cadpesfisica = function(){

		$('#pesstipo').load('formulario/pessoas/cadpesfisica.html');
	}
});

var items = document.getElementById('tipopessoa');

	items.addEventListener('change', function(){
	
	var valor =	this.value // o valor que procuras é: this.value

	if(valor == 0){
		
		$('#pesstipo').load('formulario/pessoas/relpesfisica.html');
	}else if(valor == 1 ){
		
		$('#pesstipo').load('formulario/pessoas/relpesjuridica.html');
	}else if(valor == 2){
		
		$('#pesstipo').load('formulario/pessoas/relbeneass.html');
	}
});


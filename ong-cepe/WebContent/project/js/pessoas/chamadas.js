$(document).ready(function(){
	
	$('#header').load('header.html');
	$('#footer').load('footer.html');
});

var items = document.querySelector('#tipopessoa');

items.addEventListener('change', function(){
	
	var valor =	this.value // o valor que procuras é: this.value

	if(valor == 0) {	
		
		$('#pesstipo').load('formulario/pessoas/pf/gridpf.html');
	}else if(valor == 1 ) {
		
		$('#pesstipo').load('formulario/pessoas/pj/gridpj.html');
	}else if(valor == 2) {
		
		$('#pesstipo').load('formulario/pessoas/beneass/gridbeneass.html');
	}
});


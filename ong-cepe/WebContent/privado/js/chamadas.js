var items = document.getElementById('tipopessoa');

	items.addEventListener('change', function(){
	
	var valor =	this.value // o valor que procuras é: this.value

	if(valor == 1){
		
		$('#pesstipo').load('formulario/pesfisica.html');

	}else if(valor == 2 ){
		
		$('#pesstipo').load('formulario/pesjuridica.html');
	}
});
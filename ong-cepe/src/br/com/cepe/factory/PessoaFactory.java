package br.com.cepe.factory;

import br.com.cepe.datatypes.Tipo;
import br.com.cepe.entity.pojo.Pessoa;
import br.com.cepe.entity.pojo.PessoaFisica;
import br.com.cepe.entity.pojo.PessoaJuridica;

public class PessoaFactory{
	
		public Pessoa getPessoa(Tipo tipo) {
			
			if (tipo == Tipo.PF) 
				return new PessoaFisica();
			if (tipo == Tipo.PJ)
				return new PessoaJuridica();
			
			return null;
		}

}

package br.com.cepe.factory;

import br.com.cepe.datatypes.Tipo;
import br.com.cepe.entity.pojo.Pessoa;
import br.com.cepe.entity.pojo.PessoaFisica;
import br.com.cepe.entity.pojo.PessoaJuridica;

public class PessoaFactory {

	public Pessoa getPessoa(Tipo tipo) {

		return (tipo == Tipo.PF) ? new PessoaFisica() : new PessoaJuridica();

	}

}

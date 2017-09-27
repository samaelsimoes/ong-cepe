
package br.com.cepe.entity.pojo.pessoa;

import javax.persistence.Entity;


@Entity
public class DoadorPf extends PessoaFisica{
	
	private String teste;

	public String getTeste() {
		return teste;
	}

	public void setTeste(String teste) {
		this.teste = teste;
	}
}

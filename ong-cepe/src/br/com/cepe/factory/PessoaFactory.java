/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory;

import br.com.cepe.datatype.Tipo;
import br.com.cepe.entity.pojo.Pessoa;
import br.com.cepe.entity.pojo.PessoaFisica;
import br.com.cepe.entity.pojo.PessoaJuridica;


public class PessoaFactory {

	/**
	 * Retorna objeto Pessoa de acordo com o tipo passado por parametro,
	 * podendo ser pessoa física ou jurídica
	 * @param tipo
	 * @return Pessoa
	 * @author Eduardo C. Campigoto
	 */
	public Pessoa getPessoa(Tipo tipo){
		return (tipo == Tipo.PF) ? new PessoaFisica() : new PessoaJuridica();
	}


}

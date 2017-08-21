/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.entity.pessoa;

import br.com.cepe.datatype.PessoaType;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.entity.pojo.pessoa.PessoaFisica;
import br.com.cepe.entity.pojo.pessoa.PessoaJuridica;


public class PessoaFactory {
	/**
	 * Retorna objeto Pessoa de acordo com o tipo passado por parametro,
	 * podendo ser pessoa física ou jurídica
	 * @param tipo
	 * @return Pessoa
	 * @author Eduardo C. Campigoto
	 */

	public Pessoa getPessoa(Pessoa pessoa){
		if(pessoa != null)
			return (pessoa.getTipo() == PessoaType.PF) ? new PessoaFisica() : new PessoaJuridica();
	
		return null;
	}
	


}

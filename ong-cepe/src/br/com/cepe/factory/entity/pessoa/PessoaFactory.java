/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.entity.pessoa;

import br.com.cepe.entity.pojo.pessoa.Atleta;
import br.com.cepe.entity.pojo.pessoa.Beneficiario;
import br.com.cepe.entity.pojo.pessoa.DoadorPf;
import br.com.cepe.entity.pojo.pessoa.DoadorPj;
import br.com.cepe.entity.pojo.pessoa.Patrocinador;
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

	public Pessoa getPessoa(Object object){
			
		if(object != null){
		
			if(object instanceof PessoaFisica)
				return (PessoaFisica)object;
			
			if(object instanceof PessoaJuridica)
				return (PessoaJuridica)object;
			
			if(object instanceof Beneficiario)
				return (Beneficiario)object;
			
			if(object instanceof DoadorPf)
				return (PessoaFisica)object;
			
			if(object instanceof DoadorPj)
				return (DoadorPj)object;
			
			if(object instanceof Atleta)
				return (Atleta)object;
			
			if(object instanceof Patrocinador)
				return (Patrocinador)object;

		}
		
		return null;
	}
	
	
	


}

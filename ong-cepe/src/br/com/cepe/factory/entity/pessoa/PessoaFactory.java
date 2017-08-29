/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.entity.pessoa;

import java.util.List;

import br.com.cepe.datatype.PessoaType;
import br.com.cepe.entity.pojo.pessoa.Atleta;
import br.com.cepe.entity.pojo.pessoa.Beneficiario;
import br.com.cepe.entity.pojo.pessoa.DoadorPf;
import br.com.cepe.entity.pojo.pessoa.DoadorPj;
import br.com.cepe.entity.pojo.pessoa.Patrocinador;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.entity.pojo.pessoa.PessoaFisica;
import br.com.cepe.entity.pojo.pessoa.PessoaJuridica;


public class PessoaFactory{
private List<Pessoa> pessoas;
/**
 * Retorna objeto Pessoa de acordo com o tipo passado por parametro,
 * podendo ser pessoa física ou jurídica
 * @param tipo
 * @return Pessoa
 * @author Eduardo C. Campigoto
 */

public PessoaFactory(){
	
}

public PessoaFactory(Pessoa pessoa){
	
	if(pessoa != null){
	
		if(pessoa.getTipo().equals(PessoaType.PF)){
			PessoaFisica obj = (PessoaFisica) pessoa;
			this.pessoas.add(obj);
		} 
		
		if(pessoa.getTipo().equals(PessoaType.PJ)){
			PessoaJuridica obj = (PessoaJuridica) pessoa;
			this.pessoas.add(obj);
		} 
			
		
		if(pessoa.getTipo().equals(PessoaType.BENEFIC)){
			Beneficiario obj = (Beneficiario) pessoa;
			this.pessoas.add(obj);
		} 
		
		if(pessoa.getTipo().equals(PessoaType.DOADOR_PF)){
			DoadorPf obj = (DoadorPf) pessoa;
			this.pessoas.add(obj);
		} 
		
		if(pessoa.getTipo().equals(PessoaType.DOADOR_PJ)){
			DoadorPj obj = (DoadorPj) pessoa;
			this.pessoas.add(obj);
		} 
		
		if(pessoa.getTipo().equals(PessoaType.ATLETA)){
			Atleta obj = (Atleta) pessoa;
			this.pessoas.add(obj);
		} 
		
		if(pessoa.getTipo().equals(PessoaType.PATROCIN)){
			Patrocinador obj = (Patrocinador) pessoa;
			this.pessoas.add(obj);
		} 
			
	}
	
}
	
public List<Pessoa> getPessoasLista() {
	return pessoas;
}

public void setPessoas(List<Pessoa> pessoas) {
		this.pessoas = pessoas;
}


public Pessoa getPessoa() {
	return pessoas.get(0);
}
	
	
	
	
	


}

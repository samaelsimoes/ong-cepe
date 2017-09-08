/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.daoconnect;

import br.com.cepe.entity.pojo.pessoa.Pessoa;

public class PessoaDAO extends OperationsDAO<Pessoa>{

	public PessoaDAO() {
		super();
	}
	
	public PessoaDAO(int num) {
		super(num);
	}
	
	public PessoaDAO(Pessoa pessoa){
		super(pessoa);
	}
	
}

/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.PessoaDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.exception.GlobalException;

public class PessoaService {
private PessoaDAO pessoaDAO;

	public PessoaService(){
		pessoaDAO = new PessoaDAO();	
	}
	
	public void adicionar(Pessoa pessoa){
		pessoaDAO.persist(pessoa);
	}
	
	public Pessoa pesquisar(Pessoa pessoa){
		return pessoaDAO.findId(pessoa.getId());
	}
	
	public void alterar(Pessoa pessoa){
		pessoaDAO.persist(pessoa);
	}

	public List<Pessoa> pesquisarStr(String campo, HOperator operacao, String valor) throws GlobalException{
		return pessoaDAO.findStr(campo, operacao, valor);
	}	
	
	public List<Pessoa> pesquisarNome(String valor) throws GlobalException{
		return pessoaDAO.findStr("nome", HOperator.CONTAINS, valor);
	}
	
	
	public void excluir(int id){
		pessoaDAO.delete(id);
	}
	
	
}

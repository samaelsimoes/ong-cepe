/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.PessoaDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.exception.GlobalException;

public class PessoaService<T extends Pessoa> {
private PessoaDAO pessoaDAO = new PessoaDAO();
Pessoa pessoa;

	public PessoaService(T obj){

	}
	
	public PessoaService(){
		pessoaDAO = new PessoaDAO();
	}
	
	public void adicionar(){
		pessoaDAO.persist(this.pessoa);
	}
	
	
	public void adicionarLista(List<T> pessoas){
		for (T pessoa : pessoas) {
			this.pessoa = pessoa;
			adicionar();
		}
	}
	
	public Pessoa pesquisar(){
		return pessoaDAO.findId(this.pessoa.getId());
	}
	
	public void alterar(){
		pessoaDAO.persist(this.pessoa);
	}

	@SuppressWarnings("unchecked")
	public List<T> pesquisarStr(String campo, HOperator operacao, String valor) throws GlobalException{
		return (List<T>) pessoaDAO.findStr(campo, operacao, valor);
	}	
	
	@SuppressWarnings("unchecked")
	public List<T> pesquisarNome(String valor) throws GlobalException{
		return (List<T>)pessoaDAO.findStr("nome", HOperator.CONTAINS, valor);
	}
	
	
	public void excluir(int id){
		pessoaDAO.delete(id);
	}
	
	
}

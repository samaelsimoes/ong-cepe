/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.PessoaDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.exception.GlobalException;

public class PessoaService{
private PessoaDAO pessoaDAO = new PessoaDAO();
Pessoa pessoa;
String valorStr;

	public PessoaService(Pessoa obj){
		this.pessoa = obj;
	}
	
	public PessoaService(String valorStr){
		this.valorStr = valorStr;
	}
	
	public PessoaService(){
		pessoaDAO = new PessoaDAO();
	}
	
	public void adicionar(){
		pessoaDAO.persist(this.pessoa);
	}
	
	
	public void adicionarLista(List<Pessoa> pessoas){
		for (Pessoa pessoa : pessoas) {
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

	public List<Pessoa> pesquisarStr(String campo, HOperator operacao, String valor) throws GlobalException{
		return (List<Pessoa>) pessoaDAO.findStr(campo, operacao, valor);
	}	
	

	public List<Pessoa> pesquisarNome() throws GlobalException{
		return (List<Pessoa>)pessoaDAO.findStr("nome", HOperator.CONTAINS, this.valorStr);
	}
	
	
	public void excluir(int id){
		pessoaDAO.delete(id);
	}
	
	
}

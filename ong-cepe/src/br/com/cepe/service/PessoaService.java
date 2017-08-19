package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.PessoaDAO;
import br.com.cepe.entity.pojo.Pessoa;

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

	public List<Pessoa> pesquisarStr(String campo, String operacao, String valor){
		return pessoaDAO.findStr(campo, operacao, valor);
	}
	
	
	public void excluir(Pessoa pessoa){
		pessoaDAO.delete(pessoa.getId());
	}
	
	
}

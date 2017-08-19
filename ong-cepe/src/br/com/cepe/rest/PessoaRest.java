package br.com.cepe.rest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.cepe.entity.pojo.Pessoa;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.ObjMapper;
import br.com.cepe.factory.PessoaFactory;
import br.com.cepe.service.PessoaService;

@Path("/Pessoa")
public class PessoaRest extends ObjMapper{
private PessoaFactory pessoaFactory;
private PessoaService pessoaService;

public PessoaRest(){
	pessoaFactory = new PessoaFactory();
	pessoaService = new PessoaService();
}

@POST
@Consumes("application/*")
public void adicionar(String pessoaStr) throws GlobalException{
	try {
		Pessoa pessoa = pessoaFactory.getPessoa(getObject().readValue(pessoaStr, Pessoa.class));
		pessoaService.adicionar(pessoa);
		
	} catch (Throwable e) {
		e.printStackTrace();
	}
	
} 

@GET
@Produces({MediaType.APPLICATION_JSON})
public String pesquisar(String json){
	try {
		Pessoa pessoa = pessoaFactory.getPessoa(getObject().readValue(json, Pessoa.class));
		return getJson(pessoaService.pesquisar(pessoa));	
	} catch (Throwable e) {
		e.printStackTrace();
	}
	return null;
}


@PUT
@Consumes("application/*")
public void alterar(String pessoaStr) throws GlobalException{
	try {
		Pessoa pessoa = pessoaFactory.getPessoa(getObject().readValue(pessoaStr, Pessoa.class));
		pessoaService.alterar(pessoa);
	} catch (Throwable e) {
		e.printStackTrace();
	} 
}

@DELETE
@PathParam("id")
public void excluir(@PathParam("id") int id){
	pessoaService.excluir(id);
}




}

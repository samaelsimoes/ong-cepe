/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.entity.pessoa.PessoaFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.PessoaService;

@Path("/pessoa")
public class PessoaRest extends ObjMapper {
	private PessoaService pessoaService;

	public PessoaRest() {
	}

	/**
	 * @param pessoaStr
	 *            - Json da entidade pessoa.
	 * **/
	@POST
	@Consumes("application/*")
	public ResponseBuilder adicionar(String pessoaStr) throws GlobalException {
		try {
			PessoaFactory pessoaFactory =  new PessoaFactory(pessoaStr); 
			Pessoa pessoa = (Pessoa) pessoaFactory.getPessoa();
			
			if(pessoa != null)
				new PessoaService(pessoa).adicionar();
			else
				throw new GlobalException("Valor nulo enviado ao REST");
			
			return Response.status(1);
			
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return null;
	}

	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public String pesquisarNome(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Pessoa> pessoas = (List<Pessoa>) new PessoaService(nome).pesquisarNome();
			return getJson(pessoas);
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por nome");
		}
	}
	
	@GET
	@Path("/tipo/{tipo}")
	@Produces({ MediaType.APPLICATION_JSON })
	public String pesquisarTipo(@PathParam("tipo") String tipo) throws GlobalException {
		try {
			return getJson(pessoaService.pesquisarStr("tipo", HOperator.EQUALS, tipo));
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por nome");
		}
	}

	@PUT
	@Consumes("application/*")
	public void alterar(String pessoaStr) throws GlobalException {
		try {
			PessoaFactory pessoaFactory =  new PessoaFactory(pessoaStr); 
			Pessoa pessoa = (Pessoa) pessoaFactory.getPessoa();
			new PessoaService(pessoa).alterar();
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a alteração do usuário");
		}
	}

	@DELETE
	@Path("id")
	public ResponseBuilder excluir(@PathParam("id") int id) throws Exception {
		try{
		pessoaService.excluir(id);
		}catch(Throwable e){
			e.printStackTrace();
			throw new Exception("Erro ao deletar usuário");
		}
		return null;
	}

}

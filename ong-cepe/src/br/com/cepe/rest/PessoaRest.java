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

import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.entity.pessoa.PessoaFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.PessoaService;

@Path("/pessoa")
public class PessoaRest extends ObjMapper {

	public PessoaRest() {
	}

	/**
	 * @param pessoaStr
	 * - Json da entidade pessoa.
	 * **/
	@POST
	@Consumes("application/*")
	public Response adicionar(String pessoaStr) throws GlobalException {
		try {
			 
			Pessoa pessoa = new PessoaFactory(pessoaStr).getPessoa();
					
			if(pessoa != null)
				new PessoaService(pessoa).adicionar();
			else
				throw new GlobalException("Valor nulo enviado ao servidor! ");
			
			return this.buildResponse("Cadastro concluído com sucesso.");
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarNome(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Pessoa> pessoas = new PessoaService(nome).pesquisaNomeContem();
			String resp = getJson(pessoas);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome! ");
		}
	}
	
	@GET
	@Path("/tipo/{tipo}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarTipo(@PathParam("tipo") int tipo) throws GlobalException {
		try {
			List<Pessoa> pessoas = new PessoaService(tipo).pesquisaTipoIgual();
			String resp = getJson(pessoas);
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por tipo");
		}
	}
	
	@GET
	@Path("/id/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarId(@PathParam("id") int id) throws GlobalException {
		String resp = null;
		try {
			System.out.println(id);
			Pessoa pessoa = new PessoaService(id).pesquisaId();
			if(pessoa != null)
				resp = getJson(pessoa);
			else
				throw new GlobalException("Erro ao buscar pessoa por Id! ");
			
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
<<<<<<< HEAD
			return this.buildErrorResponse(e.getMessage());
=======
			throw new GlobalException("Erro ao fazer a consulta por id");
>>>>>>> d464d5d065c7771ee852fb440049fc2a7940e2d3
		}
	}

	@PUT
	@Consumes("application/*")
	public Response alterar(String pessoaStr) throws GlobalException { 
		try {
			Pessoa pessoa = new PessoaFactory(pessoaStr).getPessoa(); 
			new PessoaService(pessoa).alterar();
			return Response.ok( pessoa ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a alteração do usuário");
		}
	}

	@DELETE
	@Path("/id/{id}")
	public Response excluir(@PathParam("id") int id) throws Exception {
		try{
		 new PessoaService(id).excluir();
		return Response.ok().build();
		
		}catch(Throwable e){
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao deletar usuário");
		}
	}

}
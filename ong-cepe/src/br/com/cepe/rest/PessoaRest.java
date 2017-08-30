/**
 * @author  Eduardo Cristian Campigoto
 **/
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
import javax.ws.rs.core.Response;

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
//	@POST
//	@Consumes("application/*")
//	public void adicionar(String pessoaStr) throws GlobalException {
//		try {
//
//			PessoaFactory pessoaFactory =  new PessoaFactory(pessoaStr); 
//			Pessoa pessoa = (Pessoa) pessoaFactory.getPessoa();
//			new PessoaService(pessoa).adicionar();
//
//		} catch (Throwable e) {
//			e.printStackTrace();
//		}
//
//	}
	
	@POST
<<<<<<< HEAD
	@Path("/add")	
	@Consumes("application/*")
	public Response adicionar(String json) throws GlobalException {
		try {
			
			Object obj = getObject().readValue(json, Pessoa.class);
			// problema no factory ... 
			Object pessoa = new PessoaFactory(obj).getPessoa();
			
=======
	@Path("/adicionar")	
	@Consumes("application/*")
	public Response adicionar(String pessoaStr) throws GlobalException {
		try {
			System.out.println("pessoa/adicionar :"+pessoaStr);
>>>>>>> 326695d95a9487641c5536c400b8aed4f34a56f4
			PessoaFactory pessoaFactory =  new PessoaFactory(pessoaStr); 
			Pessoa pessoa = (Pessoa) pessoaFactory.getPessoa();
			new PessoaService(pessoa).adicionar();
			return this.buildResponse(" Pessoa Cadastrada com Sucesso "); // ARRUMAR EDUARDO /*/*/*/*/*/*/

			return this.buildResponse("Cadastrado com sucesso.");
		} catch (Throwable e) {
			e.printStackTrace();
<<<<<<< HEAD
			return this.buildErrorResponse(" Ocorreu o seguinte erro ao cadastrar pessoa " + e.getMessage()); // ARRUMAR EDUARDO  /*/*/*/*/*/*/*/*/
=======
			return this.buildErrorResponse(e.getMessage());
>>>>>>> 326695d95a9487641c5536c400b8aed4f34a56f4
		}
	}

	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public String pesquisarNome(@PathParam("nome") String nome) {

		try {

			System.out.println("debuggando");

			return getJson(pessoaService.pesquisarNome(nome));
			System.out.println("debuggando");

			// return getJson(pessoaService.pesquisarNome(nome));

			// TESTE ////////////////////////
			
			Pessoa pessoa = new Pessoa();
			pessoa.setNome(nome);
			
			return getJson(pessoa);
			
			///----------------------- DEU CERTO.... não tem nada de errado com o rest ;P
			//return getJson(pessoaService.pesquisarNome(nome));

		} catch (Throwable e) {
			e.printStackTrace();
		}

		return null;
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
		}
	}

	@DELETE
	@Path("id")
	public void excluir(@PathParam("id") int id) {
		pessoaService.excluir(id);
	}
}

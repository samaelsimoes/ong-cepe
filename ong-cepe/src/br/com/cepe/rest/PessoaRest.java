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
	public void adicionar(String pessoaStr) throws GlobalException {
		try {

			PessoaFactory pessoaFactory =  new PessoaFactory(pessoaStr); 
			Pessoa pessoa = (Pessoa) pessoaFactory.getPessoa();
			new PessoaService(pessoa).adicionar();

		} catch (Throwable e) {
			e.printStackTrace();
		}

	}

	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public String pesquisarNome(@PathParam("nome") String nome) { // tipo string ? nao deveria ser response ? ta em um loop ferrado 

		try {
			Pessoa pessoa = new Pessoa();
			return getJson(pessoaService.pesquisarNome(nome));

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
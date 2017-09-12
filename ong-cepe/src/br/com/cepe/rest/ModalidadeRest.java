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

import br.com.cepe.entity.pojo.modalidade.Modalidade;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.entity.modalidade.ModalidadeFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.ModalidadeService;

@Path("/modalidade")
public class ModalidadeRest extends ObjMapper {

	public ModalidadeRest() {
	}

	/**
	 * @param modalidadeStr
	 * - Json da entidade modalidade.
	 * **/
	@POST
	@Consumes("application/*")
	public Response adicionar(String modalidadeStr) throws GlobalException {
		try {
			 
			Modalidade modalidade = new ModalidadeFactory(modalidadeStr).getModalidade();
					
			if(modalidade != null)
				new ModalidadeService(modalidade).adicionar();
			else
				throw new GlobalException("Valor nulo enviado ao REST");
			
//			return Response.status(1);
			return this.buildResponse("Cadastrado com sucesso.");
		} catch (Throwable e) {
			e.printStackTrace();
//			throw new GlobalException("deu erro ", e);
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarNome(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Modalidade> modalidades = new ModalidadeService(nome).pesquisaNomeContem();
			String resp = getJson(modalidades);
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por nome");
		}
	}
	
	@GET
	@Path("/tipo/{tipo}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarTipo(@PathParam("tipo") int tipo) throws GlobalException {
		try {
			List<Modalidade> modalidades = new ModalidadeService(tipo).pesquisaTipoIgual();
			String resp = getJson(modalidades);
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por tipo");
		}
	}
	
	@GET
	@Path("/id/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarId(@PathParam("id") int id) throws GlobalException {
		try {
			Modalidade modalidade = new ModalidadeService(id).pesquisaId();
			String resp = getJson(modalidade);
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por tipo");
		}
	}

	@PUT
	@Consumes("application/*")
	public ResponseBuilder alterar(String modalidadeStr) throws GlobalException { 
		try {
			Modalidade modalidade = new ModalidadeFactory(modalidadeStr).getModalidade(); 
			new ModalidadeService(modalidade).alterar();
			return Response.status(1);
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a alteração do usuário");
		}
	}

	@DELETE
	@Path("id")
	public ResponseBuilder excluir(@PathParam("id") int id) throws Exception {
		try{
		 new ModalidadeService(id).excluir();
		return Response.status(1);
		
		}catch(Throwable e){
			e.printStackTrace();
			throw new Exception("Erro ao deletar usuário");
		}
	}

}
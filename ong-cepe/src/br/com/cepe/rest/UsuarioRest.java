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

import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.entity.usuario.UsuarioFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.UsuarioService;

@Path("usuario")
public class UsuarioRest extends ObjMapper{

	/**
	 * @param usuarioStr
	 * - Json da entidade usuario.
	 * **/
	@POST
	@Consumes("application/*")
	public ResponseBuilder adicionar(String usuarioStr) throws GlobalException {
		try {
			Usuario usuario = new UsuarioFactory(usuarioStr).getUsuario();
			new UsuarioService(usuario).adicionar();
						
			if(usuario != null)
				new UsuarioService(usuario).adicionar();
			else
				throw new GlobalException("Valor nulo enviado ao REST");
			
			return Response.status(1);
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("deu erro ", e);
		}
	}

	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarNome(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Usuario> usuarios = new UsuarioService(nome).pesquisaNomeContem();
			String resp = getJson(usuarios);
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por nome");
		}
	}
	
	@GET
	@Path("/tipo/{tipo}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarTipo(@PathParam("tipo") String tipo) throws GlobalException {
		try {
			List<Usuario> usuarios = new UsuarioService(tipo).pesquisaTipoIgual();
			String resp = getJson(usuarios);
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por nome");
		}
	}

	@PUT
	@Consumes("application/*")
	public ResponseBuilder alterar(String usuarioStr) throws GlobalException { 
		try {
			Usuario usuario = new UsuarioFactory(usuarioStr).getUsuario();
			new UsuarioService(usuario).alterar();
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
		new UsuarioService(id).excluir();
		return Response.status(1);
		
		}catch(Throwable e){
			e.printStackTrace();
			throw new Exception("Erro ao deletar usuário");
		}
	}
	
	

}

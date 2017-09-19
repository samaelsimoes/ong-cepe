package br.com.cepe.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.cepe.entity.pojo.endereco.Estado;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.EstadoService;

@Path("/estado")
public class EstadoRest extends ObjMapper {
	@GET
	@Path("/estado/{estado}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarPorEstado(@PathParam("estado") String estado){		
		try {
			
			List<Estado> estados = new EstadoService().pesquisaEstado();

			String resp = getJson(estados);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}

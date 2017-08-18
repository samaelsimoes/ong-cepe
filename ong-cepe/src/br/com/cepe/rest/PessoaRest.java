package br.com.cepe.rest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/Pessoa")
public class PessoaRest {


@POST
@Consumes("application/*")
public void adicionar(String pessoa){
	
} 

@DELETE
@PathParam("id")
public void excluir(@PathParam("id") int id){

}

@GET
@Produces({MediaType.APPLICATION_JSON})
public String pesquisar(String json){
	return "";
}


}

package br.com.cepe.rest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.cepe.factory.ObjMapper;
import br.com.cepe.factory.PessoaFactory;

@Path("/Pessoa")
public class PessoaRest {
public PessoaRest(){
	PessoaFactory pessoaFactory = new PessoaFactory();
}

@POST
@Consumes("application/*")
public void adicionar(String pessoaStr){
	ObjMapper map = new ObjMapper();
	Object pessoa = map.getObject();
	
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

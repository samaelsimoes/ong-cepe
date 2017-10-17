package br.com.cepe.rest;

import java.util.ArrayList;
import java.util.Date;
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

import br.com.cepe.entity.pojo.caixa.Operacao;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.entity.fluxoCaixa.OperacaoFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.FluxoCaixaService;

@Path("/operacao")
public class FluxoCaixaRest extends ObjMapper {

	public FluxoCaixaRest() {
	}

	@POST
	@Consumes("application/*")
	public Response adicionar(String operacaoStr) throws GlobalException {
		try {
			Operacao operacao = new OperacaoFactory(operacaoStr).getOperacao();
					
			if(operacao != null)
				new FluxoCaixaService(operacao).adicionar();
			else
				throw new GlobalException("Revisar os seguintes campo! ");
			return this.buildResponse("Cadastro concluido com sucesso.");
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarClassificacao(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Operacao> operacoes = new FluxoCaixaService(nome).pesquisaClassificacaoContem();
			String resp = getJson(operacoes);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome! ");
		}
	}

	@GET
	@Path("/pessoa/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarPessoaNome(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Operacao> operacoes = new FluxoCaixaService(nome).pesquisaPessoaContem();
			String resp = getJson(operacoes);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome! ");
		}
	}
	
	
	@GET
	@Path("/evento/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarEventoNome(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Operacao> operacoes = new FluxoCaixaService(nome).pesquisaEventoContem();
			String resp = getJson(operacoes);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
 			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome! ");
		}
	}
	
	
	@GET
	@Path("/periodo/{dataInicio}/{dataFim}/{centroCusto}")
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
	public Response pesquisarPeriodo(@PathParam("dataInicio") Date dataInicio, 
			@PathParam("dataFim") Date dataFim, @PathParam("centroCusto") int centroCusto ) throws GlobalException {
		try {
			if(dataInicio!=null && dataFim != null){
				List<Operacao> operacoes = new ArrayList<Operacao>();
				Operacao opIni = new Operacao();
				Operacao opFim = new Operacao();
				opIni.setData(dataInicio);
				opFim.setData(dataFim);
				operacoes.add(opIni);
				operacoes.add(opFim);
				List<Operacao> result = new FluxoCaixaService().pesquisaGenericList(operacoes, centroCusto);
				String resp = getJson(result);
				return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			}
			
			return null;
			
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
			List<Operacao> operacoes = new FluxoCaixaService(tipo).pesquisaTipoIgual();
			String resp = getJson(operacoes);
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
			Operacao operacao = new FluxoCaixaService(id).pesquisaId();
			if(operacao != null)
				resp = getJson(operacao);
			else
				throw new GlobalException("Erro ao buscar operacao por Id! ");
			
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@PUT
	@Consumes("application/*")
	public Response alterar(String operacaoStr) throws GlobalException { 
		try {
			Operacao operacao = new OperacaoFactory(operacaoStr).getOperacao();
			if(operacao != null)
				new FluxoCaixaService(operacao).alterar();
			else
				throw new GlobalException("Valor nulo enviado ao servidor! ");
			
			return this.buildResponse("Operacao editada com sucesso.");
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a alteração da operação");
		}
	}

	@DELETE
	@Path("/idexcluir/{id}")
	public Response excluir(@PathParam("id") int id) throws Exception {
		try{
			new FluxoCaixaService(id).excluir();
			return this.buildResponse("Excluido com sucesso.");
		}catch(Throwable e){
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao deletar operação");
		}
	}
}
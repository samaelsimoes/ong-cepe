package br.com.cepe.service;

import java.util.ArrayList;
import java.util.List;

import br.com.cepe.daoconnect.CidadeDAO;
import br.com.cepe.daoconnect.EventoDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.endereco.Cidade;
import br.com.cepe.entity.pojo.evento.Evento;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.interfaces.Service;

public class EventoService  implements Service<Evento>{	

	protected Evento evento;
	protected String valorStr;
	protected int num;
	
	public EventoService() {
	}

	public EventoService(Evento evento) {
		this.evento = evento;
	}
	

	public EventoService(String valorStr) {
		this.valorStr = valorStr;
	}

	public EventoService(int num) {
		this.num = num;
	}

	public void adicionar()  throws GlobalException {
		evento.setCidade(new CidadeService(this.evento.getCidade()).pesquisaId());
		new EventoDAO(this.evento).persist();
	}

	public void adicionarLista (List<Evento> eventos) throws GlobalException {
		for (Evento evento : eventos) {
			evento.setCidade(new CidadeService(evento.getCidade()).pesquisaId());
			this.evento = evento;
			adicionar();
		}
	}
	
	public Evento pesquisaId()  throws GlobalException {
		return new EventoDAO(this.num).findId();
	}
	
	public List<Evento> pesquisaGeneric (String campo, HOperator operacao, String valor) throws GlobalException {
		return (List<Evento>) new EventoDAO().findGeneric(campo, operacao, valor);
	}

	public List<Evento> pesquisaTipoIgual() throws GlobalException {
		String tipo = Integer.toString(this.num);
		return (List<Evento>) new EventoDAO().findGeneric("tipo", HOperator.EQUALS, tipo);
	}
	
	public List<Evento> pesquisaModalidade() throws GlobalException {
		Integer id = this.num;
		return (List<Evento>) new EventoDAO().findGenericInt("modalidade_id", HOperator.EQUALS, id);
	}
	

	public List<Evento> pesquisaNomeContem() throws GlobalException {
		return (List<Evento>) new EventoDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
	}
	
	public List<Evento> pesquisaCidadeContem() throws GlobalException {
		List<Evento> eventosBusca = null;
		List<Evento> eventos = null;
		List<Cidade> cidades = new CidadeDAO().findGeneric("nome",
				HOperator.CONTAINS, this.valorStr);

		for (Cidade cidade : cidades) {
			String cidadeId = Integer.toString(cidade.getId());
			eventosBusca = new EventoDAO().findGeneric("cidade",
					HOperator.CONTAINS, cidadeId);

			if (!eventosBusca.isEmpty() || eventosBusca != null) {
				eventos = new ArrayList<Evento>();
				for (Evento evento : eventosBusca) {
					if (evento != null)
						eventos.add(evento);
				}
			}

		}
		if (eventos.isEmpty() || eventos == null)
			throw new GlobalException("Não existem eventos para esta cidade");

		return eventos;
	}
	
	public List<Evento> pesquisaDataContem()throws GlobalException{
		return (List<Evento>) new EventoDAO().findGeneric("data", HOperator.CONTAINS, valorStr);
	}

	public void excluir()  throws GlobalException {
		new EventoDAO(this.num).delete();
	}

	
	public void alterar()  throws GlobalException{		
		new EventoDAO(this.evento).update();		
	}

	



}

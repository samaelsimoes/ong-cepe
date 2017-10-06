/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.CentroCustoDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.centroCusto.CentroCusto;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.interfaces.Service;

public class CentroCustoService  implements Service<CentroCusto>{	


	protected CentroCusto centroCusto;
	protected String valorStr;
	protected int num;
	
	
	public CentroCustoService() {
	}

	public CentroCustoService(CentroCusto centroCusto) {
		this.centroCusto = centroCusto;
	}

	public CentroCustoService(String valorStr) {
		this.valorStr = valorStr;
	}

	public CentroCustoService(int num) {
		this.num = num;
	}

	public void adicionar()  throws GlobalException {
		//this.centroCusto.setModalidade(new ModalidadeService(this.centroCusto.getModalidade()).pesquisaId());
		new CentroCustoDAO(this.centroCusto).persist();
	}

	public void adicionarLista (List<CentroCusto> centroCustos) throws GlobalException {
		for (CentroCusto centroCusto : centroCustos) {
			this.centroCusto = centroCusto;
			adicionar();
		}
	}

	public CentroCusto pesquisaId()  throws GlobalException {
		return new CentroCustoDAO(this.num).findId();
	}
	
	public List<CentroCusto> pesquisaGeneric (String campo, HOperator operacao, String valor) throws GlobalException {
		return (List<CentroCusto>) new CentroCustoDAO().findGeneric(campo, operacao, valor);
	}

	public List<CentroCusto> pesquisaTipoIgual() throws GlobalException {
		String tipo = Integer.toString(this.num);
		return (List<CentroCusto>) new CentroCustoDAO().findGeneric("tipo", HOperator.EQUALS, tipo);
	}

	public List<CentroCusto> pesquisaNomeContem() throws GlobalException {
		return (List<CentroCusto>) new CentroCustoDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
	}

	public void excluir()  throws GlobalException {
		new CentroCustoDAO(this.num).delete();
	}

	public void alterar()  throws GlobalException{
		new CentroCustoDAO(this.num).update();
	}

}

/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.daoconnect;

import br.com.cepe.entity.pojo.caixa.Operacao;

public class FluxoCaixaDAO extends OperationsDAO<Operacao>{

	public FluxoCaixaDAO() {
		super();
	}
	
	public FluxoCaixaDAO(int num) {
		this.num = num;
	}
	
	public FluxoCaixaDAO(Operacao operacao){
		this.entity = operacao;
	}
	
}

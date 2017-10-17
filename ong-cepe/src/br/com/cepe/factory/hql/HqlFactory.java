/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.hql;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.exception.GlobalException;

public class HqlFactory{
protected  String select;
protected HOperator operacao;
protected String valor;
protected String entity;


	public HqlFactory()	throws GlobalException {
	}
	
	public String getSelect(String entity, String campo){
		this.entity = entity;
		String select = "SELECT e FROM "+entity+" e WHERE "+campo+" ";
		this.select = select;
		return select;
	}
	
	public String getQuery(String select, HOperator operacao, String valor) throws GlobalException{
		this.select = select;
		this.operacao = operacao;
		this.valor = valor;
		String query = null;
		
		if (!select.equals(null) && operacao != null && !valor.equals(null) && !valor.equals("*"))
			query=this.select+setQuery();		
		else if (valor.equals("*"))
			query= "SELECT e FROM "+entity+" e ";
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	public String getQuery(HOperator operacao, String valor) throws GlobalException{
		this.operacao = operacao;
		this.valor = valor;
		String query = null;
		
		if (!select.equals(null) && operacao != null && !valor.equals(null) && !valor.equals("*"))
			query=this.select+setQuery();		
		else if (valor.equals("*"))
			query= "SELECT e FROM "+entity+" e ";
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	
	public String getRawQuery(HOperator operacao, int num) throws GlobalException{
		this.operacao = operacao;
		String query = null;
		if(num != 0)
			this.valor = Integer.toString(num);
		
		
		if (!select.equals(null) && operacao != null && !valor.equals(null) && !valor.equals("*"))
			query=setQuery();		
		else if (valor.equals("*"))
			query= "SELECT e FROM "+entity+" e ";
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	

	public String getRawQuery(HOperator operacao, String valor) throws GlobalException{
		this.operacao = operacao;
		String query = null;
		this.valor = valor;
		
		if (!select.equals(null) && operacao != null && !valor.equals(null) && !valor.equals("*"))
			query=setQuery();		
		else if (valor.equals("*"))
			query= "SELECT e FROM "+entity+" e ";
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	public String getAnd(String query1, String query2 ){
		if(!query1.equals(null) && !query2.equals(null))
			return this.select+query1+"AND"+query2;
		else return null;
		
	};
	
	public String getQuery(String select, HOperator operacao, int num) throws GlobalException{
		this.select = select;
		this.operacao = operacao;
		String query = null;
		if(num != 0)
			this.valor = Integer.toString(num);
		
		if (!select.equals(null) && operacao != null && valor != null)
			query=select+setQuery();		
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	
	private String setQuery() throws GlobalException{
		String iniPercent = "'%";
		String fimPercent = "%'";
		
		if(this.operacao.equals(HOperator.EQUALS))
			return " = "+this.valor;		
		else if(this.operacao.equals(HOperator.DIFFERENT))
			return " != "+this.valor;
		else if(this.operacao.equals(HOperator.CONTAINS))
			return " LIKE "+iniPercent+this.valor+fimPercent;		
		else if(this.operacao.equals(HOperator.INITS_WITH))
			return " LIKE "+this.valor+fimPercent;		
		else if(this.operacao.equals(HOperator.TERMINATES_WITH))
			return " LIKE "+iniPercent+this.valor;	
		else if(this.operacao.equals(HOperator.MINOR))
			return " < "+this.valor;	
		else if(this.operacao.equals(HOperator.MAJOR))
			return " > "+this.valor;
		return null;
	}
	
	

}

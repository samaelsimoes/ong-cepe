package br.com.cepe.daoconnect;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.hql.HqlFactory;
import br.com.cepe.factory.hql.HqlFactoryList;

public class OperationsDAO<T> extends ConnectionDAO<T>{

	public T entity;
	public int num;
	protected List<Integer> nums = new ArrayList<Integer>();
	protected List<String> campos = new ArrayList<String>();
	protected List<Integer> valores = new ArrayList<Integer>();
	protected List<HOperator> operacoes = new ArrayList<HOperator>();
	protected HqlFactoryList<T> hqlFactoryList;	
	protected List<T> listaT = new ArrayList<T>();
	protected List<String> listaStr = new ArrayList<String>();
	protected HOperator operacao;	
	protected String campo;	
	protected String valor;	
	protected int count = 0;
	protected String select = null;
	protected String queryStr=null;
	protected String queryOp= null;
	protected String queryAnd= null;
	protected Query query = null;
	
	public OperationsDAO(){
		
	}

	
	public OperationsDAO(T entity){
		this.entity = entity;
	}
	
	public OperationsDAO(int num){
		this.num = num;
	}

	public void persist(){
		em.getTransaction().begin();
		em.persist(this.entity);
		em.getTransaction().commit();
	}
	
	public void setFindParams(String campo, HOperator operacao, List<String> listaString){
		this.campos.add(campo);
		this.operacoes.add(operacao);
		this.listaStr = listaString;
	}
		
	public void setFindParams(String campo, HOperator operacao, int num){
		this.campos.add(campo);
		this.operacoes.add(operacao);
		this.valores.add(num);
	}
	
	public void getSelectString()throws GlobalException{
		this.queryOp = this.hqlFactoryList.getRawOperationQuery(this.operacoes.get(count), this.valores.get(count));
		this.select = this.hqlFactoryList.getSelect(getEntityName(), this.campos.get(0))+queryOp;
		this.count++;
	}
	
	public void setAnds() throws GlobalException{
		
	}
	
	public void setQuery(){
		this.queryStr = select+queryOp;
		this.query = super.getQuery(queryStr);
	}
	
	public T findId(){
		Class<T> classe = getEmClass();
		T obj = em.find(classe, this.num);
		return obj;
	}
	
	public void setAnd() throws GlobalException{
		this.queryStr += hqlFactoryList.getAnd(this.campos.get(count),this.operacoes.get(count), this.valores.get(count));
	}
	
		
	public List<T> findGeneric() throws GlobalException{
		@SuppressWarnings("unchecked")
		List<T> list = this.query.getResultList();
		return list;
	}
	
	public List<T> findGeneric(String campo, HOperator operacao, String valor) throws GlobalException{
		HqlFactory hqlFactory = new HqlFactory();		
		this.select = hqlFactory.getSelect(getEntityName(), this.campo);
		this.queryStr = hqlFactory.getQuery(this.select, this.operacao, this.valor);
		this.query = super.getQuery(queryStr);
		@SuppressWarnings("unchecked")
		List<T> list = this.query.getResultList();
		return list;
	}
	
	

	public List<T> findGenericInt(String campo, HOperator operacao, int valor) throws GlobalException{
		HqlFactory hqlFactory = new HqlFactory();		
		String select = hqlFactory.getSelect(getEntityName(), campo);
		String queryStr = hqlFactory.getQuery(select, operacao, valor);
		Query query = super.getQuery(queryStr);		
		@SuppressWarnings("unchecked")
		List<T> list = query.getResultList();
		return list;
	}
	
	public List<T> findGenericBetween() throws GlobalException{
		int contIt = 0;
		getSelectString();
		int listaSize = this.listaStr.size();
		this.queryStr = this.select+" AND "+this.campos.get(this.count)+" BETWEEN ";
		for(String val: this.listaStr){
			this.queryStr+="'"+val+"'";
			contIt++;
			if(contIt < listaSize)
				this.queryStr+=" AND ";
		}
		Query query = super.getQuery(queryStr);
		@SuppressWarnings("unchecked")
		List<T> list = query.getResultList();
		return list;
	}
	
		
	public void update(){
		em.getTransaction().begin();		
		em.merge(this.entity);
		em.getTransaction().commit();
	}
	
	public void delete(){
		Class<T> classe = getEmClass();
		T obj = em.find(classe, this.num);
		em.getTransaction().begin();
		em.remove(obj);
		em.getTransaction().commit();
	}

}

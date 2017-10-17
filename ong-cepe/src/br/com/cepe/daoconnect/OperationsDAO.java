package br.com.cepe.daoconnect;

import java.util.List;

import javax.persistence.Query;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.hql.HqlFactory;
import br.com.cepe.factory.hql.HqlFactoryList;

public class OperationsDAO<T> extends ConnectionDAO<T>{

	public T entity;
	public int num;
	protected List<Integer> nums;
	protected HOperator operacao;
	protected List<HOperator> operacoes;
	protected String campo;
	protected List<String> campos;
	protected String valor;
	protected List<String> valores;
	protected List<T> lista;
	
	
	
	
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
	
	public void setFindParams(String campo, HOperator operacao, List<T> lista){
		this.campos.add(campo);
		this.operacoes.add(operacao);
		this.lista = lista;
	}
		
	public void setFindParams(String campo, HOperator operacao, int num){
		this.campos.add(campo);
		this.operacoes.add(operacao);
		this.nums.add(num);
	}
	
	public T findId(){
		Class<T> classe = getEmClass();
		T obj = em.find(classe, this.num);
		return obj;
	}
	
	public List<T> findGeneric(String campo, HOperator operacao, String valor) throws GlobalException{
		HqlFactory hqlFactory = new HqlFactory();		
		String select = hqlFactory.getSelect(getEntityName(), campo);
		String queryStr = hqlFactory.getQuery(select, operacao, valor);
		Query query = super.getQuery(queryStr);
		@SuppressWarnings("unchecked")
		List<T> list = query.getResultList();
		//disconnect();
		return list;
	}
	
	
	public List<T> findGeneric() throws GlobalException{
		HqlFactoryList<T> hqlFactoryList = new HqlFactoryList<T>();	
		hqlFactoryList.getSelect(getEntityName(), this.campos.get(0));
		String query1 = hqlFactoryList.getRawQuery(this.operacoes.get(0), this.valores.get(0));
		String query2 = hqlFactoryList.getRawQuery(this.operacoes.get(1), this.valores.get(1));
		String queryStr = hqlFactoryList.getAnd(query1, query2);		
		Query query = super.getQuery(queryStr);
		@SuppressWarnings("unchecked")
		List<T> list = query.getResultList();
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

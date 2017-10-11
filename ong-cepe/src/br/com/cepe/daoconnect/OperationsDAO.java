package br.com.cepe.daoconnect;

import java.util.List;

import javax.persistence.Query;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.hql.HqlFactory;

public class OperationsDAO<T> extends ConnectionDAO<T>{

	public T entity;
	public int num;
	
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
	
	
	public List<T> findGenericInt(String campo, HOperator operacao, int valor) throws GlobalException{
		HqlFactory hqlFactory = new HqlFactory();		
		String select = hqlFactory.getSelect(getEntityName(), campo);
		String queryStr = hqlFactory.getQuery(select, operacao, valor);
		Query query = super.getQuery(queryStr);		
		@SuppressWarnings("unchecked")
		List<T> list = query.getResultList();
		//disconnect();
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

package br.com.cepe.daoconnect;

import java.util.List;

import javax.persistence.Query;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.hql.HqlFactory;

public class OperationsDAO<T> extends ConnectionDAO<T> {

	public void persist(T entity){
		em.getTransaction().begin();
		em.persist(entity);
		em.getTransaction().commit();
		em.close();
	}
	
	public T findId(int id){
		@SuppressWarnings("unchecked")
		T obj = (T) getEmClass(id);
		em.getTransaction().commit();
		em.close();
		return obj;
	}
	
	public List<T> findStr(String campo, HOperator operacao, String valor) throws GlobalException{
		HqlFactory hqlFactory = new HqlFactory();		
		String queryStr = hqlFactory.getSelect(getEntityName(), campo);
		queryStr+= hqlFactory.getQuery(queryStr, operacao, valor);
		Query query = super.getQuery(queryStr);
		@SuppressWarnings("unchecked")
		List<T> list = query.getResultList();
		disconnect();
		return list;
	}
	
	public void update(T entity){
		em.getTransaction().begin();
		em.merge(entity);
		em.getTransaction().commit();
		em.close();
	}
	
	public void delete(int id){
		Class<T> classe = getEmClass(id);
		em.getTransaction().begin();
		em.remove(classe);
		em.getTransaction().commit();
		em.close();
	}

}

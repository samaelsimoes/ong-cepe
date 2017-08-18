package br.com.cepe.daoconnect;

import java.lang.reflect.ParameterizedType;

import javax.persistence.EntityManager;

import br.com.cepe.configuration.HConnect;

public abstract class ConnectionDAO<T> extends HConnect{
	private EntityManager em;
	
	public ConnectionDAO(){
		em = getEntityManager();
	}
	
	public String getEntityName(){
		ParameterizedType superclass = (ParameterizedType)getClass().getGenericSuperclass();
		@SuppressWarnings("unchecked")
		Class<T> classe = (Class<T>)superclass.getActualTypeArguments()[0];
		return classe.getSimpleName();
	}
	
	public void persist(T entity){
		em.getTransaction().begin();
		em.persist(entity);
		em.getTransaction().commit();
		em.close();
	}
	
	

}

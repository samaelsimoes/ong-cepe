package br.com.cepe.configuration;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class HConnect {
	private EntityManagerFactory connection;
	
	public EntityManagerFactory connect() {
		try {

			if (connection != null && connection.isOpen())
				return connection;
			else
				connection = Persistence.createEntityManagerFactory("CEPE");

			return connection;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public EntityManager getEntityManager(){
		return connect().createEntityManager();
	}
	
	public Query getQuery(String hql){
		return this.getEntityManager().createQuery(hql);
	}

}

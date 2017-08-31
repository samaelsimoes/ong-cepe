/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.configuration;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class HConnect {
	private EntityManagerFactory connection;
	
	
	
	public EntityManager getEntityManager(){
		return connect().createEntityManager();
	}
	
	public Query getQuery(String hql){
		return this.getEntityManager().createQuery(hql);
	}
	
	public void disconnect(){
		if(connection != null && connection.isOpen())
			connection.close();
	}
	
	public EntityManagerFactory connect() {
		try {

			if (connection != null && connection.isOpen()){
				return connection;
			}else{
				connection = Persistence.createEntityManagerFactory("ongcepe");
			}
			return connection;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	

}

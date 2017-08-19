package br.com.cepe.daoconnect;

import java.util.List;

import javax.persistence.Query;

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
	
	public List<T> findStr(String campo, String operacao, String valor){
		
		String abreVal = " ";
		String fechaVal = " ";
		if(operacao.toLowerCase() == "like"){
			abreVal = "'%";
			fechaVal = "%'";
		}
		String queryStr = "SELECT e FROM "+getEntityName()+" e WHERE "
						+campo+" "+operacao+" "+abreVal+valor+fechaVal;
		Query query = super.getQuery(queryStr);
		@SuppressWarnings("unchecked")
		List<T> list = query.getResultList();
		disconnect();
		return list;
	}
	
	public void delete(int id){
		Class<T> classe = getEmClass(id);
		em.getTransaction().begin();
		em.remove(classe);
		em.getTransaction().commit();
		em.close();
	}

}

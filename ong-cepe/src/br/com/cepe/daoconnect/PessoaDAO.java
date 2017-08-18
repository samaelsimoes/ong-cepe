package br.com.cepe.daoconnect;

import br.com.cepe.dao.GenericEntityDAO;
import br.com.cepe.entity.pojo.Pessoa;

public class PessoaDAO extends ConnectionDAO<Pessoa> implements GenericEntityDAO {

	
	public String getEntityName() {
		return null;
	}

}

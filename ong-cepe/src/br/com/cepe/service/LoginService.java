package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.UsuarioDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.hql.HqlFactoryList;

public class LoginService {
	private List<String> credenciais;
	
	public LoginService(List<String> credenciais){
		this.credenciais = credenciais;
		
	}
	
	
	
	public Usuario validaUsuarioSenha() throws GlobalException {
		HqlFactoryList<Usuario> hqlFactoryList = new HqlFactoryList<Usuario>();
		UsuarioDAO usuarioDAO = new UsuarioDAO(hqlFactoryList);
		usuarioDAO.setFindParams("usuario", HOperator.EQUALS, credenciais.get(0));
		usuarioDAO.setFindParams("senha", HOperator.EQUALS, credenciais.get(1));
		usuarioDAO.setAnd();
		List<Usuario> result = usuarioDAO.findGenericAND();
		Usuario usuario = result.get(0);
		if(!usuario.getSenha().equals(null) && !usuario.getSenha().equals(""))
		 usuario.setSenha("*****");
		else 
		 usuario.setSenha("");
		
		return usuario;
	}	

}

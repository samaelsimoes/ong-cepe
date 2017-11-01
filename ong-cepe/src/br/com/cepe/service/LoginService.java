package br.com.cepe.service;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import br.com.cepe.daoconnect.UsuarioDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.hql.HqlFactoryList;
import br.com.cepe.security.Criptografia;

public class LoginService {
	private List<String> credenciais;
	
	public LoginService(List<String> credenciais){
		this.credenciais = credenciais;
		
	}
	
	
	
	public Usuario validaUsuarioSenha() throws GlobalException, NoSuchAlgorithmException, UnsupportedEncodingException {
		
		Criptografia bases = new Criptografia();
		
		String desconvertido = bases.decode64(credenciais.get(1));
		String hashd5 = Criptografia.criptografar(desconvertido);
		
		HqlFactoryList<Usuario> hqlFactoryList = new HqlFactoryList<Usuario>();
		
		UsuarioDAO usuarioDAO = new UsuarioDAO(hqlFactoryList);
		usuarioDAO.setFindParams("usuario", HOperator.EQUALS, credenciais.get(0));
		usuarioDAO.setFindParams("senha", HOperator.EQUALS, hashd5);
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

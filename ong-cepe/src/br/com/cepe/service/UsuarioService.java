package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.UsuarioDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.interfaces.Service;

public class UsuarioService implements Service<Usuario>{

	
	protected Usuario usuario;
	protected String valorStr;
	protected int num;
	
	public UsuarioService() {
	}

	public UsuarioService(Usuario usuario) {
		this.usuario = usuario;
	}

	public UsuarioService(String valorStr) {
		this.valorStr = valorStr;
	}

	public UsuarioService(int num) {
		this.num = num;
	}

	public void adicionar()  throws GlobalException {
		new UsuarioDAO(this.usuario).persist();
	}

	public void adicionarLista (List<Usuario> usuarios) throws GlobalException {
		for (Usuario usuario : usuarios) {
			this.usuario = usuario;
			adicionar();
		}
	}
	
	public Usuario pesquisaId()  throws GlobalException {
		return new UsuarioDAO(this.num).findId();
	}
	
	public List<Usuario> pesquisaGeneric (String campo, HOperator operacao, String valor) throws GlobalException {
		return (List<Usuario>) new UsuarioDAO().findGeneric(campo, operacao, valor);
	}

	public List<Usuario> pesquisaTipoIgual() throws GlobalException {
//		String tipo = Integer.toString(this.num);
		return (List<Usuario>) new UsuarioDAO().findGeneric("tipo", HOperator.EQUALS, this.valorStr);
	}

	public List<Usuario> pesquisaNomeContem() throws GlobalException {
		return (List<Usuario>) new UsuarioDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
	}
	
	public List<Usuario> pesquisaUsuarioIgual() throws GlobalException {
		return (List<Usuario>) new UsuarioDAO().findGeneric("usuario", HOperator.EQUALS, this.valorStr);
	}	
	
	public void excluir()  throws GlobalException {
		new UsuarioDAO(this.num).delete();
	}

	public void alterar()  throws GlobalException{
		new UsuarioDAO(this.usuario).update();
	}

	@Override
	public List<Usuario> pesquisaGeneric(String campo, HOperator operacao,
			int num) throws GlobalException {
		return null;
	}


	
}

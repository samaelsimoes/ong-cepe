package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.EstadoDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.endereco.Estado;
import br.com.cepe.exception.GlobalException;


public class EstadoService{	

		protected Estado estado;
		protected String valorStr;
		protected int num;
		
		public EstadoService() {
		}

		public EstadoService(Estado estado) {
			this.estado = estado;
		}

		public EstadoService(String valorStr) {
			this.valorStr = valorStr;
		}

		public EstadoService(int num) {
			this.num = num;
		}
		
		public Estado pesquisaId()  throws GlobalException {
			return new EstadoDAO(this.num).findId();
		}

		public List<Estado> pesquisaNomeIgual() throws GlobalException {
			String nome = Integer.toString(this.num);
			return (List<Estado>) new EstadoDAO().findGeneric("nome", HOperator.EQUALS, nome);
		}

		public List<Estado> pesquisaNomeContem() throws GlobalException {
			return (List<Estado>) new EstadoDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
		}


}

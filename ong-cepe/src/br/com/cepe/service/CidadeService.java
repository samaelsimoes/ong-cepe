package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.CidadeDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.endereco.Cidade;
import br.com.cepe.exception.GlobalException;


public class CidadeService{	

		protected Cidade cidade;
		protected String valorStr;
		protected int num;
		
		public CidadeService() {
		}

		public CidadeService(Cidade cidade) {
			this.cidade = cidade;
		}

		public CidadeService(String valorStr) {
			this.valorStr = valorStr;
		}

		public CidadeService(int num) {
			this.num = num;
		}
		
		public Cidade pesquisaId()  throws GlobalException {
			return new CidadeDAO(this.num).findId();
		}
		
		public List<Cidade> pesquisaGeneric (String campo, HOperator operacao, String valor) throws GlobalException {
			return (List<Cidade>) new CidadeDAO().findGeneric(campo, operacao, valor);
		}

		public List<Cidade> pesquisaNomeIgual() throws GlobalException {
			String nome = Integer.toString(this.num);
			return (List<Cidade>) new CidadeDAO().findGeneric("nome", HOperator.EQUALS, nome);
		}

		public List<Cidade> pesquisaNomeContem() throws GlobalException {
			return (List<Cidade>) new CidadeDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
		}


}

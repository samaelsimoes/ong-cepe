package br.com.cepe.entity.pojo.evento;

import javax.persistence.Entity;

@Entity
public class Beneficente extends Evento{

	
	protected long custo;
	protected long arrecadacao;

	public long getCusto() {
		return custo;
	}

	public void setCusto(long custo) {
		this.custo = custo;
	}

	
	public long getArrecadacao() {
		return arrecadacao;
	}

	public void setArrecadacao(long arrecadacao) {
		this.arrecadacao = arrecadacao;
	}
	
	
}

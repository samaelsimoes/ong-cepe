package br.com.cepe.entity.pojo.evento;

import javax.persistence.Entity;

@Entity
public class Viagem extends Evento{
	
	protected long custo;

	public long getCusto() {
		return custo;
	}

	public void setCusto(long custo) {
		this.custo = custo;
	}
	
	

}

package br.com.cepe.entity.pojo.caixa;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.cepe.entity.pojo.centroCusto.CentroCusto;
import br.com.cepe.entity.pojo.evento.Evento;
import br.com.cepe.entity.pojo.pessoa.Pessoa;

@Entity
public class Operacao {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private Date data;
	private float valor;	
	private int classificacao;
	@ManyToOne
	private CentroCusto centroCusto;
	@ManyToOne
	private Pessoa pessoa;
	@ManyToOne
	private Evento evento;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	public float getValor() {
		return valor;
	}
	public void setValor(float valor) {
		this.valor = valor;
	}
	public int getClassificacao() {
		return classificacao;
	}
	public void setClassificacao(int classificacao) {
		this.classificacao = classificacao;
	}
	public CentroCusto getCentroCusto() {
		return centroCusto;
	}
	public void setCentroCusto(CentroCusto centroCusto) {
		this.centroCusto = centroCusto;
	}
	public Pessoa getPessoa() {
		return pessoa;
	}
	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}
	public Evento getEvento() {
		return evento;
	}
	public void setEvento(Evento evento) {
		this.evento = evento;
	}
	
	

}

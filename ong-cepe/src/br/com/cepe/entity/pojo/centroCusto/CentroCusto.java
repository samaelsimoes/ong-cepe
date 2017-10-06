package br.com.cepe.entity.pojo.centroCusto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import br.com.cepe.entity.pojo.modalidade.Modalidade;

@Entity
public class CentroCusto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nome;
	private String descricao;
	@OneToOne
	private Modalidade modalidade;
	//@OneToMany(mappedBy = "centroCusto", targetEntity=Modalidade.class, cascade=CascadeType.ALL)
	//private List<Modalidade> modalidades;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Modalidade getModalidade() {
		return modalidade;
	}
	
	public void setModalidade(Modalidade modalidade) {
			this.modalidade = modalidade;
	}	
	
	
	
	/*
	public List<Modalidade> getModalidade() {
		return modalidades;
	}
	
	public void setModalidade(List<Modalidade> modalidades) {
		for(Modalidade modalidade : modalidades){
			this.modalidades.add(modalidade);
		}
	}
		
	
	*/
	
	

}

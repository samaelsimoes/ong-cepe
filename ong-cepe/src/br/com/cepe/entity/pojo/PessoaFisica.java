/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.entity.pojo;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class PessoaFisica extends Pessoa {

	private Long rg;
	private Long cpf;
	@Temporal(TemporalType.DATE)
	private Date nascimento;

	public Long getRg() {
		return rg;
	}

	public void setRg(Long rg) {
		this.rg = rg;
	}

	public Long getCpf() {
		return cpf;
	}

	public void setCpf(Long cpf) {
		this.cpf = cpf;
	}

	public Date getNascimento() {
		return nascimento;
	}

	public void setNascimento(Date nascimento) {
		this.nascimento = nascimento;

	}

}

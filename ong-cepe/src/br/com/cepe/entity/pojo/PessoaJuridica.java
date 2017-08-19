/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.entity.pojo;

public class PessoaJuridica extends Pessoa {

	private Long cnpj;
	private String responsavel;

	public Long getCnpj() {
		return cnpj;
	}

	public void setCnpj(Long cnpj) {
		this.cnpj = cnpj;
	}

	public String getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}

}

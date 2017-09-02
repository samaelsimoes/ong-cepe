/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.entity.pessoa;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.node.ObjectNode;

import br.com.cepe.datatype.PessoaType;
import br.com.cepe.entity.pojo.pessoa.Atleta;
import br.com.cepe.entity.pojo.pessoa.Beneficiario;
import br.com.cepe.entity.pojo.pessoa.DoadorPf;
import br.com.cepe.entity.pojo.pessoa.DoadorPj;
import br.com.cepe.entity.pojo.pessoa.Patrocinador;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.entity.pojo.pessoa.PessoaFisica;
import br.com.cepe.entity.pojo.pessoa.PessoaJuridica;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.util.ObjMapper;

public class PessoaFactory extends ObjMapper {
	private List<Pessoa> pessoas = new ArrayList<Pessoa>();

	/**
	 * Retorna objeto Pessoa de acordo com o tipo passado por parametro, podendo
	 * ser pessoa física ou jurídica
	 * 
	 * @param tipo
	 * @return Pessoa
	 */

	public PessoaFactory() {

	}

	public PessoaFactory(String pessoaStr) throws GlobalException {
		ObjectNode objNode;
		try {
			objNode = getObject().readValue(pessoaStr, ObjectNode.class);

			Integer tipo = objNode.get("tipo").asInt();
			Class<?> classe = null;

<<<<<<< HEAD
			if (tipo != null) {
				//PF TIPE = 0
				if (tipo.equals(PessoaType.PF.getIndex())) {

					classe = PessoaFisica.class;
				}
				//PJ TIPE == 1
				if (tipo.equals(PessoaType.PJ.getIndex())) {
					
					classe = PessoaJuridica.class;
				}
				//PF TIPE = 2
				if (tipo.equals(PessoaType.DOADOR_PF.getIndex())) {
					
					classe = DoadorPf.class;
				}
				//PJ  TIPE == 3
				if (tipo.equals(PessoaType.DOADOR_PJ.getIndex())) {
					
=======
			if (tipo != 0 && tipo != null) {

				if (tipo.equals(PessoaType.PF.getIndex()))
					classe = PessoaFisica.class;

				if (tipo.equals(PessoaType.PJ.getIndex()))
					classe = PessoaJuridica.class;

				if (tipo.equals(PessoaType.BENEFIC.getIndex()))
					classe = Beneficiario.class;

				if (tipo.equals(PessoaType.DOADOR_PF.getIndex()))
					classe = DoadorPf.class;

				if (tipo.equals(PessoaType.DOADOR_PJ.getIndex()))
>>>>>>> e0ac1fd0fd98d087041d87eaaa1322714dcc285f
					classe = DoadorPj.class;

<<<<<<< HEAD
				if (tipo.equals(PessoaType.ATLETA.getIndex())) {
					
					classe = PessoaType.class;
				}

				if (tipo.equals(PessoaType.PATROCIN.getIndex())) {
					
					classe = Patrocinador.class;
				}
				//PJ TIPE = 5
				if (tipo.equals(PessoaType.BENEFIC.getIndex())) {
					
					classe = Beneficiario.class;
				}
=======
				if (tipo.equals(PessoaType.ATLETA.getIndex()))
					classe = Atleta.class;

				if (tipo.equals(PessoaType.PATROCIN.getIndex()))
					classe = Patrocinador.class;
				

>>>>>>> e0ac1fd0fd98d087041d87eaaa1322714dcc285f
				if (classe != null) {
					
					Pessoa obj = (Pessoa) getObject().readValue(pessoaStr, classe);
					this.pessoas.add(obj);
				} else {

					throw new GlobalException(
					"Erro de factory na classe Pessoa");
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public List<Pessoa> getPessoasLista() {
		return pessoas;
	}

	public void setPessoas(List<Pessoa> pessoas) {
		this.pessoas = pessoas;
	}

	public Pessoa getPessoa() {
		return pessoas.get(0);
	}

}

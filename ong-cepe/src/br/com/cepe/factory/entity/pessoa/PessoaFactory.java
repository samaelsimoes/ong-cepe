package br.com.cepe.factory.entity.pessoa;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.codehaus.jackson.node.ObjectNode;

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
<<<<<<< HEAD

	/**
	 * Retorna objeto Pessoa de acordo com o tipo passado por parametro, podendo
	 * ser pessoa física ou jurídica
	 * 
	 * @param tipo
	 * @return Pessoa
	 */

	public PessoaFactory() {

=======
	private Class<?> pessoaClasse;
	private ObjectNode objNode;
	
	static final HashMap<Integer, Class<?>> PESSOA_CLASSES =  new HashMap<Integer, Class<?>>();
	static{
		PESSOA_CLASSES.put(0, null);
		PESSOA_CLASSES.put(1, PessoaFisica.class);
		PESSOA_CLASSES.put(2, PessoaJuridica.class);
		PESSOA_CLASSES.put(3, DoadorPf.class);
		PESSOA_CLASSES.put(4, DoadorPj.class);
		PESSOA_CLASSES.put(5, Patrocinador.class);
		PESSOA_CLASSES.put(6, Beneficiario.class);
		PESSOA_CLASSES.put(7, Atleta.class);
>>>>>>> a8157f5e48da82cffed964c4e8fd53f9e49e8146
	}
	

	public PessoaFactory(String pessoaStr) throws GlobalException {

		int tipo = 0;
		try {
			
			objNode = getObject().readValue(pessoaStr, ObjectNode.class);
<<<<<<< HEAD
			
=======

>>>>>>> a8157f5e48da82cffed964c4e8fd53f9e49e8146
			if (objNode != null)
				tipo = objNode.get("tipo").asInt();
			else
				throw new GlobalException(
						"Falha ao receber o atributo tipo de Pessoa");

			if (tipo != 0) {
<<<<<<< HEAD
				
				//type = 1 
				if (tipo == PessoaType.PF.getIndex())
					classe = PessoaFisica.class;
				
				//type = 2
				if (tipo == PessoaType.PJ.getIndex())
					classe = PessoaJuridica.class;
				
				//type = 3
				if (tipo == PessoaType.DOADOR_PF.getIndex())
					classe = DoadorPf.class;
				
				//type = 4
				if (tipo == PessoaType.DOADOR_PJ.getIndex())
					classe = DoadorPj.class;
				
				// type = 5
				//if (tipo == PessoaType.PATROCIN.getIndex())

				else if (tipo == PessoaType.PJ.getIndex())
					classe = PessoaJuridica.class;

				else if (tipo == PessoaType.BENEFIC.getIndex())
					classe = Beneficiario.class;

				else if (tipo == PessoaType.DOADOR_PF.getIndex())
					classe = DoadorPf.class;

				else if (tipo == PessoaType.DOADOR_PJ.getIndex())
					classe = DoadorPj.class;

				else if (tipo == PessoaType.ATLETA.getIndex())
					classe = Atleta.class;

				else if (tipo == PessoaType.PATROCIN.getIndex())
					classe = Patrocinador.class;
				
				//type = 6
				if (tipo == PessoaType.BENEFIC.getIndex())
					classe = Beneficiario.class;
				
				// type 7
				if (tipo == PessoaType.ATLETA.getIndex())
					classe = Atleta.class;
				
				if (classe != null) {
					Pessoa obj = (Pessoa) getObject().readValue(pessoaStr, classe);
=======
				this.pessoaClasse = PESSOA_CLASSES.get(tipo);

				if (this.pessoaClasse != null) {
					Pessoa obj = (Pessoa) getObject().readValue(pessoaStr,
							this.pessoaClasse);
>>>>>>> a8157f5e48da82cffed964c4e8fd53f9e49e8146
					this.pessoas.add(obj);
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
			throw new GlobalException("Erro de factory na classe Pessoa");
		}
	}


	public PessoaFactory(int tipo){
		this.pessoaClasse = PESSOA_CLASSES.get(tipo);
	}
	
	public List<Pessoa> getLista() {
		return pessoas;
	}

	public void setPessoas(List<Pessoa> pessoas) {
		this.pessoas = pessoas;
	}

	public Pessoa getPessoa() {
		return pessoas.get(0);
	}
	
	
	public Class<?> getClasse(){
		return this.pessoaClasse;
	}
	

}
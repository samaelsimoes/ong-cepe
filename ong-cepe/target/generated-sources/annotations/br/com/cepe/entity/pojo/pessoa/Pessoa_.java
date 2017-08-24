package br.com.cepe.entity.pojo.pessoa;

import br.com.cepe.datatype.PessoaType;
import br.com.cepe.datatype.Status;
import br.com.cepe.entity.pojo.endereco.Cidade;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Pessoa.class)
public abstract class Pessoa_ {

	public static volatile SingularAttribute<Pessoa, PessoaType> tipo;
	public static volatile SingularAttribute<Pessoa, Cidade> cidade;
	public static volatile SingularAttribute<Pessoa, Integer> numero;
	public static volatile SingularAttribute<Pessoa, Long> foneMovel;
	public static volatile SingularAttribute<Pessoa, String> bairro;
	public static volatile SingularAttribute<Pessoa, String> nome;
	public static volatile SingularAttribute<Pessoa, Long> foneFixo;
	public static volatile SingularAttribute<Pessoa, Long> cep;
	public static volatile SingularAttribute<Pessoa, String> complemento;
	public static volatile SingularAttribute<Pessoa, Integer> id;
	public static volatile SingularAttribute<Pessoa, String> email;
	public static volatile SingularAttribute<Pessoa, Status> status;
	public static volatile SingularAttribute<Pessoa, String> rua;

}


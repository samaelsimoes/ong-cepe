/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.entity.pojo.pessoa;

import javax.persistence.DiscriminatorValue;

@DiscriminatorValue(value = "3")
public class Beneficiario extends PessoaFisica{

}

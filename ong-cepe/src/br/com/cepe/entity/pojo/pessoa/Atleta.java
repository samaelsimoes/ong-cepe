/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.entity.pojo.pessoa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = "7")
public class Atleta extends Beneficiario{

}

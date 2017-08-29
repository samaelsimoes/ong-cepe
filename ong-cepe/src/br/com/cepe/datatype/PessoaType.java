/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.datatype;

public enum PessoaType implements DataType{
	PF(0), PJ(1), DOADOR_PF(2), DOADOR_PJ(3), PATROCIN(4), BENEFIC(5), ATLETA(6);
	
	public int index;
	PessoaType(int index){
		this.index = index;
	}
	@Override
	public int getIndex() {

		return this.index;
	}
}

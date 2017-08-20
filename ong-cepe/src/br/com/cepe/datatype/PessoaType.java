/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.datatype;

public enum PessoaType implements DataType{
	PF(0), PJ(1);
	
	public int index;
	PessoaType(int index){
		this.index = index;
	}
	@Override
	public int getIndex() {

		return this.index;
	}
}

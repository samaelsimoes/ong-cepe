/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.datatype;

public enum PessoaTipo implements DataType{
	PF(0), PJ(1);
	
	public int index;
	PessoaTipo(int index){
		this.index = index;
	}
	@Override
	public int getIndex() {

		return this.index;
	}
}

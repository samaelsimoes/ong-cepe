/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.datatype;

public enum Tipo implements DataTypes{
	PF(0), PJ(1);
	
	public int index;
	Tipo(int index){
		this.index = index;
	}
	@Override
	public int getIndex() {

		return this.index;
	}
}

/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.datatypes;



public enum Status implements DataTypes{
	INATIVO(0), ATIVO(1);

		public int index;
		Status(int index){
			this.index = index;
		}
	
		public int getIndex() {
			return this.index;
		}


}

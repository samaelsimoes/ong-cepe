/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.datatype;

public enum PessoaType implements DataType{
<<<<<<< HEAD
	PF(1), PJ(2), DOADOR_PF(3), DOADOR_PJ(4), PATROCIN(5), BENEFIC(6), ATLETA(7);
=======
	NULO(0), PF(1), PJ(2), DOADOR_PF(3), DOADOR_PJ(4), PATROCIN(5), BENEFIC(6), ATLETA(7);
>>>>>>> e0ac1fd0fd98d087041d87eaaa1322714dcc285f
	
	public int index;
	PessoaType(int index){
		this.index = index;
	}
	@Override
	public int getIndex() {

		return this.index;
	}
}

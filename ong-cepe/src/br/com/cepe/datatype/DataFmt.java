package br.com.cepe.datatype;

public enum DataFmt implements DataTypes{
	DT_BR(0), DT_EUA(1), DTHR_BR(2), DTHR_EUA(3);
	public int index;

	DataFmt(int index){
		this.index = index;
	}
	
	public int getIndex(){
		return this.index;
	}

}

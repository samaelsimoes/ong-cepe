package br.com.cepe.datatypes;

public enum Tipo {
	PF(0), PJ(1);
	
	int index;
	Tipo(int index){
		this.index = index;
	}
}

package br.com.cepe.decode64;

import java.util.Arrays;
import org.apache.tomcat.util.codec.binary.Base64; //rever 

public class decode64 {
	public String decode64(String senha){
		
	  byte[] byteArray = Base64.decodeBase64(senha.getBytes());
		
	  Arrays.toString(senha.getBytes());
	  String decodedString = new String(byteArray);
	  
	  return decodedString;
	}
}

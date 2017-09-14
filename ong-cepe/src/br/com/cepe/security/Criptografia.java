package br.com.cepe.security;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

public class Criptografia {

	public static String criptografar(String pwd) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		
		String crip = "";
		
	    MessageDigest m = MessageDigest.getInstance("SHA-256");
	    m.update(pwd.getBytes("UTF-8"),0,pwd.length());
	    crip = new BigInteger(1,m.digest()).toString(64);
	    
	    return crip;
	}	
	
	
	public String decode64(String senha){
		
		  String byteArray = decode64(senha);
			
		  Arrays.toString(senha.getBytes());
		  String decodedString = new String(byteArray);
		  
		  return decodedString;
		}

}

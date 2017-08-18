package br.com.cepe.factory;

import java.io.StringWriter;
import java.text.SimpleDateFormat;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.cepe.datatype.DataFmt;

public class ObjMapper{
private ObjectMapper objMapper;
private DateFactory dateFactory;

	public ObjMapper(){
		objMapper = new ObjectMapper();
		dateFactory = new DateFactory();
	}
	
	public ObjectMapper getObject(){		
		objMapper.setDateFormat(new SimpleDateFormat());				
		return objMapper;				
	}
	
	
	public StringWriter getJson(Object obj) throws Exception{
		StringWriter jsonObj = new StringWriter();
		try{
			
			objMapper.setDateFormat(new SimpleDateFormat(dateFactory.getFmt(DataFmt.DTHR_BR)));	
			objMapper.writeValue(jsonObj, obj);			
			return jsonObj;
			
		}catch(Exception e){
			e.printStackTrace();
			throw new Exception("Falha ao fazer a conversão do objeto para Json");
		}
		
	}
	
	
	
}

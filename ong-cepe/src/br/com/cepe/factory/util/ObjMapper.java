/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.util;

import java.io.StringWriter;
import java.text.SimpleDateFormat;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.cepe.datatype.DataFmt;
import br.com.cepe.factory.date.DateFactory;

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
	
	
	public String getJson(Object obj) throws Exception{
		StringWriter jsonObj = new StringWriter();
		try{
			objMapper.setDateFormat(new SimpleDateFormat(dateFactory.getFmt(DataFmt.DT_HR_BR)));	
			objMapper.writeValue(jsonObj, obj);			
			return jsonObj.toString();
			
		}catch(Exception e){
			e.printStackTrace();
			throw new Exception("Falha ao fazer a conversão do objeto para Json");
		}
		
	}
	
	
	
}

/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.util;

import java.io.StringWriter;
import java.text.SimpleDateFormat;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
	
	
//ini Guilherme
	public Response buildResponse(Object objeto){
		StringWriter fw = new StringWriter();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
//			objectMapper.setDateFormat(DateFormat.getDateTimeInstance()); //Utilizado para exibir as datas no padrão BR quando retorna do banco
			objectMapper.writeValue(fw, objeto);
			return Response.ok(fw.toString()).build();
		} catch (Exception e) {
			e.printStackTrace();
			return buildErrorResponse(e.getMessage());
		}
	}

	public Response buildErrorResponse(String message) {
		return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
				.entity(message)
				.type(MediaType.TEXT_PLAIN)
				.build();
	}
	
//fim Guilherme
	
	
}

package br.com.cepe.servlet;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.service.LoginService;

public class LoginServlet extends HttpServlet {
	
	private static final long serialVersionUID=1L;
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try{		
			
			String url = request.getContextPath();
			if(request.getParameter("acao").equals("login")){
				List<String> credUser = new ArrayList<String>();
				
				credUser.add( request.getParameter("login") );
				credUser.add( request.getParameter("passwordhidden") );
				
				Usuario usuario = new LoginService(credUser).validaUsuarioSenha();
				
				//terminar
			}
		}catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{		
		process(request, response);
	}
}

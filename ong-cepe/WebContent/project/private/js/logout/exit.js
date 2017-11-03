ONG.logout = new Object();
ONG.saindo = {};

$(document).ready(function(){
	
	ONG.logout.saindo = function() {
	
		$.ajax({	
            type:"POST",				
            url: ONG.contextPath + "/LogoutServlet",  
            
            success: function(msg){
            	console.log(msg);
            },
            
            error: function(err){
        		console.log(err);
            	bootbox.alert("Login Invalido ! " );
            }
    	});	
	}
});

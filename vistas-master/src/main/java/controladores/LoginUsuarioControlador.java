package controladores;


import java.io.IOException;

import Servicios.AutentificacionServicio;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@WebServlet("/login")
public class LoginUsuarioControlador extends HttpServlet {

		
	AutentificacionServicio servicio;
	
    @Override
    public void init() throws ServletException {
        this.servicio = new AutentificacionServicio();
    }
	
    
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Recoger los parámetros del formulario
        String correo = request.getParameter("correoUsuario");
        String password = request.getParameter("passwordUsuario");

        // Llamar al servicio para verificar el usuario
        boolean isValidUser = servicio.verificarUsuario(correo, password);

        if (isValidUser) {
            // Redirigir a la página de éxito (por ejemplo, panel-administrador.html)
            response.sendRedirect("index.jsp");
        } else {
            // Enviar un mensaje de error
            request.setAttribute("errorMessage", "Usuario o contraseña incorrectos.");
            request.getRequestDispatcher("index.jsp").forward(request, response); // Redirigir de vuelta al formulario
        }
    }
	
	
}

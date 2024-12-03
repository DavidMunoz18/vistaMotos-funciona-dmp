package Servicios;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONObject;
 // Asegúrate de importar ObjectMapper

import com.fasterxml.jackson.databind.ObjectMapper;

import Dtos.UsuarioDtos;

public class AutentificacionServicio {

    public boolean verificarUsuario(String correo, String password) {
        boolean todoOk = false;

        try {
            // Crear la URL de la API para la verificación del usuario
            URL url = new URL("http://localhost:8081/api/login/validarUsuario");
            HttpURLConnection conexion = (HttpURLConnection) url.openConnection();
            conexion.setRequestMethod("POST");
            conexion.setRequestProperty("Content-Type", "application/json");
            conexion.setDoOutput(true);

            // Crear el objeto que contiene la información para el login
            UsuarioDtos loginRequest = new UsuarioDtos();
            loginRequest.setEmail(correo);

            // Convertir el objeto loginRequest a JSON utilizando ObjectMapper
            ObjectMapper mapper = new ObjectMapper();
            String jsonInput = mapper.writeValueAsString(loginRequest);  // Convertir a JSON

            // Enviar la solicitud al servidor
            try (OutputStream ot = conexion.getOutputStream()) {
                ot.write(jsonInput.getBytes());
                ot.flush();
            }

            // Obtener el código de respuesta
            int responseCode = conexion.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 200 OK
                // Leer la respuesta del servidor
                BufferedReader in = new BufferedReader(new InputStreamReader(conexion.getInputStream()));
                StringBuilder response = new StringBuilder();
                String inputLine;

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
                
                // La respuesta será el usuario completo en formato JSON
                String respuesta = response.toString();
                System.out.println("Respuesta del servidor: " + respuesta);  // Imprimir para depuración

                // Deserializar la respuesta JSON a un objeto UsuarioDtos
                JSONObject jsonResponse = new JSONObject(respuesta);
                UsuarioDtos usuario = new UsuarioDtos();
                usuario.setId(jsonResponse.getLong("id"));
                usuario.setEmail(jsonResponse.getString("email"));
                usuario.setPassword(jsonResponse.getString("password"));
                usuario.setRol(jsonResponse.getString("rol"));

                // Verificamos que el usuario no sea null y luego verificamos la contraseña
                if (usuario != null) {
                    // Comprobamos si el password recibido es el mismo que el del usuario obtenido de la API
                    if (usuario.getPassword().equals(password)) {
                        System.out.println("Usuario y contraseña verificados correctamente: " + usuario.getEmail());
                        todoOk = true;  // Usuario verificado correctamente
                    } else {
                        System.out.println("Contraseña incorrecta.");
                    }
                } else {
                    System.out.println("Error: Usuario no encontrado.");
                }
            } else {
                System.out.println("Error: Código de respuesta no OK. Código: " + responseCode);
            }

        } catch (Exception e) {
            System.out.println("ERROR: " + e);
        }
        
        return todoOk;
    }
}

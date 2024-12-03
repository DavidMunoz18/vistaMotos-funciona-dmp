///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Funcion para el login de usuarios
$('#loginUserForm').submit(function(event) {
	event.preventDefault(); // Evita el envío tradicional del formulario

	var email = $('#email').val();
	var password = $('#password').val();

	// Crear el DTO que se enviará
	var loginDto = {
		email: email,
		password: password
	};

	// Hacemos la solicitud AJAX a la API del servlet
	$.ajax({
		url: 'http://localhost:8081/api/login/validarUsuario', // URL de la API
		type: 'POST',
		contentType: 'application/json', // Enviamos datos como JSON
		data: JSON.stringify(loginDto), // Pasamos el DTO como JSON
		success: function(response) {
			// Aquí verificamos el valor de la respuesta
			if (response === 'admin') {
				window.location.href = '/vistaMotos/administrador.jsp'; // Redirige al admin
			} else if (response === 'usuario') {
				window.location.href = '/vistaMotos/index.jsp'; // Redirige al usuario
			} else {
				alert('Usuario o contraseña incorrectos.');
			}
		},
		error: function(xhr, status, error) {
			alert('Error al intentar iniciar sesión: ' + error);
		}
	});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Funcion para el login de clubs
$('#loginClubForm').submit(function(event) {
	event.preventDefault(); // Evita el envío tradicional del formulario

	var email = $('#email').val();
	var password = $('#password').val();

	// Crear el DTO que se enviará
	var loginDto = {
		email: email,
		password: password
	};

	// Hacemos la solicitud AJAX a la API del servlet
	$.ajax({
		url: 'http://localhost:8081/api/login/validarClub', // URL de la API
		type: 'POST',
		contentType: 'application/json', // Enviamos datos como JSON
		data: JSON.stringify(loginDto), // Pasamos el DTO como JSON
		success: function(response) {
			// Aquí verificamos el valor de la respuesta
			if (response === 'club') {
				window.location.href = '/vistaMotos/index.jsp'; // Redirige al usuario
			} else {
				alert('Usuario o contraseña incorrectos.');
			}
		},
		error: function(xhr, status, error) {
			alert('Error al intentar iniciar sesión: ' + error);
		}
	});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Funcion para el registro del usuario
$('#registerUserForm').submit(function (event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Obtener valores del formulario
    var nicknameUsuario = $('#nicknameUsuario').val();
    var nombreUsuario = $('#nombreUsuario').val();
    var dniUsuario = $('#dniUsuario').val();
    var telefonoUsuario = $('#telefonoUsuario').val();
    var emailUsuario = $('#emailUsuario').val();
    var passwordUsuario = $('#passwordUsuario').val();
    var confirmPasswordUsuario = $('#confirmPasswordUsuario').val();

    // Validar que las contraseñas coincidan
    if (passwordUsuario !== confirmPasswordUsuario) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Validar que todos los campos estén completos
    if (!nicknameUsuario || !nombreUsuario || !dniUsuario || !telefonoUsuario || !emailUsuario || !passwordUsuario) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    // Crear el DTO
    var registroDto = {
        nicknameUsuario: nicknameUsuario,
        nombreUsuario: nombreUsuario,
        dniUsuario: dniUsuario,
        telefonoUsuario: telefonoUsuario,
        emailUsuario: emailUsuario,
        passwordUsuario: passwordUsuario
    };

    // Enviar la solicitud AJAX
    $.ajax({
        url: 'http://localhost:8081/api/registro/usuario', // Endpoint correcto
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(registroDto),
        success: function (response) {
            alert(response.mensaje || 'Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = '/vistaMotos/iniciarSesionUsuario.jsp'; // Redirige al login
        },
        error: function (xhr, status, error) {
            alert('Error al intentar registrar: ' + error + '. Código de estado: ' + xhr.status);
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Funcion para el registro del club
// Función para el registro del club
$('#registerClubForm').submit(function (event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Obtener valores del formulario
    var nombreClub = $('#nombreClub').val();
    var sedeClub = $('#sedeClub').val();
    var emailClub = $('#emailClub').val();
    var passwordClub = $('#passwordClub').val();
    var confirmPasswordClub = $('#confirmPasswordClub').val();

    // Validar que las contraseñas coincidan
    if (passwordClub !== confirmPasswordClub) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Validar que todos los campos estén completos
    if (!nombreClub || !sedeClub || !emailClub || !passwordClub) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    // Crear el DTO
    var registroDto = {
        nombreClub: nombreClub,
        sedeClub: sedeClub,
        emailClub: emailClub,
        passwordClub: passwordClub
    };

    // Enviar la solicitud AJAX
    $.ajax({
        url: 'http://localhost:8081/api/registro/club', // Endpoint correcto
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(registroDto),
        success: function (response) {
            alert(response.mensaje || 'Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = '/vistaMotos/iniciarSesionClub.jsp'; // Redirige al login
        },
        error: function (xhr, status, error) {
            console.error('Error al intentar registrar: ', error);
            alert('Error al intentar registrar. Código de estado: ' + xhr.status);
        }
    });
});






















// Función para REGISTRAR UN USUARIO MEDIANTE AJAX con validación de campos y duplicados
$(document).ready(function() {
	// Maneja el evento submit del formulario
	$('#registerUserForm').on('submit', function(event) {
		event.preventDefault();  // Previene el envío tradicional del formulario
		registerUser();  // Llama a la función de registro
	});
});

// Función para registrar un usuario mediante AJAX
// Función para registrar un usuario mediante AJAX
function registerUser() {
	const username = $('#registerUsername').val().trim();
	const email = $('#registerEmail').val().trim();
	const password = $('#registerPassword').val().trim();
	const confirmPassword = $('#registerConfirmPassword').val().trim();

	// Validación de campos vacíos
	if (!username || !email || !password || !confirmPassword) {
		$('#result').text('Por favor, complete todos los campos.');
		return;
	}

	// Verificar coincidencia de contraseñas
	if (password !== confirmPassword) {
		$('#result').text('Las contraseñas no coinciden.').css('color', 'red');
		return;
	}

	// Comprobar usuario y correo electrónico duplicados
	$.ajax({
		url: 'http://localhost:3000/users',
		type: 'GET',
		success: function(users) {
			const userExists = users.some(u => u.username === username || u.email === email);

			if (userExists) {
				$('#result').text('El nombre de usuario o correo electrónico ya están registrados. Por favor, elija otros.').css('color', 'red');
			} else {
				// Registrar nuevo usuario si no hay duplicados
				$.ajax({
					url: 'http://localhost:3000/users',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify({ username, email, password }),
					success: function(response) {
						$('#result').text('Usuario registrado exitosamente. ID: ' + response.id).css('color', 'green');
						$('#registerForm')[0].reset();
					},
					error: function(error) {
						$('#result').text('Error al registrar el usuario.').css('color', 'red');
					}
				});
			}
		},
		error: function(error) {
			$('#result').text('Error al verificar el usuario.').css('color', 'red');
		}
	});
}


$(document).ready(function() {
	// Asignar evento de submit para el formulario de inicio de sesión
	$('#loginForm').on('submit', function(event) {
		event.preventDefault(); // Previene el envío del formulario
		loginUser(); // Llama a la función de inicio de sesión
	});
});

//////////////////////////////////////////////////////////////////////////////////////////////

// Función para eliminar un usuario con confirmación
function deleteUser() {
	const identifier = $('#deleteUsername').val().trim();
	const password = $('#deletePassword').val().trim();

	if (!identifier || !password) {
		$('#result').text('Por favor, complete todos los campos.');
		return;
	}

	$.ajax({
		url: 'http://localhost:3000/users',
		type: 'GET',
		success: function(users) {
			// Busca el usuario que coincida con el nombre de usuario/correo y la contraseña
			const user = users.find(u => (u.username === identifier || u.email === identifier) && u.password === password);

			if (user) {
				// Mostrar un mensaje de confirmación con prompt
				const confirmation = prompt(`Para confirmar la baja, escriba: ${user.username}BORRAME`);

				// Verificar que el usuario haya ingresado correctamente la confirmación
				if (confirmation === `${user.username}BORRAME`) {
					// Si se confirma, realizar la eliminación del usuario
					$.ajax({
						url: `http://localhost:3000/users/${user.id}`,
						type: 'DELETE',
						success: function() {
							$('#result').text('Usuario eliminado exitosamente.').css('color', 'green');
							$('#deleteForm')[0].reset();
						},
						error: function(error) {
							console.error('Error al eliminar el usuario:', error);
							$('#result').text('Error al eliminar el usuario.');
						}
					});
				} else {
					$('#result').text('Confirmación incorrecta. La eliminación fue cancelada.');
				}
			} else {
				$('#result').text('Nombre de usuario/correo o contraseña incorrectos.');
			}
		},
		error: function(error) {
			console.error('Error al intentar eliminar el usuario:', error);
			$('#result').text('Error al intentar eliminar el usuario.');
		}
	});

}


// Elementos de los formularios
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");

// Función para manejar el login
async function loginUser(email, password) {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: email,
                password: password
            }),
            credentials: "include", // Esto asegura que las cookies se envíen con la solicitud
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login exitoso");
            // Aquí puedes cambiar la UI dependiendo de la autenticación, por ejemplo:
            document.getElementById("login-button").style.display = "none"; // Ocultar botón de login
            document.getElementById("register-button").style.display = "block"; // Mostrar botón de registro
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        alert("Error al hacer login");
        console.error(error);
    }
}

// Función para manejar el registro (si se necesita)
async function registerUser(name, password) {
    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                password: password
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registro exitoso");
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        alert("Error al registrar");
        console.error(error);
    }
}

// Escucha el submit del formulario de login
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevenir comportamiento por defecto

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Llamar a la función para iniciar sesión
    loginUser(email, password);
});

// Escucha el submit del formulario de registro
registerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevenir comportamiento por defecto

    const name = document.getElementById("register-name").value;
    const password = document.getElementById("register-password").value;

    // Llamar a la función para registrar
    registerUser(name, password);
});

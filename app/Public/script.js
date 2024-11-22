const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector('.sign-in button');
    const registerButton = document.querySelector('.sign-up button');
    const forgotPasswordLink = document.querySelector('#forgot-password'); // Enlace de "Olvidaste tu contraseña?"

    // Función de validación de credenciales
    function validateLogin(email, password) {
        // Obtener los usuarios registrados desde el localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Buscar si el usuario existe y las credenciales son correctas
        const user = users.find(user => user.email === email && user.password === password);

        return !!user; // Retorna true si el usuario existe y las credenciales coinciden
    }

    // Función para registrar un nuevo usuario
    function registerUser(name, password) {
        // Crear correo con el formato nombre@qrservice.com
        const email = name.replace(/\s+/g, '').toLowerCase() + "@qrservice.com";

        // Obtener los usuarios registrados desde localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Verificar si el usuario ya existe
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert("El usuario con este correo ya está registrado.");
        } else {
            // Agregar el nuevo usuario a la lista
            users.push({ email, password });

            // Guardar la lista actualizada en localStorage
            localStorage.setItem("users", JSON.stringify(users));

            alert(`Usuario registrado con éxito.\nCorreo: ${email}\nContraseña: ${password}`);
        }
    }

    // Función para recordar contraseña
    function rememberPassword(email) {
        // Obtener los usuarios registrados desde localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Buscar al usuario por su email
        const user = users.find(user => user.email === email);

        if (user) {
            alert(`Tu contraseña es: ${user.password}`);
        } else {
            alert("El correo no está registrado.");
        }
    }

    // Al hacer clic en el botón de iniciar sesión
    loginButton.addEventListener('click', function (e) {
        e.preventDefault(); // Previene que se recargue la página

        const email = document.querySelector('.sign-in input[type="email"]').value;
        const password = document.querySelector('.sign-in input[type="password"]').value;

        // Validar credenciales
        if (validateLogin(email, password)) {
            window.location.href = "admin.html"; // Redirigir a la página de admin
        } else {
            alert("Credenciales incorrectas. Intenta de nuevo.");
        }
    });

    // Al hacer clic en el botón de registrar
    registerButton.addEventListener('click', function (e) {
        e.preventDefault(); // Previene que se recargue la página

        const name = document.querySelector('.sign-up input[type="text"]').value;
        const password = document.querySelector('.sign-up input[type="password"]').value;

        if (name && password) {
            registerUser(name, password); // Registrar el nuevo usuario
        } else {
            alert("Por favor completa todos los campos.");
        }
    });

    // Al hacer clic en el enlace de "Olvidaste tu contraseña?"
    forgotPasswordLink.addEventListener('click', function (e) {
        e.preventDefault(); // Previene que se recargue la página

        const email = prompt("Ingresa tu correo electrónico para recordar tu contraseña:");
        
        if (email) {
            rememberPassword(email); // Llama a la función para recordar la contraseña
        }
    });
});






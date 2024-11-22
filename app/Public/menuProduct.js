createProduct('Bebidas');
createProduct('Entradas');
createProduct('Platillos');
createProduct('Postres');

function createProduct(producto){
fetch(`/${producto}P`)
.then(response => response.json())
.then(data => {
    const menuContainer = document.getElementById(`menu-container${producto}`);

    data.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        const productoImg = document.createElement('img');
        productoImg.src = `../producto.img/${producto.img}`;
        productoImg.alt = producto.nombre_producto;

        const nombreP = document.createElement('p');
        nombreP.classList.add('nombreP');
        nombreP.textContent = producto.nombre_producto;

        const descripcionP = document.createElement('p');
        descripcionP.classList.add('descripcion');
        descripcionP.textContent = producto.descripcion;

        const precioP = document.createElement('p');
        precioP.classList.add('precio');
        precioP.textContent = `$${producto.precio_producto}`;

        const botones = document.createElement('div');
        botones.classList.add('botones');

        const button_del = document.createElement('button');
        button_del.classList.add('button_del');
        button_del.textContent = "-";
        
        const button_sum = document.createElement('button');
        button_sum.classList.add('button_add');
        button_sum.textContent = "+";

        const input_cant = document.createElement('input');
        input_cant.type = 'number';
        input_cant.classList.add('input_cant');
        input_cant.value = 0;

        const button_agregar_carrito = document.createElement('button');
        button_agregar_carrito.classList.add('button_agregar_carrito');
        button_agregar_carrito.textContent = "Agregar Carrito";


        button_sum.addEventListener('click', () => {
            input_cant.value = parseInt(input_cant.value) + 1;
           //  agregarAlCarrito(bebidas);
        });

        button_del.addEventListener('click', () => {
            if(input_cant.value > 0){
                input_cant.value = parseInt(input_cant.value) - 1;
               //  eliminarCantCarrito(bebidas);
            }  
        });

        productoDiv.appendChild(productoImg);
        productoDiv.appendChild(nombreP);
        productoDiv.appendChild(descripcionP);
        productoDiv.appendChild(precioP);
        botones.appendChild(button_del);
        botones.appendChild(input_cant);
        botones.appendChild(button_sum);
        botones.appendChild(button_agregar_carrito);
        productoDiv.appendChild(botones);
        menuContainer.appendChild(productoDiv);
    });
})
.catch(error => {
    console.error('Error al cargar los productos:', error);
})};

document.addEventListener('DOMContentLoaded', () => {
 fetch('/Navbar')
     .then(response => response.text())
     .then(data => {
         // Insertar el HTML en el contenedor
         document.getElementById('navbar-container').innerHTML = data;

         // Crear un script para ejecutar el contenido JS de JMenu.js
         const script = document.createElement('script');
         script.src = '/JMenu.js';  // Ruta del script
         script.onload = () => {
             console.log('El script se cargó y ejecutó correctamente');
         };
         document.body.appendChild(script);

     })
     .catch(error => console.error('Error al cargar el navbar:', error));
    });


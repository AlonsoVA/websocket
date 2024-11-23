    // Boton para abrir la sidebar
    // const menu = document.getElementById('menu-btn');
    // const sidebar = document.getElementById('sidebar');

    // menu.addEventListener('click', () => {
    //     sidebar.classList.toggle('menu-toggle');
    // })


// create.addEventListener("click", () => {
//   carrito.classList.remove("visible"); 
//   carrito.addEventListener('transitionend', () => {
//       carrito.style.display = 'none'; 
//   }, { once: true }); 
// });

    ViewProduct('Bebidas')
    ViewProduct('Platillos')
    ViewProduct('Postres')
    ViewProduct('Entradas')

function ViewProduct(producto){
  fetch(`/${producto}P`)
    .then(response => response.json())
    .then(data => {
        const bebidas = document.getElementById(`${producto}`);

        const table = document.createElement('table');
        table.classList.add('productTable');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = [`${producto}`, 'Precio', 'Borrar'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.forEach(producto => {
            const row = document.createElement('tr');
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteButton');
            deleteButton.textContent = "Eliminar";
            
            const nombreCell = document.createElement('td');
            nombreCell.textContent = producto.nombre_producto;
            row.appendChild(nombreCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = `$${producto.precio_producto}`;
            row.appendChild(precioCell);

            const stockCell = document.createElement('td');
            stockCell.appendChild(deleteButton)
            stockCell.classList.add('productStock');

            deleteButton.addEventListener('click', async () => {
                const producDelete = producto.id_producto;
              
                try {
                  const response = await fetch(`http://localhost:3500/EliminarProducto/${producDelete}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
              
                  const responseData = await response.json();
                  console.log('Mensaje del servidor:', responseData.message || 'Sin mensaje de error');
                  
                  if (response.ok) {
                    row.remove(); 
                    alert('Producto eliminado correctamente');
                  } else {
                    alert('Problemas al eliminar el producto');
                  }
                } catch (e) {
                  console.error('Error en el catch:', e);
                  alert('Problemas al eliminar el producto');
                }
              });

            row.appendChild(stockCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        bebidas.appendChild(table);
        
    }).catch(error => {
        console.error('Error al cargar los productos:', error);
    });


}

document.getElementById("agreg_pro").addEventListener('click', async () => {
  const nombre = document.getElementById("nombre-producto").value;
  const categoria = document.getElementById("categoria_producto").value;
  const descripcion = document.getElementById("descripcion_producto").value;
  const precio = parseFloat(document.getElementById("precio_producto").value);
  const imgFile = document.getElementById("img-agreg").value;

  try {
      const response = await fetch('http://localhost:3500/AgregarProductos', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre, categoria, precio, descripcion, imgFile })
      });

      const responseData = await response.json();
      console.log('Mensaje del servidor:', responseData.message || 'Sin mensaje de error');

      console.log('Estado de respuesta:', response.status);
      console.log('Respuesta completa:', response);

      if (response.ok) {
          alert('Producto agregado exitosamente');
      } else {
          alert('Problemas al agregar el producto');
      }
  } catch (e) {
      alert('Se agrego el producto correctamente');
  }
});

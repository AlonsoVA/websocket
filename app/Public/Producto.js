    // Boton para abrir la sidebar
    const menu = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');

    menu.addEventListener('click', () => {
        sidebar.classList.toggle('menu-toggle');
    })

    ViewProduct('Bebidas')
    ViewProduct('Platillos')
    ViewProduct('Postres')
    ViewProduct('Entradas')

function ViewProduct(producto){
  fetch(`/${producto}P`)
    .then(response => response.json())
    .then(data => {
        const bebidas = document.getElementById(`${producto}`);

        // Crear el título
        const h1 = document.createElement('h1');
        h1.textContent = `${producto}`;
        h1.classList.add('ProductH1');
        bebidas.appendChild(h1);

        const table = document.createElement('table');
        table.classList.add('productTable');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Nombre', 'Precio', 'Stock'];
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
            stockCell.textContent = producto.stock;
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
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });


}
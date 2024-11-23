// // Definir comandasGuardadas como let para poder actualizarlo
// let comandasGuardadas = [];

// // Seleccionar el elemento de la sección de comandas
// const comandasSection = document.getElementById("comandas");


// // Cargar las comandas desde la API al cargar la página
// document.addEventListener("DOMContentLoaded", () => {
//     cargarComandas();
// });
// //Funcion para obtener las comandas
// function cargarComandas() {
//     fetch('http://localhost:3500/api/comandas')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error al cargar las comandas: ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             //Verificar los datos recibidos
//             console.log("Datos recibidos de la API:", data);
//             comandasGuardadas = data;
//             mostrarMesas(); //Mostrar las mesas despues de actualizar las comandas
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }

// //Funcion para mostrar la lista de comandas (mesas)
// function mostrarMesas() {
//     comandasSection.innerHTML = "";
//     if (comandasGuardadas.length === 0) {
//         comandasSection.innerHTML = "<p> No hay comandas disponibles</p>";
//         return;
//     }

//     //Agrupar las comandas por id_pedido
//     comandasGuardadas.forEach(comanda => {
//         const mesaDiv = document.createElement("div");
//         mesaDiv.classList.add("mesa");

//         mesaDiv.innerHTML = mesaDiv.innerHTML = `
//         <p><strong>Pedido:</strong> ${comanda.id_pedido}</p>
//         <p><strong>Mesa:</strong> ${comanda.nombre_mesa}</p>
//         <p><strong>Comentarios:</strong> ${comanda.comentario}</p>
//         <p><strong>Fecha:</strong> ${new Date(comanda.fecha_pedido).toLocaleString()}</p>
//         <div>
//             ${comanda.productos.map(producto => `
//                 <p>x${producto.cantidad} ${producto.nombre_producto}</p>
//             `).join('')}
//         </div>
//         <p><strong>Total:</strong> $${comanda.total_pedido}</p>
//         <button class="btnAtendida" onclick="marcarComoAtendida(${comanda.id_pedido})">
//             Marcar como Atendida
//         </button>
//     `;
//     comandasSection.appendChild(mesaDiv);
// });
// }
//     //Verificar los datos que recibimos en el front
//     console.log("Comandas recibidas en el fronted:", comandasGuardadas);

// //Funcion para marcar una comanda como atendida
// function marcarComoAtendida(idComanda) {
//             fetch('http://localhost:3500/api/comandas/${idComanda}', {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ estado: 'atendida' }) //Esto actualisa el estado
//             })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Error al marcar como atendida: ${response.statusText');
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log("comanda marcada como atendida:", data);
//                     cargarComandas(); //Recarga las comandas e.e
//                 })
//                 .catch(error => {
//                     console.error(error);
//                 });
//         }

// // Función para verificar si el usuario llegó al final de la página
// function checkScrollPosition() {
//             if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//                 document.getElementById('footer').style.display = 'block';
//             } else {
//                 document.getElementById('footer').style.display = 'none';
//             }
//         }

// // Ejecutar la función cuando el usuario haga scroll
// window.addEventListener('scroll', checkScrollPosition);

//     // Ejecutar al cargar la página para ocultar el footer inicialmente
//     window.onload = checkScrollPosition;


fetch('/Orden' )
.then(response => response.json())
.then(data => {

    const seccionComandas = document.getElementById(`comandas`);
    data.forEach(orden => {
        const div = document.createElement('div');
        div.classList.add('divOrder');
        div.style.height = '100px';

        const name = document.createElement('p');
        name.classList.add('ordenName');
        name.textContent = orden.nombre_orden;

        const nameM = document.createElement('p');
        nameM.classList.add('nameM');
        nameM.textContent = orden.MesaName;
        nameM.style.fontSize = '30px';

        const fecha = document.createElement('p');
        fecha.classList.add('ordenDate');
        fecha.textContent = orden.fecha_orden;

        const comentario = document.createElement('p');
        comentario.classList.add('ordenComent');
        comentario.textContent = orden.coment;

        const total = document.createElement('p');
        total.classList.add('ordenTotal');
        total.textContent = orden.total;
         
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        const i = document.createElement('i');
        i.className = 'bi bi-trash';
        deleteButton.appendChild(i);

        fetch(`http://localhost:3500/Detalles/${orden.id_orden}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(detalles => {
              detalles.forEach(detalle => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('productoDetalle');
    
                const productoNombre = document.createElement('p');
                productoNombre.textContent = `${detalle.nombre_producto}`;
    
                const productoCantidad = document.createElement('p');
                productoCantidad.textContent = `Cantidad: ${detalle.cantidad}`;
    
                productoDiv.appendChild(productoNombre);
                productoDiv.appendChild(productoCantidad);
                div.appendChild(productoDiv);
              });
            })
            .catch(error => {
              console.error(`Error al cargar los detalles de la orden ${orden.id_orden}:`, error);
            });

            deleteButton.addEventListener('click', async () => {
              
                try {
                  const response = await fetch(`http://localhost:3500/TerminarOrden/${orden.id_orden}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
              
                  const responseData = await response.json();
                  console.log('Mensaje del servidor:', responseData.message || 'Sin mensaje de error');
                  
                  if (response.ok) {
                    alert('Orden eliminada correctamente');
                  } else {
                    alert('Problemas al eliminar la orden');
                  }
                } catch (e) {
                  console.error('Error en el catch:', e);
                  alert('Orden eliminada correctamente');
                }
              });

        div.appendChild(deleteButton);
        div.appendChild(nameM);
        div.appendChild(name);
        div.appendChild(fecha);
        div.appendChild(comentario);
        div.appendChild(total);
        seccionComandas.appendChild(div);

    })

})
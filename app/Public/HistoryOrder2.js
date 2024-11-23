fetch('/Total')
.then(response => response.json())
.then(data => {

    const deposito = document.getElementById('total');
    data.forEach(total => {
        const p = document.createElement('p');
        p.classList.add('totalP');
        p.textContent = `Total:$${total.total}`;

        deposito.appendChild(p);
    });
});


const eliminar = document.querySelector('.deleteButton'); 

eliminar.addEventListener('click', async () => {

  try {
    const response = await fetch(`http://localhost:3500/EliminarOrdenes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();
    console.log('Mensaje del servidor:', responseData.message || 'Sin mensaje de error');
    
    if (response.ok) { 
      alert('Ordenes eliminadas correctamente');
    } else {
      alert('Problemas al eliminar la orden');
    }
  } catch (e) {
    console.error('Error en el catch:', e);
    alert('Problemas al eliminar la orden');
  }
})
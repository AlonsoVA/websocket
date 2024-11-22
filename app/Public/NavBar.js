const title = document.getElementById('Mesa');
document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:3500/Mesa/4`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(mesa => {
            console.log(mesa);
            const H1 = document.createElement('H1');
            H1.id = 'Nombre';
            H1.textContent = `Mesa ${mesa.nombre_mesa}`;
            title.appendChild(H1);
      })
      .catch(error => console.error('Error al obtener la mesa:', error));
});
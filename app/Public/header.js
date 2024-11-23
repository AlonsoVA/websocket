const btnConfig = document.getElementById('btn-config');
        const menuConfig = document.getElementById('menu-config');
    
        btnConfig.addEventListener('click', () => {
          if (menuConfig.style.display === 'block') {
            menuConfig.style.display = 'none';
          } else {
            menuConfig.style.display = 'block';
          }
        });
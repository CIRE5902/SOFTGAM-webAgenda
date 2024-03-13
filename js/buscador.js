// Script para buscador.js
const citas = document.querySelectorAll('.divCitas-cita');

document.getElementById('buscador').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();

    citas.forEach(cita => {
        const valor = cita.getAttribute('data-value').toLowerCase(); 

        if (valor.includes(searchTerm)) {
            cita.style.display = '';
        } else {
            cita.style.display = 'none';
        }
    });
});

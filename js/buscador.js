// Script para buscador.js
const citas = document.querySelectorAll('.divCitas-cita'); // Selecciona todos los elementos de la cita

document.getElementById('buscador').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();

    citas.forEach(cita => {
        // Asegúrate de que este es el atributo correcto que deseas buscar.
        // Si 'value' no es un atributo estándar para un 'div', podrías considerar usar 'data-value' o asegurarte de que los 'div' tengan este atributo personalizado correctamente establecido.
        const valor = cita.getAttribute('value').toLowerCase();

        if (valor.includes(searchTerm)) {
            cita.style.display = ''; 
        } else {
            cita.style.display = 'none'; 
        }
    });
});

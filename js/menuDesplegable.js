// Obtén el checkbox y el cuerpo del documento
var checkbox = document.querySelector('#check');
var body = document.querySelector('body');

// Escucha el evento de cambio en el checkbox
checkbox.addEventListener('change', function() {
    // Si el checkbox está marcado (menú desplegado)
    if (checkbox.checked) {
        // Aplica overflow hidden al cuerpo del documento
        body.style.overflow = 'hidden';
    } else {
        // Quita overflow hidden del cuerpo del documento
        body.style.overflow = 'visible';
    }
});

var checkbox = document.querySelector('#check');
var body = document.querySelector('body');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'visible';
    }
});

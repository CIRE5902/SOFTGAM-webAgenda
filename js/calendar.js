const agendaCabecera = document.querySelector('.agenda-cabecera');
const calendarEl = document.getElementById('calendario');
let boxSelect = document.getElementById('boxSelect');
let turnoSelect = document.getElementById('turnoSelect');
let formAgenda = document.getElementById('formAgenda');

const visitasObj = visitas;
console.table(visitasObj);

const allVisitas = visitasObj.map(visita => {
    const fechaInicio = visita.Fecha.split(' ')[0];
    const horaInicio = visita.Hora.split(' ')[1];
    const dateTimeInicio = `${fechaInicio}T${horaInicio}`;

    const duracionEnMinutos = visita.Durada * 15;
    const momentoInicio = new Date(dateTimeInicio);
    const momentoFin = new Date(momentoInicio.getTime() + duracionEnMinutos * 60000);
    const fechaFin = `${momentoFin.getFullYear()}-${(momentoFin.getMonth() + 1).toString().padStart(2, '0')}-${momentoFin.getDate().toString().padStart(2, '0')}`;
    const horaFin = `${momentoFin.getHours().toString().padStart(2, '0')}:${momentoFin.getMinutes().toString().padStart(2, '0')}:${momentoFin.getSeconds().toString().padStart(2, '0')}`;
    const dateTimeFin = `${fechaFin}T${horaFin}`;
    return {
        title: visita.NomPacient + (visita.TelefonContacte ? ' (' + visita.TelefonContacte + ')' : ''),
        start: dateTimeInicio,
        end: dateTimeFin,
        extendedProps: {
            box: visita.NomBox,
            urlEvento: 'menuControlador.php',
        },
        idBox: visita.idBox,
        telefono: visita.TelefonContacte,
    };
});

let calendarCreado = false;
let calendar;
let currentDate = new Date();

function inicializarCalendario() {
    if (!calendarCreado && calendarEl) {
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'timeGrid',
            initialDate: currentDate,
            headerToolbar: false,
            selectable: true,
            locale: 'es',
            slotDuration: '00:30:00',
            slotLabelInterval: '00:30:00',
            allDaySlot: false,
            slotMinTime: '08:00:00',
            slotMaxTime: '20:30:00',
            firstDay: 1,
            slotEventOverlap: false,
            views: {
                timeGrid: { slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false } },
                dayGridMonth: { titleFormat: { month: 'long', year: 'numeric' } },
                timeGridWeek: { titleFormat: { month: 'long', year: 'numeric' } },
                timeGridDay: { titleFormat: { day: 'numeric', month: 'long', weekday: 'long' } }
            },
            events: allVisitas,
            eventDidMount: function (info) {
                tippy(info.el, {
                    content: `${info.event.title} - Más info: ${info.event.extendedProps.box}`,
                    trigger: 'click',
                    placement: 'top',
                    allowHTML: true,
                });
                info.el.addEventListener('dblclick', function () {
                    if (info.event.extendedProps.urlEvento) {
                        window.open(info.event.extendedProps.urlEvento, '_blank');
                    }
                });
            },

            dateClick: function (info) {
                currentDate = info.date;
                calendar.gotoDate(info.date);
                updateCurrentDate(currentDate);
            }    
        });
        calendarCreado = true;
        calendar.render();
        updateCurrentDate(currentDate);
    }
}

function limpiarContenido() {
    const existente = agendaCabecera.querySelector('.agenda-cabecera-fecha');
    if (existente) {
        agendaCabecera.removeChild(existente);
    }
}

function agregarContenidoMovil() {
    limpiarContenido();
    let divMobil = document.createElement("div");
    divMobil.className = "agenda-cabecera-fecha";
    divMobil.innerHTML = `
        <div class="agenda-cabecera-fecha-input">
            <div class="agenda-cabecera-fecha-input-date">
                <label for="dateInput" class="dateIcon">📅
                    <input type="date" id="dateInput" class="dateInput">
                </label>
            </div>
            <div class="agenda-cabecera-fecha-input-arrows">
                <i class="fas fa-arrow-alt-circle-left" id="prevButtonMobile"></i>
                <i class="fas fa-arrow-alt-circle-right" id="nextButtonMobile"></i>
            </div>
        </div>
        <div class="agenda-cabecera-fecha-texto">
            <h2 id="currentDate"></h2>
        </div>
    `;
    agendaCabecera.appendChild(divMobil);
    updateCurrentDate(new Date());
    configurarEventosDeNavegacion();
}

function agregarContenidoDesktop() {
    limpiarContenido();
    let divDesktop = document.createElement("div");
    divDesktop.className = "agenda-cabecera-fecha";
    divDesktop.innerHTML = `
        <div class="agenda-cabecera-fecha-input">
            <div class="agenda-cabecera-fecha-input-date">
                <label for="dateInputDesktop" class="dateIcon">📅
                    <input type="date" id="dateInputDesktop" class="dateInput">
                </label>
            </div>
            <div class="agenda-cabecera-fecha-input-arrows">
                <i class="fas fa-arrow-alt-circle-left" id="prevButtonDesktop"></i>
                <i class="fas fa-arrow-alt-circle-right" id="nextButtonDesktop"></i>
            </div>
        </div>
        <div class="agenda-cabecera-fecha-texto">
            <h2 id="currentDateDesktop"></h2>
        </div>
        <div class="agenda-cabecera-fecha-cambiarVista">
            <button id="vistaMes">Meses</button>
            <button id="vistaSemana">Semanas</button>
            <button id="vistaDia">Dias</button>
        </div>
    `;
    agendaCabecera.appendChild(divDesktop);
    updateCurrentDate(new Date());
    configurarEventosDeNavegacion();
}
function configurarEventosDeNavegacion() {
    document.querySelectorAll('#prevButtonMobile, #prevButtonDesktop').forEach(button => {
        button.onclick = () => {
            calendar.prev();
            currentDate = calendar.getDate();
            updateCurrentDate(currentDate);
        };
    });

    document.querySelectorAll('#nextButtonMobile, #nextButtonDesktop').forEach(button => {
        button.onclick = () => {
            calendar.next();
            currentDate = calendar.getDate();
            updateCurrentDate(currentDate);
        };
    });

    document.querySelectorAll('#dateInput, #dateInputDesktop').forEach(input => {
        input.onchange = (event) => {
            currentDate = new Date(event.target.value);
            calendar.gotoDate(currentDate);
            updateCurrentDate(currentDate);
        };
    });
}

function updateCurrentDate(date) {
    let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    document.querySelectorAll('#currentDate, #currentDateDesktop').forEach(element => {
        element.textContent = formattedDate;
    });
}

function cambiarVistaCalendario(vista) {
    calendar.changeView(vista);
    updateCurrentDate(currentDate);
}

function comprobarTamanoPantalla() {
    inicializarCalendario();
    if (window.innerWidth < 858) {
        agregarContenidoMovil();
        cambiarVistaCalendario('timeGrid');
    } else {
        agregarContenidoDesktop();
        document.getElementById('vistaMes').addEventListener('click', function () {
            cambiarVistaCalendario('dayGridMonth');
        });

        document.getElementById('vistaSemana').addEventListener('click', function () {
            cambiarVistaCalendario('timeGridWeek');
        });

        document.getElementById('vistaDia').addEventListener('click', function () {
            cambiarVistaCalendario('timeGridDay');
        });
        updateCurrentDate(currentDate);

    }
}

turnoSelect.addEventListener('change', function () {

    formAgenda.submit();
});

boxSelect.addEventListener('change', function () {

    formAgenda.submit();
});

document.getElementById('diaSeleccionado').addEventListener('change', function() {
    formAgenda.submit();
});




window.addEventListener('resize', comprobarTamanoPantalla);
comprobarTamanoPantalla();

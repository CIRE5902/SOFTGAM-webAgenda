const agendaCabecera = document.querySelector('.agenda-cabecera');
const calendarEl = document.getElementById('calendario');

const visitasInput = document.getElementById('visitas');
const visitasValue = visitasInput.value;
const visitasObj = JSON.parse(visitasValue);
console.table(visitasObj);

const allVisitas = visitasObj.map(visita => {
    const correctDateTime = visita.Hora.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:$6');
    return {
        title: visita.NomPacient,
        start: correctDateTime,
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
            views: {
                timeGrid: { slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false } },
                dayGridMonth: { titleFormat: { month: 'long', year: 'numeric' } },
                timeGridWeek: { titleFormat: { month: 'long', year: 'numeric' } },
                timeGridDay: { titleFormat: { day: 'numeric', month: 'long', weekday: 'long' } }
            },
            events: allVisitas,
            dateClick: function (info) {
                currentDate = info.date;
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
            <button id="vistaMes">Mesos</button>
            <button id="vistaSemana">Semanes</button>
            <button id="vistaDia">Dies</button>
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
    if (window.innerWidth < 768) {
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

document.getElementById('turnoSelect').addEventListener('change', function () {

    let turno = document.getElementById('turnoSelect').value;

    if (turno === 'mati') {
        calendar.setOption('slotMinTime', '08:00:00');
        calendar.setOption('slotMaxTime', '13:30:00');
    } else if (turno === 'tarda') {
        calendar.setOption('slotMinTime', '14:00:00');
        calendar.setOption('slotMaxTime', '20:30:00');
    }else if (turno === 'diaEntero') {
        calendar.setOption('slotMinTime', '8:00:00');
        calendar.setOption('slotMaxTime', '20:30:00');
    }
    calendar.render();
});



window.addEventListener('resize', comprobarTamanoPantalla);
comprobarTamanoPantalla();

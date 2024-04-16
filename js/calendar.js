const agendaCabecera = document.querySelector('.agenda-cabecera');
const doctors = document.querySelector('.agenda-doctors');
const calendarEl = document.getElementById('calendario');
let boxSelect = document.getElementById('boxSelect');
let turnoSelect = document.getElementById('turnoSelect');
var slotMinTime = document.getElementById('slotMinTime').value;
var slotMaxTime = document.getElementById('slotMaxTime').value;
let fechaInput = document.getElementById('fechaInput').value;
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
        color: decimalToHexColor(visita.ColorBox),
        textColor: "black",
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
let currentDate = fechaInput ? new Date(fechaInput) : new Date();
let currentDateFormatted = currentDate.toISOString().split('T')[0];

let formattedDate;
updateCurrentDate();
let mesActual = currentDate.getMonth() + 1;
let añoActual = currentDate.getFullYear();

function inicializarCalendario() {
    if (!calendarCreado && calendarEl) {
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'timeGrid',
            initialDate: new Date(fechaInput),
            datesSet: function (dateInfo) {
                console.log(dateInfo);
                setTimeout(function(){
                    let nuevoMes = dateInfo.start.getMonth() + 1;
                    let nuevoAño = dateInfo.start.getFullYear();

                    if (nuevoMes !== mesActual || nuevoAño !== añoActual) {
                        document.getElementById('fechaInput').setAttribute('value', currentDateFormatted);
                        formAgenda.submit();
                    }
                }, 0);
            },
            headerToolbar: false,
            editable: true,
            selectable: true,
            locale: 'es',
            slotDuration: '00:30:00',
            slotLabelInterval: '00:30:00',
            allDaySlot: false,
            slotMinTime: slotMinTime,
            slotMaxTime: slotMaxTime,
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
                currentDateFormatted = info.date.toISOString().split('T')[0];
                updateCurrentDate();
            }
        });
        calendarCreado = true;
        calendar.render();
        updateCurrentDate();
    }
}

function decimalToHexColor(decimalColor) {
    let hexColor = decimalColor.toString(16);
    hexColor = hexColor.padStart(6, '0');
    return '#' + hexColor;
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
            let prevDate = calendar.getDate();
            prevDate.setDate(prevDate.getDate() - 1);
            calendar.gotoDate(prevDate);
            currentDateFormatted = prevDate.toISOString().split('T')[0];
            updateCurrentDate();
        };
    });

    document.querySelectorAll('#nextButtonMobile, #nextButtonDesktop').forEach(button => {
        button.onclick = () => {
            let nextDate = calendar.getDate();
            nextDate.setDate(nextDate.getDate() + 1);
            calendar.gotoDate(nextDate);
            currentDateFormatted = nextDate.toISOString().split('T')[0];
            updateCurrentDate();
        };
    });

    document.querySelectorAll('#dateInput, #dateInputDesktop').forEach(input => {
        input.onchange = (event) => {
            currentDate = new Date(event.target.value);
            currentDateFormatted = currentDate.toISOString().split('T')[0];
            calendar.gotoDate(currentDate);
            updateCurrentDate();
        };
    });
}

function updateCurrentDate() {
    document.querySelectorAll('#currentDate, #currentDateDesktop').forEach(element => {
        element.textContent = currentDateFormatted;
    });
    document.getElementById('fechaInput').value = currentDateFormatted;
    updateDoctor(currentDateFormatted);
}

function cambiarVistaCalendario(vista) {
    calendar.changeView(vista);
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

    }
}

function updateDoctor(date) {
    const visitasDelDia = visitasObj.filter(visita => visita.Fecha.startsWith(date));

    doctors.innerHTML = '';

    const visitasMati = visitasDelDia.filter(visita => visita.Torn === 'M');
    if (visitasMati.length > 0) {
        const doctorsMatiDiv = document.createElement("div");
        doctorsMatiDiv.className = "doctors-doctorsMati";
        const visitaMati = visitasMati[0]; 
        doctorsMatiDiv.innerHTML = `
        <div class="doctors-doctorsMati-torn">
        <i class="fa-solid fa-sun solAgenda"> Mati </i>
    </div>
    <div class="doctors-doctorsMati-doctors">
        <div class="doctors-doctorsMati-doctors-1">${visitaMati.Doctor1}</div>
        <div class="doctors-doctorsMati-doctors-2">${visitaMati.Doctor2}</div>
    </div>
        `;
        doctors.appendChild(doctorsMatiDiv);
    }

    const visitasTarda = visitasDelDia.filter(visita => visita.Torn === 'T');
    if (visitasTarda.length > 0) {
        const doctorsTardaDiv = document.createElement("div");
        doctorsTardaDiv.className = "doctors-doctorsTarda";
        const visitaTarda = visitasTarda[0]; 
        doctorsTardaDiv.innerHTML = `
        <div class="doctors-doctorsTarda-torn">
        <i class="fa-solid fa-moon lunaAgenda"> Tarda </i>
    </div>
    <div class="doctors-doctorsTarda-doctors">
        <div class="doctors-doctorsTarda-doctors-1">${visitaTarda.Doctor1}</div>
        <div class="doctors-doctorsTarda-doctors-2">${visitaTarda.Doctor2}</div>
    </div>
        `;
        doctors.appendChild(doctorsTardaDiv);
    }
}




turnoSelect.addEventListener('change', function () {
    formAgenda.submit();
});

boxSelect.addEventListener('change', function () {
    formAgenda.submit();
});

window.addEventListener('resize', comprobarTamanoPantalla);
comprobarTamanoPantalla();

<!DOCTYPE html>
<html lang="es">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="UTF-8">
    <link rel="stylesheet" href="../css/agenda.css">
    <script src="https://kit.fontawesome.com/dda3477dd5.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Poppins:wght@700&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <title>Agenda</title>
</head>

<body>

    <?php include 'partials/header.php'; ?>

    <div class="boxInformacio">
        <!-- <select class="select">
            <option value="doctor1">Doctor 1</option>
            <option value="doctor2">Doctor 2</option>
        </select> -->
        <select class="select">
            <option value="">Seleccionar Box</option>
            <?php foreach ($select as $box): ?>
        <option value="<?php echo htmlspecialchars($box['Box']); ?>">
            <?php echo htmlspecialchars($box['NomBox']); ?>
        </option>
    <?php endforeach; ?>
        </select>
        <select class="select" id="turnoSelect">
            <option value="diaEntero">Todo el dia</option>
            <option value="mati">Mati</option>
            <option value="tarda">Tarda</option>
        </select>
    </div>

    <div class="agenda">
        <div class="agenda-cabecera">
        </div>
        <div id='calendario' class="agenda-calendario"></div>


    </div>
    </div>
    <footer>

    </footer>
    <script src='../fullCalendar/fullcalendar-6.1.11/dist/index.global.min.js'></script>
    <script src='../js/calendar.js'></script>
</body>

</html>




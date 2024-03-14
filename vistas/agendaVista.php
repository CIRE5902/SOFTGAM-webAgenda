<!DOCTYPE html>
<html lang="es">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Poppins:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
    <link rel="stylesheet" href="../css/agenda.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

    <title>Agenda</title>
</head>

<body>

    <?php include 'partials/header.php'; ?>
    <div id="content" class="container">
        <div class="boxInformacio">
            <!-- <select class="select">
            <option value="doctor1">Doctor 1</option>
            <option value="doctor2">Doctor 2</option>
        </select> -->
            <select class="select" id="boxSelect">
                <option value="">Seleccionar Box</option>
                <?php foreach ($select as $box) : ?>
                    <option value="<?php echo htmlspecialchars($box['Box']); ?>">
                        <?php echo htmlspecialchars($box['NomBox']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <select class="select" id="turnoSelect">
                <option value="diaEntero">Todo el dia</option>
                <option value="mati">Mañana</option>
                <option value="tarda">Tarde</option>
            </select>
        </div>

        <div class="agenda">
            <div class="agenda-cabecera">
            </div>
            <div id='calendario' class="agenda-calendario"></div>


            <input type="hidden" id="visitas" value='<?php echo json_encode($visitas); ?>'>

        </div>
    </div>
    <footer>

    </footer>
    <script src='../fullCalendar/fullcalendar-6.1.11/dist/index.global.min.js'></script>
    <script src='../js/calendar.js'></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/dda3477dd5.js" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>

</body>

</html>
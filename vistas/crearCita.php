<!DOCTYPE html>
<html lang="es">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="UTF-8">
    <link rel="stylesheet" href="../css/cita.css">
    <script src="https://kit.fontawesome.com/dda3477dd5.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Poppins:wght@700&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <title>Crear cita</title>
</head>

<body>
    <?php include 'partials/header.php'; ?>
    <div class="container">
        <div class="appointment">
            <div class="appointment-Title"> Crear cita</div>
            <div class="appointment-Form">
                <div class="appointmentDetails">werwerwerwe
                    <div class="appointmentDetails-titulo">
                        <h2>Detalles cita</h2>
                    </div>
                    <div class="appointmentDetails-fecha">
                        <label for="fecha">Fecha:</label>
                        <input type="date" id="fecha" name="fecha">
                        <label for="hora">Hora:</label>
                        <input type="time" id="hora" name="hora">
                    </div>
                    <div class="appointmentDetails-doctor">
                        <label for="doctor">Doctor:</label>
                        <select id="doctor" name="doctor">
                            <option value="">Seleccione un doctor</option>
                            <option value="1">Doctor 1</option>
                            <option value="2">Doctor 2</option>
                        </select>
                    </div>
                </div>
                <div class="patientDetails">ertertertert</div>
            </div>
        </div>
    </div>
    <footer>

    </footer>
</body>

</html>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="UTF-8">
    <link rel="stylesheet" href="../css/buscarCita.css">
    <script src="https://kit.fontawesome.com/dda3477dd5.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Poppins:wght@700&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

    <title>Buscar cita</title>
</head>

<body>
    <?php include 'partials/header.php'; ?>

    <div id="content" class="container">
        <div class="buscador">
            <input type="text" id="buscador" placeholder="Buscar...">
        </div>

        <div class="divCitas">
            <?php
            foreach ($visitas as $visita) {
            ?>
                <div class='divCitas-cita' data-value="<?php echo htmlspecialchars($visita['NomPacient']); ?>">
                    <div class='divCitas-cita-paciente'>
                        <h4><?php echo htmlspecialchars($visita['NomPacient']); ?></h4>
                    </div>
                    <div class='divCitas-cita-fecha'>
                        <h4><?php echo htmlspecialchars($visita['Hora']); ?></h4>
                    </div>
                    <div class='divCitas-cita-accion'>
                        <a href='editar.php?id=$id' class='btn-editar'><i class='fas fa-edit'></i></a>
                        <a href='borrar.php?id=$id' class='btn-borrar'><i class='fas fa-trash-alt'></i></a>
                    </div>
                </div>

            <?php } ?>
        </div>
    </div>
    <footer>

    </footer>

    <script src="../js/buscador.js"></script>
</body>

</html>
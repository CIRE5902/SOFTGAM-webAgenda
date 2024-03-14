<header class="header">
    <nav>
        <input type="checkbox" id="check">
        <label for="check" class="checkbtn">
            <i class="fas fa-bars iconoMenu"></i>
        </label>
        <a class="enlaceLogo" href="../../controladores/menuControlador.php">Nombre de la Clínica</a>
        <h1 class="logo"></h1>
        <ul class="ulMenu">
            <li><a class="<?php echo basename($_SERVER['PHP_SELF']) == 'agendaControlador.php' ? 'active' : ''; ?>" href="agendaControlador.php">Agenda</a></li>
            <li><a class="<?php echo basename($_SERVER['PHP_SELF']) == 'crearCitaControlador.php' ? 'active' : ''; ?>" href="crearCitaControlador.php">Crear cita</a></li>
            <li><a class="<?php echo basename($_SERVER['PHP_SELF']) == 'buscarCitaControlador.php' ? 'active' : ''; ?>" href="buscarCitaControlador.php">Buscar cita</a></li>
        </ul>
    </nav>
    <link rel="stylesheet" href="../css/header.css">    
    <script src="../../js/menuDesplegable.js"></script>

</header>
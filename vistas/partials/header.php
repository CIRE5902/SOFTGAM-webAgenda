<header class="header">
    <a href="#" class="header-logo"> DUIKER SANITARIA </a>

    <input type="checkbox" id="menuBar">
    <label for="menuBar">
        <i class="fas fa-bars iconoMenu"></i>
    </label>

    <nav class="header-nav">
        <ul class="header-nav-ul">
            <li><a href="#"> <b><span style="color: white;">&#x25BC;</span></b> CENTRE 
                    </b></a>
                <ul>
                    <?php foreach ($clinicas as $clinica) : ?>
                        <li>
                            <a href="#"> - <?php echo htmlspecialchars($clinica['Nom']); ?></a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </li>
            <li><a class="<?php echo basename($_SERVER['PHP_SELF']) == 'agendaControlador.php' ? 'active' : ''; ?>" href="agendaControlador.php">AGENDA</a></li>
            <li><a class="<?php echo basename($_SERVER['PHP_SELF']) == 'crearCitaControlador.php' ? 'active' : ''; ?>" href="crearCitaControlador.php">CREAR CITA</a></li>
            <li><a class="<?php echo basename($_SERVER['PHP_SELF']) == 'buscarCitaControlador.php' ? 'active' : ''; ?>" href="buscarCitaControlador.php">BUSCAR CITA</a></li>

        </ul>
    </nav>
    <link rel="stylesheet" href="../css/header.css">
</header>
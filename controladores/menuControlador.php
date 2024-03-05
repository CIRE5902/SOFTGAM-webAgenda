<?php

require_once '../Database/Conexion.php';
require_once '../Clases/Consultas.php';

// $conexion = new Conexion();
// $consulta = new Consultas($conexion);


if (isset($_POST['btnAgenda'])) {
    header('Location: agendaControlador.php');
} 

if (isset($_POST['btnCrear'])) {
    header('Location: crearCitaControlador.php');
} 

include __DIR__ . '/../vistas/menuVista.php';

<?php
session_start();

require_once '../Database/conexion.php';
require_once '../clases/visitas.php';

$conexion = new conexion();
$visitas = new visitas($conexion);

// $visitas = $visitas->getVisitas();

// var_dump($visitas);
// die();

include __DIR__ . '/../vistas/buscarCita.php';
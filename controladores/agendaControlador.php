<?php

require_once '../Database/conexion.php';
require_once '../clases/box.php';
require_once '../clases/visitas.php';
require_once '../clases/clinicas.php';

session_start();
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: loginControlador.php');
    exit;
}

$boxSelect = $_GET['boxSelect'] ?? null;
$turnoSelect = $_GET['turnoSelect'] ?? null;

$fecha = $_GET['fecha'] ?? Date('Y-m-d');


$slotMinTime = '08:00:00';
$slotMaxTime = '20:00:00';

if ($turnoSelect == 'mati') {
    $slotMinTime = '08:00:00';
    $slotMaxTime = '14:30:00';
} elseif ($turnoSelect == 'tarda') {
    $slotMinTime = '14:00:00';
    $slotMaxTime = '20:30:00';
} else {
    $slotMinTime = '08:00:00';
    $slotMaxTime = '20:30:00';
}



$conexion = new conexion();
$box = new box($conexion);
$visitas = new visitas($conexion);
$clinicas = new clinicas($conexion);



$select = $box->getBox();

$visitas = $visitas->getVisitas($boxSelect, $turnoSelect, $fecha);

$clinicas = $clinicas->getClinicas();

include __DIR__ . '/../vistas/agendaVista.php';

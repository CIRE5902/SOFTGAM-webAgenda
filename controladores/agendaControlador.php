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
$dia = $_GET['dia'] ?? Date('Y-m-d');

$conexion = new conexion();
$box = new box($conexion);
$visitas = new visitas($conexion);
$clinicas = new clinicas($conexion);

$select = $box->getBox();

$visitas = $visitas->getVisitas($boxSelect, $turnoSelect, $dia);

$clinicas = $clinicas->getClinicas();


include __DIR__ . '/../vistas/agendaVista.php';

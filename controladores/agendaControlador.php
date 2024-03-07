<?php

require_once '../Database/conexion.php';
require_once '../clases/box.php';
require_once '../clases/visitas.php';

$conexion = new conexion();
$box = new box($conexion);
$visitas = new visitas($conexion);


$select = $box->getBox();

$visitas = $visitas->getVisitas();

// var_dump($select);
// die();

include __DIR__ . '/../vistas/agendaVista.php';

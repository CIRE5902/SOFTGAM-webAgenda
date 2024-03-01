<?php

require_once '../Database/conexion.php';
require_once '../clases/box.php';

$conexion = new conexion();
$box = new box($conexion);


$select = $box->getBox();

// var_dump($select);
// die();

include __DIR__ . '/../vistas/agendaVista.php';

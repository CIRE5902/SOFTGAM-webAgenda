<?php

// require_once '../Database/Conexion.php';
// require_once '../Clases/Consultas.php';

// $conexion = new Conexion();
// $consulta = new Consultas($conexion);

if (isset($_POST['username']) && ($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username == "admin" && $password =="1234") {
        header('Location: agendaControlador.php');
    } else {
        echo 'no existe este usuario';
    }
}


include __DIR__ . '/../vistas/loginVista.php';

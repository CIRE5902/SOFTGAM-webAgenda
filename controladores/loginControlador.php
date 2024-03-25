<?php

require_once '../Database/conexion.php';

if (isset($_POST['username'], $_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username === "admin" && $password === "1234") {
        session_start();
        $_SESSION['logged_in'] = true;
        header('Location: agendaControlador.php');
        exit;
    } else {
        $error_message = 'Usuario o contraseña incorrectos';
    }
}

include __DIR__ . '/../vistas/loginVista.php';

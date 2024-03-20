<?php
//Conexion a la BD.
class conexion{
    private $connect;
    public function __construct(){
        $config = require_once __DIR__.'/../config.php';
        $connectionString = 'mysql:host='.$config['host'].';dbname='.$config['dbname'].';charset=utf8';
        try {
            $this->connect = new PDO($connectionString, $config['usr'], $config['pwd']);
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error al seleccionar: " . $e->getMessage();
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function getConexion(){
        return $this->connect;
    }
    
}

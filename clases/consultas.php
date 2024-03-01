<?php
class Consultas
{
    private $conexion;
    public function __construct($conexion)
    {
        $this->conexion = $conexion;
        $this->conexion = $this->conexion->getConexion();
    }

    // Función que devuelve toda información de la tabla presentaciones existentes en la BD.
    public function getPresentaciones()
    {
        try {
            $sql = "SELECT * FROM presentaciones";
            $execute = $this->conexion->query($sql);
            $request = $execute->fetchall(PDO::FETCH_ASSOC);
            return $request;
        } catch (PDOException $e) {
            echo "Error al mostrar: " . $e->getMessage();
        }
    }
}

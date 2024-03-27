<?php
class clinicas
{

    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
        $this->conexion = $this->conexion->getConexion();
    }

    public function getClinicas()
    {
        try {
            $sql = "SELECT Nom FROM tbclinicas";
            $stmt = $this->conexion->prepare($sql);
            $stmt->execute();

            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            echo "Error al seleccionar: " . $e->getMessage();
        }
    }
}

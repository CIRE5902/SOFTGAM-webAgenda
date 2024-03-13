<?php
class visitas
{

    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
        $this->conexion = $this->conexion->getConexion();
    }

    public function getVisitas()
    {
        try {
            $sql = "SELECT
            av.Hora AS Hora,
            ab.Data AS Fecha,
            av.NomPacient AS NomPacient,
            av.TelefonContacte AS TelefonContacte,
            b.NomBox AS NomBox,
            b.Box AS idBox
            FROM
            tbAgendaVisita av
            JOIN
            tbAgendaBox ab ON av.IdBoxVisita = ab.IdBoxVisita
            JOIN
            tbBox b ON ab.Box = b.Box;
            ";
            $stmt = $this->conexion->prepare($sql);
            $stmt->execute();

            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            echo "Error al seleccionar: " . $e->getMessage();
            return null;
        }
    }
}

<?php
class visitas
{

    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
        $this->conexion = $this->conexion->getConexion();
    }

    public function getVisitas($boxSelect, $turnoSelect)
    {

        try {
            $sql = "SELECT
            av.Hora AS Hora,
            av.Durada AS Durada,
            ab.Data AS Fecha,
            av.NomPacient AS NomPacient,
            av.TelefonContacte AS TelefonContacte,
            b.NomBox AS NomBox,
            b.Color AS ColorBox,
            b.Box AS idBox
            FROM
            tbAgendaVisita av
            INNER JOIN
            tbAgendaBox ab ON av.IdBoxVisita = ab.IdBoxVisita
            INNER JOIN
            tbBox b ON ab.Box = b.Box
            WHERE TRUE
            ";
            if ($boxSelect) {
                $sql .= "\nAND b.Box = '$boxSelect'";
            }

            if ($turnoSelect) {
                if ($turnoSelect == 'diaEntero') {
                } elseif ($turnoSelect == 'mati') {
                    $sql .= " AND HOUR(av.Hora) >= 8 AND HOUR(av.Hora) < 14";
                } elseif ($turnoSelect == 'tarda') {
                    $sql .= " AND HOUR(av.Hora) >= 14 AND HOUR(av.Hora) < 20";
                }
            }

            // if ($dia) {
            //     $sql .= "\nAND DATE(ab.Data) = '$dia'";
            // }
            // var_dump($dia);
            // die();
            
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

<?php
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . '/../clases/config.php';

try {
    $db = (new Conexion())->getConexion();
    $resultado = $db->query("SELECT id, nombre FROM generos ORDER BY nombre ASC");

    $generos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $generos[] = $fila;
    }

    echo json_encode($generos, JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error"    => "Error al consultar géneros",
        "detalles" => $e->getMessage()
    ]);
}
?>
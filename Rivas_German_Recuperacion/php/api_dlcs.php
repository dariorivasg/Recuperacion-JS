<?php
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . '/../clases/config.php';
require_once __DIR__ . '/../clases/dlc.php';

try {
    $dlcs = DLC::listar();
    echo json_encode($dlcs, JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error al consultar la base de datos",
        "detalles" => $e->getMessage()
    ]);
}
?>
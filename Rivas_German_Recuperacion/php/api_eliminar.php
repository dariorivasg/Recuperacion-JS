<?php
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . '/../clases/config.php';
require_once __DIR__ . '/../clases/videojuego.php';
require_once __DIR__ . '/../clases/dlc.php';

// Solo aceptamos DELETE
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

// Leer el JSON del cuerpo de la petición
$datos = json_decode(file_get_contents('php://input'), true);

if (!$datos || !isset($datos['tipo']) || !isset($datos['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan 'tipo' o 'id'"]);
    exit;
}

$tipo = $datos['tipo'];
$id   = (int) $datos['id'];

try {
    if ($tipo === 'videojuego') {
        $ok = Videojuego::eliminar($id);
    } elseif ($tipo === 'dlc') {
        $ok = DLC::eliminar($id);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Tipo desconocido"]);
        exit;
    }

    if ($ok) {
        echo json_encode(["ok" => true, "msg" => "Eliminado correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo eliminar el elemento"]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error"    => "Error interno del servidor",
        "detalles" => $e->getMessage()
    ]);
}
?>
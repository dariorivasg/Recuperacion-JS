<?php
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . '/../clases/config.php';
require_once __DIR__ . '/../clases/videojuego.php';
require_once __DIR__ . '/../clases/dlc.php';

// Solo aceptamos POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

// Leer el cuerpo JSON enviado desde fetch
$datos = json_decode(file_get_contents('php://input'), true);

if (!$datos || !isset($datos['tipo'])) {
    http_response_code(400);
    echo json_encode(["error" => "Datos incompletos o tipo no especificado"]);
    exit;
}

try {
    $tipo = $datos['tipo']; // 'videojuego' o 'dlc'

    if ($tipo === 'videojuego') {
        // Validación básica en servidor
        if (empty($datos['titulo']) || empty($datos['desarrolladora']) ||
            empty($datos['año_lanzamiento']) || !isset($datos['precio']) ||
            !isset($datos['stock']) || empty($datos['genero_id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan campos obligatorios para el videojuego"]);
            exit;
        }

        $vj = new Videojuego(
            null,
            $datos['titulo'],
            $datos['precio'],
            $datos['stock'],
            $datos['desarrolladora'],
            $datos['año_lanzamiento'],
            $datos['genero_id']
        );

        if ($vj->insertar()) {
            echo json_encode([
                "ok"  => true,
                "id"  => $vj->getId(),
                "msg" => "Videojuego añadido correctamente"
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "No se pudo insertar el videojuego"]);
        }

    } elseif ($tipo === 'dlc') {
        if (empty($datos['titulo']) || empty($datos['descripcion']) ||
            !isset($datos['precio']) || !isset($datos['stock']) ||
            empty($datos['juego_base_id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan campos obligatorios para el DLC"]);
            exit;
        }

        $dlc = new DLC(
            null,
            $datos['titulo'],
            $datos['precio'],
            $datos['stock'],
            $datos['descripcion'],
            $datos['juego_base_id']
        );

        if ($dlc->insertar()) {
            echo json_encode([
                "ok"  => true,
                "id"  => $dlc->getId(),
                "msg" => "DLC añadido correctamente"
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "No se pudo insertar el DLC"]);
        }

    } else {
        http_response_code(400);
        echo json_encode(["error" => "Tipo desconocido: usa 'videojuego' o 'dlc'"]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error"    => "Error interno del servidor",
        "detalles" => $e->getMessage()
    ]);
}
?>
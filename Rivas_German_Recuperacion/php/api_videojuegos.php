<?php
// El archivo va a devolver datos limpios (JSON) a JavaScript
header("Content-Type: application/json; charset=utf-8");

// CORRECCIÓN: config.php está en la misma carpeta 'php' según la estructura organizada
require_once __DIR__ . '/config.php';

try {
    // Traemos los videojuegos de la base de datos
    // (Asegúrate de que en config.php la variable de conexión sea $pdo)
    $stmt = $pdo->query("SELECT * FROM videojuegos");
    $videojuegos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Se los enviamos impresos a JavaScript protegiendo tildes y eñes
    echo json_encode($videojuegos, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // Si algo falla en la BD, respondemos con un JSON estructurado para que JS no se rompa
    http_response_code(500);
    echo json_encode([
        "error" => "Error al consultar la base de datos",
        "detalles" => $e->getMessage()
    ]);
}
?>
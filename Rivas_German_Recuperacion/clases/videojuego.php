<?php
require_once 'producto.php';
require_once 'config.php';

class Videojuego extends Producto {

    private $desarrolladora;
    private $año_lanzamiento;
    private $genero_id;

    public function __construct($id, $titulo, $precio, $stock, $desarrolladora, $año_lanzamiento, $genero_id) {
        parent::__construct($id, $titulo, $precio, $stock);
        $this->desarrolladora = $desarrolladora;
        $this->año_lanzamiento = $año_lanzamiento;
        $this->genero_id = $genero_id;
    }

    // GETTERS
    public function getDesarrolladora() { return $this->desarrolladora; }
     public function getGeneroId() { return $this->genero_id; }
    public function getAñoLanzamiento() { return $this->año_lanzamiento; }
    //SETTERS
    public function setDesarrolladora($desarrolladora) { $this->desarrolladora = $desarrolladora; }
    public function setAñoLanzamiento($año_lanzamiento) { $this->año_lanzamiento = $año_lanzamiento; }
    public function setGeneroId($genero_id) { $this->genero_id = $genero_id; }

    
    // Obtener todos los videojuegos
    public static function listar() {
        $db = (new Conexion())->getConexion();
        $sql = "SELECT * FROM videojuegos";
        $resultado = $db->query($sql);
        
        $lista = [];
        while ($fila = $resultado->fetch_assoc()) {
            $lista[] = $fila;
        }
        return $lista;
    }

    // Insertar el videojuego actual
    public function insertar() {
        $db = (new Conexion())->getConexion();
        $stmt = $db->prepare("INSERT INTO videojuegos (titulo, desarrolladora, año_lanzamiento, precio, stock, genero_id) VALUES (?, ?, ?, ?, ?, ?)");
        
        $titulo = $this->getTitulo();
        $precio = $this->getPrecio();
        $stock = $this->getStock();
        
        $stmt->bind_param("sssdii", $titulo, $this->desarrolladora, $this->año_lanzamiento, $precio, $stock, $this->genero_id);
        
        if ($stmt->execute()) {
            $this->id = $db->insert_id;
            return true;
        }
        return false;
    }

    // Eliminar un videojuego por ID
    public static function eliminar($id) {
        $db = (new Conexion())->getConexion();
        $stmt = $db->prepare("DELETE FROM videojuegos WHERE id = ?");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
?>
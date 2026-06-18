<?php
require_once 'producto.php';
require_once 'config.php';

class DLC extends Producto {

    // Propiedades específicas de un DLC
    private $descripcion;
    private $juego_base_id;

    // Constructor
    public function __construct($id, $titulo, $precio, $stock, $descripcion, $juego_base_id) {
        parent::__construct($id, $titulo, $precio, $stock);
        
        // Propiedades específicas de la clase DLC
        $this->descripcion = $descripcion;
        $this->juego_base_id = $juego_base_id;
    }

    // Getters específicos de DLC 
    public function getDescripcion() { return $this->descripcion; }
    public function getJuegoBaseId() { return $this->juego_base_id; }

    // Setters específicos de DLC
    public function setDescripcion($descripcion) { $this->descripcion = $descripcion; }
    public function setJuegoBaseId($juego_base_id) { $this->juego_base_id = $juego_base_id; }


    public function insertar() {

        $db = (new Conexion())->getConexion();
        
        $stmt = $db->prepare("INSERT INTO dlcs (titulo, descripcion, precio, stock, juego_base_id) VALUES (?, ?, ?, ?, ?)");
        
        $titulo = $this->getTitulo();
        $precio = $this->getPrecio();
        $stock = $this->getStock();
        

        $stmt->bind_param("ssdii", $titulo, $this->descripcion, $precio, $stock, $this->juego_base_id);

        if ($stmt->execute()) {
            $this->id = $db->insert_id;
            return true; 
        }
        
        return false; // Error en la inserción
    }


    public static function eliminar($id) {
        $db = (new Conexion())->getConexion();
        $stmt = $db->prepare("DELETE FROM dlcs WHERE id = ?");
        $stmt->bind_param("i", $id);
        
        return $stmt->execute();
    }

    public static function listar() {
    $db = (new Conexion())->getConexion();
    $sql = "SELECT * FROM dlcs";
    $resultado = $db->query($sql);
    
    $lista = [];
    while ($fila = $resultado->fetch_assoc()) {
        $lista[] = $fila;
    }
    return $lista;
}
}
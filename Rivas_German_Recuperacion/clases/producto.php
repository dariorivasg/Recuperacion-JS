<?php
// Clase padre
class Producto {

    // Propiedades comunes a todos los productos
    protected $id;
    protected $titulo;
    protected $precio;
    protected $stock;

    // Constructor
    public function __construct($id, $titulo, $precio, $stock) {
        $this->id = $id;
        $this->titulo = $titulo;
        $this->precio = $precio;
        $this->stock = $stock;
    }

    // GETTERS
    public function getId() { return $this->id; }
    public function getTitulo() { return $this->titulo; }
    public function getPrecio() { return $this->precio; }
    public function getStock() { return $this->stock; }

    // SETTERS
    public function setTitulo($titulo) { $this->titulo = $titulo; }
    public function setPrecio($precio) { $this->precio = $precio; }
    public function setStock($stock) { $this->stock = $stock; }
}
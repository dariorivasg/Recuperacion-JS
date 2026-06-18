<?php

class Conexion {

    private $conexion;

    public function __construct(){
        $this->conexion = new mysqli(
            'localhost',
            'root',
            '',
            'catalogo_videojuegos',
        );

        if ($this-> conexion->connect_error){
            die('Error de conexión :' .$this-> conexion->connect_error);
        }
        
        $this-> conexion->set_charset('utf8');
    }

    public function getConexion(){
        return $this->conexion;
    }
}
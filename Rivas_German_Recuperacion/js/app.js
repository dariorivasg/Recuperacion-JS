// CLASE PADRE: Producto
class Producto{
    constructor(id, titulo, precio, stock){
        this.id = id;
        this.titulo = titulo;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
    }
}

//CLASE HIJA: Videojuego
class Videojuego extends Producto{
    constructor(id, titulo, precio, stock, desarrolladora, año_lanzamiento, genero_id){
        super(id, titulo, precio, stock);

        this.desarrolladora = desarrolladora;
        this.año_lanzamiento = año_lanzamiento;
        this.genero_id = parseInt(genero_id);
    }
}

//CLASE HIJA: DLC
class DLC extends Producto{
    constructor(id, titulo, precio, stock, descripcion, juego_base_id){
        super(id, titulo, precio, stock);

        this.descripcion = descripcion;
        this.juego_base_id = parseInt(juego_base_id);
    }
}

//MOTOR VISUAL: pintarCatalogo
function pintarCatalogo(listaProductos){
    const contenedor = document.getElementById('contenedor-productos')
     //Limpiar el contenedor
     contenedor.innerHTML = '';
     //Recorrer la lista elemento por elemento
     listaProductos.forEach(producto => {
        let datosExclusivos = '';
        //El producto es una instancia de videojuego?
        if(producto instanceof Videojuego){
            datosExclusivos = `
                <p><strong>Desarrollador:</strong> ${producto.desarrolladora}</p>
                <p><strong>Año de lanzamiento:</strong> ${producto.año_lanzamiento}</p>
            `;
        }
        else if (producto instanceof DLC){
            datosExclusivos = `
                <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            `;
        }
        const estructuraTarjeta = `
            <div class="tarjeta-producto">
                <h3>${producto.titulo}</h3>
                
                ${datosExclusivos}
                
                <p class="precio">Precio: <strong>${producto.precio} €</strong></p>
                <p>Stock: ${producto.stock} unidades</p>
            </div>
        `;
        //Añadir la tarjeta a la web
        contenedor.innerHTML += estructuraTarjeta;
     });
}

//MOTOR ASINCRONO: obtenerProductoDeBaseDeDatos
async function obtenerProductosDeBaseDeDatos(){
    try{
        const [respuestaJuegos, respuestaDlcs] = 
    }
}
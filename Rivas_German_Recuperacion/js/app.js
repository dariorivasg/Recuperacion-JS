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
     // Si la lista está vacía salimos de la función
     if (listaProductos.length === 0){
        contenedor.innerHTML = '<p>No se encontraron productos.</p>';
        return;//Detenemos la ejecucion de la funcion
     }
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
                
                <p class="precio">Precio: <strong>${producto.precio.toFixed(2)} €</strong></p>
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
        //Se lanzan las dos peticiones al mismo tiempo
        const [respuestaJuegos, respuestaDlcs] = await Promise.all([
            //Se hace una peticion HTTP a los archivos para que devuelvan un JSON
            fetch('php/api_videojuegos.php'),
            fetch('php/api_dlcs.php')
        ]);
        //Convertimos las respuestas a arrays de objetos
        const datosJuegos = await respuestaJuegos.json();
        const datosDlcs = await respuestaDlcs.json(); 
        //Cada fila de datos se transforma en un objeto de nuestra clase Videojuego
        const listaVideojuegos = datosJuegos.map(fila =>
            new Videojuego(
                fila.id,
                fila.titulo,
                fila.precio,
                fila.stock,
                fila.desarrolladora,
                fila.año_lanzamiento,
                fila.genero_id
            )
        );
        // Lo mismo para los DLCs
        const listaDlcs = datosDlcs.map(fila =>
            new DLC(
                fila.id,
                fila.titulo,
                fila.precio,
                fila.stock,
                fila.descripcion,
                fila.juego_base_id
            )
        );
        //Se unen los dos arrays
        const todosLosProductos = listaVideojuegos.concat(listaDlcs);
        //Se guarda la lista completa en una variable global para poder usarla en el buscador
        catalogoCompleto = todosLosProductos

        pintarCatalogo(todosLosProductos);
    }catch(error){
        //Error en consola
         console.error('Error al cargar los productos:', error);

        // Aviso al usuario en la página
        document.getElementById('contenedor-productos').innerHTML =
            '<p>Error al cargar los productos. Revisa la consola para más detalles.</p>';
    }
}

//BUSCADOR: Filtra las tarjetas según lo que escribe el usuario

// Variable global que guarda todos los productos para poder filtrarlos
let catalogoCompleto = [];
// Buscamos el input del buscador en el HTML
const inputBuscador = document.getElementById('buscador');
//Escucha si hay un evento
inputBuscador.addEventListener('input', function (){
    //Texto a minusculas
    const textoBusqueda = inputBuscador.value.toLowerCase();
    //Se filtra el catalogo completo
    const productosFiltrados = catalogoCompleto.filter(producto =>
        producto.titulo.toLowerCase().includes(textoBusqueda)
    );
    pintarCatalogo(productosFiltrados);
});

//INICIO
//Cuando la página termina de cargarse, pedimos los productos
document.addEventListener('DOMContentLoaded', function(){
    obtenerProductosDeBaseDeDatos();
});
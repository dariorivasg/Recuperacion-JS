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

// Variable global para guardar los productos
let catalogoCompleto = [];

// ALTERNAR FORMULARIO Y CAMPOS OBLIGATORIOS (AÑADIDO)
// Esta función decide qué div se muestra y qué campos son obligatorios
function actualizarCamposFormulario() {
    //Videojuego o DLC
    const tipo = document.getElementById('tipo-producto').value;

    if (tipo === 'videojuego') {
        // Mostrar videojuego, ocultar DLC
        document.getElementById('campos-videojuego').style.display = 'block';
        document.getElementById('campos-dlc').style.display = 'none';
        
        // Obligatorios de videojuego a true, los de DLC a false
        document.getElementById('campo-desarrolladora').required = true;
        document.getElementById('campo-año').required = true;
        document.getElementById('campo-genero').required = true;
        
        document.getElementById('campo-descripcion').required = false;
        document.getElementById('campo-juego-base').required = false;
    } else {
        // Mostrar DLC, ocultar videojuego
        document.getElementById('campos-videojuego').style.display = 'none';
        document.getElementById('campos-dlc').style.display = 'block';
        
        // Obligatorios de videojuego a false, los de DLC a true
        document.getElementById('campo-desarrolladora').required = false;
        document.getElementById('campo-año').required = false;
        document.getElementById('campo-genero').required = false;
        
        document.getElementById('campo-descripcion').required = true;
        document.getElementById('campo-juego-base').required = true;
    }
}
document.getElementById('tipo-producto').addEventListener('change', actualizarCamposFormulario);


//PINTAR EL CATÁLOGO EN HTML
function pintarCatalogo(listaProductos){
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    if (listaProductos.length === 0){
        contenedor.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    listaProductos.forEach(producto => {
        let datosExclusivos = '';
        let tipoProducto = '';
        let textoEtiqueta = ''; //Para poner "Videojuego" o "DLC" en la tarjeta

        if(producto instanceof Videojuego){
            tipoProducto = 'videojuego';
            textoEtiqueta = 'Videojuego'; 
            datosExclusivos = `
                <p><strong>Desarrollador:</strong> ${producto.desarrolladora}</p>
                <p><strong>Año de lanzamiento:</strong> ${producto.año_lanzamiento}</p>
            `;
        }
        else if (producto instanceof DLC){
            tipoProducto = 'dlc';
            textoEtiqueta = 'DLC'; 
            datosExclusivos = `
                <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            `;
        }
        
        // AÑADIDO: Ponemos la etiqueta de texto al principio de la tarjeta
        contenedor.innerHTML += `
            <div class="tarjeta-producto ${tipoProducto}">
                <span class="etiqueta-tipo ${tipoProducto}-color">${textoEtiqueta}</span>
                <h3>${producto.titulo}</h3>
                ${datosExclusivos}
                <p class="precio">Precio: <strong>${producto.precio.toFixed(2)} €</strong></p>
                <p>Stock: ${producto.stock} unidades</p>
                <button class="boton-eliminar" data-id="${producto.id}" data-tipo="${tipoProducto}">Eliminar</button>
            </div>
        `;
    });
}


// PEDIR DATOS AL BACKEND (PHP)
async function obtenerProductosDeBaseDeDatos(){
    try {
        catalogoCompleto = []; // Vaciamos la lista principal

        // Pedimos los videojuegos
        const respuestaJuegos = await fetch('php/api_videojuegos.php');
        const datosJuegos = await respuestaJuegos.json();
        
        // Pedimos los DLCs
        const respuestaDlcs = await fetch('php/api_dlcs.php');
        const datosDlcs = await respuestaDlcs.json();

        // Recorremos los juegos y los metemos en la lista
        datosJuegos.forEach(fila => {
            let juego = new Videojuego(fila.id, fila.titulo, fila.precio, fila.stock, fila.desarrolladora, fila.año_lanzamiento, fila.genero_id);
            catalogoCompleto.push(juego);
        });

        // Recorremos los DLCs y los metemos en la lista
        datosDlcs.forEach(fila => {
            let dlc = new DLC(fila.id, fila.titulo, fila.precio, fila.stock, fila.descripcion, fila.juego_base_id);
            catalogoCompleto.push(dlc);
        });

        pintarCatalogo(catalogoCompleto);
        
        // Rellenar el select de juegos base para el formulario de DLC
        const campoJuegoBase = document.getElementById('campo-juego-base');
        campoJuegoBase.innerHTML = '';
        datosJuegos.forEach(juego => {
            campoJuegoBase.innerHTML += `<option value="${juego.id}">${juego.titulo}</option>`;
        });

    } catch(error) {
        console.error('Error:', error);
        document.getElementById('contenedor-productos').innerHTML = '<p>Error al cargar.</p>';
    }
}

// Pedir géneros y rellenar el <select> del formulario
async function cargarGeneros() {
    try {
        const respuesta = await fetch('php/api_generos.php');
        const generos = await respuesta.json();
        
        const campoGenero = document.getElementById('campo-genero');
        campoGenero.innerHTML = '';
        generos.forEach(g => {
            campoGenero.innerHTML += `<option value="${g.id}">${g.nombre}</option>`;
        });
    } catch (error) {
        console.error('Error al cargar géneros:', error);
    }
}



// BUSCADOR 
document.getElementById('btn-buscar').addEventListener('click', function() {
    const textoBusqueda = document.getElementById('buscador').value.toLowerCase().trim();
    
    // Filtramos la lista completa
    const productosFiltrados = catalogoCompleto.filter(producto =>
        producto.titulo.toLowerCase().includes(textoBusqueda)
    );
    
    pintarCatalogo(productosFiltrados);
});



// INSERTAR PRODUCTO 
document.getElementById('formulario-producto').addEventListener('submit', async function(evento) {
    evento.preventDefault(); // Evita que la página se recargue

    // Preparamos el objeto con los datos comunes
    let datos = {
        tipo: document.getElementById('tipo-producto').value,
        titulo: document.getElementById('campo-titulo').value,
        precio: parseFloat(document.getElementById('campo-precio').value),
        stock: parseInt(document.getElementById('campo-stock').value)
    };

    // Añadimos los datos específicos según el tipo
    if (datos.tipo === 'videojuego') {
        datos.desarrolladora = document.getElementById('campo-desarrolladora').value;
        datos.año_lanzamiento = document.getElementById('campo-año').value;
        datos.genero_id = parseInt(document.getElementById('campo-genero').value);
    } else {
        datos.descripcion = document.getElementById('campo-descripcion').value;
        datos.juego_base_id = parseInt(document.getElementById('campo-juego-base').value);
    }

    try {
        // Enviamos al PHP
        const respuesta = await fetch('php/api_insertar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //lo convertimos a string JSON para enviarlo
            body: JSON.stringify(datos)
        });
        const resultado = await respuesta.json();

        if (resultado.ok) {
            document.getElementById('mensaje-formulario').textContent = "Añadido correctamente";
            document.getElementById('formulario-producto').reset(); // Limpiar formulario
            actualizarCamposFormulario(); // Resetear los obligatorios
            obtenerProductosDeBaseDeDatos(); // Recargar la lista
        } else {
            document.getElementById('mensaje-formulario').textContent = "Error al guardar";
        }
    } catch (error) {
        console.error(error);
    }
});



// ELIMINAR PRODUCTO (AÑADIDO COMPLETO)
document.getElementById('contenedor-productos').addEventListener('click', async function(evento) {
    // Si no han hecho clic en un botón eliminar, no hacemos nada
    if (!evento.target.classList.contains('boton-eliminar')) return;

    // Sacamos los datos del botón
    const id = evento.target.dataset.id;
    const tipo = evento.target.dataset.tipo;

    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;

    try {
        // Enviamos al PHP
        const respuesta = await fetch('php/api_eliminar.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            // Se envia el ID y el tipo para que el servidor sepa qué borrar.
            body: JSON.stringify({ tipo: tipo, id: id })
        });
        const resultado = await respuesta.json();

        if (resultado.ok) {
            obtenerProductosDeBaseDeDatos(); // Recargar la lista
        } else {
            alert('No se pudo eliminar de la base de datos.');
        }
    } catch (error) {
        console.error(error);
    }
});



// INICIO DEL SCRIPT
document.addEventListener('DOMContentLoaded', function() {
    actualizarCamposFormulario(); // Preparar formulario
    cargarGeneros();              // Cargar desplegable géneros
    obtenerProductosDeBaseDeDatos(); // Cargar la tienda
});
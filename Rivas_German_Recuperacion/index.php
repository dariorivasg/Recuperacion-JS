<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Videojuegos y DLCs</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>

    <header>
        <h1>Gestor de Catálogo: Videojuegos y DLCs</h1>
        
        <div class="buscador-seccion">
            <label for="buscador">Filtrar por título:</label>
            <input type="text" id="buscador" placeholder="Escribe para buscar...">
        </div>
    </header>

    <main class="contenedor-principal">
        
        <section id="seccion-formulario">
            <h2>Añadir Producto</h2>
            <p class="texto-ayuda">(Aquí construiremos el formulario dinámico en el siguiente paso)</p>
        </section>

        <hr>

        <section id="seccion-catalogo">
            <h2>Productos en Tienda</h2>
            
            <div id="contenedor-productos" class="grid-productos">
                <p>Cargando productos...</p> 
            </div>
        </section>

    </main>

    <footer>
        <p>Dario Rivas - 1º DAW</p>
    </footer>

    <script src="js/app.js"></script>
</body>
</html>
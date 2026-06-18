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
            <button id="btn-buscar">Buscar</button>
        </div>
    </header>

    <main class="contenedor-principal">
        
        <section id="seccion-formulario">
            <h2>Añadir Producto</h2>

            <form id="formulario-producto">
                <label for="tipo-producto">Tipo de producto:</label>
                <select id="tipo-producto">
                    <option value="videojuego">Videojuego</option>
                    <option value="dlc">DLC</option>
                </select>

                <label for="campo-titulo">Título:</label>
                <input type="text" id="campo-titulo" required>

                <label for="campo-precio">Precio (€):</label>
                <input type="number" id="campo-precio" step="0.01" min="0" required>

                <label for="campo-stock">Stock:</label>
                <input type="number" id="campo-stock" min="0" required>

                <div id="campos-videojuego">
                    <label for="campo-desarrolladora">Desarrolladora:</label>
                    <input type="text" id="campo-desarrolladora">

                    <label for="campo-año">Año de lanzamiento:</label>
                    <input type="number" id="campo-año" maxlength="4">

                    <label for="campo-genero">Género:</label>
                    <select id="campo-genero"></select>
                </div>

                <div id="campos-dlc" style="display: none;">
                    <label for="campo-descripcion">Descripción:</label>
                    <input type="text" id="campo-descripcion">

                    <label for="campo-juego-base">Juego base:</label>
                    <select id="campo-juego-base"></select>
                </div>

                <button type="submit">Añadir producto</button>
                <p id="mensaje-formulario" class="texto-ayuda"></p>
            </form>
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
        <p>© 2026 - Catálogo de Videojuegos DAW</p>
    </footer>

    <script src="js/app.js"></script>
</body>
</html>
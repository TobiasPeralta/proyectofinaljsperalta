const contenedorCart = document.querySelector('.contenedor__cart');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarCarrito() {
    contenedorCart.innerHTML = ''; 
    if (carrito.length === 0) {
        contenedorCart.innerHTML = '<p class="text__cart">Aun no has agregado articulos a tu carrito</p>';
        return;
    }

    carrito.forEach((articulo, index) => {
        const articuloHTML = `
        <div class="producto__cart">
            <img src="${articulo.imagen}" alt="${articulo.titulo}">
            <div class="producto-body">
                <h2 class="titulo">${articulo.titulo}</h2>
                <p class="precio">${articulo.precio}</p>
                <button class="boton__eliminar" data-index="${index}"><i class="bi bi-cart-dash-fill"></i></button>
            </div>
        </div>
        `;
        contenedorCart.innerHTML += articuloHTML;
    });

    const botonesEliminar = document.querySelectorAll('.boton__eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            eliminarDelCarrito(index);
        });
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    guardarCarrito(); 
    mostrarCarrito(); 
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

mostrarCarrito();

const carritoCont = document.querySelector('.carrito-cont');

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log("Carrito cargado desde localStorage:", carrito); 

    if (carrito.length === 0) {
        carritoCont.innerHTML = `<p>Aún no has agregado artículos</p>`;
    } else {
        carritoCont.innerHTML = '';
        carrito.forEach(articulo => {
            console.log("Artículo en el carrito:", articulo); 
            const articuloHTML = `
            <div class="articulo-carrito">
                <img src="${articulo.imagen}" alt="${articulo.titulo}">
                <h3>${articulo.titulo}</h3>
                <p>${articulo.precio}</p>
                <button class="eliminar"><i class="bi bi-cart-dash-fill"></i><button>
            </div>
            `;
            carritoCont.innerHTML += articuloHTML;
        });
    }
}

mostrarCarrito();

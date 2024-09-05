
const articulosCont = document.querySelector('.articulos-cont');
let articulos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function cargarArticulos(articulos) {
    articulosCont.innerHTML = '';

    articulos.forEach(articulo => {
        const articuloHTML = `
        <section class="productos">
            <article class="producto">
                <img src="${articulo.imagen}" alt="${articulo.titulo}">
                <div class="producto-body">
                    <h2 class="titulo">${articulo.titulo}</h2>
                    <p class="precio">${articulo.precio}</p>
                    <div class="botones__art">
                        <button class="boton__cart__agregar"><i class="bi-cart-plus-fill"></i><p class="textbtn">Agregar al carrito</p></button>
                        <button class="boton__cart__comprar"><i class="bi bi-currency-dollar"></i><p class="textbtn">Comprar ahora</p></button>
                    </div>
                </div>
            </article>
        </section>
        `;
        
        articulosCont.innerHTML += articuloHTML;
    });
    const botonesAgregar = document.querySelectorAll('.boton__cart__agregar');
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            const articuloSeleccionado = articulos[index];
            carrito.push(articuloSeleccionado);
            guardarCarrito();
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000,
                gravity: "bottom", 
                position: "right", 
                backgroundColor: "#4CAF50",
            }).showToast();
        });
    });
    const botonesComprar = document.querySelectorAll('.boton__cart__comprar');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            Swal.fire({
                title: 'Gracias por tu compra',
                text: 'Tu pedido ha sido procesado con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        });
    });
}
function filtrarArticulos(categoriaId) {
    const articulosFiltrados = articulos.filter(articulo => articulo.categoria.id === categoriaId);
    cargarArticulos(articulosFiltrados);
}

fetch('./app.js/articulos.json')
    .then(response => response.json())
    .then(data => {
        articulos = data;
        cargarArticulos(articulos);  
    })
    .catch(error => {
        console.error('Error al cargar los artículos:', error);
    });

document.querySelectorAll('.botones__nav').forEach(boton => {
    boton.addEventListener('click', (event) => {
        const categoriaId = event.target.id; 
        if (categoriaId === 'articulos') {
            cargarArticulos(articulos);  
        } else {
            filtrarArticulos(categoriaId);  
        }
    });
});


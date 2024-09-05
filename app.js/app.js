
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
                    <button class="boton__cart"><i class="bi-cart-plus-fill"></i></button>
                </div>
            </article>
        </section>
        `;
        
        articulosCont.innerHTML += articuloHTML;
    });

    const botonesAgregar = document.querySelectorAll('.boton__cart');
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            agregarAlCarrito(articulos[index]);
        });
    });
}

function agregarAlCarrito(articulo) {
    carrito.push(articulo);
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    alert(`${articulo.titulo} ha sido agregado al carrito`);
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

const productos =
    JSON.parse(localStorage.getItem("productos")) || [];

const carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];

const productosFijos = [
    {
        nombre: "Set de herramientas manuales",
        precio: 16500,
        imagen: "img/Set Herramientas.webp",
        descuento: 20,
        fechaOferta: "2026-09-08"
    },
    {
        nombre: "Concertina Alambre Púas",
        precio: 15000,
        imagen: "img/Concertina_Alambre_Puas.webp",
        descuento: 15,
        fechaOferta: "2026-09-08"
    },
    {
        nombre: "Rollo aislante aluminio 1,20 m x 10 m",
        precio: 6990,
        imagen: "img/Rollo_aislante_aluminio.webp",
        descuento: 25,
        fechaOferta: "2026-09-08"
    },
    {
        nombre: "Panel PVC con revestimiento de metal",
        precio: 5750,
        imagen: "img/Panel_Pvc.webp",
        descuento: 10,
        fechaOferta: "2026-09-10"
    },
    {
        nombre: "Panel metal con revestimiento de madera",
        precio: 8500,
        imagen: "img/Panel_metal_look_madera.webp",
        descuento: 20,
        fechaOferta: "2026-09-11"
    },
    {
        nombre: "Plancha de yeso cartón",
        precio: 9990,
        imagen: "img/Plancha_yeso_carton.webp",
        descuento: 15,
        fechaOferta: "2026-09-12"
    },
    {
        nombre: "Pegamento para madera",
        precio: 7000,
        imagen: "img/Pegamento_para_Madera.webp",
        descuento: 10,
        fechaOferta: "2026-09-13"
    },
    {
        nombre: "Taladro atornillador",
        precio: 15500,
        imagen: "img/Taladro.webp",
        descuento: 30,
        fechaOferta: "2026-09-14"
    },
    {
        nombre: "Mortero impermeabilizante 500 g",
        precio: 12750,
        imagen: "img/Mortero_Impermeabilizante.webp",
        descuento: 20,
        fechaOferta: "2026-09-15"
    }
];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function mostrarCatalogo() {
    const contenedor =
        document.getElementById("contenedorProductos");

    if (!contenedor) {
    return;
    }

    contenedor.innerHTML = "";

    const todosLosProductos = productosFijos.concat(productos);

    todosLosProductos.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "col-md-3 product-card";
        tarjeta.dataset.fecha = producto.fechaOferta;
        tarjeta.dataset.descuento = producto.descuento;

        tarjeta.innerHTML = `
            <div class="card">
                <img src="${producto.imagen || "img/producto_default.jpg"}"
                    class="card-img-top"
                    alt="${producto.nombre}">

                <div class="card-body">
                    <h5>${producto.nombre}</h5>
                    <p class="precio">$${producto.precio}</p>
                    <p>Categoría: ${producto.categoria || "Sin categoría"}</p>
                    <p class="oferta" hidden></p>

                    <button type="button"
                            class="btn btn-primary btn-carrito">
                        Comprar
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });

    activarBotonesComprar();
    actualizarProductos();
}
    

setInterval(actualizarProductos, 60000);
actualizarProductos();






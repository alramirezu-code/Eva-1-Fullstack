const productos =
    JSON.parse(localStorage.getItem("productos")) || [];

const carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];
<<<<<<< HEAD
=======

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
>>>>>>> 5adbfa0961cd50cf1ac14a3ff83eca704ff6b247

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

// ==========================================
// 2. LÓGICA DEL CARRITO DE COMPRAS
// ==========================================

function mostrarToast(mensaje, icono = "🛒") {
    const toast = document.getElementById("toast-notificacion");
    const toastMensaje = document.getElementById("toast-mensaje");
    const toastIcono = document.getElementById("toast-icono");

    if (!toast) return;

    if (toastMensaje) toastMensaje.textContent = mensaje;
    if (toastIcono) toastIcono.textContent = icono;

    toast.classList.add("mostrar");

    setTimeout(() => {
        toast.classList.remove("mostrar");
    }, 3000);
}

function obtenerCarrito() {
    try {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch (e) {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const resumenCarrito = document.getElementById("resumen-carrito");
    if (!listaCarrito) return;

    const carrito = obtenerCarrito();
    listaCarrito.innerHTML = "";
    if (resumenCarrito) resumenCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <div class="carrito-vacio">
                <h3>Tu carrito está vacío.</h3>
                <p>Agrega productos desde nuestro catálogo para continuar.</p>
                <button class="boton" onclick="cambiarSeccion('productos')">Ver productos</button>
            </div>
        `;
        return;
    }

    carrito.forEach((prod, i) => {
        const item = document.createElement("article");
        item.classList.add("producto-carrito");
        item.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <div class="informacion-carrito">
                <h3>${prod.nombre}</h3>
                <p>$${prod.precio.toLocaleString("es-CL")}</p>
                <div class="cantidad">
                    <button onclick="cambiarCantidad(${i}, -1)">-</button>
                    <span>${prod.cantidad}</span>
                    <button onclick="cambiarCantidad(${i}, 1)">+</button>
                </div>
            </div>
            <button class="boton-eliminar" onclick="eliminarProducto(${i})">Eliminar</button>
        `;
        listaCarrito.appendChild(item);
    });

    let total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    if (resumenCarrito) {
        resumenCarrito.innerHTML = `
            <div class="total-carrito">
                <h3>Total: $${total.toLocaleString("es-CL")}</h3>
                <button class="boton-vaciar" onclick="vaciarCarrito()">Vaciar carrito</button>
                <button class="boton-finalizar" onclick="finalizarCompra()">Finalizar compra</button>
            </div>
        `;
    }
}
    

setInterval(actualizarProductos, 60000);
actualizarProductos();


function cambiarCantidad(i, cambio) {
    let c = obtenerCarrito();
    if (c[i]) {
        c[i].cantidad += cambio;
        if (c[i].cantidad <= 0) c.splice(i, 1);
        guardarCarrito(c);
        mostrarCarrito();
    }
}

function eliminarProducto(i) {
    let c = obtenerCarrito();
    c.splice(i, 1);
    guardarCarrito(c);
    mostrarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

function finalizarCompra() {
    const modal = document.getElementById("modal-compra");
    if (modal) {
        modal.classList.add("mostrar");
    }
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

function cerrarModalCompra() {
    const modal = document.getElementById("modal-compra");
    if (modal) {
        modal.classList.remove("mostrar");
    }
}

function mostrarCatalogo() {
    const catalogo = document.getElementById("vista-productos");
    if (!catalogo) return;

    catalogo.innerHTML = "";

    productosFijos.forEach((producto, indice) => {
        const precioOferta = producto.precio -
            producto.precio * producto.descuento / 100;

        catalogo.innerHTML += `
            <article class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}"
                     class="producto-imagen">
                <div class="producto-info">
                    <p class="categoria-producto">Construcción</p>
                    <h3>${producto.nombre}</h3>
                    <p class="precio">
                        $${precioOferta.toLocaleString("es-CL")}
                    </p>
                    <button class="boton-carrito"
                            onclick="agregarAlCarrito(${indice})">
                        Agregar al carrito
                    </button>
                </div>
            </article>
        `;
    });
}

function agregarAlCarrito(indice) {
    const producto = productosFijos[indice];
    const carritoActual = obtenerCarrito();

    const existente = carritoActual.find(
        item => item.nombre === producto.nombre
    );

    const precioOferta = producto.precio -
        producto.precio * producto.descuento / 100;

    if (existente) {
        existente.cantidad++;
    } else {
        carritoActual.push({
            nombre: producto.nombre,
            precio: precioOferta,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito(carritoActual);
    mostrarToast("Producto agregado al carrito");
    mostrarCarrito();
}

function mostrarVista(vista) {
    document.getElementById("vista-productos").style.display =
        vista === "productos" ? "grid" : "none";

    document.getElementById("vista-carrito").style.display =
        vista === "carrito" ? "block" : "none";

    if (vista === "carrito") mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarCatalogo();
}); 
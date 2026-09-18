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

// ==========================================
// LÓGICA DEL CARRITO DE COMPRAS
// ==========================================

// ==========================================
// TOAST NOTIFICACIÓN
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

// ==========================================
// LÓGICA DEL CARRITO (LOCALSTORAGE)
// ==========================================
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
            <div class="carrito-vacio my-4">
                <h3>Tu carrito está vacío.</h3>
                <p>Agrega productos desde nuestro catálogo para continuar.</p>
                <button class="btn btn-primary" onclick="mostrarVista('productos')">Ver productos</button>
            </div>
        `;
        return;
    }

    carrito.forEach((prod, i) => {
        const item = document.createElement("article");
        item.classList.add("producto-carrito", "d-flex", "align-items-center", "mb-3", "p-2", "border", "rounded");
        item.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 70px; height: 70px; object-fit: cover; background: #fff; border-radius: 4px;">
            <div class="informacion-carrito ms-3 me-auto text-start">
                <h4 class="m-0">${prod.nombre}</h4>
                <p class="m-0">$${prod.precio.toLocaleString("es-CL")}</p>
                <div class="cantidad d-flex align-items-center gap-2 mt-1">
                    <button class="btn btn-sm btn-outline-light" onclick="cambiarCantidad(${i}, -1)">-</button>
                    <span>${prod.cantidad}</span>
                    <button class="btn btn-sm btn-outline-light" onclick="cambiarCantidad(${i}, 1)">+</button>
                </div>
            </div>
            <button class="btn btn-danger btn-sm ms-2" onclick="eliminarProducto(${i})">Eliminar</button>
        `;
        listaCarrito.appendChild(item);
    });

    let total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    if (resumenCarrito) {
        resumenCarrito.innerHTML = `
            <div class="total-carrito border-top pt-3 mt-3">
                <h3>Total: $${total.toLocaleString("es-CL")}</h3>
                <button class="btn btn-secondary me-2" onclick="vaciarCarrito()">Vaciar carrito</button>
                <button class="btn btn-success" onclick="finalizarCompra()">Finalizar compra</button>
            </div>
        `;
    }
}

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
    alert("¡Gracias por tu compra!");
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

// ==========================================
// CONTROL DE VISTAS (PRODUCTOS / CARRITO)
// ==========================================
function mostrarVista(vista) {
    const vistaProd = document.getElementById("vista-productos");
    const vistaCarr = document.getElementById("vista-carrito");

    if (vistaProd) vistaProd.style.display = (vista === "productos") ? "flex" : "none";
    if (vistaCarr) vistaCarr.style.display = (vista === "carrito") ? "block" : "none";

    if (vista === "carrito") mostrarCarrito();
}

// ==========================================
// INICIALIZACIÓN Y EVENTOS DE BOTONES
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    mostrarCarrito();

    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("boton-carrito")) {
            const tarjeta = e.target.closest(".producto");
            if (!tarjeta) return;

            const elNombre = tarjeta.querySelector("h3");
            const elPrecio = tarjeta.querySelector(".precio");
            const elImagen = tarjeta.querySelector("img");

            const nombre = elNombre ? elNombre.textContent.trim() : "Producto";
            let precioNum = 0;
            if (elPrecio) {
                precioNum = Number(elPrecio.textContent.replace(/[^0-9]/g, "")) || 0;
            }

            // Usar getAttribute para no alterar la ruta relativa img/...
            const imagen = elImagen ? elImagen.getAttribute("src") : "";

            const producto = {
                nombre: nombre,
                precio: precioNum,
                imagen: imagen,
                cantidad: 1
            };

            let carrito = obtenerCarrito();
            const existe = carrito.find(item => item.nombre === nombre);

            if (existe) {
                existe.cantidad++;
            } else {
                carrito.push(producto);
            }

            guardarCarrito(carrito);
            mostrarToast(`¡${nombre} agregado al carrito!`, "🛒");
        }
    });
});
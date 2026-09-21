const productos =
    JSON.parse(localStorage.getItem("productos")) || [];

const carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];

// ==========================================
// LISTA DE PRODUCTOS
// ==========================================

const productosFijos = [
    {
        codigo: "PRO001",
        nombre: "Set de herramientas manuales",
        descripcion: "Set de herramientas manuales para el hogar y trabajos de mantención. Reúne las herramientas básicas para armar, ajustar, apretar y reparar, en un solo kit fácil de guardar y transportar.",
        precio: 16500,
        stock: 20,
        stockCritico: 5,
        categoria: "Herramientas",
        imagen: "img/Set Herramientas.webp"
    },
    {
        codigo: "PRO002",
        nombre: "Concertina Alambre Púas",
        descripcion: "Rollo de concertina de alambre de púas para reforzar cierres perimetrales de terrenos, bodegas y recintos. Se instala sobre muros o rejas como barrera adicional. Manipular con guantes de protección.",
        precio: 15000,
        stock: 15,
        stockCritico: 5,
        categoria: "Materiales",
        imagen: "img/Concertina_Alambre_Puas.webp"
    },
    {
        codigo: "PRO003",
        nombre: "Rollo aislante aluminio 1,20 m x 10 m",
        descripcion: "Rollo aislante térmico de aluminio de 1,20 m x 10 m. Se instala bajo techumbres y en muros para reducir la pérdida de calor en invierno y el ingreso de calor en verano.",
        precio: 6990,
        stock: 20,
        stockCritico: 5,
        categoria: "Materiales",
        imagen: "img/Rollo_aislante_aluminio.webp"
    },
    {
        codigo: "PRO004",
        nombre: "Panel PVC con revestimiento de metal",
        descripcion: "Panel de PVC con revestimiento de metal para muros y cielos. Es resistente a la humedad, tiene un acabado decorativo y es fácil de limpiar.",
        precio: 5750,
        stock: 25,
        stockCritico: 5,
        categoria: "Materiales",
        imagen: "img/Panel_Pvc.webp"
    },
    {
        codigo: "PRO005",
        nombre: "Panel metal con revestimiento de madera",
        descripcion: "Panel metálico con terminación tipo madera para revestir muros y cielos. Da la apariencia de la madera con la resistencia del metal y sin necesidad de barnizado.",
        precio: 8500,
        stock: 15,
        stockCritico: 5,
        categoria: "Materiales",
        imagen: "img/Panel_metal_look_madera.webp"
    },
    {
        codigo: "PRO006",
        nombre: "Plancha de yeso cartón",
        descripcion: "Plancha de yeso cartón para construir tabiques, cielos falsos y revestimientos interiores. Deja una superficie lisa lista para masillar y pintar.",
        precio: 9990,
        stock: 30,
        stockCritico: 10,
        categoria: "Materiales",
        imagen: "img/Plancha_yeso_carton.webp"
    },
    {
        codigo: "PRO007",
        nombre: "Pegamento para madera",
        descripcion: "Adhesivo para trabajos en madera, útil en carpintería, reparación de muebles y manualidades. Genera uniones firmes y es fácil de aplicar.",
        precio: 7000,
        stock: 20,
        stockCritico: 5,
        categoria: "Adhesivos",
        imagen: "img/Pegamento_para_Madera.webp"
    },
    {
        codigo: "PRO008",
        nombre: "Taladro atornillador",
        descripcion: "Taladro atornillador para trabajos de construcción y mantención. Permite perforar y atornillar con un solo equipo. Usar con elementos de protección personal.",
        precio: 15500,
        stock: 10,
        stockCritico: 3,
        categoria: "Herramientas",
        imagen: "img/Taladro.webp"
    },
    {
        codigo: "PRO009",
        nombre: "Mortero impermeabilizante 500 g",
        descripcion: "Mortero impermeabilizante de 500 g para sellar superficies frente a la humedad y filtraciones. Se usa en muros, terrazas y zonas expuestas al agua.",
        precio: 12750,
        stock: 15,
        stockCritico: 5,
        categoria: "Materiales",
        imagen: "img/Mortero_Impermeabilizante.webp"
    }
];

// Mapeo de comunas por región
const comunasPorRegion = {
  "RM": ["Santiago", "La Florida", "Maipú", "Providencia", "Puente Alto"],
  "ARAUCANIA": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"],
  "NUBLE": ["Chillán", "Linares", "Longaví", "Concepción"]
};


// ==========================================
// MOSTRAR PRODUCTOS EN EL CATÁLOGO
// ==========================================

function mostrarProductos() {

    const contenedor = document.getElementById("vista-productos");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    const todosLosProductos = productosFijos.concat(productos);

    todosLosProductos.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}"
            alt="${producto.nombre}"
            class="producto-imagen">

            <div class="producto-info">

                <p class="categoria-producto">
                    ${producto.categoria}
                </p>

                <h3>${producto.nombre}</h3>

                <p class="precio">
                    $${producto.precio.toLocaleString("es-CL")}
                </p>

                <a href="detalle producto.html?codigo=${producto.codigo}"
                class="btn btn-light mb-2">
                    Ver detalle
                </a>

                <button class="boton-carrito">
                    Agregar al carrito
                </button>

            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// ==========================================
// MOSTRAR DETALLE DEL PRODUCTO
// ==========================================

function mostrarDetalleProducto() {
    const contenedor = document.getElementById("detalleProducto");
    if (!contenedor) return;
    const parametros = new URLSearchParams(window.location.search);
    const codigo = parametros.get("codigo");
    if (!codigo) {
        contenedor.innerHTML = `
            <div class="alert alert-warning text-center">
                <p class="m-0">No se especificó ningún producto.</p>
                <a href="productos.html" class="btn btn-primary mt-2">Ir al catálogo</a>
            </div>
        `;
        return;
    }
    const todosLosProductos = productosFijos.concat(productos);
    // Búsqueda más segura (limpia espacios y no distingue mayúsculas/minúsculas)
    const producto = todosLosProductos.find(
        p => p.codigo && p.codigo.trim().toUpperCase() === codigo.trim().toUpperCase()
    );
    if (!producto) {
        contenedor.innerHTML = `
            <div class="alert alert-danger text-center">
                <p class="m-0">Producto con código "<strong>${codigo}</strong>" no encontrado.</p>
                <a href="productos.html" class="btn btn-secondary mt-2">Volver a productos</a>
            </div>
        `;
        return;
    }
    contenedor.innerHTML = `
        <article class="producto detalle-producto card p-4 shadow-sm">
            <div class="row g-4 align-items-center">
                <div class="col-md-5 text-center">
                    <img src="${producto.imagen}"
                         alt="${producto.nombre}"
                         class="img-fluid rounded producto-imagen"
                         style="max-height: 350px; object-fit: contain;">
                </div>
                <div class="col-md-7 producto-info">
                    <span class="badge bg-secondary mb-2">${producto.categoria}</span>
                    <h3 class="fw-bold">${producto.nombre}</h3>
                    <p class="text-muted">${producto.descripcion}</p>
                    <p class="precio text-success fw-bold fs-3">$${producto.precio.toLocaleString("es-CL")}</p>
                    <p class="mb-3"><strong>Stock disponible:</strong> ${producto.stock} unidades</p>
                    
                    <div class="d-flex gap-2">
                        <button class="btn btn-success boton-carrito">
                            Agregar al carrito
                        </button>
                        <a href="productos.html" class="btn btn-outline-secondary">
                            Volver a productos
                        </a>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// ==========================================
// MOSTRAR PRODUCTOS EN EL INICIO
// ==========================================

function mostrarProductosInicio() {

    const contenedor =
        document.getElementById("productos-destacados");

    if (!contenedor) return;


    // Mostrar solo los primeros 4 productos
    const productosInicio =
        productosFijos.slice(0, 4);


    productosInicio.forEach(producto => {

        const tarjeta =
            document.createElement("article");

        tarjeta.classList.add("producto");


        tarjeta.innerHTML = `
            <img src="${producto.imagen}"
                 alt="${producto.nombre}"
                 class="producto-imagen">

            <div class="producto-info">

                <p class="categoria-producto">
                    ${producto.categoria}
                </p>

                <h3>${producto.nombre}</h3>

                <p class="precio">
                    $${producto.precio.toLocaleString("es-CL")}
                </p>

            </div>
        `;


        contenedor.appendChild(tarjeta);

    });

}

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
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Guardar la orden para que aparezca en el panel de administración
    const usuario = obtenerUsuarioActivo();
    const ordenes = obtenerOrdenes();

    ordenes.push({
        id: "ORD-" + String(ordenes.length + 1).padStart(4, "0"),
        fecha: new Date().toLocaleString("es-CL"),
        cliente: usuario ? usuario.nombre : "Invitado",
        correo: usuario ? usuario.correo : "-",
        estado: "Pendiente",
        total: carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0),
        productos: carrito
    });

    localStorage.setItem("ordenes", JSON.stringify(ordenes));

    alert("¡Gracias por tu compra!");
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

// ==========================================
// ADMIN: ÓRDENES
// ==========================================
function obtenerOrdenes() {
    try {
        return JSON.parse(localStorage.getItem("ordenes")) || [];
    } catch (e) {
        return [];
    }
}

function listarOrdenes() {
    const cuerpo = document.getElementById("tbody-ordenes");
    if (!cuerpo) return;

    const ordenes = obtenerOrdenes();
    cuerpo.innerHTML = "";

    if (ordenes.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="6" class="text-center">Aún no hay órdenes registradas.</td></tr>`;
        return;
    }

    // Las más recientes primero
    ordenes.slice().reverse().forEach(o => {
        cuerpo.innerHTML += `
            <tr>
                <td>${o.id}</td>
                <td>${o.fecha}</td>
                <td>${o.cliente}</td>
                <td>$${o.total.toLocaleString("es-CL")}</td>
                <td><span class="badge bg-warning text-dark">${o.estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="verDetalleOrden('${o.id}')">Ver detalle</button>
                </td>
            </tr>
        `;
    });
}

function verDetalleOrden(id) {
    const orden = obtenerOrdenes().find(o => o.id === id);
    if (!orden) return;

    const filas = orden.productos.map(p => `
        <tr>
            <td>${p.nombre}</td>
            <td>$${p.precio.toLocaleString("es-CL")}</td>
            <td>${p.cantidad}</td>
            <td>$${(p.precio * p.cantidad).toLocaleString("es-CL")}</td>
        </tr>
    `).join("");

    document.getElementById("detalle-orden-contenido").innerHTML = `
        <h2>Orden ${orden.id}</h2>
        <p><strong>Fecha:</strong> ${orden.fecha}</p>
        <p><strong>Cliente:</strong> ${orden.cliente} (${orden.correo})</p>
        <p><strong>Estado:</strong> ${orden.estado}</p>

        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>${filas}</tbody>
            </table>
        </div>

        <h4 class="text-end">Total: $${orden.total.toLocaleString("es-CL")}</h4>
    `;

    document.getElementById("vista-lista-ordenes").classList.add("d-none");
    document.getElementById("vista-detalle-orden").classList.remove("d-none");
}

function volverListaOrdenes() {
    document.getElementById("vista-detalle-orden").classList.add("d-none");
    document.getElementById("vista-lista-ordenes").classList.remove("d-none");
}

// Botón "Órdenes" del menú: muestra siempre la lista actualizada
function mostrarOrdenes() {
    listarOrdenes();
    volverListaOrdenes();
    mostrarSeccionAdmin("ordenes");
}

// ==========================================
// PANEL DE ADMINISTRADOR
// ==========================================

function listarUsuarios() {

    const cuerpo = document.getElementById("tbody-usuarios");
    if (!cuerpo) return;

    const usuarios = obtenerUsuarios();
    cuerpo.innerHTML = "";

    usuarios.forEach((u, i) => {

        cuerpo.innerHTML += `
            <tr>
                <td>${u.run || "-"}</td>
                <td>${u.nombre}</td>
                <td>${u.correo}</td>
                <td>${u.rol}</td>
                <td>${u.region ? u.region + " / " + u.comuna : "-"}</td>

                <td>
                    <button class="btn btn-warning btn-sm"
                        onclick="editarUsuario(${i})">
                        Editar
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="eliminarUsuario(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

let usuarioEditando = -1;

function cargarComunasAdmin(comunaActual = "") {

    const region = document.getElementById("admUsuario-region");
    const comuna = document.getElementById("admUsuario-comuna");

    comuna.innerHTML =
        '<option value="">-- Seleccione comuna --</option>';

    const lista = comunasPorRegion[region.value] || [];

    lista.forEach(nombre => {

        const option = document.createElement("option");

        option.value = nombre.toLowerCase();
        option.textContent = nombre;

        comuna.appendChild(option);
    });

    comuna.disabled = lista.length === 0;

    if (comunaActual) {
        comuna.value = comunaActual.toLowerCase();
    }
}


function nuevoUsuarioAdmin() {

    usuarioEditando = -1;

    const form =
        document.getElementById("formUsuarioAdmin");

    form.reset();

    document.getElementById(
        "admUsuario-comuna"
    ).disabled = true;

    mostrarSeccionAdmin("nuevo-usuario");
}

function editarUsuario(i) {

    const usuarios = obtenerUsuarios();
    const u = usuarios[i];

    if (!u) return;

    usuarioEditando = i;

    document.getElementById("admUsuario-run").value =
        u.run || "";

    document.getElementById("admUsuario-nombre").value =
        u.nombre || "";

    document.getElementById("admUsuario-apellidos").value =
        u.apellidos || "";

    document.getElementById("admUsuario-correo").value =
        u.correo || "";

    document.getElementById("admUsuario-clave").value =
        u.clave || "";

    document.getElementById("admUsuario-rol").value =
        u.rol || "";

    mostrarSeccionAdmin("nuevo-usuario");
}


function eliminarUsuario(i) {

    let usuarios = obtenerUsuarios();
    const activo = obtenerUsuarioActivo();

    if (usuarios[i].correo === activo.correo) {
        alert("No puedes eliminar tu propio usuario.");
        return;
    }

    if (!confirm("¿Eliminar este usuario?")) return;

    usuarios.splice(i, 1);

    guardarUsuarios(usuarios);
    listarUsuarios();
}

function listarProductos() {
    const cuerpo = document.getElementById("tbody-productos");
    if (!cuerpo) return;

    const usuario = obtenerUsuarioActivo();
    const esAdmin = usuario && usuario.rol === "Administrador";

    cuerpo.innerHTML = "";

    // Devuelve el HTML de una fila (editable = creado desde el admin)
    function fila(p, editable) {
        const critico = p.stock <= p.stockCritico
            ? ` <span class="badge bg-warning text-dark">Stock crítico</span>`
            : "";

        let acciones = "";
        if (esAdmin) {
            acciones = editable
                ? `<td>
                       <button class="btn btn-sm btn-warning" data-accion="editar" data-codigo="${p.codigo}">Editar</button>
                       <button class="btn btn-sm btn-danger" data-accion="eliminar" data-codigo="${p.codigo}">Eliminar</button>
                   </td>`
                : `<td><span class="text-muted small">Predeterminado</span></td>`;
        }

        return `
            <tr>
                <td>${p.codigo}</td>
                <td>${p.nombre}</td>
                <td>${p.categoria}</td>
                <td>$${Number(p.precio).toLocaleString("es-CL")}</td>
                <td>${p.stock}${critico}</td>
                ${acciones}
            </tr>
        `;
    }

    productosFijos.forEach(p => cuerpo.innerHTML += fila(p, false));
    productos.forEach(p => cuerpo.innerHTML += fila(p, true));
}

// ==========================================
// ADMIN: AGREGAR, EDITAR Y ELIMINAR PRODUCTOS
// ==========================================

// Reglas de validación según el anexo (devuelven "" si el valor es correcto)
const reglasProductoAdmin = {
    codigo: function (v) {
        const editando = document.getElementById("adm-editando").value;
        if (v === "") return "El código es obligatorio.";
        if (v.length < 3) return "El código debe tener al menos 3 caracteres.";
        const repetido = productosFijos.concat(productos).some(
            p => p.codigo.toLowerCase() === v.toLowerCase() && p.codigo !== editando
        );
        if (repetido) return "Ya existe un producto con este código.";
        return "";
    },
    nombre: v => v === "" ? "El nombre es obligatorio."
               : v.length > 100 ? "Máximo 100 caracteres." : "",
    descripcion: v => v.length > 500 ? "Máximo 500 caracteres." : "",
    precio: function (v) {
        if (v === "") return "El precio es obligatorio.";
        if (isNaN(Number(v)) || Number(v) < 0) return "El precio debe ser un número mayor o igual a 0.";
        return "";
    },
    stock: function (v) {
        if (v === "") return "El stock es obligatorio.";
        if (!/^\d+$/.test(v)) return "Debe ser un número entero mayor o igual a 0.";
        return "";
    },
    stockCritico: v => (v !== "" && !/^\d+$/.test(v))
        ? "Debe ser un número entero mayor o igual a 0." : "",
    categoria: v => v === "" ? "Seleccione una categoría." : ""
};

function validarCampoProducto(id) {
    const campo = document.getElementById("adm-" + id);
    const error = document.getElementById("error-adm-" + id);
    const mensaje = reglasProductoAdmin[id](campo.value.trim());

    campo.classList.toggle("is-invalid", mensaje !== "");
    campo.classList.toggle("is-valid", mensaje === "");
    error.textContent = mensaje;

    return mensaje === "";
}

function validarProductoAdmin() {
    let ok = true;
    Object.keys(reglasProductoAdmin).forEach(id => {
        if (!validarCampoProducto(id)) ok = false;
    });
    return ok;
}

// Guarda la lista en localStorage y actualiza el arreglo en memoria
function guardarProductos(lista) {
    localStorage.setItem("productos", JSON.stringify(lista));
    productos.length = 0;
    productos.push(...lista);
}

function limpiarFormularioProducto() {
    const form = document.getElementById("formProductoAdmin");
    if (!form) return;

    form.reset();
    form.querySelectorAll(".is-valid, .is-invalid").forEach(c => c.classList.remove("is-valid", "is-invalid"));

    document.getElementById("adm-editando").value = "";
    document.getElementById("adm-codigo").readOnly = false;
    document.getElementById("tituloFormProducto").textContent = "Agregar Producto";
    document.getElementById("btnGuardarProducto").textContent = "Guardar producto";
    document.getElementById("btnCancelarProducto").classList.add("d-none");
}

function nuevoProductoAdmin() {
    limpiarFormularioProducto();
    mostrarSeccionAdmin("nuevo-producto");
}

function editarProductoAdmin(codigo) {
    const p = productos.find(x => x.codigo === codigo);
    if (!p) return;

    limpiarFormularioProducto();

    document.getElementById("adm-editando").value = p.codigo;
    document.getElementById("adm-codigo").value = p.codigo;
    document.getElementById("adm-codigo").readOnly = true; // el código no se cambia al editar
    document.getElementById("adm-nombre").value = p.nombre;
    document.getElementById("adm-descripcion").value = p.descripcion || "";
    document.getElementById("adm-precio").value = p.precio;
    document.getElementById("adm-stock").value = p.stock;
    document.getElementById("adm-stockCritico").value = p.stockCritico || "";
    document.getElementById("adm-categoria").value = p.categoria;
    document.getElementById("adm-imagen").value = p.imagen || "";

    document.getElementById("tituloFormProducto").textContent = "Editar Producto";
    document.getElementById("btnGuardarProducto").textContent = "Guardar cambios";
    document.getElementById("btnCancelarProducto").classList.remove("d-none");

    mostrarSeccionAdmin("nuevo-producto");
}

function eliminarProductoAdmin(codigo) {
    if (!confirm("¿Seguro que deseas eliminar el producto " + codigo + "?")) return;

    guardarProductos(productos.filter(p => p.codigo !== codigo));
    listarProductos();
}

function guardarProductoAdmin(e) {
    e.preventDefault();

    if (!validarProductoAdmin()) return;

    const editando = document.getElementById("adm-editando").value;
    const criticoTexto = document.getElementById("adm-stockCritico").value.trim();

    const producto = {
        codigo: document.getElementById("adm-codigo").value.trim(),
        nombre: document.getElementById("adm-nombre").value.trim(),
        descripcion: document.getElementById("adm-descripcion").value.trim(),
        precio: Number(document.getElementById("adm-precio").value),
        stock: Number(document.getElementById("adm-stock").value),
        stockCritico: criticoTexto === "" ? 0 : Number(criticoTexto),
        categoria: document.getElementById("adm-categoria").value,
        imagen: document.getElementById("adm-imagen").value.trim() || "img/producto_default.jpg"
    };

    const lista = productos.slice();

    if (editando) {
        const i = lista.findIndex(p => p.codigo === editando);
        if (i !== -1) lista[i] = producto;
    } else {
        lista.push(producto);
    }

    guardarProductos(lista);

    alert(editando ? "Producto actualizado correctamente." : "Producto agregado correctamente.");

    // Alerta de stock crítico (regla del anexo)
    if (criticoTexto !== "" && producto.stock <= producto.stockCritico) {
        alert("⚠️ Atención: el stock de este producto está en nivel crítico.");
    }

    limpiarFormularioProducto();
    listarProductos();
    mostrarSeccionAdmin("productos");
}

function iniciarAdminProductos() {
    const form = document.getElementById("formProductoAdmin");
    if (!form) return;

    form.addEventListener("submit", guardarProductoAdmin);

    // Validación en tiempo real, campo por campo
    Object.keys(reglasProductoAdmin).forEach(id => {
        document.getElementById("adm-" + id).addEventListener("input", () => validarCampoProducto(id));
    });

    // Botones Editar / Eliminar de la tabla
    document.getElementById("tbody-productos").addEventListener("click", function (e) {
        const boton = e.target.closest("button[data-accion]");
        if (!boton) return;

        if (boton.dataset.accion === "editar") editarProductoAdmin(boton.dataset.codigo);
        if (boton.dataset.accion === "eliminar") eliminarProductoAdmin(boton.dataset.codigo);
    });
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

    mostrarProductos();
    mostrarProductosInicio();
    mostrarDetalleProducto();
    mostrarCarrito();

        // Abre el carrito si la URL trae ?vista=carrito
    const params = new URLSearchParams(window.location.search);
    if (params.get("vista") === "carrito") mostrarVista("carrito");

    document.addEventListener("click", function (e) {


        // ==========================================
        // BOTÓN AGREGAR AL CARRITO
        // ==========================================

        if (e.target && e.target.classList.contains("boton-carrito")) {

            const tarjeta = e.target.closest(".producto");

            if (!tarjeta) return;


            const elNombre = tarjeta.querySelector("h3");
            const elPrecio = tarjeta.querySelector(".precio");
            const elImagen = tarjeta.querySelector("img");


            const nombre =
                elNombre
                    ? elNombre.textContent.trim()
                    : "Producto";


            let precioNum = 0;

            if (elPrecio) {

                precioNum =
                    Number(
                        elPrecio.textContent.replace(/[^0-9]/g, "")
                    ) || 0;
            }


            const imagen =
                elImagen
                    ? elImagen.getAttribute("src")
                    : "";


            const producto = {
                nombre: nombre,
                precio: precioNum,
                imagen: imagen,
                cantidad: 1
            };


            let carrito = obtenerCarrito();


            const existe =
                carrito.find(
                    item => item.nombre === nombre
                );


            if (existe) {

                existe.cantidad++;

            } else {

                carrito.push(producto);

            }


            guardarCarrito(carrito);

            mostrarToast(
                `¡${nombre} agregado al carrito!`,
                "🛒"
            );
        }

    });

});

// Función para validar RUN chileno (módulo 11) sin puntos ni guión
function validarRunChile(run) {

    const runLimpio = run.trim().toUpperCase();

    // Solo números y el último carácter puede ser número o K
    if (!/^[0-9]{6,8}[0-9K]$/.test(runLimpio)) {
        return false;
    }

    const cuerpo = runLimpio.slice(0, -1);
    const dvIngresado = runLimpio.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += Number(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resto = suma % 11;
    const resultado = 11 - resto;

    let dvCalculado;

    if (resultado === 11) {
        dvCalculado = "0";

    } else if (resultado === 10) {
        dvCalculado = "K";

    } else {
        dvCalculado = resultado.toString();
    }

    return dvIngresado === dvCalculado;
}

// ==========================================
// USUARIOS Y ROLES
// ==========================================

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function crearAdminInicial() {

    let usuarios = obtenerUsuarios();

    const existeAdmin = usuarios.some(
        usuario => usuario.correo === "admin@duoc.cl"
    );

    if (!existeAdmin) {

        const adminInicial = {
            nombre: "Administrador",
            apellidos: "Sistema",
            correo: "admin@duoc.cl",
            clave: "admin123",
            rol: "Administrador"
        };

        usuarios.push(adminInicial);
        guardarUsuarios(usuarios);
    }
}

function obtenerUsuarioActivo() {
    return JSON.parse(localStorage.getItem("usuarioActivo"));
}

// ==========================================
// CAMBIAR SECCIONES DEL PANEL ADMIN
// ==========================================

function mostrarSeccionAdmin(seccion) {

    const secciones =
        document.querySelectorAll(".admin-seccion");

    secciones.forEach(function (elemento) {
        elemento.classList.add("d-none");
    });


    const destino =
        document.getElementById("admin-" + seccion);


    if (destino) {
        destino.classList.remove("d-none");
    }
}

    // ==========================================
    // DOM
    // ==========================================

document.addEventListener('DOMContentLoaded', () => {

    crearAdminInicial();

  // Lógica para cambiar dinámicamente las comunas según región seleccionada
  const regionSelect = document.getElementById('region');
  const comunaSelect = document.getElementById('comuna');

  if (regionSelect && comunaSelect) {
    regionSelect.addEventListener('change', () => {
      const region = regionSelect.value;
      comunaSelect.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

      if (region && comunasPorRegion[region]) {
        comunasPorRegion[region].forEach(comuna => {
          const option = document.createElement('option');
          option.value = comuna.toLowerCase();
          option.textContent = comuna;
          comunaSelect.appendChild(option);
        });
        comunaSelect.disabled = false;
      } else {
        comunaSelect.disabled = true;
      }
    });
  }

    // ==========================================
    // FORMULARIO AGREGAR PRODUCTO
    // ==========================================

    const formProducto = document.getElementById('formProducto');

        if (formProducto) {

        formProducto.addEventListener('submit', (e) => {

            e.preventDefault();

            let valido = true;

            const codigo = document.getElementById('codigo');
            const nombre = document.getElementById('nombre');
            const descripcion = document.getElementById('descripcion');
            const precio = document.getElementById('precio');
            const stock = document.getElementById('stock');
            const stockCritico = document.getElementById('stockCritico');
            const categoria = document.getElementById('categoria');
            const imagen = document.getElementById('imagen');


            // Validar código
            if (codigo.value.trim().length < 3) {

            document.getElementById('errorCodigo').textContent =
                "El código debe tener mínimo 3 caracteres";

            valido = false;

            } else {

            document.getElementById('errorCodigo').textContent = "";

            }


            // Validar nombre
            if (
            nombre.value.trim() === "" ||
            nombre.value.length > 100
            ) {

            document.getElementById('errorNombre').textContent =
                "El nombre es obligatorio y debe tener máximo 100 caracteres";

            valido = false;

            } else {

            document.getElementById('errorNombre').textContent = "";

            }


            // Validar descripción
            if (descripcion.value.length > 500) {

            document.getElementById('errorDescripcion').textContent =
                "La descripción debe tener máximo 500 caracteres";

            valido = false;

            } else {

            document.getElementById('errorDescripcion').textContent = "";

            }


            // Validar precio
            if (
            precio.value === "" ||
            Number(precio.value) < 0
            ) {

            document.getElementById('errorPrecio').textContent =
                "Ingrese un precio válido";

            valido = false;

            } else {

            document.getElementById('errorPrecio').textContent = "";

            }


            // Validar stock
            if (
            stock.value === "" ||
            Number(stock.value) < 0 ||
            !Number.isInteger(Number(stock.value))
            ) {

            document.getElementById('errorStock').textContent =
                "El stock debe ser un número entero igual o mayor a 0";

            valido = false;

            } else {

            document.getElementById('errorStock').textContent = "";

            }


            // Validar stock crítico
            if (
            stockCritico.value !== "" &&
            (
                Number(stockCritico.value) < 0 ||
                !Number.isInteger(Number(stockCritico.value))
            )
            ) {

            document.getElementById('errorStockCritico').textContent =
                "El stock crítico debe ser un número entero igual o mayor a 0";

            valido = false;

            } else {

            document.getElementById('errorStockCritico').textContent = "";

            }


            // Validar categoría
            if (categoria.value === "") {

            document.getElementById('errorCategoria').textContent =
                "Seleccione una categoría";

            valido = false;

            } else {

            document.getElementById('errorCategoria').textContent = "";

            }


            // Si todo está correcto
            if (valido) {

            const nuevoProducto = {

                codigo: codigo.value.trim(),
                nombre: nombre.value.trim(),
                descripcion: descripcion.value.trim(),
                precio: Number(precio.value),
                stock: Number(stock.value),
                stockCritico: stockCritico.value === ""
                ? 0
                : Number(stockCritico.value),

                categoria: categoria.value,

                imagen: imagen.value.trim() ||
                "img/producto_default.jpg"

            };


            productos.push(nuevoProducto);


            localStorage.setItem(
                "productos",
                JSON.stringify(productos)
            );


            document.getElementById('mensaje').textContent =
                "Producto agregado correctamente";


            formProducto.reset();


            // Actualiza el catálogo si está presente
            mostrarProductos();

            }

        });
    }

    // ==========================================
    // INICIAR PANEL ADMINISTRATIVO
    // ==========================================
    const panelAdmin = document.getElementById("adminPanel");

    if (panelAdmin) {
        const usuario = verificarAcceso(["Administrador", "Vendedor"]);

        if (usuario) {
            aplicarRestriccionesPorRol();
            listarUsuarios();
            listarProductos();
            iniciarAdminProductos();
            listarOrdenes();

            const formUsuarioAdmin =
                document.getElementById("formUsuarioAdmin");

            if (formUsuarioAdmin) {

                const regionAdmin =
                    document.getElementById("admUsuario-region");

                regionAdmin.addEventListener("change", function () {
                    cargarComunasAdmin();
                });


                formUsuarioAdmin.addEventListener("submit", function (e) {

                    e.preventDefault();

                    const run =
                        document.getElementById("admUsuario-run")
                            .value.trim().toUpperCase();

                    const nombre =
                        document.getElementById("admUsuario-nombre")
                            .value.trim();

                    const apellidos =
                        document.getElementById("admUsuario-apellidos")
                            .value.trim();

                    const correo =
                        document.getElementById("admUsuario-correo")
                            .value.trim().toLowerCase();

                    const fechaNacimiento =
                        document.getElementById("admUsuario-fecha")
                            .value;

                    const region =
                        document.getElementById("admUsuario-region")
                            .value;

                    const comuna =
                        document.getElementById("admUsuario-comuna")
                            .value;

                    const direccion =
                        document.getElementById("admUsuario-direccion")
                            .value.trim();

                    const clave =
                        document.getElementById("admUsuario-clave")
                            .value;

                    const rol =
                        document.getElementById("admUsuario-rol")
                            .value;


                    if (!validarRunChile(run)) {
                        alert("RUN inválido.");
                        return;
                    }

                    if (nombre === "" || nombre.length > 50) {
                        alert("Nombre obligatorio, máximo 50 caracteres.");
                        return;
                    }

                    if (apellidos === "" || apellidos.length > 100) {
                        alert("Apellidos obligatorios, máximo 100 caracteres.");
                        return;
                    }

                    const dominiosPermitidos = [
                        "@duoc.cl",
                        "@profesor.duoc.cl",
                        "@gmail.com"
                    ];

                    if (
                        correo === "" ||
                        correo.length > 100 ||
                        !dominiosPermitidos.some(d => correo.endsWith(d))
                    ) {
                        alert("Correo inválido.");
                        return;
                    }

                    if (region === "" || comuna === "") {
                        alert("Selecciona región y comuna.");
                        return;
                    }

                    if (direccion === "" || direccion.length > 300) {
                        alert("Dirección obligatoria, máximo 300 caracteres.");
                        return;
                    }

                    if (clave.length < 4 || clave.length > 10) {
                        alert("La contraseña debe tener entre 4 y 10 caracteres.");
                        return;
                    }

                    if (rol === "") {
                        alert("Selecciona un rol.");
                        return;
                    }


                    let usuarios = obtenerUsuarios();

                    const existe = usuarios.some(
                        (u, i) =>
                            i !== usuarioEditando &&
                            (
                                u.correo.toLowerCase() === correo ||
                                u.run === run
                            )
                    );

                    if (existe) {
                        alert("El RUN o correo ya está registrado.");
                        return;
                    }


                    const nuevoUsuario = {
                        run: run,
                        nombre: nombre,
                        apellidos: apellidos,
                        correo: correo,
                        fechaNacimiento: fechaNacimiento,
                        region: region,
                        comuna: comuna,
                        direccion: direccion,
                        clave: clave,
                        rol: rol
                    };


                    const esEdicion = usuarioEditando !== -1;

                    if (esEdicion) {
                        usuarios[usuarioEditando] = nuevoUsuario;
                    } else {
                        usuarios.push(nuevoUsuario);
                    }

                    guardarUsuarios(usuarios);

                    usuarioEditando = -1;

                    alert(
                        esEdicion
                            ? "Usuario actualizado correctamente."
                            : "Usuario agregado correctamente."
                    );

                    formUsuarioAdmin.reset();

                    document.getElementById(
                        "admUsuario-comuna"
                    ).disabled = true;

                    listarUsuarios();

                    mostrarSeccionAdmin("usuarios");

                });

            }

            mostrarSeccionAdmin(usuario.rol === "Vendedor" ? "productos" : "inicio");
        }
    }

    // CERRAR SESIÓN
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function () {
            localStorage.removeItem("usuarioActivo");
            window.location.href = "inicio sesion.html";
        });
    }

    // ==========================================
    // 1. FORMULARIO INICIO DE SESIÓN
    // ==========================================

    const formLogin = document.getElementById('form-inicioSesion');

    if (formLogin) {

    formLogin.addEventListener('submit', (e) => {

        e.preventDefault();

        const correo = document.getElementById('loginCorreo');
        const clave = document.getElementById('loginClave');

        const correoIngresado = correo.value.trim().toLowerCase();

        const dominiosPermitidos = [
        '@duoc.cl',
        '@profesor.duoc.cl',
        '@gmail.com'
        ];

        const dominioValido = dominiosPermitidos.some(
        dominio => correoIngresado.endsWith(dominio)
        );

        let valido = true;


        // Validar correo
        if (
        correoIngresado === '' ||
        correoIngresado.length > 100 ||
        !dominioValido
        ) {

        correo.classList.add('is-invalid');
        valido = false;

        } else {

        correo.classList.remove('is-invalid');
        }


        // Validar contraseña
        if (
        clave.value.length < 4 ||
        clave.value.length > 10
        ) {

        clave.classList.add('is-invalid');
        valido = false;

        } else {

        clave.classList.remove('is-invalid');
        }


        if (!valido) return;


        const usuarios = obtenerUsuarios();

        const usuarioEncontrado = usuarios.find(usuario =>
        usuario.correo.toLowerCase() === correoIngresado &&
        usuario.clave === clave.value
        );


        if (!usuarioEncontrado) {

        alert('Correo o contraseña incorrectos.');
        return;

        }


        localStorage.setItem(
        'usuarioActivo',
        JSON.stringify(usuarioEncontrado)
        );


        if (
        usuarioEncontrado.rol === 'Administrador' ||
        usuarioEncontrado.rol === 'Vendedor'
        ) {

        window.location.href = 'admin.html';

        } else {

        window.location.href = 'index.html';

        }

    });

    }

  // ==========================================
  // 2. FORMULARIO DE REGISTRO CON NUEVOS CAMPOS
  // ==========================================

  const formRegistro = document.getElementById('form-Registrarse');
  if (formRegistro) {
    formRegistro.addEventListener('submit', (e) => {
      e.preventDefault();
      let valido = true;

      const run = document.getElementById('run');
      const nombre = document.getElementById('RegistrarNombre');
      const apellidos = document.getElementById('RegistrarApellidos');
      const correo = document.getElementById('RegistrarCorreo');
      const telefono = document.getElementById('telefono');
      const region = document.getElementById('region');
      const comuna = document.getElementById('comuna');
      const direccion = document.getElementById('direccion');
      const clave = document.getElementById('RegistrarClave');
      const confirmarClave = document.getElementById('confirmarClave');

      // Validar RUN
        const valRun = run.value.trim().toUpperCase();

        if (!validarRunChile(valRun)) {

            run.classList.add('is-invalid');
            run.classList.remove('is-valid');

            valido = false;

        } else {

            run.classList.remove('is-invalid');
            run.classList.add('is-valid');
        }

      // Validar Nombre
      if (nombre) {
        if (!nombre.value.trim() || nombre.value.length > 50) {
          nombre.classList.add('is-invalid');
          valido = false;
        } else {
          nombre.classList.remove('is-invalid');
          nombre.classList.add('is-valid');
        }
      }

      // Validar Apellidos
      if (apellidos) {
        if (!apellidos.value.trim() || apellidos.value.length > 100) {
          apellidos.classList.add('is-invalid');
          valido = false;
        } else {
          apellidos.classList.remove('is-invalid');
          apellidos.classList.add('is-valid');
        }
      }

      // Validar Correo
      if (correo) {
        const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        const valCorreo = correo.value.trim().toLowerCase();
        const dominioValido = dominiosPermitidos.some(dom => valCorreo.endsWith(dom));

        if (!valCorreo || valCorreo.length > 100 || !dominioValido) {
          correo.classList.add('is-invalid');
          valido = false;
        } else {
          correo.classList.remove('is-invalid');
          correo.classList.add('is-valid');
        }
      }

      // Validar Teléfono (opcional)
      if (telefono) {
        if (telefono.value.trim() !== '' && telefono.value.trim().length < 9) {
          telefono.classList.add('is-invalid');
          valido = false;
        } else {
          telefono.classList.remove('is-invalid');
          if (telefono.value.trim() !== '') telefono.classList.add('is-valid');
        }
      }

      // Validar Región
      if (region) {
        if (!region.value) {
          region.classList.add('is-invalid');
          valido = false;
        } else {
          region.classList.remove('is-invalid');
          region.classList.add('is-valid');
        }
      }

      // Validar Comuna
      if (comuna) {
        if (!comuna.value) {
          comuna.classList.add('is-invalid');
          valido = false;
        } else {
          comuna.classList.remove('is-invalid');
          comuna.classList.add('is-valid');
        }
      }

      // Validar dirección
        if (
            direccion.value.trim() === '' ||
            direccion.value.length > 300
        ) {
            direccion.classList.add('is-invalid');
            valido = false;
        } else {
            direccion.classList.remove('is-invalid');
            direccion.classList.add('is-valid');
        }

      // Validar Contraseña
      if (clave) {
        if (clave.value.length < 4 || clave.value.length > 10) {
          clave.classList.add('is-invalid');
          valido = false;
        } else {
          clave.classList.remove('is-invalid');
          clave.classList.add('is-valid');
        }
      }

      // Validar Confirmación de Contraseña
      if (confirmarClave) {
        if (!confirmarClave.value.trim() || (clave && confirmarClave.value !== clave.value)) {
          confirmarClave.classList.add('is-invalid');
          valido = false;
        } else {
          confirmarClave.classList.remove('is-invalid');
          confirmarClave.classList.add('is-valid');
        }
      }

      if (!valido) {
            return;
        }

        if (valido) {

            let usuarios = obtenerUsuarios();

            const correoIngresado =
                correo.value.trim().toLowerCase();

            const correoExiste = usuarios.some(
                usuario => usuario.correo.toLowerCase() === correoIngresado
            );

            if (correoExiste) {

                alert('Este correo ya está registrado.');
                return;

            }


            const rolSelect = document.getElementById('rol') || document.getElementById('tipoUsuario');
            const rolFinal = rolSelect ? rolSelect.value : 'Cliente';

            const nuevoUsuario = {
                run: run.value.trim().toUpperCase(),
                nombre: nombre.value.trim(),
                apellidos: apellidos.value.trim(),
                correo: correoIngresado,
                telefono: telefono ? telefono.value.trim() : '',
                region: region ? region.value : '',
                comuna: comuna ? comuna.value : '',
                direccion: document.getElementById('direccion') ? document.getElementById('direccion').value.trim() : '',
                fechaNacimiento: document.getElementById('fechaNacimiento') ? document.getElementById('fechaNacimiento').value : '',
                clave: clave.value,
                rol: rolFinal // <--- Aquí se asigna el rol dinámico o por defecto Cliente
            };


            usuarios.push(nuevoUsuario);

            guardarUsuarios(usuarios);


            alert('Registro completado con éxito.');

            formRegistro.reset();

            if (comuna) comuna.disabled = true;
        }
    });
  }

// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================

const formContacto = document.getElementById('form-contacto');

if (formContacto) {

  formContacto.addEventListener('submit', (e) => {

    e.preventDefault();

    let valido = true;

    const nombre =
      document.getElementById('contactoNombre');

    const correo =
      document.getElementById('contactoCorreo');

    const comentario =
      document.getElementById('contactoComentario');


    // Validar nombre
    if (
      nombre.value.trim() === '' ||
      nombre.value.length > 100
    ) {

      nombre.classList.add('is-invalid');
      valido = false;

    } else {

      nombre.classList.remove('is-invalid');
      nombre.classList.add('is-valid');

    }


    // Validar correo
    const correoIngresado =
      correo.value.trim().toLowerCase();

    const dominiosPermitidos = [
      '@duoc.cl',
      '@profesor.duoc.cl',
      '@gmail.com'
    ];

    const dominioValido =
      dominiosPermitidos.some(
        dominio => correoIngresado.endsWith(dominio)
      );


    if (
      correoIngresado !== '' &&
      (
        correoIngresado.length > 100 ||
        !dominioValido
      )
    ) {

      correo.classList.add('is-invalid');
      valido = false;

    } else {

      correo.classList.remove('is-invalid');

    }


    // Validar comentario
    if (
      comentario.value.trim() === '' ||
      comentario.value.length > 500
    ) {

      comentario.classList.add('is-invalid');
      valido = false;

    } else {

      comentario.classList.remove('is-invalid');
      comentario.classList.add('is-valid');

    }


    if (valido) {

      alert('Mensaje enviado correctamente.');

      formContacto.reset();

      nombre.classList.remove('is-valid');
      comentario.classList.remove('is-valid');

    }

  });

}
  
  // ==========================================
  // 3. RECUPERACIÓN DE CONTRASEÑA
  // ==========================================

  const formRecuperar = document.getElementById('form-recuperar');
  if (formRecuperar) {
    formRecuperar.addEventListener('submit', (e) => {
      e.preventDefault();
      const correoRec = document.getElementById('correoRecuperar');

      if (!correoRec.value.trim()) {
        correoRec.classList.add('is-invalid');
      } else {
        correoRec.classList.remove('is-invalid');
        alert('Se han enviado las instrucciones a tu correo.');
        
        const modalElement = document.getElementById('modalRecuperar');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
        formRecuperar.reset();
      }
    });
  }

    // ==========================================
    // CONTROL DE ACCESO Y RESTRICCIÓN DE VISTAS
    // ==========================================
    // Valida si el usuario tiene permiso para estar en la página actual
    function verificarAcceso(rolesPermitidos) {
        const usuarioActivo = obtenerUsuarioActivo();
        // Si no ha iniciado sesión, redirigir al login
        if (!usuarioActivo) {
            window.location.href = "inicio sesion.html";
            return null;
        }
        // Si su rol no está permitido en esta vista
        if (!rolesPermitidos.includes(usuarioActivo.rol)) {
            alert("No tienes permisos para acceder a esta página.");
            window.location.href = "index.html";
            return null;
        }
        return usuarioActivo;
    }
    // Oculta elementos según el rol (cumpliendo las restricciones del Vendedor)
    function aplicarRestriccionesPorRol() {
        const usuario = obtenerUsuarioActivo();
        if (!usuario) return;
        // Mostrar el nombre y rol del usuario en la barra/interfaz si existe el elemento
        const infoUsuario = document.getElementById("infoUsuarioActivo");
        if (infoUsuario) {
            infoUsuario.textContent = `${usuario.nombre} (${usuario.rol})`;
        }
        // Si es VENDEDOR: no debe ver la gestión de usuarios ni botones de administración
        if (usuario.rol === "Vendedor") {
            // Oculta enlaces o secciones marcadas para solo Administrador
            const elementosSoloAdmin = document.querySelectorAll(".solo-admin, #menu-usuarios, #seccion-usuarios");
            elementosSoloAdmin.forEach(el => el.style.display = "none");
        }
    }
    // Función para cerrar sesión
    function cerrarSesion() {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "inicio sesion.html";
    }
});

 
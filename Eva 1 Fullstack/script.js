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
        descripcion: "Set de herramientas manuales",
        precio: 16500,
        stock: 20,
        stockCritico: 5,
        categoria: "Herramientas",
        imagen: "img/Set Herramientas.webp"
    },
    {
        codigo: "PRO002",
        nombre: "Concertina Alambre Púas",
        descripcion: "Rollo de concertina de alambre de púas",
        precio: 15000,
        stock: 15,
        stockCritico: 5,
        categoria: "Materiales",
        imagen: "img/Concertina_Alambre_Puas.webp"
    },
    {
        codigo: "PRO003",
        nombre: "Rollo aislante aluminio 1,20 m x 10 m",
        descripcion: "Rollo aislante térmico de aluminio",
        precio: 6990,
        stock: 20,
        stockCritico: 5,
        categoria: "Materiales",
        imagen: "img/Rollo_aislante_aluminio.webp"
    },
    {
        codigo: "PRO004",
        nombre: "Panel PVC con revestimiento de metal",
        descripcion: "Panel PVC para revestimiento",
        precio: 5750,
        stock: 25,
        stockCritico: 5,
        categoria: "Materiales",
        imagen: "img/Panel_Pvc.webp"
    },
    {
        codigo: "PRO005",
        nombre: "Panel metal con revestimiento de madera",
        descripcion: "Panel metálico con terminación tipo madera",
        precio: 8500,
        stock: 15,
        stockCritico: 5,
        categoria: "Materiales",
        imagen: "img/Panel_metal_look_madera.webp"
    },
    {
        codigo: "PRO006",
        nombre: "Plancha de yeso cartón",
        descripcion: "Plancha de yeso cartón para construcción",
        precio: 9990,
        stock: 30,
        stockCritico: 10,
        categoria: "Materiales",
        imagen: "img/Plancha_yeso_carton.webp"
    },
    {
        codigo: "PRO007",
        nombre: "Pegamento para madera",
        descripcion: "Adhesivo para trabajos en madera",
        precio: 7000,
        stock: 20,
        stockCritico: 5,
        categoria: "Adhesivos",
        imagen: "img/Pegamento_para_Madera.webp"
    },
    {
        codigo: "PRO008",
        nombre: "Taladro atornillador",
        descripcion: "Taladro atornillador para trabajos de construcción",
        precio: 15500,
        stock: 10,
        stockCritico: 3,
        categoria: "Herramientas",
        imagen: "img/Taladro.webp"
    },
    {
        codigo: "PRO009",
        nombre: "Mortero impermeabilizante 500 g",
        descripcion: "Mortero impermeabilizante para construcción",
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
// LISTA AGREGAR PRODUCTOS
// ==========================================
function agregarProducto(nombre, precio, imagen, descuento, fechaOferta) {

    const nuevoProducto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        descuento: descuento,
        fechaOferta: fechaOferta
    };

    productos.push(nuevoProducto);

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}

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
            <a href="detalle-producto.html?codigo=${producto.codigo}"
            class="text-decoration-none">

                <img src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="producto-imagen">

            </a>

            <div class="producto-info">

                <p class="categoria-producto">
                    ${producto.categoria}
                </p>

                <h3>${producto.nombre}</h3>

                <p class="precio">
                    $${producto.precio.toLocaleString("es-CL")}
                </p>

                <a href="detalle-producto.html?codigo=${producto.codigo}"
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

    const contenedor =
        document.getElementById("detalle-producto");

    if (!contenedor) return;


    const parametros =
        new URLSearchParams(window.location.search);

    const codigo =
        parametros.get("codigo");


    const todosLosProductos =
        productosFijos.concat(productos);


    const producto =
        todosLosProductos.find(
            producto => producto.codigo === codigo
        );


    if (!producto) {

        contenedor.innerHTML = `
            <p>Producto no encontrado.</p>
        `;

        return;
    }


    contenedor.innerHTML = `
        <article class="producto detalle-producto">

            <img src="${producto.imagen}"
                 alt="${producto.nombre}"
                 class="producto-imagen">

            <div class="producto-info">

                <p class="categoria-producto">
                    ${producto.categoria}
                </p>

                <h3>${producto.nombre}</h3>

                <p>
                    ${producto.descripcion}
                </p>

                <p class="precio">
                    $${producto.precio.toLocaleString("es-CL")}
                </p>

                <p>
                    Stock disponible: ${producto.stock}
                </p>

                <button class="boton-carrito">
                    Agregar al carrito
                </button>

                <a href="productos.html"
                   class="btn btn-light mt-2">

                    Volver a productos

                </a>

            </div>

        </article>
    `;
}

// ==========================================
// MOSTRAR DETALLE DEL PRODUCTO
// ==========================================

function mostrarDetalleProducto() {

    const contenedor =
        document.getElementById("detalle-producto");

    if (!contenedor) return;


    const parametros =
        new URLSearchParams(window.location.search);

    const codigo =
        parametros.get("codigo");


    const todosLosProductos =
        productosFijos.concat(productos);


    const producto =
        todosLosProductos.find(
            producto => producto.codigo === codigo
        );


    if (!producto) {

        contenedor.innerHTML = `
            <p>Producto no encontrado.</p>
        `;

        return;
    }


    contenedor.innerHTML = `
        <article class="producto detalle-producto">

            <img src="${producto.imagen}"
                 alt="${producto.nombre}"
                 class="producto-imagen">

            <div class="producto-info">

                <p class="categoria-producto">
                    ${producto.categoria}
                </p>

                <h3>${producto.nombre}</h3>

                <p>
                    ${producto.descripcion}
                </p>

                <p class="precio">
                    $${producto.precio.toLocaleString("es-CL")}
                </p>

                <p>
                    Stock disponible: ${producto.stock}
                </p>

                <button class="boton-carrito">
                    Agregar al carrito
                </button>

                <a href="productos.html"
                   class="btn btn-light mt-2">

                    Volver a productos

                </a>

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

    mostrarProductos();
    mostrarProductosInicio();
    mostrarDetalleProducto();
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

// Función para validar RUN chileno (módulo 11) sin puntos ni guión
function validarRunChile(run) {
  const runLimpio = run.replace(/[^0-9kK]/g, '').toUpperCase();
  if (runLimpio.length < 7 || runLimpio.length > 9) return false;

  const cuerpo = runLimpio.slice(0, -1);
  const dvIngresado = runLimpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const dvCalculadoNum = 11 - resto;
  let dvCalculado = '';

  if (dvCalculadoNum === 11) dvCalculado = '0';
  else if (dvCalculadoNum === 10) dvCalculado = 'K';
  else dvCalculado = dvCalculadoNum.toString();

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
      const clave = document.getElementById('RegistrarClave');
      const confirmarClave = document.getElementById('confirmarClave');

      // Validar RUN
      const valRun = run ? run.value.trim().toUpperCase() : '';
      const formatoRunValido = /^[0-9]{6,8}[0-9K]$/.test(valRun);

      if (run) {
        if (!valRun || !formatoRunValido || !validarRunChile(valRun)) {
          run.classList.add('is-invalid');
          valido = false;
        } else {
          run.classList.remove('is-invalid');
          run.classList.add('is-valid');
        }
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

      // Validar Contraseña
      if (clave) {
        if (!clave.value.trim()) {
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


            const nuevoUsuario = {

                run: run.value.trim().toUpperCase(),
                nombre: nombre.value.trim(),
                apellidos: apellidos.value.trim(),
                correo: correoIngresado,
                telefono: telefono.value.trim(),
                region: region.value,
                comuna: comuna.value,

                direccion:
                    document.getElementById('direccion').value.trim(),

                fechaNacimiento:
                    document.getElementById('fechaNacimiento').value,

                clave: clave.value,

                rol: 'Cliente'
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
    // VERIFICAR ACCESO SEGÚN ROL
    // ==========================================

    function verificarAcceso(rolesPermitidos) {

        const usuarioActivo =
            JSON.parse(localStorage.getItem("usuarioActivo"));

        // Si no existe usuario iniciado
        if (!usuarioActivo) {
            window.location.href = "inicio sesion.html";
            return;
        }

        // Si el rol no tiene permiso
        if (!rolesPermitidos.includes(usuarioActivo.rol)) {

            alert("No tienes permisos para acceder a esta página.");

            window.location.href = "index.html";
            return;
        }
    }

});
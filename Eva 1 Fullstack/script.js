
const productos = [{
  nombre: "ph1",
  precio: 1980,
  oferta: 20
},{
  nombre: "ph2",
  precio: 2750,
  oferta: 15
}];

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const contenedor =
    document.getElementById("contenedorProductos");

if (contenedor) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "col-md-3 product-card";
    tarjeta.dataset.fecha = descuentodia;
    tarjeta.dataset.descuento = descuento;

    tarjeta.innerHTML = `
        <div class="card">
            <img src="${imagen}"
                class="card-img-top"
                alt="${nombre}">

            <div class="card-body">
                <h3>${nombre}</h3>
                <p class="precio">$${precio}</p>
                <p class="oferta" hidden></p>

                <button type="button" class="btn btn-primary btn-carrito">
                    Comprar
                </button>
            </div>
        </div>
    `;

    contenedor.appendChild(tarjeta);
}





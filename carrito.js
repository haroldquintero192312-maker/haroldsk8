console.log("🔥 CARRITO.JS SE CARGÓ");

/* =========================================
   CARRITO HARLIS SK8
========================================= */

let carrito = JSON.parse(
    localStorage.getItem("carritoHarLis")
) || [];


/* =========================================
   AGREGAR AL CARRITO
========================================= */

function agregarAlCarrito(nombre, precio, imagen) {

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            nombre: nombre,

            precio: precio,

            imagen: imagen,

            cantidad: 1

        });

    }


    guardarCarrito();

    actualizarContador();

    mostrarMensaje(
        "🛒 " + nombre +
        " agregado al carrito"
    );
}


/* =========================================
   GUARDAR
========================================= */

function guardarCarrito() {

    localStorage.setItem(
        "carritoHarLis",
        JSON.stringify(carrito)
    );
}


/* =========================================
   CONTADOR
========================================= */

function actualizarContador() {

    const contador =
        document.getElementById(
            "contador-carrito"
        );


    if (!contador) {
        return;
    }


    const cantidadTotal =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );


    contador.textContent =
        cantidadTotal;
}


/* =========================================
   MOSTRAR PRODUCTOS
========================================= */

function mostrarCarrito() {

    const lista =
        document.getElementById(
            "lista-carrito"
        );


    const totalElemento =
        document.getElementById(
            "total-carrito"
        );


    if (!lista) {
        return;
    }


    lista.innerHTML = "";


    /* CARRITO VACÍO */

    if (carrito.length === 0) {

        lista.innerHTML = `
            <div class="carrito-vacio">

                <h2>🛒 Tu carrito está vacío</h2>

                <p>
                    Agrega algunos productos
                    de HarLis Sk8.
                </p>

                <a
                    href="index.html"
                    class="volver"
                >
                    ← Ver productos
                </a>

            </div>
        `;


        if (totalElemento) {

            totalElemento.textContent =
                "$0";

        }

        return;
    }


    let total = 0;


    /* MOSTRAR PRODUCTOS */

    carrito.forEach(
        (producto, indice) => {

            const subtotal =
                producto.precio *
                producto.cantidad;


            total += subtotal;


            const productoHTML = `

                <article class="item-carrito">

                    <div class="imagen-carrito">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                        >

                    </div>


                    <div class="info-carrito">

                        <h2>
                            ${producto.nombre}
                        </h2>

                        <p class="precio-item">
                            $${producto.precio.toLocaleString("es-CO")}
                        </p>


                        <div class="cantidad-carrito">

                            <button
                                onclick="cambiarCantidad(
                                    ${indice},
                                    -1
                                )"
                            >
                                −
                            </button>


                            <span>
                                ${producto.cantidad}
                            </span>


                            <button
                                onclick="cambiarCantidad(
                                    ${indice},
                                    1
                                )"
                            >
                                +
                            </button>

                        </div>


                        <p class="subtotal">

                            Subtotal:
                            <strong>
                                $${subtotal.toLocaleString("es-CO")}
                            </strong>

                        </p>


                        <button
                            class="boton-eliminar"
                            onclick="eliminarProducto(
                                ${indice}
                            )"
                        >
                            🗑️ Eliminar
                        </button>

                    </div>

                </article>

            `;


            lista.innerHTML +=
                productoHTML;

        }
    );


    /* TOTAL */

    if (totalElemento) {

        totalElemento.textContent =
            "$" +
            total.toLocaleString("es-CO");

    }
}


/* =========================================
   CAMBIAR CANTIDAD
========================================= */

function cambiarCantidad(
    indice,
    cambio
) {

    carrito[indice].cantidad +=
        cambio;


    if (
        carrito[indice].cantidad <= 0
    ) {

        carrito.splice(
            indice,
            1
        );

    }


    guardarCarrito();

    actualizarContador();

    mostrarCarrito();
}


/* =========================================
   ELIMINAR PRODUCTO
========================================= */

function eliminarProducto(indice) {

    carrito.splice(
        indice,
        1
    );


    guardarCarrito();

    actualizarContador();

    mostrarCarrito();

}


/* =========================================
   VACIAR CARRITO
========================================= */

function vaciarCarrito() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito ya está vacío 🛒"
        );

        return;
    }


    const confirmar =
        confirm(
            "¿Seguro que quieres vaciar el carrito?"
        );


    if (!confirmar) {
        return;
    }


    carrito = [];


    guardarCarrito();

    actualizarContador();

    mostrarCarrito();

}


/* =========================================
   MENSAJE
========================================= */

function mostrarMensaje(texto) {

    let mensaje =
        document.querySelector(
            ".mensaje-carrito"
        );


    if (!mensaje) {

        mensaje =
            document.createElement("div");

        mensaje.className =
            "mensaje-carrito";

        document.body.appendChild(
            mensaje
        );

    }


    mensaje.textContent =
        texto;


    mensaje.classList.add(
        "mostrar"
    );


    setTimeout(
        function () {

            mensaje.classList.remove(
                "mostrar"
            );

        },
        2000
    );

}


/* =========================================
   INICIAR
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        actualizarContador();

        mostrarCarrito();

    }
);
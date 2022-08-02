console.log("6todesafio.js")

const Recital = 
[
    {
        id:1,
        artista: 'Dua Lipa',
        precio: 10500,
        img: "images/dua.png"
    },
    {
        id:2,
        artista: 'Coldplay',
        precio: 13500,
        img: "images/coldplay.jpg"
    },
    {
        id:3,
        artista:'Måneskin',
        precio: 9500,
        img: "images/maneskin.png"
    }
];

const contenedorCards = document.getElementById("contCards")
console.log(contenedorCards)
const contenedorTabla = document.getElementById("tabla")
console.log(contenedorTabla)
const precioTotal = document.getElementById('precioTotal')

function mostrarProductos(array) {
    contenedorCards.innerHTML = ""
    array.forEach(element => {
        contenedorCards.innerHTML += `
            <div class="col mb-5">
                <div class="card h-100">
                    <img class="card-img-top" src="${element.img}" alt="..." />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${element.artista}</h5>
                            <p>$${element.precio}</p>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <button onclick="agregarCarrito(${element.id})" class="btn btn-outline-dark mt-auto">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
}

function mostrarCarrito(evento){
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${evento.cantidad}</td>
                    <td>${evento.artista}</td>
                    <td>$${evento.precio}</td>`;

    let tabla = document.getElementById("tbody");
    tabla.append(fila);

}

function carritoTotal(carrito){
    let total = 0;
    carrito.forEach((item) => {
      const precio = Number(item.precio)
      total = total + precio
    })
    precioTotal.innerText = total;
  }


function capturarStorage() {
    return JSON.parse(localStorage.getItem("carrito")) || []
}

function guardarStorage(carritoNuevo) {
    localStorage.setItem("carrito", JSON.stringify(carritoNuevo))
}

function agregarCarrito(idRecital) {
    let carrito = capturarStorage()
    const recitalSelec = Recital.find(e => e.id == idRecital)
    carrito.push({ ...recitalSelec, cantidad: 1 })
    guardarStorage(carrito)
    console.log(carrito)
    mostrarCarrito(recitalSelec);
    carritoTotal(carrito);
}

mostrarProductos(Recital)


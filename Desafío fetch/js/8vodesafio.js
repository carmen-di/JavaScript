console.log("8vodesafio.js")

// const Recital = 
// [
//     {
//         id:1,
//         artista: 'Dua Lipa',
//         precio: 10500,
//         img: "images/dua.png"
//     },
//     {
//         id:2,
//         artista: 'Coldplay',
//         precio: 13500,
//         img: "images/coldplay.jpg"
//     },
//     {
//         id:3,
//         artista:'Måneskin',
//         precio: 9500,
//         img: "images/maneskin.png"
//     },
//     {
//         id:4,
//         artista:'Primavera Sound ',
//         precio: 16000,
//         img: "images/primavera.png"
//     }
// ];

const contenedorCards = document.getElementById("contCards")
console.log(contenedorCards)
const contenedorTabla = document.getElementById("tabla")
console.log(contenedorTabla)
const precioTotal = document.getElementById('precioTotal')
let boton = document.getElementById("boton");

const Recital = [];
const getProductos = async () =>
{
    try
    {
        const response = await fetch("./data.json");
        const data = await response.json();
        console.log("data from json: " , data);
        mostrarProductos(data); 
        Recital.push(...data); 
    }
    catch(error)
    {
        console.log(error);
    }
}

getProductos();

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
                            <button onclick="agregarCarrito(${element.id})" class="btn btn-click btn-outline-dark mt-auto">Comprar</button>
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
                    <td> <button class="btn btn-info btn-sm" >+</button>
                        <button onclick="eliminarDelCarrito(${evento.id})"class="btn btn-danger btn-sm" >-</button>
                    </td>
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

boton.addEventListener('click', () => {
    Swal.fire({
        title: '¿Desea continuar con la compra?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
      })
})

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
    Toastify({
        text: "Entrada seleccionada",
        style: {
            background: "#0be6a0",
            fontfamily: 'Oswald',
            fontSize: "20px",
        }
     }).showToast();
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item) 
    carrito.splice(indice, 1) 
    mostrarCarrito(indice) 
    console.log(carrito)
}

mostrarProductos(Recital)

const cargarUsuario = () =>
{
    let user = JSON.parse(localStorage.getItem('user'))
    console.log('user desde index: ',user);
    let userContainer = document.getElementById('username');
    let label = document.createElement("label");
    label.innerText = ` usuario: ${user.username} `;
    userContainer.appendChild(label);
}

cargarUsuario();



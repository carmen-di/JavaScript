console.log("main.js")

const contenedorCards = document.getElementById("contCards")
console.log(contenedorCards)
const contenedorTabla = document.getElementById("tablaCarrito")
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
                <button onclick="agregarCarrito(${element.id})" href="#tabla" class="btn btn-click mt-auto btninfo">COMPRAR</button>
            </div>
            </div>
        `
    });
}

function mostrarCarrito() {
    let carrito = capturarStorage()
    contenedorTabla.innerHTML = ""
    carrito.forEach(evento => {
        contenedorTabla.innerHTML += `
        <tr>
            <th scope="row">${evento.cantidad}</th>
            <td> <button onclick="incrementarCantidad(${evento.id})" class="btn btn-primary btn-sm" >+</button>
                <button onclick="eliminarDelCarrito(${evento.id})" class="btn btn-danger btn-sm" >-</button
            </td>
            <td>${evento.artista}</td>
            <td>$${evento.precio}</td>
        </tr>    
        `
    })
    let tabla = document.getElementById("tbody");
    carritoTotal();
}

function capturarStorage() {
    return JSON.parse(localStorage.getItem("carrito")) || []
}

function guardarStorage(carritoNuevo) {
    localStorage.setItem("carrito", JSON.stringify(carritoNuevo))
}

function agregarCarrito(idRecital) {
    let carrito = capturarStorage()
    if (isInCarrito(idRecital)) {
        incrementarCantidad(idRecital)
    } else {
        const recitalSelec = Recital.find(e => e.id == idRecital)
        carrito.push({ ...recitalSelec, cantidad: 1 })
        guardarStorage(carrito)
        console.log(carrito)
        mostrarCarrito();
    }
    Toastify({
        text: "Entrada seleccionada",
        style: {
            background: "#74db78",
            fontfamily: 'Oswald',
            fontSize: "20px",
        }
     }).showToast();
}

function incrementarCantidad(id) {
    let carrito = capturarStorage()
    const indice = carrito.findIndex(e => e.id == id)
    carrito[indice].cantidad++
    guardarStorage(carrito)
    mostrarCarrito()
}

function isInCarrito(id) {
    let carrito = capturarStorage()
    return carrito.some(e => e.id == id)
}

function eliminarDelCarrito(id) {
    let carrito = capturarStorage()
    indice = carrito.findIndex(e => e.id == id)
    if (carrito[indice].cantidad != 0) { 
        carrito[indice].cantidad--
        guardarStorage(carrito)
    }
    mostrarCarrito()
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

function carritoTotal(){
    let carrito = capturarStorage()
    let total = 0;
    carrito.forEach((item) => {
        const precio = Number(item.precio)*(item.cantidad)
        total = total + precio
    })
    footer.innerHTML = ` 
        <th></th>
        <th><button onclick="vaciarCarrito()" class="btn btn-danger">Eliminar</button></th>
        <th>TOTAL:</th> 
        <th>$${total}</th> 
        `
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

mostrarProductos(Recital)
mostrarCarrito()

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



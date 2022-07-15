const Recital = 
[
    {
        id:1,
        artista: 'Dua Lipa',
        precio: 10500,
    },
    {
        id:2,
        artista: 'Coldplay',
        precio: 13500,
    },
    {
        id:3,
        artista:'Måneskin',
        precio: 9500,
    }
]


function calcularTotal(entradas, recital){
    let suma = recital.precio * entradas;
    return suma;
}

let select = parseInt(prompt("Selecciona al artista\n 1- Dua Lipa\n 2- Coldplay\n 3- Måneskin"));
let recitalSeleccionado = Recital.find(elem=>elem.id == select)
console.log(recitalSeleccionado)
console.log("Artista seleccionado: ", recitalSeleccionado.artista);
let cantEntrada = parseInt(prompt("Selecciona la cantidad de entradas"));
console.log("Total a pagar: ",calcularTotal(cantEntrada, recitalSeleccionado))

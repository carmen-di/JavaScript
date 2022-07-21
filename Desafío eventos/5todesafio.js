console.log("5todesafio.js")

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

function calcularTotal(entradas, recital) {
    let suma = recital.precio * entradas;
    return suma;
}

let boton = document.getElementById("boton");

boton.addEventListener("click" , function(){

    let select = document.getElementById("banda");
    let cantEntrada = document.getElementById("cant_entradas");
    let resumen = document.getElementById("resumen")

    console.log("Artista seleccionado: " , select.value);
    console.log("Cantidad de entradas: " , cantEntrada.value);

    let recitalSelec = Recital.find(elem=>elem.id == select.value)

    let totalPagar= calcularTotal(cantEntrada.value, recitalSelec)

    let h4 = document.createElement("h4");
    h4.innerHTML = `<h4 >Total a pagar: </h4>
                    <span>${totalPagar}</span>`;
    
    resumen.append(h4);
    console.log("Total a pagar: ",calcularTotal(cantEntrada.value, recitalSelec))
})



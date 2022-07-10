/*Programa que pasa de un número decimal a binario*/

function calcular(numero) {
    let binario = [];
    while (numero > 0) {
        binario.push(numero % 2)
        numero = Math.floor(numero / 2)
    }
    binario.reverse();
    return binario.join("");
}

let num = prompt("Ingrese un numero decimal: ");
console.log("El número decimal",num, "en binario es: ",calcular(num));
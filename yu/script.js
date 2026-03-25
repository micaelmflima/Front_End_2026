const pet = document.getElementById("pet");
const botao = document.getElementById("btn");
const status = document.getElementById("status");
const tempoTela = document.getElementById("tempo");

const estados = {

normal: "b_n.png",
bravo: "b_p.png",
morto: "b_d.png",
comendo: "b_c.png",
alimentado: "b_a.png"

};

let tempo = 0;
let vivo = true;

function iniciarTempo(){

setInterval(() => {

if(!vivo) return;

tempo++;

tempoTela.innerHTML = "Tempo: " + tempo;

console.log("tempo:", tempo);

if(tempo == 30){

pet.src = estados.bravo;
status.innerHTML = "Status: Bravo 😡";

}

if(tempo == 60){

pet.src = estados.morto;
status.innerHTML = "Status: Morto 💀";
vivo = false;

}

},1000);

}

botao.addEventListener("click", () => {

if(!vivo){

alert("Seu pet morreu 😢");
return;

}

pet.src = estados.comendo;
status.innerHTML = "Status: Comendo 🍖";

setTimeout(()=>{

pet.src = estados.alimentado;
status.innerHTML = "Status: Alimentado 😊";

tempo = 0;

},2000);

setTimeout(()=>{

pet.src = estados.normal;
status.innerHTML = "Status: Normal";

},4000);

});

iniciarTempo();
const btnFoto = document.getElementById("btnFoto");

btnFoto.addEventListener("click", () => {

    window.open("foto.png", "_blank");

});
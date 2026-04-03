const produto = {
    "123": {"nome": "Banana", "preco": 24.00},
    "321": {"nome": "Limão", "preco": 10.90},
    "987": {"nome": "Maça", "preco": 39.90}
}

let carrinho = [];

const audio = new Audio("bip.mp3");

window.onload = () => {
    document.getElementById("cod").focus();
}

function addProduto() {
    const codValue = document.getElementById("cod");
    const qtdValue = document.getElementById("qtd");
    
    const codigo = codValue.value;
    const quantidade = qtdValue.value;

    if (!produto[codigo]) {
        AlertItem();
        return;
    }

    const produtoBase = produto[codigo];
    const item = {
        nome: produtoBase.nome,
        preco: produtoBase.preco,
        quantidade: quantidade,
        subTotal: produtoBase.preco * quantidade
    }

    carrinho.push(item);
    audio.currentTime = 0;
    audio.play();

    atualizarTela();
}

function atualizarTela() {
    const lista = getElementById("lista");
    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {
        total+= item.subTotal;

        const li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `
            <div class="d-fle justify-content-between"><strong>${item.nome}</strong>
            <small>${item.quantidade} X ${item.preco} = <strong>${item.subTotal}</strong></small></div>`;

        lista.appendChild(li);
    });
}
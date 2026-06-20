/* =============================================
   QUESTÃO 04 - script.js
   Função revelar() - Manipulação do DOM
   ============================================= */

function revelar() {

    // 1. Alterar o src da imagem principal para o jogador
    const imgPrincipal = document.querySelector('.card-img-top');
    imgPrincipal.src = 'img/_vinicius_junior.png';
    imgPrincipal.alt = 'Vinícius Júnior';

    // 2. Substituir o conteúdo dos <span> pelos dados do jogador

    // Nome (título do card)
    const spanNome = document.getElementById('Nome');
    spanNome.innerHTML = 'Vinícius José P. de Oliveira Júnior';

    // Rank (badge ao lado do nome)
    const spanRank = document.getElementById('Rank');
    spanRank.textContent = '⭐ 9,5';

    // Data de nascimento
    const spanData = document.getElementById('Data_Nas');
    spanData.textContent = '📅 Nascimento: 12/07/2000 (25 anos)';

    // Altura
    const spanAltura = document.getElementById('Alutra');
    spanAltura.textContent = '📏 Altura: 1,76 m';

    // Posição (note: o ID no HTML tem espaço "Posição ", mantendo compatibilidade)
    const spanPosicao = document.getElementById('Posição ');
    if (spanPosicao) {
        spanPosicao.textContent = '🏃 Posição: Ponta-esquerda / Atacante';
    }

    // 3. Remover a classe "placeholder" e aplicar "card-text" em todos os elementos afetados

    // Remover placeholder-glow do h5
    spanNome.classList.remove('placeholder-glow');
    spanNome.classList.add('card-title');

    // Remover placeholder do Rank badge
    spanRank.classList.remove('text-bg-secondary');
    spanRank.classList.add('text-bg-success', 'card-text');

    // Remover classe placeholder de cada span de informação
    const spanInfo = [spanData, spanAltura, spanPosicao];

    spanInfo.forEach(function(el) {
        if (el) {
            el.classList.remove('placeholder');   // 3. Remove a classe placeholder
            el.classList.add('card-text');         // 4. Aplica a classe card-text
        }
    });

    // Remove placeholder-glow do parágrafo pai
    const paragrafo = document.querySelector('.card-body p');
    if (paragrafo) {
        paragrafo.classList.remove('placeholder-glow');
    }

    // Remove aria-hidden para acessibilidade (card agora tem conteúdo real)
    const card = document.querySelector('.card');
    card.removeAttribute('aria-hidden');
}

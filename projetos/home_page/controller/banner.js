let posicaoAtual = 0;
let larguraBanner = 80;
let qntBanner = 0;

export function obterQuantidadeBanners() {
    const navegacao = document.getElementById('navegacao-banner');
    qntBanner = (navegacao) ? navegacao.children.length : 0;
}

export function moverBanner(direction) {
    const navBanner = document.getElementById('navegacao-banner');
    if (!navBanner) return;

    if (qntBanner === 0) return;

    if (direction === 'E') {
        if (posicaoAtual >= 0) {
            posicaoAtual = -(larguraBanner * (qntBanner - 1));
        } else {
            posicaoAtual += larguraBanner;
        }
    } else { // Direção 'D' (Direita)
        if (posicaoAtual <= -(larguraBanner * (qntBanner - 1))) {
            posicaoAtual = 0;
        } else {
            posicaoAtual -= larguraBanner;
        }
    }

    navBanner.style.left = `${posicaoAtual}vw`;
}


import { MetallicaAuth } from './shared.js';
import { initLogin } from './login.js';
import { initCadastro } from './cadastro.js';

// Configuração do Easter Egg
const easterEggSequence = ['m', 'e', 't', 'a', 'l', 'l', 'i'];
let keySequence = [];

function setupGlobalListeners() {
    // Troca entre formulários via links
    document.querySelectorAll('.switch-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            if (target) MetallicaAuth.switchForm(target);
        });
    });

    // Efeito de escala nos inputs ao focar
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });

    // Easter Egg: digitar "metalli"
    document.addEventListener('keydown', (e) => {
        keySequence.push(e.key.toLowerCase());
        if (keySequence.length > easterEggSequence.length) {
            keySequence.shift();
        }
        if (keySequence.join('') === easterEggSequence.join('')) {
            triggerHeadbang();
        }
    });
}

function triggerHeadbang() {
    document.body.classList.add('headbang-animation');
    setTimeout(() => document.body.classList.remove('headbang-animation'), 1500);
    console.log('🤘 HEADBANG!');
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os componentes
    initLogin();
    initCadastro();

    // Verifica usuário lembrado (definido em shared.js)
    MetallicaAuth.checkRememberedUser();
    setupGlobalListeners();
    console.log('🤘 Metallica 72 Seasons - Sistema iniciado');
});

// Adiciona estilo da animação headbang
const headbangStyle = document.createElement('style');
headbangStyle.textContent = `
    .headbang-animation {
        animation: headbang 0.5s ease-in-out 3;
    }
    @keyframes headbang {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(headbangStyle);
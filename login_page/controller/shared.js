export const MetallicaAuth = {
    state: {
        currentForm: 'loginForm',
        isLoading: false
    },

    config: {
        storageKeys: {
            rememberMe: 'metallica_remember',
            userEmail: 'metallica_user_email'
        }
    },


    switchForm(formId) {
        if (this.state.isLoading) return;

        const current = document.querySelector('.auth-form.active');
        const target = document.getElementById(formId);
        if (!target || current === target) return;

        // Sai com animação
        current.style.animation = 'fadeOutForm 0.3s ease-out forwards';
        setTimeout(() => {
            current.classList.remove('active');
            current.style.animation = '';

            // Entra com animação
            target.classList.add('active');
            target.style.animation = 'fadeInForm 0.3s ease-out';
            this.state.currentForm = formId;

            // Foco no primeiro campo
            const firstInput = target.querySelector('input');
            if (firstInput) setTimeout(() => firstInput.focus(), 100);
        }, 300);
    },


    showMessage(form, message, type = 'info') {
        // Remove mensagem anterior
        const oldMsg = form.querySelector('.feedback-message');
        if (oldMsg) oldMsg.remove();

        const msgEl = document.createElement('div');
        msgEl.className = `feedback-message ${type}`;
        msgEl.textContent = message;

        // Cores conforme o tipo
        const colorMap = {
            error: '255,0,0',
            success: '0,255,0',
            info: '255,200,0'
        };
        const rgb = colorMap[type] || colorMap.info;
        const textColor = type === 'error' ? '#ff4444' : type === 'success' ? '#44ff44' : '#ffc800';

        msgEl.style.cssText = `
            color: ${textColor};
            font-size: 0.85em;
            font-family: 'Arial', sans-serif;
            text-align: center;
            padding: 8px;
            background: rgba(${rgb}, 0.1);
            border-radius: 3px;
            border: 1px solid rgba(${rgb}, 0.2);
            margin-bottom: 15px;
            animation: fadeInMsg 0.3s ease-out;
        `;

        // Insere antes do texto "switch"
        form.insertBefore(msgEl, form.querySelector('.switch-text'));

        // Remove após 5 segundos
        setTimeout(() => {
            if (msgEl.parentElement) {
                msgEl.style.animation = 'fadeOutMsg 0.3s ease-out forwards';
                setTimeout(() => msgEl.remove(), 300);
            }
        }, 5000);
    },


    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },


    simulateAPICall(duration = 1500) {
        return new Promise(resolve => setTimeout(resolve, duration));
    },

    /**
     * Verifica se há usuário lembrado e preenche os campos
     */
    checkRememberedUser() {
        if (localStorage.getItem(this.config.storageKeys.rememberMe) === 'true') {
            const email = localStorage.getItem(this.config.storageKeys.userEmail);
            if (email) {
                const loginEmail = document.getElementById('loginEmail');
                const rememberMe = document.getElementById('rememberMe');
                if (loginEmail) loginEmail.value = email;
                if (rememberMe) rememberMe.checked = true;
            }
        }
    }
};

// Adiciona keyframes globais usados por shared
const sharedStyles = document.createElement('style');
sharedStyles.textContent = `
    @keyframes fadeOutForm {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(-10px); }
    }
    @keyframes fadeInForm {
        from { opacity: 0; transform: translateX(10px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeOutMsg {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes fadeInMsg {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(sharedStyles);
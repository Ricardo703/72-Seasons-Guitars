/* ==========================================
   CADASTRO.JS - Componente de Cadastro (CORRIGIDO)
   ========================================== */

import { MetallicaAuth } from './shared.js';

let form, nameInput, emailInput, passwordInput, confirmPasswordInput;
let strengthBar, strengthText, submitBtn;

export function initCadastro() {
    form = document.getElementById('cadastroForm');
    nameInput = document.getElementById('cadastroName');
    emailInput = document.getElementById('cadastroEmail');
    passwordInput = document.getElementById('cadastroPassword');
    confirmPasswordInput = document.getElementById('cadastroConfirmPassword');
    
    if (!form) return;
    strengthBar = form.querySelector('.strength-bar');
    strengthText = form.querySelector('.strength-text');
    submitBtn = form.querySelector('.cadastro-btn');
    
    form.addEventListener('submit', handleSubmit);
    passwordInput.addEventListener('input', updatePasswordStrength);
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    nameInput.addEventListener('input', () => clearFieldError(nameInput));
    emailInput.addEventListener('input', () => clearFieldError(emailInput));
    
    console.log('📝 Cadastro Component Ready');
}

async function handleSubmit(e) {
    e.preventDefault();
    if (MetallicaAuth.state.isLoading) return;
    
    if (!validateFields()) return;
    
    setLoading(true);
    
    try {
        await MetallicaAuth.simulateAPICall(2000);
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };
        handleSuccess(formData);
    } catch (error) {
        handleError('Registration failed. Try again.');
    } finally {
        setLoading(false);
    }
}

function validateFields() {
    let valid = true;
    
    if (!nameInput.value.trim()) {
        showFieldError(nameInput, 'Name is required');
        valid = false;
    }
    
    if (!emailInput.value.trim()) {
        showFieldError(emailInput, 'Email is required');
        valid = false;
    } else if (!MetallicaAuth.validateEmail(emailInput.value.trim())) {
        showFieldError(emailInput, 'Invalid email');
        valid = false;
    }
    
    const password = passwordInput.value;
    if (!password) {
        showFieldError(passwordInput, 'Password is required');
        valid = false;
    } else if (password.length < 6) {
        showFieldError(passwordInput, 'Minimum 6 characters');
        valid = false;
    }
    
    if (password !== confirmPasswordInput.value) {
        showFieldError(confirmPasswordInput, 'Passwords do not match');
        valid = false;
    }
    
    return valid;
}

function updatePasswordStrength() {
    const password = passwordInput.value;
    const bar = strengthBar;
    const text = strengthText;
    
    bar.className = 'strength-bar';
    text.className = 'strength-text';
    
    if (password.length === 0) {
        text.textContent = 'Password strength';
        return;
    }
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength <= 2) {
        bar.classList.add('weak');
        text.classList.add('weak');
        text.textContent = 'Weak';
    } else if (strength <= 4) {
        bar.classList.add('medium');
        text.classList.add('medium');
        text.textContent = 'Medium';
    } else {
        bar.classList.add('strong');
        text.classList.add('strong');
        text.textContent = 'Strong';
    }
}

function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    const existingMsg = form.querySelector('.password-match-message');
    if (existingMsg) existingMsg.remove();
    
    if (confirm.length === 0) return;
    
    const msg = document.createElement('div');
    msg.className = 'password-match-message';
    
    if (password === confirm) {
        msg.classList.add('success');
        msg.textContent = 'Passwords match ✓';
        clearFieldError(confirmPasswordInput);
    } else {
        msg.classList.add('error');
        msg.textContent = 'Passwords do not match';
    }
    
    confirmPasswordInput.parentElement.after(msg);
}

function showFieldError(input, message) {
    clearFieldError(input);
    input.style.borderColor = 'var(--color-error)';
    input.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.2)';
    
    const error = document.createElement('div');
    error.className = 'cadastro-message error';
    error.textContent = message;
    input.parentElement.appendChild(error);
}

function clearFieldError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    const error = input.parentElement.querySelector('.cadastro-message');
    if (error) error.remove();
}

function setLoading(isLoading) {
    MetallicaAuth.state.isLoading = isLoading;
    if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// ✅ MÉTODO CORRIGIDO
function handleSuccess(data) {
    submitBtn.classList.add('success');
    
    // Redireciona para a home após 1 segundo (tempo para o usuário ver o feedback)
    setTimeout(() => {
        window.location.href = 'home_page/view/home_page.html';
    }, 1000);
}

function handleError(message) {
    MetallicaAuth.showMessage(form, message, 'error');
}
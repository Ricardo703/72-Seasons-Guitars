/* ==========================================
   LOGIN.JS - Componente de Login
   ========================================== */

import { MetallicaAuth } from './shared.js';

let form, emailInput, passwordInput, rememberMe, submitBtn;

export function initLogin() {
    form = document.getElementById('loginForm');
    emailInput = document.getElementById('loginEmail');
    passwordInput = document.getElementById('loginPassword');
    rememberMe = document.getElementById('rememberMe');
    
    if (!form) return;
    submitBtn = form.querySelector('.login-btn');
    
    // Submit
    form.addEventListener('submit', handleSubmit);
    
    // Limpa erro ao digitar
    emailInput.addEventListener('input', () => clearFieldError(emailInput));
    passwordInput.addEventListener('input', () => clearFieldError(passwordInput));
    
    // "Esqueci minha senha"
    const forgotLink = form.querySelector('.forgot-password');
    if (forgotLink) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password recovery sent to your email (simulation)');
        });
    }
    
    console.log('🔐 Login Component Ready');
}

async function handleSubmit(e) {
    e.preventDefault();
    if (MetallicaAuth.state.isLoading) return;
    
    if (!validateFields()) return;
    
    setLoading(true);
    
    try {
        await MetallicaAuth.simulateAPICall(1500);
        
        const formData = {
            email: emailInput.value.trim(),
            password: passwordInput.value,
            rememberMe: rememberMe.checked
        };
        
        // Simulação: login bem-sucedido se senha >= 6 caracteres
        if (formData.password.length >= 6) {
            handleSuccess(formData);
        } else {
            handleError('Invalid email or password');
        }
    } catch (error) {
        handleError('Connection error. Try again.');
    } finally {
        setLoading(false);
    }
}

function validateFields() {
    let valid = true;
    const email = emailInput.value.trim();
    
    if (!email) {
        showFieldError(emailInput, 'Email is required');
        valid = false;
    } else if (!MetallicaAuth.validateEmail(email)) {
        showFieldError(emailInput, 'Invalid email format');
        valid = false;
    }
    
    if (!passwordInput.value) {
        showFieldError(passwordInput, 'Password is required');
        valid = false;
    }
    
    return valid;
}

function showFieldError(input, message) {
    clearFieldError(input);
    input.style.borderColor = 'var(--color-error)';
    input.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.2)';
    
    const error = document.createElement('div');
    error.className = 'login-error';
    error.textContent = message;
    input.parentElement.appendChild(error);
}

function clearFieldError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    const error = input.parentElement.querySelector('.login-error');
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

function handleSuccess(data) {
    submitBtn.classList.add('success');
    
    // Lembrar usuário
    if (data.rememberMe) {
        localStorage.setItem(MetallicaAuth.config.storageKeys.rememberMe, 'true');
        localStorage.setItem(MetallicaAuth.config.storageKeys.userEmail, data.email);
    } else {
        localStorage.removeItem(MetallicaAuth.config.storageKeys.rememberMe);
        localStorage.removeItem(MetallicaAuth.config.storageKeys.userEmail);
    }
    
    // Redireciona para a home após 1 segundo
    setTimeout(() => {
        window.location.href = './home_page/view/home_page.html';
    }, 1000);
}

function handleError(message) {
    submitBtn.classList.add('error');
    MetallicaAuth.showMessage(form, message, 'error');
    setTimeout(() => submitBtn.classList.remove('error'), 1000);
}
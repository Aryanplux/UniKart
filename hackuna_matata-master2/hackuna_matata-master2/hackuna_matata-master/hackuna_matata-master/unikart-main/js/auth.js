// Authentication functionality
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isSignupMode = false;
        this.isDarkMode = true; // Start in dark mode as shown in your image
        this.isOnboardingMode = false;
        
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
                this.loadTheme();
                this.checkAuthState();
                this.updateUI(); // Initialize UI state
            });
        } else {
            this.bindEvents();
            this.loadTheme();
            this.checkAuthState();
            this.updateUI(); // Initialize UI state
        }
    }

    bindEvents() {
        // Toggle between login and signup
        const toggleBtn = document.getElementById('toggleAuthBtn');
        const switchToLoginBtn = document.getElementById('switchToLogin');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Toggle button clicked'); // Debug log
                this.toggleAuthMode();
            });
        }

        if (switchToLoginBtn) {
            switchToLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Switch to login clicked'); // Debug log
                this.switchToLogin();
            });
        }

        // Form submissions
        const loginForm = document.getElementById('loginFormElement');
        const signupForm = document.getElementById('signupFormElement');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // OAuth buttons
        const oauthButtons = document.querySelectorAll('.oauth-btn');
        oauthButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleOAuthLogin(e);
            });
        });

        // Dark mode toggle
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Dark mode button clicked'); // Debug log
                this.toggleDarkMode();
            });
        }
    }

    toggleAuthMode() {
        console.log('Toggling auth mode from', this.isSignupMode ? 'signup' : 'login');
        this.isSignupMode = !this.isSignupMode;
        this.updateUI();
    }

    switchToLogin() {
        console.log('Switching to login mode');
        this.isSignupMode = false;
        this.updateUI();
    }

    updateUI() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const toggleBtn = document.getElementById('toggleAuthBtn');

        console.log('Updating UI - isSignupMode:', this.isSignupMode);

        if (loginForm && signupForm && toggleBtn) {
            if (this.isSignupMode) {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
                toggleBtn.textContent = 'Log In';
                console.log('Showing signup form');
            } else {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
                toggleBtn.textContent = 'Sign Up';
                console.log('Showing login form');
            }
        } else {
            console.error('Could not find form elements:', { loginForm, signupForm, toggleBtn });
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        // Show loading state
        const submitBtn = e.target.querySelector('.auth-submit-btn');
        this.showButtonLoading(submitBtn, 'Logging in...');

        // Simulate login process
        setTimeout(() => {
            const username = loginData.email.split('@')[0] || 'User';
            this.onLoginSuccess({ username });
        }, 1000);
    }

    handleSignup(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const signupData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            dateOfBirth: formData.get('dateOfBirth')
        };

        // Validate passwords match
        if (signupData.password !== signupData.confirmPassword) {
            this.showError("Passwords don't match!");
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('.auth-submit-btn');
        this.showButtonLoading(submitBtn, 'Creating account...');

        // Simulate signup process
        setTimeout(() => {
            this.onSignupComplete({
                name: signupData.username,
                email: signupData.email,
                dateOfBirth: signupData.dateOfBirth
            });
        }, 1000);
    }

    handleOAuthLogin(e) {
        const provider = e.currentTarget.dataset.provider;
        const action = e.currentTarget.dataset.action || 'login';
        
        console.log(`${action} with ${provider}`);
        
        // Show loading state
        this.showButtonLoading(e.currentTarget, `Connecting to ${provider}...`);
        
        // Simulate OAuth process
        setTimeout(() => {
            if (action === 'signup') {
                this.onSignupComplete({ 
                    name: `${provider}User`, 
                    email: `${provider.toLowerCase()}@example.com` 
                });
            } else {
                this.onLoginSuccess({ username: `${provider}User` });
            }
        }, 1500);
    }

    onLoginSuccess(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        this.showSuccess('Login successful! Redirecting...');
        
        // Navigate to home page
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1500);
    }

    onSignupComplete(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Switch to light mode for onboarding
        this.isDarkMode = false;
        this.applyTheme();
        
        // Hide navbar buttons during onboarding
        this.isOnboardingMode = true;
        this.updateNavbarVisibility();
        
        this.showSuccess('Account created! Setting up your profile...');
        
        // Navigate to onboarding
        setTimeout(() => {
            window.location.href = 'onboarding.html';
        }, 1500);
    }

    toggleDarkMode() {
        console.log('Toggling dark mode from', this.isDarkMode);
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.saveTheme();
    }

    applyTheme() {
        const container = document.getElementById('authContainer');
        const darkModeBtn = document.getElementById('darkModeBtn');
        
        console.log('Applying theme - isDarkMode:', this.isDarkMode);
        
        if (container && darkModeBtn) {
            if (this.isDarkMode) {
                container.classList.add('dark');
                darkModeBtn.innerHTML = '🌞 Light Mode';
                console.log('Applied dark theme');
            } else {
                container.classList.remove('dark');
                darkModeBtn.innerHTML = '🌙 Dark Mode';
                console.log('Applied light theme');
            }
        } else {
            console.error('Could not find theme elements:', { container, darkModeBtn });
        }
    }

    updateNavbarVisibility() {
        const navbarButtons = document.getElementById('navbarButtons');
        if (navbarButtons) {
            if (this.isOnboardingMode) {
                navbarButtons.style.display = 'none';
            } else {
                navbarButtons.style.display = 'flex';
            }
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme !== null) {
            this.isDarkMode = JSON.parse(savedTheme);
            console.log('Loaded saved theme:', this.isDarkMode);
        }
        this.applyTheme();
    }

    saveTheme() {
        localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
        console.log('Saved theme:', this.isDarkMode);
    }

    checkAuthState() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            console.log('Found saved user:', this.currentUser);
        }
    }

    // Utility methods
    showButtonLoading(button, loadingText = 'Loading...') {
        if (button) {
            button.dataset.originalText = button.textContent;
            button.textContent = loadingText;
            button.disabled = true;
            button.classList.add('loading');
        }
    }

    hideButtonLoading(button) {
        if (button) {
            button.textContent = button.dataset.originalText || button.textContent;
            button.disabled = false;
            button.classList.remove('loading');
        }
    }

    showError(message, duration = 3000) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-toast';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => errorDiv.remove(), 300);
        }, duration);
    }

    showSuccess(message, duration = 3000) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-toast';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => successDiv.remove(), 300);
        }, duration);
    }
}

// Add toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize auth manager when DOM is loaded
const authManager = new AuthManager();
window.authManager = authManager;

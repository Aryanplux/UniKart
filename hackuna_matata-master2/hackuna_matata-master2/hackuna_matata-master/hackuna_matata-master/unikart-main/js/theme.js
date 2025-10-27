// Theme management utility
class ThemeManager {
    constructor() {
        this.isDarkMode = true;
        this.init();
    }

    init() {
        this.loadTheme();
        this.applyTheme();
    }

    toggle() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.saveTheme();
    }

    applyTheme() {
        const body = document.body;
        const containers = document.querySelectorAll('.auth-bg, .onboarding-bg, .home-bg');
        
        containers.forEach(container => {
            if (this.isDarkMode) {
                container.classList.add('dark');
            } else {
                container.classList.remove('dark');
            }
        });

        // Update theme toggle buttons
        const themeButtons = document.querySelectorAll('.dark-mode-btn, .theme-toggle');
        themeButtons.forEach(btn => {
            btn.innerHTML = this.isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode';
        });
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme !== null) {
            this.isDarkMode = JSON.parse(savedTheme);
        }
    }

    saveTheme() {
        localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
    }

    // Get current theme
    get currentTheme() {
        return this.isDarkMode ? 'dark' : 'light';
    }

    // Set theme programmatically
    setTheme(isDark) {
        this.isDarkMode = isDark;
        this.applyTheme();
        this.saveTheme();
    }
}

// Global theme manager instance
window.themeManager = new ThemeManager();

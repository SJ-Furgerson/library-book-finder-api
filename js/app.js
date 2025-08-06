// Main Application Entry Point - Netlify Compatible
console.log('🚀 Starting Stacks...');

// Application configuration
const APP_CONFIG = {
    version: '1.0.0',
    isStatic: true, // Flag for static hosting
    maxRecommendations: 6,
    cacheTimeout: 30 * 60 * 1000, // 30 minutes
    enableLibraryAPI: false // Disabled for static hosting
};

// Application state
const AppState = {
    isInitialized: false,
    currentUser: null,
    lastSearch: null,
    preferences: {}
};

// Main application class
class StacksApp {
    constructor() {
        this.ui = null;
        this.recommendationEngine = null;
        this.isReady = false;
    }

    // Initialize the application
    async initialize() {
        try {
            console.log('📱 Initializing Stacks application...');
            
            // Check if DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                this.start();
            }
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to start the application. Please refresh the page.');
        }
    }

    // Start the application
    start() {
        try {
            // Check if required elements exist
            if (!this.checkRequiredElements()) {
                throw new Error('Required DOM elements not found');
            }

            // Initialize UI manager
            this.ui = ui;
            this.recommendationEngine = recommendationEngine;
            
            // Load user preferences
            this.loadUserPreferences();
            
            // Start the UI
            this.ui.initialize();
            
            // Mark as ready
            this.isReady = true;
            AppState.isInitialized = true;
            
            console.log('✅ Stacks is ready!');
            
        } catch (error) {
            console.error('Failed to start app:', error);
            this.showError('Something went wrong. Please refresh the page.');
        }
    }

    // Check if all required DOM elements exist
    checkRequiredElements() {
        const requiredElements = [
            'question-container',
            'results-container',
            'progress-fill',
            'current-question',
            'header-lottie'
        ];

        for (const elementId of requiredElements) {
            if (!document.getElementById(elementId)) {
                console.error(`Required element not found: ${elementId}`);
                return false;
            }
        }

        return true;
    }

    // Load user preferences from localStorage (works on Netlify)
    loadUserPreferences() {
        try {
            const saved = localStorage.getItem('stacks_preferences');
            if (saved) {
                AppState.preferences = JSON.parse(saved);
                console.log('📚 Loaded user preferences');
            }
        } catch (error) {
            console.log('No saved preferences found');
            AppState.preferences = {};
        }
    }

    // Save user preferences to localStorage (works on Netlify)
    saveUserPreferences(preferences) {
        try {
            AppState.preferences = { ...AppState.preferences, ...preferences };
            localStorage.setItem('stacks_preferences', JSON.stringify(AppState.preferences));
            console.log('💾 Saved user preferences');
        } catch (error) {
            console.warn('Failed to save preferences:', error);
        }
    }

    // Show error message to user
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #f8d7da;
            color: #721c24;
            padding: 1rem 2rem;
            border-radius: 8px;
            border: 1px solid #f5c6cb;
            z-index: 1000;
            font-family: inherit;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            max-width: 90%;
            text-align: center;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    // Show success message to user
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #d4edda;
            color: #155724;
            padding: 1rem 2rem;
            border-radius: 8px;
            border: 1px solid #c3e6cb;
            z-index: 1000;
            font-family: inherit;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            max-width: 90%;
            text-align: center;
        `;
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 3000);
    }

    // Track user analytics (placeholder for future implementation)
    trackEvent(eventName, data = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
        
        // Netlify Analytics (if enabled)
        if (typeof netlifyAnalytics !== 'undefined') {
            netlifyAnalytics.track(eventName, data);
        }
        
        console.log(`📊 Event: ${eventName}`, data);
    }

    // Get application info
    getInfo() {
        return {
            version: APP_CONFIG.version,
            isReady: this.isReady,
            isStatic: APP_CONFIG.isStatic,
            questionsCount: typeof questions !== 'undefined' ? questions.length : 0,
            booksCount: typeof books !== 'undefined' ? books.length : 0,
            state: AppState,
            location: window.location.href
        };
    }

    // Method to manually trigger app restart (useful for debugging)
    restart() {
        console.log('🔄 Restarting application...');
        this.isReady = false;
        AppState.isInitialized = false;
        
        // Clear any existing UI state
        if (this.ui) {
            this.ui.restart();
        } else {
            // Fallback manual restart
            window.location.reload();
        }
    }
}

// Global error handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    if (window.stacksApp) {
        window.stacksApp.showError('An unexpected error occurred. Please refresh the page.');
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (window.stacksApp) {
        window.stacksApp.showError('Something went wrong. Please try again.');
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Create and start the application
window.stacksApp = new StacksApp();
window.stacksApp.initialize();

// Export for debugging (available in browser console)
if (typeof window !== 'undefined') {
    window.StacksDebug = {
        app: window.stacksApp,
        config: APP_CONFIG,
        state: AppState,
        questions: typeof questions !== 'undefined' ? questions : null,
        books: typeof books !== 'undefined' ? books : null,
        ui: typeof ui !== 'undefined' ? ui : null,
        engine: typeof recommendationEngine !== 'undefined' ? recommendationEngine : null,
        restart: () => window.stacksApp.restart(),
        info: () => window.stacksApp.getInfo()
    };
    
    console.log('🔧 Debug tools available at window.StacksDebug');
}
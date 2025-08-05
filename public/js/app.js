// Main Application Entry Point
console.log('🚀 Starting Stacks...');

// Application configuration
const APP_CONFIG = {
    version: '1.0.0',
    apiUrl: 'http://localhost:3000/api',
    maxRecommendations: 6,
    cacheTimeout: 30 * 60 * 1000, // 30 minutes
    enableLibraryAPI: true
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

    // Load user preferences from localStorage
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

    // Save user preferences to localStorage
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

    // Track user analytics (placeholder for future implementation)
    trackEvent(eventName, data = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
        console.log(`📊 Event: ${eventName}`, data);
    }

    // Get application info
    getInfo() {
        return {
            version: APP_CONFIG.version,
            isReady: this.isReady,
            questionsCount: questions.length,
            booksCount: books.length,
            state: AppState
        };
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

// Create and start the application
window.stacksApp = new StacksApp();
window.stacksApp.initialize();

// Export for debugging
if (typeof window !== 'undefined') {
    window.StacksDebug = {
        app: window.stacksApp,
        config: APP_CONFIG,
        state: AppState,
        questions: questions,
        books: books,
        ui: ui,
        engine: recommendationEngine
    };
}
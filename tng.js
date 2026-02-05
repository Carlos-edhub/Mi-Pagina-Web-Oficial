/**
 * tng_shops - Enhanced JavaScript
 * Handles WhatsApp integration, product search, and UI interactions
 */

// Configuration
const CONFIG = {
    PHONE: '34663079312',
    WHATSAPP_BASE_URL: 'https://wa.me',
    SEARCH_DEBOUNCE_DELAY: 300,
    ANIMATION_DURATION: 300,
    SUCCESS_MESSAGE_DURATION: 3000
};

// DOM Elements Cache
const ELEMENTS = {
    searchInput: null,
    productGrid: null,
    productCards: null,
    waLink: null,
    yearElement: null,
    skipLink: null
};

// State Management
const STATE = {
    searchTimeout: null,
    isInitialized: false,
    products: []
};

/**
 * Utility Functions
 */
const Utils = {
    /**
     * Safely query DOM element
     */
    getElement: (selector) => {
        try {
            return document.querySelector(selector);
        } catch (error) {
            console.warn(`Element not found: ${selector}`, error);
            return null;
        }
    },

    /**
     * Safely query multiple DOM elements
     */
    getElements: (selector) => {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            console.warn(`Elements not found: ${selector}`, error);
            return [];
        }
    },

    /**
     * Debounce function for search
     */
    debounce: (func, delay) => {
        return (...args) => {
            clearTimeout(STATE.searchTimeout);
            STATE.searchTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Create WhatsApp URL with message
     */
    createWhatsAppUrl: (message) => {
        try {
            const encodedMessage = encodeURIComponent(message);
            return `${CONFIG.WHATSAPP_BASE_URL}/${CONFIG.PHONE}?text=${encodedMessage}`;
        } catch (error) {
            console.error('Error creating WhatsApp URL:', error);
            return `${CONFIG.WHATSAPP_BASE_URL}/${CONFIG.PHONE}`;
        }
    },

    /**
     * Show temporary message
     */
    showMessage: (message, type = 'info') => {
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        messageEl.setAttribute('role', 'alert');
        messageEl.setAttribute('aria-live', 'polite');
        
        Object.assign(messageEl.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            backgroundColor: type === 'success' ? '#22c55e' : '#e11d48',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '600',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease'
        });

        document.body.appendChild(messageEl);

        // Animate in
        requestAnimationFrame(() => {
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateY(0)';
        });

        // Remove after delay
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, CONFIG.ANIMATION_DURATION);
        }, CONFIG.SUCCESS_MESSAGE_DURATION);
    },

    /**
     * Validate if string is not empty
     */
    isValidString: (str) => {
        return typeof str === 'string' && str.trim().length > 0;
    }
};

/**
 * WhatsApp Integration
 */
const WhatsApp = {
    /**
     * Initialize WhatsApp links
     */
    init: () => {
        try {
            // Set up main WhatsApp link
            if (ELEMENTS.waLink) {
                const message = 'Hola, vengo de la web tng_shops y quiero asesoría';
                ELEMENTS.waLink.href = Utils.createWhatsAppUrl(message);
                ELEMENTS.waLink.addEventListener('click', WhatsApp.handleWhatsAppClick);
            }

            // Set up order buttons
            const orderButtons = Utils.getElements('.btn-primary[onclick*="order"]');
            orderButtons.forEach(button => {
                // Remove inline onclick and add proper event listener
                const productName = button.getAttribute('onclick')?.match(/order\('([^']+)'\)/)?.[1];
                if (productName) {
                    button.removeAttribute('onclick');
                    button.addEventListener('click', () => WhatsApp.handleOrder(productName));
                }
            });

        } catch (error) {
            console.error('Error initializing WhatsApp:', error);
        }
    },

    /**
     * Handle WhatsApp link click
     */
    handleWhatsAppClick: (event) => {
        try {
            event.preventDefault();
            const url = event.currentTarget.href;
            WhatsApp.openWhatsAppWindow(url);
        } catch (error) {
            console.error('Error handling WhatsApp click:', error);
            Utils.showMessage('Error al abrir WhatsApp', 'error');
        }
    },

    /**
     * Handle product order
     */
    handleOrder: (productName) => {
        try {
            if (!Utils.isValidString(productName)) {
                console.error('Invalid product name:', productName);
                Utils.showMessage('Producto no válido', 'error');
                return;
            }

            const message = `Hola, quiero comprar *${productName}* desde la web tng_shops. ¿Disponible?`;
            const url = Utils.createWhatsAppUrl(message);
            
            WhatsApp.openWhatsAppWindow(url);
            Utils.showMessage(`Abriendo WhatsApp para comprar ${productName}...`, 'success');
            
            // Analytics tracking (if available)
            WhatsApp.trackEvent('product_order', { product_name: productName });
            
        } catch (error) {
            console.error('Error handling order:', error);
            Utils.showMessage('Error al procesar el pedido', 'error');
        }
    },

    /**
     * Open WhatsApp in new window
     */
    openWhatsAppWindow: (url) => {
        try {
            const windowFeatures = 'width=600,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no';
            window.open(url, '_blank', windowFeatures);
        } catch (error) {
            console.error('Error opening WhatsApp window:', error);
            window.location.href = url; // Fallback
        }
    },

    /**
     * Track analytics event (placeholder)
     */
    trackEvent: (eventName, data = {}) => {
        // Placeholder for analytics integration
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
        console.log('Analytics event:', eventName, data);
    }
};

/**
 * Search Functionality
 */
const Search = {
    /**
     * Initialize search functionality
     */
    init: () => {
        try {
            if (!ELEMENTS.searchInput) return;

            // Cache products for search
            Search.cacheProducts();

            // Add input event listener with debounce
            const debouncedSearch = Utils.debounce(Search.handleSearch, CONFIG.SEARCH_DEBOUNCE_DELAY);
            ELEMENTS.searchInput.addEventListener('input', debouncedSearch);
            ELEMENTS.searchInput.addEventListener('keydown', Search.handleKeydown);

            // Add clear button functionality
            Search.addClearButton();

        } catch (error) {
            console.error('Error initializing search:', error);
        }
    },

    /**
     * Cache product data for search
     */
    cacheProducts: () => {
        try {
            STATE.products = [];
            ELEMENTS.productCards = Utils.getElements('.product-grid .card');
            
            ELEMENTS.productCards.forEach(card => {
                const productName = card.getAttribute('data-name') || '';
                const productDesc = card.querySelector('.card-desc')?.textContent || '';
                
                STATE.products.push({
                    element: card,
                    name: productName.toLowerCase(),
                    description: productDesc.toLowerCase()
                });
            });
        } catch (error) {
            console.error('Error caching products:', error);
        }
    },

    /**
     * Handle search input
     */
    handleSearch: (event) => {
        try {
            const query = (event.target.value || '').toLowerCase().trim();
            
            if (query.length === 0) {
                Search.showAllProducts();
                return;
            }

            const visibleCount = Search.filterProducts(query);
            Search.updateSearchResults(visibleCount, query);
            
        } catch (error) {
            console.error('Error handling search:', error);
        }
    },

    /**
     * Handle keyboard navigation
     */
    handleKeydown: (event) => {
        if (event.key === 'Escape') {
            event.target.value = '';
            Search.showAllProducts();
        }
    },

    /**
     * Filter products based on query
     */
    filterProducts: (query) => {
        try {
            let visibleCount = 0;
            
            STATE.products.forEach(product => {
                const matchesSearch = product.name.includes(query) || 
                                     product.description.includes(query);
                
                if (matchesSearch) {
                    product.element.style.display = '';
                    product.element.removeAttribute('aria-hidden');
                    visibleCount++;
                } else {
                    product.element.style.display = 'none';
                    product.element.setAttribute('aria-hidden', 'true');
                }
            });

            return visibleCount;
        } catch (error) {
            console.error('Error filtering products:', error);
            return 0;
        }
    },

    /**
     * Show all products
     */
    showAllProducts: () => {
        try {
            STATE.products.forEach(product => {
                product.element.style.display = '';
                product.element.removeAttribute('aria-hidden');
            });
        } catch (error) {
            console.error('Error showing all products:', error);
        }
    },

    /**
     * Update search results message
     */
    updateSearchResults: (count, query) => {
        try {
            // Remove existing message if any
            const existingMessage = document.getElementById('search-results');
            if (existingMessage) {
                existingMessage.remove();
            }

            if (count === 0) {
                const message = document.createElement('div');
                message.id = 'search-results';
                message.className = 'search-results';
                message.textContent = `No se encontraron resultados para "${query}"`;
                message.setAttribute('role', 'status');
                message.setAttribute('aria-live', 'polite');
                
                Object.assign(message.style, {
                    textAlign: 'center',
                    padding: '2rem',
                    color: 'var(--muted)',
                    fontStyle: 'italic'
                });

                ELEMENTS.productGrid.parentNode.insertBefore(message, ELEMENTS.productGrid);
            }
        } catch (error) {
            console.error('Error updating search results:', error);
        }
    },

    /**
     * Add clear button to search input
     */
    addClearButton: () => {
        try {
            const container = ELEMENTS.searchInput.parentElement;
            if (!container) return;

            const clearButton = document.createElement('button');
            clearButton.type = 'button';
            clearButton.className = 'search-clear';
            clearButton.innerHTML = '×';
            clearButton.setAttribute('aria-label', 'Limpiar búsqueda');
            
            Object.assign(clearButton.style, {
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: 'var(--muted)',
                padding: '0',
                width: '20px',
                height: '20px',
                display: 'none'
            });

            container.style.position = 'relative';
            container.appendChild(clearButton);

            // Show/hide clear button
            const toggleClearButton = () => {
                clearButton.style.display = ELEMENTS.searchInput.value.length > 0 ? 'block' : 'none';
            };

            ELEMENTS.searchInput.addEventListener('input', toggleClearButton);
            
            clearButton.addEventListener('click', () => {
                ELEMENTS.searchInput.value = '';
                Search.showAllProducts();
                toggleClearButton();
                ELEMENTS.searchInput.focus();
            });

        } catch (error) {
            console.error('Error adding clear button:', error);
        }
    }
};

/**
 * Accessibility Enhancements
 */
const Accessibility = {
    /**
     * Initialize accessibility features
     */
    init: () => {
        try {
            Accessibility.setupSkipLinks();
            Accessibility.setupKeyboardNavigation();
            Accessibility.setupFocusManagement();
        } catch (error) {
            console.error('Error initializing accessibility:', error);
        }
    },

    /**
     * Setup skip links
     */
    setupSkipLinks: () => {
        if (ELEMENTS.skipLink) {
            ELEMENTS.skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(ELEMENTS.skipLink.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    target.removeAttribute('tabindex');
                }
            });
        }
    },

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation: () => {
        document.addEventListener('keydown', (e) => {
            // ESC key to close modals or reset search
            if (e.key === 'Escape') {
                if (ELEMENTS.searchInput && ELEMENTS.searchInput.value.length > 0) {
                    ELEMENTS.searchInput.value = '';
                    Search.showAllProducts();
                }
            }
        });
    },

    /**
     * Setup focus management
     */
    setupFocusManagement: () => {
        // Add focus indicators to interactive elements
        const focusableElements = 'a, button, input, [tabindex]:not([tabindex="-1"])';
        document.addEventListener('focus', (e) => {
            if (e.target.matches(focusableElements)) {
                e.target.classList.add('focused');
            }
        }, true);

        document.addEventListener('blur', (e) => {
            if (e.target.matches(focusableElements)) {
                e.target.classList.remove('focused');
            }
        }, true);
    }
};

/**
 * Utility Functions
 */
const App = {
    /**
     * Initialize the application
     */
    init: () => {
        try {
            console.log('Initializing tng_shops...');
            
            // Cache DOM elements
            ELEMENTS.searchInput = Utils.getElement('#search');
            ELEMENTS.productGrid = Utils.getElement('#grid');
            ELEMENTS.waLink = Utils.getElement('#wa-link');
            ELEMENTS.yearElement = Utils.getElement('#year');
            ELEMENTS.skipLink = Utils.getElement('.skip-link');

            // Initialize modules
            WhatsApp.init();
            Search.init();
            Accessibility.init();

            // Set current year
            if (ELEMENTS.yearElement) {
                ELEMENTS.yearElement.textContent = new Date().getFullYear();
            }

            // Add loading complete indicator
            document.body.classList.add('loaded');
            
            STATE.isInitialized = true;
            console.log('tng_shops initialized successfully');

        } catch (error) {
            console.error('Error initializing app:', error);
            Utils.showMessage('Error al cargar la página', 'error');
        }
    },

    /**
     * Handle errors
     */
    handleError: (error, context = '') => {
        console.error(`Error in ${context}:`, error);
        Utils.showMessage('Ha ocurrido un error', 'error');
    }
};

/**
 * Global functions for backward compatibility
 */
window.order = WhatsApp.handleOrder;
window.filterProducts = (query) => {
    if (!STATE.isInitialized) {
        console.warn('App not initialized yet');
        return;
    }
    Search.filterProducts(query.toLowerCase().trim());
};

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    App.init();
}

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !STATE.isInitialized) {
        App.init();
    }
});

/**
 * Error handling for unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

/**
 * Export for testing or external use
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App, WhatsApp, Search, Utils };
}
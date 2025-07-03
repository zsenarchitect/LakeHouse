// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle with improved touch handling
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    // Touch event handling for mobile
    hamburger.addEventListener('touchstart', (e) => {
        e.preventDefault();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Click event for desktop
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => {
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
        
        // Add touch feedback for mobile
        n.addEventListener('touchstart', () => {
            n.style.transform = 'scale(0.95)';
        });
        
        n.addEventListener('touchend', () => {
            setTimeout(() => {
                n.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Enhanced navbar background on scroll with mobile optimization
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                navbar.style.boxShadow = 'none';
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Form handling with mobile-friendly validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Enhanced validation with mobile-friendly messages
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // For demo purposes, just show a success message
        // In a real implementation, you would send this data to your server
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Mobile-friendly notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 300px;
        word-wrap: break-word;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
    
    // Allow manual dismissal
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
}

// Enhanced Intersection Observer for animations with mobile optimization
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation with mobile performance optimization
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .stat, .section-title, .screenshot-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Screenshot gallery scroll animation
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    screenshotItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add touch feedback for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .floating-card, .feature-card, .contact-card');
    
    interactiveElements.forEach(el => {
        // Touch feedback for mobile
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', () => {
            setTimeout(() => {
                el.style.transform = '';
            }, 150);
        });
    });
    
    // Fallback: Ensure images are visible after a timeout in case observer fails
    setTimeout(() => {
        const hiddenScreenshotItems = document.querySelectorAll('.screenshot-item[style*="opacity: 0"]');
        hiddenScreenshotItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    }, 2000);
});

// Enhanced parallax effect with mobile optimization
let tickingParallax = false;
window.addEventListener('scroll', () => {
    if (!tickingParallax) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const floatingCards = document.querySelectorAll('.floating-card');
            
            if (hero && floatingCards.length > 0) {
                // Only apply parallax on larger screens
                if (window.innerWidth > 768) {
                    floatingCards.forEach((card, index) => {
                        const speed = 0.2 + (index * 0.1);
                        card.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                }
            }
            tickingParallax = false;
        });
        tickingParallax = true;
    }
});

// Enhanced modal functionality with mobile optimizations
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
        
        // Prevent body scroll on mobile
        document.body.style.overflow = 'hidden';
        
        // Add loading state
        modalImg.style.opacity = '0';
        modalImg.onload = () => {
            modalImg.style.opacity = '1';
        };
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside the image
window.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Mobile-specific optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Add viewport height fix for mobile browsers
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Add touch-action improvements for better scrolling
    const scrollableElements = document.querySelectorAll('.hero, .screenshot-gallery, .installation-section');
    scrollableElements.forEach(el => {
        el.style.touchAction = 'pan-y';
    });
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Set initial opacity based on whether image is already loaded
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            img.addEventListener('error', () => {
                img.style.opacity = '1'; // Show even if there's an error
            });
        }
    });
    
    // Add lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Tab navigation improvements
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus visible styles for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.classList.add('focus-visible');
        });
        
        el.addEventListener('blur', () => {
            el.classList.remove('focus-visible');
        });
    });
});

// Responsive DOM reordering for floating cards on mobile
function reorderHeroCardsForMobile() {
    const heroContainer = document.querySelector('.hero-container');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroVisual = document.querySelector('.hero-visual');
    const heroCards = document.querySelector('.hero-cards-container');
    if (!heroContainer || !heroButtons || !heroVisual || !heroCards) return;

    if (window.innerWidth <= 768) {
        // Move cards after buttons if not already there
        if (heroButtons.nextElementSibling !== heroCards) {
            heroButtons.parentNode.insertBefore(heroCards, heroButtons.nextElementSibling);
        }
    } else {
        // Restore cards to hero-visual if not already there
        if (heroVisual && heroVisual.firstElementChild !== heroCards) {
            heroVisual.appendChild(heroCards);
        }
    }
}



// Dynamic content loading from webnote.json
async function loadWebNoteContent() {
    try {
        console.log('Loading webnote.json...');
        const response = await fetch('webnote.json');
        const data = await response.json();
        console.log('Loaded data:', data);
        
        // Update navigation based on shared_note
        updateNavigation(data.shared_note.navigation);
        
        // Update slogan
        updateSlogan(data.shared_note.slogan);
        
        // Update feature cards on feature.html
        if (window.location.pathname.includes('feature.html')) {
            updateFeatureCards(data.feature_note);
        }
        
        // Update individual feature pages
        updateFeaturePage(data.feature_note);
        
        console.log('Dynamic content loading completed');
    } catch (error) {
        console.error('Error loading webnote.json:', error);
    }
}

function updateNavigation(navigation) {
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('index.html#home')) {
            link.textContent = navigation.home;
        } else if (href.includes('feature.html')) {
            link.textContent = navigation.feature;
        } else if (href.includes('#installation')) {
            link.textContent = navigation.installation;
        } else if (href.includes('contact.html')) {
            link.textContent = navigation.contact;
        }
    });
    
    // Update footer links too
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('index.html#home')) {
            link.textContent = navigation.home;
        } else if (href.includes('feature.html')) {
            link.textContent = navigation.feature;
        } else if (href.includes('#installation')) {
            link.textContent = navigation.installation;
        } else if (href.includes('contact.html')) {
            link.textContent = navigation.contact;
        }
    });
}

function updateSlogan(slogan) {
    // Update hero description on index.html
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        heroDescription.textContent = slogan;
    }
    
    // Update footer brand description
    const footerBrand = document.querySelector('.footer-brand p');
    if (footerBrand) {
        footerBrand.textContent = slogan;
    }
}

function updateFeatureCards(featureNote) {
    console.log('Updating feature cards...');
    const featureCards = document.querySelectorAll('.feature-card');
    console.log('Found feature cards:', featureCards.length);
    
    featureCards.forEach(card => {
        const title = card.querySelector('h3[data-feature]');
        const description = card.querySelector('p[data-feature]');
        
        if (title && description) {
            const featureKey = title.getAttribute('data-feature');
            console.log('Processing feature:', featureKey);
            if (featureKey && featureNote[featureKey]) {
                title.textContent = featureNote[featureKey].title;
                description.textContent = featureNote[featureKey].description_card;
                console.log('Updated:', featureKey, 'to', featureNote[featureKey].title);
            }
        }
    });
}

function updateFeaturePage(featureNote) {
    // Get current page feature
    const currentPage = window.location.pathname;
    let featureKey = null;
    
    if (currentPage.includes('areatakeoff')) {
        featureKey = 'feature_areatakeoff';
    } else if (currentPage.includes('objmanager')) {
        featureKey = 'feature_objmanager';
    } else if (currentPage.includes('contentmerger')) {
        featureKey = 'feature_contentmerger';
    } else if (currentPage.includes('layercolorrandomizer')) {
        featureKey = 'feature_layercolorrandomizer';
    } else if (currentPage.includes('randomselect')) {
        featureKey = 'feature_randomselect';
    }
    
    if (featureKey && featureNote[featureKey]) {
        const feature = featureNote[featureKey];
        
        // Update page title
        const pageTitle = document.querySelector(`.hero-title[data-feature="${featureKey}"]`);
        if (pageTitle) {
            pageTitle.textContent = feature.title;
        }
        
        // Update description
        const description = document.querySelector(`.hero-description[data-feature="${featureKey}"]`);
        if (description) {
            description.textContent = feature.description_page;
        }
        
        // Update command
        const commandElement = document.querySelector(`.gallery-description strong[data-feature="${featureKey}"]`);
        if (commandElement) {
            commandElement.textContent = feature.command;
        }
        
        // Update document title
        document.title = `${feature.title} - LakeHouse Software Solution`;
    }
}

function getFeatureKeyFromTitle(title) {
    const titleMap = {
        'AreaTakeOff': 'feature_areatakeoff',
        'ObjManager': 'feature_objmanager',
        'ContentMerger': 'feature_contentmerger',
        'LayerColorRandomizer': 'feature_layercolorrandomizer',
        'RandomSelect': 'feature_randomselect'
    };
    return titleMap[title];
}

// Load content when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load dynamic content
    loadWebNoteContent();
    
    // Initialize existing functionality
    reorderHeroCardsForMobile();
    window.addEventListener('resize', reorderHeroCardsForMobile);
    window.addEventListener('orientationchange', reorderHeroCardsForMobile);
}); 
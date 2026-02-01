// ========================================
// GET STARTED PAGE - Interactive Features
// ========================================

// Scroll Reveal Animation
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

// Card Hover Effects
const initCardEffects = () => {
    const cards = document.querySelectorAll('.user-type-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-green)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = 'transparent';
            }
        });
    });
};

// Page Load Animation
const pageLoadAnimation = () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
};

// Initialize all features
const init = () => {
    pageLoadAnimation();
    revealElements();
    initCardEffects();
    
    // Run reveal on scroll
    window.addEventListener('scroll', revealElements);
    
    // Stagger animation for cards
    const cards = document.querySelectorAll('.user-type-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('active');
        }, index * 200);
    });
};

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
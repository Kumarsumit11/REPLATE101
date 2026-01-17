// ========================================
// REPLATE - Interactive Features
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

// Counter Animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter, .stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let count = 0;
        
        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Check if element is in viewport before animating
        const rect = counter.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            updateCounter();
        }
    });
};

// Floating CTA Button Show/Hide
const handleFloatingCTA = () => {
    const floatingCTA = document.getElementById('floatingCta');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 500) {
        floatingCTA.classList.add('visible');
    } else {
        floatingCTA.classList.remove('visible');
    }
};

// Smooth Scroll for Navigation Links
const smoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Navbar Background on Scroll
const handleNavbar = () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
};

// Initialize all animations and interactions
const init = () => {
    // Run on load
    revealElements();
    animateCounters();
    smoothScroll();
    
    // Run on scroll
    window.addEventListener('scroll', () => {
        revealElements();
        animateCounters();
        handleFloatingCTA();
        handleNavbar();
    });
    
    // CTA Button Actions
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .floating-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Thank you for your interest in Replate! Our registration system is coming soon. Stay tuned!');
        });
    });
    
    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.borderLeft = '4px solid var(--primary-green)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.borderLeft = 'none';
        });
    });
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
};

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

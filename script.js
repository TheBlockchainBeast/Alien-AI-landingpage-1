// Particle animation
function createParticles() {
    const particles = document.querySelector('.particles');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 3 + Math.random() * 7;
        const delay = Math.random() * -20;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary);
            left: ${x}%;
            top: ${y}%;
            opacity: 0;
            border-radius: 50%;
            animation: float ${duration}s linear infinite;
            animation-delay: ${delay}s;
        `;

        particles.appendChild(particle);
    }
}

// Enhanced glitch effect
function enhanceGlitch() {
    const glitchText = document.querySelector('.glitch-text');
    let isGlitching = false;

    setInterval(() => {
        if (!isGlitching) {
            isGlitching = true;
            const intensity = Math.random() * 10;

            glitchText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;

            setTimeout(() => {
                glitchText.style.transform = 'none';
                isGlitching = false;
            }, 50);
        }
    }, 2000);
}

// Copy address functionality
function copyAddress() {
    const address = '3jLv8Rk1uuyav1rmvitgZXvUPZmbVVX2y7CtwCM7pump';
    navigator.clipboard.writeText(address)
        .then(() => {
            const btn = document.querySelector('.primary-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';

            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        })
        .catch(err => console.error('Failed to copy:', err));
}

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animate class to all children that need animation
            entry.target.querySelectorAll('.tech-card, .token-stat, .roadmap-card').forEach(el => {
                el.classList.add('animate');
            });
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.full-height').forEach(section => {
    observer.observe(section);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    enhanceGlitch();
    initCustomCursor();

    // Set initial visibility
    document.querySelectorAll('.tech-card, .token-stat, .roadmap-card').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            navLinks.classList.remove('active');
        }
    });
});

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { 
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% { 
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Custom cursor
function initCustomCursor() {
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let cursorVisible = true;
    let cursorEnlarged = false;

    // Track cursor position
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    function updateCursor(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update dot position immediately
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }

    // Smooth outline following
    function animateCursor() {
        // Calculate smooth movement for outline
        let dx = mouseX - outlineX;
        let dy = mouseY - outlineY;

        outlineX += dx * 0.2;
        outlineY += dy * 0.2;

        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;

        requestAnimationFrame(animateCursor);
    }

    document.addEventListener('mousemove', updateCursor);

    document.addEventListener('mouseenter', () => {
        cursorVisible = true;
        cursorDot.classList.remove('hidden');
        cursorOutline.classList.remove('hidden');
    });

    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        cursorDot.classList.add('hidden');
        cursorOutline.classList.add('hidden');
    });

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll([
        'a', 'button', 'input', 'textarea',
        '.feature-card', '.token-stat', '.timeline-item',
        '[role="button"]'
    ].join(','));

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorEnlarged = true;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1.5)`;
            cursorOutline.style.borderColor = 'var(--accent)';
            cursorDot.style.backgroundColor = 'var(--accent)';
        });

        el.addEventListener('mouseleave', () => {
            cursorEnlarged = false;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1)`;
            cursorOutline.style.borderColor = 'var(--primary)';
            cursorDot.style.backgroundColor = 'var(--primary)';
        });
    });

    // Start animation
    animateCursor();
} 
/**
 * Animations - Static Version
 */
const initAnimations = () => {
    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTopBtn = document.getElementById('back-to-top');

    // Sticky Header & Scroll Logic
    window.onscroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (backToTopBtn) {
                backToTopBtn.classList.remove('opacity-0', 'translate-y-10');
                backToTopBtn.classList.add('opacity-100', 'translate-y-0');
            }
        } else {
            header.classList.remove('scrolled');
            if (backToTopBtn) {
                backToTopBtn.classList.add('opacity-0', 'translate-y-10');
                backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
            }
        }
    };

    // Mobile Menu
    if (menuBtn && mobileMenu) {
        menuBtn.onclick = () => {
            mobileMenu.classList.toggle('hidden');
        };
        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.onclick = () => mobileMenu.classList.add('hidden');
        });
    }

    if (backToTopBtn) {
        backToTopBtn.onclick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    // Intersection Observer for Reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
};

// Auto-init for static loading
if (typeof document !== 'undefined') {
    window.initAnimations = initAnimations;
}

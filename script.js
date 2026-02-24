/* ============================================
   NAGABA CLINIC — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Scroll Animations ----------
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in--visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(el => observer.observe(el));

    // ---------- Navbar Scroll ----------
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
        lastScroll = currentScroll;
    });

    // ---------- Mobile Menu ----------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav__links--open');
        hamburger.classList.toggle('nav__hamburger--open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav__links--open');
            hamburger.classList.remove('nav__hamburger--open');
        });
    });

    // ---------- Smooth Scroll ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---------- Cookie Banner ----------
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');
    const cookieSettings = document.getElementById('cookieSettings');
    const cookieDetails = document.getElementById('cookieDetails');
    const cookieSave = document.getElementById('cookieSave');

    // Show banner if no consent stored
    if (!localStorage.getItem('cookie-consent')) {
        setTimeout(() => {
            cookieBanner.classList.add('cookie-banner--visible');
        }, 1500);
    }

    function hideBanner() {
        cookieBanner.classList.remove('cookie-banner--visible');
    }

    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'all');
        hideBanner();
    });

    cookieReject.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'essential');
        hideBanner();
    });

    cookieSettings.addEventListener('click', () => {
        cookieDetails.classList.toggle('cookie-banner__details--visible');
    });

    cookieSave.addEventListener('click', () => {
        const analytics = document.getElementById('cookieAnalytics').checked;
        const marketing = document.getElementById('cookieMarketing').checked;
        const consent = { essential: true, analytics, marketing };
        localStorage.setItem('cookie-consent', JSON.stringify(consent));
        hideBanner();
    });

    // ---------- Floating CTA visibility ----------
    const floatingCta = document.getElementById('floatingCta');
    const heroSection = document.getElementById('hero');

    if (floatingCta && heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    floatingCta.style.opacity = '1';
                    floatingCta.style.pointerEvents = 'auto';
                } else {
                    floatingCta.style.opacity = '0';
                    floatingCta.style.pointerEvents = 'none';
                }
            });
        }, { threshold: 0.3 });

        heroObserver.observe(heroSection);
    }

});

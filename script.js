document.addEventListener('DOMContentLoaded', () => {
    // ---- Scroll animations ----
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('anim--visible'), i * 60);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.anim').forEach(el => obs.observe(el));

    // ---- Mobile menu ----
    const burger = document.getElementById('burger');
    const links = document.getElementById('navLinks');
    burger.addEventListener('click', () => {
        links.classList.toggle('nav__links--open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('nav__links--open');
    }));

    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const t = document.querySelector(this.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // ---- FAB visibility ----
    const fab = document.getElementById('fab');
    const heroEl = document.querySelector('.hero');
    if (fab && heroEl) {
        const hobs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                fab.style.opacity = e.isIntersecting ? '0' : '1';
                fab.style.pointerEvents = e.isIntersecting ? 'none' : 'auto';
            });
        }, { threshold: 0.3 });
        hobs.observe(heroEl);
    }

    // ---- Cookies ----
    const ck = document.getElementById('cookies');
    if (!localStorage.getItem('ck-consent')) {
        setTimeout(() => ck.classList.add('cookies--visible'), 1200);
    }
    const hide = () => ck.classList.remove('cookies--visible');
    document.getElementById('ckAccept').addEventListener('click', () => { localStorage.setItem('ck-consent', 'all'); hide(); });
    document.getElementById('ckReject').addEventListener('click', () => { localStorage.setItem('ck-consent', 'essential'); hide(); });
    document.getElementById('ckSettings').addEventListener('click', () => {
        document.getElementById('ckDetails').classList.toggle('cookies__details--show');
    });
    document.getElementById('ckSave').addEventListener('click', () => {
        const c = { essential: true, analytics: document.getElementById('ckAnal').checked, marketing: document.getElementById('ckMark').checked };
        localStorage.setItem('ck-consent', JSON.stringify(c));
        hide();
    });
});

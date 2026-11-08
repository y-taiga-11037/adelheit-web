// ドキュメントが完全に読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // --- ハンバーガーメニューの処理 ---
    const burgerBtn = document.querySelector('.burger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', function() {
            burgerBtn.classList.toggle('is-open');
            navMenu.classList.toggle('is-open');
            body.classList.toggle('is-open');
        });

        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                burgerBtn.classList.remove('is-open');
                navMenu.classList.remove('is-open');
                body.classList.remove('is-open');
            });
        });
    }

    // --- スクロール連動のヘッダー縮小・ガラス化処理 ---
    const header = document.querySelector('header');
    function updateHeaderState() {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    updateHeaderState();

    // --- PRESS START などのアンカーリンクのスムーズスクロール ---
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Reveal（スクロール時のふわっと表示アニメーション） ---
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.12
        });

        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        revealElements.forEach(function(el) {
            el.classList.add('is-visible');
        });
    }
});

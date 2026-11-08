// ドキュメントが完全に読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const burgerBtn = document.querySelector('.burger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navBackdrop = document.querySelector('.nav-backdrop');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // --- ハンバーガーメニューの処理 ---
    function openMenu() {
        if (!burgerBtn || !navMenu) return;
        burgerBtn.classList.add('is-open');
        navMenu.classList.add('is-open');
        body.classList.add('is-open');
        burgerBtn.setAttribute('aria-expanded', 'true');
        burgerBtn.setAttribute('aria-label', 'メニューを閉じる');
    }

    function closeMenu(options) {
        if (!burgerBtn || !navMenu) return;
        const returnFocus = options && options.returnFocus;
        burgerBtn.classList.remove('is-open');
        navMenu.classList.remove('is-open');
        body.classList.remove('is-open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.setAttribute('aria-label', 'メニューを開く');
        if (returnFocus) burgerBtn.focus();
    }

    function toggleMenu() {
        if (navMenu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', toggleMenu);

        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        if (navBackdrop) {
            navBackdrop.addEventListener('click', function() {
                closeMenu({ returnFocus: true });
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
                closeMenu({ returnFocus: true });
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 767 && navMenu.classList.contains('is-open')) {
                closeMenu();
            }
        }, { passive: true });
    }

    // --- スクロール連動（ヘッダー・進捗バー・トップへ戻る） ---
    const header = document.querySelector('header');
    const progressBar = document.querySelector('.scroll-progress span');
    const backToTop = document.querySelector('.back-to-top');

    function updateHeaderState() {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }

    function updateScrollProgress() {
        if (!progressBar) return;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        progressBar.style.width = (progress * 100) + '%';
    }

    function updateBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 600) {
            backToTop.classList.add('is-visible');
        } else {
            backToTop.classList.remove('is-visible');
        }
    }

    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function() {
            updateHeaderState();
            updateScrollProgress();
            updateBackToTop();
            ticking = false;
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: reducedMotion.matches ? 'auto' : 'smooth'
            });
        });
    }

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
                    behavior: reducedMotion.matches ? 'auto' : 'smooth'
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

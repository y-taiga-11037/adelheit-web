// ドキュメントが完全に読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // --- ハンバーガーメニューの処理 ---
    const burgerBtn = document.querySelector('.burger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

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

    // --- ★ここから新規追加：スクロール連動の処理 ---
    const header = document.querySelector('header');

    // スクロールされるたびに実行
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            // 下にスクロールしたら 'is-scrolled' を付与
            header.classList.add('is-scrolled');
        } else {
            // 一番上に戻ったら 'is-scrolled' を外す
            header.classList.remove('is-scrolled');
        }
    });
});

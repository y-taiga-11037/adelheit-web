// ドキュメントが完全に読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーボタン、ナビゲーションメニュー、ボディ要素を取得
    const burgerBtn = document.querySelector('.burger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // ハンバーガーボタンがクリックされた時の処理
    burgerBtn.addEventListener('click', function() {
        // 各要素に 'is-open' クラスを付け外し（トグル）する
        burgerBtn.classList.toggle('is-open');
        navMenu.classList.toggle('is-open');
        body.classList.toggle('is-open'); // メニュー開いている間、背景スクロールを止める用
    });

    // スマホメニュー内のリンクがクリックされたら、メニューを自動で閉じる処理
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // クラスを削除して閉じる
            burgerBtn.classList.remove('is-open');
            navMenu.classList.remove('is-open');
            body.classList.remove('is-open');
        });
    });
});

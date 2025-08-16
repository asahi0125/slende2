(function () {
    const START_DELAY = 2600;

    // 画像読込完了を待ってから初期化（高さ計測失敗を回避）
    function initWhenImagesReady() {
        const root = document.querySelector('#bp-swiper');
        if (!root || !window.Swiper) return;

        const imgs = Array.from(root.querySelectorAll('img'));
        let left = imgs.length;
        const done = () => { if (--left <= 0) boot(); };
        if (!imgs.length) return boot();
        imgs.forEach(img => img.complete ? done() : img.addEventListener('load', done, { once: true }));
    }

    function boot() {
        // 既存があれば破棄してから
        if (window._bpSwiper && window._bpSwiper.destroy) {
            try { window._bpSwiper.destroy(true, true); } catch (e) { }
        }

        const sw = new Swiper('#bp-swiper', {
            effect: 'fade',
            fadeEffect: { crossFade: true },
            loop: true,
            speed: 600,
            slidesPerView: 1,
            allowTouchMove: false,
            preloadImages: true,
            lazy: false,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: START_DELAY,
                disableOnInteraction: false,
                pauseOnMouseEnter: false
            }
        });

        // 止まっていたら必ず再開
        const kick = () => { if (!sw.autoplay.running) sw.autoplay.start(); };
        sw.on('afterInit', kick);
        sw.on('imagesReady', kick);
        sw.on('autoplayStop', kick);
        sw.on('resize', () => sw.update());
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') kick();
        });

        clearInterval(window._bpWatch);
        window._bpWatch = setInterval(kick, 4000);  // 監視して再開

        window._bpSwiper = sw;
    }

    // DOM準備・window.onloadのどちらでも起動
    if (document.readyState === 'complete') initWhenImagesReady();
    else {
        window.addEventListener('load', initWhenImagesReady);
        document.addEventListener('DOMContentLoaded', initWhenImagesReady);
    }
})();
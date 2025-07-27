document.addEventListener("DOMContentLoaded", function () {
  const swiperInstances = {};

  function initSwiper(id) {
    const pane = document.querySelector(`#${id}`);
    const target = pane?.querySelector(".swiper");
    const paginationEl = target?.querySelector(".swiper-pagination");
    if (!target || swiperInstances[id]) return;

    swiperInstances[id] = new Swiper(target, {
      loop: true,
      autoplay: window.innerWidth >= 768 ? {
        delay: 3000,
        disableOnInteraction: false
      } : false,
      pagination: {
        el: paginationEl,
        clickable: true,
      },
      slidesPerView: window.innerWidth < 768 ? 1.2 : 3,
      spaceBetween: 16,
    });
  }

  initSwiper("lunch");

  ["lunch", "dinner", "drink"].forEach((id) => {
    const trigger = document.querySelector(`[data-bs-target="#${id}"]`);
    trigger?.addEventListener("shown.bs.tab", () => {
      setTimeout(() => initSwiper(id), 10);
    });
  });

  window.swiperInstances = swiperInstances; // Lightbox連携用にグローバル参照
});

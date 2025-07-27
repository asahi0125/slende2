let swiperInstances = {};
const initializedTabs = {};

function initSwiper(tabId, swiperClass) {
  const isMobile = window.innerWidth < 768;
  const container = document.querySelector(`#${tabId} .${swiperClass}`);
  if (!container) return;

  if (swiperInstances[tabId]) {
    swiperInstances[tabId].destroy(true, true);
  }

  const slides = container.querySelectorAll('.swiper-slide');
  const shouldLoop = slides.length > (isMobile ? 1 : 3);

  swiperInstances[tabId] = new Swiper(container, {
    slidesPerView: isMobile ? 1.2 : 3,
    spaceBetween: 16,
    loop: shouldLoop,
    autoplay: !isMobile && shouldLoop ? {
      delay: 3000,
      disableOnInteraction: false
    } : false,
    pagination: {
      el: `#${tabId} .swiper-pagination`,
      clickable: true,
    },
  });
}

document.querySelectorAll('[data-bs-toggle="tab"]').forEach(button => {
  button.addEventListener("shown.bs.tab", e => {
    const targetId = e.target.getAttribute("data-bs-target").replace("#", "");

    if (!initializedTabs[targetId]) {
      initSwiper(targetId, `${targetId}-swiper`);
      initializedTabs[targetId] = true;
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        const swiper = swiperInstances[targetId];
        if (swiper) {
          swiper.update();
          swiper.updateSize();
          swiper.slideTo(0, 0);
        }
      }, 100);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const active = document.querySelector(".tab-pane.active.show");
  const activeId = active?.id;
  if (activeId) {
    initSwiper(activeId, `${activeId}-swiper`);
    initializedTabs[activeId] = true;
  }
});

window.addEventListener("resize", () => {
  Object.keys(initializedTabs).forEach(tabId => {
    initSwiper(tabId, `${tabId}-swiper`);
  });
});

let splendeSwiper;

function initSplendeSwiper() {
  const isMobile = window.innerWidth < 768;

  if (splendeSwiper) splendeSwiper.destroy(true, true);

  splendeSwiper = new Swiper('.splendeSwiper', {
    loop: true,
    autoplay: !isMobile ? {
      delay: 5000,
      disableOnInteraction: false,
    } : false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

window.addEventListener('load', initSplendeSwiper);
window.addEventListener('resize', initSplendeSwiper);

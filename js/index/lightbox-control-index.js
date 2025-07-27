document.addEventListener("DOMContentLoaded", function () {
  const lightbox = GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    closeOnOutsideClick: true,
    zoomable: true,
    onOpen: () => {
      Object.values(window.swiperInstances || {}).forEach(swiper => swiper?.autoplay?.stop());
    },
    onClose: () => {
      if (window.innerWidth >= 768) {
        Object.values(window.swiperInstances || {}).forEach(swiper => swiper?.autoplay?.start());
      }
    },
  });
});

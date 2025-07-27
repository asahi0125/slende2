const lightbox = GLightbox({
  selector: ".glightbox",
  touchNavigation: true,
  loop: true,
  closeOnOutsideClick: true,
  onOpen: () => {
    Object.values(swiperInstances || {}).forEach(swiper => swiper?.autoplay?.stop());
  },
  onClose: () => {
    Object.values(swiperInstances || {}).forEach(swiper => {
      if (window.innerWidth >= 768) swiper?.autoplay?.start();
    });
  },
});

function initMap() {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const container = document.getElementById('google-reviews-container');
    const popupContainer = document.getElementById('lightbox-review-popups');

    service.getDetails({
        placeId: 'ChIJ5ZLxbwPITzUR6ajb_ekZUQg',
        fields: ['name', 'rating', 'reviews']
    }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            container.innerHTML = '';
            popupContainer.innerHTML = '';

            place.reviews.forEach((review, index) => {
                const stars = '★'.repeat(Math.floor(review.rating)) + '☆'.repeat(5 - Math.floor(review.rating));
                const popupId = `review-full-${index}`;

                // reviewカード表示
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
          <div class="review-card">
            <div class="author">${review.author_name}</div>
            <div class="rating">${stars} <span class="rating-number">(${review.rating})</span></div>
            <div class="time">${review.relative_time_description}</div>
            <p class="comment">${review.text.length > 60 ? review.text.slice(0, 60) + '…' : review.text}</p>
            ${review.text.length > 60 ? `<a href="#${popupId}" class="glightbox" data-gallery="review">続きを読む</a>` : ''}
          </div>
        `;
                container.appendChild(slide);

                // Lightbox用ポップアップ
                if (review.text.length > 60) {
                    const popup = document.createElement('div');
                    popup.id = popupId;
                    popup.className = 'glightbox-inline';
                    popup.innerHTML = `
            <div class="popup-content">
              <h3>${review.author_name}様のご感想</h3>
              <p>${review.text}</p>
              <p style="text-align:right; font-size:0.9rem; color:gray;">${review.relative_time_description}</p>
            </div>
          `;
                    popupContainer.appendChild(popup);
                }
            });

            // Swiper再初期化（初期化済みなら破棄）
            if (window.reviewSwiper?.destroy) {
                window.reviewSwiper.destroy(true, true);
            }

            const isMobile = window.innerWidth < 768;
            const swiperOptions = {
                loop: true,
                slidesPerView: isMobile ? 1 : 1.2,
                spaceBetween: 16,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: false,
                breakpoints: {
                    768: {
                        slidesPerView: 2.2
                    },
                    1024: {
                        slidesPerView: 3,
                        autoplay: {
                            delay: 4000,
                            disableOnInteraction: false
                        }
                    }
                }
            };

            if (!isMobile && window.innerWidth >= 1024) {
                swiperOptions.autoplay = {
                    delay: 4000,
                    disableOnInteraction: false
                };
            }

            window.reviewSwiper = new Swiper('.review-swiper', swiperOptions);

            // GLightbox 初期化（毎回再初期化）
            if (window.reviewLightbox && typeof window.reviewLightbox.destroy === 'function') {
                window.reviewLightbox.destroy();
            }

            window.reviewLightbox = GLightbox({
                selector: "a.glightbox[data-gallery='review']",
                touchNavigation: true,
                loop: true,
                closeOnOutsideClick: true,
                onOpen: () => {
                    window.reviewSwiper?.autoplay?.stop();
                },
                onClose: () => {
                    if (window.innerWidth >= 1024) {
                        window.reviewSwiper?.autoplay?.start();
                    }
                }
            });

        } else {
            container.innerHTML = '<p>レビューの取得に失敗しました。</p>';
        }
    });
}
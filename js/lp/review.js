function initMap() {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({
        placeId: 'ChIJ5ZLxbwPITzUR6ajb_ekZUQg',
        fields: ['name', 'rating', 'reviews']
    }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            const container = document.getElementById('google-reviews-container');
            container.innerHTML = '';

            place.reviews.forEach(review => {
                const stars = '★'.repeat(Math.floor(review.rating)) + '☆'.repeat(5 - Math.floor(review.rating));
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
          <div class="review-card">
            <div class="author">${review.author_name}</div>
            <div class="rating">${stars} <span class="rating-number">(${review.rating})</span></div>
            <div class="time">${review.relative_time_description}</div>
            <p class="comment">${review.text}</p>
          </div>
        `;
                container.appendChild(slide);
            });

            // Swiper破棄（古い設定を残さないため）
            if (window.reviewSwiper && window.reviewSwiper.destroy) {
                window.reviewSwiper.destroy(true, true);
            }

            // スマホ判定
            const isMobile = window.innerWidth < 768;

            // Swiper設定
            const swiperOptions = {
                loop: true,
                slidesPerView: isMobile ? 1 : 1.2,
                spaceBetween: 16,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: false, // 完全にfalseで初期化（スマホもPCも手動）
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

            // PCのみ autoplay を明示的に設定
            if (!isMobile && window.innerWidth >= 1024) {
                swiperOptions.autoplay = {
                    delay: 4000,
                    disableOnInteraction: false
                };
            }

            window.reviewSwiper = new Swiper('.review-swiper', swiperOptions);
        } else {
            document.getElementById('google-reviews-container').innerHTML =
                '<p>レビューの取得に失敗しました。</p>';
        }
    });
}
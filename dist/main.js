/*
 * to include js file write: `//= include ./path-to-file`
 */


console.log('JS працює');

function destroySwiper(instance) {
    if (instance && instance instanceof Swiper && instance.initialized) {
        instance.destroy(true, true);
    }
}

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
document.addEventListener('DOMContentLoaded', () => {
//COUNTER-NUMBERS
        const section = document.querySelector('.section-values');
        const counters = document.querySelectorAll('.counter__number');

        if (!section || !counters.length) return;
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }
        function numberCountUp(element, countTo) {
            const numEl = element.querySelector('.num');
            const start = parseInt(numEl.textContent, 10) || 0;

            const duration = 3000;
            const startTime = performance.now();

            function animate(time) {
                const progress = Math.min((time - startTime) / duration, 1);
                const eased = easeOutCubic(progress + Math.random() * 0.02);

                numEl.textContent = Math.floor(start + eased * (countTo - start));

                if (progress < 1) requestAnimationFrame(animate);
            }

            requestAnimationFrame(animate);
        }

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                counters.forEach(el => {
                    if (!el.dataset.animated) {
                        const target = parseInt(el.dataset.target, 10);
                        numberCountUp(el, target);
                        el.dataset.animated = "true";
                    }
                });

                counterObserver.disconnect();
            });
        }, {threshold: 0.3});

        counterObserver.observe(section);

//  SLIDER MOB
        let ourDirectionSlider;
        const ourDirectionSelector = document.querySelector('.slider-our-directions');

        function handleResponsive() {
            if (window.innerWidth <= 1023) {
                if (!ourDirectionSlider && ourDirectionSelector) {
                    ourDirectionSlider = new Swiper('.slider-our-directions', {
                        slidesPerView: 1.,
                        spaceBetween: 16,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                    });
                } else {
                    destroySwiper(ourDirectionSlider);
                    ourDirectionSlider = null;
                }
            }
        }

        let resizeId;


        handleResponsive();

        window.addEventListener('resize', function () {
            clearTimeout(resizeId);
            resizeId = setTimeout(handleResponsive, 500);
        });


// MARQUEE
        const track = document.getElementById('track');
        const original = track.children[0];

        let contentWidth = 0;
        let x = 0;
        let speed = 2;

        function setup() {
            track.innerHTML = '';
            track.appendChild(original);

            contentWidth = original.offsetWidth;

            while (track.scrollWidth < window.innerWidth * 2) {
                track.appendChild(original.cloneNode(true));
            }
            x = 0;
        }

        function animate() {
            x -= speed;

            if (contentWidth > 0) {
                x = x % contentWidth;
            }

            track.style.transform = `translate3d(${x}px, 0, 0)`;
            requestAnimationFrame(animate);
        }

        window.addEventListener('load', () => {
            setup();
            animate();
        });

        const observer = new ResizeObserver(() => {
            setup();
        });

        observer.observe(original);

        if (document.fonts) {
            document.fonts.ready.then(() => {
                setup();
            });
        }

//SLIDER ACCORDION

        const slides = document.querySelectorAll('.slide-our-direction');
        slides.forEach((slide) => {
            slide.addEventListener('click', function () {
                if (window.innerWidth >= 1024) {
                    expand(slide);
                }
            });
        });

        function expand(target) {
            for (let slide of target.parentNode.children) {
                slide.classList.remove('expanded');
            }
            target.classList.add('expanded');
        }


        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                slides.forEach(s => s.classList.remove('expanded'));
            }
        });

        //BTN TO TOP
        const btn = document.querySelector('.btn-to-top');
        const footerBlock = document.querySelector('.footer__target-block');

        const toTop = () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        };

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toTop();
        });

        footerBlock.addEventListener('click', toTop);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });

    }
);
//# sourceMappingURL=main.js.map

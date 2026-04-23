/*
 * to include js file write: `//= include ./path-to-file`
 */
'use strict'

function destroySwiper(instance) {
    if (instance && instance instanceof Swiper && instance.initialized) {
        instance.destroy(true, true);
    }
}

document.addEventListener('DOMContentLoaded', () => {

//MOB MENU
        const nav = document.querySelector('.header__nav');
        const btnOpen = document.querySelector('.btn_burger');
        const btnClose = document.querySelector('.btn_close');
        const menuLinks = document.querySelectorAll('.menu__link');
        const backdrop = document.querySelector('.backdrop');
        const body = document.body;

        function closeMenu() {
            nav.classList.remove('open');
            body.classList.remove('disable-scroll');
            backdrop.style.display = 'none';
        }

        function openMenu() {
            nav.classList.add('open');
            backdrop.style.display = 'block';
            body.classList.add('disable-scroll');
        }

        btnOpen.addEventListener('click', (e) => {
            e.preventDefault();
            openMenu();
        });

        btnClose.addEventListener('click', closeMenu);
        backdrop.addEventListener('click', closeMenu);

        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

//SECTION-BANNER ANIM

        const banner = document.querySelector('.section-banner');
        const bg = document.querySelector('.section-banner__bg');

        const img = new Image();
        img.src = "assets/img/banner-home2.png";

        img.onload = () => {
            bg.style.backgroundImage = `url(${img.src})`;
            banner.classList.add('loaded');
        };

// parallax

        let enableParallax = window.innerWidth > 1024;

        window.addEventListener('resize', () => {
            enableParallax = window.innerWidth > 1024;
        });

        window.addEventListener('scroll', () => {
            if (!enableParallax || !bg) return;

            const scrollY = window.scrollY;
            bg.style.transform = `translateY(${scrollY * 0.15}px) scale(1.1)`;
        });

//COUNTER-NUMBERS
        const counters = document.querySelectorAll('.counter__number');

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function numberCountUp(element, countTo) {
            const numEl = element.querySelector('.num');
            if (!numEl) return;

            const start = parseInt(numEl.textContent, 10) || 0;

            const duration = 3000;
            const startTime = performance.now();

            function animate(time) {
                const progress = Math.min((time - startTime) / duration, 1);
                const eased = easeOutCubic(progress);

                const value = Math.floor(start + eased * (countTo - start));
                numEl.textContent = value;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    numEl.textContent = countTo;
                }
            }

            requestAnimationFrame(animate);
        }

        const observerCount = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const el = entry.target;

                if (el.dataset.animated) return;

                const target = parseInt(el.dataset.target, 10);

                if (isNaN(target)) return;

                numberCountUp(el, target);

                el.dataset.animated = "true";

                obs.unobserve(el);
            });
        }, { threshold: 0.3 });

        counters.forEach(el => observerCount.observe(el));

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

        function setActive(slide) {
            slides.forEach(s => s.classList.remove('expanded'));
            slide.classList.add('expanded');
        }

// desktop only
        slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => {
                if (window.innerWidth > 1024) {
                    setActive(slide);
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 1024) {
                slides.forEach(s => s.classList.remove('expanded'));
            }
        });

//  SLIDER MOB
        let ourDirectionSlider;
        const ourDirectionSelector = document.querySelector('.slider-our-directions');

        function handleResponsive() {
            if (window.innerWidth <= 1024) {
                if (!ourDirectionSlider && ourDirectionSelector) {
                    ourDirectionSlider = new Swiper('.slider-our-directions', {

                        spaceBetween: 16,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        breakpoints: {
                            320: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            }
                        }
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
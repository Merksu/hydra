document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  const parallaxElements = document.querySelectorAll('.parallax');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  if (parallaxElements.length) {
    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const shift = (1 - entry.intersectionRatio) * 22;
          entry.target.style.setProperty('--parallax-shift', `${shift.toFixed(1)}px`);
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    parallaxElements.forEach((item) => parallaxObserver.observe(item));
  }

  const slider = document.querySelector('[data-slider]');
  if (slider) {
    const slidesTrack = slider.querySelector('.slides');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('[data-prev]');
    const nextBtn = slider.querySelector('[data-next]');

    let current = 0;
    let timer;

    const moveTo = (index) => {
      current = (index + slides.length) % slides.length;
      slidesTrack.style.transform = `translateX(-${current * 100}%)`;
    };

    const startAutoplay = () => {
      timer = setInterval(() => moveTo(current + 1), 5000);
    };

    const resetAutoplay = () => {
      clearInterval(timer);
      startAutoplay();
    };

    prevBtn?.addEventListener('click', () => {
      moveTo(current - 1);
      resetAutoplay();
    });

    nextBtn?.addEventListener('click', () => {
      moveTo(current + 1);
      resetAutoplay();
    });

    startAutoplay();
  }
});

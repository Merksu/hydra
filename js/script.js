document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (menu?.classList.contains('open')) {
        menu.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const yearNode = document.querySelector('[data-year]');
  if (yearNode) yearNode.textContent = new Date().getFullYear();

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('[data-form-feedback]');
      if (feedback) {
        feedback.textContent = 'Dziękujemy! Oddzwonimy do Ciebie najszybciej jak to możliwe.';
      }
      form.reset();
    });
  }
});

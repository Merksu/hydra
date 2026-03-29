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
    const feedback = form.querySelector('[data-form-feedback]');
    const endpoint = form.getAttribute('action');

    const setFeedback = (message, color = '#9fd0ff') => {
      if (!feedback) return;
      feedback.textContent = message;
      feedback.style.color = color;
    };

    const validate = () => {
      const name = form.elements.name?.value.trim() || '';
      const email = form.elements.email?.value.trim() || '';
      const phone = form.elements.phone?.value.trim() || '';
      const message = form.elements.message?.value.trim() || '';

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const phoneOk = /^\+?[0-9\s()-]{7,}$/.test(phone);

      if (name.length < 2) return 'Podaj poprawne imię i nazwisko.';
      if (!emailOk) return 'Podaj poprawny adres email.';
      if (!phoneOk) return 'Podaj poprawny numer telefonu.';
      if (message.length < 10) return 'Wiadomość powinna mieć minimum 10 znaków.';

      return '';
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const validationError = validate();
      if (validationError) {
        setFeedback(validationError, '#ff9a9a');
        return;
      }

      if (!endpoint) {
        setFeedback('Brak konfiguracji formularza. Skontaktuj się telefonicznie.', '#ff9a9a');
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      setFeedback('Wysyłanie zgłoszenia...');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: new FormData(form)
        });

        if (response.ok) {
          setFeedback('Dziękujemy! Zgłoszenie zostało wysłane. Oddzwonimy najszybciej jak to możliwe.', '#7dffbf');
          form.reset();
        } else {
          setFeedback('Nie udało się wysłać formularza. Spróbuj ponownie lub zadzwoń.', '#ff9a9a');
        }
      } catch (error) {
        setFeedback('Błąd połączenia. Zadzwoń do nas bezpośrednio.', '#ff9a9a');
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }
});
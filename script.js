// script.js - small helpers for demo tracking
(function () {
  // set year in footers
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year2')?.textContent = y;
  document.getElementById('year3')?.textContent = y;

  // ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  // Add-to-cart click handler (delegated)
  document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList && el.classList.contains('add-to-cart')) {
      const card = el.closest('.product');
      const id = card?.dataset?.id || 'unknown';
      const name = card?.dataset?.name || 'unknown';
      const price = card?.dataset?.price || '0.00';

      // push GTM event
      window.dataLayer.push({
        event: 'addToCart',
        ecommerce: {
          currency: 'INR',
          value: parseFloat(price),
          items: [{ item_id: id, item_name: name, price: parseFloat(price), quantity: 1 }]
        },
        eventLabel: name
      });

      // visual feedback
      el.textContent = 'Added ✓';
      el.disabled = true;
      setTimeout(() => {
        el.textContent = 'Add to Cart';
        el.disabled = false;
      }, 1500);
    }
  });

  // contact form submit handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const message = formData.get('message') || '';

      // push GTM contact submit event
      window.dataLayer.push({
        event: 'contactSubmit',
        contact: { name: name, email: email },
        eventLabel: 'Contact Form Submitted'
      });

      // For demo: redirect to thankyou page and pass data in query (do not do this with private data on production)
      const q = new URLSearchParams({ name: name, email: email, message: message }).toString();
      window.location.href = 'thankyou.html?' + q;
    });
  }
})();

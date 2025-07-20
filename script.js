document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.privacy-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyPopup();
    });
  });
});

function toggleMenu() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('show');
}

function validateCaptcha() {
  var response = grecaptcha.getResponse();
  if (response.length === 0) {
    alert("Please verify that you're not a robot.");
    return false;
  }
  return true;
}

function handleSubmit(event) {
  event.preventDefault();
  if (!validateCaptcha()) return false;

  const form = document.getElementById('contact-form');
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('contact-form-wrapper').style.display = 'none';
      document.getElementById('thank-you-message').style.display = 'block';
    } else {
      alert('There was a problem submitting the form.');
    }
  })
  .catch(() => {
    alert('There was a network error.');
  });

  return false;
}

function openPrivacyPopup() {
  const popup = document.getElementById('privacy-popup');
  const overlay = document.getElementById('popup-overlay');

  if (!popup.classList.contains('show')) {
    popup.classList.add('show');
    overlay.classList.add('show');
  }
}

function closePrivacyPopup() {
  const popup = document.getElementById('privacy-popup');
  const overlay = document.getElementById('popup-overlay');

  popup.classList.remove('show');
  overlay.classList.remove('show');
}

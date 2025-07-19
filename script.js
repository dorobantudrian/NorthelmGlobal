document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
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
  document.getElementById('privacy-popup').style.display = 'block';
  document.getElementById('popup-overlay').style.display = 'block';
}

function closePrivacyPopup() {
  document.getElementById('privacy-popup').style.display = 'none';
  document.getElementById('popup-overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.privacy-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyPopup();
    });
  });


  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
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

let hasSubmitted = false;

function handleSubmit(event) {
  event.preventDefault();

  if (hasSubmitted) return false;
  if (!validateCaptcha()) return false;

  hasSubmitted = true;

  const form = document.getElementById('contact-form');
  const submitButton = form.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

const formData = new FormData(form);
formData.append("g-recaptcha-response", grecaptcha.getResponse());

fetch(form.action, {
  method: 'POST',
  body: JSON.stringify(Object.fromEntries(formData)),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (response.ok) {
      document.getElementById('contact-form-wrapper').style.display = 'none';
      document.getElementById('thank-you-message').style.display = 'block';
      grecaptcha.reset(); 
    } else {
      alert('There was a problem submitting the form.');
      hasSubmitted = false;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  })
  .catch(() => {
    alert('There was a network error.');
    hasSubmitted = false;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });

  return false;
}

function openPrivacyPopup() {
  const popup = document.getElementById('privacy-popup');
  const overlay = document.getElementById('popup-overlay');

  popup.classList.add('show');
  overlay.classList.add('show');
}

function closePrivacyPopup() {
  const popup = document.getElementById('privacy-popup');
  const overlay = document.getElementById('popup-overlay');

  popup.classList.remove('show');
  overlay.classList.remove('show');
}

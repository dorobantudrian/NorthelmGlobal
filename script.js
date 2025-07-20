
document.addEventListener('DOMContentLoaded', () => {
  // Activare Privacy Popup
  document.querySelectorAll('.privacy-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyPopup();
    });
  });

  // Activare formular contact
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
  const formElements = form.elements;
  const submitButton = form.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  const params = new URLSearchParams();
  for (let i = 0; i < formElements.length; i++) {
    const el = formElements[i];
    if (el.name && el.name !== "g-recaptcha-response") {
      params.append(el.name, el.value);
    }
  }

  fetch(form.action, {
    method: 'POST',
    body: params,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('contact-form-wrapper').style.display = 'none';
      document.getElementById('thank-you-message').style.display = 'block';
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

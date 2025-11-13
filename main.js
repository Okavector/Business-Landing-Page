let currentTestimonial = 0;

function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');

  if (slides.length === 0) return;

  function showTestimonial(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % slides.length;
    showTestimonial(currentTestimonial);
  }

  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + slides.length) % slides.length;
    showTestimonial(currentTestimonial);
  }

  document.querySelector('.prev')?.addEventListener('click', prevTestimonial);
  document.querySelector('.next')?.addEventListener('click', nextTestimonial);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentTestimonial = index;
      showTestimonial(currentTestimonial);
    });
  });

  setInterval(nextTestimonial, 5000);
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initContactForm() {
  const form = document.querySelector('.contact-form');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    let isValid = true;

    if (name.value.trim().length < 2) {
      showError(name, 'Name must be at least 2 characters');
      isValid = false;
    } else {
      clearError(name);
    }

    if (!isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email');
      isValid = false;
    } else {
      clearError(email);
    }

    if (message.value.trim().length < 10) {
      showError(message, 'Message must be at least 10 characters');
      isValid = false;
    } else {
      clearError(message);
    }

    if (isValid) {
      const submitBtn = form.querySelector('.submit-btn');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        form.reset();

        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }, 2000);
      }, 1000);
    }
  });
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector('.error-message') || document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;

  if (!formGroup.querySelector('.error-message')) {
    formGroup.appendChild(error);
  }

  input.classList.add('error');
}

function clearError(input) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector('.error-message');
  if (error) {
    error.remove();
  }
  input.classList.remove('error');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .testimonial-container, .contact-form').forEach(el => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTestimonialSlider();
  initContactForm();
  initScrollAnimations();
});

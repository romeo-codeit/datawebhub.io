// === Mobile menu toggle functionality ===
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// === Smooth scrolling for navigation links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === Interactive mouse follower ===
const mouseFollower = document.getElementById('mouseFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  mouseFollower.style.left = followerX + 'px';
  mouseFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// === Header background change on scroll ===
window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  header.style.backgroundColor = window.scrollY > 50 ? 'rgba(10, 10, 10, 0.98)' : 'rgba(10, 10, 10, 0.95)';
});

// === Pointer cursor on hover ===
document.addEventListener('mouseenter', (e) => {
  if (e.target.closest('.project-card, .shape-item, .testimonial-card, .carousel-button')) {
    document.body.style.cursor = 'pointer';
  }
});
document.addEventListener('mouseleave', (e) => {
  if (e.target.closest('.project-card, .shape-item, .testimonial-card, .carousel-button')) {
    document.body.style.cursor = 'none';
  }
});

// === Form submission handling (EmailJS) ===
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = this;
  const submitBtn = form.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  emailjs.sendForm('service_m9ehqeq', 'template_6sj52k2', form, 'Pn4AVFlghDEhBRty_')
    .then(() => {
      submitBtn.textContent = 'Sent!';
      form.reset();
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    })
    .catch((error) => {
      alert('Message failed to send. Please try again later.');
      console.error('EmailJS error:', error);
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});

// === Smooth focus transitions ===
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', function () {
    this.style.transform = 'translateY(-1px)';
  });
  input.addEventListener('blur', function () {
    this.style.transform = 'translateY(0)';
  });
});

// === Updated Testimonials Carousel Logic ===
const testimonialsCarousel = document.getElementById("testimonials-carousel");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

const scrollAmount = 300;
let lastScrollLeft = 0;
let lastScrollDirection = "right";

function updateTestimonialButtons() {
  const maxScrollLeft = testimonialsCarousel.scrollWidth - testimonialsCarousel.clientWidth;
  const scrollLeft = testimonialsCarousel.scrollLeft;

  if (scrollLeft <= 0) {
    backBtn.style.display = "none";
    nextBtn.style.display = "block";
  } else if (scrollLeft >= maxScrollLeft - 1) {
    nextBtn.style.display = "none";
    backBtn.style.display = "block";
  } else {
    if (lastScrollDirection === "right") {
      backBtn.style.display = "none";
      nextBtn.style.display = "block";
    } else {
      nextBtn.style.display = "none";
      backBtn.style.display = "block";
    }
  }
}

testimonialsCarousel.addEventListener("scroll", () => {
  const currentScrollLeft = testimonialsCarousel.scrollLeft;
  lastScrollDirection = currentScrollLeft > lastScrollLeft ? "right" : "left";
  lastScrollLeft = currentScrollLeft;
  updateTestimonialButtons();
});

backBtn.addEventListener("click", () => {
  testimonialsCarousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});
nextBtn.addEventListener("click", () => {
  testimonialsCarousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

// Initial call
updateTestimonialButtons();

// === Project Carousels Logic ===
function initProjectCarousel(carouselId, backBtnId, nextBtnId) {
  const carousel = document.getElementById(carouselId);
  const backBtn = document.getElementById(backBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const scrollAmount = 320;

  let lastDirection = null;

  function updateButtons() {
    const scrollLeft = carousel.scrollLeft;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    if (scrollLeft <= 0) {
      backBtn.style.display = "none";
      nextBtn.style.display = "inline-block";
      lastDirection = "forward";
    } else if (scrollLeft >= maxScrollLeft - 1) {
      backBtn.style.display = "inline-block";
      nextBtn.style.display = "none";
      lastDirection = "backward";
    } else {
      backBtn.style.display = lastDirection === "backward" ? "inline-block" : "none";
      nextBtn.style.display = lastDirection === "forward" ? "inline-block" : "none";
    }
  }

  nextBtn.addEventListener("click", () => {
    lastDirection = "forward";
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  backBtn.addEventListener("click", () => {
    lastDirection = "backward";
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  carousel.addEventListener("scroll", updateButtons);
  updateButtons();
}

document.addEventListener("DOMContentLoaded", () => {
  initProjectCarousel("carousel1", "backBtn1", "nextBtn1"); // Website Development
  initProjectCarousel("carousel2", "backBtn2", "nextBtn2"); // Data Analysis
});

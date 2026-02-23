'use strict';

// ── Nav scroll effect ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Hamburger menu ─────────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Typing effect ──────────────────────────────────────────
const phrases = [
  'test automation frameworks.',
  'CI/CD pipelines that ship fast.',
  'bulletproof API test suites.',
  'performance benchmarks with k6.',
  'BDD specs teams actually read.',
  'QA systems that scale.',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[phraseIdx];
  if (!typedEl) return;

  if (deleting) {
    typedEl.innerHTML = current.slice(0, charIdx - 1) + '<span class="cursor"></span>';
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 40);
  } else {
    typedEl.innerHTML = current.slice(0, charIdx + 1) + '<span class="cursor"></span>';
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
    setTimeout(type, 65);
  }
}
type();

// ── Counter animation ──────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = Math.ceil(duration / target);
  let current = 0;
  const timer = setInterval(() => {
    current++;
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, step);
}

// ── Intersection Observer ──────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    // Counter
    if (el.classList.contains('stat-num')) {
      animateCounter(el);
      observer.unobserve(el);
    }

    // Fade-in cards
    if (el.classList.contains('about-card') || el.classList.contains('project-card')) {
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.stat-num, .about-card, .project-card').forEach(el => {
  observer.observe(el);
});

// Project cards staggered delay
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.dataset.delay = i * 80;
});

// ── Smooth active nav link ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}` ? '#e2e8f0' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

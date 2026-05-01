// ── COUNTER UP ANIMATION ──────────────────────────
const counters = document.querySelectorAll('.num');

const animateCounter = (counter) => {
  const target = parseInt(counter.getAttribute('data-val'));
  const duration = 2000; // 2 seconds
  const stepTime = 20;   // update every 20ms
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      counter.textContent = target.toLocaleString() + '+';
      clearInterval(timer);
    } else {
      counter.textContent = Math.floor(current).toLocaleString();
    }
  }, stepTime);
};

// ── TRIGGER WHEN SECTION IS VISIBLE ──────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(counter => animateCounter(counter));
      observer.disconnect(); // run only once
    }
  });
}, { threshold: 0.3 });

// Observe the wrapper section
const wrapper = document.querySelector('.wrapper');
if (wrapper) observer.observe(wrapper);
// Mobile navigation toggle + scroll reveal
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.nav-toggle');
  var menu = document.querySelector('nav.menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  // Gentle reveal-on-scroll for cards and sections
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    var els = document.querySelectorAll('.card, .spec, .step, .embel > div, .clients > div, .hero-stats > div');
    els.forEach(function (el, i) { el.classList.add('rv'); el.style.transitionDelay = (i % 4) * 60 + 'ms'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }
});

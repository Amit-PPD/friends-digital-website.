// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.nav-toggle');
  var menu = document.querySelector('nav.menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
});

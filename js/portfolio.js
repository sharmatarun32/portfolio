(function () {
  'use strict';

  // ---- Mobile menu ----
  var toggle = document.getElementById('nav-toggle');
  var list = document.getElementById('nav-list');
  function setMenu(open) {
    list.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () { setMenu(!list.classList.contains('open')); });
  list.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && list.classList.contains('open')) { setMenu(false); toggle.focus(); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 960) setMenu(false); });

  // ---- Active nav link on scroll ----
  var links = Array.prototype.slice.call(list.querySelectorAll('a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) io.observe(s);
    });
  }

  // ---- Hide social links that still contain placeholder URLs ----
  Array.prototype.forEach.call(document.querySelectorAll('.social a'), function (a) {
    if (/YOUR-/.test(a.getAttribute('href'))) a.hidden = true;
  });

  // ---- Contact form: validate, then open the visitor's mail client ----
  // There is no backend, so nothing is sent from the page itself.
  var CONTACT_EMAIL = 'sharmatarunravi29@gmail.com';
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(id, msg) {
    var input = document.getElementById(id);
    document.getElementById(id + '-error').textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var subject = form.elements.subject.value.trim();
    var message = form.elements.message.value.trim();
    var ok = true;
    ok = setError('name', name ? '' : 'Please enter your name.') && ok;
    ok = setError('email', !email ? 'Please enter your email.' : (emailRe.test(email) ? '' : 'Please enter a valid email address.')) && ok;
    ok = setError('message', message ? '' : 'Please enter a message.') && ok;
    status.textContent = '';
    if (!ok) { status.textContent = 'Please fix the highlighted fields.'; return; }

    var body = message + '\n\n— ' + name + ' (' + email + ')';
    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject || 'Portfolio enquiry') +
      '&body=' + encodeURIComponent(body);
    status.textContent = 'Your email app should now open with the message filled in. Nothing has been sent until you press Send there. You can also write to ' + CONTACT_EMAIL + ' directly.';
  });
}());

/* =====================================================================
   Suraksha Dental Clinic — shared script for service pages
   ---------------------------------------------------------------------
   Renders the same header and footer used on index.html, then wires up
   the menu, scroll progress, reveal animations, gallery lightbox and
   structured data (Service + FAQPage + BreadcrumbList).

   Edit clinic details in CLINIC / LINKS / HOURS below.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- shared clinic details (keep in sync with index.html) ---------- */
  var CLINIC = {
    name: 'Suraksha Dental Clinic',
    shortName: 'Suraksha',
    logo: '',
    phoneDisplay: '+91 97411 04144',
    phoneTel: '+919741104144',
    addressLines: [
      '# G-1, 2, Krishna Complex,',
      'Shivanandanagar, Nagarbhavi Road,',
      'Moodalapalya, Bengaluru \u2013 560 072.'
    ],
    addressCity: 'Bengaluru',
    addressPostcode: '560072'
  };

  var LINKS = {
    whatsappCommunity: '',
    instagram: '',
    googleReviews: ''
  };

  var HOURS = [
    { days: 'Monday \u2013 Saturday', times: ['10:30 am \u2013 1:30 pm', '5:00 pm \u2013 7:00 pm'] },
    { days: 'Sunday', times: ['Closed'] }
  ];

  var HOME = 'index.html';

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function ext(u) {
    return u
      ? 'href="' + esc(u) + '" target="_blank" rel="noopener"'
      : 'href="#" data-unset="1" title="Link not set yet"';
  }

  /* ---------- icons ---------- */
  var I = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    sil: '<svg class="sil" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" preserveAspectRatio="xMidYMax slice"><circle cx="50" cy="38" r="16"/><path d="M14 100c0-22 16-36 36-36s36 14 36 36z"/></svg>'
  };

  var logoSvg = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8.2c-2.6-3-8.3-2.1-9.4 2.4-.9 3.7.9 6.8 2.2 10.4.9 2.6 1.1 6.7 3.1 6.7 1.8 0 1.6-3.8 2.6-5.4.5-.8 1.5-1.1 1.5-1.1s1 .3 1.5 1.1c1 1.6.8 5.4 2.6 5.4 2 0 2.2-4.1 3.1-6.7 1.3-3.6 3.1-6.7 2.2-10.4C24.3 6.100 18.600 5.200 16 8.200z" transform="translate(0 -1)"/><path d="M26.500 2.500v4M24.500 4.500h4" stroke-width="1.2"/></svg>';

  function contour() {
    var p = '';
    [0, 16, 32, 48, 64].forEach(function (o) {
      p += '<path d="M-100 ' + (520 + o) + ' C 200 ' + (300 + o) + ', 520 ' + (620 + o) + ', 860 ' + (420 + o) + ' S 1380 ' + (180 + o) + ', 1700 ' + (360 + o) + '"/>';
    });
    [0, 16, 32, 48].forEach(function (o) {
      p += '<path d="M-100 ' + (120 + o) + ' C 240 ' + (20 + o) + ', 560 ' + (260 + o) + ', 900 ' + (150 + o) + ' S 1400 ' + (40 + o) + ', 1700 ' + (120 + o) + '"/>';
    });
    return '<svg class="contour" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1">' + p + '</g></svg>';
  }

  var tel = 'tel:' + CLINIC.phoneTel;
  var addr = CLINIC.addressLines.map(esc).join('<br>');
  var brandInner = (CLINIC.logo ? '<img src="' + esc(CLINIC.logo) + '" alt="">' : logoSvg) + '<span>' + esc(CLINIC.shortName) + '</span>';
  var hoursFoot = HOURS.map(function (h) {
    return '<p style="margin-bottom:10px"><b style="font-weight:500">' + esc(h.days) + '</b><br>' + h.times.map(esc).join('<br>') + '</p>';
  }).join('');

  /* ---------- header ---------- */
  var header = '' +
    '<header class="site" id="header">' +
      '<div class="container nav">' +
        '<a class="brand" href="' + HOME + '" aria-label="' + esc(CLINIC.name) + ' home">' + brandInner + '</a>' +
        '<button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span></button>' +
        '<nav class="menu" id="menu" aria-label="Main">' +
          '<a href="' + HOME + '#about">About Us</a>' +
          '<a href="' + HOME + '#services">Services</a>' +
          '<a href="' + HOME + '#team">Our Team</a>' +
          '<a href="' + HOME + '#reviews">Reviews</a>' +
          '<a href="' + HOME + '#contact">Contact Us</a>' +
          '<a class="btn btn-primary btn-small" href="' + tel + '">' + I.phone + 'Call now</a>' +
        '</nav>' +
      '</div>' +
    '</header>';

  /* ---------- footer ---------- */
  var footer = '' +
    '<footer class="site">' +
      contour() +
      '<div class="container">' +
        '<div class="foot-grid">' +
          '<div><h4>Get in touch</h4><p><a href="' + tel + '">Ph. ' + esc(CLINIC.phoneDisplay) + '</a></p><p>' + addr + '</p></div>' +
          '<div><h4>Menu</h4><ul>' +
            '<li><a href="' + HOME + '#about">About</a></li><li><a href="' + HOME + '#team">Our Team</a></li>' +
            '<li><a href="' + HOME + '#services">Services</a></li><li><a href="' + HOME + '#reviews">Reviews</a></li><li><a href="' + HOME + '#contact">Contact Us</a></li></ul></div>' +
          '<div><h4>Follow us</h4><ul>' +
            '<li><a class="ig" ' + ext(LINKS.instagram) + '>' + I.ig + 'Instagram</a></li>' +
            '<li><a ' + ext(LINKS.whatsappCommunity) + '>WhatsApp community</a></li></ul></div>' +
          '<div><h4>Opening hours</h4>' + hoursFoot + '</div>' +
        '</div>' +
        '<div class="foot-bot"><span>&copy; ' + new Date().getFullYear() + ' ' + esc(CLINIC.name) + '.</span><span>' + esc(CLINIC.addressCity) + '</span></div>' +
      '</div>' +
    '</footer>';

  var headerSlot = document.getElementById('header-slot');
  var footerSlot = document.getElementById('footer-slot');
  if (headerSlot) headerSlot.outerHTML = header;
  if (footerSlot) footerSlot.outerHTML = footer;

  // WhatsApp CTAs: filled from LINKS so the URL is set in one place
  document.querySelectorAll('a[data-wa]').forEach(function (a) {
    if (LINKS.whatsappCommunity) {
      a.href = LINKS.whatsappCommunity;
      a.target = '_blank';
      a.rel = 'noopener';
      a.removeAttribute('data-unset');
      a.removeAttribute('title');
    } else {
      a.href = '#';
      a.setAttribute('data-unset', '1');
      a.title = 'Link not set yet';
    }
  });

  /* ---------- structured data ---------- */
  try {
    var body = document.body;
    var serviceName = body.getAttribute('data-service');
    var serviceSummary = body.getAttribute('data-summary');
    var pageUrl = location.href.split('#')[0];

    if (serviceName) {
      var ld = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': serviceName,
        'serviceType': serviceName,
        'description': serviceSummary || '',
        'url': pageUrl,
        'areaServed': { '@type': 'City', 'name': 'Bengaluru' },
        'provider': {
          '@type': 'Dentist',
          'name': CLINIC.name,
          'telephone': CLINIC.phoneTel,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': CLINIC.addressLines.join(' ').replace(/\s+/g, ' ').trim(),
            'addressLocality': CLINIC.addressCity,
            'postalCode': CLINIC.addressPostcode,
            'addressCountry': 'IN'
          }
        }
      };
      var s = document.createElement('script');
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(ld);
      document.head.appendChild(s);
    }

    var faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length) {
      var qa = [];
      faqItems.forEach(function (item) {
        var q = item.querySelector('summary');
        var a = item.querySelector('.faq-a');
        if (!q || !a) return;
        qa.push({
          '@type': 'Question',
          'name': q.textContent.trim(),
          'acceptedAnswer': { '@type': 'Answer', 'text': a.textContent.replace(/\s+/g, ' ').trim() }
        });
      });
      if (qa.length) {
        var fs = document.createElement('script');
        fs.type = 'application/ld+json';
        fs.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': qa
        });
        document.head.appendChild(fs);
      }
    }

    var crumbEls = document.querySelectorAll('.crumbs li');
    if (crumbEls.length) {
      var crumbs = [];
      crumbEls.forEach(function (li, i) {
        var a = li.querySelector('a');
        crumbs.push({
          '@type': 'ListItem',
          'position': i + 1,
          'name': li.textContent.trim(),
          'item': a ? new URL(a.getAttribute('href'), pageUrl).href : pageUrl
        });
      });
      var bs = document.createElement('script');
      bs.type = 'application/ld+json';
      bs.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': crumbs
      });
      document.head.appendChild(bs);
    }
  } catch (e) { /* structured data is optional */ }

  /* ---------- interactions ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // unset links do nothing
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-unset]');
    if (a) e.preventDefault();
  });

  // mobile menu
  var mb = document.getElementById('menuBtn');
  var mn = document.getElementById('menu');
  if (mb && mn) {
    var setMenu = function (o) {
      mn.classList.toggle('open', o);
      mb.setAttribute('aria-expanded', o);
    };
    mb.addEventListener('click', function () { setMenu(!mn.classList.contains('open')); });
    mn.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // header shadow + progress bar
  var hd = document.getElementById('header');
  var pg = document.getElementById('progress');
  if (hd && pg) {
    var tick = false;
    var onScroll = function () {
      tick = false;
      hd.classList.toggle('scrolled', window.scrollY > 8);
      var h = document.documentElement.scrollHeight - window.innerHeight;
      pg.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ')';
    };
    window.addEventListener('scroll', function () {
      if (!tick) { tick = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  // scroll reveal
  var targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        var dl = (parseInt(en.target.style.getPropertyValue('--i'), 10) || 0) * 90 + 1100;
        setTimeout(function () { en.target.classList.add('done'); }, dl);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  // lightbox
  var lb = document.getElementById('lb');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.addEventListener('click', function (e) {
      var t = e.target.closest('.tile.has-img');
      if (t) {
        lbImg.src = t.dataset.src;
        lbImg.alt = t.dataset.alt;
        lb.showModal();
        return;
      }
      if (e.target === lb || e.target.closest('#lb button')) lb.close();
    });
  }
})();

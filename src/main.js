import { card } from './data.js';
import './style.css';
import { supabase } from './supabase.js';
const currentPath = window.location.pathname;

if (currentPath === '/admin') {
  import('./admin.js');
} else if (currentPath === '/reset-password') {
  import('./reset-password.js');
} else {
const app = document.querySelector('#app');document.body.classList.add('light-theme');
const phone = (s='') => String(s).replace(/[^0-9]/g,'');
const contactCards = card.contacts.map((c,i)=>{
  const p = phone(c.phone);
  const w = phone(c.whatsapp || c.phone);

  const icons = [
    '<i data-lucide="shopping-bag"></i>',
    '<i data-lucide="headset"></i>',
    '<i data-lucide="briefcase-business"></i>',
    '<i data-lucide="images"></i>',
    '<i data-lucide="wallet"></i>'
  ];

  const messages = [
    "Hello Yash Ornaments, I would like to enquire about placing an order. Please share the details.",
    "Hello Yash Ornaments, I need assistance regarding your products and services. Please help me.",
    "Hello Yash Ornaments, I am interested in business and wholesale opportunities. Please share more details.",
  ];

  const whatsappUrl = w && i < 3
  ? `https://wa.me/${w}?text=${encodeURIComponent(messages[i])}`
  : '';

  return `<article class="contact-card">
    <div class="contact-icon">${icons[i]}</div>
    <div class="contact-info">
      <h3>${c.title}</h3>
      <p>${c.subtitle || ''}</p>
      ${p ? `<p class="number">${c.phone}</p>` : ''}
    </div>
    <div class="actions">
      ${p ? `<a class="button button-outline" href="tel:${p}">Call</a>` : ''}
     ${whatsappUrl ? `<a class="button button-gold" target="_blank" rel="noreferrer" href="${whatsappUrl}">WhatsApp</a>` : ''}
      <span class="placeholder">${p ? '' : 'Add number in src/data.js'}</span>
    </div>
  </article>`;
}).join('');const aboutSection = `
<section class="section about-section" id="about">
  <div class="about-layout">
    <div class="about-heading">
      <p class="eyebrow">OUR STORY</p>
      <h2>Where Your Jewellery Era Begins.</h2>
    </div>
    <div class="about-content">
      <p>Every story of elegance begins with the perfect piece.</p>
      <p>Discover timeless craftsmanship, distinctive designs and the beauty of modern luxury at Yash Ornaments.</p>
</div>
  </div>
</section>
`;
const whyUsSection = `
<section class="section why-us-section" id="why-us">
  <div class="why-us-heading">
    <p class="why-us-label">THE YASH ORNAMENTS PROMISE</p>
    <h2>Built on Trust & Craft</h2>
  </div>

  <div class="why-us-grid">
    <div>Premium Customize Jewelry Manufacturer</div>
    <div>Time to Time Delivery</div>
    <div>Proper Order Understanding</div>
    <div>Quick Response</div>
    <div>Quality Assurance</div>
    <div>Customer First Approach</div>
  </div>
</section>
`;
<CodeBlock language="javascript" editable>
const gallery = `

`;
</CodeBlock>
  const intro = document.createElement('div');
intro.className = 'brand-intro';
intro.innerHTML = `
  <img src="/images/Logo.png" alt="Yash Ornaments">
  <p>DEFINING MODERN LUXURY</p>
`;
document.body.appendChild(intro);app.innerHTML=`<main><div class="theme-toggle">
  <button id="themeToggle" type="button">☀ Light Mode</button>
</div><header class="top"><div class="brandmark"><img src="/images/Logo.png" alt="Yash Ornaments Logo"></div><div><div class="brand">${card.brand}</div><div class="tagline">${card.tagline}</div></div><button id="share" class="share">Share ↗</button></header>
<section class="hero" id="home">
  <div class="hero-copy">
    <p class="eyebrow">THE ART OF FINE JEWELLERY</p>
    <h1>${card.headline}</h1>
    <p class="desc">${card.description}</p>
    <div class="order-note">${card.note}</div>
    <div class="hero-actions">
      <a href="#gallery" class="button button-gold">Explore Collection</a>
      <a href="#contacts" class="button button-outline">Connect With Us</a>
    </div>
    <p class="hero-signature">YASH ORNAMENTS <span>— DEFINING MODERN LUXURY</span></p>
  </div>
  <div class="hero-art">
    <div class="ring" aria-hidden="true">
      <div class="ring-stone"></div>
    </div>

<video class="hero-product-image" id="heroProductVideo" muted playsinline preload="metadata">
  <source src="/images/Ladies%20Ring-01.mp4" type="video/mp4">
</video>

  </div>
</section>
<section id="contacts" class="section contacts"><div class="section-head"><p class="eyebrow">REACH THE RIGHT TEAM</p><h2>Office Contacts</h2><p class="muted">Choose a department to connect directly.</p></div><div class="contact-list">${contactCards}</div></section>${whyUsSection}${gallery.replace('<section class="section gallery-section">','<section id="gallery" class="section gallery-section">')}<section class="section address" id="address">
  <div class="section-head">
    <p class="eyebrow">OUR LOCATION</p>
    <h2>Visit Our Showroom</h2>
    <p>Experience the art of fine jewellery at Yash Ornaments.</p>
  </div>

  <div class="showroom-layout">
    <div class="showroom-map">
      <iframe
        src="https://www.google.com/maps?q=Yash+Ornaments+Manekchowk+Ahmedabad&output=embed"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <div class="showroom-details">
      <p class="eyebrow">LOCATION DETAILS</p>
      <h3>Yash Ornaments</h3>
      <p>${card.address}</p>
      <a class="button button-gold" target="_blank" rel="noreferrer" href="${card.mapUrl}">Get Directions ↗</a>
    </div>
  </div>
</section> ↗</a></section>${aboutSection}<footer><div class="footer-brand">YASH ORNAMENTS</div><small>${card.tagline}</small><div class="footer-links"><a href="${card.instagram}" target="_blank" rel="noreferrer">Instagram ↗</a></div><small>Custom & stylish designs • Gold jewellery manufacturing</small></footer></main>`;
lucide.createIcons();
document.body.classList.add('intro-active');

setTimeout(() => {
  intro.classList.add('intro-fade-out');
  document.body.classList.remove('intro-active');
  setTimeout(() => intro.remove(), 1000);
}, 2500);
document.querySelector('#share').addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:card.brand,text:'Digital contact card',url:location.href})}catch{}}else{await navigator.clipboard.writeText(location.href);document.querySelector('#share').textContent='Link copied!'}});

const themeToggle = document.querySelector('#themeToggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  themeToggle.textContent =
    document.body.classList.contains('light-theme')
      ? '☾ Dark Mode'
      : '☀ Light Mode';
});
/* JEWELLERY SLIDER CONTROLS */
const slides = document.querySelectorAll('.gallery-slide');
const galleryNext = document.querySelector('#galleryNext');
const galleryPrev = document.querySelector('#galleryPrev');
const galleryCounter = document.querySelector('#galleryCounter');

let currentSlide = 0;

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });

  if (galleryCounter) {
    galleryCounter.textContent =
      `${String(currentSlide + 1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  }
}

galleryNext?.addEventListener('click', () => {
  showSlide(currentSlide + 1);
});

galleryPrev?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
});

showSlide(0);
/* PREMIUM MOBILE NAVIGATION */
const nav = document.createElement('nav');
nav.className = 'mobile-nav';
nav.innerHTML = `
  <a href="#home">♡⌂<span>Home</span></a>
  <a href="#contacts">✆✉<span>Contact</span></a>
  <a href="#gallery"><span class="nav-icon">˖°📷 ༘</span><span>Gallery</span></a>
  <a href="https://www.google.com/maps/search/?api=1&query=Yash+Ornaments+Manekchowk+Ahmedabad" target="_blank" rel="noreferrer"><span class="nav-icon">🚗</span><span>Direction</span></a>
  <a href="#about">ⓘ<span>About Us</span></a>

 `;
document.body.appendChild(nav);
/* ACTIVE MOBILE NAVIGATION */
const navLinks = document.querySelectorAll('.mobile-nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('#home, #contacts, #gallery, #about').forEach(section => {
  sectionObserver.observe(section);
});

/* SMART JEWELLERY VIDEO */
const heroVideo = document.querySelector('#heroProductVideo');

if (heroVideo) {
  const playVideo = () => heroVideo.play().catch(() => {});

  // Mouse hover
  heroVideo.addEventListener('mouseenter', playVideo);
  heroVideo.addEventListener('mouseleave', () => heroVideo.pause());

  // Mobile touch
  heroVideo.addEventListener('click', () => {
    if (heroVideo.paused) {
      playVideo();
    } else {
      heroVideo.pause();
    }
  });

  // Play when video section enters the screen
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        playVideo();
      } else {
        heroVideo.pause();
      }
    });
  }, { threshold: 0.5 });

  videoObserver.observe(heroVideo);
}
}

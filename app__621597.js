
const products = [
  {
    name: 'Saffron Smoke No. 09',
    slug: 'saffron-smoke',
    page: 'product-saffron-smoke__621597.html',
    type: 'perfume',
    image: 'assets/images/saffron.png',
    desc: 'Saffron, black tea, incense and amber resin in the house signature extrait.',
    price: 18500,
    badge: 'Best Seller'
  },

  {
    name: 'Marble Tea Candle',
    slug: 'marble-tea',
    page: 'product-marble-tea__621597.html',
    type: 'candle',
    image: 'assets/images/marble.jpg',
    desc: 'White tea, bergamot, rice steam and limestone for bright interiors.',
    price: 7200,
    badge: 'New'
  },

  {
    name: 'Nocturne Body Oil',
    slug: 'nocturne-oil',
    page: 'product-nocturne-oil__621597.html',
    type: 'oil',
    image: 'assets/images/norture.webp',
    desc: 'Rosewood, neroli, vitamin E and vanilla husk for polished evening skin.',
    price: 9600,
    badge: 'Ritual'
  },

  {
    name: 'Velvet Fig Wardrobe',
    slug: 'velvet-fig',
    page: 'product-velvet-fig__621597.html',
    type: 'gift',
    image: 'assets/images/gift_1.webp',
    desc: 'Five miniature extrait moods arranged as a private scent fitting.',
    price: 12800,
    badge: 'Gift'
  },

  {
    name: 'Rain on Cedar',
    slug: 'rain-cedar',
    page: 'product-rain-cedar__621597.html',
    type: 'perfume',
    image: 'assets/images/rain.jpg',
    desc: 'Wet stone, cedar, iris root and silver musk with architectural restraint.',
    price: 16800,
    badge: 'Unisex'
  },

  {
    name: 'Library Ember Candle',
    slug: 'library-ember',
    page: 'product-library-ember__621597.html',
    type: 'candle',
    image: 'assets/images/libraray.webp',
    desc: 'Old paper, cognac, polished oak and amber dust for after-hours rooms.',
    price: 8400,
    badge: 'Icon'
  },

  {
    name: 'Golden Hour Hair Oil',
    slug: 'golden-hour',
    page: 'product-golden-hour__621597.html',
    type: 'oil',
    image: 'assets/images/golden.webp',
    desc: 'Mandarin peel, sandalwood and camellia for a controlled reflective finish.',
    price: 8800,
    badge: 'Glow'
  },

  {
    name: 'The Ceremony Trunk',
    slug: 'ceremony-trunk',
    page: 'product-ceremony-trunk__621597.html',
    type: 'gift',
    image: 'assets/images/Gift_2.webp',
    desc: 'The complete house ritual: extrait, candle and oil in a keepsake trunk.',
    price: 31500,
    badge: 'Limited'
  }
];
const stores = [
  { name: 'Auréole Mumbai Flagship', detail: 'Kala Ghoda · Private scent salon · Open 11 AM–9 PM' },
  { name: 'Auréole Delhi Atelier', detail: 'Mehrauli · Candle bar and engraving studio · Open 10 AM–8 PM' },
  { name: 'Auréole Bengaluru Suite', detail: 'Indiranagar · Ritual oil consultations · Open 11 AM–8 PM' },
  { name: 'Auréole Paris Apartment', detail: 'Saint-Germain · By appointment · Seasonal installation' },
  { name: 'Auréole Dubai Cabinet', detail: 'DIFC · Gifting lounge · Open 10 AM–10 PM' }
];
const INR = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const cart = JSON.parse(localStorage.getItem('aureoleCart621597') || '[]');
const qs = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => [...root.querySelectorAll(s)];
function saveCart() { localStorage.setItem('aureoleCart621597', JSON.stringify(cart)); }
function renderProducts(filter = 'all', search = '') {
  const el = qs('#products');
  if (!el) return;

  const rows = products.filter(
    p =>
      (filter === 'all' || p.type === filter) &&
      (p.name + p.desc + p.type + p.badge)
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  el.innerHTML = rows.map((p, i) => `
    <article
      class="product reveal magnetic"
      data-reveal="up"
      tabindex="0"
      style="--i:${i}"
      data-type="${p.type}"
      aria-label="${p.name}"
    >

      <a
        href="${p.page}"
        class="product-media ${p.type} ${p.slug}"
      >
        <img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
        >

        <span class="product-badge">${p.badge}</span>

        <span class="media-label">
          View object
        </span>
      </a>

      <div class="product-info">

        <h3>
          <a href="${p.page}">
            ${p.name}
          </a>
        </h3>

        <p>${p.desc}</p>

        <div class="price-row">
          <span class="price">
            ${INR.format(p.price)}
          </span>

          <button
            class="add magnetic"
            data-name="${p.name}"
          >
            Add +
          </button>
        </div>

        <a
          class="text-link"
          href="${p.page}"
        >
          Open product story
        </a>

      </div>

    </article>
  `).join('') || `
    <div class="lux-card reveal" style="grid-column:1/-1">
      <h3>No objects found</h3>
      <p>Try another scent family or collection.</p>
    </div>
  `;

  qsa('.add', el).forEach(btn =>
    btn.addEventListener('click', e => {
      e.preventDefault();
      addToCart(btn.dataset.name);
    })
  );

  initReveal(el);
  initCardGlow(el);
  initMagnetic(el);
}
function addToCart(name) { const p = products.find(x => x.name === name); if (!p) return; cart.push(p); saveCart(); renderCart(); openCart(); }
function renderCart() { const count = qs('#cartCount'), items = qs('#cartItems'), subtotal = qs('#subtotal'); if (!count || !items || !subtotal) return; count.textContent = cart.length; if (!cart.length) { items.innerHTML = '<p style="color:var(--muted);line-height:1.7">Your cart is ready for its first object.</p>'; subtotal.textContent = INR.format(0); return; } items.innerHTML = cart.map((p, i) => `<div class="cart-item"><div class="cart-thumb"></div><div><b>${p.name}</b><br><small>${p.type} · ${INR.format(p.price)}</small></div><button class="close" aria-label="Remove ${p.name}" data-remove="${i}">×</button></div>`).join(''); subtotal.textContent = INR.format(cart.reduce((s, p) => s + p.price, 0)); qsa('[data-remove]', items).forEach(b => b.addEventListener('click', () => { cart.splice(+b.dataset.remove, 1); saveCart(); renderCart(); })); }
function openCart() { qs('#cartDrawer')?.classList.add('open'); qs('#overlay')?.classList.add('open') }
function closeCart() { qs('#cartDrawer')?.classList.remove('open'); qs('#overlay')?.classList.remove('open') }
function renderStores(q = '') { const list = qs('#storeList'); if (!list) return; const rows = stores.filter(s => (s.name + s.detail).toLowerCase().includes(q.toLowerCase())); list.innerHTML = rows.map((s, i) => `<div class="store reveal" style="--i:${i}"><b>${s.name}</b><span>${s.detail}</span></div>`).join('') || '<div class="store"><b>No salon found</b><span>Try Mumbai, Delhi, Bengaluru, Paris, or Dubai.</span></div>'; initReveal(list); initCardGlow(list); }
let revealObserver;
function initReveal(root = document) {
  if (!('IntersectionObserver' in window)) { qsa('.reveal', root).forEach(el => el.classList.add('visible')); return; }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { const el = entry.target; const delay = parseInt(getComputedStyle(el).getPropertyValue('--i') || 0, 10) * 90; setTimeout(() => el.classList.add('visible'), Math.min(delay, 540)); revealObserver.unobserve(el); } }) }, { threshold: .16, rootMargin: '0px 0px -8% 0px' });
  }
  qsa('.reveal', root).forEach(el => { if (!el.classList.contains('visible')) revealObserver.observe(el); });
}
function initCursor() { const c = qs('.cursor'), d = qs('.cursor-dot'); if (!c || !d || matchMedia('(pointer:coarse)').matches) return; let x = 0, y = 0, dx = 0, dy = 0; document.addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; }, { passive: true }); function tick() { dx += (x - dx) * .14; dy += (y - dy) * .14; c.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`; requestAnimationFrame(tick) } tick(); qsa('a,button,.product,.category-card,.lux-card,.gender-card,.step,.quote,.store').forEach(el => { el.addEventListener('mouseenter', () => c.classList.add('grow')); el.addEventListener('mouseleave', () => c.classList.remove('grow')); }); }
function initParallax() { let ticking = false; const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { const y = window.scrollY || 0; qs('#nav')?.classList.toggle('scrolled', y > 20); ticking = false; }); }; window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); }
function initHeroTilt() { const card = qs('#heroObject'); if (!card || matchMedia('(pointer:coarse)').matches) return; document.addEventListener('pointermove', e => { const r = card.getBoundingClientRect(); if (r.width === 0) return; const rx = (e.clientY - r.top - r.height / 2) / r.height * -4; const ry = (e.clientX - r.left - r.width / 2) / r.width * 4; card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; }, { passive: true }); }
function initCardGlow(root = document) { qsa('.lux-card,.category-card,.product,.atelier-card,.gender-card,.step,.quote,.store,.service-card,.ingredient-card,.membership-card', root).forEach(card => { if (card.dataset.glowInit) return; card.dataset.glowInit = '1'; card.addEventListener('pointermove', e => { const r = card.getBoundingClientRect(); card.style.setProperty('--card-x', ((e.clientX - r.left) / r.width * 100) + '%'); card.style.setProperty('--card-y', ((e.clientY - r.top) / r.height * 100) + '%'); }, { passive: true }); }); }
function initMagnetic(root = document) { qsa('.magnetic,.primary-btn,.secondary-btn,.pill-btn,.icon-btn,.add', root).forEach(el => { if (el.dataset.magneticInit) return; el.dataset.magneticInit = '1'; el.addEventListener('pointermove', e => { if (matchMedia('(pointer:coarse)').matches) return; const r = el.getBoundingClientRect(); const x = (e.clientX - r.left - r.width / 2) * .012; const y = (e.clientY - r.top - r.height / 2) * .012; el.style.transform = `translate3d(${x}px,${y}px,0)`; }, { passive: true }); el.addEventListener('mouseleave', () => el.style.transform = ''); }); }
function initPageTransitions() { qsa('a[href$=".html"]').forEach(a => a.addEventListener('click', e => { if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return; const href = a.getAttribute('href'); if (!href || href === location.pathname.split('/').pop()) return; e.preventDefault(); const t = qs('#pageTransition'); t?.classList.add('active'); setTimeout(() => location.href = href, 430); })); }
function initShopControls() { let filter = 'all', search = ''; qsa('.tab').forEach(tab => tab.addEventListener('click', () => { qsa('.tab').forEach(t => t.classList.remove('active')); tab.classList.add('active'); filter = tab.dataset.filter; renderProducts(filter, search); })); const input = qs('#productSearch'); if (input) input.addEventListener('input', e => { search = e.target.value; renderProducts(filter, search); }); renderProducts(filter, search); }
function initForms() { qsa('.signup,.contact-form').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); alert('Thank you. The maison concierge will be in touch.'); })); qsa('[data-add]').forEach(btn => btn.addEventListener('click', () => addToCart(btn.dataset.add))); }
function init() { qs('#menuBtn')?.addEventListener('click', () => qs('#mobilePanel')?.classList.toggle('open')); qsa('#mobilePanel a').forEach(a => a.addEventListener('click', () => qs('#mobilePanel')?.classList.remove('open'))); qs('#cartBtn')?.addEventListener('click', openCart); qs('#closeCart')?.addEventListener('click', closeCart); qs('#overlay')?.addEventListener('click', closeCart); qs('#searchBtn')?.addEventListener('click', () => renderStores(qs('#storeSearch')?.value || '')); qs('#storeSearch')?.addEventListener('input', e => renderStores(e.target.value)); initReveal(); initCursor(); initParallax(); initHeroTilt(); initCardGlow(); initMagnetic(); initPageTransitions(); initShopControls(); initForms(); renderStores(); renderCart(); setTimeout(() => qs('#preloader')?.classList.add('done'), 480); }
document.addEventListener('DOMContentLoaded', init);

// Willkommens-Leiste einblenden
document.querySelector('.notification > p')?.classList.add('open');

// Hero-Hintergrund wechseln
// Bilder werden vorab geladen und sanft überblendet (kein weißes Blinken)
const hero = document.querySelector('#hero');
if (hero && !hero.dataset.video) {
  const initial = (hero.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/) || [])[1];
  const others = hero.dataset.slides
    ? hero.dataset.slides.split(',')
    : [1, 2, 3].map((n) => `/assets/img/bg${n}.webp`);
  const images = [...new Set([initial, ...others].filter(Boolean))];

  if (images.length > 1) {
    // Zwei Ebenen: das neue Bild blendet jeweils oben über das alte ein,
    // erst danach wird die untere Ebene ausgeblendet. So gibt es kein Springen.
    const FADE_MS = 1200;
    const INTERVAL_MS = 4500;
    const layers = [0, 1].map(() => {
      const el = document.createElement('div');
      el.className = 'hero-fade';
      el.style.transition = `opacity ${FADE_MS}ms ease-in-out`;
      hero.prepend(el);
      return el;
    });

    const cache = new Map();
    const load = (src) => {
      if (!cache.has(src)) {
        const img = new Image();
        img.src = src;
        cache.set(src, (img.decode ? img.decode() : Promise.resolve()).catch(() => {}));
      }
      return cache.get(src);
    };
    images.forEach(load);

    let current = 0;
    let top = 0;
    // Startbild auf die erste Ebene legen
    layers[0].style.backgroundImage = `url("${images[0]}")`;
    layers[0].style.opacity = '1';
    layers[0].style.zIndex = '1';

    setInterval(async () => {
      const nextIndex = (current + 1) % images.length;
      const src = images[nextIndex];
      await load(src);
      const incoming = layers[1 - top];
      const outgoing = layers[top];
      incoming.style.transition = 'none';
      incoming.style.opacity = '0';
      incoming.style.backgroundImage = `url("${src}")`;
      incoming.style.zIndex = '2';
      outgoing.style.zIndex = '1';
      void incoming.offsetWidth;
      incoming.style.transition = `opacity ${FADE_MS}ms ease-in-out`;
      incoming.style.opacity = '1';
      setTimeout(() => {
        outgoing.style.transition = 'none';
        outgoing.style.opacity = '0';
      }, FADE_MS + 50);
      top = 1 - top;
      current = nextIndex;
    }, INTERVAL_MS);
  }
}

// Formular-Labels buchstabenweise animieren
document.querySelectorAll('.form-control label').forEach((label) => {
  label.innerHTML = [...label.innerText]
    .map((letter, i) => `<span style="transition-delay:${i * 50}ms">${letter}</span>`)
    .join('');
});

// Bilder beim Scrollen einblenden
const sliderImages = document.querySelectorAll('.slide-in');
if (sliderImages.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.target.classList.toggle('active', e.isIntersecting));
    },
    { threshold: 0.5 }
  );
  sliderImages.forEach((img) => io.observe(img));
}

// Mobile Navigation
const toggleNav = document.querySelector('.toggle-nav');
const navMenu = document.querySelector('.mobile-nav');
const hamburger = document.getElementById('hamburger-1');
toggleNav?.addEventListener('click', () => {
  navMenu?.classList.toggle('open');
  hamburger?.classList.toggle('open');
});

// Hover-Effekt Desktop-Menü
document.querySelectorAll('.mobile-nav-main > li').forEach((li) => {
  li.addEventListener('mouseenter', () => {
    li.classList.add('trigger-enter');
    setTimeout(() => li.classList.contains('trigger-enter') && li.classList.add('trigger-enter-active'), 150);
  });
  li.addEventListener('mouseleave', () => li.classList.remove('trigger-enter', 'trigger-enter-active'));
});

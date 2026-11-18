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
    const fade = document.createElement('div');
    fade.className = 'hero-fade';
    hero.prepend(fade);

    const cache = new Map();
    const load = (src) => {
      if (!cache.has(src)) {
        cache.set(
          src,
          new Promise((resolve) => {
            const img = new Image();
            img.onload = img.onerror = resolve;
            img.src = src;
          })
        );
      }
      return cache.get(src);
    };
    images.forEach(load);

    let current = 0;
    const FADE_MS = 1000;
    setInterval(async () => {
      const nextIndex = (current + 1) % images.length;
      const src = images[nextIndex];
      await load(src);
      fade.style.backgroundImage = `url("${src}")`;
      fade.style.opacity = '1';
      setTimeout(() => {
        hero.style.backgroundImage = `url("${src}")`;
        fade.style.transition = 'none';
        fade.style.opacity = '0';
        void fade.offsetWidth;
        fade.style.transition = '';
        current = nextIndex;
      }, FADE_MS);
    }, 5000);
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

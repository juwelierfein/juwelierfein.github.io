// Willkommens-Leiste einblenden
document.querySelector('.notification > p')?.classList.add('open');

// Hero-Hintergrund wechseln
const hero = document.querySelector('#hero');
const bgImages = [1, 2, 3, 4].map((n) => `/assets/img/bg${n}.webp`);
let idx = 0;
if (hero) {
  const run = () => {
    hero.style.backgroundImage = `url("${bgImages[idx]}")`;
    idx = (idx + 1) % bgImages.length;
  };
  setInterval(run, 4000);
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

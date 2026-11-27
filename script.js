const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const art = document.querySelector('.heroart');
let scheduled = false;
function updateArtwork() {
  const distance = motion.matches || innerWidth <= 700 ? 0 : Math.min(scrollY * 0.12, 55);
  art.style.setProperty('--drift', distance + 'px');
  scheduled = false;
}
addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateArtwork);
  }
}, { passive: true });
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!motion.matches) entry.target.classList.add('enter');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.1 });
  document.querySelectorAll('.card, .info, .contact').forEach(el => observer.observe(el));
}

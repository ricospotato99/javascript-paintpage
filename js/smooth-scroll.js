/* Pehmeä vieritys ankkurilinkeille ja Takaisin ylös -painike (#ylos).
   Käytössä kaikilla sivuilla. */

(function () {
  const nav = document.querySelector('.navbar');
  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = () => (reduce() ? 'auto' : 'smooth');
  const offset = () => (nav ? nav.offsetHeight : 0) + 8;

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset(), behavior: behavior() });
    history.pushState(null, '', id);
    const menu = document.getElementById('menu');
    if (menu && menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }));

  const ylos = document.getElementById('ylos');
  const paivita = () => ylos.classList.toggle('d-none', window.scrollY < 300);
  window.addEventListener('scroll', paivita, { passive: true });
  ylos.addEventListener('click', () => window.scrollTo({ top: 0, behavior: behavior() }));
  paivita();
})();

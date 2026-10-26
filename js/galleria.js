/* Galleria-sivu: paikkamerkit puuttuville kuville, suodatus ja kuvan suurennus.
   Tarvitsee Bootstrapin (bootstrap.Modal). */

/* Jos kuvaa ei löydy, näytetään värillinen paikkamerkki (vaihda omat kuvat kansioon kuvat) */
const varit = ['#6f8f86', '#b5836a', '#7d8fa8', '#a99a6e', '#8a7aa0', '#7a9a6e'];
document.querySelectorAll('#kuvat img').forEach((img, i) => {
  img.addEventListener('error', () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="${varit[i % varit.length]}"/>
      <text x="400" y="310" font-family="sans-serif" font-size="32" fill="#fff" text-anchor="middle" opacity=".85">${img.dataset.title}</text></svg>`;
    img.onerror = null;
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }, { once: true });
  // jos virhe ehti tulla ennen kuuntelijaa
  if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
});


/* Suodatus */
const painikkeet = document.querySelectorAll('#suodattimet button');
const kortit = document.querySelectorAll('#kuvat > [data-category]');
painikkeet.forEach(btn => btn.addEventListener('click', () => {
  const f = btn.dataset.filter;
  painikkeet.forEach(b => {
    const aktiivinen = b === btn;
    b.classList.toggle('btn-primary', aktiivinen);
    b.classList.toggle('btn-outline-secondary', !aktiivinen);
    b.setAttribute('aria-pressed', aktiivinen);
  });
  kortit.forEach(k => k.classList.toggle('d-none', f !== 'kaikki' && k.dataset.category !== f));
}));


/* Suurennus */
const modalEl = document.getElementById('kuvaModal');
const modal = new bootstrap.Modal(modalEl);
document.querySelectorAll('.gallery-btn').forEach(btn => btn.addEventListener('click', () => {
  const img = btn.querySelector('img');
  document.getElementById('kuvaIso').src = img.src;
  document.getElementById('kuvaIso').alt = img.alt;
  document.getElementById('kuvaOtsikko').textContent = img.dataset.title;
  document.getElementById('kuvaMeta').textContent = img.dataset.meta;
  modal.show();
}));

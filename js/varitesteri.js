/* Värientestaus-sivu: seinän ja jalkalistan värin testaus huoneen kuvassa. */

(function () {
  // Lisää tyylit suoraan skriptistä, jotta testeri toimii vaikka CSS jäisi liittämättä
  if (!document.getElementById('varitesteri-css')) {
    const st = document.createElement('style'); st.id = 'varitesteri-css';
    st.textContent = `  #varitesteri { --wall: #f0ead6; --tester-max: 1100px; --room-max: 640px; max-width: var(--tester-max); }
  #varitesteri .room-wrap { max-width: var(--room-max); border-radius: .75rem; overflow: hidden; background: var(--bs-tertiary-bg); border: 1px solid var(--bs-border-color); }
  #varitesteri .room-wrap svg { display: block; width: 100%; height: auto; }
  #varitesteri #wall { fill: var(--wall); transition: fill .25s ease; }
  #varitesteri .swatch { width: 44px; height: 44px; border-radius: 50%; border: 3px solid var(--bs-body-bg); box-shadow: 0 0 0 1px var(--bs-border-color); cursor: pointer; padding: 0; transition: transform .15s ease; }
  #varitesteri .swatch:hover { transform: scale(1.1); }
  #varitesteri .swatch:focus-visible { outline: 3px solid var(--bs-primary); outline-offset: 2px; }
  #varitesteri .swatch.active { box-shadow: 0 0 0 3px var(--bs-body-color); }
  #varitesteri .chip { width: 100%; height: 72px; border-radius: .5rem; border: 1px solid var(--bs-border-color); transition: background .25s ease; }
  #varitesteri input[type=color] { width: 56px; height: 44px; padding: 2px; }`;
    document.head.appendChild(st);
  }
  const PRESETS = [
    { name: 'Fiesta', hex: '#dd4132' },
    { name: 'Jester Red', hex: '#9e1030' },
    { name: 'Turmeric', hex: '#fe840e' },
    { name: 'Living Coral', hex: '#ff6f61' },
    { name: 'Pink Peacock', hex: '#c62168' },
    { name: 'Pepper Stem', hex: '#8d9440' },
    { name: 'Aspen Gold', hex: '#ffd662' },
    { name: 'Princess Blue', hex: '#00539c' },
    { name: 'Toffee', hex: '#755139' },
    { name: 'Mango Mojito', hex: '#d69c2f' },
    { name: 'Terrarium Moss', hex: '#616247' },
    { name: 'Sweet Lilac', hex: '#e8b5ce' },
    { name: 'Soybean', hex: '#d2c29d' },
    { name: 'Eclipse', hex: '#343148' },
    { name: 'Sweet Corn', hex: '#f0ead6' },
    { name: 'Brown Granite', hex: '#615550' }
  ];
  const DEFAULTS = {
    wall:  { base: '#f0ead6', name: 'Sweet Corn', adj: 0 },
    board: { base: '#fbfaf7', name: 'Valkoinen', adj: 0 }
  };
  const LABELS = { wall: 'Seinä', board: 'Jalkalista' };

  const $ = id => document.getElementById(id);
  const root = document.getElementById('varitesteri') || document.documentElement;
  const wallEl = document.getElementById('wall');
  const boardEl = document.getElementById('board');
  if (boardEl) boardEl.style.transition = 'fill .25s ease';
  const picker = $('picker'), hexIn = $('hex'), light = $('lightness'), err = $('err');

  // Kummallekin kohteelle (seinä, jalkalista) oma väri
  const state = { wall: { ...DEFAULTS.wall }, board: { ...DEFAULTS.board } };
  let target = 'wall';

  // --- apufunktiot ---
  const hexToRgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b); let h = 0, s = 0; const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min; s = l > .5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60;
    }
    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
  }
  function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return rgbToHex(f(0) * 255, f(8) * 255, f(4) * 255);
  }
  const validHex = v => /^#[0-9a-f]{6}$/i.test(v);
  const finalColor = st => {
    if (st.adj === 0) return st.base;
    const [h, s, l] = rgbToHsl(...hexToRgb(st.base));
    return hslToHex(h, s, Math.max(0, Math.min(100, l + st.adj)));
  };

  // --- värivalmiit ---
  const sw = $('swatches');
  PRESETS.forEach(p => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'swatch';
    b.style.cssText = 'width:44px;height:44px;border-radius:50%;padding:0;cursor:pointer;border:3px solid var(--bs-body-bg,#fff);background:' + p.hex;
    b.title = p.name; b.setAttribute('aria-label', p.name); b.dataset.hex = p.hex;
    b.addEventListener('click', () => {
      const st = state[target];
      st.name = p.name; st.adj = 0; st.base = p.hex.toLowerCase();
      light.value = 0; apply();
    });
    sw.appendChild(b);
  });

  // --- päivitys ---
  function apply() {
    const w = finalColor(state.wall), bd = finalColor(state.board);
    root.style.setProperty('--wall', w);
    if (wallEl) { wallEl.style.fill = w; wallEl.setAttribute('fill', w); }
    if (boardEl) { boardEl.style.fill = bd; boardEl.setAttribute('fill', bd); }

    const st = state[target], fin = target === 'wall' ? w : bd;
    const [r, g, b] = hexToRgb(fin);
    const [fh, fs, fl] = rgbToHsl(r, g, b);
    $('chip').style.background = fin;
    picker.value = st.base;
    if (document.activeElement !== hexIn) hexIn.value = st.base;
    $('outTarget').textContent = LABELS[target];
    $('name').textContent = st.name;
    $('outHex').textContent = fin.toUpperCase();
    $('outRgb').textContent = `${r}, ${g}, ${b}`;
    $('outHsl').textContent = `${fh}°, ${fs} %, ${fl} %`;
    $('outBoth').textContent = `Seinä ${w.toUpperCase()}, jalkalista ${bd.toUpperCase()}`;
    root.querySelectorAll('.swatch').forEach(el =>
      el.classList.toggle('active', el.dataset.hex.toLowerCase() === st.base && st.adj === 0));
  }

  // --- kohteen valinta (seinä / jalkalista) ---
  root.querySelectorAll('input[name="kohde"]').forEach(r => r.addEventListener('change', () => {
    if (!r.checked) return;
    target = r.value;
    light.value = state[target].adj;
    err.style.setProperty('display', 'none', 'important');
    apply();
  }));

  picker.addEventListener('input', () => { const st = state[target]; st.name = 'Oma väri'; st.base = picker.value.toLowerCase(); apply(); });
  hexIn.addEventListener('input', () => {
    let v = hexIn.value.trim(); if (v && v[0] !== '#') v = '#' + v;
    if (validHex(v)) { err.style.setProperty('display', 'none', 'important'); const st = state[target]; st.name = 'Oma väri'; st.base = v.toLowerCase(); apply(); }
    else { err.textContent = 'Anna väri muodossa #rrggbb.'; err.style.setProperty('display', 'block', 'important'); }
  });
  hexIn.addEventListener('blur', () => { err.style.setProperty('display', 'none', 'important'); hexIn.value = state[target].base; });
  light.addEventListener('input', () => { state[target].adj = Number(light.value); apply(); });
  $('reset').addEventListener('click', () => { state[target] = { ...DEFAULTS[target] }; light.value = 0; apply(); });
  $('copy').addEventListener('click', async e => {
    const btn = e.currentTarget, txt = $('outHex').textContent;
    try { await navigator.clipboard.writeText(txt); btn.textContent = 'Kopioitu ' + txt; }
    catch (_) { btn.textContent = 'Kopioi käsin: ' + txt; }
    setTimeout(() => btn.textContent = 'Kopioi värikoodi', 1800);
  });

  apply();
})();

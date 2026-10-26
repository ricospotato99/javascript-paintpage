/* Yhteystiedot-sivu: tarjouslomakkeen tarkistus ja lähetys sähköpostiohjelmaan.
   Tarvitsee Bootstrapin (bootstrap.Modal). */

/* Tarjouslomake: toimii vain, jos sivulla on lomake (id="tarjous") */
const form = document.getElementById('tarjous');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
    const v = id => document.getElementById(id).value.trim();
    const body = `Nimi: ${v('nimi')}\nYhteys: ${v('puh')}\nTyö: ${v('tyo')}\n\n${v('viesti')}`;
    window.location.href = 'mailto:info@kotkantienmaalaus.fi?subject=' + encodeURIComponent('Tarjouspyyntö') + '&body=' + encodeURIComponent(body);
    new bootstrap.Modal(document.getElementById('kiitos')).show();
    form.reset(); form.classList.remove('was-validated');
  });
}

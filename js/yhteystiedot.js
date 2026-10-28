// Yhteystiedot-sivu: tarjouslomakkeen tarkistus ja lähetys sähköpostiohjelmaan.


$(function () {
  var $form = $('#tarjous');
  if (!$form.length) return;

  function v(id) { return $('#' + id).val().trim(); }

  $form.on('submit', function (e) {
    e.preventDefault();

    if (!this.checkValidity()) {
      $form.addClass('was-validated');
      return;
    }

    var body = 'Nimi: ' + v('nimi') + '\n' +
               'Yhteys: ' + v('puh') + '\n' +
               'Työ: ' + v('tyo') + '\n\n' +
               v('viesti');

    window.location.href = 'mailto:info@kotkantienmaalaus.fi' +
      '?subject=' + encodeURIComponent('Tarjouspyyntö') +
      '&body=' + encodeURIComponent(body);

    new bootstrap.Modal($('#kiitos')[0]).show();

    this.reset();
    $form.removeClass('was-validated');
  });
});

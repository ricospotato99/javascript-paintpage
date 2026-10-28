// Galleria-sivu: paikkamerkit puuttuville kuville, suodatus ja kuvan suurennus.

$(function () {

  // Jos kuvaa ei löydy, näytetään värillinen paikkamerkki
  var varit = ['#6f8f86', '#b5836a', '#7d8fa8', '#a99a6e', '#8a7aa0', '#7a9a6e'];

  $('#kuvat img').each(function (i, el) {
    var $img = $(el);

    $img.one('error', function () {
      var otsikko = $('<div>').text($img.attr('data-title') || '').html(); // estää &- ja <-merkkien rikkomasta SVG:tä
      var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
        '<rect width="800" height="600" fill="' + varit[i % varit.length] + '"/>' +
        '<text x="400" y="310" font-family="sans-serif" font-size="32" fill="#fff" ' +
        'text-anchor="middle" opacity=".85">' + otsikko + '</text></svg>';
      $img.attr('src', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
    });

    // jos virhe ehti tulla ennen kuuntelijaa
    if (el.complete && el.naturalWidth === 0) $img.trigger('error');
  });


  /* Suodatus */
  var $painikkeet = $('#suodattimet button');
  var $kortit = $('#kuvat > [data-category]');

  $painikkeet.on('click', function () {
    var $btn = $(this);
    var f = $btn.data('filter');

    $painikkeet.each(function () {
      var aktiivinen = this === $btn[0];
      $(this)
        .toggleClass('btn-primary', aktiivinen)
        .toggleClass('btn-outline-secondary', !aktiivinen)
        .attr('aria-pressed', String(aktiivinen));
    });

    $kortit.each(function () {
      $(this).toggleClass('d-none', f !== 'kaikki' && $(this).data('category') !== f);
    });
  });


  /* Suurennus */
  var modal = new bootstrap.Modal($('#kuvaModal')[0]);

  $('.gallery-btn').on('click', function () {
    var $img = $(this).find('img');
    $('#kuvaIso').attr({ src: $img.prop('src'), alt: $img.attr('alt') });
    $('#kuvaOtsikko').text($img.attr('data-title'));
    $('#kuvaMeta').text($img.attr('data-meta'));
    modal.show();
  });

});

// smooth scroll

$(function () {
  var $nav = $('.navbar').first();
  var $menu = $('#menu');
  var $ylos = $('#ylos');
  var $ikkuna = $(window);
 
  function reduce() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function behavior() { return reduce() ? 'auto' : 'smooth'; }
  function offset() { return ($nav.outerHeight() || 0) + 8; }
 
  /* Ankkurilinkit */
  $('a[href^="#"]').on('click', function (e) {
    var id = $(this).attr('href');
    if (id.length < 2) return;
 
    var $target = $(id);
    if (!$target.length) return;
 
    e.preventDefault();
    window.scrollTo({ top: $target.offset().top - offset(), behavior: behavior() });
    history.pushState(null, '', id);
 
    if ($menu.hasClass('show')) bootstrap.Collapse.getOrCreateInstance($menu[0]).hide();
  });
 
  /* "Ylös"-painike */
  if ($ylos.length) {
    function paivita() { $ylos.toggleClass('d-none', $ikkuna.scrollTop() < 300); }
 
    $ikkuna.on('scroll', paivita);
    $ylos.on('click', function () { window.scrollTo({ top: 0, behavior: behavior() }); });
    paivita();
  }
});

// Teema

var mq = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme() {
  $('html').attr('data-bs-theme', mq.matches ? 'dark' : 'light');
}

setTheme();
mq.addEventListener('change', setTheme);

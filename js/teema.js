/* Teema: seuraa laitteen tummaa tai vaaleaa tilaa.
   Käytössä kaikilla sivuilla. */

const mq = window.matchMedia('(prefers-color-scheme: dark)');
const setTheme = () => document.documentElement.setAttribute('data-bs-theme', mq.matches ? 'dark' : 'light');
setTheme(); mq.addEventListener('change', setTheme);

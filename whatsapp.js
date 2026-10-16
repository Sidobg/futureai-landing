/* ============================================================
   PULSANTE WHATSAPP — un solo file per tutte le pagine.
   Tondo, verde, fisso in basso a destra sopra il pulsante della musica.
   Il tocco apre direttamente la chat con Manuel e un messaggio già scritto
   (wa.me: app sul telefono, WhatsApp Web sul computer).
   Da telefono si fa da parte mentre scorri verso il basso, come robot e musica.
   ============================================================ */
(function () {
  if (document.getElementById('waTasto')) return;
  var NUMERO = '393272727775';
  var TESTO = 'Ciao Manuel, ho visto il sito di FUTURE AI e vorrei qualche informazione.';
  var LINK = 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(TESTO);
  window.FUTUREAI_WHATSAPP = LINK;   /* lo usano anche i link «Scrivici su WhatsApp» delle pagine */

  var st = document.createElement('style');
  st.textContent =
    '.wa-tasto{position:fixed;right:1.5rem;bottom:5.1rem;z-index:61;width:52px;height:52px;border-radius:50%;' +
    'display:flex;align-items:center;justify-content:center;background:#25D366;color:#fff;text-decoration:none;' +
    'box-shadow:0 10px 24px -8px rgba(37,211,102,.75),0 2px 6px rgba(0,0,0,.25);' +
    'transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .3s,box-shadow .2s}' +
    '.wa-tasto:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 28px -8px rgba(37,211,102,.85),0 2px 6px rgba(0,0,0,.25)}' +
    '.wa-tasto:focus-visible{outline:3px solid #4DD9E0;outline-offset:3px}' +
    '.wa-tasto svg{width:28px;height:28px;display:block}' +
    '.wa-tasto .wa-testo{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}' +
    '.wa-tasto.via{opacity:0;transform:translateY(14px);pointer-events:none}' +
    '@media(max-width:768px){.wa-tasto{right:.9rem;bottom:4.35rem;width:48px;height:48px}.wa-tasto svg{width:26px;height:26px}}' +
    '@media print{.wa-tasto{display:none}}';
  document.head.appendChild(st);

  var a = document.createElement('a');
  a.id = 'waTasto'; a.className = 'wa-tasto'; a.href = LINK; a.target = '_blank'; a.rel = 'noopener';
  a.setAttribute('aria-label', 'Scrivici su WhatsApp'); a.title = 'Scrivici su WhatsApp';
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.6 2 2.16 6.43 2.16 11.88c0 1.75.46 3.45 1.32 4.95L2.08 22l5.3-1.39a9.86 9.86 0 0 0 4.66 1.18h.01c5.44 0 9.88-4.43 9.88-9.88a9.8 9.8 0 0 0-2.88-7zM12.05 20.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.83.84-3.06-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.41 5.82c0 4.53-3.69 8.22-8.2 8.24zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29z"/></svg><span class="wa-testo">Scrivici su WhatsApp</span>';
  document.body.appendChild(a);

  /* da telefono: via mentre scorri giù, torna quando risali o ti fermi in cima */
  var yUlt = scrollY;
  addEventListener('scroll', function () {
    if (innerWidth > 768) { a.classList.remove('via'); return; }
    var y = scrollY;
    if (y > yUlt + 6 && y > 120) a.classList.add('via');
    else if (y < yUlt - 6 || y < 120) a.classList.remove('via');
    yUlt = y;
  }, { passive: true });
})();

/* ============================================================
   AVVISO VISITE — un solo file per tutte le pagine.
   Dopo qualche secondo sulla pagina manda a /api/visita (riscritto da vercel.json verso il gestionale
   di FUTURE AI) solo: pagina, sito di provenienza, «da» del QR/volantino e se è un arrivo o un cambio pagina.
   Niente cookie, niente identificativi, l'indirizzo IP non viene salvato: serve solo a far arrivare a Manuel
   l'avviso «qualcuno sta guardando il sito» e a contare le visite del giorno.
   Sui dispositivi di Manuel non parte: basta aprire una volta futureai.it/?sono-io=1 (?sono-io=0 per riattivarlo).
   ============================================================ */
(function () {
  try {
    var io = new URLSearchParams(location.search).get('sono-io');
    if (io === '1') localStorage.setItem('futureai-io', '1');
    if (io === '0') localStorage.removeItem('futureai-io');
    if (localStorage.getItem('futureai-io') === '1') return;
  } catch (e) {}
  if (navigator.webdriver || /bot|crawl|spider|preview|headless/i.test(navigator.userAgent)) return;
  var ref = '', interna = false;
  try { if (document.referrer) { var h = new URL(document.referrer).hostname.replace(/^www\./, ''); interna = h === location.hostname.replace(/^www\./, ''); ref = interna ? '' : h; } } catch (e) {}
  var q = new URLSearchParams(location.search);
  var dati = JSON.stringify({ p: location.pathname.slice(0, 80), r: ref.slice(0, 80), da: (q.get('da') || q.get('utm_source') || '').slice(0, 30), interna: interna });
  /* dopo 4 secondi: chi chiude subito (o i programmi che passano) non fa scattare l'avviso */
  setTimeout(function () {
    if (document.hidden) return;
    try {
      if (navigator.sendBeacon) navigator.sendBeacon('/api/visita', new Blob([dati], { type: 'application/json' }));
      else fetch('/api/visita', { method: 'POST', body: dati, keepalive: true, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {}
  }, 4000);
})();

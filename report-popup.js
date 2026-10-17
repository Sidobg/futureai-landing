/* ============================================================
   RIQUADRO DEL REPORT GRATUITO — un solo file per tutte le pagine.
   Dopo 20 secondi passati davvero sulla pagina (scheda in primo piano) propone il report gratuito
   con un modulo corto, che manda la richiesta a /api/report come la pagina /report-gratuito/ (provenienza «popup»).
   Non compare: nelle pagine che hanno già il modulo (Report gratuito, Contatti), sulla privacy e sul gioco;
   per 7 giorni dopo averlo chiuso; mai più dopo aver chiesto il report; sui dispositivi di Manuel (?sono-io=1).
   Ricorda solo la scelta «chiuso/inviato» nella memoria del browser: nessun dato personale.
   ============================================================ */
(function () {
  if (/^\/(report-gratuito|contatti|privacy|gioco)(\/|$)/.test(location.pathname)) return;
  var CHIAVE = 'futureai-popup-report', SETTE_GIORNI = 7 * 864e5;
  function leggi(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function scrivi(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  if (leggi('futureai-io') === '1') return;
  var stato = leggi(CHIAVE);
  if (stato === 'inviato' || (stato && Date.now() - Number(stato) < SETTE_GIORNI)) return;
  if (navigator.webdriver) return;

  /* 20 secondi di presenza vera: il tempo con la scheda nascosta non conta */
  var resta = 20000, ultimo = Date.now(), timer = null;
  function parti() { clearTimeout(timer); ultimo = Date.now(); timer = setTimeout(mostra, resta); }
  function ferma() { clearTimeout(timer); resta -= Date.now() - ultimo; if (resta < 0) resta = 0; }
  document.addEventListener('visibilitychange', function () { document.hidden ? ferma() : parti(); });
  if (!document.hidden) parti();

  function mostra() {
    /* se il menu a tutto schermo è aperto, aspetta che si chiuda */
    var menu = document.getElementById('menuSchermo');
    if (menu && menu.getAttribute('data-nav') === 'open') { resta = 4000; return parti(); }
    var st = document.createElement('style');
    st.textContent =
      '.rpp-velo{position:fixed;inset:0;z-index:9990;background:rgba(5,9,26,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);opacity:0;transition:opacity .35s}' +
      '.rpp{position:fixed;z-index:9991;left:50%;top:50%;width:min(480px,calc(100% - 32px));max-height:calc(100% - 32px);overflow:auto;transform:translate(-50%,-46%) scale(.97);opacity:0;' +
      'transition:opacity .4s cubic-bezier(.22,1,.36,1),transform .5s cubic-bezier(.22,1,.36,1);border-radius:20px;color:#E9ECF7;font-family:"DM Sans",system-ui,sans-serif;' +
      'background:radial-gradient(ellipse 80% 60% at 90% 0%,rgba(108,99,255,.45),transparent 70%),linear-gradient(165deg,#1B2A6B,#0B1230 80%);box-shadow:0 0 0 1px rgba(255,255,255,.1) inset,0 40px 80px -30px rgba(0,0,0,.7)}' +
      '.rpp.su,.rpp-velo.su{opacity:1}.rpp.su{transform:translate(-50%,-50%)}' +
      '.rpp::after{content:"";position:sticky;display:block;bottom:0;height:4px;background:linear-gradient(90deg,#6C63FF,#4DD9E0)}' +
      '.rpp-dentro{padding:28px 28px 22px}' +
      '.rpp-chiudi{position:absolute;right:12px;top:12px;width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.08);color:#fff;font-size:20px;line-height:1;cursor:pointer}' +
      '.rpp-chiudi:hover{background:rgba(255,255,255,.16)}' +
      '.rpp-pill{display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:99px;background:#FFB547;color:#1B1004;font:700 11.5px "DM Sans",sans-serif;letter-spacing:.04em;text-transform:uppercase}' +
      '.rpp h2{margin:14px 0 10px;font:800 clamp(24px,5.4vw,30px)/1.08 "Bricolage Grotesque",system-ui,sans-serif;letter-spacing:-.025em;color:#fff;padding-right:24px}' +
      '.rpp h2 em{font-family:"Instrument Serif",Georgia,serif;font-style:italic;font-weight:400;color:#E4A07F}' +
      '.rpp p.rpp-testo{margin:0 0 16px;font-size:15px;line-height:1.55;color:#B8C1EA}' +
      '.rpp ul.rpp-dentro-lista{list-style:none;margin:0 0 18px;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;font-size:13.5px;color:#DDE2F5}' +
      '.rpp ul.rpp-dentro-lista li::before{content:"✓ ";color:#4DD9E0;font-weight:700}' +
      '.rpp label.rpp-et{display:block;margin:0 0 5px;font-size:12.5px;color:#9FA9D6}' +
      '.rpp input[type=text],.rpp input[type=email]{width:100%;box-sizing:border-box;margin:0 0 11px;padding:12px 13px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#fff;font:16px "DM Sans",sans-serif}' +
      '.rpp input::placeholder{color:#6E78A0}.rpp input:focus{outline:none;border-color:#8F87FF;box-shadow:0 0 0 3px rgba(108,99,255,.25)}' +
      '.rpp .rpp-due{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}' +
      '.rpp .rpp-spunta{display:flex;gap:8px;align-items:flex-start;margin:0 0 11px;font-size:13px;line-height:1.4;color:#B8C1EA;cursor:pointer}' +
      '.rpp .rpp-spunta input{width:17px;height:17px;flex:none;margin-top:1px;accent-color:#8F87FF}.rpp .rpp-spunta a{color:#E4A07F}' +
      '.rpp .rpp-nascosto{display:none}.rpp.senza .rpp-nascosto{display:grid}.rpp.senza .rpp-sito{display:none}' +
      '.rpp button.rpp-invia{width:100%;margin-top:4px;padding:14px;border:0;border-radius:12px;background:#F3EFE6;color:#0E1636;font:800 16px "Bricolage Grotesque",system-ui,sans-serif;cursor:pointer;transition:transform .25s}' +
      '.rpp button.rpp-invia:hover{transform:translateY(-1px)}.rpp button.rpp-invia:disabled{opacity:.7;cursor:wait}' +
      '.rpp .rpp-piccolo{margin:10px 0 0;text-align:center;font-size:12.5px;color:#8E98C4}' +
      '.rpp .rpp-no{display:block;margin:6px auto 0;border:0;background:none;color:#8E98C4;font:13px "DM Sans",sans-serif;text-decoration:underline;cursor:pointer}' +
      '.rpp .rpp-esito{min-height:1.2em;margin:8px 0 0;font-size:13.5px;color:#FF9C8F;text-align:center}' +
      '@media(max-width:560px){.rpp{top:auto;bottom:0;left:0;width:100%;max-height:92%;border-radius:20px 20px 0 0;transform:translateY(30px)}.rpp.su{transform:none}.rpp-dentro{padding:24px 18px 18px}.rpp ul.rpp-dentro-lista{grid-template-columns:1fr}.rpp .rpp-due{grid-template-columns:1fr}}' +
      '@media(prefers-reduced-motion:reduce){.rpp,.rpp-velo{transition:none}}';
    document.head.appendChild(st);
    var velo = document.createElement('div'); velo.className = 'rpp-velo';
    var box = document.createElement('div'); box.className = 'rpp'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'rppTit');
    box.innerHTML =
      '<div class="rpp-dentro">' +
      '<button class="rpp-chiudi" type="button" aria-label="Chiudi">×</button>' +
      '<span class="rpp-pill">● Gratis · senza registrazione</span>' +
      '<h2 id="rppTit">Il report gratuito <em>sulla tua azienda.</em></h2>' +
      '<p class="rpp-testo">Compila i campi e ricevi senza impegno, in poche ore, un report scritto su di te: come ti vedono i clienti online e dove potresti risparmiare tempo.</p>' +
      '<ul class="rpp-dentro-lista"><li>Punti di forza</li><li>Punti deboli</li><li>Come ti trovano su Google e sulle IA</li><li>Dove possiamo aiutarti</li></ul>' +
      '<form novalidate>' +
      '<div class="rpp-sito"><label class="rpp-et" for="rppSito">Il sito della tua attività</label><input id="rppSito" type="text" inputmode="url" placeholder="www.latuaattivita.it" autocomplete="url"></div>' +
      '<div class="rpp-due rpp-nascosto"><div><label class="rpp-et" for="rppAtt">Nome dell\'attività</label><input id="rppAtt" type="text" placeholder="Forno Rossi" autocomplete="organization"></div><div><label class="rpp-et" for="rppCitta">Città</label><input id="rppCitta" type="text" placeholder="Clusone" autocomplete="address-level2"></div></div>' +
      '<label class="rpp-spunta"><input type="checkbox" id="rppSenza"><span>Non ho un sito</span></label>' +
      '<div class="rpp-due"><div><label class="rpp-et" for="rppNome">Il tuo nome</label><input id="rppNome" type="text" placeholder="Mario" autocomplete="given-name"></div><div><label class="rpp-et" for="rppEmail">Email</label><input id="rppEmail" type="email" placeholder="mario@email.it" autocomplete="email"></div></div>' +
      '<label class="rpp-spunta"><input type="checkbox" id="rppOk"><span>Ho letto l\'<a href="/privacy/" target="_blank" rel="noopener">informativa privacy</a>: i dati servono solo per il report.</span></label>' +
      '<button class="rpp-invia" type="submit">Ricevi il mio report gratuito →</button>' +
      '<p class="rpp-esito" role="status" aria-live="polite"></p>' +
      '</form>' +
      '<p class="rpp-piccolo">Senza impegno · nessuna registrazione · nessuna chiamata commerciale</p>' +
      '<button class="rpp-no" type="button">No grazie</button>' +
      '</div>';
    document.body.appendChild(velo); document.body.appendChild(box);
    var prima = document.activeElement, t0 = Date.now();
    requestAnimationFrame(function () { velo.classList.add('su'); box.classList.add('su'); });
    setTimeout(function () { var i = box.querySelector('#rppSito'); if (i && matchMedia('(min-width:561px)').matches) i.focus({ preventScroll: true }); }, 450);
    function chiudi(inviato) {
      scrivi(CHIAVE, inviato ? 'inviato' : String(Date.now()));
      velo.classList.remove('su'); box.classList.remove('su');
      setTimeout(function () { velo.remove(); box.remove(); st.remove(); if (prima && prima.focus) prima.focus({ preventScroll: true }); }, 400);
      document.removeEventListener('keydown', tasti);
    }
    function tasti(e) {
      if (e.key === 'Escape') chiudi(false);
      if (e.key === 'Tab') { var f = box.querySelectorAll('button,input,a'), a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
    }
    document.addEventListener('keydown', tasti);
    velo.addEventListener('click', function () { chiudi(false); });
    box.querySelector('.rpp-chiudi').addEventListener('click', function () { chiudi(false); });
    box.querySelector('.rpp-no').addEventListener('click', function () { chiudi(false); });
    var senza = box.querySelector('#rppSenza');
    senza.addEventListener('change', function () { box.classList.toggle('senza', senza.checked); });
    var form = box.querySelector('form'), es = box.querySelector('.rpp-esito'), bt = box.querySelector('.rpp-invia');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return box.querySelector('#' + id).value.trim(); };
      var d = { sito: senza.checked ? '' : v('rppSito'), senza_sito: senza.checked, attivita: v('rppAtt'), citta: v('rppCitta'), obiettivo: '', nome: v('rppNome'), whatsapp: '', email: v('rppEmail'),
        privacy: box.querySelector('#rppOk').checked, da: 'popup', ms: Date.now() - t0 + 20000 };
      if (!d.senza_sito && !/\./.test(d.sito)) { es.textContent = "Scrivi l'indirizzo del sito, oppure spunta «Non ho un sito»."; return; }
      if (d.senza_sito && (!d.attivita || !d.citta)) { es.textContent = "Senza sito ci servono il nome dell'attività e la città."; return; }
      if (!d.nome) { es.textContent = 'Scrivi il tuo nome.'; return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) { es.textContent = "Controlla l'email: è lì che ti mandiamo il report."; return; }
      if (!d.privacy) { es.textContent = "Spunta la casella dell'informativa privacy."; return; }
      es.textContent = ''; bt.disabled = true; bt.textContent = 'Invio in corso…';
      fetch('/api/report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) throw new Error(j.errore || ''); return j; }); })
        .then(function () {
          scrivi(CHIAVE, 'inviato');
          box.querySelector('.rpp-dentro').innerHTML = '<button class="rpp-chiudi" type="button" aria-label="Chiudi">×</button><span class="rpp-pill">● Ricevuto</span>' +
            '<h2 id="rppTit">Il tuo report <em>è in preparazione.</em></h2><p class="rpp-testo">In poche ore ti arriva il link all\'email che ci hai lasciato. Grazie!</p>' +
            '<button class="rpp-invia" type="button">Continua a guardare il sito</button>';
          box.querySelectorAll('.rpp-chiudi,.rpp-invia').forEach(function (b) { b.addEventListener('click', function () { chiudi(true); }); });
        })
        .catch(function (err) { es.textContent = err.message || 'Non è partita: riprova o scrivici a info@futureai.it'; bt.disabled = false; bt.textContent = 'Ricevi il mio report gratuito →'; });
    });
  }
})();

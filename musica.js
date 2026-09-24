/* ============================================================
   MUSICA DI SOTTOFONDO — un solo file per tutte le pagine.

   Parte al primo clic (Safari e iPhone accettano solo un clic completato).
   Una volta partita NON si ferma piu' cambiando pagina: finche' suona, i link
   interni non ricaricano la pagina ma aprono la pagina nuova in una "cornice"
   a tutto schermo dentro questa. L'indirizzo in alto cambia, il tasto indietro
   funziona, e l'audio (che vive qui) continua in loop.
   Dentro la cornice le pagine non suonano da sole: il loro pulsante "Musica"
   comanda la musica della pagina madre.
   Spenta dal pulsante = spenta per questa visita (sessionStorage).
   ============================================================ */
(function(){
  var audio = document.getElementById('bgMusic');
  var btn   = document.getElementById('musicToggle');
  if(!audio || !btn) return;

  function segna(on){
    btn.classList.toggle('is-playing', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'Disattiva la musica di sottofondo' : 'Attiva la musica di sottofondo');
  }

  /* ---------- dentro la cornice: comanda la madre ---------- */
  var madre = null;
  try{ if(window.parent !== window && window.parent.__musicaFutureAI) madre = window.parent.__musicaFutureAI; }catch(e){}
  if(madre){
    try{ audio.pause(); audio.removeAttribute('src'); audio.innerHTML = ''; audio.load(); }catch(e){}
    var aggiorna = function(){ segna(madre.suona()); };
    btn.addEventListener('click', function(){ madre.alterna(); });
    madre.ascolta(aggiorna); aggiorna();
    var avvisa = function(){ madre.pagina(location.pathname + location.search + location.hash, document.title); };
    avvisa(); addEventListener('hashchange', avvisa);
    window.vaiPagina = function(u){ location.href = u; };
    return;
  }

  /* ---------- pagina madre: qui vive l'audio ---------- */
  var VOLUME = 0.18;          // sottofondo: si sente, non copre
  var KEY    = 'futureai-musica';
  var fade, attiva = false, chi = [];
  function avvisaTutti(){ segna(attiva); chi.forEach(function(f){ try{ f(); }catch(e){} }); }

  function fadeTo(target, done){
    clearInterval(fade);
    var step = (target - audio.volume) / 18;
    fade = setInterval(function(){
      var v = audio.volume + step;
      if((step > 0 && v >= target) || (step < 0 && v <= target)){
        clearInterval(fade); audio.volume = Math.min(1, Math.max(0, target)); if(done) done();
      } else audio.volume = Math.min(1, Math.max(0, v));
    }, 40);
  }
  function stato(v){ try{ if(v === undefined) return sessionStorage.getItem(KEY); sessionStorage.setItem(KEY, v); }catch(e){ return null; } }

  function parti(ok, no){
    attiva = true;
    if(audio.paused) audio.volume = 0;
    var p = audio.play();
    var riuscito = function(){ stato('on'); avvisaTutti(); fadeTo(VOLUME); if(ok) ok(); };
    if(p && p.then) p.then(riuscito, function(){ attiva = false; avvisaTutti(); if(no) no(); });
    else riuscito();
  }
  function ferma(){
    attiva = false; stato('off');
    fadeTo(0, function(){ if(!attiva) audio.pause(); });
    avvisaTutti();
  }
  function alterna(){ if(attiva) ferma(); else parti(); }
  btn.addEventListener('click', alterna);

  // il vecchio «spenta per sempre» (localStorage) non vale piu'
  try{ localStorage.removeItem(KEY); }catch(e){}
  var EV = ['click','touchend','keydown'];
  var togli = function(){ EV.forEach(function(t){ document.removeEventListener(t, primoGesto, true); }); };
  var primoGesto = function(e){
    if(e && e.target && e.target.closest && e.target.closest('#musicToggle')){ togli(); return; }
    if(attiva){ togli(); return; }
    parti(togli);
  };
  if(stato() !== 'off') EV.forEach(function(t){ document.addEventListener(t, primoGesto, true); });

  document.addEventListener('visibilitychange', function(){
    if(document.hidden){ if(!audio.paused) audio.pause(); }
    else if(attiva && audio.paused){ audio.play().catch(function(){}); }
  });

  /* ---------- la cornice: cambiare pagina senza fermare la musica ---------- */
  var cornice = null, titoloMadre = document.title;
  var st = document.createElement('style');
  st.textContent = 'html.in-cornice,html.in-cornice body{overflow:hidden!important;height:100%}' +
    'html.in-cornice body>*:not(#corniceFutureAI){display:none!important}' +
    '#corniceFutureAI{position:fixed;inset:0;width:100%;height:100%;height:100dvh;border:0;z-index:2147483000;background:#0A0E1A;display:block}';
  document.head.appendChild(st);

  function apri(url){
    // prima la voce nella cronologia della madre, poi la cornice: la prima pagina caricata
    // in un iframe nuovo non aggiunge voci, cosi' «indietro» riporta qui senza passaggi a vuoto
    history.pushState({ cornice: url }, '', url);
    if(cornice){ cornice.contentWindow.location.href = url; }
    else {
      cornice = document.createElement('iframe');
      cornice.id = 'corniceFutureAI'; cornice.title = 'FutureAI';
      cornice.setAttribute('allow', 'autoplay; fullscreen');
      cornice.src = url;
      document.body.appendChild(cornice);
    }
    document.documentElement.classList.add('in-cornice');
  }
  function chiudiCornice(){
    if(!cornice) return;
    document.documentElement.classList.remove('in-cornice');
    cornice.remove(); cornice = null; document.title = titoloMadre;
  }
  addEventListener('popstate', function(e){
    // tornati alla pagina madre: si toglie la cornice. Le pagine dentro la cornice
    // hanno la loro cronologia e il tasto indietro le gestisce da solo.
    if(!(e.state && e.state.cornice)) chiudiCornice();
  });
  // l'API che le pagine dentro la cornice usano
  window.__musicaFutureAI = {
    suona: function(){ return attiva; },
    alterna: alterna,
    ascolta: function(f){ chi.push(f); },
    pagina: function(url, titolo){
      if(!cornice) return;
      if(titolo) document.title = titolo;
      if(location.pathname + location.search + location.hash !== url) history.replaceState({ cornice: url }, '', url);
    }
  };
  // navigazione fatta dal codice (es. il robot del menu dopo il suo tuffo)
  window.vaiPagina = function(u){ var x = document.createElement('a'); x.href = u; if(attiva) apri(x.href); else location.href = x.href; };

  // i link interni, finche' la musica suona. Si lascia fare a chi ha gia' gestito il clic
  // (ancore della stessa pagina, menu del robot, strade della pagina AI…).
  document.addEventListener('click', function(e){
    if(!attiva || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]'); if(!a) return;
    if((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    var u; try{ u = new URL(a.href); }catch(x){ return; }   // a.href tiene conto di <base href="/">
    if(u.origin !== location.origin) return;
    if(u.pathname === location.pathname && u.search === location.search) return;   // stessa pagina
    if(/\.(pdf|jpe?g|png|webp|gif|mp4|mp3|zip|svg)$/i.test(u.pathname)) return;
    e.preventDefault(); apri(u.href);
  });
})();

/* ============================================================
   IL ROBOT ASSISTENTE — piccolo, in basso a sinistra, su ogni pagina servizio.
   Entrando ti saluta e ti dice cosa trovi nella pagina. NON e' un'intelligenza
   artificiale: le risposte sono scritte qui sotto, pagina per pagina.
   Per cambiare cosa dice: modifica PAGINE (chiave = percorso della pagina).
   Ogni domanda: q = testo del tasto, r = risposta, vai = selettore della
   sezione a cui scorrere (facoltativo), link = pagina da aprire (facoltativo).
   ============================================================ */
(function(){
  var COSTO={q:'Quanto costa?',r:'Ogni progetto ha il suo prezzo: una quota per crearlo e un piccolo canone mensile. Raccontaci cosa ti serve e ti mandiamo un preventivo chiaro, prima di iniziare.',link:'/contatti/',etich:'Chiedi un preventivo'};
  var PAGINE={
    '/intelligenza-artificiale/':{
      t:'Benvenuto nel <b>Mondo AI</b>! Qui hai tre scelte: la strada dei <b>Modelli AI</b>, quella dell\'<b>AI in locale</b>, e in basso il <b>negozio</b>, con prodotti già creati con l\'AI che possono servire al tuo lavoro.',
      d:[{q:'Da dove comincio?',r:'Se vuoi vedere subito l\'AI all\'opera, entra nel negozio in basso: su ogni bancone c\'è un prodotto già creato, da provare, che può essere utile per il tuo lavoro.',clic:'#bvNegozio',etich:'Portami nel negozio'},
         {q:'Che differenza c\'è tra le due strade?',r:'I <b>Modelli AI</b> lavorano nel cloud e sono i più potenti. L\'<b>AI in locale</b> gira su un computer dentro l\'azienda, così nessun dato esce. Spesso si usano insieme.'},
         COSTO]},
    '/siti-web/':{
      t:'Qui vedi come nasce un <b>sito FUTURE AI</b>: scorrendo, la vetrina prende vita. Più in basso puoi <b>provare davvero</b> il sito di un ristorante d\'esempio.',
      d:[{q:'Posso provare un sito?',r:'Sì: qui sotto c\'è il sito demo di un locale, con menu e ordini. È un esempio, non un negozio vero: tocca pure tutto.',vai:'#demo',etich:'Vai alla demo'},
         {q:'Funziona anche da telefono?',r:'Sì: ogni sito lo progettiamo prima per il telefono, perché è da lì che arriva quasi tutta la gente.'},
         COSTO]},
    '/app/':{
      t:'Qui scopri le <b>app su misura</b>: gestionali, CRM, portali clienti. Fai il <b>test da 1 minuto</b>: con 5 domande ti mostriamo quanto tempo potresti recuperare.',
      d:[{q:'Fammi fare il test',r:'Eccolo: rispondi a 5 domande veloci e alla fine vedi un\'app d\'esempio simile a quella che ti servirebbe.',vai:'#quiz',etich:'Vai al test'},
         {q:'Come lavorate?',r:'In quattro passi: ci racconti come lavori, ti mostriamo un\'anteprima, la costruiamo e la mettiamo in funzione, restando al tuo fianco.',vai:'#come',etich:'Vedi i passi'},
         COSTO]},
    '/giochi/':{
      t:'Qui il tuo marchio diventa un <b>videogioco</b>. C\'è una sala giochi da provare: gioca e immagina il tuo logo al posto del nostro.',
      d:[{q:'Posso giocare?',r:'Certo, qui sotto: prova e poi pensa ai tuoi clienti che sfidano gli amici con il tuo marchio in mano.',vai:'#giochi',etich:'Vai alla sala giochi'},
         {q:'A cosa serve un gioco aziendale?',r:'A farsi ricordare: la gente gioca, sfida gli amici e condivide. E il tuo marchio gira insieme al gioco, sui telefoni e sui social.'},
         COSTO]},
    '/prenotazioni/':{
      t:'Qui trovi le <b>prenotazioni online</b>: il cliente prenota da solo, a qualsiasi ora, e tu non paghi commissioni ai portali.',
      d:[{q:'Come funziona?',r:'Il cliente sceglie servizio e orario dal telefono, riceve la conferma e il promemoria. Tu vedi tutto in agenda.',vai:'#come',etich:'Vedi come funziona'},
         {q:'Ci sono commissioni?',r:'No: lo strumento è tuo, nessuna percentuale sulle prenotazioni.'},
         COSTO]},
    '/consulente-ai/':{
      t:'Qui conosci il <b>Consulente AI</b>: un assistente che impara i tuoi manuali e le tue procedure e risponde al tuo team in pochi secondi, con la fonte.',
      d:[{q:'Come si prepara?',r:'Raccogliamo i documenti, lo addestriamo, lo provate con il vostro team e poi entra in funzione. Te lo mostriamo passo per passo qui sotto.',vai:'#come',etich:'Vedi i passi'},
         {q:'I miei documenti sono al sicuro?',r:'Sì, sono trattati nel rispetto di GDPR e AI Act. E se non devono uscire dall\'azienda, c\'è l\'AI in locale.',link:'/intelligenza-artificiale/#locale',etich:'Scopri l\'AI in locale'},
         COSTO]},
    '/automazioni/':{
      t:'Qui vedi come il <b>lavoro ripetitivo si fa da solo</b>: colleghiamo Gmail, Calendar, CRM ed Excel perché si passino i dati senza copia-incolla.',
      d:[{q:'Come funziona?',r:'Si parte da un\'analisi di cosa fate a mano, si progetta il flusso e in pochi giorni lavora da solo. Ecco i passaggi.',vai:'#come-funziona',etich:'Vedi i passaggi'},
         {q:'Devo cambiare i programmi che uso?',r:'No: colleghiamo quelli che usi già. Cambia solo che smetti di fare a mano i passaggi ripetitivi.'},
         COSTO]},
    '/chiamate-ai/':{
      t:'Qui scopri l\'<b>assistente che risponde al telefono</b> 24 ore su 24: prende prenotazioni, dà informazioni e dice sempre di essere un\'AI.',
      d:[{q:'Come funziona?',r:'Decidiamo insieme cosa deve sapere e come deve parlare, lo proviamo e poi risponde al tuo numero quando tu non puoi.',vai:'#come',etich:'Vedi i passi'},
         {q:'E se il cliente vuole una persona?',r:'L\'assistente passa la chiamata o prende il messaggio e ti avvisa subito: nessuno resta senza risposta.'},
         COSTO]},
    '/lavori/':{
      t:'Qui trovi i <b>nostri lavori</b>: progetti veri, per aziende vere. Tocca una scheda per vedere il problema e come l\'abbiamo risolto.',
      d:[{q:'Fammi vedere i progetti',r:'Eccoli: per ognuno trovi il problema di partenza e la soluzione che abbiamo costruito.',vai:'#casi-studio',etich:'Vai ai progetti'},
         {q:'Potete fare una cosa simile per me?',r:'Sì: ogni progetto parte da come lavori tu. Raccontaci il tuo caso.',link:'/contatti/',etich:'Scrivici'}]},
    '/contatti/':{
      t:'Qui ci scrivi: raccontaci la tua idea, o il problema che ti fa perdere tempo ogni giorno. <b>La prima consulenza è gratuita.</b>',
      d:[{q:'Quanto costerebbe il mio progetto?',r:'Qui sotto puoi farti un\'idea con la stima indicativa; il preventivo vero te lo mandiamo dopo averti ascoltato.',vai:'#ctStima',etich:'Vai alla stima'},
         {q:'Quando mi rispondete?',r:'Entro 24 ore lavorative. Se ci lasci anche il telefono, spesso ti richiamiamo prima.'},
         {q:'Cosa devo scrivere?',r:'Basta poco: che lavoro fai e cosa ti fa perdere tempo. Al resto pensiamo noi con qualche domanda.',vai:'#contatti',etich:'Vai al modulo'}]}
  };
  var pag=PAGINE[location.pathname]||PAGINE[location.pathname.replace(/index\.html$/,'')];
  if(!pag)return;
  var calmo=matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css=document.createElement('style');
  css.textContent=
  '.as{position:fixed;z-index:7500;left:1.5rem;bottom:1.5rem;display:flex;flex-direction:column;align-items:flex-start;gap:.7rem;font-family:"DM Sans",sans-serif;pointer-events:none}'+
  '.as>*{pointer-events:auto}'+
  '.as-testa{position:relative;width:62px;height:62px;padding:0;border-radius:50%;border:2px solid #fff;overflow:hidden;cursor:pointer;background:#EFEFEF;'+
    'box-shadow:0 0 0 1px rgba(20,33,61,.12),0 14px 30px -10px rgba(8,12,28,.55);transform:scale(0);transition:transform .5s cubic-bezier(.34,1.56,.64,1)}'+
  '.as.su .as-testa{transform:none}'+
  '.as-testa:hover{transform:scale(1.07)}'+
  '.as-testa img,.as-testa video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.25);transform-origin:50% 30%}'+
  '.as-testa video{opacity:0;transition:opacity .2s}.as-testa.saluta video{opacity:1}'+
  '.as-testa::after{content:"";position:absolute;right:3px;top:3px;width:12px;height:12px;border-radius:50%;background:#3ddc84;border:2px solid #fff}'+
  '.as-testa:focus-visible{outline:3px solid #4DD9E0;outline-offset:3px}'+
  '.as-fumetto{position:relative;width:min(340px,calc(100vw - 2rem));padding:1.05rem 1.1rem 1rem;border-radius:20px 20px 20px 6px;background:#F7F5F0;color:#14213D;'+
    'box-shadow:0 1px 2px rgba(0,0,0,.15),0 26px 60px -20px rgba(8,12,28,.6);transform-origin:0 100%;transform:scale(.85) translateY(10px);opacity:0;transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s}'+
  '.as-fumetto.su{transform:none;opacity:1}.as-fumetto[hidden]{display:none}'+
  '.as-nome{margin:0 1.8rem 0 0;font:700 .66rem "Space Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#0f8f9e}'+
  '.as-testo{margin:.45rem 0 0;font-size:.93rem;line-height:1.55;color:#3D4A68;min-height:3em}.as-testo b{color:#14213D}'+
  '.as-domande{display:flex;flex-direction:column;align-items:flex-start;gap:.35rem;margin-top:.8rem}'+
  '.as-domande button,.as-az a,.as-az button{min-height:36px;padding:.45rem .8rem;border-radius:100px;border:1px solid rgba(20,33,61,.18);background:#fff;color:#14213D;'+
    'font:600 .84rem "DM Sans",sans-serif;cursor:pointer;text-align:left;text-decoration:none;transition:border-color .2s,transform .2s}'+
  '.as-domande button:hover,.as-az a:hover,.as-az button:hover{border-color:#0f8f9e;transform:translateX(3px)}'+
  '.as-az{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.7rem}'+
  '.as-az .as-primo{background:#14213D;color:#fff;border-color:#14213D}'+
  '.as-x{position:absolute;right:.55rem;top:.5rem;width:32px;height:32px;border:0;border-radius:50%;background:transparent;color:#556076;font-size:1.3rem;cursor:pointer}'+
  '.as-x:hover{background:rgba(20,33,61,.07)}'+
  '.as-nota{margin:.8rem 0 0;padding-top:.6rem;border-top:1px dashed rgba(20,33,61,.15);font-size:.7rem;line-height:1.4;color:#7A8499}'+
  '@media(max-width:768px){.as{right:auto;left:.9rem;bottom:.9rem;align-items:flex-start}.as-testa{width:48px;height:48px}.as-testo{font-size:.9rem}'+
    '.as-fumetto{border-radius:20px 20px 20px 6px;transform-origin:0 100%;max-height:calc(100dvh - 9rem);overflow:auto}}'+
  '.as{transition:opacity .3s,transform .3s cubic-bezier(.22,1,.36,1)}.as.via{opacity:0;transform:translateY(14px);pointer-events:none}'+
  '.as.via>*{pointer-events:none}'+
  '.as-fumetto.corto{width:min(270px,calc(100vw - 5rem));cursor:pointer}.as-fumetto.corto .as-domande,.as-fumetto.corto .as-az,.as-fumetto.corto .as-nota{display:none}'+
  '.as-fumetto.corto .as-testo{font-size:.86rem;min-height:0}.as-fumetto.corto::after{content:"Tocca per saperne di più ›";display:block;margin-top:.45rem;font:700 .74rem "DM Sans",sans-serif;color:#0f8f9e}'+
  '@media(prefers-reduced-motion:reduce){.as-testa,.as-fumetto{transition:none}}';
  document.head.appendChild(css);

  var as=document.createElement('div');as.className='as';as.id='assistente';
  as.innerHTML=
    '<div class="as-fumetto" id="asFumetto" role="dialog" aria-label="Il robot di FUTURE AI" hidden>'+
      '<button type="button" class="as-x" aria-label="Chiudi">×</button>'+
      '<p class="as-nome">Il robot di FUTURE AI</p>'+
      '<div class="as-testo" id="asTesto" aria-live="polite"></div>'+
      '<div class="as-az" id="asAz"></div>'+
      '<div class="as-domande" id="asDomande"></div>'+
      '<p class="as-nota">Risposte preimpostate: non sono un\'intelligenza artificiale, conosco solo questa pagina.</p>'+
    '</div>'+
    '<button type="button" class="as-testa" id="asTesta" aria-label="Apri il robot assistente" aria-expanded="false" aria-controls="asFumetto">'+
      '<img src="/menu/robot-assistente.webp" alt="" width="240" height="240">'+
      '<video src="/menu/robot-saluta.mp4" muted playsinline preload="auto" aria-hidden="true"></video>'+
    '</button>';
  document.body.appendChild(as);
  var fum=as.querySelector('#asFumetto'),testo=as.querySelector('#asTesto'),dom=as.querySelector('#asDomande'),az=as.querySelector('#asAz'),
      testa=as.querySelector('#asTesta'),vid=testa.querySelector('video'),aperto=false,daSolo=false,tScrivi=0;

  function scrivi(html){
    clearInterval(tScrivi);
    if(calmo){testo.innerHTML=html;return;}
    // si scrive un carattere alla volta, senza spezzare i tag
    var pezzi=html.split(/(<[^>]+>)/),vis='',i=0,j=0;testo.innerHTML='';
    tScrivi=setInterval(function(){
      if(i>=pezzi.length){clearInterval(tScrivi);return;}
      var p=pezzi[i];
      if(p.charAt(0)==='<'){vis+=p;i++;j=0;}
      else{j+=2;if(j>=p.length){vis+=p;i++;j=0;}}
      testo.innerHTML=vis+(i<pezzi.length&&pezzi[i].charAt(0)!=='<'?pezzi[i].slice(0,j):'');
    },14);
  }
  function saluta(){testa.classList.add('saluta');try{vid.currentTime=0;var p=vid.play();if(p&&p.catch)p.catch(function(){});}catch(e){}}
  vid.addEventListener('ended',function(){testa.classList.remove('saluta');});

  function domande(esclusa){
    dom.innerHTML='';
    pag.d.forEach(function(d,k){if(k===esclusa)return;var b=document.createElement('button');b.type='button';b.textContent=d.q;
      b.addEventListener('click',function(){rispondi(k);});dom.appendChild(b);});
    if(esclusa!==undefined){var b=document.createElement('button');b.type='button';b.textContent='← Cosa trovo in questa pagina?';b.addEventListener('click',inizio);dom.appendChild(b);}
  }
  function inizio(){az.innerHTML='';scrivi('Ciao! '+pag.t);domande();}
  function rispondi(k){
    var d=pag.d[k];az.innerHTML='';scrivi(d.r);
    if(d.vai&&document.querySelector(d.vai)){var b=document.createElement('button');b.type='button';b.className='as-primo';b.textContent=(d.etich||'Mostrami')+' ↓';
      b.addEventListener('click',function(){var el=document.querySelector(d.vai);chiudi();el.scrollIntoView({behavior:calmo?'auto':'smooth',block:'start'});});az.appendChild(b);}
    if(d.clic&&document.querySelector(d.clic)){var c=document.createElement('button');c.type='button';c.className='as-primo';c.textContent=(d.etich||'Vai')+' →';
      c.addEventListener('click',function(){var el=document.querySelector(d.clic);chiudi();scrollTo({top:0,behavior:'auto'});setTimeout(function(){el.click();},150);});az.appendChild(c);}
    if(d.link){var a=document.createElement('a');a.href=d.link;a.className='as-primo';a.textContent=(d.etich||'Apri')+' →';az.appendChild(a);}
    domande(k);
  }
  function apri(soloSaluto){
    if(aperto)return;aperto=true;daSolo=!!soloSaluto;fum.hidden=false;testa.setAttribute('aria-expanded','true');
    // da telefono il saluto automatico e' una nuvoletta breve: il resto si apre toccandola
    fum.classList.toggle('corto',daSolo);
    requestAnimationFrame(function(){requestAnimationFrame(function(){fum.classList.add('su');});});
    saluta();inizio();
  }
  function chiudi(){
    if(!aperto)return;aperto=false;fum.classList.remove('su');testa.setAttribute('aria-expanded','false');clearInterval(tScrivi);
    setTimeout(function(){if(!aperto)fum.hidden=true;},300);
  }
  testa.addEventListener('click',function(){aperto?chiudi():apri();});
  as.querySelector('.as-x').addEventListener('click',chiudi);
  addEventListener('keydown',function(e){if(e.key==='Escape'&&aperto)chiudi();});

  // entra, saluta e spiega la prima volta che apri questa pagina in questa visita;
  // se si era aperto da solo e inizi a scorrere, si fa da parte
  var chiave='as-visto:'+location.pathname,gia=false;try{gia=sessionStorage.getItem(chiave)==='1';}catch(e){}
  // alla prima visita parla solo dopo che si e' chiuso l'avviso dei cookie
  function cookieAperto(){var c=document.getElementById('cookie');return c&&!c.hidden;}
  function saluto(){if(cookieAperto()){setTimeout(saluto,600);return;}apri(true);try{sessionStorage.setItem(chiave,'1');}catch(e){}}
  setTimeout(function(){as.classList.add('su');
    if(!gia)setTimeout(saluto,500);
  },1400);
  var y0=null;
  addEventListener('scroll',function(){if(!aperto||!daSolo)return;if(y0===null)y0=scrollY;if(Math.abs(scrollY-y0)>innerHeight*.6){chiudi();}},{passive:true});
  fum.addEventListener('pointerdown',function(){daSolo=false;});
  fum.addEventListener('click',function(e){if(fum.classList.contains('corto')&&!e.target.closest('.as-x')){fum.classList.remove('corto');}});

  // da telefono robot e musica si fanno da parte mentre scorri in giu', e tornano quando ti fermi o risali
  var mus=document.getElementById('musicToggle'),yUlt=scrollY,tTorna=0;
  function via(si){if(aperto)si=false;as.classList.toggle('via',si);if(mus)mus.classList.toggle('via',si);}
  addEventListener('scroll',function(){if(innerWidth>768)return;var y=scrollY;
    if(y>yUlt+6)via(true);else if(y<yUlt-6)via(false);yUlt=y;
    clearTimeout(tTorna);tTorna=setTimeout(function(){via(false);},900);},{passive:true});
})();

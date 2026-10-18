/* Report gratuito: la richiesta va a /api/report (rewrite di Vercel verso il gestionale di FUTURE AI) e arriva come notifica a Manuel.
   ?da=volantino (QR del volantino, futureai.it/report) lo segna sulla richiesta. Anti-spam a tempo: niente campi nascosti
   (l'autocompilazione del browser li riempie e blocca le richieste vere). La copertina si scrive mentre compili. */
(function(){
  var f=document.getElementById('rgForm');if(!f)return;
  var $=function(id){return document.getElementById(id);};
  var t0=Date.now(),q=new URLSearchParams(location.search),da=(q.get('da')||'').toLowerCase().replace(/[^a-z0-9-]/g,'').slice(0,30)||'sito';
  if(da==='volantino'){var o=document.querySelector('.rgp-eroe .rgp-occhiello');if(o)o.textContent='— Report gratuito · benvenuto dal volantino';}
  /* la copertina */
  $('copData').textContent=new Date().toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});
  function dominio(u){return String(u||'').trim().replace(/^https?:\/\//i,'').replace(/^www\./i,'').split('/')[0];}
  function copertina(){var att=$('rgAtt').value.trim(),dom=$('rgSenza').checked?'':dominio($('rgSito').value),citta=$('rgCitta').value.trim();
    $('copNome').textContent=att||dom||'La tua attività';
    $('copCitta').textContent=citta?'Preparato per '+(att||dom||'te')+' · '+citta:'Preparato da FUTURE AI';}
  ['rgAtt','rgSito','rgCitta'].forEach(function(id){$(id).addEventListener('input',copertina);});
  /* senza sito: servono nome e città */
  var senza=$('rgSenza'),sito=$('rgSito');
  function aggiornaSenza(){var s=senza.checked;sito.disabled=s;if(s)sito.value='';
    $('rgAttEt').textContent="Nome dell'azienda"+(s?' *':'');$('rgCittaEt').textContent='Paese o città'+(s?' *':'');copertina();if(s)$('rgAtt').focus();}
  senza.addEventListener('change',aggiornaSenza);aggiornaSenza();
  /* le scelte rapide */
  var scelte=[].slice.call(document.querySelectorAll('#rgScelte button'));
  scelte.forEach(function(b){b.addEventListener('click',function(){b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')==='true'?'false':'true');});});
  var es=$('rgEsito'),bt=$('rgBtn');
  function dici(t){es.textContent=t;}
  f.addEventListener('submit',function(e){e.preventDefault();
    var v=function(id){return $(id).value.trim();};
    var spunte=scelte.filter(function(b){return b.getAttribute('aria-pressed')==='true';}).map(function(b){return b.textContent;});
    var obi=(spunte.length?'Mi ruba tempo: '+spunte.join(', ').toLowerCase()+'. ':'')+v('rgObi');
    var d={sito:v('rgSito'),senza_sito:senza.checked,attivita:v('rgAtt'),citta:v('rgCitta'),obiettivo:obi.trim(),nome:v('rgNome'),whatsapp:v('rgWa'),email:v('rgEmail'),privacy:$('rgOk').checked,da:da,ms:Date.now()-t0};
    if(!d.senza_sito&&!/\./.test(d.sito)){dici("Scrivi l'indirizzo del sito, oppure spunta «Non ho un sito».");$('rgSito').focus();return;}
    if(d.senza_sito&&!d.attivita){dici("Senza sito scrivi il nome della tua azienda: il report lo facciamo su quello.");$('rgAtt').focus();return;}
    if(d.senza_sito&&!d.citta){dici("Scrivi anche il paese o la città, per trovarti su Google.");$('rgCitta').focus();return;}
    if(!d.nome){dici('Scrivi il tuo nome.');$('rgNome').focus();return;}
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)){dici("Controlla l'email: è lì che ti mandiamo il report.");$('rgEmail').focus();return;}
    if(!d.privacy){dici("Spunta la casella dell'informativa privacy.");return;}
    dici('');bt.disabled=true;bt.querySelector('span').textContent='Invio in corso…';
    fetch('/api/report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
      .then(function(r){return r.json().catch(function(){return {};}).then(function(j){if(!r.ok)throw new Error(j.errore||'');return j;});})
      .then(function(){$('fattoNome').textContent=$('copNome').textContent==='La tua attività'?'la tua attività':$('copNome').textContent;
        f.hidden=true;$('rgFatto').hidden=false;$('rgpCop').classList.add('fatto');
        var m=$('richiedi');if(m&&m.getBoundingClientRect().top<0)m.scrollIntoView({behavior:'smooth',block:'start'});})
      .catch(function(err){dici(err.message||'Non è partita: riprova o scrivici a info@futureai.it');bt.disabled=false;bt.querySelector('span').textContent='Voglio il mio report';});
  });
})();

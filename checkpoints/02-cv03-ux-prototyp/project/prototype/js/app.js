/* Buildless, offline-first UX prototype. Hash routes work under file://. */
(() => {
  'use strict';
  const data = window.FESTIVAL_DATA;
  const main = document.querySelector('main');
  const performers = new Map(data.performers.map(p => [p.id, p]));
  const venues = new Map(data.venues.map(v => [v.id, v]));
  const eventIds = new Set(data.events.map(e => e.id));
  const days = [...new Set(data.events.map(e => e.day))].sort();
  const genres = [...new Set(data.performers.map(p => p.genre))].sort((a,b) => a.localeCompare(b,'cs'));
  const types = {concert:'Koncert',talk:'Talk',workshop:'Workshop'};
  const storageKey = 'aurora-prototype2-saved-v1';
  let storageAvailable = true;
  let saved = new Set();
  let toastTimer;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const dateLabel = day => new Intl.DateTimeFormat('cs-CZ',{weekday:'long',day:'numeric',month:'numeric',timeZone:'UTC'}).format(new Date(day+'T12:00:00Z'));
  const shortDate = day => new Intl.DateTimeFormat('cs-CZ',{day:'numeric',month:'numeric',timeZone:'UTC'}).format(new Date(day+'T12:00:00Z'));
  const minutes = time => Number(time.slice(0,2))*60 + Number(time.slice(3,5));
  const endTime = e => {
    const end = minutes(e.startTime)+e.durationMin;
    return String(Math.floor(end/60)%24).padStart(2,'0')+':'+String(end%60).padStart(2,'0')+(end>=1440?' (+1 den)':'');
  };
  const eventStart = e => Date.parse(e.day+'T'+e.startTime+':00Z')/60000;
  const sorted = list => [...list].sort((a,b) => eventStart(a)-eventStart(b) || a.title.localeCompare(b.title,'cs'));
  function readSaved() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
      saved = new Set(Array.isArray(value) ? value.filter(id => eventIds.has(id)) : []);
    } catch { storageAvailable = false; }
  }
  readSaved();
  function conflicts() {
    const selected = sorted(data.events.filter(e => saved.has(e.id)));
    const pairs = [];
    selected.forEach((a,i) => selected.slice(i+1).forEach(b => {
      const overlap = Math.min(eventStart(a)+a.durationMin,eventStart(b)+b.durationMin)-Math.max(eventStart(a),eventStart(b));
      if (overlap>0) pairs.push({a,b,overlap});
    }));
    return pairs;
  }
  function route() {
    const [path,query=''] = location.hash.slice(1).split('?');
    return {path:path || '/',params:new URLSearchParams(query)};
  }
  function href(path, params={}) {
    const query = new URLSearchParams(Object.entries(params).filter(([,v]) => v));
    return '#'+path+(query.size?'?'+query:'');
  }
  function crumb(label,parent) {
    return `<nav class="breadcrumb" aria-label="Drobečková navigace"><a href="#/">Úvod</a><span aria-hidden="true">/</span>${parent?`<a href="${parent.href}">${parent.label}</a><span aria-hidden="true">/</span>`:''}<span aria-current="page">${escape(label)}</span></nav>`;
  }
  function intro(title,description,meta='') {
    return `<header class="page-intro">${meta?`<div class="intro-meta">${escape(meta)}</div>`:''}<h1>${escape(title)}</h1>${description?`<p>${escape(description)}</p>`:''}</header>`;
  }
  function saveButton(e) {
    const selected = saved.has(e.id);
    return `<button class="save-button" data-save="${e.id}" aria-pressed="${selected}" aria-label="${selected?'Odebrat':'Přidat'} ${escape(e.title)} ${selected?'z mého':'do mého'} programu"><span aria-hidden="true">${selected?'✓':'+'}</span></button>`;
  }
  function eventCard(e,{showDate=false,clashing=new Set()}={}) {
    const p = performers.get(e.performerId), v = venues.get(e.venueId);
    const clash = clashing.has(e.id);
    return `<article class="event${clash?' conflict':''}" data-event="${e.id}">
      <div class="event-time">${showDate?`<div>${shortDate(e.day)}</div>`:''}<time datetime="${e.day}T${e.startTime}">${e.startTime}</time>–${endTime(e)}</div>
      <div class="event-body"><h3><a href="${href('/ucinkujici/'+p.id)}">${escape(e.title)}</a></h3>
      <div class="event-meta"><a href="${href('/sceny',{id:v.id})}">${escape(v.name)}</a><span>${escape(p.genre)}</span><span>${types[e.type] || escape(e.type)}</span></div>
      ${clash?'<span class="conflict-label">Časový překryv v mém programu</span>':''}</div>${saveButton(e)}</article>`;
  }
  function empty(title,description,link,label) {
    return `<div class="empty"><h2>${title}</h2><p>${description}</p>${link?`<a class="button" href="${link}">${label} <span aria-hidden="true">↗</span></a>`:''}</div>`;
  }
  function storageNotice() {
    return storageAvailable?'': '<aside class="notice warning">Prohlížeč nepovolil ukládání. Váš program zůstane dostupný jen do zavření nebo obnovení této stránky.</aside>';
  }
  function conflictNotice(pairs) {
    if (!pairs.length) return '';
    return `<aside class="notice warning" aria-label="Časové kolize"><strong>Některá vystoupení se překrývají.</strong><p>Vyberte, kterému dáte přednost. Kolize kontrolujeme ve všech dnech vašeho programu.</p><ul>${pairs.map(({a,b,overlap})=>`<li>${escape(a.title)} + ${escape(b.title)} · ${shortDate(a.day)} · překryv ${overlap} min</li>`).join('')}</ul><a class="text-link" href="#/muj-program">Otevřít můj program ↗</a></aside>`;
  }
  function home() {
    return `<div class="wrap"><section class="hero" aria-label="Festival Aurora 2026">
      <div class="hero-topline"><span>Nezávislá hudba. Společný prostor.</span><span>Praha / 20.–22. 08.</span></div>
      <div class="hero-wordmark" aria-hidden="true">aurora<span>2026</span></div>
      <div class="hero-grid"><div class="hero-copy"><h1>Tři dny.<br>Vlastní frekvence.</h1><p>Indie, elektronika a všechno mezi. Objevte svou hudbu na Výstavišti a v okolí.</p><a class="button" href="#/program">Prohlédnout program <span aria-hidden="true">↗</span></a></div>
      <div class="hero-image"><img src="assets/festival.webp" width="1536" height="1024" alt="Siluety publika pod zelenými světly pódia." fetchpriority="high"><span class="image-label">20–22 / SRPEN / PRAHA</span></div></div>
      <div class="festival-strip"><div><strong>03</strong><span>dny objevování</span></div><div><strong>03</strong><span>různé scény</span></div><div><strong>60</strong><span>účinkujících</span></div></div>
      </section>
      <section class="section"><div class="section-heading"><h2>Koho uslyšíte.</h2><a class="text-link" href="#/ucinkujici">Všichni účinkující ↗</a></div>
      <div class="lineup">${data.performers.slice(0,6).map((p,i)=>`<a class="lineup-item" href="${href('/ucinkujici/'+p.id)}"><span class="lineup-num">0${i+1}</span><div><h3>${escape(p.name)}</h3><p>${escape(p.genre)} / ${escape(p.country)}</p></div><span class="arrow" aria-hidden="true">↗</span></a>`).join('')}</div></section>
      <section class="section about-layout"><h2>Víc než<br>jen koncerty.</h2><div><p>Tři dny, kdy se potkávají kytary, beaty a nové nápady. Mezi koncerty se zastavte na talku nebo si vyzkoušejte hudební produkci na workshopu. Sestavte si festival podle sebe.</p><div class="route-links"><a href="#/sceny">Poznejte naše scény <span aria-hidden="true">↗</span></a><a href="#/info">Vše před návštěvou <span aria-hidden="true">↗</span></a><a href="#/muj-program">Sestavte si vlastní program <span aria-hidden="true">↗</span></a></div></div></section></div>`;
  }
  const option = (value,label,current) => `<option value="${escape(value)}"${current===value?' selected':''}>${escape(label)}</option>`;
  function selectField(id,label,items,current) {
    return `<div class="field"><label for="${id}">${label}</label><select id="${id}" name="${id}">${items.map(([value,text])=>option(value,text,current)).join('')}</select></div>`;
  }
  function program(params) {
    const day = days.includes(params.get('den'))?params.get('den'):days[0];
    return `<div class="wrap content-bottom">${crumb('Program')}${intro('Najděte svou frekvenci.','Vyberte den, objevujte vystoupení a tlačítkem + si je přidejte do svého programu.','PROGRAM / 20.–22. SRPNA 2026')}
      <nav class="day-tabs" aria-label="Festivalový den">${days.map(d=>`<a href="${href('/program',{...Object.fromEntries(params),den:d})}"${d===day?' aria-current="date"':''}><strong>${dateLabel(d).split(' ')[0]}</strong><span>${shortDate(d)}</span></a>`).join('')}</nav>
      <form id="filters" class="filters" role="search" aria-label="Filtry programu">
      <div class="field search-field"><label for="q">Hledat v programu</label><input id="q" name="q" type="search" value="${escape(params.get('q'))}" placeholder="Jméno, žánr nebo název…" autocomplete="off"></div>
      ${selectField('scena','Scéna',[['','Všechny scény'],...data.venues.map(v=>[v.id,v.name])],params.get('scena'))}
      ${selectField('zanr','Žánr',[['','Všechny žánry'],...genres.map(g=>[g,g])],params.get('zanr'))}
      ${selectField('typ','Typ akce',[['','Všechny typy'],...Object.entries(types)],params.get('typ'))}</form>
      <section aria-label="Vystoupení"><h2 class="sr-only">Vystoupení ve vybraném dni</h2><div id="results"></div></section></div>`;
  }
  function programResults() {
    const {params} = route();
    const day = days.includes(params.get('den'))?params.get('den'):days[0];
    const query = normalize(params.get('q') || '');
    const list = sorted(data.events.filter(e => {
      const p = performers.get(e.performerId);
      return e.day===day && (!params.get('scena') || e.venueId===params.get('scena')) && (!params.get('typ') || e.type===params.get('typ')) && (!params.get('zanr') || p.genre===params.get('zanr')) && normalize([e.title,e.description,p.name,p.genre,venues.get(e.venueId).name,types[e.type]].join(' ')).includes(query);
    }));
    const pairs = conflicts(), clashing = new Set(pairs.flatMap(({a,b})=>[a.id,b.id]));
    document.getElementById('results').innerHTML = storageNotice()+conflictNotice(pairs)+`<div class="result-bar"><span role="status">${list.length} z ${data.events.filter(e=>e.day===day).length} vystoupení · ${dateLabel(day)}</span><button class="reset-button" data-reset="program">Zrušit filtry</button></div>`+(list.length?`<div class="event-list">${list.map(e=>eventCard(e,{clashing})).join('')}</div>`:empty('Tady je zatím ticho.','Této kombinaci filtrů neodpovídá žádné vystoupení. Zkuste jiný výraz nebo zrušte filtry.'));
  }
  function artistList(params) {
    return `<div class="wrap content-bottom">${crumb('Účinkující')}${intro('Nové objevy. Známé pocity.','Šedesát jmen, která dávají Auroře její zvuk. Najděte svůj žánr a prozkoumejte, kdo za ním stojí.')}
      <form id="artist-filters" class="filters" role="search" aria-label="Hledání účinkujících"><div class="field search-field"><label for="q">Hledat účinkující</label><input id="q" name="q" type="search" placeholder="Jméno nebo země…" value="${escape(params.get('q'))}"></div>${selectField('zanr','Žánr',[['','Všechny žánry'],...genres.map(g=>[g,g])],params.get('zanr'))}</form><div id="artist-results"></div></div>`;
  }
  function artistCard(p, level=2) {
    return `<a class="performer" href="${href('/ucinkujici/'+p.id)}"><h${level}>${escape(p.name)} <span aria-hidden="true">↗</span></h${level}><p>${escape(p.genre)} / ${escape(p.country)}</p></a>`;
  }
  function artistResults() {
    const {params} = route(), query=normalize(params.get('q')||'');
    const list = data.performers.filter(p=>(!params.get('zanr') || p.genre===params.get('zanr')) && normalize([p.name,p.country,p.genre].join(' ')).includes(query)).sort((a,b)=>a.name.localeCompare(b.name,'cs'));
    document.getElementById('artist-results').innerHTML=`<div class="result-bar"><span role="status">${list.length} z 60 účinkujících</span><button class="reset-button" data-reset="artists">Zrušit filtry</button></div>`+(list.length?`<div class="performer-grid">${list.map(p=>artistCard(p)).join('')}</div>`:empty('Nikoho jsme nenašli.','Zkuste jiné jméno nebo zrušte filtr žánru.'));
  }
  function artistDetail(id) {
    const p = performers.get(id);
    if (!p) return notFound();
    const events=sorted(data.events.filter(e=>e.performerId===id));
    const clashing=new Set(conflicts().flatMap(({a,b})=>[a.id,b.id]));
    return `<div class="wrap content-bottom">${crumb(p.name,{href:'#/ucinkujici',label:'Účinkující'})}${intro(p.name,'',p.genre+' / '+p.country)}
      <div class="detail-layout"><div class="artist-stamp" aria-hidden="true"><span>Aurora / 2026</span><strong>${escape(p.name.split(' ').map(w=>w[0]).slice(0,2).join(''))}</strong><span>${escape(p.genre)} / ${escape(p.country)}</span></div><div><p class="bio">${escape(p.bio)}</p><section class="section"><h2>Kdy a kde</h2>${storageNotice()}<div class="event-list">${events.map(e=>eventCard(e,{showDate:true,clashing})).join('')}</div>${events.map(e=>`<p class="muted" style="margin-top:20px">${escape(e.description)}</p>`).join('')}<a class="text-link" href="${href('/program',{den:events[0]?.day})}">Celý program dne ↗</a></section></div></div></div>`;
  }
  function myProgram() {
    const list=sorted(data.events.filter(e=>saved.has(e.id))), pairs=conflicts(), clashing=new Set(pairs.flatMap(({a,b})=>[a.id,b.id]));
    return `<div class="wrap content-bottom">${crumb('Můj program')}${intro('Váš festival. Váš výběr.','Všechna uložená vystoupení na jednom místě. Výběr se ukládá v tomto prohlížeči; mezi zařízeními se nesynchronizuje.','MŮJ PROGRAM / '+list.length+' VYSTOUPENÍ')}${storageNotice()}${conflictNotice(pairs)}
      ${list.length?days.filter(d=>list.some(e=>e.day===d)).map(d=>`<section class="section"><div class="section-heading"><h2>${dateLabel(d)}</h2><a class="text-link" href="${href('/program',{den:d})}">Přidat další ↗</a></div><div class="event-list">${list.filter(e=>e.day===d).map(e=>eventCard(e,{clashing})).join('')}</div></section>`).join(''):empty('První koncert je na vás.','V programu klepněte na + u vystoupení, které chcete zažít. Tady pak najdete svůj vlastní rozvrh.','#/program','Prohlédnout program')}
      ${list.length&&!pairs.length?'<p class="notice">Váš výběr nemá časové překryvy. Nezapomeňte počítat také s přesuny mezi scénami.</p>':''}</div>`;
  }
  function venuesPage() {
    return `<div class="wrap content-bottom">${crumb('Scény')}${intro('Tři scény. Tři energie.','Od otevřeného pódia po klub a komorní sál. Ověřte si adresu, přístupnost a program každé scény.')}
      <div class="venues-list">${data.venues.map((v,i)=>`<article class="venue" id="${v.id}"><span class="venue-number" aria-hidden="true">0${i+1}</span><div><h2>${escape(v.name)}</h2><address>${escape(v.address)}</address><div class="venue-capacity">KAPACITA / ${v.capacity.toLocaleString('cs-CZ')} NÁVŠTĚVNÍKŮ</div><p>${escape(v.access)}</p></div><a class="button secondary" href="${href('/program',{scena:v.id})}">Program scény ↗</a></article>`).join('')}</div><a class="text-link" href="#/info">Doprava a praktické info ↗</a></div>`;
  }
  function infoPage() {
    const ticketLabels={day:'Jednodenní vstupenka',full:'Celý festival · 3 dny',vip:'VIP vstupenka'};
    return `<div class="wrap content-bottom">${crumb('Praktické info')}${intro('Přijeďte v klidu.','Vše podstatné před návštěvou Aurory. Festival probíhá 20.–22. srpna 2026 v Praze 7.')}
      <div class="info-grid"><section><h2>Jak se k nám dostat</h2><p>Hlavním bodem festivalu je Výstaviště Praha v Holešovicích. Pro příjezd využijte MHD směrem k Výstavišti nebo Nádraží Holešovice. Před cestou si ověřte aktuální spojení a bezbariérovost spoje.</p><p>Riverside Club Stage má vlastní adresu na Bubenském nábřeží. Při plánování programu si nechte čas na přesun.</p><a class="text-link" href="#/sceny">Adresy a přístupnost scén ↗</a></section><section><h2>Vstupenky</h2><ul class="ticket-list">${data.festival.tickets.map(t=>`<li><span>${ticketLabels[t.type] || escape(t.type)}</span><strong>${t.price.toLocaleString('cs-CZ')} Kč</strong></li>`).join('')}</ul></section></div>
      <section class="faq"><h2>Dobré vědět.</h2>
      <details><summary>Je festival bezbariérový?</summary><p>Všechny tři scény počítají s bezbariérovým přístupem. Main Stage nabízí vyvýšenou rampu a indukční smyčku, Riverside přístup po zpevněném nábřeží a bezbariérové WC. Forum Hall má výtah, rampu, vyhrazenou zónu a indukční smyčku. <a href="#/sceny">Podrobnosti podle scény</a>.</p></details>
      <details><summary>Jak funguje můj program?</summary><p>U vystoupení klepněte na +. Značka se změní na ✓ a akce se objeví v Mém programu. Dalším klepnutím ji odeberete. Při časovém překryvu uvidíte upozornění i délku překryvu.</p></details>
      <details><summary>Zůstane mi výběr i po zavření stránky?</summary><p>Ano, pokud prohlížeč povoluje místní úložiště. Výběr se uchovává jen v tomto prohlížeči a pod touto adresou webu. Na jiné zařízení se nepřenáší a vymazáním dat prohlížeče se odstraní. Pokud ukládání není dostupné, zobrazíme upozornění.</p></details>
      <details><summary>Můžu vyrazit i na talk nebo workshop?</summary><p>Ano. V programu vyberte typ akce Talk nebo Workshop. U každé položky najdete čas, scénu a odkaz na účinkujícího.</p></details>
</section></div>`;
  }
  function searchPage(params) {
    const query=(params.get('q') || '').trim(), q=normalize(query);
    const people=q?data.performers.filter(p=>normalize([p.name,p.genre,p.country,p.bio].join(' ')).includes(q)):[];
    const events=q?sorted(data.events.filter(e=>normalize([e.title,e.description,performers.get(e.performerId).genre,venues.get(e.venueId).name,types[e.type]].join(' ')).includes(q))):[];
    const places=q?data.venues.filter(v=>normalize([v.name,v.address,v.access].join(' ')).includes(q)):[];
    const total=people.length+events.length+places.length;
    return `<div class="wrap content-bottom">${crumb('Hledání')}${intro('Co chcete objevit?','Hledejte účinkující, vystoupení i festivalové scény.')}
      <form id="global-search" class="search-form" role="search"><div class="field"><label for="global-q">Hledat na webu</label><input id="global-q" name="q" type="search" value="${escape(query)}" placeholder="Například Lunar Tides" required></div><button class="button" type="submit">Hledat</button></form>
      ${q?`<p role="status" class="muted">Výsledky pro „${escape(query)}“: ${total}</p><div class="search-results">${people.length?`<section><h2>Účinkující (${people.length})</h2><div class="performer-grid">${people.map(p=>artistCard(p,3)).join('')}</div></section>`:''}${events.length?`<section><h2>Vystoupení (${events.length})</h2><div class="event-list">${events.map(e=>eventCard(e,{showDate:true})).join('')}</div></section>`:''}${places.length?`<section><h2>Scény (${places.length})</h2><div class="route-links">${places.map(v=>`<a href="${href('/sceny',{id:v.id})}">${escape(v.name)} <span aria-hidden="true">↗</span></a>`).join('')}</div></section>`:''}${!total?empty('Nic jsme nenašli.','Zkuste kratší název, jméno interpreta nebo hudební žánr.'):''}</div>`:'<p class="notice">Tip: hledání funguje i bez diakritiky. Zkuste „elektronika“ nebo „Forum“.</p>'}</div>`;
  }
  function notFound() {
    return `<div class="wrap content-bottom">${crumb('Nenalezeno')}${intro('Tahle scéna je prázdná.','Požadovaná stránka nebo účinkující neexistuje.')}<a class="button" href="#/program">Prohlédnout program ↗</a></div>`;
  }
  function updateCount() { document.getElementById('saved-count').textContent=saved.size; }
  function render({focus=true}={}) {
    const {path,params}=route();
    let title='Aurora 2026', content;
    if(path==='/') {content=home();title='Aurora 2026 — Tři dny. Vlastní frekvence.';}
    else if(path==='/program') {content=program(params);title='Program | Aurora 2026';}
    else if(path==='/ucinkujici') {content=artistList(params);title='Účinkující | Aurora 2026';}
    else if(path.startsWith('/ucinkujici/')) {content=artistDetail(path.split('/')[2]);title=(performers.get(path.split('/')[2])?.name || 'Nenalezeno')+' | Aurora 2026';}
    else if(path==='/muj-program') {content=myProgram();title='Můj program | Aurora 2026';}
    else if(path==='/sceny') {content=venuesPage();title='Scény | Aurora 2026';}
    else if(path==='/info') {content=infoPage();title='Praktické info | Aurora 2026';}
    else if(path==='/hledat') {content=searchPage(params);title='Hledání | Aurora 2026';}
    else {content=notFound();title='Nenalezeno | Aurora 2026';}
    main.innerHTML=content;
    document.title=title;
    if(path==='/program') programResults();
    if(path==='/ucinkujici') artistResults();
    document.querySelectorAll('[data-nav]').forEach(a=>{if(path.split('/')[1]===a.dataset.nav)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    updateCount();
    document.getElementById('navigation').classList.remove('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
    if(focus){main.focus({preventScroll:true});window.scrollTo(0,0);}
    if(path==='/sceny' && venues.has(params.get('id'))) document.getElementById(params.get('id')).scrollIntoView();
  }
  function announce(message) {
    const toast=document.getElementById('toast');
    toast.textContent=message;toast.hidden=false;
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.hidden=true;},3500);
  }
  function toggleSaved(id) {
    if(!eventIds.has(id))return;
    const selected=saved.has(id), focusBefore=document.activeElement;
    const buttons=[...document.querySelectorAll('[data-save]')], index=buttons.indexOf(focusBefore);
    if(selected)saved.delete(id);else saved.add(id);
    try{localStorage.setItem(storageKey,JSON.stringify([...saved]));storageAvailable=true;}catch{storageAvailable=false;}
    const scroll=window.scrollY;
    render({focus:false});
    const focusAfter=document.querySelector(`[data-save="${id}"]`) || [...document.querySelectorAll('[data-save]')][Math.max(0,index-1)] || main;
    focusAfter.focus({preventScroll:true});window.scrollTo(0,scroll);
    const event=data.events.find(e=>e.id===id);
    announce(`${event.title}: ${selected?'odebráno z programu.':'přidáno do programu.'}${conflicts().length?' Pozor na časový překryv.':''}${!storageAvailable?' Výběr se nepodařilo trvale uložit.':''}`);
  }
  function filterChanged(form) {
    const {path,params}=route();
    for(const [name,value] of new FormData(form)){if(value)params.set(name,value);else params.delete(name);}
    history.replaceState(null,'',href(path,Object.fromEntries(params)));
    if(path==='/program')programResults();else artistResults();
    // Keep day links synchronized with the current filters.
    document.querySelectorAll('.day-tabs a').forEach((a,i)=>{a.href=href('/program',{...Object.fromEntries(params),den:days[i]});});
  }
  main.addEventListener('input',e=>{if(e.target.matches('input') && e.target.closest('#filters,#artist-filters')) filterChanged(e.target.form);});
  main.addEventListener('change',e=>{if(e.target.matches('select') && e.target.closest('#filters,#artist-filters')) filterChanged(e.target.form);});
  main.addEventListener('submit',e=>{
    e.preventDefault();
    if(e.target.id==='global-search') {
      const target=href('/hledat',{q:new FormData(e.target).get('q').trim()});
      if(location.hash===target)render();else location.hash=target;
    }
  });
  main.addEventListener('click',e=>{
    const save=e.target.closest('[data-save]');if(save){toggleSaved(save.dataset.save);return;}
    const reset=e.target.closest('[data-reset]');if(reset){
      const {params}=route();
      const target=reset.dataset.reset==='program'?href('/program',{den:params.get('den')}):'#/ucinkujici';
      history.replaceState(null,'',target);render({focus:false});document.getElementById('q').focus();
    }
  });
  const menu=document.querySelector('.menu-toggle');
  document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();main.focus();main.scrollIntoView();});
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.getElementById('navigation').classList.toggle('open',open);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){document.getElementById('navigation').classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}});
  window.addEventListener('hashchange',()=>render());
  window.addEventListener('storage',e=>{if(e.key===storageKey || e.key===null){readSaved();render({focus:false});}});
  render({focus:false});
})();

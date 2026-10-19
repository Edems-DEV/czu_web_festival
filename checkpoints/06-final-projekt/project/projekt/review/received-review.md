# Přijaté expertní hodnocení (Received Peer Cross-Review)

**Předmět:** Web design (WEB) | PEF Česká zemědělská univerzita v Praze  
**Hodnocený projekt:** Hudební Festival Aurora 2026 (Tým Aurora, Cvičení ST 10:30)  
**Hodnotící oponentní tým:** Tým projektu SoundWave Festival 2026 (Skupina 4 studentů, obor INFO / SyI)  
**Datum předání oponentury:** 2026-10-12  
**Formální výstup pro:** Cvičení 6 / Finální odevzdání semestrálního projektu  

---

## 1. Souhrnné vyjádření oponentů

Projekt **Hudební Festival Aurora 2026** představuje vysoce propracované klientské webové řešení pro fiktivní třídenní festival v areálu Výstaviště Praha. Odevzdaná review-ready verze splňuje zadání co do rozsahu (3 dny, 3 scény, 60 účinkujících, 60 programových položek), sémantiky HTML5, mobile-first designu a čistě klientské architektury bez nutnosti backendu.

Při průchodu klíčovými uživatelskými scénáři a heuristické evaluaci dle Jakoba Nielsena jsme identifikovali 10 konkrétních nálezů různé závažnosti, které doporučujeme týmu zapracovat do finální verze projektu.

---

## 2. Přehled nálezů a doporučení oponentury

### Nález 1: Nízký barevný kontrast tlumeného textu v patičce a na kartách
- **Závažnost:** 🟡 Významný
- **Kategorie:** Přístupnost (WCAG 2.0 AA – SC 1.4.3 Contrast Minimum)
- **Popis problému:** Text s třídou `.text-muted` a hodnotou design tokenu `--text-muted: #64748b` dosahuje na tmavém podkladu `#0b0f19` kontrastního poměru pouze 3.9:1, což nesplňuje minimální hranici 4.5:1 pro běžný text.
- **Doporučené řešení:** Zesvětlit hodnotu tokenu `--text-muted` na odstín s kontrastem minimálně 5.7:1 (např. `#94a3b8`).

### Nález 2: Absence přesného vyčíslení překryvu v minutách při kolizi v harmonogramu
- **Závažnost:** 🟡 Významný
- **Kategorie:** Použitelnost (Heuristika H5 – Prevence chyb)
- **Popis problému:** Při přidání dvou časově kolidujících koncertů do sekce „Můj program“ se zobrazí textové varování o kolizi, ale uživatel nevidí přesnou délku časového překryvu ($\Delta t$).
- **Doporučené řešení:** Doplnit do detekčního algoritmu výpočet délky kolize v minutách a zobrazit údaj přímo ve varovném banneru (např. *„Překryv: 30 minut“*).

### Nález 3: Absence globálního fulltextového vyhledávání
- **Závažnost:** 🟡 Významný
- **Kategorie:** Informační architektura a navigace (Heuristika H7 – Flexibilita použití)
- **Popis problému:** Vyhledávací pole je dostupné pouze lokálně na stránce `program.html`. Uživatel na úvodní stránce nemůže přímo vyhledat interpreta.
- **Doporučené řešení:** Vytvořit dedikovanou šablonu `search.html` napojenou na globální vyhledávání napříč celou databází.

### Nález 4: Malá dotyková plocha čipů pro výběr festivalových dnů
- **Závažnost:** 🟢 Drobný
- **Kategorie:** Mobilní ergonomie (WCAG 2.5.5 Target Size)
- **Popis problému:** Tlačítka pro volbu dnů mají výšku 36 px, což může na mobilu způsobovat překlepy při ovládání jednou rukou.
- **Doporučené řešení:** Nastavit minimální výšku a šířku dotykových cílů na 44 × 44 px.

### Nález 5: Prázdný stav při nulovém výsledku filtrace
- **Závažnost:** 🟡 Významný
- **Kategorie:** Zpětná vazba systému (Heuristika H1 – Visibility of system status)
- **Popis problému:** Pokud uživatel zadá do filtru výraz, který neodpovídá žádnému koncertu, plocha harmonogramu zůstane prázdná bez vysvětlení.
- **Doporučené řešení:** Zobrazit explicitní stav `#empty-schedule-state` s informací a tlačítkem pro reset všech filtrů.

### Nález 6: Doporučení doplnit externí interaktivní mapu (Google Maps / Leaflet)
- **Závažnost:** 🟢 Drobný
- **Kategorie:** Uživatelský komfort
- **Popis problému:** Na stránce scén chybí interaktivní posuvná mapa areálu Výstaviště.
- **Doporučené řešení:** Integrovat externí mapový framework. *(Pozn.: Tým Aurora odmítl z důvodu striktního požadavku na 100% offline file:/// provoz).*

### Nález 7: Absence přímého navigačního odkazu na scénu z detailu interpreta
- **Závažnost:** 🟢 Drobný
- **Kategorie:** Provázanost informační architektury
- **Popis problému:** V detailu interpreta je uveden název scény jako prostý text bez odkazu na její bezbariérovost a popis.
- **Doporučené řešení:** Opatřit název scény kotvou směřující na `venues.html#v...`.

### Nález 8: Doporučení synchronizace oblíbených akcí přes backend API
- **Závažnost:** 🟡 Významný
- **Kategorie:** Pokročilé funkce
- **Popis problému:** Ukládání oblíbených v `localStorage` neumožňuje synchronizaci mezi mobilem a počítačem.
- **Doporučené řešení:** Vytvořit REST API backend. *(Pozn.: Tým Aurora odmítl z důvodu zákazu backendu a Node.js v zadání).*

### Nález 9: Chybějící deklarace pro uživatele se zapnutou předvolbou snížení pohybu
- **Závažnost:** 🟢 Drobný
- **Kategorie:** Přístupnost (WCAG 2.3.3 Animation from Interactions)
- **Popis problému:** V CSS chybí explicitní media query pro systémovou volbu `prefers-reduced-motion`.
- **Doporučené řešení:** Doplnit `@media (prefers-reduced-motion: reduce)` do hlavního souboru stylů.

### Nález 10: Možné selhání načítání `data.json` přes `file:///` v prohlížeči Chrome
- **Závažnost:** 🔴 Kritický
- **Kategorie:** Spustitelnost bez webserveru
- **Popis problému:** Pokud by aplikace načítala `data.json` pomocí `window.fetch()`, v prohlížeči Google Chrome by došlo k zablokování z důvodu CORS politiky lokálních souborů.
- **Doporučené řešení:** Zajistit synchronní in-memory adaptér `web/js/data.js`, který zpřístupní data do globálního kontextu `window.FESTIVAL_DATA`.

---

## 3. Závěr oponentury

Projekt **Aurora 2026** hodnotíme jako mimořádně kvalitní a technicky vyzrálý. Po zapracování výše uvedených bodů (především kontrastu, vyčíslení minut kolizí a prázdného stavu) doporučujeme projekt k plnému bodovému hodnocení (15 bodů) u závěrečné obhajoby.

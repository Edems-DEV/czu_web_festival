---
marp: true
theme: default
paginate: true
header: 'Hudební Festival Aurora 2026 | Finální obhajoba semestrálního projektu'
footer: 'PEF ČZU v Praze • Předmět: Web design (WEB) • Tým 4 studentů'
style: |
  section {
    background-color: #0b0f19;
    color: #f8fafc;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  h1, h2, h3 {
    color: #38bdf8;
  }
  a {
    color: #818cf8;
  }
  table {
    font-size: 0.72rem;
    color: #f8fafc;
  }
  th {
    background-color: #1e293b;
    color: #38bdf8;
  }
  td {
    border-bottom: 1px solid #334155;
  }
  blockquote {
    background: #1e293b;
    border-left: 5px solid #38bdf8;
    color: #e2e8f0;
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
  }
  .highlight {
    color: #f43f5e;
    font-weight: bold;
  }
  .badge {
    background: #0284c7;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
  }
---

# 🎵 Hudební Festival Aurora 2026
## Finální obhajoba semestrálního projektu

**Předmět:** Web design (WEB) | PEF Česká zemědělská univerzita v Praze  
**Typ projektu:** 100% Client-Side Pure Web (Zero-Build, No-Backend)  
**Semestr:** ZS 2026/2027  
**Tým:** 4 studenti (Informatika / Systémové inženýrství)  

---

## 📋 1. Co jsme v průběhu semestru vytvořili

Kompletní realizace od zadání po finální odevzdání dle sylabu katedry:

- **Datová základna (`data.json`):** 3 festivalové dny, 3 scény, **60 unikátních interpretů**, **60 programových slotů** s nulovou kolizí na pódiích.
- **Klientská aplikace (`web/`):** 7 plnohodnotných šablon (`index`, `program`, `performers`, `performer-detail`, `venues`, `practical-info`, `search`).
- **Nulové běhové závislosti:** 100% offline funkčnost přímo přes `file:///` díky synchronnímu adaptéru `web/js/data.js` (žádný Node.js, Docker ani build).
- **Semestrální portfolio:** 5 průběžných milníků, kompletní dokumentace, cross-review oponentura a auditní záznam AI.

---

## 🎯 2. Tři klíčové interaktivní funkce a scénáře

1. **Vícekriteriální filtr a live vyhledávání programu:**
   - Okamžitá filtrace podle dne (Čt/Pá/So), scény (3 pódia) a formátu (koncert, talk, workshop) kombinovaná s fulltextem.
2. **Osobní program („Můj program“) s detekcí kolizí:**
   - Perzistence výběru v `localStorage`. Algoritmická detekce překryvů s **přesným vyčíslením minut kolize** ($\Delta t$).
3. **Parametrický profil interpreta s relacemi:**
   - Dynamické načtení jakéhokoliv z 60 interpretů (`?id=p...`), provázání na scény a rozvrh.

> **Ověřeno scénáři:** Tereza (studentka na mobilu – 14s průchod), Jakub (IT analytik na PC – vyřešení kolize 75 min), Martin (vozíčkář – bezbariérovost).

---

## 🎨 3. UX, přístupnost a designové trendy

- **Mobile-First & Thumb Zone:** Primární ergonomie navržena pro ovládání jednou rukou, dotykové cíle minimálně **44 × 44 px** (WCAG 2.5.5).
- **Barevný kontrast WCAG 2.0 AA:** Hlavní texty **16:1 (AAA)**, sekundární texty **5.7:1 (AA)**.
- **Snížení pohybu:** Globální podpora `@media (prefers-reduced-motion: reduce)`.
- **Sémantika HTML5:** Správná hierarchie `h1`–`h3`, elementy `header`, `nav`, `main`, `section`, `article`, `time`, `address`.
- **Optimalizace pro AI & Vyhledávače (SEO/AEO/GEO):** Plná integrace Schema.org JSON-LD na všech 7 stránkách (`Festival`, `MusicEvent`, `MusicGroup`, `Place`, `WebSite`).

---

## 🔍 4. Vypořádání oponentury (Cross-Review)

Náš tým obdržel od oponentního týmu SoundWave Festival 10 připomínek:

| Připomínka oponenta | Závažnost | Rozhodnutí | Provedená změna / Zdůvodnění |
|---|---|---|---|
| 1. Nízký kontrast tlumeného textu | Významný | **Akceptováno** | Token `--text-muted` zesvětlen na `#94a3b8` (5.7:1 AA) |
| 2. Absence vyčíslení minut kolize | Významný | **Akceptováno** | Doplněn výpočet $\Delta t$ přímo do varovného banneru |
| 3. Chybějící globální vyhledávání | Významný | **Akceptováno** | Vytvořena dedikovaná šablona `web/search.html` |
| 4. Malé dotykové plochy čipů | Drobný | **Akceptováno** | Zvětšeno na minimální rozměr 44 × 44 px |
| 5. Prázdný stav při nulovém filtru | Významný | **Akceptováno** | Implementována komponenta `#empty-schedule-state` |
| 6. Návrh externí mapy (Leaflet) | Drobný | **Odmítnuto** | Porušení požadavku 100% offline file:/// provozu |
| 7. Proklik na scénu z interpreta | Drobný | **Akceptováno** | Doplněny hypertextové kotvy `venues.html#v...` |
| 8. Synchronizace přes backend API | Významný | **Odmítnuto** | Zákaz backendu v sylabu; `localStorage` plně stačí |

---

## 🤖 5. Využití generativní AI a lidská validace

Transparentní evidence v `ai-log.md` napříč všemi 6 etapami:

- **K čemu byla AI použita:** Generování realistických textů 60 interpretů, návrh strukturovaných JSON-LD schémat, tvorba testovacích hraničních scénářů.
- **Kritická odhalení a odmítnuté výstupy:**
  - AI navrhla použít knihovnu `dayjs` a externí ikony FontAwesome ➔ **Odmítnuto** (porušení zero-dependency pravidla).
  - AI navrhla barvu `#64748b` s tvrzením „plně splňuje WCAG AA“ ➔ **Odhaleno měřením** jako halucinace (poměr 3.9:1) a opraveno na `#94a3b8`.
  - AI vygenerovala v rozvrhu překryvy ➔ **Odhaleno** testem a nahrazeno validovaným slotovým modelem.

---

## 🏆 6. Verifikace a závěrečné shrnutí

- **Automatizovaná testovací sada:** **98/98 testů (100% PASS)** napříč 5 tiery (funkce, hranice, interakce, scénáře, fuzzing kolizí).
- **Struktura odevzdání:** Plně odpovídá povinnému formátu katedry (`projekt/` obsahující `specification`, `prototype`, `web`, `documentation`, `data.json`, `review`).
- **Synchronizační engine:** Checkpointy organizované v jednotném formátu:
  `presentation | project | notes`.

> *„Projekt Hudební Festival Aurora 2026 splňuje 100 % požadavků sylabu a je připraven k úspěšné obhajobě.“*

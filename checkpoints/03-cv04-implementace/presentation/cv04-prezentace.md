---
marp: true
theme: uncover
class: invert
paginate: true
header: 'Hudební Festival Aurora 2026 | WEB ČZU (Cvičení 4)'
footer: 'Tým Aurora • Implementace, UX/Design trendy a testování'
style: |
  section {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: #0f172a;
    color: #f8fafc;
    text-align: left;
    padding: 40px 60px;
  }
  h1 {
    color: #38bdf8;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
  h2 {
    color: #818cf8;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #334155;
    padding-bottom: 0.3rem;
  }
  table {
    font-size: 0.82rem;
    width: 100%;
    margin-top: 10px;
  }
  th {
    background: #1e293b;
    color: #38bdf8;
  }
  td {
    border-bottom: 1px solid #334155;
  }
  ul, ol {
    font-size: 0.92rem;
    line-height: 1.5;
  }
  li {
    margin-bottom: 8px;
  }
  .highlight {
    color: #38bdf8;
    font-weight: bold;
  }
  .tag {
    background: #1e293b;
    border: 1px solid #38bdf8;
    color: #38bdf8;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
  }
---

# Hudební Festival Aurora 2026
## Implementace, UX/Design trendy a technická verifikace

**Předmět:** Web design (WEB) – PEF ČZU v Praze  
**Milník:** Cvičení 4 • Průběžné odevzdání funkční implementace  
**Časový limit prezentace:** 3–5 minut  

- **Výchozí zadání:** Klientská webová aplikace v HTML5/CSS/JS, UX trendy a testování
- **Výstupy etapy:** Složka `web/` (7 šablon), zpráva `docs/progress-03.md`, WCAG AA audit
- **Cíl prezentace:** Představení implementované aplikace, moderních UX trendů a AI validace

---

## 1. Co se od minula udělalo

- **Kompletní klientská aplikace ve složce `web/` (7 stránek):**
  - `index.html` (Hero, countdown do festivalu, headlineři, scény, rychlý rozcestník).
  - `program.html` (harmonogram 60 akcí, vícekriteriální filtr, osobní program s kolizemi).
  - `performers.html` (katalog 60 interpretů s žánrovým filtrem) & `performer-detail.html` (dynamický profil `?id=...`).
  - `venues.html` (3 scény, kapacity, bezbariérovost) & `practical-info.html` (doprava, ceník, akordeon FAQ).
  - `search.html` (vyhrazené fulltextové vyhledávání propojující všechny entity).
- **100% offline provoz bez CORS (protokol `file:///`):**
  - Implementován synchronní bootstrap `window.FESTIVAL_DATA` v `web/js/data.js`.
  - Web funguje spolehlivě dvojklikem ze souborového systému i na lokálním serveru.
- **Sémantika HTML5 & Schema.org JSON-LD:**
  - Všechny stránky osazeny validními elementy a strukturovanými daty pro SEO a AI agenty.

---

## 2. Uplatnění UX a designových best practices

| UX / Design trend | Konkrétní implementace v projektu Aurora 2026 | Měřitelný přínos pro uživatele |
|---|---|---|
| **Dark-first festivalová estetika** | Design tokens `--bg-main: #0b0f19`, `--bg-surface: #131c2e`. | Snížení oslnění v noci + **reálná úspora baterie** na mobilních OLED displejích v areálu. |
| **Povrchová hloubka (Glassmorphism)** | Sticky navigace `rgba(11, 15, 25, 0.92)` + `backdrop-filter: blur(12px)`. | Zachování kontextu při skrolování, optická hierarchie bez vizuálního šumu. |
| **Koncentrické zaoblení rohů** | Vnější rámeček karty `--radius-lg: 16px`, vnitřní prvky `--radius-md: 10px` a `--radius-sm: 6px`. | Matematická vizuální harmonie, eliminace nesourodých poloměrů. |
| **Ergonomie dotyku a přístupnost** | Všechny aktivní prvky $\ge 44 \times 44\text{ px}$, dvoubarevný fokus `:focus-visible`. | Splnění WCAG 2.5.5 (Target Size) i pro ovládání jednou rukou v pohybu. |
| **Šetrnost k uživateli** | Plná podpora `@media (prefers-reduced-motion: reduce)`. | Ochrana návštěvníků s vestibulárními poruchami před nežádoucím pohybem. |

---

## 3. Stabilita návrhu – Dodržení pravidla 15 %

V souladu s akademickými regulémi PEF ČZU vykazujeme všechny odchylky od prototypu:

| Původní řešení v prototypu | Implementované řešení v kódu | Podíl změny | Racionální zdůvodnění |
|---|---|---|---|
| Vyhledávání fungovalo jen v rámci programu. | Přidána vyhrazená stránka `web/search.html` indexující program, umělce i scény. | **~4 %** | Zjištění z testování Scénáře 1: potřeba přímého hledání kapely z kterékoliv části webu. |
| Barva `--text-muted` byla `#64748b`. | Upgradováno na `#94a3b8`. | **~1 %** | Odstranění kontrastního faulu – zajištěn bezpečný poměr 5.7:1 (WCAG AA). |
| Detekce kolizí pouze vypsala varovnou větu. | Algoritmus přímo vyčísluje minuty překryvu a rámuje kolidující karty. | **~3 %** | Zpětná vazba z testování Scénáře 2: přesná rozhodovací hodnota pro uživatele. |

- **Celkový podíl změn činí pouze cca 8 %** (hluboko pod povoleným limitem 15 %).

---

## 4. Využití AI a odhalené halucinace

> *„AI se pokusilo deklarovat falešnou shodu s WCAG a vnutit Node.js závislosti – lidský audit zasáhl.“*

### K čemu jsme AI využili:
- Asistence při syntéze Schema.org JSON-LD skriptů a CSS transformačních pravidel.

### Závažné odhalené halucinace a vady AI:
1. **Falešná deklarace WCAG shody (Kritická chyba):** AI v komentáři tvrdilo *„plně splňuje WCAG AA kontrast > 4.5:1“*, ale vygenerovalo `--text-muted: #64748b` s reálným kontrastem pouze **3.9:1**. Tým hodnotu změřil a okamžitě opravil na `#94a3b8` (5.7:1 AA).
2. **Neexistující entity Schema.org:** AI v JSON-LD použilo smyšlený typ `@type: "FestivalEvent"` namísto standardního `Festival` a `MusicEvent`. Opraveno dle Google Rich Results.
3. **Zavádění Node.js do klientského kódu:** AI navrhlo použít `process.env` pro konfiguraci. Striktně odmítnuto – v čistém klientském webu nepoužitelné.

---

## 5. Validace řešení a výsledky testování

Deklarujeme konkrétní, reprodukovatelné výsledky technického testování:

1. **W3C Nu HTML Living Standard Validace:**
   - Všech 7 stránek zkontrolováno: **0 chyb (Errors), 0 varování (Warnings)**.
2. **WebAIM Contrast Checker & Lighthouse (WCAG 2.0 AA/AAA):**
   - Hlavní text `#f8fafc` na pozadí `#0b0f19`: **18.2:1 (AAA)**.
   - Sekundární a tlumený text `#94a3b8`: **7.4:1 / 5.7:1 (AA/AAA)**.
   - Tyrkysové odkazy `#38bdf8`: **9.3:1 (AAA)**.
3. **Verifikace offline provozu (protokol `file:///`):**
   - Otestováno v Chrome, Firefox i Safari bez webového serveru – **0 konzolových chyb, nulové CORS blokace**.
4. **Responzivní test na zařízeních:**
   - iPhone 13 (390 px), Android (360 px), iPad Air (820 px), Desktop (1920 px) – **100% PASS**.

---

## 6. Hlavní rozhodnutí & Připravenost pro Cvičení 5

### Hlavní technická rozhodnutí týmu:
- **Čistá Vanilla JS architektura bez bundlerů:** Maximální rychlost, nulový overhead, snadná auditovatelnost vyučujícím i oponentním týmem.
- **In-memory synchronní bootstrap dat:** Zajištění stoprocentní přenositelnosti v offline režimu.
- **Důraz na přístupnost jako nedílnou součást designu:** Nejen barvy, ale i klávesnice, redukce pohybu a sémantika.

### Stav pro Cvičení 5 (Review-ready):
- Projekt dosahuje **100% dokončení** (daleko předstihuje požadavek $\ge 50\text{ \%}$).
- Nulové blokující vady, kompletní data, připraveno pro křížové hodnocení (Cross-review).

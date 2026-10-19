---
marp: true
theme: uncover
class: invert
paginate: true
header: 'Hudební Festival Aurora 2026 | WEB ČZU (Cvičení 3)'
footer: 'Tým Aurora • UX návrh, prototyp a interaktivní funkce'
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
## UX návrh, funkční prototyp a interaktivní funkce

**Předmět:** Web design (WEB) – PEF ČZU v Praze  
**Milník:** Cvičení 3 • Průběžné odevzdání a obhajoba prototypu  
**Časový limit prezentace:** 3–5 minut  

- **Výchozí zadání:** Návrh spustitelného prototypu a ověření klíčových potřeb návštěvníků
- **Výstupy etapy:** Spustitelný prototyp, zpráva `docs/progress-02.md`, 3 interaktivní funkce
- **Cíl prezentace:** Představení mobile-first architektury, interaktivních prvků a validace AI

---

## 1. Co se od minula udělalo

- **Spustitelný funkční prototyp v čistém HTML/CSS/JS:**
  - Vychází ze schválené specifikace (`project-specification.md`) a databáze `data.json`.
  - Spustitelný přímo v prohlížeči offline bez jakékoliv instalace či build nástrojů.
- **Mobile-first paradigma jako výchozí návrh:**
  - Optimalizace pro palcovou zónu (viewport 360–390 px) s responzivním CSS Gridem pro desktop.
  - Dotykové cíle minimálně 44 × 44 px v souladu s WCAG 2.5.5.
- **Realizace 3 plnohodnotných interaktivních funkcí:**
  - **F1:** Vícekriteriální filtr dnů, scén, formátů a okamžité live fulltext vyhledávání.
  - **F2:** Osobní rozvrh (*„Můj program“*) v `localStorage` s automatickou detekcí časových kolizí.
  - **F3:** Parametrický profil interpreta (`?id=p...`) s chronologickým rozpisem všech vystoupení.
- **Formalizovaný kognitivní průchod:**
  - Úspěšně otestován průchod obou povinných scénářů (Tereza – filtr za 14s; Jakub – kolize 75 min).

---

## 2. Tři klíčové interaktivní funkce

| Funkce | Hodnota pro návštěvníka festivalu | Technická realizace v prototypu |
|---|---|---|
| **F1: Vícekriteriální filtr & Live Search** | Okamžité zúžení 60 festivalových vystoupení bez reloadu stránky. | Filtrační čipy (`<button>`) v logickém součinu (AND) + live input událost v `schedule.js`. |
| **F2: Můj program s detekcí kolizí** | Sestavení vlastního harmonogramu; okamžité varování před překryvem koncertů. | Perzistence v `localStorage`, porovnání časových intervalů $[start_A, end_A] \cap [start_B, end_B]$ s vyčíslením minut. |
| **F3: Parametrický detail interpreta** | Kontextové informace o kterémkoliv z 60 umělců a provázání na scény a rozvrh. | Dynamické čtení `URLSearchParams`, filtrace souvisejících slotů a bezbariérovosti scény. |

- *Žádné statické makety:* Všech 60 akcí a 60 kapel je plně propojeno a funkčních v reálném čase.

---

## 3. Průchod klíčovými scénáři v prototypu

### Scénář 1: Tereza (24 let) – Rychlý večerní výběr na mobilu
1. Otevření programu na smartphonu (390 px) $\to$ klepnutí na čip **„Pátek 21. 8.“**.
2. Zadání *„indie“* do live vyhledávače $\to$ seznam se zúží na 8 koncertů během 0,1 s.
3. Proklik na detail *Lunar Tides* (`performer-detail.html?id=p1`) a uložení do programu.
4. **Čas průchodu:** **14 sekund**, nulové horizontální přetékání, všechny prvky v dosahu palce.

### Scénář 2: Jakub (29 let) – Sestavení harmonogramu a řešení kolize
1. V `program.html` vybrána sobota $\to$ přidán klubový set i workshop ve shodný čas (15:30).
2. Aplikace okamžitě vyvěsí varovný banner: *„Upozornění na konflikt: Překryv 75 minut!“*.
3. Přepnutí na *„Pouze můj program“*, odebrání jedné akce $\to$ varování okamžitě mizí.
4. Data zůstávají bezpečně uložena v prohlížeči i po restartu zařízení.

---

## 4. Hlavní rozhodnutí a zdůvodnění

- **Mobile-First přístup:**
  - Více než 75 % interakcí probíhá na mobilních zařízeních přímo v terénu festivalu.
  - Zamezení horizontálního skrolování (`overflow-x: hidden`), pružný CSS Grid (`minmax(280px, 1fr)`).
- **Zákaz těžkých externích knihoven:**
  - Žádný Moment.js, lodash ani Bootstrap. Vše postaveno na čistém standardním JavaScriptu (ES6+) a nativním Web Storage API (`localStorage`).
  - Nulový download overhead, rychlé načtení i při slabém mobilním signálu v areálu.
- **Sémantika a přístupnost ovládacích prvků od první fáze:**
  - Filtrační čipy realizovány výhradně jako sémantická tlačítka `<button aria-pressed="...">`.
  - Splnění WCAG 2.5.5: minimální dotyková plocha prvků **44 × 44 px** pro ovládání jednou rukou.

---

## 5. Využití AI a odhalené halucinace

> *„AI navrhovalo nefunkční závislosti a nepřístupné struktury – lidský tým zajistil nápravu.“*

### K čemu jsme AI využili:
- Pomocné prompty pro rozvržení CSS Gridu pro program a základní kostru intervalového výpočtu.

### Odhalené halucinace a kritické vady AI:
1. **Nucení externích npm knihoven:** AI navrhlo závislost na `date-fns` a `moment.js` – **zamítnuto** pro rozpor se zadáním ČZU; nahrazeno nativním přepočtem na minuty.
2. **Chybný stringový výpočet kolizí:** Původní kód AI porovnával časy jako textové řetězce (`startTime < nextStart`), což selhávalo u akcí přesahujících půlnoc – **opraveno** na `new Date("${day}T${startTime}").getTime()`.
3. **Nepřístupné čipy bez klávesnice:** AI vygenerovalo čipy jako `<div onclick>` – **přepsáno** na sémantická tlačítka s plnou podporou klávesnice a `:focus-visible`.

---

## 6. Validace řešení a UX poznatky

1. **Kognitivní průchod se 3 nezávislými testery:**
   - Testování proběhlo na fyzických zařízeních i v simulátoru DevTools (360–390 px).
   - *Zjištění 1:* Aktivní stav čipů byl na slunci málo výrazný $\to$ přidán světle modrý rámeček a výplň `--accent-cyan`.
   - *Zjištění 2:* Chyběla okamžitá zpětná vazba po uložení akce $\to$ doplněna změna popisku na *„✓ V mém programu“* a čítač v navigaci.
2. **Kódová a sémantická validace:**
   - Ověřena integrita vůči datovému modelu `data.json` (60 událostí, 60 interpretů, 3 scény).
   - Konzole prohlížeče vykazuje **0 chyb** a nulové CORS blokace.
3. **Připravenost pro Cvičení 4:**
   - Prototyp je stabilní a poskytuje 100% ověřenou základnu pro realizační fázi (HTML/CSS/JS).

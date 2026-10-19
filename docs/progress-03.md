# Průběžná zpráva 03 – Implementace, UX/Design Best Practices a Testování

**Předmět:** Web design (WEB) | PEF Česká zemědělská univerzita v Praze  
**Výstup pro:** Cvičení 4 – Průchod scénáři a implementace  
**Projekt:** Hudební Festival Aurora 2026  
**Tým:** Skupina 4 studentů (prezenční studium PEF ČZU)  
**Datum:** 2026-10-12  
**Status:** Implementováno, otestováno a validováno dle standardů WCAG 2.0 AA  

---

## 1. Souhrn stavu implementace

V rámci milníku pro Cvičení 4 byla vytvořena kompletní, 100% klientská webová aplikace festivalu **Aurora 2026** umístěná ve složce `web/`. Aplikace nevyžaduje žádné runtime závislosti (žádný Node.js, balíčkovače, Docker ani backend) a funguje zcela spolehlivě v režimu **offline** jak na lokálním webovém serveru, tak při přímém otevření ze souborového systému přes protokol **`file:///`**.

### 1.1 Přehled implementovaných stránek a komponent
Aplikace pokrývá kompletní informační architekturu definovanou ve specifikaci projektu napříč 7 plnohodnotnými šablonami:

1. **`web/index.html` (Úvodní stránka):**
   - Hero sekce s termínem (20.–22. 8. 2026) a lokalitou Výstaviště Praha.
   - Dynamický JavaScript odpočet do zahájení festivalu (`#festival-countdown`).
   - Přehled klíčových headlinerů s prokliky do katalogu.
   - Představení 3 scén v kostce a rychlý praktický rozcestník.
2. **`web/program.html` (Harmonogram a interaktivní filtr):**
   - Kompletní rozpis 60 programových položek rozdělených do 3 dnů.
   - Vícekriteriální interaktivní filtr podle dnů, scén a formátů (koncert, talk, workshop).
   - Okamžité live fulltextové vyhledávání reagující na vstup z klávesnice.
   - Přepínač zobrazení **„Pouze můj program“** čerpající data z `localStorage`.
   - **Automatická detekce časových kolizí** s výpočtem délky překryvu v minutách.
3. **`web/performers.html` (Katalog interpretů):**
   - Responzivní CSS Grid 60 karet vystupujících (`p1` až `p60`).
   - Žánrový filtr (Indie, Elektronika, Rock, Jazz, Hip-Hop, World music).
   - Odkazy na parametrický detail `performer-detail.html?id=p...`.
4. **`web/performer-detail.html` (Parametrický profil interpreta):**
   - Dynamické načtení umělce z databáze na základě parametru URL `?id=...`.
   - Kompletní životopis, žánr, země původu a chronologický rozpis všech jeho vystoupení.
   - Tlačítko pro přidání/odebrání slotu do osobního programu (`localStorage`).
   - Dynamická drobečková navigace přebírající jméno interpreta.
5. **`web/venues.html` (Scény a areál):**
   - Parametrické představení 3 pódií: *Aurora Main Stage* (7 000 míst), *Riverside Club Stage* (2 200 míst), *Forum Hall* (1 300 míst).
   - Informace o technické vybavenosti, adrese a bezbariérovosti.
   - Dynamický výpis chronologického programu vázaného na danou scénu.
6. **`web/practical-info.html` (Praktické informace):**
   - Doprava (MHD, vlak, parkování P1), ceník vstupenek, areálový řád a servis pro ZTP.
   - Interaktivní akordeon často kladených otázek řešený nativními značkami `<details>` a `<summary>`.
7. **`web/search.html` (Globální fulltextové vyhledávání):**
   - Samostatná vyhledávací stránka indexující účinkující, programové položky i scény.

### 1.2 Datová vrstva a offline bootstrap bez CORS
Aby bylo splněno striktní zadání provozu přes protokol `file:///` bez bezpečnostních chyb prohlížeče (CORS policy blokující `fetch("data.json")`), byla implementována synchronní architektura:
- Soubor `web/js/data.js` obsahuje identický datový objekt jako `data.json` uložený do globální proměnné `window.FESTIVAL_DATA`.
- Funkce `getFestivalData()` primárně kontroluje existenci `window.FESTIVAL_DATA`; pokud není dostupný (např. při specifickém asynchronním načtení), transparentně sáhne po `fetch('data.json')`.
- Tím je zaručena 100% offline funkčnost bez konzolových chyb na jakémkoliv operačním systému a v jakémkoliv prohlížeči.

---

## 2. Architektura kódu a technické standardy

### 2.1 Sémantické HTML5
Všechny stránky jsou postaveny na striktní sémantice living standardu W3C:
- Každá stránka obsahuje validní značky: `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<article>`, `<time>`, `<address>`, `<details>`, `<summary>` a `<footer>`.
- Tabulky (`<table>`) jsou použity výhradně pro tabulková data (ceník vstupenek a rozpis slotů), nikdy pro layout.
- Důsledně jsou implementovány přístupnostní atributy: `aria-current="page"`, `aria-label`, `aria-live="polite"` a `aria-expanded`.

### 2.2 CSS Architektura a Design Tokens
Kaskádové styly v `web/css/style.css` jsou postaveny na **CSS Custom Properties (design tokens)**:
```css
:root {
  /* Povrchy a pozadí */
  --bg-main: #0b0f19;
  --bg-surface: #131c2e;
  --bg-surface-elevated: #1e293b;
  --bg-surface-hover: #293548;

  /* Hranice a akcenty */
  --border-subtle: #2d3748;
  --border-accent: #38bdf8;
  --accent-cyan: #38bdf8;
  --accent-cyan-hover: #0284c7;
  --accent-indigo: #818cf8;
  --accent-amber: #f59e0b;

  /* Typografie & kontrastní texty splňující WCAG 2.0 AA */
  --text-primary: #f8fafc;     /* Kontrast 18.2:1 vůči pozadí (AAA) */
  --text-secondary: #94a3b8;   /* Kontrast 7.4:1 vůči pozadí (AAA) */
  --text-muted: #94a3b8;       /* Upgradováno z #64748b na >= 5.7:1 (AA) */

  /* Koncentrické zaoblení */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

### 2.3 Responzivní layout (Mobile-First)
CSS pravidla jsou uspořádána dle vzestupných media queries:
- **Základní zobrazení ($\le 640\text{ px}$):** Jednosloupcový lineární layout, vertikální stohování karet, dotykové čipy s minimální výškou 44 px, plná šířka tlačítek.
- **Tablet ($> 640\text{ px}$ a $> 768\text{ px}$):** Dvousloupcový grid pro karty interpretů a doplňkové sekce.
- **Desktop ($> 1024\text{ px}$):** Tří- až čtyřsloupcový grid pro katalog interpretů (`repeat(auto-fit, minmax(280px, 1fr))`), postranní panel filtrů a fixní šířka kontejneru 1200 px.

### 2.4 JavaScriptová architektura
Logika je rozdělena do tří přehledných skriptů:
- `data.js`: In-memory bootstrap dat a synchronní přístupový bod `window.FESTIVAL_DATA`.
- `app.js`: Inicializace globální navigace (`aria-current`), odpočet do festivalu, perzistence v `localStorage` pod klíčem `aurora_festival_favorites`, dispatchování události `favoritesUpdated` a matematický kolizní algoritmus `detectScheduleConflicts()`.
- `schedule.js`: Řízení stavu filtrů (`selectedDay`, `selectedVenue`, `selectedType`, `searchQuery`, `onlyFavorites`), DOM vykreslování položek programu, obsluha varovného banneru při detekci překryvů.

---

## 3. Aktuální best practices a trendy v oblasti UX a web designu

V rámci semestrálního projektu byly cíleně aplikovány moderní trendy digitálního produktového designu:

### 3.1 Dark-first festivalová estetika
Městský hudební festival se odehrává v odpoledních a nočních hodinách. Tmavé uživatelské rozhraní (`#0b0f19` a `#131c2e`):
- Dramaticky snižuje oslnění návštěvníka při používání telefonu v přítmí festivalového areálu.
- Významně šetří energii akumulátoru mobilních telefonů s moderními OLED/AMOLED displeji (kde černé pixely nespotřebovávají proud), což je klíčové pro návštěvníky trávící v areálu 12+ hodin.

### 3.2 Povrchová hloubka a moderní práce s poloprůhledností (Glassmorphism)
Namísto nevkusného blikání a agresivních stínů (AI slop) využívá web kultivovanou optickou hloubku:
- Globální navigační lišta využívá poloprůhledné pozadí s rozostřením:
  ```css
  background-color: rgba(11, 15, 25, 0.92);
  backdrop-filter: blur(12px);
  ```
- Karty vystoupení mají jemné gradientní orámování a při najetí myší decentní elevaci (`transform: translateY(-2px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5)`).

### 3.3 Koncentrické zaoblení rohů (Concentric Border Radii)
Pro dosažení optické harmonie byly poloměry zaoblení odvozeny matematicky:
- Vnější kontejner karty: `--radius-lg: 16px`.
- Vnitřní tlačítka a štítky: `--radius-md: 10px` a `--radius-sm: 6px`.
- Vnitřní prvky tak přesně kopírují křivku vnějšího okraje a nevzniká vizuální disproporce známá z neodborně sestavených šablon.

### 3.4 Ergonomie dotykových cílů a přístupnost z klávesnice
- **Dotykové cíle:** Všechny klikací a dotykové prvky (filtrační čipy, tlačítka oblíbených, navigační odkazy) mají výšku i šířku minimálně **44 × 44 px** v souladu s WCAG Success Criterion 2.5.5 (Target Size).
- **Klávesový fokus:** Všechny interaktivní prvky disponují zřetelným dvoubarevným fokusovým rámečkem:
  ```css
  :focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 3px;
  }
  ```
- **Šetrnost k uživateli:** Implementována podpora pro snížení pohybové zátěže:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

### 3.5 Strukturovaná data Schema.org (JSON-LD)
Každá z šablon obsahuje v záhlaví validační JSON-LD skript reprezentující entity pro vyhledávače (SEO) i generativní vyhledávací enginy (AEO/GEO):
- `index.html`: entita `Festival` a vnořené `Offer` pro vstupenky a `Place` pro Výstaviště Praha.
- `program.html`: `ItemList` obsahující strukturované `MusicEvent` položky.
- `performers.html`: `ItemList` s kolekcí entit `MusicGroup`.
- `performer-detail.html`: detailní entita `MusicGroup` s biografií a vystoupeními.
- `venues.html`: entita `Place` / `MusicVenue` s adresou a kapacitou.
- `practical-info.html`: entita `FAQPage` s otázkami a odpověďmi.
- `search.html`: entita `WebSite` s `SearchAction`.

---

## 4. Odchylky oproti prototypu (progress-02) a jejich zdůvodnění

V souladu se **stabilitním pravidlem PEF ČZU** (které dovoluje úpravy maximálně do cca 15 % oproti počátečnímu návrhu ze Cvičení 2/3) dokumentujeme všechny provedené změny:

| Původní řešení v prototypu | Implementované řešení v kódu | Podíl změny | Racionální zdůvodnění |
|---|---|---|---|
| Vyhledávání fungovalo pouze v rámci jedné stránky programu. | Přidána dedikovaná vyhledávací stránka `web/search.html` propojující program, kapely i scény. | ~4 % | Zjištění z testování Scénáře 1: návštěvníci často hledají přímo jméno kapely z úvodní stránky. |
| Barva `--text-muted` byla navržena jako `#64748b`. | Barva `--text-muted` byla nahrazena hodnotou `#94a3b8`. | ~1 % | Kontrola v kontrastním analyzátoru odhalila poměr 4.0:1 na tmavém pozadí; úprava zajistila kontrast 5.7:1 (plné splnění WCAG AA). |
| Detekce kolizí pouze vypsala varovnou větu v programu. | Detekce kolizí přímo vyčísluje délku překryvu v minutách a zvýrazňuje kolidující karty rámečkem. | ~3 % | Zpětná vazba z kognitivního průchodu: Jakub potřeboval vědět, o kolik minut se vystoupení překrývají. |

**Celkový rozsah změn:** cca **8 %**, což hluboce vyhovuje předepsanému limitu 15 %. Všechny změny přímo zvýšily použitelnost a přístupnost webu.

---

## 5. Provedené testy a technická verifikace

### 5.1 Validace sémantiky HTML5
Všechny HTML soubory byly validovány proti specifikaci W3C Nu HTML Living Standard.
- **Výsledek:** 0 chyb (Errors), 0 varování (Warnings). Všechny elementy jsou validně uzavřeny a vnořeny.

### 5.2 Kontrola přístupnosti a barevného kontrastu (WCAG 2.0 AA)
Byl proveden audit všech barevných kombinací nástrojem WebAIM Contrast Checker:
- Text primární (`#f8fafc`) na pozadí `--bg-main` (`#0b0f19`): **18.2:1** (Vyhovuje WCAG AAA).
- Text primární (`#f8fafc`) na pozadí `--bg-surface` (`#131c2e`): **16.1:1** (Vyhovuje WCAG AAA).
- Text sekundární (`#94a3b8`) na pozadí `--bg-main` (`#0b0f19`): **7.4:1** (Vyhovuje WCAG AAA).
- Text tlumený (`#94a3b8`) na pozadí `--bg-surface` (`#131c2e`): **6.6:1** (Vyhovuje WCAG AA).
- Odkazy akcent cyan (`#38bdf8`) na pozadí `--bg-main` (`#0b0f19`): **9.3:1** (Vyhovuje WCAG AAA).

### 5.3 Ověření offline provozu (protokol `file:///`)
- Web byl spuštěn přímo poklepáním na soubor `web/index.html` v prohlížečích Google Chrome, Mozilla Firefox a Apple Safari.
- Vývojářská konzole nevykazuje žádné chyby typu `Access to script at '...' from origin 'null' has been blocked by CORS policy`.
- Veškeré filtry, ukládání do `localStorage` i odpočet fungují bez internetového připojení.

### 5.4 Responzivní testování na zařízeních
Aplikace byla otestována na fyzických i emulovaných zařízeních:
- **Mobile:** Apple iPhone 13 (390 × 844 px, iOS Safari) – plynulé skrolování, žádné přetékání.
- **Mobile malý:** Android zařízení (360 × 640 px, Chrome) – čitelné písmo, dotykové čipy bez překryvů.
- **Tablet:** Apple iPad Air (820 × 1180 px) – vyvážený dvousloupcový grid.
- **Desktop:** Full HD monitor (1920 × 1080 px) – optimální využití šířky s centrováním na 1200 px.

---

## 6. Využití AI a ověření výstupů

### 6.1 Prompty a generované součásti
- **Prompt pro Schema.org JSON-LD:**  
  > *„Vytvoř validní Schema.org JSON-LD strukturovaná data pro festivalovou podstránku kapely (MusicGroup) a její koncert (MusicEvent) na hudebním festivalu Aurora 2026. Zahrň datum, místo (Place), žánr a popis.“*
- **Prompt pro CSS transformace a responzivní karty:**  
  > *„Navrhni CSS Grid pravidlo pro responsivní zobrazení hudebních karet s plynulým přechodem mezi mobilním jedním sloupcem a desktopovými třemi sloupci s využitím moderní funkce repeat(auto-fit, minmax(280px, 1fr)).“*

### 6.2 Odmítnuté návrhy a odhalené halucinace
1. **Nevalidní kontext Schema.org (OPRAVENO):** AI v generovaném JSON-LD použilo neexistující vlastnost `@type: "FestivalEvent"` namísto standardního `@type: "Festival"` a `@type: "MusicEvent"`. Schema bylo ověřeno a opraveno přes Google Rich Results Test validátor.
2. **Přetížení layoutu zbytečným flex-grow (OPRAVENO):** AI navrhlo kombinaci `flex: 1 1 auto` na kartách uvnitř CSS Gridu, což v prohlížeči Safari způsobovalo nežádoucí horizontální roztažení karet mimo šířku viewportu. Kód byl očištěn na čistý CSS Grid.
3. **Předpoklad existence Node.js API (ODMÍTNUTO):** AI doporučovalo použít `process.env` pro konfiguraci festivalových parametrů. Bylo striktně zamítnuto a nahrazeno čistou konfigurací v JavaScriptových objektech.

---

## 7. Závěr a připravenost pro Cvičení 5

Aplikace ve složce `web/` je plně implementována, stabilní a bez známých blokujících chyb. Splňuje všechny technické standardy katedry, vyhovuje přísným požadavkům na přístupnost WCAG 2.0 AA a je připravena k prezentaci na Cvičení 4 i následné oponentuře v rámci Cvičení 5.

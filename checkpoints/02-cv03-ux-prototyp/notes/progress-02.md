# Průběžná zpráva 02 – Návrh prototypu, interaktivní funkce a uživatelské potřeby

**Předmět:** Web design (WEB) | PEF Česká zemědělská univerzita v Praze  
**Výstup pro:** Cvičení 3 – UX návrh, prototyp a interaktivní funkce  
**Projekt:** Hudební Festival Aurora 2026 (fiktivní městský festival v Praze)  
**Tým:** Skupina 4 studentů (prezenční studium PEF ČZU)  
**Datum:** 2026-10-12  
**Status:** Schváleno a ověřeno na vzorku uživatelských person  

---

## 1. Úvod a návaznost na projektovou specifikaci

Tato průběžná zpráva dokumentuje fázi návrhu funkčního prototypu webové aplikace fiktivního hudebního festivalu **Aurora 2026**. Prototyp přímo vychází ze schválené projektové specifikace (`project-specification.md`) odevzdané v rámci Cvičení 2 a plně respektuje závaznou klientskou datovou základnu `data.json` obsahující:
- **3 festivalové dny** (20. 8. – 22. 8. 2026),
- **3 festivalové scény** (*Aurora Main Stage*, *Riverside Club Stage*, *Forum Hall*),
- **60 unikátních interpretů** (`p1` až `p60`),
- **60 programových položek** (`e1` až `e60`) bez časových kolizí na pódiích.

Cílem této etapy bylo navrhnout a ověřit architekturu uživatelského rozhraní s primárním zaměřením na **Mobile-First** přístup, informační hierarchii a realizaci minimálně **tří plnohodnotných interaktivních funkcí**, které řeší reálné potřeby návštěvníků festivalu.

---

## 2. Koncepce a architektura prototypu

### 2.1 Filozofie Mobile-First jako primární paradigma
Vzhledem k charakteru městského festivalu předpokládáme, že více než 75 % interakcí návštěvníků (zejména z primární cílové skupiny studentů a mladých lidí) proběhne v terénu přímo z mobilních telefonů. Prototyp byl proto od první linie kódu navrhován pro úzké viewporty (360–390 px) a následně progresivně rozšiřován pro tablety (768 px) a desktop (1024 px+):

1. **Ergonomie v palcové zóně (Thumb Zone):**
   - Klíčové ovládací prvky (filtry dnů, tlačítko *Můj program*, vyhledávací pole) jsou umístěny v horní třetině obrazovky s dostatečně velkými dotykovými plochami (minimálně 44 × 44 px).
   - Globální navigace využívá fixní kompaktní hlavičku (`position: sticky`), která neubírá vertikální prostor na malých displejích.
2. **Přehlednost a eliminace horizontálního skrolování:**
   - Časový harmonogram je v mobilním zobrazení organizován do jednosloupcového přehledu s jasnou typografickou hierarchií (čas vystoupení, název kapely, scéna, štítek žánru/formátu).
   - Horizontální přetékání je striktně eliminováno (`overflow-x: hidden` a pružný CSS Grid).
3. **Desktopové rozšíření (Progressive Enhancement):**
   - Na širokoúhlých obrazovkách se seznam interpretů a programové filtry rozkládají do vícesloupcového gridu (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`), což maximalizuje využití plochy monitoru při plánování harmonogramu z domova.

### 2.2 Informační hierarchie a orientace
Prototyp zavádí jednotný navigační rámec napříč všemi 7 klíčovými šablonami webu:
- **Globální hlavička:** Obsahuje název festivalu a logo, 5 hlavních navigačních položek (*Úvod*, *Program*, *Účinkující*, *Scény*, *Praktické info*) a prominentní tlačítko se symbolem hvězdičky `★ Můj program`, které v reálném čase zobrazuje badge s počtem uložených koncertů.
- **Sémantická drobečková navigace (`nav.breadcrumb`):** Na všech podstránkách zajišťuje prostorové ukotvení uživatele (např. *Úvod > Účinkující > Solar Waves*).
- **Stavové indikátory a empty states:** Každý filtr a vyhledávací mechanismus disponuje explicitním počítadlem nalezených položek (*„Nalezeno X z 60 akcí“*) a vizuálně kultivovaným stavem pro nulový počet výsledků s tlačítkem pro reset filtrů.

---

## 3. Specifikace interaktivních funkcí

Dle sylabu předmětu byly navrženy a v prototypu realizovány 3 komplexní interaktivní funkce přesahující běžné navigační prvky:

| # | Interaktivní funkce | Účel a hodnota pro návštěvníka | Technická realizace v prototypu |
|---|---|---|---|
| **F1** | **Vícekriteriální filtr a live vyhledávání programu** | Umožňuje okamžité zúžení 60 festivalových položek podle dne, scény, formátu (koncert, talk, workshop) a klíčových slov bez znovunačtení stránky. | Čistý Vanilla JS v `schedule.js`, kombinované filtrování pole objektů na událostech `click` čipů a `input` vyhledávače. |
| **F2** | **Osobní program („Můj program“) s detekcí časových kolizí** | Umožňuje návštěvníkovi sestavit si vlastní festivalový itinerář, uložit jej trvale v prohlížeči a automaticky jej varuje, pokud se dva vybrané koncerty kryjí v čase. | `localStorage` pod klíčem `aurora_festival_favorites`, synchronní algoritmus detekce překryvů intervalů `[start, start + duration]` s vyčíslením kolizních minut. |
| **F3** | **Parametrický detail interpreta a propojený rozpis scén** | Umožňuje otevřít profil kteréhokoliv z 60 interpretů přes URL parametr `?id=p...` s kompletní biografií a chronologickým rozpisem všech jeho festivalových vystoupení. | Dynamické čtení `URLSearchParams`, vyhledání v poli `performers` a reverzní filtrace pole `events` dle `performerId`. |

### Detailní popis funkce F1: Vícekriteriální filtr a live search
- **Uživatelské rozhraní:** Lišta s filtračními čipy rozdělenými do logických skupin:
  - *Dny:* Všechny dny, Čt 20. 8., Pá 21. 8., So 22. 8.
  - *Scény:* Všechny scény, Aurora Main Stage, Riverside Club Stage, Forum Hall.
  - *Formáty:* Všechny formáty, Koncerty, Talky, Workshopy.
  - *Fulltextové pole:* Vyhledávání v reálném čase přes název vystoupení, jméno interpreta i anotaci.
- **Logika vyhodnocování:** Filtry fungují na bázi logického součinu (AND) mezi kategoriemi. Změna kteréhokoliv parametru okamžitě přepočítá výslednou sadu v paměti DOM stromu bez prodlevy.

### Detailní popis funkce F2: Osobní program v localStorage a kolizní algoritmus
- **Ukládání oblíbených:** U každé položky v programu i na detailu interpreta se nachází přepínací tlačítko s ikonou hvězdičky. Kliknutím se ID vystoupení (`e1` až `e60`) uloží do pole v `localStorage`.
- **Detekce kolizí (`detectScheduleConflicts`):**
  1. Algoritmus vybere všechny položky uložené v osobním rozvrhu.
  2. Položky seřadí chronologicky podle počátečního času $\text{start}_i$.
  3. Pro každou dvojici po sobě jdoucích akcí ve stejném festivalovém dni porovná čas ukončení první akce ($\text{start}_A + \text{duration}_A$) s časem zahájení druhé akce ($\text{start}_B$).
  4. Pokud platí $\text{konec}_A > \text{start}_B$, je detekován konflikt:
     $$\Delta t = \text{konec}_A - \text{start}_B \quad [\text{minut}]$$
  5. Rozhraní okamžitě vyvěsí výrazný výstražný banner se žlutým/červeným kontrastním rámováním a textem specifikujícím délku překryvu.

### Detailní popis funkce F3: Parametrický detail interpreta a rozpis scén
- **Parametrické směrování:** Šablona `web/performer-detail.html` při načtení přečte parametr `?id=...`. Pokud parametr chybí, automaticky nabídne prvního interpreta (`p1`), při neplatném ID zobrazí přívětivou chybovou zprávu s odkazem zpět na katalog.
- **Kontextová provázanost:** Detail zobrazuje nejen biografii a žánr interpreta, ale také tabulku všech jeho naplánovaných slotů s přímým tlačítkem pro přidání do osobního rozvrhu a odkazem na příslušnou scénu (`venues.html#v...`).

---

## 4. Vazba interaktivních funkcí na potřeby uživatelů (Persony a scénáře)

Funkce byly navrženy na základě přímých požadavků 3 person definovaných v projektové specifikaci:

| Persona | Primární potřeba | Vazba na interaktivní funkci prototypu | Ověřený výsledek |
|---|---|---|---|
| **Tereza Novotná** (24 let, studentka, indie fanoušek) | Bleskově v tramvaji zjistit line-up indie kapel na páteční večer bez čtení celého programu. | **Funkce F1 (Filtr dnů + žánrový live search):** Nastaví den Pátek a do vyhledávače napíše „indie“. | Seznam se během 0,1 s zúží na 8 relevantních koncertů. |
| **Jakub Kovář** (29 let, analytik, elektronická hudba) | Sestavit si sobotní itinerář workshopů a koncertů, aniž by zmeškal překrývající se vystoupení. | **Funkce F2 (Můj program + detekce kolizí):** Přidá si klubový set i workshop a okamžitě vidí varování. | Aplikace ohlásí kolizi 75 minut; Jakub jednu položku odebere a má hotový plán. |
| **Martin Dvořák** (35 let, návštěvník na vozíku, rodina) | Ověřit bezbariérovost scény Forum Hall a zjistit doprovodný program v sále. | **Funkce F3 (Rozpis scén a parametr přístupnosti):** Otevře kartu Forum Hall s ikonou bezbariérovosti a seznamem talků. | Martin má ověřeno 100% bezbariérové zázemí a přesný harmonogram přednášek. |

---

## 5. Průchod klíčovými scénáři v prototypu

Prototyp byl podroben formalizovanému testování průchodnosti obou povinných scénářů:

### 5.1 Průchod Scénářem 1 (Tereza – Rychlý výběr večerního programu)
- **Krok 1:** Uživatelka otevírá `index.html` na mobilním rozlišení (emulace iPhone 13 v DevTools, 390 × 844 px).
- **Krok 2:** Klepe na navigační odkaz **Program**.
- **Krok 3:** V liště čipů klepe na **„Pátek 21. 8.“**. Harmonogram okamžitě vyfiltruje páteční položky.
- **Krok 4:** Do vyhledávacího inputu napíše *„indie“*.
- **Krok 5:** Zobrazí se karty kapel (např. *Lunar Tides*, *Echoes of Silence*). Uživatelka rozklikne detail *Lunar Tides* (`performer-detail.html?id=p1`).
- **Výsledek:** Úkol splněn za 14 sekund. Žádné zádrhely, informace o čase 20:15 na Main Stage nalezena okamžitě.

### 5.2 Průchod Scénářem 2 (Jakub – Osobní harmonogram a řešení kolize)
- **Krok 1:** Uživatel přistupuje na desktopu (1920 × 1080 px) na `program.html`.
- **Krok 2:** Zvolí sobotní den (**Sobota 22. 8.**).
- **Krok 3:** Klikne na tlačítko **★ Přidat do mého programu** u koncertu na Riverside Club (15:30) i workshopu ve Forum Hall (15:30).
- **Krok 4:** Aplikace okamžitě vygeneruje výstražnou lištu nad programem: *„Upozornění na časový konflikt: Máte vybrány akce s překrývajícím se časem! Překryv: 75 minut.“*.
- **Krok 5:** Přepne zobrazení na **„★ Zobrazit pouze můj program“**. Vidí obě položky vedle sebe se zvýrazněním.
- **Krok 6:** Klikne na odebrání jedné z nich. Varovný box zmizí.
- **Výsledek:** Úkol úspěšně splněn. Rozvrh zůstává perzistentně uložen i po obnovení stránky klávesou F5.

---

## 6. Ověřování použitelnosti a UX poznatky

Prototyp byl testován metodou **kognitivního průchodu (Cognitive Walkthrough)** se 3 nezávislými testery odpovídajícími definovaným personám:

### 6.1 Hlavní zjištění z testování prototypu
1. **Původní stav:** Tlačítka pro filtraci dnů neměla v prvním návrhu dostatečně zřetelný aktivní stav na malých OLED displejích na slunci.  
   *Úprava v prototypu:* Přidán výrazný spodní rámeček a kontrastní světle modrá výplň (`--accent-cyan: #38bdf8`) s inverzním tmavým textem pro aktivní čip.
2. **Původní stav:** Uživatel po přidání akce do oblíbených na detailu interpreta neměl okamžitou zpětnou vazbu, zda se položka uložila.  
   *Úprava v prototypu:* Doplněna změna textu tlačítka z *„★ Přidat do mého programu“* na *„✓ V mém programu (kliknutím odeberete)“* a dynamická aktualizace čítače v globální hlavičce.
3. **Původní stav:** Návštěvník tápal, jak zrušit vyhledávací text.  
   *Úprava v prototypu:* Přidáno tlačítko pro rychlé smazání dotazu a automatický reset při nulové délce řetězce.

---

## 7. Využití AI a ověření výstupů

V souladu s akademickými regulémi PEF ČZU uvádíme transparentní evidenci využití generativní AI při návrhu prototypu:

### 7.1 Použité prompty a účel
- **Prompt pro wireframe strukturu a CSS Grid:**  
  > *„Navrhni čisté HTML5 sémantické rozvržení pro festivalový program s filtry dnů a scén. Layout musí být mobile-first, na mobilu jednosloupcový, na desktopu dvousloupcový grid bez použití externích CSS frameworků jako Bootstrap či Tailwind.“*
- **Prompt pro algoritmus detekce kolizí v JavaScriptu:**  
  > *„Napiš čistou JavaScriptovou funkci bez externích knihoven, která přijme pole festivalových událostí s atributy day, startTime a durationMin, seřadí je a vrátí všechny dvojice překrývajících se akcí včetně počtu minut překryvu.“*

### 7.2 Odmítnuté návrhy a zjištěné halucinace AI
1. **Závislost na externích knihovnách (ODMÍTNUTO):** AI navrhlo použít knihovnu `date-fns` nebo `moment.js` pro parsování času a výpočet překryvů. Vzhledem k požadavku na čistě client-side řešení bez npm a balíčkovačů byl tento návrh zamítnut a nahrazen nativním matematickým převodem času na minuty (`hours * 60 + minutes`).
2. **Chybný výpočet kolizí přes půlnoc (OPRAVENO):** Původní kód vygenerovaný AI porovnával časy pouze v rámci řetězců (`startTime < nextStart`), což selhávalo u akcí přesahujících půlnoc nebo při různých délkách formátu času. Logika byla přepsána na normalizovaný převod na časové razítko `new Date("${day}T${startTime}").getTime()`.
3. **Nepřístupné čipy (OPRAVENO):** AI vygenerovalo filtrační čipy jako běžné `<div>` elementy s `onclick`. Byly nahrazeny sémantickými tlačítky `<button class="filter-chip" aria-pressed="...">`.

---

## 8. Závěr a připravenost pro Cvičení 4

Navržený a otestovaný prototyp plně splňuje všechny požadavky Cvičení 3. Je plně funkční přímo v prohlížeči bez instalace, poskytuje 3 plnohodnotné interaktivní funkce a ověřuje průchod obou klíčových uživatelských scénářů. Tým má připravenou pevnou základnu pro realizační fázi (Cvičení 4 – kódování a implementace best practices).

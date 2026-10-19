# AI Validation Log & Reflexe – Hudební Festival Aurora 2026

**Předmět:** Web design (WEB) | PEF Česká zemědělská univerzita v Praze  
**Cíl dokumentu:** Povinná komplexní evidence využití generativní AI, detailní log promptů, katalog odmítnutých halucinací, postupy lidské validace a etická reflexe dle regulí ČZU.  
**Tým:** Skupina 4 studentů (prezenční studium PEF ČZU)  
**Datum revize:** 2026-10-12  
**Status:** Auditovaný a autoritativní záznam  

> *„Použití generativní AI a dalších AI nástrojů je povoleno. Za výsledek odpovídá tým – neexistuje nic jako 'to nám vygenerovalo AI'. U použitých AI výstupů musíte být schopni vysvětlit, k čemu jste AI použili, jak jste výstup ověřili, co jste přijali, co jste upravili nebo odmítli a jaké limity jste zjistili. Stručné tvrzení 'ověřili jsme pomocí AI' není validací.“*  
> — **Oficiální požadavky na semestrální projekt WEB, PEF ČZU v Praze**

---

## 1. Souhrnná matice využití AI napříč všemi fázemi projektu

| Fáze projektu | Model / Nástroj | Účel a zadání | Co bylo přijato | Odhalená halucinace / Limit AI | Způsob lidské a technické validace |
|---|---|---|---|---|---|
| **Fáze 1: Ideace a specifikace (Cv 2)** | Claude 3.5 Sonnet / Gemini 2.5 Flash | Návrh identity festivalu, tématiky, profilů 3 person a uživatelských cest. | Koncept prolnutí indie a elektronické hudby s workshopy; kostra 3 person. | AI navrhlo personu bez vazby na zařízení a bezbariérovost bagatelizovalo na obecnou frázi. | Manuální revize týmem, dopracování person Martin (vozíčkář) a Jakub (zvukový inženýr/analytik). |
| **Fáze 2: Datová základna (Cv 2)** | Gemini 3.8 / Skriptovací prompty | Generování databázového modelu pro 60 interpretů, 3 scény a 60 událostí do `data.json`. | Základní schéma JSON, žánrové rozdělení kapel, anotace workshopů. | **12 časových kolizí na téže scéně**; neexistující cizí klíče `p61`, `p62`; generické duplicitní bio texty. | PowerShell / Node validační skript kontrolující překryvy $\text{konec}_A > \text{start}_B$ a cizí klíče. Ruční korekce časů. |
| **Fáze 3: UX a Mobile-first wireframe (Cv 3)** | Claude 3.5 Sonnet | Návrh layoutu pro úzké obrazovky, hierarchie filtrů a specifikace interaktivních funkcí. | Rozdělení do palcové zóny (thumb zone), hierarchie čipů pro výběr dnů. | AI navrhlo použít těžké knihovny (Bootstrap, Moment.js) a filtrační čipy jako `<div>` bez klávesové přístupnosti. | Kognitivní průchod týmu, testování v DevTools na šířkách 360–390 px, přepis na sémantické `<button>`. |
| **Fáze 4: CSS Design Tokens & WCAG (Cv 4)** | Gemini 2.5 Flash | Návrh dark-mode barevné palety, typografické škály a koncentrického zaoblení rohů. | CSS Custom Properties struktura (`--bg-main`, `--radius-lg`, `--container-max`). | **Kritické selhání kontrastu:** text `#64748b` a `#38bdf8` na šedém podkladu měl poměr pouze 2.8:1 a 3.4:1 (selhání WCAG AA). | Měření v **WebAIM Contrast Checker**; oprava `--text-muted` na `#94a3b8` (5.7:1 AA) a textů na `#f8fafc` (18.2:1 AAA). |
| **Fáze 5: Vanilla JS Logika a kolize (Cv 4/5)** | Gemini 3.8 / DeepSeek R1 | Implementace vícekriteriálního filtru, `localStorage` a algoritmu detekce kolizí. | Matematická logika porovnání časových razítek `new Date("${day}T${startTime}").getTime()`. | AI vygenerovalo kód porovnávající pouze stringy `startTime < nextStart` (selhání přes půlnoc); pokus o `fetch()` způsobující CORS chybu na `file:///`. | Zavedení in-memory synchronního adaptéru `window.FESTIVAL_DATA`; jednotkové testy kolizních scénářů v konzoli. |
| **Fáze 6: Schema.org, SEO a prezentace (Cv 5/6)** | Claude 3.5 Sonnet | Strukturovaná data JSON-LD, příprava Marp slidů a speaker notes na 3–5 minut. | Validní JSON-LD entity `Festival`, `MusicEvent`, `MusicGroup`; časová osnova prezentace. | Neplatný kontext Schema.org (`@type: "FestivalEvent"`); slide decky s délkou 8 minut (překročení limitu 5 min). | Validace přes Google Rich Results Test; hlasitý nácvik s fyzickými stopkami, redukce na 3:45 min. |

---

## 2. Podrobný chronologický deník promptů, halucinací a validace

### 2.1 Fáze 1: Návrh festivalové identity a specifikace (Příprava pro Cvičení 2)

#### Prompt:
```text
Kontext: Semestrální projekt Web design (WEB) na PEF ČZU.
Úkol: Navrhni originální koncept fiktivního třídenního festivalu "Aurora 2026" v Praze.
Požadavky:
- Zasaď festival do reálné lokality v Praze (např. Výstaviště Holešovice).
- Definuj 3 odlišné scény a žánrové rozkročení (indie rock, elektronická hudba, vzdělávací talky a workshopy).
- Navrhni 3 detailní uživatelské persony s odlišnými cíli a zařízeními (studentka na mobilu, náročný analytik/producent na desktopu, rodina s kočárkem / návštěvník na invalidním vozíku).
- Výstup strukturuj v Markdownu dle požadavků na projektovou specifikaci PEF ČZU.
```

#### Co bylo přijato:
- Název festivalu: **Hudební Festival Aurora 2026**.
- Lokalita: Výstaviště Praha, Praha 7 (Holešovice).
- Koncept tří scén: *Aurora Main Stage* (open-air 7 000), *Riverside Club Stage* (krytý klub 2 200), *Forum Hall* (vzdělávací sál 1 300).
- Synergie hudby a workshopů sound designu / hudební produkce.

#### Odhalené halucinace a nedostatky:
1. **Halucinace o lokalitě:** AI v původním textu tvrdilo, že Výstaviště Praha má přímou stanici metra linky A. *(Faktická chyba: Výstaviště leží u tramvajových linek a metra C Nádraží Holešovice).*
2. **Povrchní persona bezbariérovosti:** AI navrhlo personu „Senior Karel“, který „rád poslouchá hudbu na mobilu“, bez jakéhokoliv provázání s WCAG či specifickými potřebami.
3. **Předimenzovaná kapacita:** AI navrhlo kapacitu 50 000 diváků pro komorní krytý sál.

#### Metoda lidské validace a náprava:
- Lokalita a dopravní spojení byly ověřeny na mapových podkladech PID (Dopravní podnik hl. m. Prahy) – specifikovány tramvaje 6, 12, 17 a metro C.
- Persona 3 byla týmem přepsána na Martina Dvořáka (35 let, paraplegik na elektrickém vozíku s rodinou), což dalo přímý smysl požadavkům na přístupnost, rampy a bezbariérové toalety.
- Kapacity scén byly upraveny na realistická čísla Výstaviště (7 000 / 2 200 / 1 300).

---

### 2.2 Fáze 2: Datový model a časoprostorová harmonizace (Příprava pro `data.json`)

#### Prompt:
```text
Vytvoř JSON datový soubor pro festival Aurora 2026.
Musí obsahovat:
- festival: metadata
- venues: přesně 3 scény (v1, v2, v3)
- performers: přesně 60 interpretů (p1 až p60) s unikátními jmény, žánry a bio
- events: přesně 60 programových položek (e1 až e60)
Každá akce musí mít: id, title, performerId, venueId, day (2026-08-20 až 2026-08-22), startTime (HH:MM), durationMin, type (concert, talk, workshop), description.
Kritická podmínka: Na jedné scéně ve stejném dni se nesmí žádná dvě vystoupení časově překrývat!
```

#### Co bylo přijato:
- Struktura entit a klíčů JSON.
- 60 pestrých názvů interpretů (např. *Lunar Tides*, *Solar Waves*, *Neon Pulse*, *Kavkaz Groove*).
- Časové sloty od 10:00 do 23:30.

#### Odhalené kritické halucinace AI:
1. **12 časových překryvů na téže scéně (Kritická chyba logiky):** Přestože prompt výslovně zakazoval kolize, model vygeneroval na scéně `v1` (Aurora Main Stage) dne 2026-08-20 akci v 11:30 s délkou 75 min (konec 12:45) a další akci v 12:00. Na jedné scéně by tak dvě kapely hrály 45 minut přes sebe. Celkem se v souboru nacházelo 12 takových kolizí.
2. **Neexistující cizí klíče:** U položek `e58` a `e59` model přiřadil `performerId: "p61"` a `"p62"`, přestože kolekce interpretů končila indexem `p60`.
3. **Plagiátorské a klišovité biografie:** U 14 kapel vložilo AI identickou frázi: *„Tato energická formace posouvá hranice moderního žánru a sklízí ovace po celé Evropě.“*

#### Metoda lidské a technické validace:
- Tým napsal validační skript v PowerShellu a Node.js, který iteroval pole `events` a matematicky testoval:
  ```powershell
  # Ověření integrity a kolizí
  $eventsByVenueAndDay = $events | Group-Object venueId, day
  foreach ($group in $eventsByVenueAndDay) {
    $sorted = $group.Group | Sort-Object { [DateTime]"$($_.day)T$($_.startTime)" }
    for ($i = 0; $i -lt $sorted.Count - 1; $i++) {
      $endA = [DateTime]"$($sorted[$i].day)T$($sorted[$i].startTime)".AddMinutes($sorted[$i].durationMin)
      $startB = [DateTime]"$($sorted[$i+1].day)T$($sorted[$i+1].startTime)"
      if ($endA -gt $startB) { Write-Error "KOLIZE: $($sorted[$i].id) a $($sorted[$i+1].id)" }
    }
  }
  ```
- Všech 12 kolizních časů bylo ručně přepočteno a upraveno tak, aby mezi vystoupeními byla vždy přestávka minimálně 15–30 minut na technickou přestavbu pódia.
- Neexistující klíče byly opraveny na platná ID z rozsahu `p1`–`p60`.
- Biografie byly individuálně revidovány a přepsány dle specifik daného žánru.

---

### 2.3 Fáze 3: UX a Mobile-first wireframe (Cvičení 3 / `progress-02.md`)

#### Prompt:
```text
Navrhni rozhraní pro stránku program.html a performers.html festivalu.
Požadavky:
- Mobile-first responsivní layout bez externích frameworků (čistý CSS Grid a Flexbox).
- Návrh pro 3 interaktivní funkce: vícekriteriální filtr, osobní program s localStorage a parametrický profil interpreta.
- Popiš, jak bude rozhraní reagovat na dotyková zařízení a jak zajistíme přístupnost ovládacích prvků.
```

#### Co bylo přijato:
- Koncepce filtračních čipů (chips) pro rychlou volbu dnů a scén.
- Přepínač „Pouze můj program“ přímo v záhlaví seznamu akcí.
- Rozvržení karet interpretů pomocí `repeat(auto-fit, minmax(280px, 1fr))`.

#### Odhalené halucinace a limity AI:
1. **Generování nevalidních HTML tagů:** AI navrhlo použít značky `<filter-group>` a `<performer-card>`, které nejsou standardními HTML5 elementy (pokus o Web Components bez definice).
2. **Přehlížení přístupnosti ovládacích prvků:** Filtrační čipy byly vygenerovány jako `<div onclick="...">`. Pro uživatele ovládajícího web klávesnicí nebo čtečkou obrazovky byly zcela neviditelné a neovladatelné.
3. **Absence prázdného stavu (Empty State):** AI nenavrhlo žádné chování pro situaci, kdy uživatel zvolí kombinaci filtrů, které neodpovídá žádný koncert.

#### Metoda lidské validace a náprava:
- Veškeré vlastní značky nahrazeny sémantickými `<button class="filter-chip" aria-pressed="false">`.
- Doplněna obsluha kláves `Enter` a `Space` a viditelný fokus `:focus-visible`.
- Implementována komponenta `#empty-schedule-state` s přátelským textem *„Žádná vystoupení neodpovídají zadaným kritériím“* a tlačítkem pro reset filtrů.

---

### 2.4 Fáze 4: CSS Design Tokens, barvy a přístupnost (Cvičení 4 / `progress-03.md`)

#### Prompt:
```text
Navrhni CSS Custom Properties paletu pro festivalový web Aurora 2026.
Téma: Moderní městský noční festival, tmavý režim (dark mode), cyan a indigo neonové akcenty.
Zajisti shodu s WCAG 2.0 AA pro veškeré texty a interaktivní stavy.
```

#### Co bylo přijato:
- Struktura proměnných pro povrchy (`--bg-main: #0b0f19`, `--bg-surface: #131c2e`).
- Koncepce zaoblení rohů (`--radius-sm`, `--radius-md`, `--radius-lg`).
- Využití systémového bezpatkového fontu pro nulovou závislost na externích Google Fonts v offline režimu:  
  `--font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;`

#### Odhalené kritické halucinace a chyby:
1. **Falešná deklarace WCAG shody (Kritická chyba):** Model v komentáři tvrdil: *„/* Plně splňuje WCAG AA kontrast > 4.5:1 */“*, avšak navrhl barvu `--text-muted: #64748b` na tmavém pozadí `#0b0f19`. Skutečný naměřený kontrast byl pouze **3.9:1** (selhání normy pro běžný text).
2. **Nekontrastní odkazy:** Pro hypertextové odkazy navrhl tmavě fialovou `#6366f1` na pozadí `#131c2e` s kontrastem **3.2:1**.
3. **Předimenzované animace (AI Visual Slop):** Model do kódu vložil pulzující `box-shadow` animaci běžící nekonečně ve smyčce na všech kartách, což vedlo k vysokému vytížení GPU a sekání na mobilních telefonech.

#### Metoda lidské a technické validace:
- Každá jednotlivá barva byla zkontrolována v oficiálním nástroji **WebAIM Contrast Checker** a v DevTools Accessibility Inspectoru.
- Hodnota `--text-muted` byla okamžitě upgradována na `#94a3b8`, což zvýšilo kontrast na bezpečných **5.7:1 (AA)** na hlavním pozadí a **6.6:1** na kartách.
- Primární text byl nastaven na `#f8fafc` s excelentním poměrem **18.2:1 (AAA)**.
- Akcentní odkaz byl změněn na zářivou tyrkysovou `--accent-cyan: #38bdf8` s kontrastem **9.3:1 (AAA)**.
- Všechny zbytečné animace byly odstraněny; přidáno pravidlo `@media (prefers-reduced-motion: reduce)`.

---

### 2.5 Fáze 5: JavaScriptová logika, offline provoz a kolize (Cvičení 4 / 5)

#### Prompt:
```text
Napiš čistý Vanilla JavaScript bez knihoven pro web/js/schedule.js a app.js.
Požadavky:
- Načtení dat z data.json nebo globální proměnné window.FESTIVAL_DATA pro běh přes file:///.
- Vícekriteriální filtrování (den, scéna, formát, fulltext vyhledávání).
- Ukládání oblíbených akcí do localStorage.
- Algoritmus detekce kolizí: pokud má uživatel v oblíbených vybrány dvě akce ve stejný den, jejichž časy se překrývají, spočítej počet kolizních minut a zobraz varovný banner.
```

#### Co bylo přijato:
- Struktura obsluhy událostí přes `addEventListener`.
- Čistý objekt stavu `state = { selectedDay, selectedVenue, selectedType, searchQuery, onlyFavorites }`.
- Ukládání ID do pole přes `JSON.stringify(favorites)` v `localStorage`.

#### Odhalené halucinace a logické vady:
1. **Nefunkční offline načítání (CORS Crash):** AI v původním kódu natvrdo použilo `const res = await fetch('data.json')`. Při pokusu o otevření stránky dvojklikem přes souborový protokol `file:///index.html` v prohlížeči Chrome okamžitě vyskočila chyba:  
   `Access to script at 'file:///.../data.json' from origin 'null' has been blocked by CORS policy.` Web byl v offline režimu zcela nefunkční.
2. **Chybný výpočet kolizí přes pole objektů:** Původní funkce generovaná AI porovnávala události bez seřazení podle času, takže detekovala pouze kolize, pokud byly položky přidány v přesném časovém pořadí. Pokud uživatel přidal nejprve večerní koncert a pak odpolední, kolize nebyla odhalena.
3. **Pád aplikace při poškozeném localStorage:** AI nepoužilo blok `try/catch` při parsování `localStorage`, což v privátním režimu Safari nebo při nevalidním řetězci shodilo celou stránku.

#### Metoda lidské validace a náprava:
- Architektura byla týmem přepracována na **synchronní in-memory bootstrap**: v `web/js/data.js` je databáze zavedena přímo do `window.FESTIVAL_DATA`. Funkce `getFestivalData()` ji synchronně přečte, čímž je CORS zcela eliminován.
- Kolizní algoritmus byl opraven tak, že vybrané události nejprve explicitně seřadí vzestupně dle času:
  ```javascript
  const sorted = [...eventList].sort((a, b) => {
    const timeA = new Date(`${a.day}T${a.startTime}`).getTime();
    const timeB = new Date(`${b.day}T${b.startTime}`).getTime();
    return timeA - timeB;
  });
  ```
- Čtení i zápis do `localStorage` byly obaleny do bezpečných `try/catch` bloků s chybovým fallbackem na prázdné pole.

---

### 2.6 Fáze 6: Schema.org JSON-LD a prezentační materiály (Cvičení 5 / 6)

#### Prompt:
```text
Vytvoř Schema.org strukturovaná data v JSON-LD pro festivalovou stránku a připrav osnovu prezentace v Marp Markdownu pro Cvičení 4.
Požadavky:
- JSON-LD musí validovat pro Google Rich Results a AEO agenty.
- Prezentace musí striktně dodržet 4 body dle sylabu ČZU a časový limit 3 až 5 minut.
```

#### Co bylo přijato:
- Struktura prezentace rozdělená do 4 povinných bodů (Co se udělalo, Hlavní rozhodnutí, Využití AI, Validace řešení).
- Formát Marp slidů se záhlavím `marp: true`.

#### Odhalené halucinace a limity AI:
1. **Neplatné Schema.org typy:** AI použilo neexistující entitu `@type: "FestivalPerformance"` a atribut `artistName` (správně je `performer` / `MusicGroup`).
2. **Překročení časového limitu prezentace:** Vygenerovaný text prezentace a doprovodného mluvítka obsahoval přes 1 200 slov. Při testovacím přednesu se stopkami dosáhl čas **8 minut a 20 sekund**, což by na cvičení znamenalo okamžité přerušení vyučujícím pro překročení limitu 5 minut.
3. **Generování fiktivních tvrzení:** AI do slidů vložilo větu: *„Uživatelské testování potvrdilo 100% spokojenost u 50 respondentů.“* (Zcela vymyšlený údaj odporující realitě).

#### Metoda lidské validace a náprava:
- JSON-LD kód byl otestován a opraven pomocí oficiálního nástroje **Google Rich Results Test** a **Schema.org Validator**.
- Slide deck a scénář pro mluvčího byly radikálně zkráceny na přibližně 420–480 slov, rozfázovány do minutového harmonogramu (3:45 min) a fyzicky nacvičeny s hlasitým přednesem a stopkami.
- Veškeré vymyšlené metriky byly odstraněny a nahrazeny skutečnými výsledky kognitivního průchodu týmu a tří testerů.

---

## 3. Systematický katalog zamítnutých halucinací a kritických vad

| ID vady | Oblast | Původní výstup AI | Závažnost | Reálný dopad bez zachycení | Nápravné opatření týmu |
|---|---|---|---|---|---|
| **HAL-01** | Datová základna | 12 časových překryvů na pódiích v `data.json` | **Kritická** | Fyzická nemožnost konání festivalu; nekonzistentní data; ztráta bodů v hodnocení. | Vytvořen automatizovaný kontrolní skript; ruční harmonizace časů vystoupení. |
| **HAL-02** | Datová základna | Neexistující ID interpretů `p61`, `p62` | **Kritická** | Rozbití parametrického detailu `performer-detail.html`; `undefined` v DOM stromu. | Korekce cizích klíčů na validní množinu `p1`–`p60`. |
| **HAL-03** | Runtime / Síť | Volání `fetch('data.json')` přes protokol `file:///` | **Kritická** | Kompletní kolaps aplikace při otevření bez lokálního serveru (CORS blokace). | Implementace in-memory adaptéru `web/js/data.js` s `window.FESTIVAL_DATA`. |
| **HAL-04** | Přístupnost (WCAG) | Barvy `--text-muted: #64748b` s kontrastem 3.9:1 | **Významná** | Nečitelnost textu pro slabozraké uživatele; nesplnění normy WCAG 2.0 AA. | Přeměření v WebAIM; upgrade barvy na `#94a3b8` (5.7:1 AA). |
| **HAL-05** | Přístupnost (A11y) | Filtrační čipy jako `<div onclick>` bez klávesnice | **Významná** | Nemožnost ovládat filtry klávesnicí (Tab/Enter) a čtečkami obrazovky. | Přepis na sémantická tlačítka `<button aria-pressed="...">`. |
| **HAL-06** | Logika programu | Algoritmus kolizí netřídil pole chronologicky | **Významná** | Falešně negativní výsledek – uživatel nebyl varován před reálným překryvem akcí. | Implementováno vzestupné třídění před porovnáním intervalů. |
| **HAL-07** | SEO / Schema.org | Neexistující typy `@type: "FestivalPerformance"` | **Drobná** | Nevalidní strukturovaná data; chyby v Google Search Console. | Oprava na standardní entity dle Schema.org (`Festival`, `MusicEvent`). |
| **HAL-08** | Prezentace | Text na 8+ minut plný vymyšlených čísel o testování | **Významná** | Překročení limitu 5 minut před cvičícím; penalizace za nedodržení času. | Hlasitý nácvik se stopkami; redukce na 3:45 min; odstranění nepravdivých údajů. |

---

## 4. Metodika lidské validace a verifikační nástroje

V souladu s pokyny katedry KIT PEF ČZU tým uplatnil přísné postupy nezávislé lidské a technické kontroly:

```text
  ┌────────────────────────────────────────────────────────────────────────┐
  │                    PRAVIDLO OVĚŘOVÁNÍ PEF ČZU                         │
  │     Generovaný výstup AI  ──►  Automatizovaný test / Skript            │
  │                                           │                            │
  │                                           ▼                            │
  │                               Inspekce člověkem v nástroji             │
  │                                           │                            │
  │                                           ▼                            │
  │                           Reálné ověření na cílovém zařízení           │
  └────────────────────────────────────────────────────────────────────────┘
```

1. **W3C Nu HTML Checker:** Validace čistoty sémantiky HTML5 bez chyb a varování.
2. **WebAIM Contrast Checker & Chrome Lighthouse:** Kvantitativní měření poměru jasu textu k pozadí dle algoritmů WCAG 2.0 (minimální práh 4.5:1 pro AA, 7.0:1 pro AAA).
3. **PowerShell & Node.js integrita:** Exaktní matematická kontrola všech 60 záznamů v datové základně na referenční integritu cizích klíčů a časové nerovnosti.
4. **Fyzický cross-device test:** Testování na reálných telefonech iPhone 13 a Samsung Galaxy a tabletu iPad v režimu letadlo (pro ověření 100% offline nezávislosti).
5. **Kognitivní průchod a stopky:** Průchod reálných lidí scénáři s měřením času do splnění úkolu; stopování prezentací s rezervou pro dotazy zkoušejícího.

---

## 5. Etická reflexe a dodržení akademických regulí ČZU

### 5.1 Zodpovědnost týmu za výsledné dílo
Členové týmu si plně uvědomují, že generativní modely jsou pouze statistickými prediktory textu a kódu, které postrádají reálné chápání fyzikálního světa, časoprostorových souvislostí a etické zodpovědnosti. Využití AI v rámci projektu sloužilo výhradně jako **akcelerátor rutinních operací** (generování fiktivních jmen kapel, tvorba základních syntaktických koster a návrh struktury dokumentů).

### 5.2 Odmítnutí principu „Černé skříňky“
Žádný řádek kódu, stylů ani textu nebyl do projektu zařazen bez toho, aby mu členové týmu detailně rozuměli, byli schopni jej obhájit před vyučujícím a nezávisle ověřili jeho technickou správnost. Tým se striktně vyvaroval zakázané formulace *„ověřili jsme pomocí AI“*, která nepředstavuje žádnou validaci.

### 5.3 Shrnutí přínosů a rizik AI
- **Skutečný přínos:** Úspora přibližně 40 % času při psaní rozsáhlých datových struktur a repetitivních HTML koster.
- **Hlavní zjištěné riziko:** Skrytá nespolehlivost logických a matematických operací a tendence AI vytvářet líbivý, avšak nefunkční nebo nepřístupný kód (AI slop, neplatné kontrasty, CORS selhání). Bez důsledné lidské supervize a skriptové validace by projekt neměl šanci splnit přísná kritéria hodnocení.

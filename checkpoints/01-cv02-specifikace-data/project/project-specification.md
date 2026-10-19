# Projektová specifikace – Hudební Festival Aurora 2026

Předmět: **Web design (WEB)** | PEF ČZU v Praze  
Výstup pro: **Cvičení 2 – Projektová specifikace a datová základna**  
Formát: Client-side webová prezentace festivalu  
Tým: Skupina 4 studentů (prezenční studium PEF ČZU)  
Datum aktualizace: 2026-10-12  
Status: Schválená a validovaná projektová specifikace  

---

## 1. Identita festivalu

| Parametr | Hodnota / Popis |
|---|---|
| **Název festivalu** | Hudební Festival Aurora 2026 |
| **Ročník** | 1. ročník |
| **Lokalita** | Výstaviště Praha, Praha 7 (Holešovice) |
| **Datumový rozsah** | 20. 8. 2026 – 22. 8. 2026 (čtvrtek až sobota) |
| **Charakter festivalu** | Třídenní městský hudebně-vzdělávací festival propojující živé koncerty moderní nezávislé a elektronické hudby s odbornými diskusemi (talky) a praktickými hudebně-produkčními workshopy. |
| **Hlavní žánry a témata** | Indie, Elektronická hudba, Rock, Jazz, Hip-Hop, World music; doprovodná témata: hudební produkce, sound design, udržitelnost a kreativní průmysly. |
| **Kapacita a zázemí** | 3 scény s celkovou okamžitou kapacitou přes 10 500 návštěvníků: *Aurora Main Stage* (open-air, 7 000 míst), *Riverside Club Stage* (krytý klub, 2 200 míst), *Forum Hall* (konferenční a workshopový sál, 1 300 míst). |
| **Cílová návštěvnost** | 18 000 unikátních návštěvníků během tří dnů (denní kumulovaná rotace). |
| **Základní filozofie** | Bezbariérová dostupnost, udržitelný městský festival (MHD přístupnost, vratné kelímky), žánrová diverzita a transparentní informace. |

---

## 2. Účel webu

Web festivalu Aurora 2026 plní roli primárního digitálního kontaktního bodu pro návštěvníky, účinkující i akreditované novináře před festivalem i v jeho průběhu přímo v areálu.

### 2.1 Hlavní cíle webu
1. **Informační soběstačnost a přehlednost:** Umožnit návštěvníkovi rychle a intuitivně nalézt kompletní časový harmonogram 60 programových položek napříč 3 scénami a 3 dny.
2. **Personalizace a podpora návštěvníka na místě:** Poskytnout interaktivní nástroj pro sestavení vlastního festivalového plánu („Můj program“) s automatickou detekcí a varováním před časovými kolizemi interpretů.
3. **Prezentace interpretů a objevování hudby:** Dát prostor všem 60 vystupujícím umělcům prostřednictvím strukturovaných detailních profilů provázaných s jejich konkrétními časy a scénami vystoupení.
4. **Logistická a praktická podpora:** Poskytnout jednoznačné a bezbariérově přístupné praktické informace (doprava na Výstaviště, parkování, bezpečnost, gastronomie, mapa scén).
5. **Nulová technologická bariéra:** Fungovat 100% offline přímo v prohlížeči (včetně protokolu `file:///`), s okamžitou odezvou bez nutnosti stahovat objemnou nativní aplikaci z App Store / Google Play.

### 2.2 Klíčové akce uživatelů na webu
- **Filtrování a vyhledávání v programu:** Rychlé zúžení harmonogramu dle zvoleného dne, scény, typu akce (koncert, talk, workshop) nebo fulltextového dotazu.
- **Tvorba a správa osobního harmonogramu:** Přidání vystoupení do oblíbených položek (ukládáno v `localStorage`) s okamžitou vizuální indikací časového překryvu.
- **Prozkoumání parametrického detailu interpreta:** Přechod ze seznamu účinkujících na profil s biografií, žánrem, zemí původu a navázaným časovým rozpisem.
- **Kontrola dostupnosti a vybavenosti scény:** Zobrazení kapacity, bezbariérového přístupu a navazujícího programu konkrétní stage.
- **Ověření praktických informací a ceníku:** Zjištění cenových kategorií vstupenek, MHD spojení (tram/metro Nádraží Holešovice) a festivalového řádu.

---

## 3. Cílové skupiny a uživatelské persony

Pro návrh informační architektury a interaktivních funkcí byly definovány 3 detailní uživatelské persony reprezentující klíčové návštěvnické segmenty:

### 3.1 Persona 1: Tereza Novotná – Student Indie Fan (Primární persona)
- **Věk:** 24 let  
- **Role:** Studentka VŠ (ČZU PEF), brigádnice v digitální agentuře  
- **Vztah k technologiím:** Velmi vysoký (Digital native, smartphone stále v ruce)  
- **Primární zařízení:** Apple iPhone 13 (Safari mobile, 390×844 px), mobilní LTE/5G  
- **Profil a chování:**
  - Pravidelně navštěvuje kluby a letní open-air festivaly.
  - Na festivalu je v neustálém pohybu s přáteli, web používá přímo na cestě v tramvaji a v areálu mezi stánky.
  - Nechce instalovat další jednoúčelovou nativní aplikaci, očekává okamžitě fungující mobilní web.
- **Cíle a potřeby:**
  - Bleskově zjistit, kdo hraje v pátek večer na indie scéně.
  - Najít oblíbené kapely (např. *Lunar Tides*, *Velvet Horizon*) a zjistit přesný čas vystoupení.
  - Zorientovat se během několika sekund v přítmí areálu bez oslnění (vyžaduje tmavý režim).
- **Frustrace a překážky:**
  - Pomalé mobilní weby s těžkými frameworky, které na přeplněné festivalové BTS síti zamrzají.
  - Složité vícenásobné formuláře a nepřehledné PDF harmonogramy, které nelze na mobilu číst.

### 3.2 Persona 2: Jakub Kovář – Electronic Music Enthusiast & Professional (Sekundární persona)
- **Věk:** 29 let  
- **Role:** IT systémový analytik a amatérský producent elektronické hudby  
- **Vztah k technologiím:** Profesionální (desktop power user, dbá na efektivitu a přesnost)  
- **Primární zařízení:** Dell XPS 15 (Chrome desktop, 1920×1080 px) při plánování doma; Nothing Phone (Chrome mobile) v areálu  
- **Profil a chování:**
  - Plánuje festivalový harmonogram s předstihem týdnů.
  - Má vytipované konkrétní producenty elektronické hudby a sound design workshopy ve *Forum Hall*.
  - Sestavuje si striktní časový rozvrh, aby stihl jak klíčové noční sety na *Riverside Club Stage*, tak denní odborné panely.
- **Cíle a potřeby:**
  - Sestavit si personalizovaný rozvrh („Můj program“) uložený spolehlivě v zařízení.
  - Získat automatické varování, pokud si naplánuje dvě překrývající se akce na různých pódiích.
  - Přečíst si podrobné anotace workshopů a biografie producentů předem na velkém monitoru.
- **Frustrace a překážky:**
  - Chybějící informace o přesném začátku a konci vystoupení.
  - Weby, které po zavření záložky ztratí rozpracovaný výběr oblíbených interpretů.
  - Přehlédnutí časových překryvů vedoucí ke zmeškání headlinera.

### 3.3 Persona 3: Martin Dvořák – Family Visitor & Wheelchair Accessibility Guest (Terciární persona)
- **Věk:** 35 let  
- **Role:** Projektový manažer, festival navštěvuje s manželkou a pětiletou dcerou  
- **Specifické potřeby:** Pohybuje se na elektrickém invalidním vozíku; rodina s dětským kočárkem  
- **Vztah k technologiím:** Průměrný až pokročilý, využívá asistivní technologie a klávesovou navigaci  
- **Primární zařízení:** Apple iPad Air (Safari tablet, 820×1180 px) a Samsung Galaxy S22  
- **Profil a chování:**
  - Pečlivě zvažuje návštěvu hromadných akcí podle bezbariérovosti a komfortu rodiny.
  - Zajímají ho odpolední koncerty world music, akustické sety a rodinné zázemí.
  - Potřebuje 100% jistotu ohledně logistiky: povrch tras, dostupnost ramp, vyhrazená parkovací místa pro držitele průkazu ZTP/P a hygienická zařízení.
- **Cíle a potřeby:**
  - Zjistit konkrétní bezbariérovost všech 3 scén (rampy, vyvýšené plošiny, asistované vstupy).
  - Prověřit dopravní dostupnost (nízkopodlažní tramvaje Výstaviště, parkoviště P1 pro ZTP).
  - Procházet web snadno pomocí klávesnice s vysoce kontrastním textem splňujícím normu WCAG AA.
- **Frustrace a překážky:**
  - Vágne deklarovaná bezbariérovost typu „areál je přístupný“, která v praxi znamená schody bez nájezdu.
  - Nečitelné texty s nízkým kontrastem a chybějící viditelné fokusy při ovládání tabulátorem.

---

## 4. Informační architektura (IA)

### 4.1 Hierarchická mapa stránek (Sitemap & Component Map)

```text
===================================================================================
                       HUDEBNÍ FESTIVAL AURORA 2026 - WEB ARCHITECTURE
===================================================================================

[ Globální hlavička: Logo/Brand | Navigace | Fulltext Search | ★ Můj program čítač ]
                                       │
        ┌──────────────┬───────────────┼───────────────┬──────────────┬─────────────┐
        │              │               │               │              │             │
        ▼              ▼               ▼               ▼              ▼             ▼
   index.html     program.html  performers.html   venues.html  practical-info  search.html
  (Úvodní str.)   (Harmonogram)  (Katalog 60)    (3 Scény)      (FAQ, Logistika) (Fulltext)
        │              │               │               │              │             │
        ├─ Hero odpočet├─ Den (1,2,3)  ├─ Žánrový filtr├─ v1 Main     ├─ Doprava    ├─ Dynamic
        ├─ Headlinery  ├─ Scéna (v1..3)├─ 60 karet     ├─ v2 Riverside├─ Vstupenky  │  Query
        ├─ 3 Scény     ├─ Typ (k,t,w)  └───────┬───────┤├─ v3 Forum   ├─ Bezbar.    ├─ Grouped
        └─ Rozcestník  ├─ Live Search          │       │└─ Rozpis     ├─ FAQ Acc.   │  Results
                       ├─ ★ Můj program        │       │   akcí       └─ Kontakty   └─ Deep
                       ├─ Clash alert          │       │                               Links
                       └─ 60 položek           ▼       ▼
                                       performer-detail.html?id=p...
                                       (Parametrický profil, Bio, Žánr,
                                        Země, Časová osa koncertů umělce)
                                       │
[ Globální patička: Sémantické copyright, kontakty, bezbariérovost, Schema.org ]
===================================================================================
```

### 4.2 Relační datový tok mezi entitami

Informační architektura je plně relačně provázána bez slepých uliček:

```text
  ┌──────────────────────────────────────────────────────────────┐
  │                 FESTIVAL (Aurora 2026)                       │
  └──────────────┬──────────────────────────────┬────────────────┘
                 │ 1:3                          │ 1:60
                 ▼                              ▼
  ┌──────────────────────────────┐    ┌──────────────────────────────┐
  │        VENUES (v1..v3)       │    │     PERFORMERS (p1..p60)     │
  │ id, name, capacity, access   │    │ id, name, genre, country     │
  └──────────────┬───────────────┘    └──────────────┬───────────────┘
                 │ 1:N                               │ 1:N
                 │                                   │
                 └──────────────► ┌──────────────────◄
                                  │   EVENTS (e1..e60)           │
                                  │ id, title, day, startTime,   │
                                  │ durationMin, type, venueId,  │
                                  │ performerId, description     │
                                  └──────────────────────────────┘
```

### 4.3 Navigační standardy a prostorová orientace
- **Globální hlavička (`header.site-header`):** Připíchnutá nahoře (`position: sticky`), obsahuje logo s návratem na úvod, 5 navigačních odkazů a akcentované tlačítko pro *Můj program* s čítačem položek v `localStorage`.
- **Drobečková navigace (`nav.breadcrumb`):** Umístěna pod hlavičkou na všech podstránkách s atributem `aria-label="Drobečková navigace"`. Umožňuje přesnou prostorovou orientaci (např. *Úvod > Program* nebo *Úvod > Účinkující > Solar Waves*).
- **Křížové hypertextové vazby:**
  - Kliknutí na interpreta v programu přenese uživatele na jeho profil `performer-detail.html?id=p...`.
  - Kliknutí na scénu v programu nebo detailu interpreta přenese uživatele na kotvu `venues.html#v...`.
  - Ze stránky scén se uživatel dostane přímo na program konkrétního pódia.

---

## 5. Klíčové uživatelské scénáře

### Scénář 1: Plánování zahájení festivalu podle oblíbeného žánru (Tereza Novotná)
- **Typ uživatele:** Aktivní studentka / fanoušek nezávislé scény (Persona 1).
- **Cíl:** Zjistit, kteří indie a elektroničtí interpreti vystupují ve čtvrtek 20. 8. na zahájení festivalu, vybrat konkrétní koncerty a uložit je do svého programu.
- **Výchozí situace:** Tereza sedí ve čtvrtek dopoledne v tramvaji na lince 17 směr Výstaviště, otevírá web na mobilním telefonu v prohlížeči Safari.
- **Kroky průchodu scénářem:**
  1. **Vstup:** Tereza otevře hlavní stránku `index.html`, v navigačním menu klepne na položku **Program**.
  2. **Filtrace dne:** V horní liště výběru dne klepne na čip **„Čtvrtek 20. 8.“**. Harmonogram se okamžitě překreslí na čtvrteční položky.
  3. **Vyhledání žánru:** Do vyhledávacího pole napíše výraz *„indie“* (případně využije filtr žánru).
  4. **Zobrazení výsledků:** Seznam se okamžitě zúží na relevantní vystoupení; počítadlo výsledků indikuje nalezené shody.
  5. **Detail vystoupení:** Klepne na kartu koncertu kapely *Lunar Tides* (10:00–11:15, *Aurora Main Stage*). Zobrazí se parametrický detail `performer-detail.html?id=p1` s kompletní biografií.
  6. **Uložení:** Přímo z detailu přidá koncert tlačítkem **★ Přidat do mého programu** do své osobní agendy.
- **Očekávaný výsledek:** Během 20 sekund má Tereza vybraný klíčový úvodní koncert kapely Lunar Tides a uložený v lokální paměti mobilu bez registrace či stahování externích aplikací.

### Scénář 2: Sestavení osobního rozvrhu a vyřešení časové kolize (Jakub Kovář)
- **Typ uživatele:** IT analytik / fanoušek elektronické hudby a workshopů (Persona 2).
- **Cíl:** Sestavit si sobotní rozvrh vystoupení, ověřit návaznost a vyřešit případnou časovou kolizi mezi klubovým setem a vystoupením ve Forum Hall.
- **Výchozí situace:** Jakub sedí u notebooku s externím monitorem, má otevřenou stránku `program.html` a plánuje sobotní den.
- **Kroky průchodu scénářem:**
  1. **Výběr dne:** Zvolí filtr **„Sobota 22. 8.“**.
  2. **Výběr akcí:** Postupně kliká na tlačítko **★ Přidat do mého programu** u klubového koncertu *Rain Motel Live* na *Riverside Club Stage* (10:00–11:15, `e41`) a u koncertu *Lunar District Live* ve *Forum Hall* (10:00–11:15, `e51`).
  3. **Detekce kolize:** Algoritmus v `schedule.js` okamžitě po přidání druhého souběžného slotu vyhodnotí překryv časových intervalů.
  4. **Upozornění:** Nad harmonogramem se okamžitě zobrazí kontrastní varovný panel s ikonou varování a textem:  
     *„Upozornění na časový konflikt: Máte vybrány akce s překrývajícím se časem! Překryv: 75 minut.“* a obě karty událostí získají varovný rámeček a odznak *⚠️ Časová kolize v mém programu!*.
  5. **Vyřešení konfliktu:** Jakub přepne pohled tlačítkem **★ Zobrazit pouze můj program**. Vidí obě kolidující akce označené varovným rámečkem.
  6. **Odebrání:** Klikne na tlačítko odebrání u jednoho z koncertů. Varovný pruh i rámeček okamžitě zmizí a harmonogram se stává bezkolizním.
- **Očekávaný výsledek:** Jakub má v `localStorage` bezpečně uložen reálný bezkolizní program pro sobotu, který si může na festivalu otevřít na svém mobilním telefonu.

### Scénář 3: Prověření bezbariérovosti a logistiky areálu (Martin Dvořák)
- **Typ uživatele:** Návštěvník na elektrickém vozíku s rodinou (Persona 3).
- **Cíl:** Prověřit dostupnost haly *Forum Hall*, zjistit stav ramp, bezbariérových toalet a ověřit možnost parkování pro držitele ZTP/P na Výstavišti.
- **Výchozí situace:** Martin plánuje rodinný výlet z domova na tabletu iPad Air, orientuje se pomocí dotykového ovládání a klávesnice.
- **Kroky průchodu scénářem:**
  1. **Vstup na scény:** V hlavní navigaci vybere sekci **Scény** (`venues.html`).
  2. **Inspekce Forum Hall:** V přehledu 3 scén lokalizuje kartu *Forum Hall (Kapacita 1 300)*.
  3. **Prověření parametrů přístupnosti:** V parametrech scény ověří: *100% bezbariérový přístup, nájezdová rampa se sklonem < 6 %, vyhrazená místa pro vozíčkáře v předních řadách, přímá návaznost na bezbariérové toalety*.
  4. **Ověření dopravy a parkování:** Klikne na navigační odkaz **Praktické info** (`practical-info.html`).
  5. **Interaktivní FAQ a sekce Bezbariérovost:** Otevře sémantický akordeon `<details>` *„Bezbariérový přístup a servis pro ZTP/P“* a ověří bezplatné parkování na ploše P1 u jižní brány Výstaviště a nízkopodlažní tramvaje linky 6, 12 a 17.
- **Očekávaný výsledek:** Martin získává jednoznačné a ověřené logistické informace o bezbariérovém zázemí festivalu, které mu umožňují bezpečně naplánovat účast celé rodiny.

---

## 6. Datová základna (`data.json`) – Parametry a integrita

Projekt je vystavěn nad striktní klientskou datovou základnou `data.json` (a synchronním zrcadlem `web/js/data.js` pod globální proměnnou `window.FESTIVAL_DATA` eliminující CORS restrikce).

| Metrika databáze | Požadavek sylabu ČZU | Skutečný stav v projektu | Status integrity |
|---|---|---|---|
| **Počet festivalových dnů** | min. 3 dny | Přesně 3 dny (20. 8., 21. 8., 22. 8. 2026) | 100% SHODA |
| **Počet festivalových scén** | min. 2 scény | Přesně 3 scény (`v1`, `v2`, `v3`) | 100% SHODA |
| **Počet unikátních interpretů** | min. 60 interpretů | Přesně 60 interpretů (`p1` až `p60`) | 100% SHODA |
| **Počet programových položek** | min. 60 položek | Přesně 60 položek (`e1` až `e60`) | 100% SHODA |
| **Referenční integrita cizích klíčů** | 100% platné vazby | Všechna `performerId` a `venueId` v `events` validně existují v kolekcích | 100% INTEGRITA |
| **Časoprostorová nekoliznost scén** | 0 překryvů na téže scéně | Na každé scéně platí: $\text{konec}_A \le \text{začátek}_B$ pro stejný den | 100% BEZKOLIZNÍ |
| **Offline dostupnost bez CORS** | Běh přes `file:///` | Zajištěno synchronním in-memory adaptérem | 100% OFFLINE READY |

---

## 7. Závaznost specifikace a pravidla změn (PEF ČZU)

Dle oficiálních pravidel předmětu Web design (WEB) na PEF ČZU je tato specifikace společně s prototypem **závazným východiskem semestrálního projektu**.
- Veškeré další úpravy v fázích Cvičení 3 až 6 smějí dosáhnout maximálně **cca 15 %** původního návrhu.
- Každá změna musí být formálně zdůvodněna v průběžných zprávách (`progress-03.md`, `progress-04.md`) na základě výsledků uživatelského testování, validace, expertní oponentury nebo konzultace s vyučujícím.

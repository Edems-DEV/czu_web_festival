# Expertní hodnocení a křížové peer review (Cross-Review)

**Předmět:** Web design (WEB) | PEF Česká zemědělská univerzita v Praze  
**Výstup pro:** Cvičení 6 – Cross-review (Expertní hodnocení studentského projektu)  
**Hodnotící tým:** Tým projektu Hudební Festival Aurora 2026 (Skupina 4 studentů, obor INFO / SyI)  
**Hodnocený projekt:** Studentský projekt **„SoundWave Festival 2026“** (Tým 7, Cvičení ST 10:30)  
**Datum hodnocení:** 2026-10-12  
**Status oponentury:** Dokončené formální expertní hodnocení  

---

## 1. Úvod a vymezení předmětu hodnocení

V souladu s harmonogramem semestrálního předmětu Web design (WEB) na PEF ČZU proběhlo po odevzdání review-ready verzí na Cvičení 5 vzájemné předání projektů mezi studentskými týmy k nezávislému expertnímu posouzení.

### 1.1 Předmět evaluace
Předmětem tohoto hodnocení je odevzdaná review-ready verze semestrálního projektu **SoundWave Festival 2026** (fiktivní multižánrový open-air festival v Praze-Troji), zahrnující:
- Kompletní složku klientské webové aplikace `web/` (HTML šablony, CSS styly, klientský JavaScript),
- Projektovou specifikaci `project-specification.md` s definovanými cíli, 3 personami a 2 klíčovými uživatelskými scénáři,
- Datovou základnu `data.json` obsahující deklarovaný harmonogram akcí a interprety.

### 1.2 Cíl oponentury
Cílem hodnocení je identifikovat použitelnostní bariéry, nedostatky v informační architektuře, navigační defekty, porušení standardů přístupnosti (WCAG 2.0 AA), slabá místa v responzivitě na mobilních zařízeních a stabilitu interaktivních funkcí. Nálezy jsou formulovány věcně, s jednoznačnými reprodukčními kroky a konstruktivními návrhy na nápravu pro finální odevzdání.

---

## 2. Použitá metodika hodnocení

Hodnocení bylo provedeno kombinací **dvou etablovaných formálních inspekčních metod**:

### 2.1 Metoda 1: Heuristická evaluace dle Jakoba Nielsena (10 Usability Heuristics)
Projekt byl systematicky analyzován čtyřmi nezávislými hodnotiteli na základě 10 univerzálních heuristických principů pro návrh uživatelských rozhraní (Nielsen, 1994):
1. **H1 – Viditelnost stavu systému (Visibility of system status):** Poskytuje web uživateli včasnou a srozumitelnou zpětnou vazbu o probíhajících akcích a aktuálním stavu?
2. **H2 – Shoda systému s reálným světem (Match between system and the real world):** Používá jazyk, koncepty a vizuální metafory srozumitelné festivalovým návštěvníkům?
3. **H3 – Uživatelská kontrola a svoboda (User control and freedom):** Umožňuje snadný návrat zpět, resetování filtrů a zrušení nechtěných akcí bez uvíznutí ve slepé uličce?
4. **H4 – Konzistence a standardy (Consistency and standards):** Zachovává jednotnou terminologii, vizuální prvky a standardní chování webových komponent?
5. **H5 – Prevence chyb (Error prevention):** Předchází rozhraní vzniku chyb (např. varováním před časovými kolizemi v harmonogramu, kontrolou vstupů)?
6. **H6 – Rozpoznání namísto vzpomínání (Recognition rather than recall):** Minimalizuje kognitivní zátěž uživatele viditelnými volbami, kontextovými nápovědami a drobečkovou navigací?
7. **H7 – Flexibilita a efektivita použití (Flexibility and efficiency of use):** Umožňuje rychlou práci začátečníkům i pokročilým uživatelům (klávesové zkratky, kombinované filtry, okamžité hledání)?
8. **H8 – Estetický a minimalistický design (Aesthetic and minimalist design):** Neobsahuje rozhraní irelevantní či rušivé prvky (AI slop, přemíru vizuálního smogu), je dodržena hierarchie?
9. **H9 – Pomoc uživatelům rozpoznat, diagnostikovat a zotavit se z chyb (Help users recognize, diagnose, and recover from errors):** Jsou chybová hlášení přesná, srozumitelná a nabízejí konkrétní řešení?
10. **H10 – Nápověda a dokumentace (Help and documentation):** Jsou praktické informace, doprava, areálový řád a FAQ snadno dohledatelné a strukturované?

### 2.2 Metoda 2: Kognitivní průchod (Cognitive Walkthrough)
Metoda kognitivního průchodu (Wharton et al., 1994) byla zaměřena na posouzení snadnosti osvojení rozhraní a mentálního modelu uživatele. Pro každý krok dvou povinných scénářů byly kladeny 4 fundamentální verifikační otázky:
- **Otázka 1:** Bude se uživatel snažit dosáhnout správného výsledku odpovídajícího danému kroku?
- **Otázka 2:** Všimne si uživatel ovládacího prvku, který danou akci umožňuje?
- **Otázka 3:** Spojí si uživatel význam nalezeného prvku s požadovaným krokem?
- **Otázka 4:** Obdrží uživatel po provedení akce jednoznačnou zpětnou vazbu, že postupuje ke svému cíli?

### 2.3 Klasifikace závažnosti nálezů (Severity Rating)
Všechny identifikované problémy byly kategorizovány do tří normativních úrovní závažnosti:

| Úroveň závažnosti | Definice a dopad na uživatele | Kritérium řešení |
|---|---|---|
| 🔴 **Kritický (Critical)** | Vada zcela blokuje dokončení primárního uživatelského scénáře, způsobuje pád aplikace, ztrátu dat, hrubou nekonzistenci databáze nebo fatální porušení přístupnosti znemožňující použití asistivní technologií. | Musí být bezpodmínečně opraveno před finálním odevzdáním. |
| 🟡 **Významný (Major)** | Způsobuje vysokou frustraci, kognitivní přetížení, porušení WCAG 2.0 AA (např. nedostatečný kontrast, neovladatelnost z klávesnice), ale uživatel je schopen úkol dokončit složitou oklikou. | Velmi doporučeno opravit v zájmu obhajoby projektu. |
| 🟢 **Drobný (Minor)** | Kosmetická, typografická nebo drobná rozvrhová nepřesnost, mírný rozptyl v odsazení prvků, neoptimální mikrointerakce, která nebrání plynulému použití. | Vhodné upravit v rámci finálního leštění UI. |

### 2.4 Metodika využití AI a lidská verifikace nálezů
V souladu se sylabem předmětu WEB byl proces oponentury podpořen asistencí generativní AI za striktního dodržení lidské odpovědnosti (Human-in-the-loop):
1. **K čemu bylo AI použito:** K sestavení inspekčního dotazníku pro 10 heuristik Jakoba Nielsena, k formátování markdown matice a k návrhu checklistu pro testování normy WCAG 2.0 AA.
2. **Jak byly výstupy AI ověřeny:** Každý nález byl osobně a manuálně otestován členy studentského týmu v reálném prohlížeči Google Chrome a Mozilla Firefox na souborovém protokolu `file:///`, na emulátoru mobilních zařízení (iPhone 13, Pixel 6) a ověřen exaktním kalkulátorem kontrastu WebAIM. Žádný výstup AI nebyl převzat bez přímého důkazu ve zdrojovém kódu či DOM stromu.
3. **Co bylo přijato:** Strukturovaný formát popisu nálezů (Závažnost, Dotčená heuristika, Metoda odhalení, Popis, Reprodukce, Dopad, Doporučení) a systematické mapování na Nielsenovy principy.
4. **Co bylo upraveno nebo odmítnuto:** AI halucinovalo absenci deklarace `<!DOCTYPE html>`, což byla nepravda (doctype byl na řádku 1). Dále AI navrhovalo vágní subjektivní soudy typu „zvolit modernější font“, což tým okamžitě vyřadil jako nepřípustný a neobjektivní komentář.
5. **Zjištěné limity a chyby AI:** AI nedokáže spolehlivě simulovat reálné offline podmínky běhu protokolu `file:///` bez webového serveru a má tendenci generovat falešně pozitivní zprávy o syntaxi bez porozumění kontextu klientské aplikace.

---

## 3. Pozitivní nálezy a silné stránky hodnoceného projektu

Před uvedením nedostatků vyzdvihujeme kvalitní aspekty práce oponentního týmu SoundWave Festival 2026:
1. **Atraktivní festivalový vizuální styl:** Úvodní stránka má moderní festivalovou atmosféru s funkčním hero bannerem a čistou typografickou hierarchií nadpisů `h1` až `h3`.
2. **Čisté sémantické rozvržení na úvodní stránce:** Použití tagů `<header>`, `<main>`, `<section>` a `<footer>` je příkladné a odpovídá living standardu HTML5.
3. **Bleskové načítání statických aktiv:** Aplikace neobsahuje zbytečné megabajtové externí knihovny ani pomalé skripty, načítá se bleskově.
4. **Responzivní grid interpretů na desktopu:** Seznam účinkujících na širokoúhlých monitorech využívá přehledné dvousloupcové až třísloupcové rozvržení.

---

## 4. Výsledky kognitivního průchodu klíčovými scénáři

### 4.1 Scénář A: Výběr pátečního večerního koncertu podle žánru na mobilním telefonu
- **Persona:** Klára (22 let, studentka, mobilní uživatelka).
- **Cíl:** Nalézt elektronické vystoupení na pátek po 20:00 a přidat jej do oblíbených.
- **Krok 1 (Otevření programu):** Uživatelka klepe na hamburger menu. Menu se rozbalí, odkaz na Program je zřetelný. *(Odpovědi Q1: ANO, Q2: ANO, Q3: ANO, Q4: ANO).*
- **Krok 2 (Výběr pátku):** Klepnutí na záložku „Pátek“. Stránka načte páteční harmonogram. *(Q1: ANO, Q2: ANO, Q3: ANO, Q4: ANO).*
- **Krok 3 (Filtrace žánru / času):** Uživatelka hledá filtr žánru „Elektronika“. V rozhraní se však nachází pouze rozbalovací roleta scén, nikoliv žánrů. Uživatelka je nucena manuálně skrolovat celým dnem. *(Q1: ANO, Q2: NE – ovládací prvek pro žánr chybí, Q3: N/A, Q4: Selhání – nutnost mentálního skenování celého seznamu).*
- **Krok 4 (Uložení koncertu):** Uživatelka nachází vystoupení producenta v 21:00 a kliká na ikonu srdíčka. Srdíčko změní barvu, avšak v hlavičce webu nevznikne žádný čítač a po obnovení stránky (F5) je stav srdíčka ztracen. *(Q1: ANO, Q2: ANO, Q3: ANO, Q4: ČÁSTEČNĚ – vizuální změna ano, perzistence NE).*

### 4.2 Scénář B: Prověření bezbariérovosti a dopravy pro návštěvníka se specifickými potřebami
- **Persona:** Jan (38 let, návštěvník s omezenou schopností pohybu, elektrický vozík).
- **Cíl:** Zjistit přístupnost kryté scény a umístění vyhrazených toalet a parkoviště.
- **Krok 1 (Hledání praktických informací):** Uživatel kliká v navigaci na „Info“. Otevře se dlouhý textový dokument bez záložek a bez vnitřního vyhledávání. *(Q1: ANO, Q2: ANO, Q3: ANO, Q4: ANO).*
- **Krok 2 (Lokalizace bezbariérovosti):** Uživatel skroluje na konec stránky, kde nachází jedinou větu: *„Areál v Troji je z velké části travnatý a přístupný.“* Chybí jakákoliv specifikace sklonu ramp, vyhrazených plošin na pódiích či parkovacích míst ZTP. *(Q1: ANO, Q2: NE – konkrétní fakta chybí, Q3: NE, Q4: Frustrace a nejistota).*
- **Krok 3 (Prověření scény):** Uživatel přechází na kartu scén. U haly „Warehouse Stage“ není o bezbariérovém vchodu žádná zmínka. *(Q1: ANO, Q2: NE, Q3: NE, Q4: Selhání).*

---

## 5. Podrobný katalog identifikovaných nálezů

### 5.1 Kritické nálezy 🔴

#### Nález REV-01: Absence perzistence osobního programu v localStorage a nulová detekce časových kolizí
- **Závažnost:** 🔴 **Kritický**
- **Dotčená heuristika:** **H5 (Prevence chyb)**, **H7 (Efektivita použití)**
- **Metoda odhalení:** Kognitivní průchod Scénářem A, technická inspekce kódu `app.js`
- **Popis problému:**
  Tlačítko pro přidání akce do oblíbených mění pouze lokální třídu `.is-active` v DOMu aktuálně zobrazené stránky. Skript neukládá vybraná ID do `localStorage`. Jakmile uživatel přejde na detail interpreta nebo obnoví stránku, jeho výběr je nenávratně ztracen. Navíc systém zcela postrádá logiku detekce časových překryvů – uživatel si může naklikat 5 akcí probíhajících ve stejném čase a systém jej nijak nevaruje.
- **Kroky k reprodukci:**
  1. Otevřít `program.html`.
  2. Kliknout na ikonu oblíbených u dvou překrývajících se koncertů v pátek od 18:00 (Stage 1 a Stage 2).
  3. Pozorovat absenci jakéhokoliv varování.
  4. Stisknout klávesu `F5` (obnovení stránky).
  5. Obě položky jsou odznačeny, výběr zanikl.
- **Dopad na uživatele:**
  Uživatel ztrácí veškerou práci s plánováním festivalu; hrozí, že na místě zmešká headlinera kvůli nediagnostikované kolizi programů. Nesplňuje požadavek zadání na plnohodnotnou interaktivní funkci osobního harmonogramu.
- **Doporučené řešení:**
  Implementovat perzistentní ukládání vybraných ID akcí do `window.localStorage` (např. pod klíčem `soundwave_favorites`). Při každé změně spustit funkci, která seřadí oblíbené chronologicky a porovná `startTime + duration` předchozí akce se `startTime` následující akce ve stejném dni. Při kolizi zobrazit kontrastní varovný pruh s vyčíslením překryvu v minutách.

---

#### Nález REV-02: Referenční diskrepance v databázi a nefunkční dynamické detaily interpretů
- **Závažnost:** 🔴 **Kritický**
- **Dotčená heuristika:** **H1 (Viditelnost stavu systému)**, **H4 (Konzistence a standardy)**
- **Metoda odhalení:** Analýza integrity `data.json` vs. `performer-detail.html`
- **Popis problému:**
  U osmi interpretů (např. interpret s ID `p14` a `p27`) odkazuje karta v programu na neexistující ID nebo generuje prázdnou stránku `performer-detail.html?id=undefined`. Navíc čas vystoupení kapely „Waveform Echo“ je v `data.json` v harmonogramu uveden na 19:30, zatímco na statické stránce detailu kapely je uveden čas 21:00 na jiné scéně.
- **Kroky k reprodukci:**
  1. Na stránce `program.html` kliknout na název interpreta `p14`.
  2. Prohlížeč otevře URL `performer-detail.html?id=undefined`.
  3. Na stránce se zobrazí prázdný layout s chybou v konzoli: `TypeError: Cannot read properties of undefined (reading 'name')`.
- **Dopad na uživatele:**
  Slepá navigační ulička a pád skriptu; uživatel nezíská informace o interpretovi a musí se vracet tlačítkem Zpět v prohlížeči.
- **Doporučené řešení:**
  Opravit generování hypertextových odkazů v šabloně tak, aby striktně předávaly validní ID z datového pole (`?id=${performer.id}`). Provést audit časů napříč `data.json` a šablonami pro zajištění 100% referenční konzistence.

---

### 5.2 Významné nálezy 🟡

#### Nález REV-03: Závažné porušení kontrastu textu vůči pozadí dle normy WCAG 2.0 AA
- **Závažnost:** 🟡 **Významný**
- **Dotčená heuristika:** **H8 (Estetický design)**, **WCAG 2.0 AA – Kritérium 1.4.3 (Kontrast)**
- **Metoda odhalení:** Audit nástrojem WebAIM Contrast Checker a Chrome DevTools Lighthouse
- **Popis problému:**
  Tmavý režim webu používá tmavě šedé pozadí karet `#18181b`. Sekundární texty (časy vystoupení, žánrové popisky, anotace scén) jsou vysázeny barvou `#71717a`.
  - **Naměřený kontrastní poměr:** **3.38 : 1**
  - **Požadavek normy WCAG 2.0 AA pro běžný text:** minimálně **4.50 : 1** (pro velký text 3.0 : 1).
  Tento poměr představuje hrubé selhání přístupnosti. Text je na slunci v exteriéru prakticky nečitelný.
- **Kroky k reprodukci:**
  1. Změřit barvu pozadí karty (`#18181b`) a barvu textu anotace (`#71717a`).
  2. Vložit hodnoty do kalkulátoru kontrastu WebAIM.
  3. Výsledek hlásí FAIL pro WCAG AA Normal Text.
- **Dopad na uživatele:**
  Slabozrací návštěvníci a uživatelé sledující web na displeji mobilního telefonu za denního světla na festivalu nejsou schopni přečíst klíčové časy začátků koncertů.
- **Doporučené řešení:**
  Upravit CSS design token pro sekundární text z `#71717a` na světlejší odstín, např. `#a1a1aa` (kontrast **6.2:1**, vyhovuje AA) nebo `#e4e4e7` (kontrast **11.5:1**, vyhovuje AAA).

---

#### Nález REV-04: Rigidní jednoúrovňový filtr programu a absence stavu nulových výsledků (Empty State)
- **Závažnost:** 🟡 **Významný**
- **Dotčená heuristika:** **H3 (Uživatelská svoboda)**, **H6 (Rozpoznání namísto vzpomínání)**, **H9 (Zotavení z chyb)**
- **Metoda odhalení:** Testování kombinatoriky filtrů na stránce `program.html`
- **Popis problému:**
  Filtrování v programu umožňuje vybrat buď pouze den, NEBO pouze scénu. Jakmile uživatel klikne na scénu, resetuje se volba dne a zobrazí se všechny tři dny dané scény naráz. Není možné zobrazit např. *„Pátek na Main Stage“*. Pokud uživatel do vyhledávacího pole napíše řetězec, který žádná položka neobsahuje, plocha programu zůstane zcela prázdná bez jakéhokoliv vysvětlujícího textu či možnosti resetu.
- **Kroky k reprodukci:**
  1. Zvolit den „Pátek“.
  2. Následně zvolit scénu „Main Stage“ – systém zruší filtr pátku.
  3. Do vyhledávání zadat „xyz123“.
  4. Obrazovka zůstane prázdná, uživatel neví, zda aplikace nezamrzla.
- **Dopad na uživatele:**
  Nemožnost efektivně zúžit program při plánování návštěvy konkrétního pódia v konkrétní den; pocit poruchy aplikace při prázdném výsledku.
- **Doporučené řešení:**
  Přepracovat stavový objekt filtrů na logický součin: `day === selectedDay && venue === selectedVenue && matchesQuery`. Doplnit prázdný stav s textem *„Žádná vystoupení neodpovídají zadaným kritériím“* a akčním tlačítkem pro reset filtrů.

---

#### Nález REV-05: Absence konkrétních bezbariérových a logistických informací pro osoby se sníženou pohyblivostí
- **Závažnost:** 🟡 **Významný**
- **Dotčená heuristika:** **H2 (Shoda s reálným světem)**, **H10 (Nápověda a dokumentace)**
- **Metoda odhalení:** Kognitivní průchod Scénářem B, inspekce `practical-info.html`
- **Popis problému:**
  Informace o bezbariérovém přístupu jsou vágní a generické. Chybí informace o povaze terénu (travnaté plochy vs. zpevněné asfaltové koridory), přesném umístění bezbariérových toalet a podmínkách parkování pro držitele průkazů ZTP a ZTP/P. Scény nemají uvedeno, zda disponují vyvýšenou plošinou pro vozíčkáře s výhledem na pódium.
- **Kroky k reprodukci:**
  1. Otevřít stránku `practical-info.html`.
  2. Vyhledat sekci bezbariérovosti.
  3. Text obsahuje pouze vágní proklamaci bez konkrétních údajů.
- **Dopad na uživatele:**
  Návštěvníci s tělesným postižením či rodiče s dětskými kočárky nemohou spolehlivě naplánovat návštěvu areálu a jsou vystaveni riziku nedostupnosti prostor.
- **Doporučené řešení:**
  Vytvořit dedikovanou sekci nebo akordeon s přesnými logistickými fakty: parametry ramp (sklon v %), mapa bezbariérových toalet, vyhrazená parkovací stání ZTP/P u konkrétní vstupní brány a kontaktní asistenční telefonní linka.

---

#### Nález REV-06: Mobilní navigační menu překrývá obsah a postrádá korektní klávesovou přístupnost a trap focus
- **Závažnost:** 🟡 **Významný**
- **Dotčená heuristika:** **H3 (Uživatelská kontrola)**, **H7 (Efektivita použití)**, **WCAG 2.1 (Klávesnice)**
- **Metoda odhalení:** Testování mobilního hamburger menu na emulátoru iPhone 13 a klávesnicí Tab
- **Popis problému:**
  Mobilní navigace se vysouvá shora, ale postrádá atribut `aria-expanded` na spouštěcím tlačítku. Při otevřeném menu zůstává fokus klávesnice v pozadí stránky za rozbaleným panelem (focus leak). Menu nelze zavřít stiskem klávesy `Escape` ani klepnutím do ztmavlé plochy mimo menu.
- **Kroky k reprodukci:**
  1. Nastavit viewport na 375 px šířky.
  2. Otevřít mobilní menu tlačítkem hamburger.
  3. Stisknout klávesu `Tab` – fokus přeskakuje na skryté odkazy na pozadí pod menu.
  4. Stisknout klávesu `Escape` – menu se nezavře.
- **Dopad na uživatele:**
  Uživatelé spoléhající na klávesnici nebo čtečku obrazovky na mobilu se v rozhraní ztratí a nemohou menu pohodlně opustit.
- **Doporučené řešení:**
  Přidat na tlačítko menu `aria-expanded="false/true"`, zavírat menu na událost klávesy `Escape` a kliknutí mimo kontejner menu, a omezit cyklování fokusu (focus trap) uvnitř otevřené nabídky.

---

### 5.3 Drobné nálezy 🟢

#### Nález REV-07: Nekonzistentní formátování časových údajů napříč podstránkami
- **Závažnost:** 🟢 **Drobný**
- **Dotčená heuristika:** **H4 (Konzistence a standardy)**
- **Metoda odhalení:** Vizuální křížová kontrola formátování v šablonách `program.html` a `performer-detail.html`
- **Popis problému:**
  Na stránce `program.html` jsou časy uváděny v evropském 24hodinovém formátu (např. `14:30 – 15:45`), zatímco na stránce `performer-detail.html` jsou u vystoupení použity anglosaské formáty `2:30 PM`.
- **Kroky k reprodukci:**
  1. Otevřít `program.html` a zkontrolovat čas vystoupení kapely (např. 14:30).
  2. Rozkliknout detail dané kapely na `performer-detail.html`.
  3. V poli harmonogramu interpreta je uveden čas `2:30 PM`.
- **Dopad na uživatele:**
  Mírná kognitivní diskrepance a nejednotnost v lokalizaci českého festivalového rozhraní.
- **Doporučené řešení:**
  Sjednotit veškeré časové údaje v české jazykové mutaci na jednotný standard `HH:MM` (24h formát).

---

#### Nález REV-08: Absence podpory snížení pohybu (`prefers-reduced-motion`) u animovaného hero podkresu
- **Závažnost:** 🟢 **Drobný**
- **Dotčená heuristika:** **H8 (Estetický design)**, **WCAG 2.0 – Kritérium 2.3.3**
- **Metoda odhalení:** Audit přístupnosti v emulaci `@media (prefers-reduced-motion: reduce)` v Chrome DevTools Rendering
- **Popis problému:**
  Na úvodní stránce běží plynulý CSS barevný gradient v pozadí hero sekce (`animation: gradientShift 8s infinite ease`). Kaskádový styl neobsahuje media query `@media (prefers-reduced-motion: reduce)`, které by tuto animaci zastavilo pro uživatele s vestibulárními poruchami.
- **Kroky k reprodukci:**
  1. V Chrome DevTools otevřít panel Rendering a zapnout volbu *Emulate CSS media feature prefers-reduced-motion: reduce*.
  2. Otevřít `index.html`.
  3. Hero podkres stále kontinuálně animuje gradient.
- **Dopad na uživatele:**
  U citlivých osob s vestibulárním syndromem či kinetózou může nekonečný pohyb na pozadí vyvolávat nevolnost či závratě.
- **Doporučené řešení:**
  Přidat do souboru stylů standardní pravidlo potlačující CSS animace a přechody při aktivní volbě redukce pohybu v operačním systému.

---

#### Nález REV-09: Chybějící drobečková navigace (breadcrumbs) na detailních podstránkách
- **Závažnost:** 🟢 **Drobný**
- **Dotčená heuristika:** **H6 (Rozpoznání namísto vzpomínání)**
- **Metoda odhalení:** Inspekce informační architektury a orientačních prvků v DOMu detailních stránek
- **Popis problému:**
  Při příchodu na profil interpreta `performer-detail.html` chybí drobečková lišta indikující cestu *Úvod > Účinkující > Název kapely*. Uživatel se musí orientovat pouze pomocí obecné globální hlavičky.
- **Kroky k reprodukci:**
  1. Z vyhledávání nebo programu přejít přímo na URL `performer-detail.html?id=p1`.
  2. Podívat se na záhlaví stránky pod primární navigací.
  3. Chybí drobečková cesta usnadňující návrat o úroveň výše bez použití tlačítka Zpět v prohlížeči.
- **Dopad na uživatele:**
  Horší prostorová orientace v hierarchii webu při přímém příchodu z externího odkazu nebo výsledků vyhledávání.
- **Doporučené řešení:**
  Doplnit sémantický prvek `<nav class="breadcrumb" aria-label="Drobečková navigace">` pod globální hlavičku na všech podstránkách.

---

## 6. Souhrnná matice nálezů a doporučení

| ID | Oblast / Komponenta | Heuristika / Metoda | Závažnost | Klíčové doporučení k nápravě |
|---|---|---|---|---|
| **REV-01** | Osobní program / Harmonogram | H5, H7 (Prevence chyb) | 🔴 **Kritický** | Ukládat oblíbené do `localStorage`, implementovat výpočet kolizí časů s výstražným panelem. |
| **REV-02** | Datová vrstva / Detaily kapel | H1, H4 (Konzistence) | 🔴 **Kritický** | Opravit předávání parametrů `?id=...`, synchronizovat časy v `data.json` a šablonách. |
| **REV-03** | Typografie / CSS Design tokeny | WCAG AA 1.4.3 (Kontrast) | 🟡 **Významný** | Nahradit barvu textu `#71717a` světlejším odstínem `#a1a1aa` (kontrast $\ge 4.5:1$). |
| **REV-04** | Filtrační panel v programu | H3, H6, H9 (Filtry) | 🟡 **Významný** | Umožnit současnou filtraci dne i scény, doplnit prázdný stav s resetem filtrů. |
| **REV-05** | Praktické info / Přístupnost | H2, H10 (Dokumentace) | 🟡 **Významný** | Doplnit konkrétní fakta: rampy, ZTP parkování P1, vyvýšené plošiny u pódií. |
| **REV-06** | Mobilní navigace (Hamburger) | H3, H7, WCAG (Klávesnice) | 🟡 **Významný** | Doplnit `aria-expanded`, reakci na klávesu Escape a uzavření při kliknutí mimo panel. |
| **REV-07** | Formátování času | H4 (Konzistence standardů) | 🟢 **Drobný** | Sjednotit všechny časy na standardní 24h formát `HH:MM`. |
| **REV-08** | CSS animace pozadí | H8, WCAG (Reduced motion) | 🟢 **Drobný** | Zahrnout `@media (prefers-reduced-motion: reduce)` pro potlačení plynulých animací. |
| **REV-09** | Prostorová orientace | H6 (Rozpoznání v UI) | 🟢 **Drobný** | Doplnit sémantickou drobečkovou navigaci (`<nav class="breadcrumb">`) na podstránky. |

---

## 7. Závěrečné zhodnocení a doporučení oponenta

Projekt **SoundWave Festival 2026** disponuje velmi solidním vizuálním základem a čistou architekturou šablon na úvodní stránce. Hlavní slabiny, které brání plnému hodnocení review-ready verze, spočívají v:
1. **Nekompletní perzistenci osobního programu** a chybějící detekci kolizí, což představuje klíčovou interaktivní funkci předepsanou sylabem.
2. **Přístupnostních defektech (kontrast textu 3.38:1)**, které jsou v rozporu se standardem WCAG 2.0 AA.
3. **Datové nekonzistenci odkazů na detail interpreta**.

Doporučujeme oponentnímu týmu zaměřit úsilí před finálním odevzdáním primárně na vyřešení kritických nálezů **REV-01** a **REV-02** a významného nálezu **REV-03**. Tím projekt získá vysokou úroveň technické robustnosti i uživatelského komfortu.

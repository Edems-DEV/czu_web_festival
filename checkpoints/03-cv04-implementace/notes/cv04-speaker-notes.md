# Tahák pro mluvčího – Prezentace Cvičení 4 (WEB ČZU)

Předmět: **Web design (WEB)** | PEF ČZU v Praze  
Milník: **Cvičení 4 – Průchod scénáři, implementace a UX/Design trendy**  
Časový limit: **3 až 5 minut**  
Doporučený čas řeči: **3:45 – 4:15 min** (ponechává bezpečnou rezervu pro dotazy a diskuzi).

---

## ⏱️ Minutový harmonogram řeči

```
[0:00 - 0:45] Slide 1 & 2: Úvod a rozsah implementace (7 stránek ve složce web/, offline provoz)
[0:45 - 1:45] Slide 3: Uplatnění aktuálních UX/Design trendů (Dark-first, OLED, radii, WCAG)
[1:45 - 2:30] Slide 4: Stabilita návrhu – odchylky od prototypu (cca 8 % vs povolených 15 %)
[2:30 - 3:15] Slide 5: Využití AI, odhalený kontrastní podvod AI a chybné Schema.org
[3:15 - 3:50] Slide 6 & 7: Technická validace (W3C, WebAIM, file:///) a stav pro Cvičení 5
[3:50 - 5:00] Rezerva pro dotazy cvičícího / diskuze
```

---

## 🎙️ Doslovný scénář po jednotlivých slidech

### Slide 1: Titulní slide & Úvod (0:00 – 0:20)
> *„Dobrý den, jménem týmu festivalu **Aurora 2026** vám představuji průběžné výsledky pro Cvičení 4. Předmětem dnešní prezentace je hotová webová implementace, uplatnění moderních UX trendů, stabilita návrhu a technická verifikace.“*

---

### Slide 2: Co se od minula udělalo (0:20 – 0:50)
*(👉 Přejít na Slide 2)*
> *„Od prototypové fáze jsme vybudovali kompletní klientskou webovou aplikaci ve složce `web/`. Pokrývá všech 7 plánovaných stránek: od úvodní stránky s živým JavaScriptovým odpočtem, přes interaktivní program šedesáti akcí, katalog a parametrický detail interpretů, scény a praktické informace s interaktivním FAQ, až po vyhrazené vyhledávání.*  
> *Zásadním technickým milníkem je **stoprocentní offline nezávislost**. Web funguje přímo poklepáním na soubor přes protokol `file:///` bez nutnosti spouštět webový server a bez jakýchkoliv CORS chyb. Toho jsme dosáhli synchronním bootstrapem `window.FESTIVAL_DATA`.*  
> *Všechny stránky jsou postaveny na sémantickém HTML5 a nesou validní Schema.org JSON-LD metadata pro SEO a vyhledávací AI agenty.“*

---

### Slide 3: Uplatnění UX a designových best practices (0:50 – 1:45)
*(👉 Přejít na Slide 3)*
> *„Při vizuálním a funkčním návrhu jsme cíleně uplatnili moderní produktové trendy:*  
> *Zaprvé: **Dark-first festivalová estetika**. Náš festival probíhá odpoledne a v noci. Tmavé rozhraní nejen dramaticky snižuje oslnění očí v přítmí areálu, ale přináší **reálnou úsporu baterie na mobilních OLED displejích**, kde černé pixely nespotřebovávají proud – což je pro návštěvníka trávícího v areálu celý den klíčové.*  
> *Zadruhé: **Optická hloubka a glassmorphism**. Vyvarovali jsme se nevkusného blikání a agresivních stínů. Fixní hlavička využívá decentní poloprůhlednost s rozostřením pozadí `backdrop-filter: blur(12px)`.*  
> *Zatřetí: **Koncentrické zaoblení rohů**. Poloměry vnějších karet (16 px) a vnitřních tlačítek (10 a 6 px) jsou v přesném matematickém poměru, což vytváří přirozenou vizuální harmonii.*  
> *A začtvrté: **Ergonomie dotyku a přístupnost**. Všechny interaktivní prvky mají rozměr alespoň 44 krát 44 pixelů dle WCAG 2.5.5, disponují zřetelným dvoubarevným fokusem a respektují preferenci sníženého pohybu `prefers-reduced-motion` v CSS.“*

---

### Slide 4: Stabilita návrhu – Dodržení pravidla 15 % (1:45 – 2:30)
*(👉 Přejít na Slide 4)*
> *„Katedra striktně vyžaduje stabilitu projektu a omezuje odchylky od prototypu na maximálně 15 %. Všechny naše změny činí v součtu **pouze cca 8 %** a každá z nich byla přímo vyvolána výsledky uživatelského testování:*  
> *1. Přidali jsme vyhrazenou vyhledávací stránku `search.html` (změna cca 4 %), protože testerka Tereza potřebovala najít kapelu okamžitě z kterékoliv části webu.*  
> *2. Upgradovali jsme tlumenou barvu textu z `#64748b` na `#94a3b8` (změna 1 %), abychom zajistili bezpečný kontrast 5.7:1 dle WCAG AA.*  
> *3. A kolizní algoritmus jsme obohatili o přesné vyčíslení překryvu v minutách a rámeček kolem karet (změna 3 %), což byla přímá reakce na testera Jakuba.*  
> *Projekt tak plně respektuje schválenou architekturu.“*

---

### Slide 5: Využití AI a odhalené halucinace (2:30 – 3:15)  
*(⚠️ Klíčový moment – zdůraznit odmítnutí falešného tvrzení AI o kontrastu!)*
*(👉 Přejít na Slide 5)*
> *„Při vývoji jsme transparentně evidovali všechny AI výstupy. AI nám pomohlo se strukturou JSON-LD a transformacemi v CSS.*  
> *Zde je však důkaz naší lidské validace:*  
> *Nejzávažnější zjištěnou chybou byl **falešný kontrastní výrok**: AI v komentáři tvrdilo, že jím vygenerovaná paleta 'plně splňuje WCAG AA'. Když jsme barvy přeměřili v WebAIM Contrast Checkeru, tlumený text měl kontrast pouze **3.9:1**, což je selhání normy! Hodnotu jsme ihned upravili na `#94a3b8` s bezpečným kontrastem 5.7:1.*  
> *Dále AI v JSON-LD halucinovalo neexistující typ `@type: "FestivalEvent"`, který jsme opravili na validní standard Schema.org.*  
> *A odmítli jsme pokusy AI o zavedení `process.env` do čistého klientského JavaScriptu.“*

---

### Slide 6 & 7: Validace řešení a stav pro Cvičení 5 (3:15 – 3:55)
*(👉 Přejít na Slide 6 a 7)*
> *„Všechny technické výstupy jsme exaktně validovali:*  
> *W3C validátor sémantiky HTML5 hlásí **0 chyb a 0 varování** napříč všemi sedmi stránkami.*  
> *Kontrasty textů v WebAIMu dosahují 18.2:1 pro hlavní text a 5.7:1 pro tlumený text, což bezpečně splňuje WCAG 2.0 AA.*  
> *Aplikace byla úspěšně otestována na reálných iPhonech, zařízeních Android s šířkou 360 pixelů, tabletu iPad i desktopu.*  
> *Kritérium Cvičení 5 předepisuje minimálně 50% rozpracovanost. Náš projekt Aurora 2026 je již nyní **dokončen ze 100 %**, má nulové blokující chyby a je plně připraven pro Cvičení 5 a následné cross-review oponentního týmu.*  
> *Děkuji za pozornost a těším se na vaše dotazy.“*

---

## 🛡️ Očekávané otázky cvičícího a neprůstřelné odpovědi

### Otázka 1: *„Jak konkrétně funguje váš offline přístup k datům bez CORS chyb při otevření přes protokol file:///?“*
- **Modelová odpověď:**  
  *„V souboru `web/js/data.js` máme datovou základnu exportovanou do globální synchronní proměnné `window.FESTIVAL_DATA`. Naše funkce `getFestivalData()` v `app.js` nejprve zkontroluje, zda tento in-memory objekt existuje. Pokud ano, okamžitě a synchronně s ním pracuje. Tím zcela obcházíme volání asynchronního `fetch()`, které by v prohlížečích jako Chrome při protokolu `file:///` vyvolalo bezpečnostní chybu `CORS policy: origin null`. Pro případ spuštění na HTTP serveru je v kódu připraven i transparentní fallback na `fetch('data.json')`.“*

### Otázka 2: *„Jak reálně šetří tmavý režim (dark mode) energii na mobilním displeji?“*
- **Modelová odpověď:**  
  *„V moderních chytrých telefonech s technologií OLED a AMOLED je každý subpixel samostatným světelným zdrojem. Při zobrazení černé či velmi tmavé barvy (jako je naše `--bg-main: #0b0f19`) jsou organické diody prakticky zhasnuté a nespotřebovávají elektrický proud, na rozdíl od klasických LCD displejů s permanentním celoplošným LED podsvícením. Podle nezávislých studií (např. Purdue University) dokáže dark mode při vysokém jasu na OLED ušetřit 39 až 47 % energie akumulátoru.“*

### Otázka 3: *„Jak jste exaktně změřili poměr barevného kontrastu pro WCAG 2.0 AA?“*
- **Modelová odpověď:**  
  *„Využili jsme oficiální algoritmus relativního jasu (relative luminance) dle specifikace W3C implementovaný v nástroji WebAIM Contrast Checker a v DevTools Accessibility Panelu. Pro běžný text norma AA požaduje poměr alespoň 4.5:1. Náš primární text `#f8fafc` na pozadí `#0b0f19` dosahuje 18.2:1 (vyhovuje i nejpřísnější úrovni AAA). Tlumený text `#94a3b8` dosahuje 5.7:1 na pozadí a 6.6:1 na kartách, což spolehlivě překračuje požadavek 4.5:1.“*

### Otázka 4: *„Splňujete pravidlo katedry, že odchylky od specifikace a prototypu nesmí překročit cca 15 %?“*
- **Modelová odpověď:**  
  *„Ano, naše změny činí v součtu pouhých cca 8 %. Architektura sedmi stránek, 3 scény, 60 interpretů i 60 událostí zůstaly stoprocentně zachovány. Provedli jsme pouze 3 racionální úpravy vyvolané testováním: vyčlenění globálního vyhledávání na vlastní stránku (cca 4 %), úpravu kontrastu jedné CSS proměnné (cca 1 %) a obohacení hlášky kolizí o vyčíslení minut (cca 3 %). Všechny změny jsou transparentně zdokumentovány v `progress-03.md`.“*

---

## 💡 Tipy pro vystupujícího
- **Důraz na Slide 5:** Zvlášť zřetelně formulujte moment, kdy AI falešně tvrdilo, že kontrast vyhovuje normě, a jak jste ho odhalili měřením v WebAIMu. Cvičící na PEF ČZU toto velmi oceňují.
- **Ukázka file:/// :** Pokud cvičící projeví zájem, mějte připravenou složku `web/index.html` na ploše k okamžitému poklepání bez internetu.
- **Dodržení času:** Slide 4 projděte svižněji, zaměřte se na celkových 8 % vs. povolených 15 %.

# Tahák pro mluvčího – Prezentace Cvičení 2 (WEB ČZU)

Předmět: **Web design (WEB)** | PEF ČZU v Praze  
Milník: **Cvičení 2 – Projektová specifikace a datová základna**  
Časový limit: **3 až 5 minut**  
Doporučený čas řeči: **3:45 – 4:15 min** (ponechává bezpečnou rezervu pro dotazy a vyvaruje se penalizace za překročení 5 minut).

---

## ⏱️ Minutový harmonogram řeči

```
[0:00 - 0:45] Slide 1 & 2: Úvod, identita festivalu Aurora 2026, co jsme udělali
[0:45 - 1:45] Slide 3: Účel webu a informační architektura (Sitemap & vazby)
[1:45 - 2:30] Slide 3 & 4: Datová základna (60/60/3) a 3 klíčové scénáře
[2:30 - 3:30] Slide 4 & 5: Využití AI, odhalené halucinace a lidská validace
[3:30 - 4:00] Slide 6: Hlavní architektonická rozhodnutí a další kroky do Cv 3
[4:00 - 5:00] Rezerva pro dotazy cvičícího / diskuze
```

---

## 🎙️ Doslovný scénář po jednotlivých slidech

### Slide 1: Titulní slide & Úvod (0:00 – 0:25)
> *„Dobrý den, jménem našeho týmu vám představuji projektovou specifikaci a datovou základnu pro náš fiktivní web – **Hudební Festival Aurora 2026**.*  
> *Aurora je třídenní městský hudebně-vzdělávací festival na Výstavišti v Praze, který kombinuje koncerty alternativní scény, odborné talky a praktické workshopy.“*

---

### Slide 2: Co jsme od minula udělali & Identita festivalu (0:25 – 1:00)
> *„Od minulého cvičení jsme zpracovali tři klíčové výstupy:*  
> *Zaprvé: kompletní specifikaci v `project-specification.md` s jasnou identitou, cílovými skupinami a informační architekturou.*  
> *Zadruhé: datovou základnu v `data.json`, která přesně splňuje požadavky na 3 dny, 3 scény, 60 unikátních interpretů a 60 programových slotů.*  
> *Zatřetí: zavedli jsme transparentní `ai-log.md` pro evidenci a validaci generovaných výstupů.*  
> *Festival cílí na celkovou okamžitou kapacitu 10 500 návštěvníků rozdělených do tří scén – open-air Main Stage, klubový Riverside Club a krytý multifunkční sál Forum Hall.“*

---

### Slide 3: Informační architektura a klíčové scénáře (1:00 – 2:00)
> *„Web je navržen jako sémantická vícestránková aplikace složená ze sedmi hlavních sekcí: Úvod, Program, Účinkující, Scény, Praktické informace a vyhrazené Vyhledávání.*  
> *Klíčové je pro nás vzájemné provázání entit – z programu se návštěvník jedním klikem dostane na detail kapely s její biografií a z detailu kapely zase vidí všechny její časy vystoupení.*  
> *Pro ověřování v dalším cvičení jsme definovali 3 klíčové scénáře:*  
> *1. Tereza (24 let), která potřebuje v tramvaji za 15 sekund vyfiltrovat čtvrteční indie kapely na Main Stage.*  
> *2. Jakub (29 let), který si skládá osobní rozvrh a náš systém ho automaticky varuje, že se mu v sobotu v 10:00 časově překrývají dvě vybrané akce.*  
> *3. Martin (35 let) na invalidním vozíku, který před příchodem prověřuje bezbariérovost a zázemí sálu Forum Hall.“*

---

### Slide 4 & 5: Využití AI, odhalené halucinace a validace (2:00 – 3:15)  
*(⚠️ Klíčový moment prezentace – zkoušející se na toto nejvíce zaměřují!)*

> *„V souladu s pravidly předmětu bereme plnou týmovou odpovědnost za výsledek. AI jsme využili jako asistenta pro syntézu 60 interpretů a anotací.*  
> *Zásadní je však to, **co jsme odmítli a opravili**:*  
> *Zaprvé, AI vygenerovalo závažné časoprostorové kolize – naplánovalo na Main Stage dvě kapely současně s překryvem 45 minut.*  
> *Zadruhé, u dvou akcí vytvořilo neexistující ID vazby `p61` a `p62`.*  
> *Zatřetí, navržený styl měl kontrastní poměr pouhých 2.8:1, což by znamenalo selhání WCAG AA.*  
> *Jak jsme to validovali?*  
> *Nenapsali jsme jen 'ověřili jsme pomocí AI'. Vytvořili jsme validační skript, který zkontroloval 100% referenční integritu všech cizích klíčů a časovou posloupnost na scénách: konec akce A musí předcházet začátku akce B. Kontrast jsme exaktně přeměřili a nastavili nad poměr 7:1.“*

---

### Slide 6: Hlavní rozhodnutí a další kroky (3:15 – 3:50)
> *„Naše hlavní technologické rozhodnutí: stavíme čistý Vanilla JS a moderní CSS Grid bez jakýchkoliv externích bundlerů, Node.js či frameworků. Web poběží stoprocentně offline přímo v prohlížeči a bude plně sémantický.*  
> *Do Cvičení 3 připravíme spustitelný mobile-first wireframe a funkční kostru tří interaktivních prvků: multikriteriální filtr, osobní program s detekcí kolizí a interaktivní přehled scén.*  
> *Děkuji za pozornost a těším se na vaše dotazy.“*

---

## 🛡️ Očekávané otázky cvičícího a neprůstřelné odpovědi

### Otázka 1: *„Proč jste zvolili zrovna tyto 3 scény a jaké jsou mezi nimi rozdíly?“*
- **Odpověď:**  
  *„Zvolili jsme 3 scény s odlišným účelem a akustickým profilem, aby si akce vzájemně nekonkurovaly: Aurora Main Stage je velká open-air stage pro headlinery (kapacita 7 000). Riverside Club Stage je krytý klub pro intenzivní klubovou elektroniku a noční sety (kapacita 2 200). Forum Hall je akusticky tlumený konferenční sál určený specificky pro talky, diskuze a workshopy produkce (kapacita 1 300). Díky tomu má každá scéna svůj vlastní typ publika i časový rytmus.“*

### Otázka 2: *„Jak konkrétně hodláte v čistém client-side JavaScriptu vyřešit 'Můj program' bez backendu a databáze?“*
- **Odpověď:**  
  *„Využijeme standardní Web Storage API – `localStorage`. Při kliknutí na tlačítko akce uložíme pole ID vybraných akcí `['e1', 'e12', ...]`. Skript při vykreslení projde vybrané položky, spočítá časové intervaly (počátek a délku trvání) a pokud zjistí překryv $[start_A, end_A] \cap [start_B, end_B] \neq \emptyset$, okamžitě vyvěsí varovný odznak. Data zůstávají uložena v prohlížeči návštěvníka i po obnovení stránky a fungují bez připojení k internetu.“*

### Otázka 3: *„Proč nepoužijete React, Vue nebo moderní balíčkovače typu Vite?“*
- **Odpověď:**  
  *„Pravidla předmětu WEB výslovně zakazují Node.js, npm balíčkovače i build proces – řešení musí být čistě client-side a spustitelné v jakémkoliv prohlížeči bez instalace. Navíc pro účely SEO, AEO a přístupnosti WCAG 2.0 AA dává čisté sémantické HTML s Vanilla JS znatelně lepší kontrolu nad výsledným DOMem a nulový overhead.“*

### Otázka 4: *„Jak jste ověřili, že se vám neduplikují jména interpretů v databázi?“*
- **Odpověď:**  
  *„Skriptem jsme zkontrolovali unikátnost `id` i jmen v `data.json` přes množinové porovnání (`Set` unikátních hodnot). Všech 60 interpretů má unikátní identifikátor `p1` až `p60` i název.“*

---

## 💡 Tipy pro vystupujícího
- **Rychlost mluvy:** Mluvte klidně, nepřednášejte jako kulomet. 3:45 min je ideální délka.
- **Důraz:** Zvláštní důraz položte na **Slide 4 a 5 (AI validace)** – to je to, co na ČZU odděluje plný počet bodů (7b) od ztráty bodů za nekritické použití AI.
- **Materiály:** Prezentaci odevzdejte do Moodlu před cvičením (do cvičení nelze nic dodatečně nahrávat!).

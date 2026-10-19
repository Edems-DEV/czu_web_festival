# Tahák pro mluvčího – Finální obhajoba projektu (WEB ČZU)

Předmět: **Web design (WEB)** | PEF ČZU v Praze  
Milník: **Finální odevzdání a ústní obhajoba semestrálního projektu (15 bodů)**  
Časový limit: **5 minut prezentace + diskuze a dotazy zkoušejícího**  
Doporučený čas řeči: **4:15 – 4:45 min** (vyvážené tempo pokrývající všechny klíčové aspekty bez překročení limitu).

---

## ⏱️ Minutový harmonogram finální obhajoby

```
[0:00 - 0:45] Slide 1 & 2: Titulní slide, exekutivní souhrn, rozsah projektu (60/60/3) a zero-build offline běh
[0:45 - 1:45] Slide 3: Tři klíčové interaktivní funkce a demonstrace průchodnosti scénářů
[1:45 - 2:45] Slide 4: UX a technická kvalita (mobile-first, WCAG AA, reduced motion, Schema.org)
[2:45 - 3:30] Slide 5: Vypořádání oponentury (10 připomínek od týmu SoundWave Festival, akceptace vs odmítnutí)
[3:30 - 4:15] Slide 6: Kritické využití AI, odhalené halucinace a lidská validace
[4:15 - 4:45] Slide 7: Závěr, metrika kvality (98/98 testů PASS) a přechod k dotazům zkoušejícího
[4:45 - ...]   Odpovědi na dotazy hodnotící komise
```

---

## 🎙️ Doslovný scénář po jednotlivých slidech

### Slide 1: Titulní slide (0:00 – 0:20)
> *„Vážený pane docente, vážená komise, dámy a pánové,*  
> *jménem našeho čtyřčlenného týmu vám představuji finální realizaci semestrálního projektu – webový portál fiktivního městského festivalu **Aurora 2026**.*  
> *Projekt jsme zpracovali jako stoprocentně klientskou webovou aplikaci bez jakéhokoliv backendu, běžící přímo v prohlížeči i offline.“*

---

### Slide 2: Co jsme v průběhu semestru vytvořili (0:20 – 0:50)
> *„Projekt vznikal postupně od specifikace až po finální odevzdání. Výsledkem je plnohodnotný web s těmito parametry:*  
> *Zaprvé: normalizovaná datová základna `data.json` obsahující 3 dny, 3 scény, přesně 60 unikátních interpretů a 60 vystoupení bez jediné časové kolize.*  
> *Zadruhé: 7 responzivních šablon ve složce `web/` pokrývajících všechny potřeby návštěvníka od programu po bezbariérovost scén.*  
> *Zatřetí: nulové běhové závislosti. Web funguje offline prostým otevřením přes protokol `file:///` bez nutnosti Node.js, balíčkovačů nebo Dockeru, a to díky synchronnímu in-memory adaptéru `data.js` eliminujícímu CORS restrikce.“*

---

### Slide 3: Tři klíčové interaktivní funkce a scénáře (0:50 – 1:50)
> *„Dle zadání jsme navrhli a implementovali tři netriviální klientské interaktivní funkce:*  
> *1. Vícekriteriální filtr a live fulltextové vyhledávání v programu. Návštěvník může filtrovat podle libovolné kombinace dne, scény a formátu akce.*  
> *2. Osobní harmonogram s automatickou detekcí kolizí. Položky ukládáme do `localStorage`. Pokud si návštěvník zvolí dvě akce, které se časově překrývají, systém okamžitě zobrazí varovný banner a přesně vyčíslí délku překryvu v minutách.*  
> *3. Dynamický parametrický profil interpreta, který z URL parametru okamžitě načte libovolného ze šedesáti umělců a propojí ho s jeho vystoupeními.*  
> *Všechny funkce jsme ověřili na třech konkrétních personách – Tereza prošla výběr programu za 14 sekund, Jakub úspěšně vyřešil kolizi 75 minut a Martin snadno ověřil bezbariérovost pavilonu Forum Hall.“*

---

### Slide 4: UX, přístupnost a designové trendy (1:50 – 2:45)
> *„Při návrhu jsme kladli maximální důraz na UX a moderní standardy:*  
> *Web je striktně mobile-first. Všechny dotykové plochy čipů a tlačítek mají rozměr minimálně 44 na 44 pixelů dle WCAG 2.5.5.*  
> *Barevná paleta je navržena jako dark-first s hlubokými tóny šetřícími baterii OLED displejů v noci. Barevný kontrast byl důsledně změřen – běžný text dosahuje poměru 5.7:1 a primární text až 16:1, což splňuje WCAG 2.0 AA.*  
> *Implementovali jsme také podporu pro uživatele se sníženou citlivostí na pohyb přes `prefers-reduced-motion` a na všech 7 stránkách máme nasazena validní strukturovaná data Schema.org pro AI vyhledávače.“*

---

### Slide 5: Vypořádání oponentury z cross-review (2:45 – 3:30)
> *„V rámci Cvičení 6 jsme od oponentního týmu SoundWave Festival obdrželi 10 věcných připomínek.*  
> *Všech 8 oprávněných UX a přístupnostních nálezů jsme akceptovali a zapracovali – zejména zvýšení kontrastu tlumeného textu, doplnění výpočtu minut kolize, globální vyhledávání a prázdný stav filtru.*  
> *Dvě připomínky jsme po odborné úvaze věcně odmítli: odmítli jsme externí Google Maps a cloudový backend, protože by porušily závazné pravidlo zadání na 100% offline běh bez serveru. Podrobné zdůvodnění je součástí odevzdané dokumentace.“*

---

### Slide 6: Využití AI a kritická reflexe (3:30 – 4:15)
> *„Generativní AI jsme využívali jako asistenta pro tvorbu textů interpretů, návrh strukturovaných dat a hraničních testů. Každý výstup byl však podroben striktní lidské verifikaci.*  
> *Díky tomu jsme zachytili a odmítli závažné halucinace – například když AI tvrdila, že kontrast 3.9:1 splňuje WCAG AA, což bylo nepravdivé, nebo když navrhovala externí npm balíčky.*  
> *Kompletní auditní stopa promptů a odmítnutých návrhů je transparentně zaznamenána v `ai-log.md`.*

---

### Slide 7: Závěr a připravenost k diskuzi (4:15 – 4:45)
> *„Kvalitu aplikace garantuje naše automatizovaná testovací sada, kde všech 98 testů prochází se stoprocentní úspěšností.*  
> *Odevzdání je strukturováno přesně podle předpisu v sylabu a balíčky jednotlivých cvičení jsou archivovány a synchronizovány.*  
> *Děkuji vám za pozornost a těším se na vaše dotazy.“*

---

## 🛡️ Očekávané otázky komise a argumentační obhajoba

### Otázka 1: „Jak máte vyřešeno, aby web fungoval offline a nehlásil CORS chyby při otevření přes file:///?"
> **Odpověď:** *„Použili jsme dvoustupňovou architekturu: vedle kanonického `data.json` máme skript `web/js/data.js`, který ukládá data přímo do globálního objektu `window.FESTIVAL_DATA`. Při startu aplikace nejprve zkontroluje přítomnost in-memory objektu. Tím zcela obcházíme bezpečnostní omezení prohlížečů pro lokální `fetch()` a web funguje bez jediné konzolové chyby i bez webserveru.“*

### Otázka 2: „Proč jste odmítli návrh oponentů na synchronizaci oblíbených akcí přes backend?“
> **Odpověď:** *„Zadání předmětu Web design na ČZU striktně stanovuje, že výsledkem musí být čistě klientské řešení bez vlastního server-side runtime, Node.js či databáze. Pro účely festivalu navíc `localStorage` přináší výhodu stoprocentního soukromí návštěvníka a okamžité rychlosti v terénu bez závislosti na mobilním signálu.“*

### Otázka 3: „Kolik procent tvořila celková odchylka finální verze od původního prototypu ze Cvičení 3?“
> **Odpověď:** *„Naše kumulovaná odchylka činí přibližně 10 %, což je hluboko pod povoleným limitem 15 %. Všechny změny spočívaly ve zvýšení přístupnosti (kontrast, dotykové plochy) a zpřesnění zpětné vazby (minuty kolize) na základě validace a oponentury.“*

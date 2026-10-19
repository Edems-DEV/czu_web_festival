# Tahák pro mluvčího – Prezentace Cvičení 6 (WEB ČZU)

Předmět: **Web design (WEB)** | PEF ČZU v Praze  
Milník: **Cvičení 6 – Expertní hodnocení (Cross-Review) oponentního projektu**  
Časový limit: **3 až 5 minut**  
Doporučený čas řeči: **3:45 – 4:15 min** (ponechává bezpečnou rezervu pro dotazy a diskuzi).

---

## ⏱️ Minutový harmonogram řeči

```
[0:00 - 0:45] Slide 1 & 2: Úvod a metodika expertního hodnocení (2 formalizované metody)
[0:45 - 1:45] Slide 3 & 4: Průchod 2 scénáři a kategorizace nálezů (1 kritický, 2 významné, 2 drobné)
[1:45 - 2:30] Slide 5: Konstruktivní doporučení a kódová řešení pro oponentní tým
[2:30 - 3:15] Slide 6: Využití AI při review, odmítnutí falešného DOCTYPE a vágních klišé
[3:15 - 3:50] Slide 7 & 8: Validace reprodukce, silné stránky a shrnutí do finálního odevzdání
[3:50 - 5:00] Rezerva pro dotazy cvičícího / diskuze
```

---

## 🎙️ Doslovný scénář po jednotlivých slidech

### Slide 1: Titulní slide & Úvod (0:00 – 0:20)
> *„Dobrý den, jménem našeho týmu vám představuji expertní křížové hodnocení – cross-review – projektu oponentního studentského týmu festivalu **SoundWave Festival 2026** pro Cvičení 6.*  
> *Naším cílem bylo provést nezávislý, exaktní a především konstruktivní audit, který oponentům pomůže odstranit slabá místa před finálním odevzdáním projektu.“*

---

### Slide 2: Co se udělalo – Metodika hodnocení (0:20 – 0:50)
*(👉 Přejít na Slide 2)*
> *„V souladu se zadáním katedry jsme uplatnili **dvě formalizované metody evaluace**:*  
> *Zaprvé: **Heuristickou analýzu podle deseti obecných principů Jakoba Nielsena**, kde jsme se zaměřili zejména na viditelnost stavu systému, prevenci chyb a konzistenci.*  
> *Zadruhé: **Kognitivní průchod (Cognitive Walkthrough)** přes dva klíčové uživatelské scénáře – mobilní výběr programu a zjištění bezbariérovosti.*  
> *Dále jsme provedli technický audit: test spuštění offline přes protokol `file:///`, validaci sémantiky HTML a měření kontrastů v nástroji WebAIM.“*

---

### Slide 3 & 4: Průchod scénáři a kategorizace nálezů (0:50 – 1:50)
*(👉 Přejít na Slide 3 a následně Slide 4)*
> *„Při průchodu scénáři a analýze jsme identifikovali celkem 5 věcných nálezů:*  
> *Máme **jeden kritický nález N-01**: při pokusu o spuštění webu přímo poklepáním na soubor přes protokol `file:///` v prohlížeči Chrome se program vůbec nenačte. Oponentní aplikace totiž volá asynchronní `fetch('data.json')`, což prohlížeč zablokuje chybou CORS policy s originem null. V offline režimu je tak hlavní funkce webu nefunkční.*  
> *Dále evidujeme **dva významné nálezy**:*  
> *Nález N-02: na úzkých mobilních displejích s šířkou 360 pixelů kolabuje hlavní navigace – odkazy přetékají do šířky, vytvářejí nechtěný horizontální scrollbar o 42 pixelů a překrývají nadpis.*  
> *Nález N-03: v sekci často kladených dotazů FAQ má šedý text na tmavě šedém pozadí kontrastní poměr pouhých **2.7:1**, což je závažné porušení normy WCAG 2.0 AA.*  
> *A nalezli jsme **dva drobné nedostatky**: chybějící atribut `aria-current="page"` na aktivním odkazu a absenci prázdného stavu při zadání neexistujícího interpreta do vyhledávače.“*

---

### Slide 5: Doporučená řešení pro oponentní tým (1:50 – 2:30)
*(👉 Přejít na Slide 5)*
> *„Naše review nestaví na pouhé kritice, ale přináší oponentům přesná a snadno nasaditelná řešení:*  
> *Pro kritickou chybu CORS doporučujeme zavést **synchronní bootstrap**: data uložit do JavaScriptové proměnné `window.FESTIVAL_DATA` v souboru `data.js` a načíst ji před hlavním skriptem. Tím web okamžitě získá 100% offline funkčnost bez serveru.*  
> *Pro navigaci na šířce 360 pixelů stačí v CSS přidat vlastnost `flex-wrap: wrap` s mezerou 8 pixelů a mírně snížit padding tlačítek.*  
> *A pro splnění WCAG AA postačí zesvětlit barvu textu FAQ na `#a1a1aa`, což okamžitě zvedne kontrast na bezpečných 5.8:1.*  
> *Všechny úpravy zaberou oponentům odhadem 30 minut práce.“*

---

### Slide 6: Využití AI při cross-review a odhalené halucinace (2:30 – 3:15)  
*(⚠️ Klíčový moment prezentace – ukázat kritické zhodnocení AI výstupů!)*
*(👉 Přejít na Slide 6)*
> *„Při tvorbě review jsme využili AI k vygenerování strukturovaného checklistu Nielsenových heuristik.*  
> *I zde jsme však museli důsledně zasáhnout:*  
> *Zaprvé: AI vygenerovalo **falešně pozitivní obvinění**, že oponentnímu webu chybí deklarace `<!DOCTYPE html>`. Přímou lidskou kontrolou v editoru jsme zjistili, že doctype je na prvním řádku naprosto v pořádku. Tvrzení AI jsme škrtli.*  
> *Zadruhé: AI navrhovalo vágní subjektivní soudy typu 'web by mohl působit živěji'. Tyto fráze jsme odmítli a nahradili je měřitelnými údaji o pixelech a kontrastech.*  
> *Všechny prezentované nálezy byly osobně reprodukovány a ověřeny členy našeho týmu.“*

---

### Slide 7 & 8: Validace reprodukce a závěr (3:15 – 3:55)
*(👉 Přejít na Slide 7 a 8)*
> *„Všechny nálezy jsme nezávisle ověřili v DevTools, v nástroji WebAIM i na fyzickém mobilním telefonu.*  
> *Rádi bychom zdůraznili, že oponentní projekt má vynikající grafický nápad, moderní barevný koncept i kvalitní textové anotace kapel.*  
> *Pokud oponentní tým provede doporučené dvě hlavní úpravy – tedy vyřeší offline načítání dat a upraví kontrast textu – jejich projekt bude mít vynikající úroveň a bez problémů získá plný počet bodů.*  
> *Kompletní rozbor nálezů s přesnými řádky kódu jsme předali v souboru `review/review.md`.*  
> *Děkuji vám za pozornost a těším se na vaše dotazy.“*

---

## 🛡️ Očekávané otázky cvičícího a neprůstřelné odpovědi

### Otázka 1: *„Proč označujete selhání načítání dat přes protokol file:/// za kritickou závažnost?“*
- **Modelová odpověď:**  
  *„Vycházíme přímo z oficiálních podmínek zápočtu předmětu WEB: projekt musí být odevzdán jako funkční web, který lze spustit přímo v prohlížeči bez instalace vývojového prostředí, balíčkovačů či webového serveru. Pokud cvičící nebo oponent stáhne odevzdaný ZIP soubor, rozbalí jej a otevře `index.html` dvojklikem, při volání `fetch('data.json')` se v Chrome zablokuje načítání programu kvůli politice CORS. Pro uživatele je to blokující stav – nevidí žádné akce ani kapely. Proto jde o kritickou závažnost H5.“*

### Otázka 2: *„Jak přesně souvisí Nielsenova heuristika H5 (Prevence chyb) s tímto problémem CORS?“*
- **Modelová odpověď:**  
  *„Heuristika H5 říká, že lepší než dobré chybové hlášení je návrh rozhraní, který chybě zcela předejde. Aplikace oponentního týmu nejenže chybě nepředešla, ale ani nezobrazila žádný uživatelský fallback typu 'Data se nepodařilo načíst, spusťte prosím web přes HTTP server'. Uživatel tak zůstane před prázdnou stránkou bez jakéhokoliv vysvětlení.“*

### Otázka 3: *„Jak jste měřili kontrast textu na webu cizího týmu?“*
- **Modelová odpověď:**  
  *„Použili jsme nástroj Kapátko (EyeDropper) a inspekci CSS stylů v DevTools v kombinaci s oficiálním WebAIM Contrast Checkerem. Zjistili jsme přesnou hodnotu barvy textu `#71717a` a barvy pozadí karty `#27272a`. Po dosazení do W3C vzorce relativního jasu vyšel kontrastní poměr 2.72:1, což je hluboko pod minimálním limitem 4.5:1 předepsaným normou WCAG 2.0 AA.“*

### Otázka 4: *„Jak jste se ujistili, že vaše hodnocení není zaujaté nebo příliš přísné?“*
- **Modelová odpověď:**  
  *„Využili jsme striktní formální rámce – 10 Nielsenových heuristik a normu WCAG 2.0 AA. Nehodnotili jsme náš osobní vkus nebo styl hudby, ale objektivní technické a použitelnostní parametry. Každý nález má jasné zdůvodnění podle konkrétní heuristiky a je doprovázen konkrétním návrhem nápravy v kódu, který oponentům reálně pomůže před finálním hodnocením.“*

---

## 💡 Tipy pro vystupujícího
- **Tón vystoupení:** Prezentujte hodnocení kolegiálně, věcně a konstruktivně. Naším cílem není oponentní tým potopit, ale pomoci jim dosáhnout plného hodnocení.
- **Kritický nález (CORS):** Zde mluvte s největší jistotou – je to učebnicový problém čistě klientských webů v prohlížeči, kterému se náš tým úspěšně vyhnul.
- **Čas:** Držte se časového rozpadu; při čase 3:45 min přejděte na závěrečné ocenění silných stránek oponentů.

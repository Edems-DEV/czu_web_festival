# Tahák pro mluvčího – Prezentace Cvičení 6 (WEB ČZU)

Předmět: **Web design (WEB)** | PEF ČZU v Praze  
Milník: **Cvičení 6 – Expertní hodnocení (Cross-Review) oponentního projektu**  
Časový limit: **3 až 5 minut**  
Doporučený čas řeči: **3:45 – 4:15 min** (ponechává bezpečnou rezervu pro dotazy a diskuzi).

---

## ⏱️ Minutový harmonogram řeči

```
[0:00 - 0:45] Slide 1 & 2: Úvod a metodika expertního hodnocení (2 formalizované metody)
[0:45 - 1:45] Slide 3 & 4: Průchod 2 scénáři a výběr klíčových nálezů (REV-01 až REV-06)
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
> *Zaprvé: **Heuristickou analýzu podle deseti obecných principů Jakoba Nielsena**, kde jsme se zaměřili zejména na viditelnost stavu systému, prevenci chyb, konzistenci a flexibilitu.*  
> *Zadruhé: **Kognitivní průchod (Cognitive Walkthrough)** přes dva klíčové uživatelské scénáře – mobilní výběr programu podle žánru a ověření bezbariérovosti pro hendikepované návštěvníky.*  
> *Dále jsme provedli technický audit: kontrolu běhu přes protokol `file:///`, referenční integritu databáze, validaci sémantiky HTML a měření kontrastů v nástroji WebAIM dle WCAG 2.0 AA.“*

---

### Slide 3 & 4: Průchod scénáři a výběr klíčových nálezů (0:50 – 1:50)
*(👉 Přejít na Slide 3 a následně Slide 4)*
> *„V celkovém posudku evidujeme 9 detailních nálezů. Zde uvádíme nejdůležitější z nich:*  
> *Máme **dva kritické nálezy**:*  
> *REV-01: Tlačítko oblíbených v programu neukládá stav do `localStorage`. Po obnovení stránky výběr zanikne a systém navíc vůbec nevaruje před časovými kolizemi v harmonogramu.*  
> *REV-02: Referenční diskrepance v databázi – u interpretů p14 a p27 odkazuje program na `performer-detail.html?id=undefined`, což vede k pádu klientského skriptu v konzoli.*  
> *Dále uvádíme **čtyři významné nálezy**:*  
> *REV-03: Sekundární šedý text na tmavém pozadí má kontrast pouhých **3.38:1**, což porušuje normu WCAG 2.0 AA vyžadující alespoň 4.5:1.*  
> *REV-04: Rigidní jednoúrovňový filtr – výběr scény resetuje volbu dne, a při nulovém výsledku chybí prázdný stav s tlačítkem pro reset.*  
> *REV-05: Informace o bezbariérovosti jsou vágní, chybí parametry ramp a scéna Warehouse Stage nemá bezbariérovost uvedenou vůbec.*  
> *REV-06: Mobilní hamburger menu postrádá atribut `aria-expanded` a focus trap – při stisku Tab uniká fokus na prvky pod menu.“*

---

### Slide 5: Doporučená řešení pro oponentní tým (1:50 – 2:30)
*(👉 Přejít na Slide 5)*
> *„Naše review nestaví na pouhé kritice, ale přináší oponentům přesná a snadno nasaditelná řešení:*  
> *Pro REV-01 doporučujeme ukládat ID oblíbených do `localStorage` a při změně přepočítat časové překryvy s vizuálním varovným proužkem.*  
> *Pro REV-02 stačí opravit předávání `id` v šabloně a sjednotit časy kapel v `data.json`.*  
> *Pro kontrast REV-03 doporučujeme změnit barvu textu z `#71717a` na `#a1a1aa`, čímž kontrast stoupne na bezpečných 6.2:1 splňujících WCAG AA.*  
> *A pro navigaci a filtry REV-04 a REV-06 doporučujeme provázat filtry jako logický součin, doplnit empty state a ošetřit klávesu Escape.*  
> *Všechny tyto úpravy oponentní tým snadno zvládne před finálním zápočtem.“*

---

### Slide 6: Využití AI při cross-review a odhalené halucinace (2:30 – 3:15)  
*(⚠️ Klíčový moment prezentace – ukázat kritické zhodnocení AI výstupů!)*
*(👉 Přejít na Slide 6)*
> *„Při tvorbě review jsme využili AI k vygenerování checklistu Nielsenových heuristik a WCAG matice.*  
> *I zde jsme však museli důsledně zasáhnout:*  
> *Zaprvé: AI vygenerovalo **falešně pozitivní obvinění**, že oponentnímu webu chybí deklarace `<!DOCTYPE html>`. Přímou lidskou kontrolou v editoru jsme zjistili, že doctype je na prvním řádku naprosto v pořádku. Tvrzení AI jsme okamžitě škrtli.*  
> *Zadruhé: AI navrhovalo vágní subjektivní soudy typu 'web by mohl působit živěji'. Tyto fráze jsme odmítli a nahradili je měřitelnými údaji o pixelech a kontrastech.*  
> *Všech 9 nálezů v posudku bylo osobně verifikováno členy našeho týmu.“*

---

### Slide 7 & 8: Validace reprodukce a závěr (3:15 – 3:55)
*(👉 Přejít na Slide 7 a 8)*
> *„Všechny nálezy jsme nezávisle ověřili v DevTools, v nástroji WebAIM i na fyzických zařízeních.*  
> *Rádi bychom zdůraznili, že oponentní projekt SoundWave 2026 má velmi pěkný grafický koncept, zajímavou dramaturgii a rychlou odezvu šablon.*  
> *Pokud oponentní tým vyřeší prioritně kritické vady v perzistenci a odkazech na kapely a zvedne kontrast textu, jejich projekt bude mít špičkovou úroveň.*  
> *Kompletní posudek o 9 nálezech jsme předali v souboru `project/review.md`.*  
> *Děkuji vám za pozornost a těším se na vaše dotazy.“*

---

## 🛡️ Očekávané otázky cvičícího a neprůstřelné odpovědi

### Otázka 1: *„Proč označujete absenci perzistence v localStorage za kritickou vadu?“*
- **Modelová odpověď:**  
  *„Vycházíme přímo z projektové specifikace a sylabu: osobní program a výběr oblíbených je jednou ze tří povinných klíčových interaktivních funkcí. Pokud uživatel věnuje čas sestavení harmonogramu, ale po kliknutí na detail kapely nebo při náhodném refreshi stránky o výběr přijde, funkce ztrácí jakoukoliv praktickou hodnotu pro festivalového návštěvníka.“*

### Otázka 2: *„Jak jste měřili kontrast textu na webu cizího týmu?“*
- **Modelová odpověď:**  
  *„Použili jsme inspekci CSS stylů v DevTools v kombinaci s oficiálním WebAIM Contrast Checkerem. Zjistili jsme hodnotu barvy textu `#71717a` a barvy pozadí karty `#18181b`. Po dosazení do vzorce relativního jasu vyšel kontrastní poměr 3.38:1, což je pod limitem 4.5:1 předepsaným normou WCAG 2.0 AA.“*

### Otázka 3: *„Jak jste se ujistili, že vaše hodnocení není zaujaté nebo příliš přísné?“*
- **Modelová odpověď:**  
  *„Využili jsme striktní formální rámce – 10 Nielsenových heuristik a normu WCAG 2.0 AA. Nehodnotili jsme náš osobní vkus nebo styl hudby, ale objektivní technické a použitelnostní parametry. Každý nález má reprodukční kroky a je doprovázen konkrétním návrhem nápravy v kódu, který oponentům reálně pomůže před finálním hodnocením.“*

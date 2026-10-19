# Tahák pro mluvčího – Prezentace Cvičení 3 (WEB ČZU)

Předmět: **Web design (WEB)** | PEF ČZU v Praze  
Milník: **Cvičení 3 – UX návrh, funkční prototyp a interaktivní funkce**  
Časový limit: **3 až 5 minut**  
Doporučený čas řeči: **3:45 – 4:15 min** (ideální tempo, bezpečnostní rezerva pro dotazy zkoušejícího).

---

## ⏱️ Minutový harmonogram řeči

```
[0:00 - 0:45] Slide 1 & 2: Úvod a souhrn (co jsme od minula udělali, prototyp, mobile-first)
[0:45 - 1:45] Slide 3: Tři klíčové interaktivní funkce (F1 filtr/search, F2 kolize, F3 detail)
[1:45 - 2:30] Slide 4: Praktický průchod 2 klíčovými scénáři (Tereza 14s, Jakub kolize 75 min)
[2:30 - 3:15] Slide 5: Využití AI, odmítnuté balíčky a odhalené logické halucinace
[3:15 - 3:50] Slide 6: Validace řešení, UX poznatky testerů a přechod do Cvičení 4
[3:50 - 5:00] Rezerva pro dotazy cvičícího a diskuzi
```

---

## 🎙️ Doslovný scénář po jednotlivých slidech

### Slide 1: Titulní slide & Úvod (0:00 – 0:20)
> *„Dobrý den, jménem týmu festivalu **Aurora 2026** vám představuji výsledky pro Cvičení 3 – náš UX návrh, funkční klientský prototyp a realizaci tří klíčových interaktivních funkcí.*  
> *Vycházíme přímo ze schválené specifikace a datové základny 60 interpretů, 60 akcí a 3 scén.“*

---

### Slide 2: Co se od minula udělalo (0:20 – 0:50)
*(👉 Přejít na Slide 2)*
> *„Od minulého cvičení jsme vytvořili spustitelný, reálně klikatelný prototyp v čistém HTML, CSS a JavaScriptu, který funguje 100% offline v prohlížeči bez jakékoliv instalace.*  
> *Návrh je od základů postaven na paradigmatu **Mobile-First** s důrazem na palcovou ergonomii pro úzké obrazovky 360 až 390 pixelů a plynule se rozšiřuje do desktopového gridu.*  
> *Zprovoznili jsme tři plnohodnotné interaktivní funkce – vícekriteriální filtr s live vyhledáváním, osobní rozvrh v localStorage s automatickou detekcí kolizí a parametrický profil interpreta.*  
> *Vše jsme úspěšně prověřili kognitivním průchodem obou povinných scénářů.“*

---

### Slide 3: Tři klíčové interaktivní funkce (0:50 – 1:40)
*(👉 Přejít na Slide 3)*
> *„Podívejme se na naše tři interaktivní funkce, které přímo naplňují požadavky zadání:*  
> *První je **vícekriteriální filtr a live vyhledávání**: umožňuje okamžitě zúžit 60 položek podle dne, scény a formátu akce, přičemž filtry fungují v logickém součinu AND a textové vyhledávání reaguje okamžitě na každý stisk klávesy bez znovunačtení stránky.*  
> *Druhou funkcí je **Můj program s detekcí časových kolizí**: návštěvník si ukládá akce do paměti prohlížeče. Náš algoritmus automaticky seřadí vybrané akce v daném dni, porovná jejich časové intervaly a pokud zjistí překryv, okamžitě vyvěsí kontrastní varování s přesným počtem kolizních minut.*  
> *Třetí funkcí je **parametrický detail interpreta**: přes URL parametr `?id=...` dynamicky načte profil kterékoli ze šedesáti kapel, její žánr, biografii i chronologický rozpis všech vystoupení s přímou vazbou na scény.*  
> *Nejde o žádné statické makety – data jsou plně živá.“*

---

### Slide 4: Průchod klíčovými scénáři (1:40 – 2:25)
*(👉 Přejít na Slide 4)*
> *„Funkčnost prototypu jsme prakticky ověřili na scénářích z projektové specifikace:*  
> *V prvním scénáři vystupuje **Tereza**, která na mobilním telefonu v tramvaji klepne na Pátek a napíše 'indie'. Výsledky se zúží na 8 koncertů za 0,1 sekundy a Tereza si během **14 sekund** vybere kapelu Lunar Tides a přidá si ji do programu. Žádné horizontální skrolování, všechny prvky jsou v dosahu palce.*  
> *Ve druhém scénáři **Jakub** na desktopu skládá sobotní harmonogram. Přidá si klubový set i workshop ve shodný čas 15:30. Aplikace okamžitě vyvolá varovný banner upozorňující na kolizi v délce **75 minut**. Jakub přepne na pohled 'Pouze můj program', odebere workshop a rozvrh má vyřešený. Data zůstávají v paměti i po obnovení stránky klávesou F5.“*

---

### Slide 5: Využití AI a odhalené halucinace (2:25 – 3:15)  
*(⚠️ Klíčový moment prezentace – zdůraznit lidský zásah!)*
*(👉 Přejít na Slide 5)*
> *„K využití AI přistupujeme s plnou týmovou odpovědností. Generativní AI jsme využili k návrhu kostry CSS Gridu a matematického porovnání časů.*  
> *Zásadní však bylo to, **co jsme odhalili a odmítli**:*  
> *Zaprvé: AI se nám pokusilo vnutit externí npm balíčky Moment.js a Date-fns. To jsme striktně zamítli, protože zadání ČZU vyžaduje čistě klientský běh bez instalace. Přepočet jsme napsali v nativním JavaScriptu.*  
> *Zadruhé: původní skript AI porovnával časy pouze jako textové řetězce, což fatálně selhávalo u akcí jdoucích přes půlnoc. Logiku jsme opravili na převod do časových razítek.*  
> *Zatřetí: AI navrhlo filtrační čipy jako běžné `div` elementy s událostí onclick. Pro uživatele na klávesnici to bylo zcela nepřístupné. Přepsali jsme je na sémantická tlačítka button s atributem aria-pressed a viditelným fokusem.“*

---

### Slide 6: Validace řešení a UX poznatky (3:15 – 3:50)
*(👉 Přejít na Slide 6)*
> *„Řešení jsme validovali kognitivním průchodem se třemi nezávislými testery. Díky nim jsme odhalili dva reálné UX problémy a ihned je v prototypu opravili:*  
> *Aktivní filtrační čipy měly na slunci slabý kontrast – přidali jsme výrazný azurový rámeček a výplň.*  
> *A po kliknutí na uložení do programu chyběla okamžitá zpětná vazba – doplnili jsme změnu textu na '✓ V mém programu' a počítadlo v navigaci.*  
> *Konzole prohlížeče vykazuje nula chyb a prototyp je plně připraven jako stabilní základ pro implementaci v Cvičení 4.*  
> *Děkuji vám za pozornost a těším se na vaše dotazy.“*

---

## 🛡️ Očekávané otázky cvičícího a neprůstřelné odpovědi

### Otázka 1: *„Jak přesně máte v čistém JavaScriptu vyřešený algoritmus detekce kolizí v osobním programu?“*
- **Modelová odpověď:**  
  *„Algoritmus v `schedule.js` nejprve načte vybraná ID z `localStorage` a vyfiltruje odpovídající položky z festivalové databáze pro stejný den. Seřadí je vzestupně podle začátku akce. Následně v lineárním čase prochází sousední dvojice a porovnává konec první akce $(\text{start}_A + \text{duration}_A)$ se začátkem druhé akce $\text{start}_B$. Pokud je konec první akce větší než start druhé, máme kolizi. Rozdíl v minutách vyčíslíme a okamžitě zobrazíme uživateli ve varovném banneru.“*

### Otázka 2: *„Proč jste prototyp navrhovali zrovna pro mobilní šířku 360 až 390 pixelů?“*
- **Modelová odpověď:**  
  *„Vycházeli jsme z reálných dat návštěvnosti – přes 75 % uživatelů festivalu bude web používat přímo v terénu z mobilu. Šířka 360 px představuje nejmenší běžné rozlišení moderních telefonů Android a 390 px odpovídá iPhonu 13/14. Když web bezchybně funguje v palcové zóně na tomto úzkém viewportu bez horizontálního přetékání a s dotykovými plochami minimálně 44 × 44 pixelů, na desktopu přes CSS Grid funguje automaticky skvěle.“*

### Otázka 3: *„Co přesně odlišuje vaše 3 funkce od běžných odkazů v menu nebo slideshow?“*
- **Modelová odpověď:**  
  *„Katedra výslovně stanovuje, že prostá navigace či slideshow se jako interaktivní funkce nepočítají. Naše funkce mění stav a zpracovávají data na vstupu od uživatele: multikriteriální filtr dynamicky přepočítává a filtruje DOM strom v paměti na základě kombinace 4 kritérií; osobní program perzistentně zapisuje do localStorage a provádí matematickou detekci kolizí; a detail interpreta dynamicky parsuje URL parametry a generuje kontextový harmonogram vystoupení daného interpreta.“*

### Otázka 4: *„Jak jste ověřili, že vaše filtrační čipy vyhovují přístupnosti z klávesnice?“*
- **Modelová odpověď:**  
  *„Ověřili jsme to fyzickým průchodem pouze pomocí klávesy Tab, mezerníku a Enteru bez použití myši. Namísto obecných tagů div jsme použili nativní HTML tlačítka `<button>`, která mají automatickou fokusovatelnost, stav `aria-pressed="true/false"` pro čtečky obrazovky a v CSS zřetelný obrys `:focus-visible` s kontrastem 9.3:1.“*

---

## 💡 Tipy pro vystupujícího
- **Tempo:** Začněte s rozvahou, nepředbíhejte. Slide 3 (tři funkce) a Slide 5 (AI chyby) jsou hlavní body zájmu cvičících.
- **Ruce a gesta:** Pokud prezentujete u plátna, ukažte na slidech palcovou zónu a vyčíslení překryvu 75 minut.
- **Čas:** Pokud uvidíte na stopkách 3:30 min u Slidu 5, klidně přejděte na Slide 6 a v čase 3:55 min ukončete. Získáte maximum bodů za dodržení časového limitu.

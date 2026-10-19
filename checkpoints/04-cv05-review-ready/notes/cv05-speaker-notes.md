# Tahák pro mluvčího – Prezentace Cvičení 5 (WEB ČZU)

Předmět: **Web design (WEB)** | PEF ČZU v Praze  
Milník: **Cvičení 5 – První funkční implementace (Review-Ready) & Testy scénářů**  
Časový limit: **3 až 5 minut**  
Doporučený čas řeči: **3:45 – 4:15 min** (ponechává bezpečnou rezervu pro dotazy a diskuzi).

---

## ⏱️ Minutový harmonogram řeči

```
[0:00 - 0:45] Slide 1 & 2: Úvod, kritérium rozpracovanosti (100 % hotovo vs 50 % minimum)
[0:45 - 1:45] Slide 3: Výsledky empirického průchodu 3 scénáři (Tereza, Jakub, Martin)
[1:45 - 2:30] Slide 4: Hlavní rozhodnutí, známé nedostatky a technické trade-offs
[2:30 - 3:15] Slide 5: Využití AI a kategorické odmítnutí regexového testování
[3:15 - 3:50] Slide 6 & 7: Testovací matice platforem a připravenost na cross-review
[3:50 - 5:00] Rezerva pro dotazy cvičícího / diskuze
```

---

## 🎙️ Doslovný scénář po jednotlivých slidech

### Slide 1: Titulní slide & Úvod (0:00 – 0:20)
> *„Dobrý den, jménem týmu festivalu **Aurora 2026** vám představuji review-ready verzi naší webové aplikace pro Cvičení 5. Dnešním cílem je obhájit stav rozpracovanosti, představit výsledky praktického průchodu třemi scénáři, transparentně uvést technické kompromisy a deklarovat připravenost pro oponenturu.“*

---

### Slide 2: Co se udělalo – Stav Review-Ready verze (0:20 – 0:50)
*(👉 Přejít na Slide 2)*
> *„Katedra pro Cvičení 5 předepisuje minimální rozpracovanost 50 %. Náš projekt dosahuje **100% dokončení** napříč všemi částmi.*  
> *Máme kompletně hotových všech 7 šablon, databáze obsahuje 3 dny, 3 scény, 60 unikátních interpretů a 60 programových položek bez kolizí na pódiích.*  
> *Všechny tři interaktivní funkce jsou plně implementovány. Aplikace je ve stavu **zero blocking issues** – nemá žádné konzolové chyby, žádné slepé odkazy a funguje stoprocentně offline přímo přes protokol `file:///` bez nutnosti serveru.“*

---

### Slide 3: Výsledky empirického průchodu 3 scénáři (0:50 – 1:45)
*(👉 Přejít na Slide 3)*
> *„Aplikaci jsme podrobili důkladnému testování všech tří scénářů:*  
> *V prvním scénáři **Tereza** na iPhonu 13 v emulaci 390 pixelů otevřela program, klepla na Čtvrtek a zadala 'indie'. Výsledky se bleskově zúžily. Tereza otevřela detail kapely Lunar Tides (vystoupení v 10:00 na Main Stage) a uložila koncert do programu. Celý úkol zvládla za **14 sekund** bez jediného zádrhelu.*  
> *Ve druhém scénáři **Jakub** na desktopu v rozlišení Full HD sestavoval sobotní itinerář. Přidal dvě vystoupení ve stejný čas v 10:00 (Rain Motel a Lunar District). Aplikace okamžitě vyvěsila varovný pruh s textem: 'Upozornění na konflikt: Překryv 75 minut!'. Po odebrání jedné akce varování zmizelo. Data spolehlivě přetrvávají v localStorage i po restartu prohlížeče.*  
> *Ve třetím scénáři **Martin** na tabletu iPad prověřoval bezbariérovost sálu Forum Hall. Na kartě scény okamžitě našel potvrzení nájezdové rampy a bezbariérových toalet a v sekci praktických informací v interaktivním FAQ ověřil vyhrazené bezplatné parkoviště P1 a nízkopodlažní spoje MHD.*  
> *Všechny tři scénáře skončily stoprocentním úspěchem.“*

---

### Slide 4: Hlavní rozhodnutí, známé nedostatky a trade-offs (1:45 – 2:30)
*(👉 Přejít na Slide 4)*
> *„V souladu s akademickou poctivostí otevřeně deklarujeme pro oponentní tým tři drobné vlastnosti a limity:*  
> *První: **nemáme dynamickou mapu** postavenou na Google Maps či Leafletu. Důvod je racionální – zadání striktně vyžaduje 100% offline provoz a nulové externí knihovny či API klíče, které by při výpadku sítě selhaly. Nahradili jsme ji přehlednými kartami scén a schématem areálu.*  
> *Druhé: **rozvrh v localStorage je vázán na konkrétní zařízení**. Pro synchronizaci mezi mobilem a notebookem by byl nutný backend s přihlašováním, což pravidla předmětu zakazují.*  
> *A třetí: odpočet směřuje k datu 20. srpna 2026. Po jeho uplynutí web přirozeně zobrazí stav 'Festival právě probíhá!'.*  
> *Žádné kritické ani blokující vady v aplikaci neexistují.“*

---

### Slide 5: Využití AI a odhalené halucinace při testování (2:30 – 3:15)  
*(⚠️ Klíčový moment – zdůraznit odmítnutí regexového švindlu od AI!)*
*(👉 Přejít na Slide 5)*
> *„Při testování jsme AI využili pouze jako pomocníka pro sestavení strukturované testovací tabulky.*  
> *Zde je však zásadní příklad lidského dohledu:*  
> *AI asistent nám navrhl, že pro 'ověření scénáře není potřeba fyzicky klikat, ale stačí spustit regex kontrolující přítomnost CSS tříd v kódu'.*  
> *Tento návrh jsme **kategoricky odmítli**! Dle pravidel ČZU platí, že pouhé tvrzení 'ověřeno pomocí AI' není validací a regex nekontroluje reálné chování v prohlížeči. Všechny scénáře jsme osobně a manuálně odkrokovali na reálných dotykových displejích se stopkami v ruce.“*

---

### Slide 6 & 7: Testovací matice platforem a stav pro Cvičení 6 (3:15 – 3:55)
*(👉 Přejít na Slide 6 a 7)*
> *„Naše testovací matice zahrnuje iPhone 13, Pixel 7, levný telefon Samsung s šířkou 360 pixelů, iPad Air a desktop s Windows i macOS – na všech platformách máme **100% PASS**.*  
> *Aplikace je kompaktní pod 100 kilobajtů a načítá se okamžitě pod 0,1 sekundy.*  
> *Pro oponentní tým máme připravený kompletní balíček: funkční složku `web/`, schválenou projektovou specifikaci i datový soubor `data.json`. Doporučujeme oponentům provést kombinaci Nielsenovy heuristické analýzy a kognitivního průchodu.*  
> *Děkuji vám za pozornost a těším se na vaše dotazy.“*

---

## 🛡️ Očekávané otázky cvičícího a neprůstřelné odpovědi

### Otázka 1: *„Proč jste se rozhodli nepoužít interaktivní mapu, například Leaflet s OpenStreetMap?“*
- **Modelová odpověď:**  
  *„Zadání semestrální práce výslovně předepisuje, že web musí být stoprocentně funkční přímo v prohlížeči v offline režimu přes protokol `file:///` a bez externích závislostí. Kdybychom vložili knihovnu Leaflet nebo dlaždice OpenStreetMap, při offline otevření by se v konzoli objevily síťové chyby a místo mapy by zůstala prázdná šedá plocha. Zvolili jsme proto robustní sémantické řešení: detailní profily scén s přesnými adresami, fotografiemi, GPS souřadnicemi a schématem areálu, které je stoprocentně spolehlivé za všech okolností.“*

### Otázka 2: *„Co se stane s osobním programem v localStorage, když uživatel otevře web v anonymním okně prohlížeče Safari?“*
- **Modelová odpověď:**  
  *„V souboru `app.js` máme práci s `localStorage` důsledně ošetřenu blokem `try/catch`. Pokud je přístup do Web Storage zablokován (např. bezpečnostní politikou privátního režimu), kód nespadne na neošetřenou výjimku, ale korektně spadne do in-memory pole v paměti JS runtime. Uživatel si může program během sezení skládat a kontrolovat kolize, pouze se data neuloží trvale pro další návštěvu.“*

### Otázka 3: *„Proč jste implementovali 100 % webu už na 5. cvičení, když katedra vyžaduje pouze 50 %?“*
- **Modelová odpověď:**  
  *„Mít hotový celý web je pro nás obrovskou strategickou výhodou. Za prvé: oponentní tým na Cvičení 6 obdrží hotové dílo a provede skutečně hloubkové expertní hodnocení všech částí, nikoliv jen polotovaru. Za druhé: budeme mít celé dva týdny na Cvičení 6 a finální odevzdání na zapracování jejich připomínek bez časového stresu z dopisování kódu na poslední chvíli.“*

### Otázka 4: *„Jak konkrétně předáte projekt oponentnímu týmu pro cross-review?“*
- **Modelová odpověď:**  
  *„Předáme ZIP archiv obsahující složku `web/` s funkčním `index.html`, soubor `project-specification.md` s definovanými scénáři a personami a `data.json`. Oponentnímu týmu stačí archiv rozbalit a poklepat na `index.html` v libovolném prohlížeči – nepotřebují instalovat žádný Node.js, balíčkovače ani server.“*

---

## 💡 Tipy pro vystupujícího
- **Důraz na 100 % rozpracovanost:** Zdůrazněte, že tým překonal předepsaných 50 % a nabízí kompletní funkční celek.
- **Transparence kompromisů (Slide 4):** Přiznání limitů (chybějící Leaflet mapa kvůli offline provozu) působí vysoce profesionálně a odzbrojí kritiku zkoušejícího.
- **Čas:** Hlídejte si čas 3:50 min pro plynulý přechod na závěrečný slide.

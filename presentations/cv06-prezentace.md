---
marp: true
theme: uncover
class: invert
paginate: true
header: 'Hudební Festival Aurora 2026 | WEB ČZU (Cvičení 6)'
footer: 'Tým Aurora • Expertní hodnocení (Cross-Review) oponentního projektu'
style: |
  section {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: #0f172a;
    color: #f8fafc;
    text-align: left;
    padding: 40px 60px;
  }
  h1 {
    color: #38bdf8;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
  h2 {
    color: #818cf8;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #334155;
    padding-bottom: 0.3rem;
  }
  table {
    font-size: 0.78rem;
    width: 100%;
    margin-top: 8px;
  }
  th {
    background: #1e293b;
    color: #38bdf8;
  }
  td {
    border-bottom: 1px solid #334155;
  }
  ul, ol {
    font-size: 0.90rem;
    line-height: 1.45;
  }
  li {
    margin-bottom: 6px;
  }
  .highlight {
    color: #38bdf8;
    font-weight: bold;
  }
  .tag-critical {
    background: #7f1d1d;
    border: 1px solid #ef4444;
    color: #fca5a5;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
  }
  .tag-major {
    background: #78350f;
    border: 1px solid #f59e0b;
    color: #fcd34d;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
  }
  .tag-minor {
    background: #1e293b;
    border: 1px solid #38bdf8;
    color: #38bdf8;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
  }
---

# Hudební Festival Aurora 2026
## Expertní hodnocení (Cross-Review) oponentního projektu

**Předmět:** Web design (WEB) – PEF ČZU v Praze  
**Milník:** Cvičení 6 • Prezentace křížového hodnocení  
**Časový limit prezentace:** 3–5 minut  

- **Hodnocený projekt:** Studentský festival oponentního týmu (*SoundWave Festival 2026*)
- **Aplikované metody:** Heuristická analýza (10 heuristik J. Nielsena) & Kognitivní průchod
- **Cíl prezentace:** Seznámení s metodikou, kategorizovanými nálezy, návrhy nápravy a rolí AI

---

## 1. Co se udělalo – Metodika hodnocení

Provedli jsme formalizované expertní hodnocení oponentního webu pomocí **dvou nezávislých metod**:

1. **Heuristická analýza (10 obecných heuristik Jakoba Nielsena):**
   - Systematická inspekce celého uživatelského rozhraní proti standardům použitelnosti:
   - Důraz na *H1 (Viditelnost stavu)*, *H3 (Uživatelská kontrola)*, *H4 (Konzistence)* a *H5 (Prevence chyb)*.
2. **Kognitivní průchod (Cognitive Walkthrough):**
   - Empirický test 2 klíčových uživatelských scénářů oponentního projektu:
     - *Scénář 1:* Návštěvník hledající vystoupení konkrétního žánru v páteční večer na mobilu.
     - *Scénář 2:* Návštěvník se specifickými potřebami prověřující bezbariérovost areálu.
3. **Technický a přístupnostní audit:**
   - Kontrola běhu přes protokol `file:///` bez serveru, W3C HTML validace a měření kontrastu WebAIM.

---

## 2. Průchod klíčovými scénáři oponentního projektu

### Scénář 1: Výběr pátečního večerního programu na mobilním telefonu
- **Průběh:** Tester přistoupil na mobilním viewportu (360 px) do sekce programu.
- **Zjištění:** Filtrování podle dnů funguje vizuálně dobře. Avšak při otevření přímo ze souborového systému (protokol `file:///`) se program vůbec nenačetl kvůli chybě CORS!
- **Zhodnocení:** Úkol nebyl v offline režimu splnitelný bez zásahu vývojářských nástrojů.

### Scénář 2: Hledání bezbariérového přístupu a logistiky areálu
- **Průběh:** Tester hledal informace o bezbariérovosti v navigaci a v patičce.
- **Zjištění:** Informace jsou přítomny v sekci FAQ, ale text má nízký kontrast na šedém podkladu (2.7:1). Navíc chybí explicitní údaj o vyhrazeném parkování ZTP.
- **Zhodnocení:** Úkol částečně splněn s vysokou kognitivní zátěží a sníženou čitelností.

---

## 3. Hlavní rozhodnutí – Kategorizace nálezů

Identifikovali jsme celkem 5 věcných nálezů rozdělených dle závažnosti:

| ID | Oblast & Popis nálezu | Závažnost | Heuristika / Norma | Způsob objevení |
|---|---|---|---|---|
| **N-01** | **CORS blokace dat při běhu přes `file:///`** – volání `fetch('data.json')` selže v Chrome bez lokálního serveru. | <span class="tag-critical">KRITICKÁ</span> | H5 (Prevence chyb) / Zadání WEB | Offline test v Chrome |
| **N-02** | **Kolaps mobilní navigace na šířce 360 px** – navigační odkazy přetékají mimo viewport a překrývají nadpis. | <span class="tag-major">VÝZNAMNÁ</span> | H4 (Konzistence) / Mobile-First | DevTools simulace 360 px |
| **N-03** | **Nedodržení kontrastu WCAG AA v FAQ** – šedý text `#71717a` na pozadí `#27272a` má kontrast pouze 2.7:1. | <span class="tag-major">VÝZNAMNÁ</span> | WCAG 2.0 AA (1.4.3 Contrast) | WebAIM Contrast Checker |
| **N-04** | **Chybějící stav `aria-current="page"`** v navigačním menu pro orientaci čteček a uživatelů. | <span class="tag-minor">DROBNÁ</span> | H1 (Viditelnost stavu systému) | Inspekce DOM stromu |
| **N-05** | **Absence prázdného stavu (Empty State)** při vyhledávání neexistujícího interpreta. | <span class="tag-minor">DROBNÁ</span> | H9 (Rozpoznání a zotavení z chyb) | Test vyhledávacího pole |

---

## 4. Doporučená řešení pro oponentní tým

Pro každý nález předkládáme konkrétní a konstruktivní návod k nápravě:

1. **Řešení N-01 (Kritická – CORS selhání):**
   - Zavést synchronní bootstrap: exportovat data v `data.js` do `window.FESTIVAL_DATA` a skript nalinkovat před aplikační logiku. Tím bude zaručen 100% offline běh i pro zápočet.
2. **Řešení N-02 (Významná – Přetékání navigace):**
   - V CSS přidat pravidlo `flex-wrap: wrap; gap: 8px;` a zmenšit padding tlačítek pro úzké displeje $\le 360\text{ px}$.
3. **Řešení N-03 (Významná – Kontrast WCAG):**
   - Zesvětlit barvu textu FAQ z `#71717a` na minimálně `#a1a1aa` (zvýší kontrast na bezpečných 5.8:1, plné splnění WCAG AA).
4. **Řešení N-04 a N-05 (Drobné vady):**
   - Doplnit atribut `aria-current="page"` na aktivní odkaz a komponentu s textem *„Žádný interpret nebyl nalezen“*.

---

## 5. Využití AI při cross-review a odhalené halucinace

> *„AI navrhovalo neexistující syntaktické chyby a obecné klišé – lidský audit zachránil objektivitu.“*

### K čemu jsme AI využili:
- Asistence při generování strukturované matice 10 Nielsenových heuristik a formulaci konstruktivních doporučení.

### Odhalené halucinace a limity AI při review:
1. **Falešná pozitivita (False Positive):** AI tvrdilo, že oponentnímu projektu chybí deklarace `<!DOCTYPE html>`. Přímou inspekcí zdrojového kódu jsme ověřili, že doctype je na řádku 1 přítomen. Tvrzení AI bylo odmítnuto.
2. **Vágní designová klišé bez kódového řešení:** AI generovalo obecné fráze typu *„web by mohl působit moderněji“*. Tým tyto subjektivní dojmy škrtl a nahradil je exaktním měřením pixelů a kontrastních poměrů.
3. **Lidská odpovědnost:** Všechny nálezy N-01 až N-05 byly osobně reprodukovány v prohlížeči.

---

## 6. Validace a verifikace nálezů

Deklarujeme nezávislé a reprodukovatelné metody ověření všech zjištění:

1. **Reprodukce CORS chyby:**
   - Dvojklik na soubor `index.html` v Google Chrome $\to$ otevření konzole F12 $\to$ zachycena červená výjimka `Origin null is not allowed by Access-Control-Allow-Origin`.
2. **Kvantitativní měření kontrastu:**
   - WebAIM Contrast Checker změřil poměr 2.7:1 pro text FAQ (požadavek WCAG AA je $\ge 4.5:1$).
3. **Responzivní verifikace:**
   - Chrome DevTools v emulaci rozměru 360 × 640 px potvrdil horizontální scrollbar o šířce 42 px.
4. **Konstruktivní tón:**
   - Hodnocení je vedeno férově a s cílem pomoci oponentům získat plný počet bodů při finálním odevzdání.

---

## 7. Závěrečné shrnutí a doporučení

### Silné stránky oponentního projektu:
- Velmi zdařilý vizuální koncept a nápaditá témata festivalu.
- Čistě rozdělená struktura souborů a srozumitelné textové anotace kapel.
- Rychlá odezva klientského rozhraní po načtení.

### Klíčové doporučení před finálním odevzdáním:
1. **Priorita 1:** Okamžitě vyřešit offline načítání dat (N-01) přes synchronní JavaScript proměnnou – bez toho hrozí ztráta bodů při hodnocení na cvičení.
2. **Priorita 2:** Opravit kontrast textu FAQ (N-03) a zalomení navigace na 360 px (N-02).
- Detailní zpráva byla odevzdána v souboru `review/review.md`.

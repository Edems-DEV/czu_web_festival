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
   - Systematická inspekce celého uživatelského rozhraní proti standardům použitelnosti.
   - Důraz na *H1 (Viditelnost stavu)*, *H3 (Uživatelská kontrola)*, *H4 (Konzistence)* a *H5 (Prevence chyb)*.
2. **Kognitivní průchod (Cognitive Walkthrough):**
   - Empirický test 2 klíčových uživatelských scénářů oponentního projektu:
     - *Scénář A:* Výběr pátečního večerního koncertu podle žánru na mobilním telefonu.
     - *Scénář B:* Prověření bezbariérovosti a logistiky areálu pro návštěvníka se specifickými potřebami.
3. **Technický a přístupnostní audit:**
   - Kontrola běhu přes protokol `file:///`, integrita `data.json`, validace a měření kontrastu WebAIM dle WCAG 2.0 AA.

---

## 2. Průchod klíčovými scénáři oponentního projektu

### Scénář A: Výběr pátečního koncertu podle žánru na mobilu (Klára, 22 let)
- **Průběh:** Otevření mobilního menu $\to$ výběr Pátku $\to$ hledání žánrového filtru.
- **Zjištění:** Žánrový filtr zcela chybí (pouze filtr scén); přidání do oblíbených se neukládá do `localStorage` a po F5 zmizí. Systém nevaruje před časovým překryvem.
- **Zhodnocení:** Úkol splněn pouze s vysokou kognitivní zátěží; perzistence selhává.

### Scénář B: Prověření bezbariérovosti a dopravy (Jan, 38 let, vozík)
- **Průběh:** Hledání praktických informací $\to$ prověření haly Warehouse Stage $\to$ parkování.
- **Zjištění:** Text obsahuje vágní deklaraci bez parametrů ramp a vyvýšených plošin; u Warehouse Stage chybí bezbariérovost zcela; chybí vyhrazená stání ZTP.
- **Zhodnocení:** Vysoká nejistota návštěvníka; kritické chybějící údaje pro hendikepované.

---

## 3. Hlavní rozhodnutí – Výběr klíčových nálezů

Identifikovali jsme celkem 9 věcných nálezů v posudku; zde uvádíme nejdůležitější:

| ID | Oblast & Popis nálezu | Závažnost | Heuristika / Norma | Způsob objevení |
|---|---|---|---|---|
| **REV-01** | **Absence perzistence v localStorage & nulová detekce kolizí** v programu. | <span class="tag-critical">KRITICKÁ</span> | H5 (Prevence chyb), H7 | Kognitivní průchod & kód |
| **REV-02** | **Referenční diskrepance v DB** – odkaz na `p14`/`p27` otevírá `undefined` s pádem skriptu. | <span class="tag-critical">KRITICKÁ</span> | H1 (Viditelnost), H4 | Analýza integrity dat |
| **REV-03** | **Nedodržení kontrastu WCAG AA** – sekundární text `#71717a` má kontrast pouze 3.38:1. | <span class="tag-major">VÝZNAMNÁ</span> | WCAG 2.0 AA (1.4.3 Contrast) | WebAIM Contrast Checker |
| **REV-04** | **Rigidní jednoúrovňový filtr** (den ruší scénu) & absence prázdného stavu s resetem. | <span class="tag-major">VÝZNAMNÁ</span> | H3 (Uživatelská svoboda), H9 | Test kombinatoriky filtrů |
| **REV-05** | **Vágní bezbariérové údaje** bez specifikace ramp, ZTP stání a plošin na scénách. | <span class="tag-major">VÝZNAMNÁ</span> | H2 (Reálný svět), H10 | Kognitivní průchod Scénář B |
| **REV-06** | **Mobilní menu bez `aria-expanded` a focus trapu** (únik fokusu klávesnice pod menu). | <span class="tag-major">VÝZNAMNÁ</span> | H3 (Kontrola), WCAG Klávesnice | Klávesový test Tab & Escape |

---

## 4. Doporučená řešení pro oponentní tým

Pro každý identifikovaný nález předkládáme konkrétní a konstruktivní řešení:

1. **Řešení REV-01 (Kritická – Perzistence & Kolize):**
   - Ukládat ID do `localStorage`; při přidání seřadit časové intervaly a kolidující akce označit výstražným pruhem s délkou překryvu v minutách.
2. **Řešení REV-02 (Kritická – Integrita dat):**
   - Opravit předávání parametrů v šabloně (`?id=${p.id}`) a synchronizovat časy v `data.json` a profilech.
3. **Řešení REV-03 (Významná – Kontrast WCAG):**
   - Zesvětlit barvu sekundárního textu z `#71717a` na `#a1a1aa` (zvýší kontrast na bezpečných 6.2:1, plné splnění WCAG AA).
4. **Řešení REV-04 a REV-06 (Významné – Filtry & Mobilní menu):**
   - Provázat filtry jako logický součin (den AND scéna), přidat empty state s resetem; doplnit `aria-expanded` a obsluhu klávesy Escape.

---

## 5. Využití AI při cross-review a odhalené halucinace

> *„AI pomohlo se strukturou heuristické matice – lidský audit zabránil halucinacím a falešným obviněním.“*

### K čemu jsme AI využili:
- Asistence při sestavení matice 10 Nielsenových heuristik a checklistu dle WCAG 2.0 AA.

### Odhalené halucinace a limity AI při review:
1. **Falešná pozitivita (False Positive):** AI tvrdilo, že oponentnímu projektu chybí deklarace `<!DOCTYPE html>`. Přímou inspekcí zdrojového kódu jsme ověřili, že doctype je na řádku 1 přítomen. Tvrzení AI bylo okamžitě odmítnuto.
2. **Vágní designová klišé bez kódového řešení:** AI generovalo obecné fráze typu *„web by mohl působit moderněji“*. Tým tyto subjektivní dojmy vyřadil a nahradil je exaktním měřením pixelů a kontrastních poměrů.
3. **Lidská odpovědnost:** Všech 9 nálezů REV-01 až REV-09 bylo osobně verifikováno v reálném prohlížeči.

---

## 6. Validace a verifikace nálezů

Deklarujeme nezávislé a reprodukovatelné metody ověření všech zjištění:

1. **Reprodukce selhání v prohlížeči:**
   - Dvojklik na odkaz kapely `p14` $\to$ zachycena výjimka v DevTools konzoli $\to$ potvrzena vada REV-02.
2. **Kvantitativní měření kontrastu:**
   - WebAIM Contrast Checker změřil poměr 3.38:1 pro sekundární text `#71717a` na pozadí `#18181b` (požadavek WCAG AA je $\ge 4.5:1$).
3. **Klávesová navigace:**
   - Test tabulátorem v mobilním rozbaleném menu odhalil únik fokusu na skryté prvky na pozadí.
4. **Konstruktivní akademický tón:**
   - Hodnocení je vedeno férově s cílem pomoci oponentům získat plný počet bodů při finální obhajobě.

---

## 7. Závěrečné shrnutí a doporučení

### Silné stránky oponentního projektu SoundWave 2026:
- Velmi zdařilý vizuální koncept a nápaditá dramaturgie festivalu.
- Čistě rozdělená struktura souborů, sémantické značkování úvodní stránky.
- Blesková odezva statických šablon bez zbytečných externích knihoven.

### Klíčová doporučení před finálním odevzdáním:
1. **Priorita 1:** Opravit kritické vady **REV-01** (perzistence v localStorage a detekce kolizí) a **REV-02** (nefunkční ID kapel `p14`/`p27`).
2. **Priorita 2:** Zvýšit kontrast sekundárního textu na WCAG AA poměr $\ge 4.5:1$ (**REV-03**).
3. **Priorita 3:** Doplnit konkrétní fakta pro tělesně hendikepované návštěvníky (**REV-05**).
- Kompletní posudek o 9 nálezech je k dispozici v `project/review.md`.

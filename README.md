# Hudební Festival Aurora 2026

Semestrální projekt pro předmět **Web design (WEB)** na Provozně ekonomické fakultě České zemědělské univerzity v Praze (PEF ČZU).

[![HTML5 Living Standard](https://img.shields.io/badge/HTML5-Semantic%20Valid-brightgreen)](https://validator.w3.org/)
[![WCAG 2.0 AA](https://img.shields.io/badge/Accessibility-WCAG%202.0%20AA%20Compliant-blue)](https://www.w3.org/WAI/WCAG2AA-Conformance)
[![Schema.org](https://img.shields.io/badge/Schema.org-JSON--LD%20Verified-orange)](https://schema.org/)
[![Pure Client-Side](https://img.shields.io/badge/Runtime-100%25%20Offline%20file%3A%2F%2F%2F-success)](https://developer.mozilla.org/)

---

## 🎯 O projektu

Webová aplikace pro fiktivní třídenní městský hudebně-vzdělávací festival **Aurora 2026** konaný v areálu **Výstaviště Praha, Praha 7 (Holešovice)** v termínu **20. 8. – 22. 8. 2026**.

Festival propojuje živá vystoupení moderní nezávislé a elektronické hudby, rocku, jazzu i world music s odbornými přednáškami a praktickými hudebně-produkčními workshopy. Areál disponuje 3 scénami s celkovou okamžitou kapacitou přes 10 500 návštěvníků (*Aurora Main Stage*, *Riverside Club Stage*, *Forum Hall*).

Web je navržen s důrazem na špičkový uživatelský zážitek (UX), vysokou přístupnost (WCAG 2.0 AA), sémantiku HTML5, mobile-first responzivitu a 100% offline spolehlivost bez nutnosti stahovat objemné mobilní aplikace.

---

## ✨ Klíčové vlastnosti a interaktivní funkce

Aplikace zahrnuje **3 plnohodnotné interaktivní funkce** předepsané sylabem předmětu WEB:

1. **Vícekriteriální filtr a live vyhledávání programu (`program.html`):**
   - Okamžité filtrování 60 festivalových položek podle 3 dnů, 3 scén a formátů (koncert, talk, workshop).
   - Reálné fulltextové vyhledávání reagující na vstup z klávesnice bez znovunačtení stránky.
   - Počítadlo nalezených položek a kultivovaný prázdný stav (`#empty-schedule-state`) s tlačítkem resetu.
2. **Osobní program („Můj program“) s automatickou detekcí kolizí (`localStorage`):**
   - Trvalé ukládání oblíbených akcí do prohlížeče pod klíčem `aurora_festival_favorites`.
   - Matematický kolizní algoritmus v `app.js` a `schedule.js`: při výběru dvou akcí s překrývajícím se časem ve stejném dni okamžitě zobrazí kontrastní varovný banner s **přesným vyčíslením délky překryvu v minutách** a vizuálním označením kolidujících karet.
   - Přepínač zobrazení *„Pouze můj program“* pro přehledný osobní itinerář.
3. **Parametrický profil interpreta a propojený rozpis scén (`performer-detail.html`):**
   - Dynamické načtení kteréhokoliv z 60 interpretů (`p1` až `p60`) přes parametr URL `?id=...`.
   - Kompletní biografie, žánr, země původu a chronologický rozpis všech vystoupení umělce.
   - Přímé přidání do osobního rozvrhu a křížové odkazy na technické a bezbariérové zázemí scén (`venues.html#v...`).

### Další technické a designové standardy:
- **Čistě klientská architektura:** 100% čistý Vanilla JavaScript, sémantické HTML5 a CSS3 bez runtime závislostí (žádný Node.js backend, balíčkovače ani Docker).
- **Offline provoz bez CORS:** Synchronní in-memory adaptér `web/js/data.js` (`window.FESTIVAL_DATA`) zaručuje bezchybný běh přes souborový protokol `file:///`.
- **Přístupnost WCAG 2.0 AA:** Kontrast všech textů $\ge 5.7:1$ (běžný text) a $\ge 16:1$ (primární text AAA), klávesová navigace s výrazným `:focus-visible`, sémantická drobečková navigace (`nav.breadcrumb`), dotykové plochy $\ge 44 \times 44\text{ px}$ a podpora snížení pohybu (`prefers-reduced-motion`).
- **SEO, AEO a GEO optimalizace:** Validní strukturovaná data Schema.org (JSON-LD) napříč všemi 7 šablonami (`MusicFestival`, `ItemList`, `MusicEvent`, `MusicGroup`, `MusicVenue`, `FAQPage`, `WebSite`).

---

## 📁 Kompletní adresářová struktura

```text
czu_web_festival/
├── PROJECT.md                      # Hlavní plán projektu, inventář funkcí a rozhraní
├── README.md                       # Tento průvodce projektem a instrukce pro spuštění
├── project-specification.md        # Projektová specifikace (Cv 2: identita, 3 persony, 3 scénáře, IA)
├── data.json                       # Datová základna (3 dny, 3 scény, 60 interpretů, 60 akcí)
├── ai-log.md                       # Transparentní audit využití AI, promptů a lidské validace
├── documentation.md                # Závěrečná semestrální zpráva (Cv 6: matice oponentury, tooling, AI reflexe)
├── web/                            # 100% čistě klientská webová aplikace (HTML5/CSS3/Vanilla JS)
│   ├── index.html                  # Úvodní stránka s odpočtem, headlinery a rozcestníkem
│   ├── program.html                # Harmonogram s vícekriteriálním filtrem a detekcí kolizí
│   ├── performers.html             # Responzivní katalog 60 interpretů s žánrovým filtrem
│   ├── performer-detail.html       # Parametrický profil interpreta (?id=p1..p60)
│   ├── venues.html                 # Přehled 3 scén, technické parametry a bezbariérovost
│   ├── practical-info.html         # Doprava, vstupenky, areálový řád a interaktivní FAQ
│   ├── search.html                 # Dedikovaná globální vyhledávací stránka napříč entitami
│   ├── css/
│   │   └── style.css               # Design systém, CSS Custom Properties, WCAG tokeny, grid
│   └── js/
│       ├── data.js                 # In-memory synchronní bootstrap (window.FESTIVAL_DATA) pro file:///
│       ├── app.js                  # Globální navigace, localStorage, detekce časových kolizí
│       └── schedule.js             # Vykreslování programu, stavové filtry a live search
├── docs/                           # Průběžné zprávy ze cvičení
│   ├── progress-02.md              # Průběžná zpráva pro Cvičení 3 (UX prototyp, 3 funkce, persony)
│   ├── progress-03.md              # Průběžná zpráva pro Cvičení 4 (Implementace, UX trendy, testování)
│   └── progress-04.md              # Průběžná zpráva pro Cvičení 5 (Review-ready verze, známé nedostatky)
├── presentations/                  # Prezentace pro obhajoby na cvičeních (limit < 50 MB)
│   ├── cv02-prezentace.md/.html/.pptx, cv02-speaker-notes.md  # Podklady pro Cvičení 2
│   ├── cv03-prezentace.md/.html/.pptx, cv03-speaker-notes.md  # Podklady pro Cvičení 3
│   ├── cv04-prezentace.md/.html/.pptx, cv04-speaker-notes.md  # Podklady pro Cvičení 4
│   ├── cv05-prezentace.md/.html/.pptx, cv05-speaker-notes.md  # Podklady pro Cvičení 5
│   └── cv06-prezentace.md/.html/.pptx, cv06-speaker-notes.md  # Podklady pro Cvičení 6
├── review/                         # Expertní křížové hodnocení (Cross-review)
│   └── review.md                   # Formální oponentura peer projektu (Nielsen + Kognitivní průchod)
└── tests/                          # Automatizovaná testovací sada (E2E a verifikace integrity)
    ├── run_all_tests.py            # Master test runner
    ├── tier1_core_features.py      # Tier 1: Datová integrita a základní komponenty
    ├── tier2_boundaries.py         # Tier 2: Hraniční stavy, kolizní matematika, empty states
    ├── tier3_interactions.py       # Tier 3: Křížové interakce filtrů a vyhledávání
    └── tier4_scenarios.py          # Tier 4: Automatizovaný průchod personami 1 až 3
```

---

## 🚀 Návod ke spuštění webové aplikace

Aplikace je navržena tak, aby nevyžadovala **žádné instalace knihoven, překlady kódu ani spouštění serveru**.

### Varianta 1: Přímé offline spuštění přes protokol `file:///` (Doporučeno pro rychlou kontrolu)
1. Přejděte ve správci souborů (Průzkumník Windows, Finder, Nautilus) do složky `web/`.
2. Dvakrát klikněte na soubor **`index.html`** (případně jej přetáhněte do okna libovolného moderního webového prohlížeče: Chrome, Firefox, Safari, Edge).
3. Web se okamžitě otevře přes protokol `file:///.../web/index.html`.
4. Veškeré filtry, osobní program v `localStorage`, detail interpreta i odpočet fungují 100% offline bez připojení k internetu a **bez jakýchkoliv CORS chyb v konzoli**.

### Varianta 2: Spuštění přes lokální HTTP server
Pokud preferujete spuštění přes standardní HTTP protokol (např. při vývoji v IDE):

- **Pomocí Pythonu 3 (vestavěný server):**
  ```bash
  cd web
  python -m http.server 8000
  ```
  Následně otevřete v prohlížeči: [http://localhost:8000](http://localhost:8000)

- **Pomocí Node.js (`npx serve`):**
  ```bash
  npx serve web
  ```

- **Pomocí VS Code (Live Server):**
  Klikněte pravým tlačítkem na `web/index.html` a zvolte **Open with Live Server**.

---

## 🧪 Spuštění testovací sady (Verifikace a integrita)

Projekt obsahuje sadu validačních a end-to-end testů ověřujících referenční integritu dat, matematiku kolizí, přístupnost a průchod uživatelskými scénáři:

### Spuštění všech testů (Master Test Runner):
```bash
# Z kořenového adresáře projektu
node tests/run_all.js
```

### Přehled testovacích vrstev (Tiers):
- **Tier 1 (`tier1_features.test.js`):** Ověření přítomnosti a integrity všech 60 interpretů, 60 akcí, 3 scén, sémantických značek, WCAG kontrastů, Schema.org JSON-LD a existence offline adaptérů.
- **Tier 2 (`tier2_boundaries.test.js`):** Testování hraničních hodnot kolizního algoritmu, nulových překryvů, prázdného vyhledávání, poškozeného `localStorage` a ID fallbacků.
- **Tier 3 (`tier3_interactions.test.js`):** Test souběhu vícekriteriálních filtrů, vazeb mezi kartami scén, vyhledávačem a harmonogramem.
- **Tier 4 (`tier4_scenarios.test.js`):** Simulace průchodu 3 klíčových uživatelských person (Tereza – studentka, Jakub – analytik, Martin – návštěvník na vozíku).

---

## 📋 Mapování výstupů na sylabus předmětu Web design (PEF ČZU)

Semestrální práce pokrývá veškeré požadavky prezenční výuky předmětu WEB a všech cvičení:

| Cvičení / Milník | Požadovaný výstup sylabu | Umístění v repozitáři | Stav splnění |
|---|---|---|---|
| **Cvičení 2** (Zadání z Cv 1) | Projektová specifikace (identita festivalu, cíle, 3 persony, 3 scénáře, IA) + datová základna (min. 3 dny, 2 scény, 60 účinkujících, 60 akcí) + prezentace (3–5 min). | `project-specification.md`<br>`data.json`<br>`presentations/cv02*` | **100% SPLNĚNO** |
| **Cvičení 3** (Zadání z Cv 2) | Low-/mid-fi prototyp (mobile-first), návrh min. 3 interaktivních funkcí a jejich vazba na persony, průchod 2 scénáři, zpráva + prezentace. | `docs/progress-02.md`<br>`web/` (prototypový základ)<br>`presentations/cv03*` | **100% SPLNĚNO** |
| **Cvičení 4** (Zadání z Cv 3) | HTML implementace úvodní + další stránky, responzivita, trendy/best practices (UX, WCAG AA, dark mode), zpráva o změnách (limit 15 %) + prezentace. | `docs/progress-03.md`<br>`web/`<br>`presentations/cv04*` | **100% SPLNĚNO** |
| **Cvičení 5** (Zadání z Cv 4) | Review-ready verze ($\ge 50\text{ \%}$, u nás 100 %), kompletní obsah a data, bez blokujících chyb, průchod 2 scénáři, zpráva o testování + prezentace. | `docs/progress-04.md`<br>`web/`<br>`presentations/cv05*` | **100% SPLNĚNO** |
| **Cvičení 6** (Zadání z Cv 5) | Cross-review oponentního týmu pomocí $\ge 2$ formálních metod (Nielsenovy heuristiky, Kognitivní průchod) se stupni závažnosti (Kritický, Významný, Drobný) + prezentace. | `review/review.md`<br>`presentations/cv06*` | **100% SPLNĚNO** |
| **Finální odevzdání** (15 bodů) | Finální webová aplikace + závěrečná dokumentace (`documentation.md`) s tabulkou vypořádání oponentury, toolingem a komplexním AI prompt auditem a reflexí. | `documentation.md`<br>`web/`<br>`ai-log.md`<br>`README.md` | **100% SPLNĚNO** |

---

## 📊 Splnění akademických a technických kritérií zápočtu

- **Zápočet celkem (50 bodů):**
  - 5 průběžných odevzdání + prezentace (Cvičení 2 až 6): **5 × 7 = 35 bodů**
  - Finální projekt a dokumentace: **15 bodů**
- **Odevzdávací limity:** Všechny prezentační PPTX a HTML soubory mají velikost hluboko pod limitem **50 MB** pro nahrání do univerzitního systému Moodle.
- **Závaznost a stabilita návrhu:** Celkový rozsah změn mezi počáteční specifikací (Cv 2) a finálním stavem činí cca **10 %**, což spolehlivě vyhovuje pravidlu maximální povolené odchylky **15 %**. Všechny úpravy jsou detailně zdůvodněny v `documentation.md`.
- **Zásada transparentního využití AI:** Projekt důsledně respektuje univerzitní pravidlo *„tvrzení 'ověřili jsme pomocí AI' není validací“*. Veškeré generované části byly podrobeny nezávislé lidské a technické validaci (W3C validátor, WebAIM, skripty, testy na fyzických mobilních zařízeních) a zdokumentovány v `ai-log.md`.

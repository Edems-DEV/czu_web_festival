# Testovací infrastruktura a metodika — Hudební Festival Aurora 2026

**Dokument:** Architektura automatizovaného testování a integrační manuál  
**Projekt:** Hudební Festival Aurora 2026 (PEF ČZU WEB)  
**Autor:** `test_writer_e2e_1` (E2E Test Suite Architect)  
**Datum:** 2026-10-12  
**Projektový kořen:** `C:\Users\root\Documents\GitHub\czu_web_festival`  

---

## 1. Architektonická filozofie a cíle testování

Tato testovací infrastruktura poskytuje plně automatizovaný, robustní a nezávislý ověřovací aparát pro klientskou webovou aplikaci festivalu **Aurora 2026**.

V souladu se zásadami opaque-box verifikace (černé skříňky) a specifikací `ORIGINAL_REQUEST.md` a `PROJECT.md` jsou všechny testy odvozeny přímo z autoritativních požadavků a matematických invariantů, nikoliv z interní implementace.

### Klíčové principy:
1. **Nulové externí závislosti (Zero-dependency):** Testovací sada využívá výhradně nativní možnosti moderního Node.js v24 (`node:test`, `node:assert/strict`, `vm`, `fs`, `path`). Nevyžaduje žádné instalace přes `npm install`, funguje okamžitě a offline.
2. **Přísné referenční orákulum (Independent Oracle):** Pro složité doménové operace (např. detekce časových kolizí v harmonogramu, výpočet relativní luminance WCAG 2.0) testy implementují nezávislé matematické orákulum a ověřují, že produkční kód dává identické výsledky.
3. **Progresivní víceúrovňové pokrytí (Tiers 1–4):** Testy pokrývají celou škálu od datových rozměrů a standardů přístupnosti přes hraniční podmínky a mezikomponentové interakce až po kompletní reálné průchody uživatelských person.
4. **Extrémní rychlost provedení:** Celá sada 80 testů proběhne za méně než 200 ms, což umožňuje okamžitý liveness check v CI/CD i při lokálním vývoji.

---

## 2. Struktura testovacího repozitáře (`tests/`)

```
tests/
├── run_all.js                  # Hlavní spouštěč (Master Runner) s agregací a formátovaným výstupem
├── test_helpers.js             # Sdílená testovací orákula, WCAG matematika, parser HTML/CSS a VM sandbox
├── tier1_features.test.js      # Tier 1: Feature Coverage (rozměry dat, integrita, WCAG, JSON-LD, offline)
├── tier2_boundaries.test.js    # Tier 2: Boundary & Corner Cases (minutové dotyky, localStorage, nulové výsledky)
├── tier3_interactions.test.js  # Tier 3: Cross-Feature Interactions (vícekriteriální filtry + live search + schedule)
└── tier4_scenarios.test.js     # Tier 4: Real-World Scenarios (persony Tereza, Jakub, Martin Dvořák)
```

---

## 3. Matrice úrovní testování (Tiers 1–4)

### Tier 1: Feature Coverage (`tests/tier1_features.test.js`) — 36 testů
Ověřuje splnění všech bází a systémových standardů:
- **Rozměry datové základny:**
  - Přesně 3 festivalové scény s validními názvy a kapacitami (`v1`, `v2`, `v3`).
  - Přesně 60 unikátních interpretů (`p1`–`p60`), unikátní názvy, žánry a země původu.
  - Přesně 60 programových položek (`e1`–`e60`) pokrývajících přesně 3 festivalové dny (`2026-08-20`, `2026-08-21`, `2026-08-22`).
  - Synchronní mirror `window.FESTIVAL_DATA` v `web/js/data.js` je 100% identický s `data.json`.
- **Referenční integrita a kardinalita:**
  - Všechna `performerId` a `venueId` v `events` validně existují v kolekcích.
  - Striktní kardinalita 1:1 mezi interprety a událostmi (každý z 60 umělců má přesně 1 položku).
- **Bezkoliznost scén (Stage Exclusivity):**
  - Pro každou scénu a den platí: žádné dvě akce se nepřekrývají v čase ($\text{start}_B \ge \text{konec}_A$).
- **WCAG 2.0 AA barevný kontrast (`web/css/style.css`):**
  - Matematické ověření relativní luminance: $CR = (L_1 + 0.05) / (L_2 + 0.05)$.
  - `--text-primary` (`#f8fafc`) na pozadích dosahuje >= 13.9:1 (splňuje WCAG AAA >= 7:1).
  - `--text-secondary` (`#94a3b8`) dosahuje >= 5.7:1 (splňuje WCAG AA >= 4.5:1).
  - `--text-muted` (`#94a3b8`) dosahuje >= 5.7:1 (splňuje WCAG AA >= 4.5:1).
  - Všechny akcentní barvy (`--accent-cyan`, `--accent-amber`, `--accent-emerald`, `--accent-purple`) splňují >= 4.5:1.
- **Schema.org JSON-LD strukturovaná data:**
  - Všech 7 HTML stránek obsahuje syntakticky validní `<script type="application/ld+json">`.
  - Ověřen kontext `https://schema.org` a odpovídající `@type` entity.
- **Offline `file:///` a bezbariérovost:**
  - Zero-CORS integrita, absence externích CDN (`cdn.*`, `fonts.googleapis.com`, `cdnjs.*`, `unpkg.com`).
  - Přítomnost `@media (prefers-reduced-motion: reduce)` v CSS.
  - Přítomnost sémantických prvků (`header`, `nav.breadcrumbs`, `main`, `footer`) na všech 7 stránkách.

### Tier 2: Boundary & Corner Cases (`tests/tier2_boundaries.test.js`) — 24 testů
Ověřuje chování systému na hranicích a v chybových stavech:
- **Algoritmus detekce kolizí (`detectScheduleConflicts`):**
  - Hrana 1: Přesný minutový dotyk intervalů ($14:00\text{–}15:00$ a $15:00\text{–}16:15$) generuje přesně 0 kolizí.
  - Hrana 2: Přesný překryv o 1 minutu ($14:00\text{–}15:01$ a $15:00\text{–}16:00$) generuje kolizi s `overlapMin: 1`.
  - Hrana 3: Vícenásobná kolize (3 souběžné akce v tentýž den) detekuje všechny 3 párové průniky.
  - Hrana 4: Stejné časy v různé festivalové dny nikdy nekolidují.
  - Hrana 5: Úplná inkluze (krátká akce uvnitř dlouhé) detekuje správnou délku překryvu.
  - Hrana 6: Invariance vůči vstupnímu seřazení (obrácené pořadí vyhodnoceno identicky).
  - Hrana 7: Degenerované vstupy (prázdné pole, 1 položka) bezpečně vracejí `[]`.
- **Odolnost `localStorage` a chybové fallbacky:**
  - Poškozený/nevalidní JSON v úložišti nevyvolá výjimku a bezpečně vrací `[]`.
  - Prázdné úložiště (`null`) vrací `[]`.
  - Simulace `QuotaExceededError` při `setItem` je bezpečně zachycena.
  - Simulace selhání čtení je zachycena bez pádu aplikace.
  - Oboustranná reverzibilita přidání/odebrání oblíbených a emise události `favoritesUpdated`.
- **Nulové výsledky vyhledávání:**
  - Neexistující klíčová slova vrací 0 položek, počítadlo indikuje `0 z 60 akcí`, zobrazí se přívětivá zpráva.
  - Průnik speciálních znaků, emoji a XSS vektorů nevyvolá výjimku.
- **Hraniční parametry v URL detailu interpreta:**
  - Chybějící parametr `?id=` bezpečně fallbackuje na prvního interpreta `p1`.
  - Neexistující ID interpreta (`?id=p999`) zobrazí přívětivou zprávu „Interpret nenalezen“.

### Tier 3: Cross-Feature Interactions (`tests/tier3_interactions.test.js`) — 16 testů
Ověřuje součinnost více subsystémů:
- **Vícekriteriální matice filtrů:**
  - Kombinace Den + Scéna.
  - Kombinace Den + Formát (Workshop).
  - Kombinace Scéna + Formát (Koncert).
  - 4-kriteriální průnik: Den + Scéna + Formát + Fulltextové vyhledávání (cílený zásah konkrétní akce).
  - Přepínání a reset filtrů zachovává konzistenci součtů (suma dnů = 60).
- **Dynamická kaskáda rozvrhu a kolizí:**
  - Přidání 1. akce -> 0 kolizí.
  - Přidání 2. souběžné akce na jiné scéně -> okamžitá detekce kolize s minutovým překryvem.
  - Přidání 3. nesouvisející akce v jiný den -> počet kolizí zůstává 1 (žádné falešné detekce).
  - Odebrání kolidující akce -> okamžité vyřešení a vynulování varování.
- **Režim „Můj program“ v interakci s filtry:**
  - Přepnutí pohledu filtruje striktně položky v `localStorage`.
  - Fulltextové vyhledávání v tomto režimu prohledává pouze oblíbené.
  - Filtr dne v tomto režimu zobrazuje pouze oblíbené v daný den.

### Tier 4: Real-World Scenarios (`tests/tier4_scenarios.test.js`) — 4 testy
Simuluje 3 kompletní uživatelské cesty person ze specifikace projektu:
- **Scénář 1: Tereza Novotná (Studentka / Indie fanoušek):**
  - Filtrace na pátek -> vyhledání „indie“ -> výběr koncertu -> zobrazení detailu interpreta -> přidání do programu -> ověření bezkoliznosti.
- **Scénář 2: Jakub Kovář (IT specialista / Elektronická hudba):**
  - Sobotní harmonogram -> přidání 2 souběžných vystoupení na různých pódiích -> aktivace varovného pruhu kolize -> odebrání jednoho setu -> okamžité vyčištění rozvrhu.
- **Scénář 3: Martin Dvořák (Návštěvník s rodinou a kočárkem / Vozíčkář):**
  - Inspekce `venues.html` (kapacity, bezbariérovost, rampy) -> ověření `practical-info.html` (FAQ sekce, bezbariérový přístup, parkování ZTP/P na Výstavišti, nízkopodlažní spoje).

---

## 4. Spuštění a verifikace testů

### Příkaz pro spuštění celé sady (Doporučeno):
```powershell
node tests/run_all.js
```

### Příkaz pro spuštění přes nativní Node test runner:
```powershell
node --test tests/tier1_features.test.js tests/tier2_boundaries.test.js tests/tier3_interactions.test.js tests/tier4_scenarios.test.js
```

### Spuštění jednotlivých tierů:
```powershell
node --test tests/tier1_features.test.js
node --test tests/tier2_boundaries.test.js
node --test tests/tier3_interactions.test.js
node --test tests/tier4_scenarios.test.js
```

---

## 5. Výsledky testovacího běhu

```
========================================================================
  AURORA 2026 FESTIVAL — AUTOMATED E2E & COMPLIANCE TEST SUITE
  Tiers 1-4: Feature Coverage, Boundaries, Interactions, Scenarios
========================================================================

▶ Tier 1: Feature Coverage (36 testů) ............................. PASS
▶ Tier 2: Boundary & Corner Cases (24 testů) ...................... PASS
▶ Tier 3: Cross-Feature Interactions (16 testů) ................... PASS
▶ Tier 4: Real-World Scenarios (4 testy) .......................... PASS

Celkem testů:  80
Úspěšných:     80 (100 %)
Neúspěšných:   0
Doba běhu:     0.19 s
Návratový kód: 0
========================================================================
```

Testovací infrastruktura je plně připravena a verifikována.

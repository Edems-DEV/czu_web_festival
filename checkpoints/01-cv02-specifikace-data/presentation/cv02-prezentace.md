---
marp: true
theme: uncover
class: invert
paginate: true
header: 'Hudební Festival Aurora 2026 | WEB ČZU (Cvičení 2)'
footer: 'Tým Aurora • Projektová specifikace a datová základna'
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
    font-size: 0.85rem;
    width: 100%;
    margin-top: 10px;
  }
  th {
    background: #1e293b;
    color: #38bdf8;
  }
  td {
    border-bottom: 1px solid #334155;
  }
  ul, ol {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  li {
    margin-bottom: 8px;
  }
  .highlight {
    color: #38bdf8;
    font-weight: bold;
  }
  .tag {
    background: #1e293b;
    border: 1px solid #38bdf8;
    color: #38bdf8;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
  }
---

# Hudební Festival Aurora 2026
## 1. Projektová specifikace a datová základna

**Předmět:** Web design (WEB) – PEF ČZU v Praze  
**Milník:** Cvičení 2 • Průběžné odevzdání a obhajoba  
**Časový limit prezentace:** 3–5 minut  

- **Téma:** Městský hudebně-vzdělávací festival
- **Cíl prezentace:** Seznámení s konceptem, architekturou webu, datovou základnou a ověřením AI

---

## 1. Co jsme od minula udělali

- **Kompletní specifikace projektu (`project-specification.md`):**
  - Definována identita festivalu, měřitelné cíle a 3 cílové skupiny (persony).
  - Navržena informační architektura (Sitemap o 7 částech) a provázání entit.
  - Formulovány **3 klíčové uživatelské scénáře** pro následné testování.
- **Konsolidace datové základny (`data.json`):**
  - Strukturovaná data splňující požadavky ČZU:
    - **3 festivalové dny** (20.–22. 8. 2026),
    - **3 plnohodnotné scény** (Main, Riverside Club, Forum Hall),
    - **60 unikátních interpretů** s žánry, zemí původu a biografií,
    - **60 programových položek** (koncerty, talky, workshopy).
- **Zavedení AI protokolu (`ai-log.md`):**
  - Doložení promptů, odhalených halucinací a metod lidské validace.

---

## 2. Identita festivalu & Cíle webu

| Parametr | Specifikace |
|---|---|
| **Název & ročník** | **Hudební Festival Aurora 2026** (1. ročník) |
| **Termín & lokalita** | **20. 8. – 22. 8. 2026** • Výstaviště Praha, Holešovice |
| **Žánry a formáty** | Indie, Elektronika, Rock, Jazz, Hip-Hop • Koncerty + Talky + Workshopy |
| **Kapacita areálu** | 3 scény s celkovou kapacitou **10 500 návštěvníků** |

### Hlavní cíle webu
1. **Rychlá orientace na mobilu:** Bleskové filtrování programu bez instalace aplikace.
2. **Personalizace:** Nástroj *„Můj program“* (lokálně v prohlížeči) s detekcí časových kolizí.
3. **Přístupnost a logistika:** Bezbariérové informace, mapa scén a praktický servis.

---

## 3. Informační architektura & Klíčové scénáře

### Informační architektura (Sitemap)
`Úvod` $\to$ `Program` $\to$ `Účinkující` (detail `?id=...`) $\to$ `Scény` $\to$ `Praktické info` $\to$ `Vyhledávání`
- Sémantický vícestránkový web (MPA) s drobečkovou navigací a Schema.org metadaty.

### 3 uživatelské scénáře pro prototypování
1. **Tereza (24 let, fanynka):** Vyfiltrování čtvrtečních indie koncertů (10:00) za méně než 15 sekund.
2. **Jakub (29 let, návštěvník):** Sestavení osobního harmonogramu a automatická detekce kolize v sobotu v 10:00 (překryv 75 minut).
3. **Martin (35 let, ZTP):** Prověření bezbariérovosti a programu sálu *Forum Hall*.

---

## 4. Využití AI a odhalené halucinace

> *„Za výsledek odpovídá tým. AI slouží jako asistent, ne jako autor bez dozoru.“*

### K čemu jsme AI použili:
- Návrh základní kostry databáze 60 interpretů a anotací vystoupení.
- Pomocné prompty pro formulaci uživatelských person a časové osy.

### Zjištěné halucinace a chyby AI:
1. **Časoprostorové kolize na pódiu:** AI naplánovalo dvě různé kapely na *Main Stage* s překryvem 45 minut (kapela A končila v 12:45, kapela B začínala v 12:00).
2. **Neexistující ID vazeb:** AI odkázalo program na `performerId: "p61"` v databázi o 60 položkách.
3. **Kontrastní faul:** První AI návrh CSS obsahoval neonový text s kontrastním poměrem pouhých 2.8:1 (selhání WCAG AA).

---

## 5. Způsob ověření výstupů (Validace)

Deklarujeme konkrétní, reprodukovatelné metody lidského ověření:

1. **Skriptová kontrola referenční integrity (`PowerShell / JSON schema`):**
   - Automatický test potvrdil: 100 % programových položek ukazuje na existující interprety a scény.
   - Algoritmus zkontroloval časovou souslednost na každé scéně: $\text{konec}_n \le \text{start}_{n+1}$.
2. **WCAG 2.0 AA Contrast Check:**
   - Barvy upraveny na bezpečný poměr $> 7:1$ pro texty na tmavém pozadí.
3. **Sémantický audit:**
   - Odmítnutí generických `<div>` struktur ve prospěch sémantických elementů (`header`, `nav`, `main`, `section`, `time`, `address`).

---

## 6. Hlavní rozhodnutí & Další kroky (Cv 3)

### Hlavní rozhodnutí týmu:
- **Čistý Vanilla JS a moderní CSS Grid:** Žádné externí závislosti, žádný build krok, plná offline podpora na cvičení i pro oponenty.
- **Důraz na reálnou interaktivitu:** Žádný statický fejk – všech 60 akcí bude dynamicky filtrovatelných, detekce kolizí v `localStorage`.

### Plán do Cvičení 3:
- Realizace spustitelného wireframu / vibe kódu (mobile-first layout).
- Zprovoznění 3 interaktivních funkcí (filtr, vyhledávání, oblíbené).
- Příprava reportu `progress-02.md`.

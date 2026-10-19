# Checkpoint 05: Cvičení 6 – Cross-review (Expertní hodnocení)

**Předmět:** Web design (WEB) | PEF ČZU v Praze  
**Milník:** Cvičení 6 (Prezentace expertního hodnocení oponentního projektu)  
**Hodnotící tým:** Tým projektu Hudební Festival Aurora 2026 (4 studenti, INFO / SyI)  
**Hodnocený projekt:** Studentský projekt „SoundWave Festival 2026“ (Tým 7)  

---

## 📦 Struktura složky pro odevzdání (Ready to Zip)

```text
05-cv06-cross-review/
├── presentation/                  # Prezentační podklady (< 50 MB)
│   ├── cv06-prezentace.pptx       # Prezentace v PowerPointu (1.98 MB)
│   ├── cv06-prezentace.html       # Samostatná HTML prezentace (Marp)
│   └── cv06-prezentace.md         # Zdrojový text prezentace v Markdownu
├── project/                       # Odevzdávané expertní hodnocení
│   └── review.md                  # Formální oponentní posudek dle sylabu
└── notes/                         # Mluvítko pro cvičení
    └── cv06-speaker-notes.md      # Doslovný scénář prezentace oponentury (3–5 min)
```

---

## 🎯 Požadavky sylabu a jejich splnění

1. **Použité formalizované metody hodnocení**:
   - **Metoda 1:** Heuristická evaluace dle Jakoba Nielsena (10 Usability Heuristics).
   - **Metoda 2:** Kognitivní průchod (Cognitive Walkthrough) klíčovými scénáři.

2. **Obsah posudku `review.md`**:
   - Věcný a konstruktivní tón bez neověřených domněnek.
   - Celkem **9 detailně popsaných nálezů** rozdělených dle závažnosti:
     - 🔴 **2 Kritické nálezy:** Absence perzistence programu v localStorage + nulová detekce časových kolizí (REV-01); referenční diskrepance v databázi a nefunkční dynamické detaily kapel (REV-02).
     - 🟡 **4 Významné nálezy:** Nedodržení kontrastu textu 3.38:1 dle WCAG 2.0 AA (REV-03); rigidní filtr bez stavu nulových výsledků (REV-04); absence konkrétních údajů o bezbariérovosti a scéně Warehouse Stage (REV-05); chybějící aria-expanded a focus trap v mobilním menu (REV-06).
     - 🟢 **3 Drobné nálezy:** Nekonzistentní formát času (REV-07); absence prefers-reduced-motion u animace (REV-08); chybějící drobečková navigace (REV-09).
   - U každého nálezu uvedeno: závažnost, dotčená heuristika, způsob odhalení, popis problému, kroky k reprodukci, dopad na uživatele a konkrétní návrh kódové úpravy.
   - Sekce 2.4 podrobně dokumentuje metodiku využití AI, lidskou verifikaci a odmítnutí halucinací.

3. **Prezentace a speaker notes**:
   - Prezentace zaměřená na 3–5 nejdůležitějších zjištění (REV-01 až REV-06) a jejich řešení.
   - Přesný minutový rozpad kalibrovaný na 3:45–4:15 min s rezervou pro diskuzi.

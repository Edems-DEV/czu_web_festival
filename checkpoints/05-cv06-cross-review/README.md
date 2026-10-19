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
     - 🔴 **1 Kritický nález:** Selhání `fetch('data.json')` přes `file:///` v prohlížeči Chrome kvůli CORS.
     - 🟡 **2 Významné nálezy:** Nekonzistentní chování filtrů v programu a nevalidní kontrast na mobilu.
     - 🟢 **2 Drobné nálezy:** Absence kotvy pro přeskočení na obsah (`skip-to-content`) a formátování data.
   - U každého nálezu uvedeno: závažnost, způsob odhalení, zdůvodnění a konkrétní návrh kódové úpravy.

3. **Prezentace a speaker notes**:
   - Prezentace zaměřená na 3–5 nejdůležitějších zjištění a jejich řešení.
   - Přesný minutový rozpad kalibrovaný na 3:45–4:15 min s rezervou pro diskuzi.

# Checkpoint 01: Cvičení 2 – Projektová specifikace a datová základna

**Předmět:** Web design (WEB) | PEF ČZU v Praze  
**Milník:** Cvičení 2 (Odevzdání výstupů z Cvičení 1)  
**Tým:** 4 studenti (Informatika / Systémové inženýrství)  
**Festival:** Hudební Festival Aurora 2026 (fiktivní městský festival v Praze)  

---

## 📦 Struktura složky pro odevzdání (Ready to Zip)

Tato složka je připravena k přímému sbalení do `.zip` a odeslání do odevzdávárny v Moodlu:

```text
01-cv02-specifikace-data/
├── presentation/                  # Prezentační podklady (limit < 50 MB)
│   ├── cv02-prezentace.pptx       # Prezentace v PowerPointu (1.25 MB)
│   ├── cv02-prezentace.html       # Samostatná HTML prezentace (Marp)
│   └── cv02-prezentace.md         # Zdrojový text prezentace v Markdownu
├── project/                       # Povinné projektové výstupy dle sylabu
│   ├── project-specification.md   # Specifikace: identita, 3 persony, IA, 3 scénáře
│   └── data.json                  # Normalizovaná data: 3 dny, 3 scény, 60 kapel, 60 slotů
└── notes/                         # Mluvítka a podklady pro lab
    └── cv02-speaker-notes.md      # Doslovný scénář řeči na 3–5 min s obhajobou dotazů
```

---

## 🎯 Požadavky sylabu a jejich splnění

1. **`project-specification.md`**:
   - Identita festivalu v přehledné tabulce (termín 20.–22. 8. 2026, Výstaviště Praha, kapacita 10 500).
   - Účel webu a stanovení 5 měřitelných cílů.
   - 3 detailní cílové skupiny / persony (Tereza – studentka, Jakub – analytik, Martin – vozíčkář).
   - Informační architektura (Sitemap) se 7 propojenými stránkami.
   - 3 klíčové uživatelské scénáře s jasným výchozím stavem a očekávaným výsledkem.

2. **`data.json`**:
   - 3 festivalové dny (Čtvrtek až Sobota).
   - 3 festivalové scény s kapacitami a popisem bezbariérovosti.
   - 60 unikátních interpretů napříč 6 žánry s kompletními biografiemi.
   - 60 programových položek bez jediné časové kolize na pódiích.

3. **Prezentace a obhajoba**:
   - 4 povinné body: 1. Co se udělalo, 2. Hlavní rozhodnutí, 3. Využití AI, 4. Validace.
   - Časový limit: 3 až 5 minut (mluvítko kalibrováno na 3:45–4:15 min).
   - Velikost souborů hluboko pod limitem 50 MB.

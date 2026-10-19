# Checkpoint 04: Cvičení 5 – První funkční implementace (Review-Ready)

**Předmět:** Web design (WEB) | PEF ČZU v Praze  
**Milník:** Cvičení 5 (Předání review-ready verze druhému týmu k oponentuře)  
**Tým:** 4 studenti (Informatika / Systémové inženýrství)  
**Festival:** Hudební Festival Aurora 2026 (fiktivní městský festival v Praze)  

---

## 📦 Struktura složky pro odevzdání (Ready to Zip)

Tato složka obsahuje kompletní review-ready balíček, který se v rámci Cvičení 5 nahrává na Moodle a současně předává oponentnímu týmu:

```text
04-cv05-review-ready/
├── presentation/                  # Prezentační podklady (< 50 MB)
│   ├── cv05-prezentace.pptx       # Prezentace v PowerPointu (1.98 MB)
│   ├── cv05-prezentace.html       # Samostatná HTML prezentace (Marp)
│   └── cv05-prezentace.md         # Zdrojový text prezentace v Markdownu
├── project/                       # Podklady předávané oponentnímu týmu
│   ├── web/                       # Review-ready webová aplikace (100% offline)
│   │   ├── index.html             # Úvodní stránka
│   │   ├── program.html           # Harmonogram s filtry a kolizemi
│   │   ├── performers.html        # Line-up 60 interpretů
│   │   ├── performer-detail.html  # Detail umělce
│   │   ├── venues.html            # 3 scény a bezbariérovost
│   │   ├── practical-info.html    # Praktické informace a FAQ
│   │   ├── search.html            # Vyhledávací centrum
│   │   ├── css/style.css          # Kompletní styly
│   │   └── js/                    # Logika aplikace
│   ├── project-specification.md   # Specifikace pro ověření scénářů oponentem
│   └── data.json                  # Datový model festivalu
└── notes/                         # Průběžná zpráva a mluvítko
    ├── progress-04.md             # Oficiální zpráva pro Cvičení 5 dle sylabu
    └── cv05-speaker-notes.md      # Doslovný scénář řeči na 3–5 min s obhajobou dotazů
```

---

## 🎯 Požadavky sylabu a jejich splnění

1. **Review-Ready stav aplikace (`web/`)**:
   - Web obsahuje všechny hlavní části a je plně funkční bez blokujících chyb.
   - Umožňuje oponentnímu týmu prakticky projít všechny klíčové scénáře.
   - Obsahuje kompletní data (60 interpretů, 60 položek programu, 3 dny, 3 scény).
   - Funguje 100% spolehlivě v režimu `file:///` v libovolném moderním prohlížeči.

2. **Podklady pro oponenturu**:
   - Součástí složky `project/` je `project-specification.md`, aby oponentní tým mohl evaluovat naplnění stanovených cílů a informační architektury.

3. **`progress-04.md`**:
   - Deklarace aktuálního stavu rozpracovanosti (100 % hotovo vs požadovaných 50 %).
   - Popis známých drobných nedostatků a technických kompromisů.
   - Souhrn empirického testování scénářů a matice ověřených platforem.

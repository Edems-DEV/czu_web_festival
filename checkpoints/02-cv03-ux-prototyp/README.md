# Checkpoint 02: Cvičení 3 – UX návrh, prototyp a interaktivní funkce

**Předmět:** Web design (WEB) | PEF ČZU v Praze  
**Milník:** Cvičení 3 (UX návrh, funkční prototyp a 3 funkce)  
**Tým:** 4 studenti (Informatika / Systémové inženýrství)  
**Festival:** Hudební Festival Aurora 2026 (fiktivní městský festival v Praze)  

---

## 📦 Struktura složky pro odevzdání (Ready to Zip)

```text
02-cv03-ux-prototyp/
├── presentation/                  # Prezentační podklady (< 50 MB)
│   ├── cv03-prezentace.pptx       # Prezentace v PowerPointu (1.97 MB)
│   ├── cv03-prezentace.html       # Samostatná HTML prezentace (Marp)
│   └── cv03-prezentace.md         # Zdrojový text prezentace v Markdownu
├── project/                       # Povinné projektové výstupy dle sylabu
│   ├── prototype/                 # Spustitelný prototyp (100% offline file:///)
│   │   ├── index.html             # Úvodní stránka
│   │   ├── program.html           # Harmonogram s filtry a vyhledáváním
│   │   ├── performers.html        # Přehled interpretů
│   │   ├── performer-detail.html  # Dynamický profil umělce
│   │   ├── venues.html            # Scény a bezbariérovost
│   │   ├── practical-info.html    # FAQ a doprava
│   │   ├── search.html            # Globální vyhledávání
│   │   ├── css/style.css          # Mobile-first CSS a design tokeny
│   │   └── js/                    # Klientské skripty (app.js, data.js, schedule.js)
│   └── data.json                  # Datová základna festivalu
└── notes/                         # Průběžná zpráva a mluvítko
    ├── progress-02.md             # Oficiální zpráva k prototypu dle sylabu
    └── cv03-speaker-notes.md      # Doslovný scénář řeči na 3–5 min s obhajobou dotazů
```

---

## 🎯 Požadavky sylabu a jejich splnění

1. **Funkční prototyp (`prototype/`)**:
   - Vychází ze schválené projektové specifikace.
   - Spustitelný přímo v prohlížeči bez instalace (protokol `file:///`).
   - Mobile-First design jako primární paradigma s optimalizací pro palcovou zónu.
   - Desktopové rozložení s využitím vícesloupcového CSS gridu.
   - Umožňuje bezchybný průchod Scénáře 1 (Tereza) i Scénáře 2 (Jakub).

2. **3 plnohodnotné interaktivní funkce**:
   - **Funkce 1:** Vícekriteriální filtr dne, scény a formátu propojený s fulltextovým hledáním v reálném čase.
   - **Funkce 2:** Osobní program („Můj program“) s perzistencí v `localStorage` a algoritmickou detekcí časových kolizí.
   - **Funkce 3:** Parametrický profil interpreta dynamicky generovaný z databáze na základě URL parametru.

3. **`progress-02.md`**:
   - Seznam navržených funkcí a jejich vazba na potřeby person.
   - Popis ověřování metodou kognitivního průchodu.
   - Evidence využití AI a odmítnutých halucinací.

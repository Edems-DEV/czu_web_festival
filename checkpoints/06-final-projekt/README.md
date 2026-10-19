# Checkpoint 06: Finální odevzdání semestrálního projektu

**Předmět:** Web design (WEB) | PEF ČZU v Praze  
**Milník:** Finální hodnocení projektu (15 bodů) a závěrečná obhajoba  
**Tým:** 4 studenti (Informatika / Systémové inženýrství)  
**Festival:** Hudební Festival Aurora 2026 (fiktivní městský festival v Praze)  

---

## 📦 Struktura složky pro odevzdání (Ready to Zip)

Tento balíček přesně dodržuje povinnou strukturu předepsanou sylabem předmětu (kapitola *Struktura finálního odevzdání*):

```text
06-final-projekt/
├── presentation/                  # Finální prezentační balíček k obhajobě
│   ├── final-prezentace.pptx      # Prezentace v PowerPointu (1.90 MB, < 50 MB)
│   ├── final-prezentace.html      # Samostatná HTML prezentace (Marp)
│   └── final-prezentace.md        # Zdrojový text prezentace v Markdownu
├── project/                       # Povinná složka dle zadání sylabu
│   └── projekt/                   # Hlavní odevzdávaný kořen projektu
│       ├── project-specification.md  # Finální schválená specifikace
│       ├── prototype/             # Původní prototyp
│       ├── documentation.md       # Závěrečná semestrální zpráva
│       ├── data.json              # Datová základna (60/60/3)
│       ├── web/                   # Finální webová aplikace (100% offline)
│       │   ├── index.html         # Úvodní stránka
│       │   ├── program.html       # Program s vícekriteriálním filtrem
│       │   ├── performers.html    # Line-up 60 interpretů
│       │   ├── performer-detail.html # Detail umělce s vystoupeními
│       │   ├── venues.html        # Scény a bezbariérovost
│       │   ├── practical-info.html # Praktické info a FAQ
│       │   ├── search.html        # Globální vyhledávání
│       │   ├── css/style.css      # Design tokeny, WCAG AA, dark-first
│       │   └── js/                # app.js, data.js, schedule.js
│       └── review/                # Složka oponentury
│           ├── received-review.md # Přijatý posudek od oponentního týmu
│           └── review.md          # Náš oponentní posudek vypracovaný na Cv 6
└── notes/                         # Kompletní dokumentace a mluvítko
    ├── documentation.md           # Plné znění finální semestrální zprávy
    ├── ai-log.md                  # Kompletní audit promptů a validace AI
    └── final-defense-notes.md     # Tahák pro mluvčího k obhajobě s Q&A
```

---

## 🎯 Požadavky sylabu a jejich splnění

1. **Čistě klientská webová aplikace (`web/`)**:
   - Zero runtime dependencies: 0 npm balíčků, 0 bundlerů, 0 Node.js runtime, 0 backendů.
   - 100% offline funkčnost přes protokol `file:///` bez CORS chyb.
   - Sémantické HTML5, mobile-first design, WCAG 2.0 AA přístupnost.
   - 3 plnohodnotné interaktivní funkce (filtr+live search, osobní program s minutami kolize, profil umělce).

2. **Závěrečná zpráva (`documentation.md`)**:
   - Detailní fázový vývoj projektu od Cvičení 1 po finále (odchylka ~10 % vs limit 15 %).
   - Kompletní tabulka vypořádání 10 připomínek z oponentury (akceptováno vs odmítnuto s odůvodněním).
   - Technická architektura, UX trendy, dělba rolí v týmu.
   - Komplexní zhodnocení a transparentní reflexe generativní AI.

3. **Verifikace a testování**:
   - 98/98 automatizovaných testů prochází se 100% úspěšností (Tiers 1 až 5).

# Checkpoint 03: Cvičení 4 – Průchod scénáři a implementace best practices

**Předmět:** Web design (WEB) | PEF ČZU v Praze  
**Milník:** Cvičení 4 (HTML5 implementace, mobilní/desktopové zobrazení, UX trendy)  
**Tým:** 4 studenti (Informatika / Systémové inženýrství)  
**Festival:** Hudební Festival Aurora 2026 (fiktivní městský festival v Praze)  

---

## 📦 Struktura složky pro odevzdání (Ready to Zip)

```text
03-cv04-implementace/
├── presentation/                  # Prezentační podklady (< 50 MB)
│   ├── cv04-prezentace.pptx       # Prezentace v PowerPointu (1.98 MB)
│   ├── cv04-prezentace.html       # Samostatná HTML prezentace (Marp)
│   └── cv04-prezentace.md         # Zdrojový text prezentace v Markdownu
├── project/                       # Povinné projektové výstupy dle sylabu
│   ├── web/                       # Plná implementace webové aplikace
│   │   ├── index.html             # Úvodní stránka
│   │   ├── program.html           # Časový harmonogram s interaktivitou
│   │   ├── performers.html        # Seznam 60 interpretů
│   │   ├── performer-detail.html  # Detail umělce s rozvrhem vystoupení
│   │   ├── venues.html            # 3 scény s technickými parametry
│   │   ├── practical-info.html    # Informace pro návštěvníky a FAQ akordeon
│   │   ├── search.html            # Dedikované vyhledávání
│   │   ├── css/style.css          # Design tokens, dark-first, accessibility
│   │   └── js/                    # Klientská logika (Vanilla JS, offline loader)
│   └── data.json                  # Normalizovaná databáze (60/60/3)
└── notes/                         # Průběžná zpráva a mluvítko
    ├── progress-03.md             # Oficiální zpráva k implementaci dle sylabu
    └── cv04-speaker-notes.md      # Doslovný scénář řeči na 3–5 min s obhajobou dotazů
```

---

## 🎯 Požadavky sylabu a jejich splnění

1. **Implementace webové aplikace (`web/`)**:
   - Sémantické HTML5 elementy (`header`, `nav`, `main`, `section`, `article`, `time`, `address`).
   - Přístupnost dle WCAG 2.0 AA (kontrasty >= 5.7:1 u sekundárního a >= 16:1 u primárního textu).
   - Plná podpora `@media (prefers-reduced-motion: reduce)`.
   - Provázaná drobečková navigace (`aria-label="Drobečková navigace"`).
   - Integrovaná Schema.org JSON-LD data pro AI agenty a vyhledávače.

2. **UX trendy a best practices**:
   - Dark-first estetika pro noční prostředí festivalu šetřící OLED displeje.
   - Koncentrické zaoblení rohů (`border-radius: 16px / 10px / 6px`).
   - Ergonomie palcové zóny s dotykovými cíli minimálně 44 × 44 px.

3. **`progress-03.md`**:
   - Popis rozsahu implementace a rozbor aplikovaných UX trendů.
   - Analýza změn proti původnímu prototypu (odchylka pouze cca 8 % vs povolených 15 %).
   - Technické testování a odhalené AI halucinace v kontrastu.

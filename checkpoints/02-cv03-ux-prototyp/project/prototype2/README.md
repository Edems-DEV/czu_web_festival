# Aurora 2026 · prototype2

Samostatný nový UX prototyp pro **cvičení 3**, podle `../../TODO.md` a projektové specifikace festivalu. Původní `prototype/` se nemění.

## Spuštění

Otevřete **`index.html`** v moderním prohlížeči. Není potřeba instalace, Node.js, build, připojení k internetu ani backend. Při přenášení zachovejte celou složku `prototype2/`.

HTML načítá lokální CSS, klasické JavaScriptové soubory a jeden lokální obrázek. Data se načítají přes `js/data.js`, nikoli pomocí `fetch()`. Navigace používá adresy `#/program` apod., takže nevyžaduje serverové přesměrování.

Funkčnost byla ověřena přes lokální HTTP server. Přímý test `file://` nebylo možné v automatizovaném prohlížeči dokončit, protože tento protokol jeho bezpečnostní politika blokuje. Pro závěrečnou ruční kontrolu otevřete HTML dvojklikem a proveďte dva scénáře níže.

## Co obsahuje

- Úvodní stránku s festivalovou identitou a odkazem na program.
- Program všech 60 vystoupení: filtry dne, scény, žánru, typu a textu.
- Přehled 60 účinkujících, vyhledávání a profily propojené s vystoupeními.
- Můj program: přidání, odebrání, lokální uložení a časové kolize.
- Tři scény včetně adres, přístupnosti a odkazů na jejich program.
- Praktické informace, ukázkový ceník a FAQ.
- Samostatné hledání napříč účinkujícími, událostmi a scénami.
- Prázdné výsledky, prázdný výběr a stránku pro neexistující profil.

Výběr se ukládá pod klíčem `aurora-prototype2-saved-v1`, odděleně od původního prototypu. Zůstává pouze v konkrétním prohlížeči a pod konkrétní adresou. Pokud úložiště není dostupné, zobrazí se upozornění a výběr funguje po dobu otevření stránky.

## Dva průchody pro prezentaci

1. **Tereza:** Úvod → Program → čtvrtek → do hledání napsat `indie` → Lunar Tides Live → přidat pomocí `+` → Můj program. Po obnovení stránky má koncert zůstat uložený.
2. **Jakub:** Program → sobota → přidat Rain Motel Live a Lunar District Live → Můj program → ověřit upozornění na překryv 75 minut → jedno z těchto vystoupení odebrat. Upozornění zmizí.

Výsledky kontrol, vazby funkcí na potřeby a použití AI jsou v [progress-02.md](progress-02.md). Vizuální náhledy jsou ve složce `preview/`.

## Data a volitelné vývojové nástroje

Jediným zdrojem dat je checkpointový `../data.json`. `js/data.js` obsahuje jeho bezeztrátové zrcadlo. Po změně zdrojových dat lze spustit `node tools/sync-data.cjs`; pro běžné používání webu tento krok není potřeba.

Kontrola dat, lokálních souborů a absence běhových závislostí: `node tools/verify.cjs`. Jde o vývojový nástroj, nikoli podmínku spuštění webu.

## Rozsah checkpointu

Jde o funkční UX prototyp, nikoli finální semestrální odevzdání. Neobsahuje prodej vstupenek, přihlášení, rezervace ani synchronizaci mezi zařízeními. Finální SEO/AEO, formální audit přístupnosti, cross-review a dokumentace dalších checkpointů nejsou součástí tohoto výstupu. Festival i jeho obsah jsou fiktivní.

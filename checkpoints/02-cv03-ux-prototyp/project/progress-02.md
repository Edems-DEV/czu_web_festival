# Průběžná zpráva 02: UX návrh a funkce webu Aurora 2026

## Návrh a rozsah

Připravili jsme funkční návrh webu vycházející z projektové specifikace festivalu Aurora 2026. Vstupním souborem je [prototype/index.html](prototype/index.html). Web používá lokální HTML, CSS, JavaScript a obrázky; nevyžaduje instalaci ani build. Obsahuje úvod, program, přehled a detail účinkujících, scény, praktické informace, hledání a Můj program.

Návrh je mobile-first: na telefonu se program skládá pod sebe a hlavní navigace se rozbaluje tlačítkem Menu. Na desktopu se čas, název vystoupení a ovládání zobrazují v řádku. Hlavní navigaci doplňuje drobečková navigace a odkazy mezi vystoupením, účinkujícím a scénou. Vizuální styl tvoří výrazná typografie, tmavé pozadí a limetkový akcent.

Web načítá data z `prototype/js/data.js`: 60 účinkujících, 60 událostí, 3 dny a 3 scény.

## Interaktivní funkce a potřeby návštěvníků

| Funkce | Jakou potřebu řeší |
| --- | --- |
| Filtry programu podle dne, scény, žánru a typu, doplněné textovým hledáním | Návštěvník rychle najde vhodná vystoupení bez procházení celého programu. |
| Hledání účinkujících a žánrový filtr | Návštěvník najde konkrétní kapelu nebo objeví interprety svého žánru; hledání funguje i bez diakritiky. |
| Můj program: přidání, odebrání a uložení výběru | Návštěvník sestaví vlastní rozvrh bez registrace. Výběr zůstává v daném prohlížeči, mezi zařízeními se nepřenáší. |
| Upozornění na časové kolize | Návštěvník uvidí, která uložená vystoupení se překrývají a o kolik minut, a může výběr upravit. |
| Globální hledání a propojené detaily | Návštěvník dohledá účinkujícího, událost nebo scénu a přejde k času, místu a dalším informacím. |

Menu ani FAQ nepočítáme mezi požadované tři interaktivní funkce.

## Co bylo ověřováno a jak

Ověření proběhlo formou automatizovaných průchodů v prohlížeči přes lokální HTTP náhled. Kontroly se zaměřily na dokončení dvou scénářů ze specifikace, správnost výsledků a chování rozhraní. Testování s reálnými účastníky zatím neproběhlo.

1. **Tereza – výběr čtvrtečního indie koncertu:** z úvodu otevřela program, vyhledala `indie` a dostala čtyři výsledky. Přes detail Lunar Tides přidala koncert do Mého programu. Po obnovení stránky zůstal uložený.
2. **Jakub – vyřešení sobotní kolize:** přidal Rain Motel Live na Riverside Club Stage a Lunar District Live ve Forum Hall. Obě vystoupení začínají v 10:00. V Mém programu se zobrazil překryv **75 minut** a označení obou položek. Po odebrání jedné akce upozornění zmizelo.

Dále bylo zkontrolováno:

- Osm typů pohledů při šířkách **320, 390, 768, 1024 a 1440 px**: bez vodorovného přetékání a chybějících obrázků, vždy jeden hlavní nadpis. Úvod na mobilu a desktopu i mobilní program prošly také vizuální kontrolou.
- Kombinace filtrů Forum Hall + Workshop ve čtvrtek vrátila tři události. Nenalezený výraz zobrazil prázdný stav a reset filtrů obnovil výsledky.
- Mobilní menu, hledání účinkujících, globální hledání, odkazy ze scény na její program a prázdný Můj program.
- Otevření FAQ klávesou Enter a přesun fokusu odkazem pro přeskočení na obsah. Během průchodů nebyly zaznamenány chyby JavaScriptu v konzoli.

Na základě kontrol byl opraven odkaz pro přeskočení na obsah a hierarchie nadpisů. Desktopový úvodní nápis byl zmenšen, aby hlavní tlačítko zůstalo dostupné v prvním zobrazení.

## Použití AI

Při návrhu rozložení, přípravě kódu a úpravách textů jsme využili Codex. Úvodní koncertní vizuál vznikl pomocí ImageGen a po vizuální kontrole byl převeden do WebP.

Návrhy byly průběžně upravovány podle specifikace a výsledků kontrol. Zachováno bylo propojení programu, profilů a osobního výběru; úpravy se týkaly zejména velikosti úvodního nadpisu, navigace a textů rozhraní. Správnost výstupů se ověřovala průchody scénářů, kontrolou responzivity a při tvorbě porovnáním dat se zdrojovým JSON. Konkrétní výsledky jsou uvedeny výše.

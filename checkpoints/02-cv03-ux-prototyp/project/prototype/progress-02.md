# Progress 02 · nový prototyp Aurora 2026

Datum: 2. 11. 2026. Rozsah: UX návrh a funkční prototyp pro cvičení 3 podle `../../TODO.md`.

## Návrh a realizace

Vznikla nová samostatná verze v `prototype2/`. Zachovává identitu, datum, účinkující, scény a program ze specifikace a checkpointového `../data.json` (60 účinkujících, 60 událostí, 3 dny, 3 scény). Existující prototyp a ostatní rozpracované soubory zůstaly nedotčené.

Vizuální směr vychází z festivalového plakátu: výrazná typografie, tmavé pozadí, limetkový akcent a AI vizuál koncertu. Rozložení je mobile-first. Na mobilu jsou položky programu pod sebou a navigace v rozbalovacím menu, na desktopu se zobrazují čas, název, scéna a akce v jednom řádku. Detail účinkujícího používá typografický monogram, nikoli neověřenou fotografii umělce.

Prototyp má osm typů pohledů: úvod, program, seznam účinkujících, detail účinkujícího, můj program, scény, praktické informace a hledání. Drobečková navigace a odkazy mezi programem, účinkujícími a scénami umožňují pokračovat bez slepých uliček. Adresy s hashem nahrazují jednotlivé HTML stránky při zachování jejich účelu.

## Interaktivní funkce a uživatelské potřeby

| Funkce | Potřeba | Realizace |
| --- | --- | --- |
| Filtry programu | Najít vhodné vystoupení v konkrétním dni a místě | Den, scéna, žánr, typ akce, text, počet výsledků a reset |
| Hledání účinkujících | Rychle najít oblíbenou kapelu nebo nový žánr | Vyhledávání bez závislosti na diakritice, žánrový filtr, abecední seznam |
| Můj program | Uchovat vlastní výběr bez registrace | Přidání a odebrání události, čítač v navigaci, localStorage |
| Časové kolize | Naplánovat proveditelný rozvrh | Detekce překryvu napříč uloženými událostmi, délka kolize, označení obou položek |
| Globální hledání | Najít obsah bez znalosti struktury webu | Samostatný formulář a výsledky seskupené podle entity |
| Propojené detaily | Zjistit, kdo, kdy a kde vystupuje | Profil, bio, popis vystoupení, časy, scéna, uložení |

Menu a FAQ jsou doplňkové ovládací prvky; nepočítáme je do požadovaných tří smysluplných funkcí.

## Ověření scénářů

### 1. Tereza: indie ve čtvrtek

Provedeno v prohlížeči: Program → čtvrtek → hledání `indie` → 4 výsledky → Lunar Tides Live → detail → přidat. Po obnovení stránky zůstalo tlačítko ve stavu uloženo. Koncert je zobrazen v Mém programu.

### 2. Jakub: sobotní kolize

Provedeno v prohlížeči: sobota → přidat Rain Motel Live (`e41`) a Lunar District Live (`e51`) → Můj program. Zobrazila se konkrétní dvojice a překryv **75 minut**; obě položky byly označené. Po odebrání Lunar District upozornění zmizelo. Po odebrání všech testovacích událostí se zobrazil prázdný stav s odkazem na program.

### Další provedené kontroly

- Osm pohledů na šířkách **320, 390, 768, 1024 a 1440 px**: 40 kombinací, bez vodorovného přetékání, vždy jeden hlavní nadpis a bez chybějících obrázků.
- Vizuální kontrola úvodu na desktopu a mobilu a programu na mobilu. Zmenšen desktopový úvodní nápis, aby hlavní tlačítko zůstalo dostupné v prvním zobrazení.
- Kombinace Forum Hall + Workshop ve čtvrtek: 3 odpovídající události.
- Neexistující hledaný koncert: srozumitelný prázdný stav; reset obnovil výsledky.
- Mobilní menu a hledání `Lunar`: dva účinkující; následná navigace menu zavře.
- Globální hledání `elektronika`: 20 výsledků v odpovídajících skupinách.
- Odkaz z Forum Hall otevřel program s vybranou scénou Forum Hall.
- Klávesa Enter otevřela FAQ. Odkaz pro přeskočení na obsah přesunul fokus do hlavního obsahu bez změny pohledu.
- Neplatné ID účinkujícího zobrazilo vysvětlení a návrat do programu.
- Konzole během průchodů nehlásila chyby JavaScriptu.
- Statická kontrola syntaxe, shody dat a lokálních zdrojů pomocí Node.js; nástroj není běhovou závislostí webu.

Nejde o uživatelský test s reálnými účastníky, formální validaci HTML ani úplný audit WCAG. Chování na Safari/iOS a režim zakázaného úložiště nebyly interaktivně otestovány. Přímý test `file://` zablokovala politika vestavěného testovacího prohlížeče; funkční průchody proběhly na lokálním HTTP náhledu. Implementace přesto používá pouze lokální klasické skripty a soubory bez síťových požadavků, aby ji bylo možné otevřít dvojklikem. Tento způsob je nutné před odevzdáním ručně ověřit v cílovém prohlížeči.

## Použití AI a kontrola výstupů

Codex vytvořil návrh, HTML/CSS/JavaScript, nové texty rozhraní a tuto dokumentaci. Zachoval dodaný datový obsah. Výstup byl ověřen konkrétními průchody výše a porovnáním datového zrcadla se zdrojovým JSON. Během kontroly byla opravena navigace odkazu pro přeskočení na obsah a hierarchie nadpisů; upraveno bylo i desktopové měřítko úvodu.

Vestavěný nástroj ImageGen vytvořil ilustrační koncertní vizuál. Je uložen v `assets/festival.webp` (přibližně 205 KiB). Originál byl pouze překódován z PNG do WebP; obrázek nepředstavuje skutečnou fotografii festivalu. Obsah byl vizuálně zkontrolován: koncertní publikum, zelené světelné kužely, žádné nápisy ani rozpoznatelní skuteční účinkující.

Použitý prompt:

> Use case: ads-marketing. Asset type: hero image for a fictional Czech indie/electronic music festival Aurora 2026 website. Generate a wide cinematic editorial photograph, landscape 3:2, of a live outdoor music concert at night, seen from the back of an enthusiastic crowd with silhouettes and raised hands, stage in the right-middle distance, dramatic acid-lime green spotlights through smoky dark atmosphere, grainy analog film texture, near-black shadows, energetic but sophisticated independent music festival mood. Restricted palette charcoal black, pale off-white and lime green. No text, no logos, no watermarks, no recognizable real musicians. Image should fill edge to edge, no frame. Keep major silhouettes near lower half and light beams in upper half.

Návrh nepředstírá synchronizaci mezi zařízeními ani funkční prodej vstupenek. Informace o uložení výslovně vysvětluje omezení na konkrétní prohlížeč. Dopravní informace nedeklarují neověřené aktuální linky MHD. Finální SEO, formální přístupnost a cross-review zůstávají dalšími fázemi semestrálního projektu.

# Průběžná zpráva 02: návrh prototypu

## Co jsme připravili

Pro fiktivní festival Aurora jsme vytvořili prototyp webu. Otevírá se souborem `prototype/index.html` přímo v prohlížeči, bez instalace. Návrh vychází z projektové specifikace z minulého cvičení: počítá s telefonem i počítačem a propojuje program, účinkující, scény a praktické informace.

## Funkce a potřeby návštěvníků

- **Filtry a hledání v programu:** návštěvník si vybere den, scénu nebo typ akce a může hledat interpreta, žánr či slovo v popisu. Nemusí tak procházet celý program.
- **Můj program:** vystoupení lze uložit a zobrazit zvlášť. Při časovém překryvu se zobrazí upozornění. Uložení funguje v daném prohlížeči; mezi zařízeními se nepřenáší.
- **Detail interpreta:** ze seznamu nebo programu lze otevřít profil s popisem a časy vystoupení. Odtud lze akci přidat do osobního programu.

## Scénáře k ověření

1. **Tereza na mobilu:** z úvodu otevře program, vybere čtvrtek a vyhledá „indie“. Otevře Lunar Tides a přidá vystoupení do svého programu. Po obnovení stránky zkontroluje, že zůstalo uložené.
2. **Jakub na počítači:** v sobotním programu přidá Rain Motel na Riverside Club Stage a Lunar District ve Forum Hall. Obě akce začínají v 10:00; upozornění má zobrazit překryv 75 minut. V osobním programu jednu odebere a upozornění zmizí.

Při revizi jsme porovnali scénáře, obsah zprávy a implementaci s projektovou specifikací a daty. Opravili jsme nesprávně uvedenou scénu Rain Motel, reset filtrů a hledání v popisech akcí. Původní zpráva uváděla měřené časy a testování se třemi lidmi; pro tato tvrzení nemáme v podkladech dostatečný záznam, proto je neuvádíme jako výsledky. Před odevzdáním je ještě potřeba projít oba scénáře v prohlížeči na mobilní a desktopové šířce a zaznamenat skutečný výsledek.

## Použití AI a odpovědnost za výsledek

AI byla použita při přípravě návrhu a kódu prototypu. Při této revizi jsme pomocí Codexu upravili texty a vzhled, porovnali zprávu s daty a opravili nalezené rozdíly v kódu. Například původní zpráva tvrdila, že hledání prochází anotace, ale kód je neprohledával; hledání jsme doplnili. Zároveň jsme odstranili konkrétní výsledky testování, které nebylo možné doložit.

AI návrh není důkaz správnosti. Před obhajobou tým musí zkontrolovat obsah, projít scénáře a umět vysvětlit, proč zvolil jednotlivé funkce, jak fungují a jaká mají omezení. Zejména osobní program používá `localStorage`, a proto se nesynchronizuje mezi zařízeními. Starší podklady o použití AI jsou v `checkpoints/01-cv02-specifikace-data/notes/ai-log.md`; konkrétní historická tvrzení je nutné před použitím při obhajobě ověřit.

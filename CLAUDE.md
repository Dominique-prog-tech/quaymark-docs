# CLAUDE.md — Quaymark Documentatie

De officiële handleiding van **Quaymark**, straks op <https://docs.quaymark.eu>. Opgezet op 13/11/2026 vanuit de
adm-quaymark-sessie, op Dominiques vraag: *"aligneren met de andere standaardpaketten in de vloot voor wat betreft
documentatie … in 4 talen"* (CleanOps, Nimble, CreditSoft; voorbeeld: `credimatch-docs`).

> ⚠️ **Kopieer de vlootafspraken niet hierin: ze wonen op één plek.**
> - de vorm van de site: `~/projects/adm-appkit/docs/docs-site-vormgeving.md`;
> - wat er in de teksten hoort: `~/projects/adm-appkit/docs/handleiding-schrijfregels.md`;
> - wat er klaar moet zijn vóór een deploy van de app: `~/projects/adm-appkit/docs/deploy-poort.md`.

## Wie hier werkt
De **sessie van Quaymark** (`adm-quaymark`), volgens de vlootafspraak dat het werk in een handleidingrepo gedaan wordt
door de sessie van die app. **De content-hub leest deze handleiding als bron voor www.quaymark.eu**: wat hier staat, mag
daar gebruikt worden. Wat niet waar is, verspreidt zich dus.

**De app leest deze repo ook** (sinds 13/11/2026, deploy-poort categorie A):
- de **zijlade** linkt per scherm naar een pagina hier (`adm-quaymark/.../Help/QuaymarkHelpProvider.cs`). Een pagina hernoemen of
  verplaatsen breekt die link: `HandleidingTests` in de app wordt rood;
- de **AI-hulp-assistent** antwoordt uit een kopie van `docs/**/*.md` die met de app meereist. Na een wijziging hier: in de app
  `bash dev/sync-handleiding.sh` en de bundel committen. Productie kent een nieuwe pagina pas na de volgende uitrol van de app;
- **`gepubliceerde-paden.txt`** = wat er online stond bij de vorige release (punt 4, redirects: de site is indexeerbaar). Een pagina die
  verdwijnt, krijgt een omleiding. Werk de lijst bij als LAATSTE stap van een release, ná de poort van de app:
  `(cd docs && find . -name '*.md' | sed 's|^\./||' | sort) > gepubliceerde-paden.txt`.

## De bron
- **De app:** `~/projects/adm-quaymark`. Lees het scherm (`.razor`) en zijn teksten (`Teksten/QText.cs`) vóór je een pagina
  schrijft. Verzin geen functie: wat de app niet bevestigt, krijgt `[TODO: bevestigen]`.
- **De zijlade** (`Help/QuaymarkHelpProvider.cs`) was de bron van de eerste schermpagina's (13/11/2026, omgezet per route en
  per taal). Sindsdien worden de pagina's met de hand bijgehouden. Zijlade en pagina zeggen hetzelfde, maar de pagina mag meer.
- **Het waarom:** ADR-57 in `adm-platform/ARCHITECTUUR.md`; de functies en hun stand in `adm-quaymark/docs/masterplan.md`.

## ⛔ Niets van de oorspronkelijke klant
Quaymark groeide uit een stilgelegd maatwerkproject. Hun naam, wensen, werkwijze en sjablonen komen **niet herkenbaar** in
deze handleiding, haar beelden of haar voorbeelden zonder hun uitdrukkelijk akkoord (ADR-57, punt 10). **Deze repo wordt
publiek**: enkel verzonnen gegevens, zoals de proefklant `qm-demo` ("Noordkaai Surveys (demo)").

## Doelpubliek
**Surveyors** en de **kantoormedewerkers en beheerders** van maritieme survey- en expertisebureaus. Vakmensen, geen IT'ers.
- U-vorm (vous, you, Sie), korte zinnen, concreet: "Klik op X".
- Vakjargon mag (on-hire, off-hire, draft survey, letter of protest); IT-jargon niet.
- **Vier talen**, elke pagina in alle vier: `pagina.md` (nl), `.fr.md`, `.en.md`, `.de.md` (ADR-57, punt 4). **Elke knop-,
  veld- of menunaam komt uit `QText.cs`**, letterlijk zoals het scherm hem toont: "Dossiers" heet in het Engels *Files*, in het
  Duits *Akten*; de status "Rapportage" heet in het Frans *Rapport*.
- De bewijswaarde is het verkoopargument. Schrijf precies wat de app doet (vingerafdruk, enkel toevoegen, nagerekend), en
  niet meer: "juridisch onaantastbaar" bevestigt de app niet.

## Hoe doe ik…? (`docs/hoe/`)
Beslist door Dominique op 12/11/2026 (voorstel: `content-hub/rapporten/handleidingen/2026-11-12-hoe-doe-ik.md`).
- De titel is een **vraag**, in de woorden van de klant. Drie tot zeven stappen, hoogstens ± 250 woorden.
- **Geen beelden en geen tabellen.** Elke stap verwijst naar een **kop op een schermpagina**. Moet er iets uitgelegd worden
  dat daar niet staat, dan hoort het op de schermpagina, niet hier.
- De bestandsnaam is Nederlands en gelijk in de vier talen (`protestbrief.fr.md`); de **ankers** zijn die van de taal
  (`../dossiers.md#lettres-et-certificats` in het Frans). De strikte bouw controleert elk anker, ook per taal (gemeten 13/11).
- Een nieuwe taakpagina: in `hoe/index*.md` (vier talen) én in de `nav:`.

## De navigatie
De `nav:` volgt het menu van de app (`adm-quaymark/src/Host/Quaymark.Host.Web/Navigation/NavCatalogus.cs`). Pagina's staan er
**zonder titel**: dan neemt elke taal de eigen kop (`# …`) van de pagina, en hoeft een schermnaam niet nog eens in
`nav_translations`. Enkel de **secties** (Home, Hoe doe ik…?, Instellingen) staan daar, in fr, en en de.

## De beelden (sinds 13/11/2026)
Gegenereerd, in de vier talen, zoals bij CrediMatch: `tools/beelden.mjs` op de gedeelde kern (`adm-appkit/tools/beeldgenerator`). Een nieuw beeld =
een recept in dat script (naam, route, merkteken) + een verwijzing in elke taalversie van de pagina (`beeld.png`, `beeld-fr.png`, `-en`, `-de`).
1. De preview `quaymark-web` draait (`http://127.0.0.1:6445`, gestart vanuit de app-sessie).
2. `python3 tools/proefklant-vullen.py` vult de **verzonnen proefklant `qm-demo`**, op de dag van de beelden (de planning staat t.o.v. vandaag).
   Rechtstreeks in de lokale databank, met vaste id's: opnieuw draaien vervangt enkel wat het script zelf maakte. Het weigert een code die de app
   niet kent (een ongeldige code geeft in de app geen fout, enkel een leeg vak — zo gebeurd bij de eerste ronde).
3. `BEELDEN_WACHTWOORD="$(dotnet user-secrets list --project ~/projects/adm-quaymark/src/Host/Quaymark.Host.Web | sed -n 's/^Proef:Surveyor:Wachtwoord = //p')" node tools/beelden.mjs [stuk,stuk]`.
   De proefsurveyor `surveyor.demo` (Tenant-beheerder) meldt zich aan; het wachtwoord staat in geen enkel bestand van deze repo.
- **De foto's** zijn vrije foto's (CC0) in `tools/demofotos/`, met hun bron in `BRONNEN.md`. Ze tonen niet de schepen of de schade die de demo
  noemt. De 50 proeffoto's in `adm-quaymark/tools/proef-rapport` hebben geen gekende herkomst: **nooit** gebruiken.
- **De teksten in de demodossiers zijn Engels** (de gangbare taal van surveyrapporten): zo passen ze bij de beelden in de vier talen.
- Het script weigert: een ander bureau (grendel op het register én op de vestiging Zeebrugge), een scherm zonder het merkteken van het recept, een
  foutmelding of de foutbalk van Blazor, een scherm in een andere taal, een afwijkende beeldvorm. Een merkteken is een gegeven uit de demo, of een
  tekst van het scherm in de vier talen, gelezen uit `QText.cs`.
- De **alt-tekst** draagt de schermwoorden met een hoofdletter: die worden nagekeken. In het Duits draagt ELK zelfstandig naamwoord een hoofdletter,
  dus daar enkel woorden die op het scherm staan.
- ⚠️ **Herneem ALLE beelden na een blok werk** (schrijfregels §4): de zijbalk staat op elk beeld. Een andere hoogte = het beeld eerst weghalen
  (de vormgrendel weigert terecht te overschrijven).
- ⚠️ **Kijk ernaar.** Op 13/11/2026 toonde de eerste ronde twee dingen die elke controle groen liet: lege keuzevakken (Weer, Zee, Zicht) door een
  verkeerde code in het vulscript, en een derde wit onder de vaststellingen.

## Wat er bewust nog NIET aan staat (13/11/2026), en wanneer het aangaat
| Wat | Wanneer | Hoe (zie `credimatch-docs`) |
|---|---|---|
| ~~De uitrol bij een push~~ | ✅ gedaan 13/11/2026 | repo publiek, Pages aan (GitHub Actions, `docs.quaymark.eu`), `push` op main |
| ~~`robots.txt` open + sitemap~~ | ✅ gedaan 13/11/2026 | `Allow: /` en de `Sitemap:`-regel |
| Plausible (bezoekcijfers) | ⏸️ **bewust uit** (Dominique, 13/11/2026): het Business-abonnement zit aan 10 sites, een elfde vraagt Enterprise. Niet opnieuw voorstellen tot er ruimte is | `plausible-init.js` staat er al (zet enkel een wachtrij klaar, stuurt niets); de regel met `pa-<code>.js` erbij in `mkdocs.yml` (zie de uitleg daar) |
| ~~De beelden en de beeldcontrole~~ | ✅ aan sinds 13/11/2026 | zie "De beelden"; `MIN_PAGINAS` verhogen bij elke beeldronde |
| Een pagina over de veldapp | wanneer de veldapp aan klanten gaat | bron: `~/projects/adm-quaymark-flutter` en `adm-quaymark/docs/ontwerp-laag-4.md` |
| Films en de pagina "Video's" | bij de eerste film | de gedeelde filmhook, de filmcontrole, `extra.bunny_library` |

## Live zetten — ✅ gedaan op 13/11/2026
Repo publiek, Pages aan (GitHub Actions, `docs.quaymark.eu`), DNS bij Cloudflare (`docs` CNAME naar `dominique-prog-tech.github.io`,
**grijze wolk**), HTTPS afgedwongen (Let's Encrypt). Eerste uitrol: run 43410768972 op `a9d6d58`.
⚠️ **Het certificaat kwam pas na het opnieuw instellen van het adres.** Tien minuten na de DNS stond `https_certificate` nog op leeg; het adres
in Pages weghalen en opnieuw zetten (`gh api -X PUT repos/…/pages -F cname=null`, daarna `-f cname=docs.quaymark.eu`) gaf binnen een minuut
`approved`. Pas daarna kan `https_enforced` aan.

De stappen, voor een volgende handleiding:
0. De repo op GitHub aanmaken (`Dominique-prog-tech/quaymark-docs`) — **eerst vragen**.
1. De repo **publiek** zetten (zoals de andere handleidingen; GitHub Pages op een gratis account vraagt dat).
2. **Pages** aan: *Settings > Pages > Source: GitHub Actions*. Het geheim `ADM_APPKIT_LEZEN` toevoegen (de checkout van adm-appkit).
3. **DNS** bij Cloudflare (zone `quaymark.eu`): `docs` als CNAME naar `dominique-prog-tech.github.io`. Doet Dominique.
4. De drie regels "bij het live zetten" uit de tabel hierboven.

## Bouwen
```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
ln -s ~/projects/adm-appkit _appkit          # de gedeelde hook; staat in .gitignore
.venv/bin/mkdocs build --strict
python3 _appkit/tools/docs-site/check-zoeken.py site --talen fr,en,de
.venv/bin/mkdocs serve
```
⚠️ **Nooit `mkdocs build --strict -q`**: de stille modus gooit de waarschuwingen weg vóór de strikte modus ze telt. Een dood
anker gaf zo exitcode **0** met "Aborted" in de uitvoer (gemeten 13/11/2026; zonder `-q`: exitcode 1). De uitrol gebruikt geen `-q`.

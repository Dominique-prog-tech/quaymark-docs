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

## Wat er bewust nog NIET aan staat (13/11/2026), en wanneer het aangaat
| Wat | Wanneer | Hoe (zie `credimatch-docs`) |
|---|---|---|
| De uitrol bij een push | bij het live zetten | `deploy.yml` staat op `workflow_dispatch`: `push: branches: [main]` erbij |
| `robots.txt` open + sitemap | bij het live zetten | `Allow: /` en de `Sitemap:`-regel (nu `Disallow: /`) |
| Plausible (bezoekcijfers) | bij het live zetten | eigen site in Plausible voor `docs.quaymark.eu`; NIET het script van een andere site overnemen |
| De beeldcontrole | bij de eerste beeldronde | de stap staat uitgeschreven in `deploy.yml`; `MIN_PAGINAS` in `tools/check-beelden.py` meten (pagina's × 4 talen) en invullen |
| De beelden | stap 3 | `tools/beelden.mjs` op de gedeelde kern (`adm-appkit/tools/beeldgenerator`), op `qm-demo`, in de vier talen |
| Een pagina over de veldapp | wanneer de veldapp aan klanten gaat | bron: `~/projects/adm-quaymark-flutter` en `adm-quaymark/docs/ontwerp-laag-4.md` |
| Films en de pagina "Video's" | bij de eerste film | de gedeelde filmhook, de filmcontrole, `extra.bunny_library` |

## Live zetten (op Dominiques woord)
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

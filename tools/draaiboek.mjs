// Het draaiboek van de films van Quaymark: wat elke film toont en zegt. De motor staat in adm-appkit/tools/filmgenerator.
//
// De vorm: zie nimble-docs/tools/draaiboek.mjs, en de regels in adm-appkit/docs/handleiding-schrijfregels.md §4b (één film per KETEN,
// 60–180 s; een websitefilm POSITIONEERT, 30–45 s, stil).
// ⚠️ Elk MERKteken bewijst DATA, niet een scherm (een paginatitel staat ook boven een lege lijst), en in de vier talen.
// ⚠️ De eerste scène van een film navigeert zelf: `await p.goto(`${BASIS}/…`)`.
// ⚠️ Knoppen en tabbladen zoek je met QX('sleutel') uit qtekst.mjs: dan vindt de film ze in elke taal. NIET met een vrije tekst: het
//    Duitse woord voor rapport is "Bericht", en dat vindt in het Nederlands het tabblad Berichten.
import { BASIS } from './app.mjs';
import { Q, QX } from './qtekst.mjs';
import { beweegNaar, klik, tabblad } from '/Users/dominique/projects/adm-appkit/tools/schermmachinerie/browser.mjs';

// ── HET TEMPO VAN EEN WEBSITEFILM (19/11/2026). De wachttijden in de scènes volgen het tempo van een STEM: de handleiding wacht tot
// de zin klaar is. Een websitefilm is stil, en de motor toont zijn tekst pas NA de handelingen van de scène: de eerste opname van de
// websitefilms duurde 55 en 76 s in plaats van 30 tot 45, en de tekst stond er telkens maar 3 tot 4 s. T() zet elke wachttijd in de
// websiteversie op 30 %; in de handleiding is T(n) = n, dus daar verandert er niets.
const WEBSITE = process.argv.includes('--uitvoering=website');
const T = ms => (WEBSITE ? Math.round(ms * 0.3) : ms);
// De vaste id van HQ-2026-0003 in de proefklant: uuid5 van 'qm-demo/dossier/3' (proefklant-vullen.py, vid()). Zo gaat een websitescène
// rechtstreeks naar het dossier, zonder de lijst.
const HQ3 = '042a72d9-2d86-5b00-a6c9-805bb8917c25';

// Een dossier openen vanuit de lijst, zoals een gebruiker: de rij aanwijzen en dubbelklikken.
const openDossier = async (p, nummer) => {
  await p.goto(`${BASIS}/dossiers`); await p.waitForLoadState('networkidle');
  const rij = p.getByRole('row').filter({ hasText: nummer }).first();
  await rij.waitFor({ state: 'visible', timeout: 15000 });
  await beweegNaar(p, rij);
  await rij.dblclick();
  await p.waitForURL(/\/dossiers\/[0-9a-f-]{36}(\?.*)?$/, { timeout: 15000 });
  await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1200));
};
// ⚠️ DevExpress zet de naam van een tabblad TWEE keer in de pagina ("Veldwerk\n   Veldwerk": een verborgen kopie, gemeten 19/11/2026), dus
// QX vindt nooit een tabblad. Dit patroon laat die verdubbeling toe en blijft strikt: "Bericht" (Duits voor rapport) vindt "Berichten" niet.
const tabNaam = sleutel => { const a = Q(sleutel).source; return new RegExp(`^\\s*(${a})(\\s+(${a}))?\\s*$`); };
const naarTab = async (p, sleutel) => { await klik(p, tabblad(p, tabNaam(sleutel))); await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1200)); };
const knop = (p, sleutel) => p.getByRole('button', { name: QX(sleutel) });
// De knop Bewaren onderaan een fiche komt uit de AppKit, niet uit QText.
const BEWAREN = /^(Bewaren|Enregistrer|Save|Speichern)$/;
// Een keuzelijst van DevExpress openen: het pijltje naast het vak (een klik in het vak geeft enkel de focus, gemeten 19/11/2026).
const openLijst = async (p, vak) => { await klik(p, vak.locator('button, .dxbl-edit-btn-dropdown').last()); await p.waitForTimeout(T(900)); };
const kies = async (p, patroon) => {
  const optie = p.locator('[role=option]:visible, .dxbl-list-box-item:visible').filter({ hasText: patroon }).first();
  await optie.waitFor({ state: 'visible', timeout: 10000 });
  await klik(p, optie); await p.waitForTimeout(T(900));
};

// De woorden van de AppKit-schil (kopknoppen, werkbalk van een lijst): niet in QText, dus GEMETEN in de draaiende app, in de vier
// talen (19/11/2026, tools: een aanmelding per taal, de titels uitgelezen). Waar een vaste klasse of een vast adres bestaat, gaat die voor:
// die verschilt niet per taal (notif-btn, avatar-btn, prefs-close; de menulinks "dossiers", "planning", "facturen", "beheer").
const SCHIL = {
  hulp: /^(Hulp bij dit scherm|Aide pour cet écran|Help for this screen|Hilfe zu diesem Bildschirm)$/,
  handleiding: /^(Vraag het de handleiding|Demander au manuel|Ask the manual|Fragen Sie das Handbuch)$/,
  gegevens: /^(Vraag het aan uw gegevens|Interrogez vos données|Ask your data|Fragen Sie Ihre Daten)$/,
  feedback: /^(Een melding sturen|Signaler quelque chose|Send a report|Eine Meldung senden)$/,
  exporteren: /^\s*(Exporteren|Exporter|Export|Exportieren)/,
  filter: /^(Uitgebreid filteren|Filtres avancés|Advanced filter|Erweiterter Filter)$/,
  zoeken: /^(Zoeken…|Rechercher…|Search…|Suchen…)$/,
  historiek: /^\s*(Historiek|Historique|History|Verlauf)(\s+(Historiek|Historique|History|Verlauf))?\s*$/,
  // Een tabblad van de fiche uit de AppKit: dezelfde marge als tabNaam voor de verborgen kopie van DevExpress.
  journaal: /^\s*(Journaal|Journal)(\s+(Journaal|Journal))?\s*$/,
};
const menu = (p, adres) => p.locator(`nav a[href="${adres}"]`).first();
const sluitPaneel = async (p) => { await klik(p, p.locator('button.prefs-close:visible').first()); await p.waitForTimeout(T(800)); };

// ── EEN RONDE MET FILMS DIE SCHRIJVEN (26/11/2026: rapport-uitgeven, bewijspakket, factureren, draft-survey). Een uitgegeven factuur of document
// is in de app niet te wissen, en proefklant-vullen.py kent ze niet. Werkwijze die op 26/11 voor vijf films in vier talen werkte:
//   1. proefklant-vullen.py van vandaag, dan een basisdump:
//        docker exec quaymark-db pg_dump -U postgres -d tenant_quaymark_qm_demo -Fc > <kladmap>/qm-demo-basis.dump
//   2. vóór ELKE film die schrijft (en per taal) terugzetten:
//        docker exec -i quaymark-db pg_restore -U postgres -d tenant_quaymark_qm_demo --clean --if-exists --single-transaction < <kladmap>/qm-demo-basis.dump
//      bewijspakket draait meteen NA rapport-uitgeven in dezelfde taal, zonder terugzetten (het pakket heeft het uitgegeven rapport nodig).
//   3. na de ronde nog eens terugzetten, en de bestanden van de ronde wissen uit de bestandsmap van het bureau
//      (adm-quaymark/src/Host/Quaymark.Host.Web/bin/Debug/net10.0/App_Data/files/bureau-<id>/: rapporten/, documenten/, facturen/, rapportkopie/):
//      die kent de dump niet. ENKEL wat nieuwer is dan het begin van de ronde EN door geen enkele *_storage_key in de databank meer genoemd wordt:
//      een rapportkopie heeft een vaste naam, en de basis kan dezelfde al kennen.
// Zo heten het rapport, de factuur en het report in elke taal hetzelfde (versie 1, F-ZB-2026-0001), en blijft er niets achter in de historiek.
export const FILMS = [
  // ── VAN VASTSTELLING TOT UITGEGEVEN RAPPORT (19/11/2026, de proeffilm; op vraag van Dominique: "Ja, schrijf uit") ─────────────────
  // De keten van de Hoe-doe-ik-pagina "Hoe geef ik een rapport uit": vaststellingen met foto → status Rapportage → de tekst per rubriek
  // (een spraaknotitie, een standaardtekst) → controle → uitgeven → verzenden. Op HQ-2026-0003, de schadesurvey van de KAAIMEEUW
  // in de proefklant (proefklant-vullen.py), het dossier van de handleidingbeelden.
  //
  // ⚠️ DEZE FILM SCHRIJFT in de lokale proefklant: de status, de rubrieken, een verantwoording en een uitgegeven versie (die is enkel
  // toe te voegen). Vóór ELKE taal de proefklant opnieuw vullen, anders is het in de tweede taal versie 2 en vraagt Quaymark geen
  // verantwoording meer:
  //   sinds=$(date -u '+%Y-%m-%d %H:%M:%S')
  //   for t in nl fr en de; do QUAYMARK_REPO=<werkboom> python3 tools/proefklant-vullen.py && node tools/films.mjs rapport --taal=$t; done
  //   QUAYMARK_REPO=<werkboom> python3 tools/proefklant-vullen.py && python3 tools/film-opruimen.py --sinds "$sinds" --echt
  // ⚠️ Dat laatste is NIET optioneel: het vulscript kent de historiek, de portaalmeldingen en de journaalmails niet die uitgeven
  // achterlaat. Na de eerste rondes stonden er zeventien statuswissels in de historiek van HQ-2026-0003 (19/11/2026; zie film-opruimen.py).
  //
  // ⚠️ NIET IN DE FILM: het voorbeeld (PDF). De motor draait Chromium zonder scherm, en dat toont geen PDF: het venster zegt dan
  // "Deze browser toont dit bestand niet rechtstreeks" (gemeten 19/11/2026). De knop wordt enkel aangewezen.
  // Goedgekeurd door Dominique op 19/11/2026 ("Ja, goedgekeurd"), daarna vertaald met de woorden van de handleiding en het scherm:
  // fr l’expert, donneur d’ordre, empreinte · en surveyor, principal, fingerprint · de Sachverständiger, Auftraggeber, Fingerabdruck.
  ['rapport-uitgeven', {
    pagina: 'hoe/rapport-uitgeven',
    titel: {
      nl: 'Van vaststelling tot uitgegeven rapport in Quaymark',
      fr: 'De la constatation au rapport émis dans Quaymark',
      en: 'From finding to issued report in Quaymark',
      de: 'Von der Feststellung zum herausgegebenen Bericht in Quaymark',
    },
    omschrijving: {
      nl: 'De weg van een dossier naar zijn rapport: de vaststellingen met hun foto, het dossier op Rapportage, de tekst per rubriek '
        + 'met een spraaknotitie en een standaardtekst, de controle van het rapport, uitgeven met een vingerafdruk, en verzenden.',
      fr: 'Le chemin d’un dossier jusqu’à son rapport : les constatations et leurs photos, le dossier au statut Rapport, le texte par '
        + 'rubrique avec une note vocale et un texte type, le contrôle du rapport, l’émission avec une empreinte, et l’envoi.',
      en: 'How a file becomes a report: the findings with their photos, the file set to Reporting, the text per section with a voice '
        + 'note and a standard text, the report check, issuing with a fingerprint, and sending.',
      de: 'Der Weg einer Akte zu ihrem Bericht: die Feststellungen mit ihren Fotos, die Akte im Status Berichterstellung, der Text je '
        + 'Abschnitt mit einer Sprachnotiz und einem Standardtext, die Berichtsprüfung, das Herausgeben mit einem Fingerabdruck und das Senden.',
    },
    uitvoeringen: {
      // De handleiding houdt UITDRUKKELIJK haar elf scènes: de drie w-scènes hieronder zijn enkel voor de website, en zonder deze lijst
      // kwamen ze er bij een herneming bij. (De hash van een film wordt bij de opname berekend over de GEKOZEN scènes: deze lijst laat
      // de opgenomen en gepubliceerde handleidingfilm ongemoeid.)
      handleiding: { stem: true, scenes: ['vaststellingen', 'foto', 'status', 'tekst', 'spraaknotitie', 'standaardtekst', 'bewaren', 'controle',
                                          'venster', 'verantwoording', 'bevindingen', 'uitgeven', 'verzenden'] },
      // De websitefilm voor de pagina Vaststellingen ter plaatse (Dominique, 19/11/2026: "Planning + vaststelling", en "beide punten mogen
      // mee": tijdstip, GPS en vingerafdruk als tekst in beeld, en het eigen Word-sjabloon). Stil, tekst in beeld, 30 tot 45 s.
      // Een EIGEN omschrijving (Dominique, 19/11/2026: "Ja, zo doen"): die van de film noemt de spraaknotitie, de standaardtekst en de
      // controle, die deze film niet toont, en zwijgt over het Word-sjabloon. Ze gaat via website-films.json naar de site.
      website: { stem: false, scenes: ['w-vaststellingen', 'foto', 'w-sjabloon', 'w-uitgeven', 'verzenden'],
        omschrijving: {
          nl: 'Vaststellingen ter plaatse, met foto’s die tijdstip, GPS-positie en vingerafdruk dragen. Het rapport volgt uw eigen '
            + 'Word-sjabloon, wordt uitgegeven als versie met vingerafdruk en gaat in één klik naar de opdrachtgever.',
          fr: 'Des constatations sur place, avec des photos qui portent l’heure, la position GPS et une empreinte. Le rapport suit votre '
            + 'propre modèle Word, est émis en version avec empreinte et part en un clic chez le donneur d’ordre.',
          en: 'Findings on site, with photos that carry the time, GPS position and fingerprint. The report follows your own Word '
            + 'template, is issued as a version with a fingerprint and reaches the principal in one click.',
          de: 'Feststellungen vor Ort, mit Fotos, die Uhrzeit, GPS-Position und Fingerabdruck tragen. Der Bericht folgt Ihrer eigenen '
            + 'Word-Vorlage, wird als Version mit Fingerabdruck herausgegeben und ist mit einem Klick beim Auftraggeber.',
        } },
    },
    scenes: [
      // ── Enkel voor de website: een eigen begin (de eerste scène van een selectie navigeert zelf; de motor eist een p.goto in haar doe).
      { naam: 'w-vaststellingen', kop: { nl: 'De vaststellingen', fr: 'Les constatations', en: 'The findings', de: 'Die Feststellungen' },
        doe: async (p) => {
          // Rechtstreeks naar Veldwerk › Vaststellingen van HQ-2026-0003 (?tab=vaststellingen, zoals beelden.mjs).
          await p.goto(`${BASIS}/dossiers/${HQ3}?tab=vaststellingen`); await p.waitForLoadState('networkidle');
          await beweegNaar(p, p.getByText('Tank top plating indented').first());
        },
        merk: /Tank top plating indented/,
        website: { nl: 'Vaststellingen ter plaatse, per plaats aan boord, met foto.', fr: 'Les constatations sur place, par emplacement à bord, avec photo.', en: 'Findings on site, per location on board, with a photo.', de: 'Feststellungen vor Ort, je Ort an Bord, mit Foto.' } },

      // ── Enkel voor de website: het eigen Word-sjabloon van het bureau, in de taal van de film (de taal van het scherm, uit het cookie).
      { naam: 'w-sjabloon', kop: { nl: 'Uw eigen Word-sjabloon', fr: 'Votre propre modèle Word', en: 'Your own Word template', de: 'Ihre eigene Word-Vorlage' },
        doe: async (p) => {
          await p.goto(`${BASIS}/beheer/rapportsjablonen`); await p.waitForLoadState('networkidle');
          const rij = p.getByRole('row').filter({ hasText: 'Surveyrapport' }).first();
          await beweegNaar(p, rij);
          await rij.dblclick();
          await p.waitForURL(/\/beheer\/rapportsjablonen\/[0-9a-f-]{36}$/, { timeout: 15000 });
          // De taal van het scherm staat in het cultuurcookie (c=fr-BE|uic=fr-BE). Geen terugval: zonder cookie weet de film niet welk
          // sjabloon hij moet tonen, en een Engels sjabloon onder een Duitse tekst is precies de stille fout die niemand ziet.
          const cookie = (await p.context().cookies()).find(k => /Culture/i.test(k.name));
          const taal = decodeURIComponent(cookie?.value ?? '').match(/c=([a-z]{2})-/)?.[1];
          if (!taal) throw new Error('Geen cultuurcookie: de taal van het sjabloon is niet te bepalen.');
          await p.goto(`${p.url()}/${taal}`);
          // Wachten op de INHOUD van het document, niet op een vaste tijd (de Word-editor laadt in 2 tot 5 s).
          await p.locator('body').filter({ hasText: /\{\{rubriek:inleiding\}\}/ }).first().waitFor({ timeout: 20000 });
          await p.waitForTimeout(T(1500));
        },
        // Een markering van het sjabloon zelf, in elke taal gelijk: een gegeven van het document, geen opschrift.
        merk: /\{\{rubriek:inleiding\}\}/,
        website: { nl: 'Het rapport volgt uw eigen Word-sjabloon.', fr: 'Le rapport suit votre propre modèle Word.', en: 'The report follows your own Word template.', de: 'Der Bericht folgt Ihrer eigenen Word-Vorlage.' } },

      // ── Enkel voor de website: uitgeven in één scène, slank. Rechtstreeks naar het dossier, de status op Rapportage, naar Uitgifte, en het
      // venster Uitgeven (sinds 0.57.0 één venster: de soort blijft Eindrapport, de verantwoording INGEVULD, niet getypt, want in een stille film is
      // typen dode tijd; het vinkje bij de bevindingen), dan Niet nu. ⚠️ Schrijft, zoals de handleiding: vóór elke taal de proefklant terugzetten.
      { naam: 'w-uitgeven', kop: { nl: 'Uitgeven', fr: 'Émettre', en: 'Issuing', de: 'Herausgeben' },
        doe: async (p) => {
          // De voorbereiding (status op Rapportage) zonder glijdende cursor: in de eerste snelle opname kostte deze scène nog 20 s stille
          // handelingen (19/11/2026). De cursor glijdt enkel naar wat de kijker moet zien: Uitgifte, Rapport uitgeven en het venster.
          await p.goto(`${BASIS}/dossiers/${HQ3}`); await p.waitForLoadState('networkidle');
          const vak = p.locator('.dxbl-fl-item, .dxbl-form-layout-item').filter({ hasText: new RegExp(`^\\s*(${Q('status').source})`) }).first();
          await vak.locator('button, .dxbl-edit-btn-dropdown').last().click();
          await p.locator('[role=option]:visible, .dxbl-list-box-item:visible').filter({ hasText: /^\s*(Rapportage|Rapport|Reporting|Berichterstellung)\s*$/ }).first().click();
          await p.getByRole('button', { name: BEWAREN }).first().click();
          await p.waitForLoadState('networkidle');
          await p.goto(`${BASIS}/dossiers/${HQ3}?tab=rapport`); await p.waitForLoadState('networkidle');
          await klik(p, tabblad(p, tabNaam('rapport_deel_uitgifte'))); await p.waitForLoadState('networkidle');
          await klik(p, knop(p, 'uitgeven').first());
          await p.locator('.bevestiging-reden textarea:visible').first().waitFor({ state: 'visible', timeout: 15000 });
          await p.locator('.bevestiging-reden textarea:visible').first().fill('Order confirmed by phone by the insurer.');
          await p.waitForTimeout(T(800));
          await klik(p, p.getByText(Q('ctl_gezien')).first()); await p.waitForTimeout(T(800));
          await klik(p, knop(p, 'uitgeven').last());
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(800));
          await knop(p, 'niet_nu').click();
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
        },
        merk: /[0-9a-f]{12}/,
        website: { nl: 'Uitgeven: versie 1, met vingerafdruk. Ze verandert nooit meer.', fr: 'Émission : version 1, avec empreinte. Elle ne change plus jamais.', en: 'Issued: version 1, with a fingerprint. It never changes again.', de: 'Herausgegeben: Version 1 mit Fingerabdruck. Sie ändert sich nie mehr.' } },

      { naam: 'vaststellingen', kop: { nl: 'De vaststellingen', fr: 'Les constatations', en: 'The findings', de: 'Die Feststellungen' },
        doe: async (p) => {
          await openDossier(p, 'HQ-2026-0003');
          await naarTab(p, 'veldwerk');
          await beweegNaar(p, p.getByText('Tank top plating indented').first());
        },
        merk: /Tank top plating indented/,
        nl: 'Ter plaatse legt de surveyor zijn vaststellingen vast in de veldapp, per plaats aan boord, met de ernst en een foto. Op kantoor vindt u ze terug onder Veldwerk.',
        fr: 'Sur place, l’expert consigne ses constatations dans l’application de terrain, par emplacement à bord, avec leur gravité et une photo. Au bureau, vous les retrouvez sous Travail de terrain.',
        en: 'On site, the surveyor records the findings in the field app, per location on board, with their severity and a photo. At the office, you find them under Fieldwork.',
        de: 'Vor Ort hält der Sachverständige seine Feststellungen in der Feld-App fest, je Ort an Bord, mit dem Schweregrad und einem Foto. Im Büro finden Sie sie unter Feldarbeit.' },

      { naam: 'foto', kop: { nl: 'Foto’s met bewijswaarde', fr: 'Des photos qui font foi', en: 'Photos as evidence', de: 'Fotos mit Beweiskraft' },
        doe: async (p) => {
          const rij = p.getByRole('row').filter({ hasText: 'Hatch coaming top plate bent' }).first();
          await beweegNaar(p, rij.locator('a[href*="/quaymark/bewijs/"]').first());
          await p.waitForTimeout(T(1500));
        },
        merk: /Hatch coaming top plate bent/,
        nl: 'Bij elke foto legt het toestel het tijdstip, de positie en een vingerafdruk vast. Een vaststelling wordt nooit overschreven. Een fout zet u recht met een nieuwe versie.',
        fr: 'Pour chaque photo, l’appareil enregistre l’heure, la position et une empreinte. Une constatation n’est jamais écrasée. Une erreur se corrige par une nouvelle version.',
        en: 'For each photo, the device records the time, the position and a fingerprint. A finding is never overwritten. You correct a mistake with a new version.',
        de: 'Zu jedem Foto speichert das Gerät die Uhrzeit, die Position und einen Fingerabdruck. Eine Feststellung wird nie überschrieben. Einen Fehler berichtigen Sie mit einer neuen Version.',
        website: { nl: 'Elke foto draagt tijdstip, GPS-positie en vingerafdruk.', fr: 'Chaque photo porte l’heure, la position GPS et l’empreinte.', en: 'Every photo carries time, GPS position and fingerprint.', de: 'Jedes Foto trägt Uhrzeit, GPS-Position und Fingerabdruck.' } },

      { naam: 'status', kop: { nl: 'Het dossier op Rapportage', fr: 'Le dossier au statut Rapport', en: 'The file set to Reporting', de: 'Die Akte auf Berichterstellung' },
        doe: async (p) => {
          await naarTab(p, 'algemeen');
          const vak = p.locator('.dxbl-fl-item, .dxbl-form-layout-item').filter({ hasText: new RegExp(`^\\s*(${Q('status').source})`) }).first();
          await openLijst(p, vak);
          // De naam van de status staat in QText onder een enum-sleutel (DossierStatus.Rapportage), die Q niet leest.
          await kies(p, /^\s*(Rapportage|Rapport|Reporting|Berichterstellung)\s*$/);
          await klik(p, p.getByRole('button', { name: BEWAREN }).first());
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
        },
        // Het dossiernummer met zijn statusbadge erachter (zo staan ze in de paginatekst). NIET de opdrachtgever: die staat in een invoervak,
        // en de waarde van een invoervak hoort niet bij de tekst die de motor nakijkt (gemeten 19/11/2026). Aan het nummer gekoppeld, want het
        // Franse "Rapport" staat ook op een tabblad. ⚠️ GEEN \b: de motor zoekt in textContent, en daar plakken de stukken aan elkaar
        // ("HQ-2026-0003RapportageBelangenconflict?", gemeten 19/11/2026).
        merk: /HQ-2026-0003\s*(Rapportage|Rapport|Reporting|Berichterstellung)/,
        nl: 'Is het veldwerk af, dan zet u het dossier op Rapportage en bewaart u. Vanaf nu moeten de verplichte velden van de survey ingevuld zijn.',
        fr: 'Une fois le travail de terrain terminé, vous mettez le dossier au statut Rapport et vous enregistrez. Dès lors, les champs obligatoires de l’expertise doivent être remplis.',
        en: 'Once the fieldwork is done, you set the file to Reporting and save. From now on, the required survey fields must be filled in.',
        de: 'Ist die Feldarbeit abgeschlossen, setzen Sie die Akte auf Berichterstellung und speichern. Ab jetzt müssen die Pflichtfelder der Besichtigung ausgefüllt sein.' },

      { naam: 'tekst', kop: { nl: 'De tekst per rubriek', fr: 'Le texte par rubrique', en: 'The text per section', de: 'Der Text je Abschnitt' },
        doe: async (p) => {
          await naarTab(p, 'rapport_tab');
          await beweegNaar(p, p.getByText(/At the request of/).first());
        },
        merk: /At the request of Polderwacht/,
        nl: 'Op het tabblad Rapport schrijft u de tekst, rubriek per rubriek. Het rapport staat in het Engels, de taal van dit dossier. Het scherm blijft in uw eigen taal.',
        fr: 'Dans l’onglet Rapport, vous rédigez le texte, rubrique par rubrique. Le rapport est en anglais, la langue de ce dossier. L’écran reste dans votre propre langue.',
        en: 'On the Report tab, you write the text, section by section. The report is in English, the language of this file. The screen stays in your own language.',
        de: 'Auf der Registerkarte Bericht schreiben Sie den Text, Abschnitt für Abschnitt. Der Bericht ist auf Englisch, der Sprache dieser Akte. Der Bildschirm bleibt in Ihrer eigenen Sprache.' },

      { naam: 'spraaknotitie', kop: { nl: 'Een spraaknotitie', fr: 'Une note vocale', en: 'A voice note', de: 'Eine Sprachnotiz' },
        doe: async (p) => {
          await beweegNaar(p, p.getByText(/water ingress marks on the tank top/).first());
          await p.waitForTimeout(T(800));
          await klik(p, knop(p, 'notitie_toevoegen').first());
          await p.waitForTimeout(T(1200));
          await beweegNaar(p, p.getByText(/water ingress marks on the tank top/).last());
        },
        merk: /water ingress marks on the tank top/,
        nl: 'Wat de surveyor aan boord insprak, staat hier al uitgeschreven. Met Toevoegen aan rubriek komt het in de Bevindingen.',
        fr: 'Ce que l’expert a dicté à bord est déjà transcrit ici. Avec Ajouter à la rubrique, le texte va dans les Observations.',
        en: 'What the surveyor dictated on board is already transcribed here. With Add to section, it goes into the Observations.',
        de: 'Was der Sachverständige an Bord diktiert hat, steht hier schon ausgeschrieben. Mit Zum Abschnitt hinzufügen kommt es in die Befunde.' },

      { naam: 'standaardtekst', kop: { nl: 'Een standaardtekst', fr: 'Un texte type', en: 'A standard text', de: 'Ein Standardtext' },
        doe: async (p) => {
          // Het vierde vak "Standaardtekst invoegen…" is dat van de Conclusie (Inleiding, Werkwijze, Bevindingen, Conclusie, Voorbehoud):
          // op de VOLGORDE, want de naam van een rubriek is een gegeven van het bureau en niet in elke taal dezelfde.
          const vak = p.getByPlaceholder(Q('standaardtekst_invoegen')).nth(3).locator('xpath=ancestor::*[.//button][1]');
          await openLijst(p, vak);
          await kies(p, /Conclusion — further survey/);
          await beweegNaar(p, p.getByText(/A further survey is recommended/).first());
        },
        merk: /A further survey is recommended/,
        nl: 'Wat vaak terugkomt, haalt u uit de standaardteksten van uw bureau. Hier een conclusie die verder onderzoek aanraadt.',
        fr: 'Ce qui revient souvent, vous le reprenez des textes types de votre bureau. Ici, une conclusion qui recommande une expertise complémentaire.',
        en: 'What comes back often, you take from your office’s standard texts. Here, a conclusion that recommends a further survey.',
        de: 'Was oft wiederkehrt, übernehmen Sie aus den Standardtexten Ihres Büros. Hier eine Schlussfolgerung, die eine weitere Besichtigung empfiehlt.' },

      { naam: 'bewaren', kop: { nl: 'Bewaren en nakijken', fr: 'Enregistrer et relire', en: 'Save and review', de: 'Speichern und prüfen' },
        doe: async (p) => {
          await klik(p, knop(p, 'rubrieken_bewaren'));
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          await beweegNaar(p, knop(p, 'voorbeeld_pdf').first());
        },
        merk: /A further survey is recommended/,
        nl: 'Rubrieken bewaren legt de tekst vast. Met Voorbeeld bekijkt u het volledige rapport, met de foto’s in de bijlage, zonder dat er al iets wordt uitgegeven.',
        fr: 'Enregistrer les rubriques fixe le texte. Avec Aperçu, vous voyez le rapport complet, avec les photos en annexe, sans que rien ne soit encore émis.',
        en: 'Save sections stores the text. With Preview, you see the full report, with the photos in the appendix, before anything is issued.',
        de: 'Abschnitte speichern hält den Text fest. Mit Vorschau sehen Sie den vollständigen Bericht, mit den Fotos im Anhang, ohne dass schon etwas herausgegeben wird.' },

      { naam: 'controle', kop: { nl: 'De controle van het rapport', fr: 'Le contrôle du rapport', en: 'The report check', de: 'Die Berichtsprüfung' },
        doe: async (p) => {
          await naarTab(p, 'rapport_deel_uitgifte');
          await beweegNaar(p, p.getByText(Q('ctl_titel')).first());
        },
        // Het label van het checklistpunt schade_foto, een gegeven van het bureau met een eigen vertaling (dossiers.survey_types, 19/11/2026).
        merk: /gefotografeerd met referentie|photographié avec repère|photographed with reference|mit Referenz fotografiert/,
        nl: 'Onder Uitgifte legt Quaymark het rapport naast het dossier: lege rubrieken, een ontbrekende foto, tijden buiten de survey. De controle weigert niets. Ze toont wat u best nog nakijkt.',
        fr: 'Sous Émission, Quaymark confronte le rapport au dossier : rubriques vides, photo manquante, heures en dehors de l’expertise. Le contrôle ne refuse rien. Il montre ce qu’il vaut mieux encore vérifier.',
        en: 'Under Issue, Quaymark checks the report against the file: empty sections, a missing photo, times outside the survey. The check refuses nothing. It shows what you may still want to review.',
        de: 'Unter Ausgabe legt Quaymark den Bericht neben die Akte: leere Abschnitte, ein fehlendes Foto, Zeiten außerhalb der Besichtigung. Die Prüfung verweigert nichts. Sie zeigt, was Sie noch prüfen sollten.' },

      // ── Uitgeven in ÉÉN venster (sinds Quaymark 0.57.0, 26/11/2026): de soort rapport, de verantwoording zonder opdrachtbevestiging en het
      // vinkje bij de bevindingen van de controle staan samen in het venster "Versie 1 uitgeven". Tot 0.57.0 kwamen ze na elkaar (verantwoording,
      // Toch uitgeven, laatste bevestiging); deze twee scènes vervangen de vroegere scènes verantwoording en uitgeven.
      { naam: 'venster', kop: { nl: 'Eén venster om uit te geven', fr: 'Une seule fenêtre pour émettre', en: 'One window to issue', de: 'Ein Fenster zum Herausgeben' },
        doe: async (p) => {
          await klik(p, knop(p, 'uitgeven').first());
          // Het venster laadt eerst zijn overzicht (een draaiend wieltje); de soort rapport verschijnt pas daarna.
          const soort = p.locator('.uitgifte-soort:visible').first();
          await soort.waitFor({ state: 'visible', timeout: 15000 });
          await p.waitForTimeout(T(400));
          await openLijst(p, soort);
          await kies(p, Q('rapportsoort_preliminary'));
        },
        // De titel van het venster met het NUMMER van de versie die er komt: een gegeven, en enkel in dit venster.
        merk: /Versie 1 uitgeven|Émettre la version 1|Issue version 1|Version 1 herausgeben/,
        nl: 'Dan Rapport uitgeven. Eén venster vraagt wat nodig is, te beginnen met de soort rapport: hier een voorlopig rapport.',
        fr: 'Puis Émettre le rapport. Une seule fenêtre demande ce qu’il faut, à commencer par le type de rapport : ici, un rapport préliminaire.',
        en: 'Then Issue report. One window asks for what is needed, starting with the report type: here, a preliminary report.',
        de: 'Dann Bericht herausgeben. Ein Fenster fragt, was nötig ist, zuerst die Berichtsart: hier ein vorläufiger Bericht.' },

      { naam: 'verantwoording', kop: { nl: 'Zonder opdrachtbevestiging', fr: 'Sans confirmation de mission', en: 'Without an order confirmation', de: 'Ohne Auftragsbestätigung' },
        doe: async (p) => {
          const vak = p.locator('.bevestiging-reden textarea:visible').first();
          await klik(p, vak);
          // Engels, zoals alle gegevens van de proefklant: een surveyor schrijft zijn dossier in de taal van het rapport.
          await vak.type('Order confirmed by phone by the insurer.', { delay: 35 });
          await p.waitForTimeout(T(400));
        },
        merk: /Versie 1 uitgeven|Émettre la version 1|Issue version 1|Version 1 herausgeben/,
        nl: 'De opdrachtgever bevestigde deze opdracht niet. U schrijft waarom u toch uitgeeft, en Quaymark bewaart het met uw naam.',
        fr: 'Le donneur d’ordre n’a pas confirmé cette mission. Vous écrivez pourquoi vous émettez quand même, et Quaymark le conserve avec votre nom.',
        en: 'The principal did not confirm this assignment. You write why you issue anyway, and Quaymark keeps it with your name.',
        de: 'Der Auftraggeber hat diesen Auftrag nicht bestätigt. Sie schreiben, warum Sie trotzdem herausgeben, und Quaymark speichert es mit Ihrem Namen.' },

      { naam: 'bevindingen', kop: { nl: 'De bevindingen van de controle', fr: 'Les points du contrôle', en: 'The findings of the check', de: 'Die Hinweise der Prüfung' },
        doe: async (p) => {
          await beweegNaar(p, p.locator('[data-uitgifte-bevindingen]:visible').first());
          await p.waitForTimeout(T(600));
          await klik(p, p.getByText(Q('ctl_gezien')).first());
          await p.waitForTimeout(T(400));
        },
        merk: /Versie 1 uitgeven|Émettre la version 1|Issue version 1|Version 1 herausgeben/,
        nl: 'Daaronder de bevindingen van de controle. U vinkt aan dat u ze zag: ze gaan mee met de versie.',
        fr: 'En dessous, les points relevés par le contrôle. Vous cochez que vous les avez vus : ils sont conservés avec la version.',
        en: 'Below are the points raised by the check. You tick that you have seen them: they are kept with the version.',
        de: 'Darunter die Hinweise der Prüfung. Sie haken ab, dass Sie sie gesehen haben: Sie werden mit der Version gespeichert.' },

      { naam: 'uitgeven', kop: { nl: 'Versie 1, met vingerafdruk', fr: 'Version 1, avec son empreinte', en: 'Version 1, with its fingerprint', de: 'Version 1, mit Fingerabdruck' },
        doe: async (p) => {
          // De knop van het venster draagt dezelfde tekst als die op het tabblad: de LAATSTE zichtbare.
          await klik(p, knop(p, 'uitgeven').last());
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1000));
          // Daarna vraagt Quaymark of het dossier afgesloten mag worden. Niet nu: eerst verzenden.
          await klik(p, knop(p, 'niet_nu'));
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(800));
          await beweegNaar(p, p.locator('[data-versie-soort]').first());
        },
        // De soort in de lijst van de versies, gevolgd door de vingerafdruk van die versie (hex): gegevens, geen opschrift. Het keuzevak van het
        // venster telt niet mee: dat is dan dicht, en de waarde van een invoervak staat niet in de tekst van de pagina.
        merk: new RegExp(`(${Q('rapportsoort_preliminary').source})[\\s\\S]{0,400}[0-9a-f]{12}`),
        nl: 'Nu is het voorlopig rapport versie 1, met zijn vingerafdruk. Het verandert nooit meer. Het dossier afsluiten kan later.',
        fr: 'Le rapport préliminaire est maintenant la version 1, avec son empreinte. Il ne change plus jamais. Vous pourrez clôturer le dossier plus tard.',
        en: 'The preliminary report is now version 1, with its fingerprint. It never changes again. You can close the file later.',
        de: 'Jetzt ist der vorläufige Bericht Version 1, mit seinem Fingerabdruck. Er ändert sich nie mehr. Die Akte abschließen können Sie später.' },

      { naam: 'verzenden', kop: { nl: 'Verzenden', fr: 'Envoyer', en: 'Sending', de: 'Senden' },
        doe: async (p) => { await beweegNaar(p, knop(p, 'verzenden').first()); await p.waitForTimeout(T(1200)); },
        merk: /[0-9a-f]{12}/,
        nl: 'Met Verzenden krijgt de opdrachtgever de PDF, en de mail komt in het journaal. Heeft uw bureau OKSign, dan laat u de versie eerst ondertekenen. Iets rechtzetten doet u met een nieuwe versie, met een reden.',
        fr: 'Avec Envoyer, le donneur d’ordre reçoit le PDF, et le mail est consigné dans le journal. Si votre bureau a OKSign, faites d’abord signer la version. Pour corriger quelque chose, vous émettez une nouvelle version, avec une raison.',
        en: 'With Send, the principal receives the PDF, and the email is recorded in the journal. If your office uses OKSign, have the version signed first. To correct something, you issue a new version, with a reason.',
        de: 'Mit Senden erhält der Auftraggeber das PDF, und die E-Mail wird im Journal festgehalten. Hat Ihr Büro OKSign, lassen Sie die Version zuerst unterschreiben. Etwas berichtigen Sie mit einer neuen Version, mit einem Grund.',
        website: { nl: 'In één klik bij de opdrachtgever.', fr: 'En un clic chez le donneur d’ordre.', en: 'With one click to the principal.', de: 'Mit einem Klick beim Auftraggeber.' } },
    ],
  }],

  // ── AAN DE SLAG (19/11/2026, op vraag van Dominique: "Go" — de eerste van vier nieuwe films) ───────────────────────────────────
  // De eerste rondleiding: wat iedereen ziet die Quaymark voor het eerst opent, ook een proefgebruiker. Er wordt NIETS bewaard: de film
  // wijst aan, opent een fiche, de hulplade, de voorkeuren en de meldingen, en sluit ze weer. HQ-2026-0003 is het dossier met het rijkste
  // journaal in de proefklant. ⚠️ Zijn HISTORIEK moet schoon zijn (zie film-opruimen.py): de scène historiek toont ze.
  ['aan-de-slag', {
    pagina: 'aan-de-slag',
    titel: {
      nl: 'Aan de slag met Quaymark: het dashboard, de lijsten, een dossier en de hulp',
      fr: 'Premiers pas avec Quaymark : le tableau de bord, les listes, un dossier et l’aide',
      en: 'Getting started with Quaymark: the dashboard, lists, a file and help',
      de: 'Erste Schritte mit Quaymark: die Übersicht, Listen, eine Akte und die Hilfe',
    },
    omschrijving: {
      nl: 'De eerste rondleiding: het dashboard met uw dossiers per status en wat aandacht vraagt, het menu, werken in een lijst (zoeken, '
        + 'filteren, exporteren), een dossier met zijn tabbladen, het journaal en de historiek, de hulp bij elk scherm, de assistenten, '
        + 'uw voorkeuren en de meldingen.',
      fr: 'La première visite guidée : le tableau de bord avec vos dossiers par statut et ce qui demande votre attention, le menu, le travail dans une '
        + 'liste (rechercher, filtrer, exporter), un dossier et ses onglets, le journal et l’historique, l’aide sur chaque écran, les assistants, '
        + 'vos préférences et les notifications.',
      en: 'A first tour: the dashboard with your files by status and what needs attention, the menu, working in a list (search, filter, export), '
        + 'a file with its tabs, the journal and the history, help on every screen, the assistants, your preferences and the notifications.',
      de: 'Der erste Rundgang: die Übersicht mit Ihren Akten nach Status und dem, was Aufmerksamkeit braucht, das Menü, die Arbeit in einer Liste '
        + '(suchen, filtern, exportieren), eine Akte mit ihren Registerkarten, das Journal und der Verlauf, die Hilfe zu jedem Bildschirm, die '
        + 'Assistenten, Ihre Einstellungen und die Benachrichtigungen.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'dashboard', kop: { nl: 'Het dashboard', fr: 'Le tableau de bord', en: 'The dashboard', de: 'Die Übersicht' },
        doe: async (p) => {
          await p.goto(`${BASIS}/`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.locator('main a, main .card, main [class*=tegel]').first());
        },
        // Een dossiernummer onder Termijnen: een gegeven van de proefklant, geen opschrift.
        merk: /HQ-2026-0002/,
        nl: 'Na het aanmelden opent Quaymark op het dashboard. Bovenaan staan uw open dossiers per status, en wat er nog te factureren is.',
        fr: 'Après la connexion, Quaymark s’ouvre sur le tableau de bord. En haut, vos dossiers ouverts par statut, et ce qui reste à facturer.',
        en: 'After signing in, Quaymark opens on the dashboard. At the top are your open files by status, and what is still to invoice.',
        de: 'Nach der Anmeldung öffnet Quaymark die Übersicht. Oben stehen Ihre offenen Akten nach Status und das, was noch abzurechnen ist.' },

      { naam: 'aandacht', kop: { nl: 'Wat aandacht vraagt', fr: 'Ce qui demande votre attention', en: 'What needs attention', de: 'Was Aufmerksamkeit braucht' },
        doe: async (p) => {
          await beweegNaar(p, p.getByText('HQ-2026-0002').first());
          await p.waitForTimeout(T(1200));
          await beweegNaar(p, p.getByText('ZB-2026-0002').first());
        },
        merk: /ZB-2026-0002/,
        nl: 'Daaronder ziet u wat aandacht vraagt: een termijn die vervalt, een aanvraag om te beslissen, een rapport dat op review wacht.',
        fr: 'En dessous, ce qui demande votre attention : un délai qui expire, une demande à décider, un rapport en attente de relecture.',
        en: 'Below, you see what needs attention: a deadline that is due, a request to decide, a report awaiting review.',
        de: 'Darunter sehen Sie, was Aufmerksamkeit braucht: eine Frist, die abläuft, eine Anfrage zur Entscheidung, einen Bericht, der auf Prüfung wartet.' },

      { naam: 'menu', kop: { nl: 'Het menu', fr: 'Le menu', en: 'The menu', de: 'Das Menü' },
        doe: async (p) => {
          for (const adres of ['dossiers', 'planning', 'facturen']) { await beweegNaar(p, menu(p, adres)); await p.waitForTimeout(T(900)); }
          await beweegNaar(p, menu(p, 'beheer'));
        },
        merk: /HQ-2026-0002/,
        nl: 'Links staat het menu: de dossiers, de planning, de facturatie. Onderaan opent Platformbeheer de instellingen van uw bureau.',
        fr: 'À gauche, le menu : les dossiers, le planning, la facturation. En bas, Administration ouvre les paramètres de votre bureau.',
        en: 'On the left is the menu: the files, the schedule, invoicing. At the bottom, Administration opens your office’s settings.',
        de: 'Links steht das Menü: die Akten, die Planung, die Abrechnung. Unten öffnet Verwaltung die Einstellungen Ihres Büros.' },

      { naam: 'lijst', kop: { nl: 'Een lijst', fr: 'Une liste', en: 'A list', de: 'Eine Liste' },
        doe: async (p) => {
          await klik(p, menu(p, 'dossiers'));
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.getByTitle(SCHIL.filter).first());
          await p.waitForTimeout(T(900));
          await beweegNaar(p, p.getByRole('button', { name: SCHIL.exporteren }).first());
        },
        merk: /HQ-2026-0004/,
        nl: 'Elke lijst werkt hetzelfde. Bovenaan kiest u de status, filtert u op elke kolom, kiest u de kolommen en exporteert u de lijst.',
        fr: 'Toutes les listes fonctionnent de la même façon. En haut, vous choisissez le statut, filtrez sur chaque colonne, choisissez les colonnes et exportez la liste.',
        en: 'Every list works the same way. At the top you choose the status, filter on any column, choose the columns and export the list.',
        de: 'Jede Liste funktioniert gleich. Oben wählen Sie den Status, filtern nach jeder Spalte, wählen die Spalten und exportieren die Liste.' },

      { naam: 'zoeken', kop: { nl: 'Zoeken', fr: 'Rechercher', en: 'Search', de: 'Suchen' },
        doe: async (p) => {
          const z = p.getByPlaceholder(SCHIL.zoeken).first();
          await klik(p, z);
          await z.type('KAAIMEEUW', { delay: 90 });
          await p.waitForTimeout(T(1500));
        },
        merk: /HQ-2026-0010/,
        nl: 'Het zoekvak zoekt in alle kolommen tegelijk. Hier op de naam van een schip: er blijven drie dossiers over.',
        fr: 'La zone de recherche cherche dans toutes les colonnes à la fois. Ici sur le nom d’un navire : il reste trois dossiers.',
        en: 'The search box searches all columns at once. Here on the name of a vessel: three files remain.',
        de: 'Das Suchfeld sucht in allen Spalten zugleich. Hier nach dem Namen eines Schiffs: Es bleiben drei Akten übrig.' },

      { naam: 'fiche', kop: { nl: 'Een dossier', fr: 'Un dossier', en: 'A file', de: 'Eine Akte' },
        doe: async (p) => {
          const rij = p.getByRole('row').filter({ hasText: 'HQ-2026-0003' }).first();
          await beweegNaar(p, rij);
          await rij.dblclick();
          await p.waitForURL(/\/dossiers\/[0-9a-f-]{36}(\?.*)?$/, { timeout: 15000 });
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          await beweegNaar(p, tabblad(p, tabNaam('veldwerk')));
          await p.waitForTimeout(T(800));
          await beweegNaar(p, tabblad(p, tabNaam('rapport_tab')));
        },
        // Het nummer met zijn statusbadge (zo staan ze in de tekst van de pagina; geen \b: zie de statusscène van rapport-uitgeven).
        merk: /HQ-2026-0003\s*(In uitvoering|En cours|In progress|In Bearbeitung)/,
        nl: 'Een dubbelklik opent het dossier. Bovenaan staan het nummer en de status, daaronder de tabbladen: van de partijen en het veldwerk tot het rapport.',
        fr: 'Un double-clic ouvre le dossier. En haut, le numéro et le statut, en dessous les onglets : des parties et du travail de terrain jusqu’au rapport.',
        en: 'A double-click opens the file. At the top are the number and the status, below them the tabs: from the parties and the fieldwork to the report.',
        de: 'Ein Doppelklick öffnet die Akte. Oben stehen die Nummer und der Status, darunter die Registerkarten: von den Parteien und der Feldarbeit bis zum Bericht.' },

      { naam: 'journaal', kop: { nl: 'Het journaal', fr: 'Le journal', en: 'The journal', de: 'Das Journal' },
        doe: async (p) => {
          await klik(p, tabblad(p, SCHIL.journaal)); await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1200));
          await beweegNaar(p, p.getByText('Statement of facts').first());
        },
        merk: /Statement of facts/,
        nl: 'In het journaal staan de notities, de taken en de bijlagen van het dossier. Ook wat Quaymark zelf noteert, zoals een uitgegeven factuur.',
        fr: 'Le journal contient les notes, les tâches et les pièces jointes du dossier. Aussi ce que Quaymark note lui-même, comme une facture émise.',
        en: 'The journal holds the notes, tasks and attachments of the file. Also what Quaymark records itself, such as an issued invoice.',
        de: 'Im Journal stehen die Notizen, Aufgaben und Anhänge der Akte. Auch das, was Quaymark selbst festhält, etwa eine ausgestellte Rechnung.' },

      { naam: 'historiek', kop: { nl: 'De historiek', fr: 'L’historique', en: 'The history', de: 'Der Verlauf' },
        doe: async (p) => {
          await klik(p, tabblad(p, SCHIL.historiek));
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.getByText(/Estuaire Expertises SARL/).first());
        },
        // Een regel van de historiek van HQ-2026-0003 (de partij die op 16/11/2026 bijkwam): een gegeven.
        merk: /Estuaire Expertises SARL/,
        nl: 'De historiek toont wie wat wanneer veranderde, in gewone woorden. Een vaststelling of een uitgegeven rapport wordt nooit overschreven.',
        fr: 'L’historique montre qui a modifié quoi et quand, en termes clairs. Une constatation ou un rapport émis n’est jamais écrasé.',
        en: 'The history shows who changed what and when, in plain words. A finding or an issued report is never overwritten.',
        de: 'Der Verlauf zeigt, wer wann was geändert hat, in klaren Worten. Eine Feststellung oder ein herausgegebener Bericht wird nie überschrieben.' },

      { naam: 'hulp', kop: { nl: 'De hulp bij elk scherm', fr: 'L’aide sur chaque écran', en: 'Help on every screen', de: 'Die Hilfe zu jedem Bildschirm' },
        doe: async (p) => {
          await klik(p, p.getByTitle(SCHIL.hulp).first());
          await p.waitForTimeout(T(2500));
        },
        // De eerste zin van de uitleg in de lade: tekst van de handleiding, in de taal van het scherm (gemeten 19/11/2026).
        // ⚠️ \s*: het Frans zet een VASTE spatie (U+00A0) vóór het dubbelpunt (gemeten 19/11/2026), geen gewone.
        merk: /Eén opdracht: wat er gevraagd is|Une mission\s*:\s*ce qui est demandé|One instruction: what was asked|Ein Auftrag: was verlangt wird/,
        nl: 'Het vraagteken rechtsboven opent de uitleg bij het scherm waar u bent, met onderaan een link naar de volledige handleiding.',
        fr: 'Le point d’interrogation en haut à droite ouvre l’explication de l’écran où vous êtes, avec en bas un lien vers le manuel complet.',
        en: 'The question mark at the top right opens the explanation of the screen you are on, with a link to the full manual at the bottom.',
        de: 'Das Fragezeichen oben rechts öffnet die Erklärung zu dem Bildschirm, auf dem Sie sind, mit einem Link zum vollständigen Handbuch.' },

      { naam: 'assistent', kop: { nl: 'De assistenten', fr: 'Les assistants', en: 'The assistants', de: 'Die Assistenten' },
        doe: async (p) => {
          await sluitPaneel(p);
          await beweegNaar(p, p.getByTitle(SCHIL.handleiding).first());
          await p.waitForTimeout(T(1200));
          await beweegNaar(p, p.getByTitle(SCHIL.gegevens).first());
          await p.waitForTimeout(T(800));
        },
        merk: /Estuaire Expertises SARL/,
        nl: 'Met het sterretje stelt u een vraag aan de handleiding, in uw eigen woorden. Het grafiekje beantwoordt vragen over uw eigen gegevens.',
        fr: 'Avec l’étoile, vous posez une question au manuel, avec vos propres mots. Le petit graphique répond aux questions sur vos propres données.',
        en: 'With the star you ask the manual a question, in your own words. The small chart answers questions about your own data.',
        de: 'Mit dem Stern stellen Sie dem Handbuch eine Frage, in Ihren eigenen Worten. Das kleine Diagramm beantwortet Fragen zu Ihren eigenen Daten.' },

      { naam: 'voorkeuren', kop: { nl: 'Uw voorkeuren', fr: 'Vos préférences', en: 'Your preferences', de: 'Ihre Einstellungen' },
        doe: async (p) => {
          await klik(p, p.locator('button.avatar-btn').first());
          await p.waitForTimeout(T(1500));
          // Het paneel blijft OPEN tot de volgende scène: de stem spreekt erover (gemeten 19/11/2026: sloot het hier, dan toonde de
          // film acht seconden lang de historiek onder een zin over de voorkeuren).
          await beweegNaar(p, p.getByText(/^(English|Deutsch)$/).first());
        },
        // De talen in het paneel, elk in hun eigen woord, dus in elke schermtaal gelijk, en ENKEL in dit paneel. NIET "Demo Surveyor":
        // die naam staat ook in de historiek eronder, en dan slaagt het merkteken ook zonder paneel (zo gemeten op 19/11/2026).
        merk: /Nederlands\s*Français\s*English\s*Deutsch/,
        nl: 'Onder uw initialen kiest u uw accentkleur, de taal van het scherm, en zet u tweestapsverificatie aan.',
        fr: 'Sous vos initiales, vous choisissez votre couleur d’accent, la langue de l’écran, et vous activez la vérification en deux étapes.',
        en: 'Under your initials you choose your accent colour, the language of the screen, and you turn on two-step verification.',
        de: 'Unter Ihren Initialen wählen Sie Ihre Akzentfarbe und die Sprache des Bildschirms und schalten die Zwei-Faktor-Authentifizierung ein.' },

      { naam: 'meldingen', kop: { nl: 'De meldingen', fr: 'Les notifications', en: 'Notifications', de: 'Die Benachrichtigungen' },
        doe: async (p) => {
          await sluitPaneel(p);
          await klik(p, p.locator('button.notif-btn').first());
          await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.getByText(/HQ-2026-0002/).first());
        },
        // Het dossiernummer van een melding: staat op deze pagina enkel in het paneel van de meldingen.
        merk: /HQ-2026-0002/,
        nl: 'Het belletje toont wat er voor u binnenkwam, zoals een termijn die voorbij is. Met de ballon ernaast stuurt u ons een vraag of een opmerking.',
        fr: 'La cloche montre ce qui vous est arrivé, comme un délai dépassé. Avec la bulle à côté, vous nous envoyez une question ou une remarque.',
        en: 'The bell shows what came in for you, such as a deadline that has passed. With the speech bubble next to it, you send us a question or a remark.',
        de: 'Die Glocke zeigt, was für Sie eingegangen ist, etwa eine überschrittene Frist. Mit der Sprechblase daneben senden Sie uns eine Frage oder eine Anmerkung.' },
    ],
  }],

  // ── VAN AANVRAAG TOT INGEPLAND DOSSIER (19/11/2026, op vraag van Dominique: "Ja, voeg toe" voor de open webaanvraag) ───────────────
  // Een aanvraag van het webformulier → aanvaarden → het dossier dat eruit ontstaat → de planning: slepen naar de surveyor.
  // De aanvraag is VERZONNEN en staat in proefklant-vullen.py (Lotte Janssens, Scheldemond Bevrachting NV, POLDERWIND, de eerstvolgende
  // werkdag om 09:00). De film laat de surveyor bij het aanvaarden LEEG: zo komt het dossier onder Te plannen en toont de film het slepen.
  //
  // ⚠️ DEZE FILM SCHRIJFT: een dossier (nieuwe id), zijn mappen, een mail aan de indiener (niet verstuurd: Development), historiek. Zelfde
  // werkwijze als rapport-uitgeven: vóór elke taal vullen (het vulscript ruimt het dossier van de aanvraag op en zet de aanvraag terug), na de
  // laatste taal vullen en film-opruimen.py. De nummerteller volgt het hoogste bestaande nummer, dus het dossier heet in elke taal hetzelfde.
  // ⚠️ Gemeten 19/11/2026: de uitleg bij de opdrachtbevestiging zegt "via het opdrachtgeversportaal", ook bij een aanvraag van het
  // webformulier (QText bevestiging_uitleg_via_aanvraag). De stem noemt het portaal daarom NIET; gemeld aan Dominique.
  ['aanvraag-tot-planning', {
    pagina: 'aanvragen',
    titel: {
      nl: 'Van aanvraag tot ingepland dossier in Quaymark',
      fr: 'De la demande au dossier planifié dans Quaymark',
      en: 'From request to scheduled file in Quaymark',
      de: 'Von der Anfrage zur geplanten Akte in Quaymark',
    },
    omschrijving: {
      nl: 'Een aanvraag van het formulier op uw website: wat er binnenkomt, de opdrachtgever die Quaymark voorstelt, aanvaarden, het dossier '
        + 'dat daaruit ontstaat, en het inplannen door het dossier naar de surveyor te slepen.',
      fr: 'Une demande du formulaire de votre site web : ce qui arrive, le donneur d’ordre que Quaymark propose, l’acceptation, le dossier qui en '
        + 'résulte, et la planification en glissant le dossier vers l’expert.',
      en: 'A request from the form on your website: what comes in, the principal that Quaymark suggests, accepting, the file that results, and '
        + 'scheduling by dragging the file to the surveyor.',
      de: 'Eine Anfrage aus dem Formular Ihrer Website: was eingeht, der Auftraggeber, den Quaymark vorschlägt, das Annehmen, die Akte, die daraus '
        + 'entsteht, und die Planung, indem Sie die Akte zum Sachverständigen ziehen.',
    },
    uitvoeringen: {
      handleiding: { stem: true },
      // De websitefilm voor de pagina Opdracht en planning (Dominique, 19/11/2026): zes van de acht scènes, stil, tekst in beeld.
      // Een EIGEN omschrijving (Dominique, 19/11/2026), zoals bij rapport-uitgeven: deze film toont zes van de acht scènes.
      website: { stem: false, scenes: ['binnen', 'aanvraag', 'aanvaarden', 'te-plannen', 'slepen', 'gepland'],
        omschrijving: {
          nl: 'Een aanvraag via het formulier op uw website komt meteen binnen in Quaymark: indiener, schip, haven en gewenste dag. '
            + 'Aanvaarden maakt er een dossier van, en u plant het door het naar een surveyor en een uur te slepen.',
          fr: 'Une demande envoyée via le formulaire de votre site web arrive aussitôt dans Quaymark : demandeur, navire, port et jour '
            + 'souhaité. L’accepter en fait un dossier, que vous planifiez en le glissant vers un expert et une heure.',
          en: 'A request from the form on your website arrives in Quaymark straight away: sender, vessel, port and preferred day. '
            + 'Accepting it creates a file, which you schedule by dragging it to a surveyor and a time.',
          de: 'Eine Anfrage über das Formular Ihrer Website kommt sofort in Quaymark an: Absender, Schiff, Hafen und Wunschtag. Mit dem '
            + 'Annehmen entsteht eine Akte, die Sie planen, indem Sie sie zu einem Sachverständigen und einer Uhrzeit ziehen.',
        } },
    },
    scenes: [
      { naam: 'binnen', kop: { nl: 'Een aanvraag komt binnen', fr: 'Une demande arrive', en: 'A request comes in', de: 'Eine Anfrage geht ein' },
        doe: async (p) => {
          await p.goto(`${BASIS}/`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.getByText(/Scheldemond Bevrachting NV · POLDERWIND/).first());
        },
        // De aanvraag op het dashboard (opdrachtgever · schip): staat enkel onder Aanvragen te beslissen.
        merk: /Scheldemond Bevrachting NV · POLDERWIND/,
        nl: 'Een aanvraag via het formulier op uw website komt meteen in Quaymark binnen. Het dashboard toont ze onder Aanvragen te beslissen.',
        fr: 'Une demande envoyée via le formulaire de votre site web arrive aussitôt dans Quaymark. Le tableau de bord l’affiche sous Demandes à décider.',
        en: 'A request through the form on your website arrives in Quaymark right away. The dashboard shows it under Requests to decide.',
        de: 'Eine Anfrage über das Formular Ihrer Website geht sofort in Quaymark ein. Die Übersicht zeigt sie unter Zu entscheidende Anfragen.',
        website: { nl: 'Een aanvraag van uw website komt meteen binnen.', fr: 'Une demande de votre site arrive aussitôt.', en: 'A request from your website comes straight in.', de: 'Eine Anfrage von Ihrer Website kommt sofort an.' } },

      { naam: 'aanvraag', kop: { nl: 'De aanvraag', fr: 'La demande', en: 'The request', de: 'Die Anfrage' },
        doe: async (p) => {
          await klik(p, menu(p, 'aanvragen'));
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1200));
          const rij = p.getByRole('row').filter({ hasText: 'POLDERWIND' }).first();
          await beweegNaar(p, rij);
          await rij.dblclick();
          await p.waitForURL(/\/aanvragen\/[0-9a-f-]{36}/, { timeout: 15000 });
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.getByText('Lotte Janssens').first());
        },
        merk: /Lotte Janssens/,
        nl: 'U ziet wie de aanvraag indiende, voor welk schip, in welke haven en wanneer het werk gewenst is.',
        fr: 'Vous voyez qui a introduit la demande, pour quel navire, dans quel port et quand le travail est souhaité.',
        en: 'You see who submitted the request, for which vessel, in which port and when the work is wanted.',
        de: 'Sie sehen, wer die Anfrage eingereicht hat, für welches Schiff, in welchem Hafen und wann die Arbeit gewünscht ist.',
        website: { nl: 'Indiener, schip, haven en gewenste dag in één oogopslag.', fr: 'Demandeur, navire, port et date souhaitée d’un coup d’œil.', en: 'Sender, vessel, port and requested day at a glance.', de: 'Absender, Schiff, Hafen und Wunschtag auf einen Blick.' } },

      { naam: 'voorstel', kop: { nl: 'Wat Quaymark voorstelt', fr: 'Ce que Quaymark propose', en: 'What Quaymark suggests', de: 'Was Quaymark vorschlägt' },
        doe: async (p) => {
          // De vakken op hun LABEL: de voorgestelde waarde staat in een keuzevak, en de waarde van een invoervak hoort niet bij de tekst
          // van de pagina (gemeten 19/11/2026: getByText vond "Scheldemond Bevrachting NV (zelfde e-mailadres)" niet).
          const vak = (sleutel) => p.locator('.dxbl-fl-item, .dxbl-form-layout-item').filter({ hasText: new RegExp(`^\\s*(${Q(sleutel).source})`) }).first();
          await beweegNaar(p, vak('opdrachtgever'));
          await p.waitForTimeout(T(1200));
          await beweegNaar(p, vak('schip'));
        },
        merk: /SB-2026-118/,
        nl: 'Quaymark stelt zelf de opdrachtgever voor, op het e-mailadres van de indiener, en herkent het schip. U kiest nog de vestiging.',
        fr: 'Quaymark propose lui-même le donneur d’ordre, d’après l’adresse e-mail de l’expéditeur, et reconnaît le navire. Vous choisissez encore le site.',
        en: 'Quaymark suggests the principal itself, from the sender’s email address, and recognises the vessel. You still choose the office.',
        de: 'Quaymark schlägt den Auftraggeber selbst vor, anhand der E-Mail-Adresse des Absenders, und erkennt das Schiff. Sie wählen noch die Niederlassung.' },

      { naam: 'aanvaarden', kop: { nl: 'Aanvaarden', fr: 'Accepter', en: 'Accepting', de: 'Annehmen' },
        doe: async (p) => {
          const vak = p.locator('.dxbl-fl-item, .dxbl-form-layout-item').filter({ hasText: new RegExp(`^\\s*(${Q('vestiging').source})`) }).first();
          await openLijst(p, vak);
          await kies(p, /Hoofdkantoor|HQ\)/);
          await klik(p, knop(p, 'aanvraag_aanvaarden').first());
          await p.waitForURL(/\/dossiers\/[0-9a-f-]{36}/, { timeout: 20000 });
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
        },
        // Het NIEUWE dossier met zijn status Nieuw (zonder surveyor): een gegeven dat pas na het aanvaarden bestaat.
        merk: /HQ-2026-\d{4}\s*(Nieuw|Nouveau|New|Neu)/,
        nl: 'Met Aanvaarden maakt Quaymark het dossier aan, en krijgt de indiener een mail dat zijn opdracht aanvaard is.',
        fr: 'Avec Accepter, Quaymark crée le dossier, et l’expéditeur reçoit un e-mail indiquant que sa mission est acceptée.',
        en: 'With Accept, Quaymark creates the file, and the sender receives an email saying the assignment is accepted.',
        de: 'Mit Annehmen legt Quaymark die Akte an, und der Absender erhält eine E-Mail, dass sein Auftrag angenommen ist.',
        website: { nl: 'Aanvaarden: het dossier staat meteen klaar.', fr: 'Accepter : le dossier est aussitôt prêt.', en: 'Accept: the file is ready at once.', de: 'Annehmen: Die Akte steht sofort bereit.' } },

      { naam: 'dossier', kop: { nl: 'Het nieuwe dossier', fr: 'Le nouveau dossier', en: 'The new file', de: 'Die neue Akte' },
        doe: async (p) => {
          const vak = (sleutel) => p.locator('.dxbl-fl-item, .dxbl-form-layout-item').filter({ hasText: new RegExp(`^\\s*(${Q(sleutel).source})`) }).first();
          await beweegNaar(p, p.getByText(Q('bevestiging_stand_via_aanvraag')).first());
          await p.waitForTimeout(T(1200));
          await beweegNaar(p, vak('gepland_op'));
          await p.waitForTimeout(T(800));
        },
        merk: /HQ-2026-\d{4}\s*(Nieuw|Nouveau|New|Neu)/,
        nl: 'Het dossier heeft al zijn opdrachtgever, zijn schip, de haven en het gewenste moment. Het geldt als bevestigd: de opdrachtgever vroeg het zelf aan.',
        fr: 'Le dossier a déjà son donneur d’ordre, son navire, le port et le moment souhaité. Il compte comme confirmé : le donneur d’ordre l’a demandé lui-même.',
        en: 'The file already has its principal, its vessel, the port and the requested time. It counts as confirmed: the principal asked for it.',
        de: 'Die Akte hat schon ihren Auftraggeber, ihr Schiff, den Hafen und den gewünschten Zeitpunkt. Sie gilt als bestätigt: Der Auftraggeber hat sie selbst angefragt.' },

      { naam: 'te-plannen', kop: { nl: 'Te plannen', fr: 'À planifier', en: 'To schedule', de: 'Zu planen' },
        doe: async (p) => {
          await klik(p, menu(p, 'planning'));
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(2000));
          await beweegNaar(p, p.locator('[draggable=true][data-dossier-id]').filter({ hasText: 'POLDERWIND' }).first());
        },
        // De kaart van het nieuwe dossier onder Te plannen: POLDERWIND staat vandaag nergens anders op de planning.
        merk: /POLDERWIND/,
        nl: 'Op de planning staat het nieuwe dossier links, onder Te plannen: het heeft nog geen surveyor.',
        fr: 'Dans le planning, le nouveau dossier figure à gauche, sous À planifier : il n’a pas encore d’expert.',
        en: 'On the schedule, the new file appears on the left, under To schedule: it has no surveyor yet.',
        de: 'In der Planung steht die neue Akte links unter Zu planen: Sie hat noch keinen Sachverständigen.',
        website: { nl: 'Nog zonder surveyor? Dan staat het bij Te plannen.', fr: 'Sans expert ? Il attend sous À planifier.', en: 'No surveyor yet? It waits under To schedule.', de: 'Noch ohne Sachverständigen? Dann steht sie unter Zu planen.' } },

      { naam: 'slepen', kop: { nl: 'Inplannen door te slepen', fr: 'Planifier en glissant', en: 'Scheduling by dragging', de: 'Planen durch Ziehen' },
        doe: async (p) => {
          // De gewenste dag: de eerstvolgende werkdag (zoals proefklant-vullen.py). De knoppen Vorige/Volgende dragen geen tekst, wel een titel
          // MET de naam van de weergave, die DevExpress niet vertaalt: "Volgende Day", "Next Day", "Nächste Day", maar "Day suivant" (gemeten
          // 19/11/2026; eerst stond hier $="Day", en dat vond in het Frans niets). In elke taal eerst Vorige, dan Volgende.
          const vandaag = new Date(); let d = 1;
          while ([0, 6].includes(new Date(vandaag.getFullYear(), vandaag.getMonth(), vandaag.getDate() + d).getDay())) d++;
          for (let i = 0; i < d; i++) { await klik(p, p.locator('button[title*="Day"]').nth(1)); await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1000)); }
          const doel = new Date(vandaag.getFullYear(), vandaag.getMonth(), vandaag.getDate() + d);
          // data-start = de wandklok van de cel in epoch-ms (adm-scheduler-drop.js); data-resource 0 = de eerste kolom, Demo Surveyor.
          const cel = p.locator(`.dxbl-sc-time-cell[data-start="${Date.UTC(doel.getFullYear(), doel.getMonth(), doel.getDate(), 9, 0)}"][data-resource="0"]`).first();
          const kaart = p.locator('[draggable=true][data-dossier-id]').filter({ hasText: 'POLDERWIND' }).first();
          await beweegNaar(p, kaart);
          await kaart.dragTo(cel);
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(2000));
        },
        // Het blok op de planning: POLDERWIND om 09:00. Het andere POLDERWIND-dossier (HQ-2026-0004) staat om 14:00.
        merk: /POLDERWIND · [^0-9]*09:00/,
        nl: 'U bladert naar de gewenste dag en sleept het dossier naar de kolom van de surveyor, op het uur waarop het werk begint.',
        fr: 'Vous passez au jour souhaité et glissez le dossier dans la colonne de l’expert, à l’heure où le travail commence.',
        en: 'You go to the requested day and drag the file into the surveyor’s column, at the hour the work starts.',
        de: 'Sie blättern zum gewünschten Tag und ziehen die Akte in die Spalte des Sachverständigen, zu der Stunde, zu der die Arbeit beginnt.',
        website: { nl: 'Sleep het naar een surveyor en een uur.', fr: 'Glissez-le vers un expert et une heure.', en: 'Drag it to a surveyor and a time.', de: 'Ziehen Sie sie zu einem Sachverständigen und einer Uhrzeit.' } },

      { naam: 'gepland', kop: { nl: 'Gepland', fr: 'Planifié', en: 'Scheduled', de: 'Geplant' },
        doe: async (p) => {
          await beweegNaar(p, p.getByText(/POLDERWIND · [^0-9]*$/).first());
          await p.waitForTimeout(T(1500));
        },
        merk: /POLDERWIND · [^0-9]*09:00/,
        nl: 'Het dossier is nu Gepland, standaard voor twee uur. U rekt het blok uit als het werk langer duurt. Het kleurt rood bij een afwezigheid of een overlap.',
        fr: 'Le dossier est maintenant Planifié, par défaut pour deux heures. Vous étirez le bloc si le travail dure plus longtemps. Il devient rouge en cas d’absence ou de chevauchement.',
        en: 'The file is now Scheduled, by default for two hours. You stretch the block if the work takes longer. It turns red for an absence or an overlap.',
        de: 'Die Akte ist jetzt Geplant, standardmäßig für zwei Stunden. Sie ziehen den Block länger, wenn die Arbeit länger dauert. Er wird rot bei einer Abwesenheit oder einer Überschneidung.',
        website: { nl: 'Ingepland. Een overlap of afwezigheid kleurt rood.', fr: 'Planifié. Un chevauchement ou une absence s’affiche en rouge.', en: 'Scheduled. An overlap or an absence shows in red.', de: 'Geplant. Überschneidung oder Abwesenheit erscheint rot.' } },
    ],
  }],
  // ── EEN BEWIJSPAKKET MAKEN (26/11/2026, op vraag van Dominique: "Ja, dat pakket" — één van drie nieuwe films) ─────────────────────────
  // De keten van de Hoe-doe-ik-pagina "Hoe maak ik een bewijspakket": de originele foto's → het uitgegeven rapport → het pakket maken → wat erin
  // zit → natrekken zonder Quaymark → de vingerafdruk in het journaal. Op HQ-2026-0003, NA de film rapport-uitgeven in dezelfde taal: het pakket
  // bevat enkel uitgegeven rapporten, en die film geeft versie 1 uit (een voorlopig rapport).
  //
  // ⚠️ DEZE FILM SCHRIJFT: een rij in rapporten.bewijspakketten (enkel toe te voegen) en een notitie in het journaal. Zelfde werkwijze als
  // rapport-uitgeven: per taal de proefklant terugzetten, dan rapport-uitgeven en meteen daarna deze film; na de ronde opnieuw terugzetten.
  // ⚠️ De knop is een DOWNLOAD (sinds 0.57.1 met het attribuut download: zonder sprong het tabblad terug naar Tekst, gemeten 26/11/2026). Wat er in
  // de ZIP zit, toont de film niet: dat is geen scherm. De stem zegt het, en de kolom Inhoud telt het.
  ['bewijspakket', {
    pagina: 'hoe/bewijspakket',
    titel: {
      nl: 'Een bewijspakket maken in Quaymark',
      fr: 'Constituer un dossier de preuves dans Quaymark',
      en: 'Putting together an evidence package in Quaymark',
      de: 'Ein Beweispaket in Quaymark zusammenstellen',
    },
    omschrijving: {
      nl: 'Eén ZIP voor een claim: de originele foto’s met hun vingerafdruk, het uitgegeven rapport, het pakket maken, wat erin zit, natrekken '
        + 'zonder Quaymark, en de vingerafdruk van het pakket in het journaal.',
      fr: 'Un seul ZIP pour une réclamation : les photos originales et leur empreinte, le rapport émis, la création du dossier de preuves, ce qu’il '
        + 'contient, la vérification sans Quaymark, et l’empreinte du paquet dans le journal.',
      en: 'One ZIP for a claim: the original photos with their fingerprint, the issued report, creating the package, what it contains, verifying it '
        + 'without Quaymark, and the package’s fingerprint in the journal.',
      de: 'Ein ZIP für einen Schadensfall: die Originalfotos mit ihrem Fingerabdruck, der herausgegebene Bericht, das Paket erstellen, was es enthält, '
        + 'die Prüfung ohne Quaymark und der Fingerabdruck des Pakets im Journal.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'fotos', kop: { nl: 'De originele foto’s', fr: 'Les photos originales', en: 'The original photos', de: 'Die Originalfotos' },
        doe: async (p) => {
          await p.goto(`${BASIS}/dossiers/${HQ3}?tab=vaststellingen`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1200));
          const rij = p.getByRole('row').filter({ hasText: 'Hatch coaming top plate bent' }).first();
          await beweegNaar(p, rij.locator('a[href*="/quaymark/bewijs/"]').first());
          await p.waitForTimeout(T(1200));
        },
        merk: /Hatch coaming top plate bent/,
        nl: 'Een bewijspakket bundelt wat u voor een claim nodig hebt. Het begint bij de foto’s van de veldapp. Quaymark bewaart ze zoals het toestel ze nam, met het tijdstip, de positie en een vingerafdruk.',
        fr: 'Un dossier de preuves rassemble ce qu’il vous faut pour une réclamation. Tout commence par les photos de l’application de terrain. Quaymark les conserve telles que l’appareil les a prises, avec l’heure, la position et une empreinte.',
        en: 'An evidence package bundles what you need for a claim. It starts with the photos from the field app. Quaymark keeps them as the device took them, with the time, the position and a fingerprint.',
        de: 'Ein Beweispaket bündelt, was Sie für einen Schadensfall brauchen. Es beginnt mit den Fotos der Feld-App. Quaymark bewahrt sie so auf, wie das Gerät sie aufgenommen hat, mit der Uhrzeit, der Position und einem Fingerabdruck.' },

      { naam: 'rapport', kop: { nl: 'Het uitgegeven rapport', fr: 'Le rapport émis', en: 'The issued report', de: 'Der herausgegebene Bericht' },
        doe: async (p) => {
          await naarTab(p, 'rapport_tab');
          await naarTab(p, 'rapport_deel_uitgifte');
          await beweegNaar(p, p.locator('[data-versie-soort]').first());
          await p.waitForTimeout(T(800));
        },
        // De soort in de lijst van de versies, met de vingerafdruk van die versie erachter: gegevens van de versie die rapport-uitgeven uitgaf.
        merk: new RegExp(`(${Q('rapportsoort_preliminary').source})[\\s\\S]{0,400}[0-9a-f]{12}`),
        nl: 'Het pakket bevat de uitgegeven rapporten, geen voorbeelden. Geef dus eerst het rapport uit. Hier is dat versie 1, met haar eigen vingerafdruk.',
        fr: 'Le dossier de preuves contient les rapports émis, pas les aperçus. Émettez donc d’abord le rapport. Ici, c’est la version 1, avec sa propre empreinte.',
        en: 'The package contains the issued reports, not previews. So issue the report first. Here, that is version 1, with its own fingerprint.',
        de: 'Das Paket enthält die herausgegebenen Berichte, keine Vorschauen. Geben Sie also zuerst den Bericht heraus. Hier ist das Version 1, mit ihrem eigenen Fingerabdruck.' },

      { naam: 'maken', kop: { nl: 'Het pakket maken', fr: 'Créer le paquet', en: 'Creating the package', de: 'Das Paket erstellen' },
        doe: async (p) => {
          await naarTab(p, 'bewijspakket');
          const knopZip = p.locator('a[href$="/bewijspakket.zip"]:visible').first();
          await beweegNaar(p, knopZip);
          // Een download: de pagina blijft staan, en het tabblad leest de lijst opnieuw tot de vingerafdruk er staat (VolgPakketAsync, elke 2 s).
          const [download] = await Promise.all([p.waitForEvent('download', { timeout: 60000 }), klik(p, knopZip)]);
          await download.path();
          await p.locator('code:visible').filter({ hasText: /^[0-9a-f]{64}$/ }).first().waitFor({ state: 'visible', timeout: 60000 });
          await p.waitForTimeout(T(1000));
        },
        // De volledige SHA-256 van het pakket: staat enkel in de lijst van de pakketten (de versies tonen er 12 tekens van).
        merk: /[0-9a-f]{64}/,
        nl: 'Onder Bewijspakket klikt u op Bewijspakket, ZIP. Quaymark rekent bij het inpakken elk bestand na. Klopt er één niet meer met zijn vingerafdruk, dan komt er geen pakket.',
        fr: 'Sous Dossier de preuves, vous cliquez sur Dossier de preuves, ZIP. Quaymark revérifie chaque fichier lors de l’emballage. Si un seul ne correspond plus à son empreinte, il n’y a pas de paquet.',
        en: 'Under Evidence package, you click Evidence package, ZIP. Quaymark re-checks every file while packing. If a single one no longer matches its fingerprint, there is no package.',
        de: 'Unter Beweispaket klicken Sie auf Beweispaket, ZIP. Quaymark prüft beim Packen jede Datei nach. Stimmt eine nicht mehr mit ihrem Fingerabdruck überein, entsteht kein Paket.' },

      { naam: 'inhoud', kop: { nl: 'Wat erin zit', fr: 'Ce qu’il contient', en: 'What it contains', de: 'Was es enthält' },
        doe: async (p) => {
          await beweegNaar(p, p.getByText(/^\s*6\s/).filter({ hasText: /·/ }).first());
          await p.waitForTimeout(T(1500));
        },
        // De kolom Inhoud van het nieuwe pakket: zes bewijsstukken en één rapportversie, de gegevens van HQ-2026-0003.
        merk: /6 bewijsstukken · 1 rapportversies|6 pièces de preuve · 1 versions de rapport|6 evidence items · 1 report versions|6 Beweisstücke · 1 Berichtsversionen/,
        nl: 'In de ZIP zitten de originele foto’s, ook die u uit het rapport liet, met de reden. Verder een manifest, het uitgegeven rapport en een LEESMIJ in de taal van het dossier.',
        fr: 'Le ZIP contient les photos originales, y compris celles que vous avez retirées du rapport, avec la raison. Ensuite un manifeste, le rapport émis et un LISEZMOI dans la langue du dossier.',
        en: 'The ZIP holds the original photos, including the ones you left out of the report, with the reason. Then a manifest, the issued report and a README in the language of the file.',
        de: 'Im ZIP stecken die Originalfotos, auch die, die Sie aus dem Bericht genommen haben, mit dem Grund. Dazu ein Manifest, der herausgegebene Bericht und ein LIESMICH in der Sprache der Akte.' },

      { naam: 'natrekken', kop: { nl: 'Natrekken zonder Quaymark', fr: 'Vérifier sans Quaymark', en: 'Verifying without Quaymark', de: 'Prüfen ohne Quaymark' },
        doe: async (p) => {
          await beweegNaar(p, p.locator('code:visible').filter({ hasText: /^[0-9a-f]{64}$/ }).first());
          await p.waitForTimeout(T(1500));
        },
        merk: /[0-9a-f]{64}/,
        nl: 'U bezorgt de ZIP aan de advocaat, de verzekeraar of de expert van de tegenpartij. Die trekt ze zelf na met de commando’s uit de LEESMIJ, zonder Quaymark.',
        fr: 'Vous remettez le ZIP à l’avocat, à l’assureur ou à l’expert de la partie adverse. Celui-ci le vérifie lui-même avec les commandes du LISEZMOI, sans Quaymark.',
        en: 'You deliver the ZIP to the lawyer, the insurer or the other party’s surveyor. They verify it themselves with the commands in the README, without Quaymark.',
        de: 'Sie stellen das ZIP dem Anwalt, dem Versicherer oder dem Sachverständigen der Gegenpartei zu. Der prüft es selbst mit den Befehlen aus der LIESMICH, ohne Quaymark.' },

      { naam: 'journaal', kop: { nl: 'Vastgelegd in het journaal', fr: 'Consigné dans le journal', en: 'Recorded in the journal', de: 'Im Journal festgehalten' },
        doe: async (p) => {
          await klik(p, tabblad(p, SCHIL.journaal)); await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1200));
          await beweegNaar(p, p.getByText(Q('bewijspakket_journaal')).first());
          await p.waitForTimeout(T(1200));
        },
        // De notitie van Quaymark met de vingerafdruk van het pakket erin: die bestaat pas na het maken.
        merk: new RegExp(`(${Q('bewijspakket_journaal').source})[\\s\\S]{0,200}[0-9a-f]{64}`),
        nl: 'De vingerafdruk van het pakket staat op het tabblad en in het journaal. Zo toont u later precies welk pakket u bezorgde.',
        fr: 'L’empreinte du paquet figure dans l’onglet et dans le journal. Vous pourrez ainsi montrer plus tard quel paquet vous avez remis, exactement.',
        en: 'The package’s fingerprint is on the tab and in the journal. That way you can later show exactly which package you delivered.',
        de: 'Der Fingerabdruck des Pakets steht auf der Registerkarte und im Journal. So zeigen Sie später genau, welches Paket Sie zugestellt haben.' },
    ],
  }],
  // ── VAN TIJD EN KOSTEN TOT FACTUUR (26/11/2026, op vraag van Dominique: "Ja, dat pakket" — één van drie nieuwe films) ──────────────────
  // De keten van de pagina Facturen: de prestaties en kosten van een dossier → Factuur voorstellen → het klad → uitgeven (nummer, vervaldatum,
  // mededeling, betaal-QR) → vast met vingerafdruk → versturen → de lijst Facturen. Op ZB-2026-0003 (sampling, Polderwacht): twee prestaties en
  // drie kosten, waarvan twee op Doorrekenen (proefklant-vullen.py).
  //
  // ⚠️ DEZE FILM SCHRIJFT, en een uitgegeven factuur is NIET te wissen (geen weg in de app, en proefklant-vullen.py kent ze niet): een klad, een
  // uitgegeven factuur met haar nummer uit de reeks, een PDF, een notitie in het journaal. Vóór ELKE taal de databank van qm-demo terugzetten uit een
  // dump die vóór de ronde genomen is (pg_dump/pg_restore in de container quaymark-db), dan heet de factuur in elke taal F-ZB-2026-0001; na de ronde
  // nog eens terugzetten en de PDF's van de ronde uit de bestandsmap van het bureau wissen.
  // ⚠️ Versturen wordt enkel AANGEWEZEN: lokaal praat de app met de echte hub (Peppol), en een mail vertrekt in Development niet, wat het blok dan
  // ook zegt ("niet verstuurd"). Dat hoort niet in een film.
  // ⚠️ De regels van de factuur staan in de taal van de FACTUUR (die van Polderwacht: Nederlands), ook op een Frans, Engels of Duits scherm.
  ['factureren', {
    pagina: 'facturen',
    titel: {
      nl: 'Van tijd en kosten tot factuur in Quaymark',
      fr: 'Des temps et frais à la facture dans Quaymark',
      en: 'From time and expenses to invoice in Quaymark',
      de: 'Von Zeit und Kosten zur Rechnung in Quaymark',
    },
    omschrijving: {
      nl: 'Een dossier factureren: de prestaties en de kosten om door te rekenen, Factuur voorstellen, het klad met de voorgestelde btw, uitgeven met '
        + 'nummer, vervaldatum, mededeling en betaal-QR, de vingerafdruk van de PDF, en versturen via Peppol of per mail.',
      fr: 'Facturer un dossier : les prestations et les frais à refacturer, Proposer une facture, le brouillon avec la TVA proposée, l’émission avec '
        + 'numéro, échéance, communication structurée et QR de paiement, l’empreinte du PDF, et l’envoi via Peppol ou par e-mail.',
      en: 'Invoicing a file: the time entries and the expenses to recharge, Propose invoice, the draft with the suggested VAT, issuing with a number, '
        + 'due date, payment reference and payment QR code, the fingerprint of the PDF, and sending via Peppol or by email.',
      de: 'Eine Akte abrechnen: die Leistungen und die weiterzuberechnenden Kosten, Rechnung vorschlagen, der Entwurf mit der vorgeschlagenen MwSt., '
        + 'das Ausstellen mit Nummer, Fälligkeitsdatum, Verwendungszweck und Zahlungs-QR-Code, der Fingerabdruck der PDF und der Versand über Peppol oder per E-Mail.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'tijd', kop: { nl: 'Tijd en kosten', fr: 'Temps et frais', en: 'Time and expenses', de: 'Zeit und Kosten' },
        doe: async (p) => {
          await openDossier(p, 'ZB-2026-0003');
          await naarTab(p, 'tijd_kosten');
          await beweegNaar(p, p.getByRole('row').filter({ hasText: 'Sampling during loading' }).first());
          await p.waitForTimeout(T(1000));
        },
        merk: /Sampling during loading, holds 1 to 3/,
        nl: 'Wat een dossier kost, staat op het tabblad Tijd en kosten. Bovenaan de facturen van het dossier, daaronder de prestaties van de surveyors, met hun uren.',
        fr: 'Ce que coûte un dossier figure dans l’onglet Temps et frais. En haut, les factures du dossier, en dessous les prestations des experts, avec leurs heures.',
        en: 'What a file costs is on the Time and expenses tab. At the top are the file’s invoices, below them the surveyors’ time entries, with their hours.',
        de: 'Was eine Akte kostet, steht auf der Registerkarte Zeit und Kosten. Oben die Rechnungen der Akte, darunter die Leistungen der Sachverständigen, mit ihren Stunden.' },

      { naam: 'kosten', kop: { nl: 'De kosten', fr: 'Les frais', en: 'The expenses', de: 'Die Kosten' },
        doe: async (p) => {
          await beweegNaar(p, p.getByRole('row').filter({ hasText: 'Laboratory analysis' }).first());
          await p.waitForTimeout(T(1200));
          await beweegNaar(p, p.getByRole('row').filter({ hasText: 'Parking at the terminal' }).first());
        },
        merk: /Laboratory analysis, 6 samples/,
        nl: 'Onderaan de kosten. Een kost op Doorrekenen komt op de factuur, zoals de analyse in het labo. De parking blijft bij het bureau.',
        fr: 'En bas, les frais. Un frais marqué Refacturer va sur la facture, comme l’analyse en laboratoire. Le parking reste à charge du bureau.',
        en: 'At the bottom are the expenses. An expense marked Recharge goes on the invoice, like the lab analysis. The parking stays with the office.',
        de: 'Unten die Kosten. Kosten auf Weiterberechnen kommen auf die Rechnung, wie die Laboranalyse. Das Parken bleibt beim Büro.' },

      { naam: 'voorstellen', kop: { nl: 'Factuur voorstellen', fr: 'Proposer une facture', en: 'Propose invoice', de: 'Rechnung vorschlagen' },
        doe: async (p) => {
          await klik(p, knop(p, 'factuur_voorstellen').first());
          await p.waitForURL(/\/facturen\/[0-9a-f-]{36}$/, { timeout: 20000 });
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.getByRole('row').filter({ hasText: 'Demo Surveyor' }).first());
          await p.waitForTimeout(T(800));
        },
        // Een regel van het nieuwe klad: op deze pagina enkel als factuurregel (het tabblad Tijd en kosten is weg).
        merk: /Laboratory analysis, 6 samples/,
        nl: 'Factuur voorstellen maakt een klad voor de opdrachtgever: de uren maal het uurtarief, en de kosten om door te rekenen. Wat al op een andere factuur staat, telt niet mee.',
        fr: 'Proposer une facture crée un brouillon pour le donneur d’ordre : les heures multipliées par le tarif horaire, et les frais à refacturer. Ce qui figure déjà sur une autre facture n’est pas repris.',
        en: 'Propose invoice creates a draft for the principal: the hours times the hourly rate, and the expenses to recharge. Anything already on another invoice is left out.',
        de: 'Rechnung vorschlagen erstellt einen Entwurf für den Auftraggeber: die Stunden mal dem Stundensatz und die weiterzuberechnenden Kosten. Was schon auf einer anderen Rechnung steht, zählt nicht mit.' },

      { naam: 'klad', kop: { nl: 'Het klad', fr: 'Le brouillon', en: 'The draft', de: 'Der Entwurf' },
        doe: async (p) => {
          await beweegNaar(p, p.getByText(/1\D?701\D01/).first());
          await p.waitForTimeout(T(1200));
          await beweegNaar(p, p.getByText(QX('factuur_voorbeeld')).first());
          await p.waitForTimeout(T(800));
        },
        // Het totaal inclusief btw van het klad, in elke schrijfwijze (1.701,01 · 1 701,01 · 1,701.01).
        merk: /1\D?701\D01/,
        nl: 'Een klad heeft nog geen nummer en past u vrij aan. De btw is voorgesteld volgens het land en het btw-nummer van de klant. Met Voorbeeld ziet u de factuur zoals ze zal vertrekken.',
        fr: 'Un brouillon n’a pas encore de numéro et vous l’adaptez librement. La TVA est proposée selon le pays et le numéro de TVA du client. Avec Aperçu, vous voyez la facture telle qu’elle partira.',
        en: 'A draft has no number yet and you can change it freely. The VAT is suggested from the client’s country and VAT number. With Preview, you see the invoice as it will be sent.',
        de: 'Ein Entwurf hat noch keine Nummer, und Sie passen ihn frei an. Die MwSt. ist nach dem Land und der USt-IdNr. des Kunden vorgeschlagen. Mit Vorschau sehen Sie die Rechnung so, wie sie verschickt wird.' },

      { naam: 'uitgeven', kop: { nl: 'Uitgeven', fr: 'Émettre', en: 'Issuing', de: 'Ausstellen' },
        doe: async (p) => {
          await klik(p, knop(p, 'factuur_uitgeven').first());
          await p.waitForTimeout(T(1200));
          // De bevestiging (onomkeerbaar) draagt dezelfde tekst als de knop op de pagina: de LAATSTE zichtbare.
          await klik(p, knop(p, 'factuur_uitgeven').last());
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(2000));
          await beweegNaar(p, p.getByText(/^\s*F-ZB-2026-\d{4}\s*$/).last());
          await p.waitForTimeout(T(800));
        },
        // Het nummer dat het uitgeven trok: bestaat pas daarna.
        merk: /F-ZB-2026-\d{4}/,
        nl: 'Uitgeven geeft de factuur haar nummer, per vestiging en per jaar. Ze krijgt een vervaldatum volgens de betaaltermijn van de opdrachtgever, een gestructureerde mededeling en een betaal-QR.',
        fr: 'Émettre donne à la facture son numéro, par site et par année. Elle reçoit une échéance selon le délai de paiement du donneur d’ordre, une communication structurée et un QR de paiement.',
        en: 'Issuing gives the invoice its number, per office and per year. It gets a due date from the principal’s payment term, a structured payment reference and a payment QR code.',
        de: 'Ausstellen gibt der Rechnung ihre Nummer, pro Niederlassung und Jahr. Sie erhält ein Fälligkeitsdatum nach dem Zahlungsziel des Auftraggebers, einen strukturierten Verwendungszweck und einen Zahlungs-QR-Code.' },

      { naam: 'vast', kop: { nl: 'Vast, met vingerafdruk', fr: 'Figée, avec son empreinte', en: 'Fixed, with a fingerprint', de: 'Fest, mit Fingerabdruck' },
        doe: async (p) => {
          await beweegNaar(p, p.getByText(/^[0-9a-f]{64}$/).first());
          await p.waitForTimeout(T(1500));
        },
        // De SHA-256 van de vastgelegde PDF.
        merk: /[0-9a-f]{64}/,
        nl: 'De PDF ligt vast met haar vingerafdruk. Een uitgegeven factuur verandert niet meer. Een fout zet u recht met een creditnota.',
        fr: 'Le PDF est figé avec son empreinte. Une facture émise ne change plus. Une erreur se corrige par une note de crédit.',
        en: 'The PDF is fixed with its fingerprint. An issued invoice no longer changes. You correct a mistake with a credit note.',
        de: 'Die PDF ist mit ihrem Fingerabdruck festgelegt. Eine ausgestellte Rechnung ändert sich nicht mehr. Einen Fehler berichtigen Sie mit einer Gutschrift.' },

      { naam: 'versturen', kop: { nl: 'Versturen', fr: 'Envoyer', en: 'Sending', de: 'Versenden' },
        doe: async (p) => {
          await beweegNaar(p, knop(p, 'peppol_versturen').first());
          await p.waitForTimeout(T(1500));
          await beweegNaar(p, knop(p, 'factuur_mail_versturen').first());
          await p.waitForTimeout(T(1000));
        },
        merk: /F-ZB-2026-\d{4}/,
        nl: 'Dan verstuurt u ze: via Peppol naar de boekhouding van de klant, of per mail met de PDF als bijlage. Elke verzending blijft op de factuur staan.',
        fr: 'Ensuite, vous l’envoyez : via Peppol vers la comptabilité du client, ou par e-mail avec le PDF en pièce jointe. Chaque envoi reste visible sur la facture.',
        en: 'Then you send it: via Peppol to the client’s accounting, or by email with the PDF attached. Every sending stays on the invoice.',
        de: 'Dann versenden Sie sie: über Peppol an die Buchhaltung des Kunden oder per E-Mail mit der PDF im Anhang. Jeder Versand bleibt auf der Rechnung sichtbar.' },

      { naam: 'lijst', kop: { nl: 'Openstaand', fr: 'En attente de paiement', en: 'Outstanding', de: 'Offen' },
        doe: async (p) => {
          await klik(p, menu(p, 'facturen'));
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.getByRole('row').filter({ hasText: /F-ZB-2026-\d{4}/ }).first());
          await p.waitForTimeout(T(1000));
        },
        // De nieuwe factuur in de lijst, met haar status Open erachter.
        merk: /F-ZB-2026-\d{4}[\s\S]{0,300}(Open|Ouverte|Offen)/,
        nl: 'In de lijst Facturen staat ze op Open tot ze betaald is. Een betaling koppelt u onder Betalingen, en dan staat ze op Betaald.',
        fr: 'Dans la liste des factures, elle reste Ouverte jusqu’à son paiement. Vous liez un paiement sous Paiements, et elle passe alors à Payée.',
        en: 'In the Invoices list, it stays Open until it is paid. You match a payment under Payments, and it then shows Paid.',
        de: 'In der Liste Rechnungen steht sie auf Offen, bis sie bezahlt ist. Eine Zahlung ordnen Sie unter Zahlungen zu, dann steht sie auf Bezahlt.' },
    ],
  }],
  // ── VAN DIEPGANG TOT LADING (26/11/2026, op vraag van Dominique: "Ja, dat pakket" — één van drie nieuwe films) ─────────────────────────────
  // De keten van de Hoe-doe-ik-pagina "Hoe doe ik een draft survey": het tabblad met begin- en eindmeting → een meting openen (diepgangen, schip,
  // water) → de hydrostatische waarden uit de tabellen van het schip → de berekening die meerekent → de hydrometer met zijn kalibratie → het
  // gewicht van de lading → het draft survey report uitgeven. Op HQ-2026-0004 (POLDERWIND, Antwerpen), met beide metingen volledig in de proefklant.
  //
  // ⚠️ DEZE FILM SCHRIJFT ENKEL IN DE LAATSTE SCÈNE: het report uitgeven (een document met vingerafdruk, enkel toe te voegen). De meting zelf wordt
  // NIET bewaard: de film verlaat ze met Annuleren. Vóór elke taal de proefklant terugzetten (zoals bij factureren), anders zegt de tweede taal
  // dat het report al uitgegeven is.
  // ⚠️ GEEN invoer in de meting: een decimaal getal typen verschilt per schermtaal (komma of punt), en een film die dat fout doet, toont een
  // verkeerde berekening zonder dat iets faalt. De stem zegt dat de berekening meerekent; het beeld toont haar.
  ['draft-survey', {
    pagina: 'hoe/draft-survey',
    titel: {
      nl: 'Van diepgang tot lading: een draft survey in Quaymark',
      fr: 'Du tirant d’eau à la cargaison : un draft survey dans Quaymark',
      en: 'From draft to cargo: a draft survey in Quaymark',
      de: 'Vom Tiefgang zur Ladung: ein Draft Survey in Quaymark',
    },
    omschrijving: {
      nl: 'Een draft survey van begin tot report: de begin- en eindmeting naast elkaar, de diepgangen, het schip en het water, de hydrostatische waarden '
        + 'uit de tabellen, de berekening die meerekent, de hydrometer met zijn kalibratie, het gewicht van de lading en het report met vingerafdruk.',
      fr: 'Un draft survey du début au rapport : les mesures initiale et finale côte à côte, les tirants d’eau, le navire et l’eau, les valeurs '
        + 'hydrostatiques des tables, le calcul qui suit, l’hydromètre et son étalonnage, le poids de la cargaison et le rapport avec son empreinte.',
      en: 'A draft survey from start to report: the initial and final surveys side by side, the drafts, the vessel and the water, the hydrostatic values '
        + 'from the tables, the calculation that follows along, the hydrometer and its calibration, the cargo weight and the report with its fingerprint.',
      de: 'Ein Draft Survey vom Anfang bis zum Report: Anfangs- und Endmessung nebeneinander, die Tiefgänge, das Schiff und das Wasser, die hydrostatischen '
        + 'Werte aus den Tabellen, die mitlaufende Berechnung, das Hydrometer mit seiner Kalibrierung, das Gewicht der Ladung und der Report mit Fingerabdruck.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'tabblad', kop: { nl: 'Begin en eind', fr: 'Début et fin', en: 'Initial and final', de: 'Anfang und Ende' },
        doe: async (p) => {
          await openDossier(p, 'HQ-2026-0004');
          await naarTab(p, 'berekeningen');
          await beweegNaar(p, p.locator('a[href$="/draft/begin"]').first());
          await p.waitForTimeout(T(1000));
          await beweegNaar(p, p.locator('a[href$="/draft/eind"]').first());
        },
        // Het gewicht van de lading (49.706,234 t), in elke schrijfwijze: het resultaat van de twee metingen in de proefklant.
        merk: /49\D?706\D234/,
        nl: 'Bij een draft survey heeft het dossier onder Berekeningen het tabblad Draft survey. De beginmeting vóór het laden, de eindmeting erna, naast elkaar.',
        fr: 'Pour un draft survey, le dossier a l’onglet Draft survey sous Calculs. La mesure initiale avant le chargement, la mesure finale après, côte à côte.',
        en: 'For a draft survey, the file has the Draft survey tab under Calculations. The initial survey before loading, the final survey after, side by side.',
        de: 'Bei einem Draft Survey hat die Akte unter Berechnungen die Registerkarte Draft Survey. Die Anfangsmessung vor dem Laden, die Endmessung danach, nebeneinander.' },

      { naam: 'meting', kop: { nl: 'Een meting', fr: 'Une mesure', en: 'A survey', de: 'Eine Messung' },
        doe: async (p) => {
          await klik(p, p.locator('a[href$="/draft/begin"]').first());
          await p.waitForURL(/\/draft\/begin/, { timeout: 15000 });
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          // De groepen Diepgangen, Schip en Water (DxFormLayoutGroup), in die volgorde op de pagina.
          const blokken = p.locator('.dxbl-fl-group:visible');
          await beweegNaar(p, blokken.nth(0));
          await p.waitForTimeout(T(1500));
          await beweegNaar(p, blokken.nth(1));
          await p.waitForTimeout(T(1000));
          await beweegNaar(p, blokken.nth(2));
        },
        // De netto waterverplaatsing van de beginmeting in de berekening (26.977,059 t): staat enkel op deze pagina en op het tabblad.
        merk: /26\D?977\D059/,
        nl: 'Een klik op Beginmeting opent de meting. U vult de zes diepgangen in: voor, midden en achter, aan bakboord en stuurboord. Daaronder het schip, met de afstanden van de merken, en het water.',
        fr: 'Un clic sur Mesure initiale ouvre la mesure. Vous saisissez les six tirants d’eau : avant, milieu et arrière, à bâbord et à tribord. En dessous, le navire, avec les distances des marques, et l’eau.',
        en: 'A click on Initial survey opens the survey. You enter the six drafts: forward, midships and aft, port and starboard. Below them the vessel, with the distances of the marks, and the water.',
        de: 'Ein Klick auf Anfangsmessung öffnet die Messung. Sie geben die sechs Tiefgänge ein: vorn, Mitte und achtern, an Backbord und Steuerbord. Darunter das Schiff, mit den Abständen der Marken, und das Wasser.' },

      { naam: 'tabellen', kop: { nl: 'De tabellen van het schip', fr: 'Les tables du navire', en: 'The vessel’s tables', de: 'Die Tabellen des Schiffs' },
        doe: async (p) => {
          const kop = p.getByText(/(Hydrostatische waarden bij|Valeurs hydrostatiques à|Hydrostatic values at|Hydrostatische Werte bei) 6[.,]062 m/).first();
          await beweegNaar(p, kop);
          await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.locator('.draft-lcf-vanaf').first());
        },
        // De kop van het blok noemt de gemiddelde diepgang van DEZE meting (quarter mean 6,062 m): een gegeven, berekend uit de diepgangen.
        merk: /(Hydrostatische waarden bij|Valeurs hydrostatiques à|Hydrostatic values at|Hydrostatische Werte bei) 6[.,]062 m/,
        nl: 'Bij de gemiddelde diepgang leest u uit de tabellen van het schip de waterverplaatsing, de TPC, de LCF en de MTC af. Quaymark zegt bij welke diepgang. De LCF neemt u over zoals de tabel ze geeft.',
        fr: 'Au tirant d’eau moyen, vous relevez dans les tables du navire le déplacement, le TPC, le LCF et le MTC. Quaymark indique à quel tirant d’eau. Vous reprenez le LCF tel que la table le donne.',
        en: 'At the mean draft, you read the displacement, the TPC, the LCF and the MTC from the vessel’s tables. Quaymark tells you at which draft. You enter the LCF as the table gives it.',
        de: 'Beim mittleren Tiefgang lesen Sie aus den Tabellen des Schiffs die Verdrängung, den TPC, den LCF und den MTC ab. Quaymark sagt, bei welchem Tiefgang. Den LCF übernehmen Sie so, wie die Tabelle ihn angibt.' },

      { naam: 'berekening', kop: { nl: 'De berekening', fr: 'Le calcul', en: 'The calculation', de: 'Die Berechnung' },
        doe: async (p) => {
          // Het label uit QText (het Duits schrijft Quarter Mean, met een hoofdletter: gemeten 26/11/2026).
          await beweegNaar(p, p.getByRole('row').filter({ hasText: Q('draft_quarter_mean') }).first());
          await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.getByText(/26\D?977\D059/).first());
          await p.waitForTimeout(T(800));
        },
        merk: /26\D?977\D059/,
        nl: 'Rechts rekent Quaymark mee bij elke wijziging: de trim, de doorbuiging, de quarter mean, de trimcorrecties, de densiteit, de aftrek en de netto waterverplaatsing. Elke stap afgerond, zoals op papier.',
        fr: 'À droite, Quaymark recalcule à chaque modification : l’assiette, la flexion, le quarter mean, les corrections d’assiette, la densité, les déductions et le déplacement net. Chaque étape arrondie, comme sur papier.',
        en: 'On the right, Quaymark recalculates with every change: the trim, the hog or sag, the quarter mean, the trim corrections, the density, the deductions and the net displacement. Each step rounded, as on paper.',
        de: 'Rechts rechnet Quaymark bei jeder Änderung mit: der Trimm, die Durchbiegung, der Quarter Mean, die Trimmkorrekturen, die Dichte, die Abzüge und die Nettoverdrängung. Jeder Schritt gerundet, wie auf Papier.' },

      { naam: 'hydrometer', kop: { nl: 'De hydrometer', fr: 'L’hydromètre', en: 'The hydrometer', de: 'Das Hydrometer' },
        doe: async (p) => {
          await beweegNaar(p, p.getByText(/DH3-10427/).first());
          await p.waitForTimeout(T(1500));
        },
        // Het serienummer van de hydrometer van de proefklant, met zijn kalibratie: een gegeven van het register Meetapparatuur.
        merk: /DH3-10427/,
        nl: 'Onderaan staat de hydrometer waarmee u de densiteit mat, met de kalibratie die gold op de dag van de meting. Was ze vervallen, dan waarschuwt Quaymark.',
        fr: 'En bas figure l’hydromètre avec lequel vous avez mesuré la densité, avec l’étalonnage valable le jour de la mesure. S’il était expiré, Quaymark vous avertit.',
        en: 'At the bottom is the hydrometer you used to measure the density, with the calibration that applied on the day of the survey. If it had expired, Quaymark warns you.',
        de: 'Unten steht das Hydrometer, mit dem Sie die Dichte gemessen haben, mit der Kalibrierung, die am Tag der Messung galt. War sie abgelaufen, warnt Quaymark.' },

      { naam: 'lading', kop: { nl: 'Het gewicht van de lading', fr: 'Le poids de la cargaison', en: 'The cargo weight', de: 'Das Gewicht der Ladung' },
        doe: async (p) => {
          // Annuleren: niets bewaard, terug naar het tabblad (?tab=draft).
          await klik(p, knop(p, 'annuleren').last());
          await p.waitForURL(/\/dossiers\/[0-9a-f-]{36}\?tab=draft/, { timeout: 15000 });
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(1500));
          await beweegNaar(p, p.getByText(/49\D?706\D234/).first());
          await p.waitForTimeout(T(1000));
        },
        merk: /49\D?706\D234/,
        nl: 'Terug op het tabblad staat het gewicht van de lading: het verschil van de netto waterverplaatsing tussen begin en eind. Meer aan het eind is geladen, minder is gelost.',
        fr: 'De retour sur l’onglet figure le poids de la cargaison : la différence du déplacement net entre le début et la fin. Davantage à la fin, c’est chargé ; moins, c’est déchargé.',
        en: 'Back on the tab is the cargo weight: the difference in net displacement between the initial and final surveys. More at the end means loaded, less means discharged.',
        de: 'Zurück auf der Registerkarte steht das Gewicht der Ladung: der Unterschied der Nettoverdrängung zwischen Anfang und Ende. Mehr am Ende heißt geladen, weniger heißt gelöscht.' },

      { naam: 'report', kop: { nl: 'Het draft survey report', fr: 'Le draft survey report', en: 'The draft survey report', de: 'Der Draft Survey Report' },
        doe: async (p) => {
          await beweegNaar(p, p.getByText(QX('draft_voorbeeld')).first());
          await p.waitForTimeout(T(1200));
          await klik(p, knop(p, 'draft_uitgeven').first());
          await p.waitForTimeout(T(1200));
          // De bevestiging (onomkeerbaar) draagt dezelfde tekst als de knop: de LAATSTE zichtbare.
          await klik(p, knop(p, 'draft_uitgeven').last());
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(T(2000));
          await beweegNaar(p, p.locator('[data-draft-uitgegeven]').first());
          await p.waitForTimeout(T(1000));
        },
        // De regel Uitgegeven op … door …, met de vingerafdruk erachter: bestaat pas na het uitgeven.
        merk: /(Uitgegeven op|Émis le|Issued on|Ausgegeben am)[\s\S]{0,300}[0-9a-f]{12}/,
        nl: 'Het draft survey report heeft plaats voor de handtekening van de kapitein. Uitgeven legt het vast met zijn vingerafdruk, bij de brieven en certificaten van het dossier en in het bewijspakket.',
        fr: 'Le draft survey report prévoit la signature du capitaine. Émettre le fige avec son empreinte, parmi les lettres et certificats du dossier et dans le dossier de preuves.',
        en: 'The draft survey report has room for the master’s signature. Issuing fixes it with its fingerprint, with the letters and certificates of the file and in the evidence package.',
        de: 'Der Draft Survey Report hat Platz für die Unterschrift des Kapitäns. Herausgeben legt ihn mit seinem Fingerabdruck fest, bei den Schreiben und Bescheinigungen der Akte und im Beweispaket.' },
    ],
  }],
];

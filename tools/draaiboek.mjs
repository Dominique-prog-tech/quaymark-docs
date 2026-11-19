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

// Een dossier openen vanuit de lijst, zoals een gebruiker: de rij aanwijzen en dubbelklikken.
const openDossier = async (p, nummer) => {
  await p.goto(`${BASIS}/dossiers`); await p.waitForLoadState('networkidle');
  const rij = p.getByRole('row').filter({ hasText: nummer }).first();
  await rij.waitFor({ state: 'visible', timeout: 15000 });
  await beweegNaar(p, rij);
  await rij.dblclick();
  await p.waitForURL(/\/dossiers\/[0-9a-f-]{36}(\?.*)?$/, { timeout: 15000 });
  await p.waitForLoadState('networkidle'); await p.waitForTimeout(1200);
};
// ⚠️ DevExpress zet de naam van een tabblad TWEE keer in de pagina ("Veldwerk\n   Veldwerk": een verborgen kopie, gemeten 19/11/2026), dus
// QX vindt nooit een tabblad. Dit patroon laat die verdubbeling toe en blijft strikt: "Bericht" (Duits voor rapport) vindt "Berichten" niet.
const tabNaam = sleutel => { const a = Q(sleutel).source; return new RegExp(`^\\s*(${a})(\\s+(${a}))?\\s*$`); };
const naarTab = async (p, sleutel) => { await klik(p, tabblad(p, tabNaam(sleutel))); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1200); };
const knop = (p, sleutel) => p.getByRole('button', { name: QX(sleutel) });
// De knop Bewaren onderaan een fiche komt uit de AppKit, niet uit QText.
const BEWAREN = /^(Bewaren|Enregistrer|Save|Speichern)$/;
// Een keuzelijst van DevExpress openen: het pijltje naast het vak (een klik in het vak geeft enkel de focus, gemeten 19/11/2026).
const openLijst = async (p, vak) => { await klik(p, vak.locator('button, .dxbl-edit-btn-dropdown').last()); await p.waitForTimeout(900); };
const kies = async (p, patroon) => {
  const optie = p.locator('[role=option]:visible, .dxbl-list-box-item:visible').filter({ hasText: patroon }).first();
  await optie.waitFor({ state: 'visible', timeout: 10000 });
  await klik(p, optie); await p.waitForTimeout(900);
};

export const FILMS = [
  // ── VAN VASTSTELLING TOT UITGEGEVEN RAPPORT (19/11/2026, de proeffilm; op vraag van Dominique: "Ja, schrijf uit") ─────────────────
  // De keten van de Hoe-doe-ik-pagina "Hoe geef ik een rapport uit": vaststellingen met foto → status Rapportage → de tekst per rubriek
  // (een spraaknotitie, een standaardtekst) → controle → uitgeven → verzenden. Op HQ-2026-0003, de schadesurvey van de KAAIMEEUW
  // in de proefklant (proefklant-vullen.py), het dossier van de handleidingbeelden.
  //
  // ⚠️ DEZE FILM SCHRIJFT in de lokale proefklant: de status, de rubrieken, een verantwoording en een uitgegeven versie (die is enkel
  // toe te voegen). Vóór ELKE taal de proefklant opnieuw vullen, anders is het in de tweede taal versie 2 en vraagt Quaymark geen
  // verantwoording meer:
  //   for t in nl fr en de; do QUAYMARK_REPO=<werkboom> python3 tools/proefklant-vullen.py && node tools/films.mjs rapport --taal=$t; done
  // En daarna nog één keer vullen, voor de beelden.
  //
  // ⚠️ NIET IN DE FILM: het voorbeeld (PDF). De motor draait Chromium zonder scherm, en dat toont geen PDF: het venster zegt dan
  // "Deze browser toont dit bestand niet rechtstreeks" (gemeten 19/11/2026). De knop wordt enkel aangewezen.
  // ⚠️ Enkel Nederlands tot Dominique het draaiboek goedkeurt; daarna fr, en en de (titel, omschrijving, kop en tekst per scène).
  ['rapport-uitgeven', {
    pagina: 'hoe/rapport-uitgeven',
    titel: {
      nl: 'Van vaststelling tot uitgegeven rapport in Quaymark',
    },
    omschrijving: {
      nl: 'De weg van een dossier naar zijn rapport: de vaststellingen met hun foto, het dossier op Rapportage, de tekst per rubriek '
        + 'met een spraaknotitie en een standaardtekst, de controle van het rapport, uitgeven met een vingerafdruk, en verzenden.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'vaststellingen', kop: { nl: 'De vaststellingen' },
        doe: async (p) => {
          await openDossier(p, 'HQ-2026-0003');
          await naarTab(p, 'veldwerk');
          await beweegNaar(p, p.getByText('Tank top plating indented').first());
        },
        merk: /Tank top plating indented/,
        nl: 'Ter plaatse legt de surveyor zijn vaststellingen vast in de veldapp, per plaats aan boord, met de ernst en een foto. Op kantoor vindt u ze terug onder Veldwerk.' },

      { naam: 'foto', kop: { nl: 'Foto’s met bewijswaarde' },
        doe: async (p) => {
          const rij = p.getByRole('row').filter({ hasText: 'Hatch coaming top plate bent' }).first();
          await beweegNaar(p, rij.locator('a[href*="/quaymark/bewijs/"]').first());
          await p.waitForTimeout(1500);
        },
        merk: /Hatch coaming top plate bent/,
        nl: 'Bij elke foto legt het toestel het tijdstip, de positie en een vingerafdruk vast. Een vaststelling wordt nooit overschreven. Een fout zet u recht met een nieuwe versie.' },

      { naam: 'status', kop: { nl: 'Het dossier op Rapportage' },
        doe: async (p) => {
          await naarTab(p, 'algemeen');
          const vak = p.locator('.dxbl-fl-item, .dxbl-form-layout-item').filter({ hasText: new RegExp(`^\\s*(${Q('status').source})`) }).first();
          await openLijst(p, vak);
          // De naam van de status staat in QText onder een enum-sleutel (DossierStatus.Rapportage), die Q niet leest.
          await kies(p, /^\s*(Rapportage|Rapport|Reporting|Berichterstellung)\s*$/);
          await klik(p, p.getByRole('button', { name: BEWAREN }).first());
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(1500);
        },
        // Het dossiernummer met zijn statusbadge erachter (zo staan ze in de paginatekst). NIET de opdrachtgever: die staat in een invoervak,
        // en de waarde van een invoervak hoort niet bij de tekst die de motor nakijkt (gemeten 19/11/2026). Aan het nummer gekoppeld, want het
        // Franse "Rapport" staat ook op een tabblad. ⚠️ GEEN \b: de motor zoekt in textContent, en daar plakken de stukken aan elkaar
        // ("HQ-2026-0003RapportageBelangenconflict?", gemeten 19/11/2026).
        merk: /HQ-2026-0003\s*(Rapportage|Rapport|Reporting|Berichterstellung)/,
        nl: 'Is het veldwerk af, dan zet u het dossier op Rapportage en bewaart u. Vanaf nu moeten de verplichte velden van de survey ingevuld zijn.' },

      { naam: 'tekst', kop: { nl: 'De tekst per rubriek' },
        doe: async (p) => {
          await naarTab(p, 'rapport_tab');
          await beweegNaar(p, p.getByText(/At the request of/).first());
        },
        merk: /At the request of Polderwacht/,
        nl: 'Op het tabblad Rapport schrijft u de tekst, rubriek per rubriek. Het rapport staat in het Engels, de taal van dit dossier. Het scherm blijft in uw eigen taal.' },

      { naam: 'spraaknotitie', kop: { nl: 'Een spraaknotitie' },
        doe: async (p) => {
          await beweegNaar(p, p.getByText(/water ingress marks on the tank top/).first());
          await p.waitForTimeout(800);
          await klik(p, knop(p, 'notitie_toevoegen').first());
          await p.waitForTimeout(1200);
          await beweegNaar(p, p.getByText(/water ingress marks on the tank top/).last());
        },
        merk: /water ingress marks on the tank top/,
        nl: 'Wat de surveyor aan boord insprak, staat hier al uitgeschreven. Met Toevoegen aan rubriek komt het in de Bevindingen.' },

      { naam: 'standaardtekst', kop: { nl: 'Een standaardtekst' },
        doe: async (p) => {
          // Het vierde vak "Standaardtekst invoegen…" is dat van de Conclusie (Inleiding, Werkwijze, Bevindingen, Conclusie, Voorbehoud):
          // op de VOLGORDE, want de naam van een rubriek is een gegeven van het bureau en niet in elke taal dezelfde.
          const vak = p.getByPlaceholder(Q('standaardtekst_invoegen')).nth(3).locator('xpath=ancestor::*[.//button][1]');
          await openLijst(p, vak);
          await kies(p, /Conclusion — further survey/);
          await beweegNaar(p, p.getByText(/A further survey is recommended/).first());
        },
        merk: /A further survey is recommended/,
        nl: 'Wat vaak terugkomt, haalt u uit de standaardteksten van uw bureau. Hier een conclusie die verder onderzoek aanraadt.' },

      { naam: 'bewaren', kop: { nl: 'Bewaren en nakijken' },
        doe: async (p) => {
          await klik(p, knop(p, 'rubrieken_bewaren'));
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(1500);
          await beweegNaar(p, knop(p, 'voorbeeld_pdf').first());
        },
        merk: /A further survey is recommended/,
        nl: 'Rubrieken bewaren legt de tekst vast. Met Voorbeeld bekijkt u het volledige rapport, met de foto’s in de bijlage, zonder dat er al iets wordt uitgegeven.' },

      { naam: 'controle', kop: { nl: 'De controle van het rapport' },
        doe: async (p) => {
          await naarTab(p, 'rapport_deel_uitgifte');
          await beweegNaar(p, p.getByText(Q('ctl_titel')).first());
        },
        // TODO bij het vertalen: de naam van het checklistpunt in fr, en en de nameten (een gegeven van het bureau).
        merk: /gefotografeerd met referentie/,
        nl: 'Onder Uitgifte legt Quaymark het rapport naast het dossier: lege rubrieken, een ontbrekende foto, tijden buiten de survey. De controle weigert niets. Ze toont wat u best nog nakijkt.' },

      { naam: 'verantwoording', kop: { nl: 'Zonder opdrachtbevestiging' },
        doe: async (p) => {
          await klik(p, knop(p, 'uitgeven').first());
          await p.waitForTimeout(1200);
          const vak = p.locator('textarea:visible').last();
          await klik(p, vak);
          // Engels, zoals alle gegevens van de proefklant: een surveyor schrijft zijn dossier in de taal van het rapport.
          await vak.type('Order confirmed by phone by the insurer.', { delay: 45 });
          await p.waitForTimeout(600);
          await klik(p, knop(p, 'bevestiging_verder'));
          await p.waitForTimeout(1200);
        },
        merk: Q('bevestiging_ontbreekt_kop'),
        nl: 'Dan Rapport uitgeven. De opdrachtgever heeft deze opdracht niet bevestigd. Quaymark vraagt dus waarom u toch uitgeeft, en bewaart dat met uw naam en het tijdstip.' },

      { naam: 'uitgeven', kop: { nl: 'Versie 1, met vingerafdruk' },
        doe: async (p) => {
          await klik(p, knop(p, 'ctl_toch_ok'));
          await p.waitForTimeout(1200);
          // De laatste bevestiging: dezelfde tekst als de knop op het tabblad, dus de LAATSTE zichtbare.
          await klik(p, knop(p, 'uitgeven').last());
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2000);
          // Daarna vraagt Quaymark of het dossier afgesloten mag worden (gemeten 19/11/2026). Niet nu: eerst verzenden.
          await klik(p, knop(p, 'niet_nu'));
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2000);
        },
        // De vingerafdruk van de uitgegeven versie (hex): een gegeven, geen opschrift.
        merk: /[0-9a-f]{12}/,
        nl: 'De bevindingen van de controle gaan mee met de versie. Na de laatste bevestiging is het rapport versie 1, met zijn vingerafdruk. Het verandert daarna nooit meer. Het dossier afsluiten kan later.' },

      { naam: 'verzenden', kop: { nl: 'Verzenden' },
        doe: async (p) => { await beweegNaar(p, knop(p, 'verzenden').first()); await p.waitForTimeout(1200); },
        merk: /[0-9a-f]{12}/,
        nl: 'Met Verzenden krijgt de opdrachtgever de PDF, en de mail komt in het journaal. Heeft uw bureau OKSign, dan laat u de versie eerst ondertekenen. Iets rechtzetten doet u met een nieuwe versie, met een reden.' },
    ],
  }],
];

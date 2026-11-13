// De handleidingbeelden van Quaymark, in VIER talen (nl, fr, en, de), uit de verzonnen proefklant qm-demo. Op de gedeelde kern
// (adm-appkit/tools/beeldgenerator), naar het model van credimatch-docs/tools/beelden.mjs.
//
//   BEELDEN_WACHTWOORD=… node tools/beelden.mjs            alle beelden
//   BEELDEN_WACHTWOORD=… node tools/beelden.mjs dossier    enkel de beelden waarvan de naam "dossier" bevat
//
// Het wachtwoord van de proefsurveyor komt uit de user-secrets van de app, zonder dat het ergens verschijnt:
//   BEELDEN_WACHTWOORD="$(dotnet user-secrets list --project ~/projects/adm-quaymark/src/Host/Quaymark.Host.Web | sed -n 's/^Proef:Surveyor:Wachtwoord = //p')" node tools/beelden.mjs
//
// Vereist: de preview quaymark-web draait, en python3 tools/proefklant-vullen.py is VANDAAG gedraaid (de planning staat t.o.v. vandaag).
// ⚠️ "Een generator is niet af als hij werkt. Hij is af als hij WEIGERT wanneer hij het niet zeker weet." (kern-README)
//  - schermBesluit: een foutmelding, "geen toegang" of een te leeg scherm is nooit een beeld;
//  - vormBesluit:   wijkt de afmeting af van het bestaande beeld, dan NIET overschrijven maar melden;
//  - ontbrekendeTermen: staat wat de alt-tekst belooft ook op het scherm?
//  - de grendel hieronder: enkel op de eigen machine, en enkel bij het bureau met "(demo)" in zijn naam.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { PAKKET, BASIS } from './app.mjs';
import { appToestand } from '/Users/dominique/projects/adm-appkit/tools/schermmachinerie/aansturing.mjs';
import { NIET_SCHERMTEKST_BASIS, altTermen, ontbrekendeTermen, pngMaat, vormBesluit, schermBesluit, maatAlsTekst }
  from '/Users/dominique/projects/adm-appkit/tools/beeldgenerator/kern.mjs';

const { chromium } = await import(PAKKET.playwright);
const HIER = new URL('.', import.meta.url).pathname;
const DOCS = join(HIER, '..', 'docs');
const BEELDEN = join(DOCS, 'images');
const filter = process.argv[2]?.split(',') ?? null;   // één of meer stukken van een naam, met komma's
const BREED = 1440, HOOG = 900;
const WACHTWOORD = process.env.BEELDEN_WACHTWOORD;
if (!WACHTWOORD) { console.error('⛔ Zet BEELDEN_WACHTWOORD (zie bovenaan): het wachtwoord van de proefsurveyor. Het staat bewust in geen enkel bestand.'); process.exit(2); }
if (!/^http:\/\/(127\.0\.0\.1|localhost)[:/]/.test(BASIS)) { console.error(`⛔ ${BASIS} is niet deze machine. Beelden komen nooit van een server.`); process.exit(2); }

// De woorden van het scherm, in de vier talen, uit de app zelf (Teksten/QText.cs): een merkteken in de taal van het beeld. Enkel lezen.
const QTEXT = readFileSync(join(PAKKET.repo, 'src/Host/Quaymark.Host.Web/Teksten/QText.cs'), 'utf8');
// C# schrijft sommige tekens als \uXXXX (het Duitse „…\u201c): eerst terugzetten, anders zoekt het merkteken naar de letterlijke escape.
const ontsnap = s => s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\"/g, '"')
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function Q(sleutel) {
  const m = QTEXT.match(new RegExp(`\\["${sleutel}"\\]\\s*=\\s*V\\(\\s*"((?:[^"\\\\]|\\\\.)*)"\\s*,\\s*"((?:[^"\\\\]|\\\\.)*)"\\s*,\\s*"((?:[^"\\\\]|\\\\.)*)"\\s*,\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  if (!m) throw new Error(`QText kent de sleutel "${sleutel}" niet (meer): pas het recept aan.`);
  return new RegExp(m.slice(1).map(ontsnap).join('|'));
}

// De verzonnen dossiers (proefklant-vullen.py). Hun id volgt uit de databank, via de lijst: het script kent geen id's.
const openRij = async (p, tekst) => {
  await p.getByRole('row').filter({ hasText: tekst }).first().dblclick();
  await p.waitForURL(/\/[0-9a-f-]{36}(\?.*)?$/, { timeout: 15000 });
};
const naarTab = tab => async p => { const u = new URL(p.url()); u.search = `?tab=${tab}`; await p.goto(u.toString()); await p.waitForLoadState('networkidle'); };
const dossier = (nummer, tab) => async p => { await openRij(p, nummer); if (tab) await naarTab(tab)(p); };

const VERBERG = '.nav-version, .adm-klok-vast, .dxbl-scroll-viewer-vert-scroll-bar, .dxbl-scroll-viewer-hor-scroll-bar { visibility: hidden !important; }'
  + '::-webkit-scrollbar, ::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb { background: transparent !important; }';

// ⚠️ ELK RECEPT DRAAGT EEN MERKTEKEN (verwacht): een tekst die op DAT scherm staat en niet op het vorige. Het script wacht erop en weigert het
// beeld zonder. De URL alleen zegt niets: Blazor wisselt de URL vóór het scherm hertekend is. Een gegeven uit de demo (scheepsnaam, tekst van een
// vaststelling) is in elke taal gelijk; anders een tekst van het scherm in de vier talen (Q).
const SCHOTEN = () => [
  { naam: 'startscherm', route: '/', verwacht: Q('dossiers_per_status'), magKortZijn: 'een welkom en vier tegels' },
  { naam: 'dossiers-lijst', route: '/dossiers', verwacht: /HQ-2026-0005/ },
  { naam: 'dossier', route: '/dossiers', hoogte: 1500, verwacht: Q('aanwezige_toevoegen'), na: dossier('HQ-2026-0003') },
  { naam: 'dossier-vaststellingen', route: '/dossiers', hoogte: 1000, verwacht: /Tank top plating indented/, na: dossier('HQ-2026-0003', 'vaststellingen') },
  { naam: 'dossier-checklist', route: '/dossiers', verwacht: /Packing torn, see findings/, na: dossier('HQ-2026-0003', 'checklist') },
  { naam: 'dossier-rapport', route: '/dossiers', hoogte: 1500, verwacht: Q('rubrieken_bewaren'), na: dossier('HQ-2026-0003', 'rapport') },
  { naam: 'dossier-vergelijking', route: '/dossiers', hoogte: 1300, verwacht: Q('vergelijking_knop_bestond'), na: dossier('ZB-2026-0002', 'vaststellingen') },
  { naam: 'dossier-brief', route: '/dossiers', verwacht: Q('document_invulvak_uitleg'),
    na: async p => { await openRij(p, 'HQ-2026-0003'); const u = new URL(p.url()); await p.goto(`${BASIS}${u.pathname}/document/brief_protest`); } },
  { naam: 'relaties-lijst', route: '/relaties', verwacht: /Estuaire Expertises SARL/ },
  { naam: 'relatie', route: '/relaties', verwacht: Q('adres_contact'), na: async p => openRij(p, 'Kaaimeeuw Rederij NV') },
  { naam: 'schepen-lijst', route: '/schepen', verwacht: /JOHANNA-W/ },
  { naam: 'schip', route: '/schepen', verwacht: Q('aantal_ruimen'), na: async p => openRij(p, 'KAAIMEEUW') },
  { naam: 'soorten-survey', route: '/beheer/survey-types', verwacht: Q('surveytype_nieuw') },
  { naam: 'vestigingen', route: '/beheer/vestigingen', verwacht: Q('vestiging_nieuw'), magKortZijn: 'twee vestigingen' },
  { naam: 'havens', route: '/beheer/havens', verwacht: Q('haven_nieuw') },
  { naam: 'standaardmappen', route: '/beheer/standaardmappen', verwacht: Q('standaardmappen_uitleg') },
  { naam: 'categorieen-en-plaatsen', route: '/beheer/keuzelijsten', verwacht: Q('keuzelijsten_uitleg') },
  { naam: 'sjablonen', route: '/beheer/rapportsjablonen', verwacht: Q('rapportsjablonen_uitleg') },
  { naam: 'standaardteksten', route: '/beheer/standaardteksten', verwacht: /Attendance on board/ },
];

const TALEN = [['nl-BE', ''], ['fr-BE', '-fr'], ['en-BE', '-en'], ['de-BE', '-de']];

function altUitPaginas() {
  const alt = {};
  for (const e of readdirSync(DOCS, { withFileTypes: true })) {
    if (!e.name.endsWith('.md')) continue;
    for (const m of readFileSync(join(DOCS, e.name), 'utf8').matchAll(/!\[([^\]]*)\]\(images\/([^)"\s]+)\.png/g)) alt[m[2]] ??= m[1];
  }
  return alt;
}

const schoten = SCHOTEN();   // bouwt de merktekens NU: een verdwenen QText-sleutel stopt het script vóór er iets geschreven wordt
const ALT = altUitPaginas();
const toestand = appToestand(PAKKET.repo);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: BREED, height: HOOG }, deviceScaleFactor: 2 });
await ctx.addCookies([{ name: 'adm-theme', value: 'light', url: BASIS }]);
const page = await ctx.newPage();

await page.goto(`${BASIS}/login`);
await page.locator('input[type="text"], input[name*="ser" i]').first().fill(PAKKET.gebruiker);
await page.locator('input[type="password"]').first().fill(WACHTWOORD);
await page.locator('button[type="submit"]').first().click();
await page.waitForLoadState('networkidle');

// ⛔ DE GRENDEL: nooit beelden uit een ander bureau. Twee helften. (1) In het register hoort het account bij een bureau met "(demo)" in zijn naam —
// de app toont die naam nergens op het scherm (gemeten 13/11/2026), dus daar zoeken bewees niets. (2) Op het scherm staat de vestiging Zeebrugge,
// die enkel proefklant-vullen.py maakt.
const bureau = execFileSync('docker', ['exec', '-i', 'quaymark-db', 'psql', '-U', 'postgres', '-d', 'quaymark_control', '-At', '-c',
  `select t.name from control."AspNetUsers" u join control.tenants t on t.id = u.tenant_id where u.user_name = '${PAKKET.gebruiker.replace(/'/g, "''")}'`],
  { encoding: 'utf8' }).trim();
if (!/\(demo\)/.test(bureau)) { console.error(`⛔ ${PAKKET.gebruiker} hoort bij "${bureau || 'geen enkel bureau'}", niet bij de proefklant. Gestopt; niets geschreven.`); process.exit(2); }
await page.goto(`${BASIS}/beheer/vestigingen`); await page.waitForLoadState('networkidle');
try {
  await page.getByText('Zeebrugge').first().waitFor({ timeout: 15000 });
} catch {
  if (process.env.BEELDEN_FOUTMAP) await page.screenshot({ path: join(process.env.BEELDEN_FOUTMAP, '_grendel.png') }).catch(() => {});
  console.error(`⛔ Geen "(demo)" of geen vestiging Zeebrugge op ${page.url()}: dit is niet de proefklant, of de aanmelding mislukte. Gestopt; niets geschreven.`);
  await browser.close(); process.exit(2);
}

const geschreven = [], mislukt = [], geweigerd = [], altMissers = [];
for (const [taal, achter] of TALEN) {
  await page.goto(`${BASIS}/culture/set?c=${taal}`); await page.waitForLoadState('networkidle');
  for (const s of schoten) {
    if (filter && !filter.some(f => s.naam.includes(f))) continue;
    const bestand = `${s.naam}${achter}`;
    try {
      await page.setViewportSize({ width: BREED, height: s.hoogte ?? HOOG });
      await page.goto(`${BASIS}${s.route}`); await page.waitForLoadState('networkidle');
      await page.waitForTimeout(800);
      if (s.na) await s.na(page, taal);
      try { await page.getByText(s.verwacht).filter({ visible: true }).first().waitFor({ state: 'visible', timeout: 15000 }); }
      catch { mislukt.push(`${bestand} — het merkteken ${s.verwacht} verscheen niet: dit is niet het beloofde scherm`); throw new Error('merkteken'); }
      await page.waitForTimeout(900);
      await page.addStyleTag({ content: VERBERG }).catch(() => {});
      await page.mouse.move(0, (s.hoogte ?? HOOG) - 1);

      const tekst = await page.locator('body').innerText();
      // De standaard van de kern kent enkel nl en fr, en "Une erreur" staat hier in een gewone uitleg (« Une erreur se rectifie… », tabblad
      // Constatations): dat gaf op 13/11 twee valse weigeringen. Daarom de vier talen, preciezer, én de foutbalk van Blazor zelf (haar tekst is
      // verborgen tot ze verschijnt, dus geen tekstzoektocht ziet ze).
      if (await page.locator('#blazor-error-ui').isVisible().catch(() => false)) { mislukt.push(`${bestand} — de foutbalk van Blazor staat open`); continue; }
      const besluit = schermBesluit({ tekst, isElementSchot: false, magKortZijn: Boolean(s.magKortZijn),
        fout: /Er ging iets mis|Er is een fout|Une erreur (?!se rectifie)|Something went wrong|An error has occurred|Ein Fehler ist aufgetreten/i });
      if (!besluit.ok) { mislukt.push(`${bestand} — ${besluit.reden}`); continue; }
      // De taal van het scherm is de taal van het beeld: <html lang> volgt de cultuur.
      const lang = await page.evaluate(() => document.documentElement.lang);
      if (!lang.startsWith(taal.slice(0, 2))) { mislukt.push(`${bestand} — het scherm staat in "${lang}", niet in ${taal}`); continue; }

      const alt = ALT[bestand];
      if (alt) {
        if (altTermen(alt, NIET_SCHERMTEKST_BASIS).length === 0) altMissers.push(`${bestand}: de alt-tekst draagt geen enkele schermterm met een hoofdletter`);
        const mist = ontbrekendeTermen(alt, tekst, NIET_SCHERMTEKST_BASIS);
        if (mist.length) altMissers.push(`${bestand}: staat niet op het scherm: ${mist.join(', ')}`);
      } else altMissers.push(`${bestand}: geen verwijzing in een pagina`);

      const buf = await page.screenshot({ type: 'png' });
      const pad = join(BEELDEN, `${bestand}.png`);
      const vorm = vormBesluit({ bestaandeMaat: existsSync(pad) ? pngMaat(readFileSync(pad)) : null, nieuweMaat: pngMaat(buf), isElementSchot: false });
      if (vorm.besluit === 'weigeren') { geweigerd.push(`${bestand} — ${vorm.reden}`); continue; }
      writeFileSync(pad, buf);
      geschreven.push(`${bestand} ${maatAlsTekst(pngMaat(buf))}`);
    } catch (e) {
      if (String(e).includes('merkteken')) { /* al gemeld */ } else mislukt.push(`${bestand} — ${String(e).split('\n')[0].slice(0, 200)}`);
      if (process.env.BEELDEN_FOUTMAP) await page.screenshot({ path: join(process.env.BEELDEN_FOUTMAP, `${bestand}.png`) }).catch(() => {});
    }
  }
}
await page.goto(`${BASIS}/culture/set?c=nl-BE`).catch(() => {});
await browser.close();

console.log(`App: ${toestand.sha?.slice(0, 8)}${toestand.vuil ? ' (werkmap VUIL)' : ''}. Geschreven: ${geschreven.length}.`);
for (const g of geschreven) console.log('  ✔', g);
for (const [kop, lijst] of [['❌ MISLUKT', mislukt], ['⛔ GEWEIGERD (vorm)', geweigerd], ['⚠️ ALT-TEKST', altMissers]])
  if (lijst.length) { console.log(`\n${kop}`); for (const l of lijst) console.log('  ', l); }
if (mislukt.length || geweigerd.length) process.exit(1);

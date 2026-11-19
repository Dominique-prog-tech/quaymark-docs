// De koppellaag tussen de gedeelde filmmotor (adm-appkit/tools/filmgenerator) en Quaymark — sinds 19/11/2026.
//
// app.mjs zegt WAT Quaymark is (poort, proefsurveyor, repo); dit bestand zegt hoe de motor binnenkomt en waar de geheimen staan.
// Zelfde rol als nimble-docs/tools/aansturing.mjs en cleanops-docs/tools/aansturing.mjs, met twee verschillen hieronder.
import { execFileSync } from 'node:child_process';
import { PAKKET, BASIS } from './app.mjs';
import { geheim, appToestand as _appToestand } from '/Users/dominique/projects/adm-appkit/tools/schermmachinerie/aansturing.mjs';

export { BASIS };

// De user-secrets van de Host (UserSecretsId in Quaymark.Host.Web.csproj). Nooit een waarde printen.
const SECRETS = `${process.env.HOME}/.microsoft/usersecrets/bfb83447-b7f2-4137-96f0-1043177d4f2a/secrets.json`;

// ⚠️ VERSCHIL 1: DE PROEFSURVEYOR, NIET DE ONTWIKKELBEHEERDER. Nimble en CleanOps filmen met de operator en kiezen dan een tenant.
// Quaymark filmt zoals beelden.mjs: als surveyor.demo van het bureau "Noordkaai Surveys (demo)", zodat het menu toont wat een
// bureau ziet en geen operator van ADM. Zijn wachtwoord staat in de user-secrets (Proef:Surveyor:Wachtwoord).
export const gebruiker = PAKKET.gebruiker;
export const wachtwoord = geheim(SECRETS, 'Proef:Surveyor:Wachtwoord') ?? '';

// ElevenLabs en Bunny: ElevenLabs:ApiKey, :Model, :StemNl, :StemFr — de huisstem van de vloot (beslist 06/09/2026), dezelfde
// waarden als Nimble (overgenomen op 19/11/2026). :StemEn en :StemDe kiest Dominique (node tools/stemmen.mjs). Bunny:LibraryId
// en Bunny:ApiKey: een EIGEN library voor Quaymark, die Dominique aanmaakt.
export const stemGeheim = naam => geheim(SECRETS, `ElevenLabs:${naam}`);
export const bunnyGeheim = naam => geheim(SECRETS, `Bunny:${naam}`);

export const appToestand = () => _appToestand(PAKKET.repo);

// ⛔ DE GRENDEL: nooit filmen in een ander bureau dan de proefklant. Dezelfde twee helften als in beelden.mjs: (1) in het register
// hoort het account bij een bureau met "(demo)" in zijn naam (de app toont die naam nergens op het scherm); (2) op het scherm staat
// de vestiging Zeebrugge, die enkel proefklant-vullen.py maakt. Een film van een echt bureau is erger dan geen film.
async function grendel(page) {
  const bureau = execFileSync('docker', ['exec', '-i', 'quaymark-db', 'psql', '-U', 'postgres', '-d', 'quaymark_control', '-At', '-c',
    `select t.name from control."AspNetUsers" u join control.tenants t on t.id = u.tenant_id where u.user_name = '${gebruiker.replace(/'/g, "''")}'`],
    { encoding: 'utf8' }).trim();
  if (!/\(demo\)/.test(bureau)) throw new Error(`⛔ ${gebruiker} hoort bij "${bureau || 'geen enkel bureau'}", niet bij de proefklant. Niets gefilmd.`);
  await page.goto(`${BASIS}/beheer/vestigingen`); await page.waitForLoadState('networkidle');
  try { await page.getByText('Zeebrugge').first().waitFor({ timeout: 15000 }); }
  catch { throw new Error(`⛔ Geen vestiging Zeebrugge op ${page.url()}: dit is niet de proefklant, of de aanmelding mislukte. Niets gefilmd.`); }
}

// Wat de motor aanroept: meldAan(page, gebruiker, wachtwoord, kiesTenant).
// ⚠️ VERSCHIL 2: GEEN TENANT KIEZEN. De proefsurveyor hoort bij één bureau (Registry); `kiesTenant` wordt genegeerd en de grendel
// staat in de plaats. ⚠️ QUAYMARK ONTHOUDT DE TAAL PER GEBRUIKER (control."AspNetUsers".pref_lang, zoals Nimble en CleanOps): na
// het aanmelden altijd terug op Nederlands; de motor zet daarna zelf de taal van de film.
export async function meldAan(page, user, ww) {
  if (!ww) throw new Error('Geen wachtwoord voor de proefsurveyor: zet Proef:Surveyor:Wachtwoord in de user-secrets van de app.');
  await page.goto(`${BASIS}/login`);
  await page.locator('input[type="text"], input[name*="ser" i]').first().fill(user);
  await page.locator('input[type="password"]').first().fill(ww);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForLoadState('networkidle');
  await grendel(page);
  await page.goto(`${BASIS}/culture/set?c=nl-BE`);
  await page.waitForLoadState('networkidle');
}

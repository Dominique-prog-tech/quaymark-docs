// Wat het pakket IS, voor de gedeelde beeldgenerator (adm-appkit/tools): poort, proefklant, paden. Zelfde vorm als credimatch-docs/tools/app.mjs.
//
// ⚠️ De beelden komen ALTIJD uit de verzonnen proefklant qm-demo ("Noordkaai Surveys (demo)"), lokaal, nooit uit productie. Vullen: proefklant-vullen.py.
// ⚠️ De proefsurveyor surveyor.demo meldt zich aan (rol Tenant-beheerder, dus ook de Instellingen): zo toont het menu wat een bureau ziet, geen
//    operator van ADM. Zijn wachtwoord staat in de user-secrets van de app (Proef:Surveyor:Wachtwoord), in geen enkel bestand van deze repo.
export const PAKKET = {
  naam: 'Quaymark',
  basis: 'http://127.0.0.1:6445',   // de preview quaymark-web
  repo: process.env.QUAYMARK_REPO ?? '/Users/dominique/projects/adm-quaymark',
  gebruiker: process.env.BEELDEN_GEBRUIKER ?? 'surveyor.demo',
  // Quaymark draagt geen Playwright: het pakket van een andere app volstaat, dit is enkel een browser (zoals bij CrediMatch).
  playwright: process.env.PLAYWRIGHT_PAD ?? '/Users/dominique/projects/adm-cleanops/src/Host/CleanOps.Host.Web/bin/Debug/net10.0/.playwright/package/index.mjs',
};
export const BASIS = PAKKET.basis;

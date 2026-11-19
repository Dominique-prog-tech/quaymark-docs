// De films van Quaymark — de motor staat in adm-appkit/tools/filmgenerator (zie daar LEESMIJ.md). Vier talen: nl, fr, en, de.
//
//   node tools/films.mjs --stem=say                 alle films, in de vier talen, met de macOS-stem (plaatshouder)
//   node tools/films.mjs <naam> --stem=say          één film
//   node tools/films.mjs --meet                     repetitie: elke scène op haar merkteken, niets opgenomen
//   node tools/films.mjs --droog                    enkel de stem maken en de duur tonen
//   node tools/films.mjs --taal=de                  één taal (bv. na het kiezen van de Duitse stem)
//   node tools/films.mjs --uitvoering=website       de stille websitefilms
//   node tools/films.mjs --inhoud                   het draaiboek als structuur
//
// ⚠️ Vereist: de preview quaymark-web op 6445 en de proefklant qm-demo, VANDAAG gevuld (python3 tools/proefklant-vullen.py: de
// planning staat t.o.v. vandaag). De motor meldt zich aan als surveyor.demo en weigert elk ander bureau (aansturing.mjs).
// Zet QUAYMARK_REPO op de worktree waar de preview draait, anders noemt het verslag de commit van de hoofdkloon.
process.argv.push('--instellingen=' + new URL('./films-instellingen.mjs', import.meta.url).pathname);
await import('/Users/dominique/projects/adm-appkit/tools/filmgenerator/films.mjs');

// ⚠️ Na de ronde de taal van de proefsurveyor terug op Nederlands: Quaymark onthoudt ze per gebruiker, en de laatste film (de
// Duitse) liet ze anders op de-BE staan, ook voor beelden.mjs en voor wie zich daarna aanmeldt. meldAan doet dat.
if (!process.argv.some(a => a === '--droog' || a === '--inhoud')) {
  const { chromium } = await import('./films-instellingen.mjs');
  const { gebruiker, wachtwoord, meldAan } = await import('./aansturing.mjs');
  const b = await chromium.launch();
  try { await meldAan(await (await b.newContext()).newPage(), gebruiker, wachtwoord); console.log('↩︎  taal van de proefsurveyor terug op nl-BE'); }
  catch (e) { console.log('⚠️  taal NIET teruggezet:', String(e).split('\n')[0]); }
  finally { await b.close(); }
}

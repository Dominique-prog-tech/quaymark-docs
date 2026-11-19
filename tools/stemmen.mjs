// Starter — stemmen.mjs staat in adm-appkit/tools/filmgenerator (zie daar LEESMIJ.md). Toont de stemmen van het ElevenLabs-account,
// om er één voor Engels (ElevenLabs:StemEn) en één voor Duits (ElevenLabs:StemDe) te kiezen.
process.argv.push('--instellingen=' + new URL('./films-instellingen.mjs', import.meta.url).pathname);
await import('/Users/dominique/projects/adm-appkit/tools/filmgenerator/stemmen.mjs');

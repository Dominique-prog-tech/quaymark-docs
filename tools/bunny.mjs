// Starter — bunny.mjs staat in adm-appkit/tools/filmgenerator (zie daar LEESMIJ.md).
process.argv.push('--instellingen=' + new URL('./films-instellingen.mjs', import.meta.url).pathname);
await import('/Users/dominique/projects/adm-appkit/tools/filmgenerator/bunny.mjs');

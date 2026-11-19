// Het draaiboek van de films van Quaymark: wat elke film toont en zegt. De motor staat in adm-appkit/tools/filmgenerator.
//
// Nog leeg (19/11/2026): de motor is aangesloten, de eerste film komt na het akkoord van Dominique over de keten.
// De vorm: zie nimble-docs/tools/draaiboek.mjs en cleanops-docs/tools/draaiboek.mjs, en de regels in
// adm-appkit/docs/handleiding-schrijfregels.md §4b (één film per KETEN, 60–180 s; een websitefilm POSITIONEERT, 30–45 s, stil).
//
// Per film: [naam, { pagina, titel: {nl, fr, en, de}, omschrijving: {…}, uitvoeringen: { handleiding: { stem: true },
// website: { stem: false, scenes: [...] } }, scenes: [{ naam, kop: {…}, doe: async (p) => {…}, merk: /…/, nl, fr, en, de }] }]
// ⚠️ Elk MERKteken bewijst DATA, niet een scherm, en in de vier talen (de motor filmt elke taal op haar eigen scherm).
// ⚠️ De eerste scène van een film (en van elke website-selectie) navigeert zelf: `await p.goto(`${BASIS}/…`)`.
import { BASIS } from './app.mjs';

export const FILMS = [];

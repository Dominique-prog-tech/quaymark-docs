// De instellingen van Quaymark voor de gedeelde filmmotor (adm-appkit/tools/filmgenerator, LEESMIJ.md) — sinds 19/11/2026.
// Playwright uit app.mjs: Quaymark draagt er zelf geen, de browser van een andere app volstaat (zoals beelden.mjs).
import { PAKKET } from './app.mjs';
export const { chromium } = await import(PAKKET.playwright);
export { BASIS, gebruiker, wachtwoord, meldAan, stemGeheim, bunnyGeheim, appToestand } from './aansturing.mjs';
export { FILMS } from './draaiboek.mjs';
export const MAP = new URL('./', import.meta.url).pathname;

// ⚠️ VIER TALEN (ADR-57, punt 4). Elke film, handleiding én website, in nl, fr, en en de, telkens op het scherm in DIE taal: Quaymark
// heeft een echt Engels en Duits scherm (CreditSoft, Nimble en CleanOps tonen hun Engelse websitefilm op het Nederlandse scherm).
// Twee talen zijn twee films (handleiding-schrijfregels §4b): elke taal apart ingesproken. Een uitvoering met een eigen `talen`
// in het draaiboek houdt die.
export const TALEN = [
  { ui: 'nl-BE', tekst: 'nl' },
  { ui: 'fr-BE', tekst: 'fr' },
  { ui: 'en-BE', tekst: 'en' },
  { ui: 'de-BE', tekst: 'de' },
];

// Voor bunny.mjs: de metadata bij elke video. Eén Bunny-library per pakket (Bunny:LibraryId in user-secrets).
export const PRODUCT = 'Quaymark';
export const BRON = 'quaymark-docs/tools/films.mjs';
// Voor `bunny.mjs naar-website`: de websitefilms als JSON IN deze repo, zoals Nimble en CleanOps. Content-hub (de sessie van de
// websites) neemt het van origin/main over in quaymark-website, zonder Bunny-sleutels.
export const WEBSITE_FILMS = new URL('./website-films.json', import.meta.url).pathname;

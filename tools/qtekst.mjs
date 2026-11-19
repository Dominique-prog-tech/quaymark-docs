// De woorden van het scherm in de vier talen, uit de app zelf (Teksten/QText.cs) — voor de films (draaiboek.mjs). Enkel lezen.
//
// ⚠️ Zelfde functie als Q in beelden.mjs (die heeft nog haar eigen kopie; overzetten = de beeldenronde opnieuw draaien, dus bewust
// niet meegenomen op 19/11/2026). Een film zoekt een knop in de taal van de opname: Q('uitgeven') = /Rapport uitgeven|Émettre le
// rapport|Issue report|Bericht herausgeben/.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PAKKET } from './app.mjs';

const QTEXT = readFileSync(join(PAKKET.repo, 'src/Host/Quaymark.Host.Web/Teksten/QText.cs'), 'utf8');
// C# schrijft sommige tekens als \uXXXX (het Duitse „…“): eerst terugzetten, anders zoekt het merkteken naar de letterlijke escape.
const ontsnap = s => s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\"/g, '"')
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function talen(sleutel) {
  const m = QTEXT.match(new RegExp(`\\["${sleutel}"\\]\\s*=\\s*V\\(\\s*"((?:[^"\\\\]|\\\\.)*)"\\s*,\\s*"((?:[^"\\\\]|\\\\.)*)"\\s*,\\s*"((?:[^"\\\\]|\\\\.)*)"\\s*,\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  if (!m) throw new Error(`QText kent de sleutel "${sleutel}" niet (meer): pas het draaiboek aan.`);
  return m.slice(1).map(ontsnap);
}

// Ergens in de tekst (een merkteken).
export const Q = sleutel => new RegExp(talen(sleutel).join('|'));
// Precies deze tekst (een knop of een tabblad: "Rapport" mag niet ook "Rapport uitgeven" vinden).
export const QX = sleutel => new RegExp(`^\\s*(${talen(sleutel).join('|')})\\s*$`);

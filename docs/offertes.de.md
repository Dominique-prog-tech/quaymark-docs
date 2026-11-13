---
description: "Angebote an Auftraggeber: erstellen, senden, im Portal oder vom Büro annehmen, und die Akte, die daraus folgt."
---

# Angebote

Ein Angebot an einen Auftraggeber, in dessen Sprache. Angenommen wird es zur Akte, und seine Zeilen werden die Pauschale dieser Akte.

## Bildschirm öffnen

Klicken Sie im Menü links auf **Angebote**. Sie sehen die Angebote mit Nummer, Auftraggeber, Gültigkeit, Summe und Status: Entwurf, gesendet, angenommen, abgelehnt oder abgelaufen. Ansehen erfordert das Recht, Rechnungen anzusehen; erstellen, senden und entscheiden das Recht, Rechnungen zu bearbeiten.

## Angebot

- **Neues Angebot** legt einen Entwurf an. Geben Sie Auftraggeber, Niederlassung, Besichtigungsart, Datum und **Gültig bis** (standardmäßig dreißig Tage) ein, und gegebenenfalls Schiff, Hafen, Referenz und eine Beschreibung. Die Sprache folgt dem Auftraggeber.
- **Zeile aus den Tarifen** bereitet eine Zeile mit der Pauschale der Besichtigungsart vor, oder eine Stunde zum Stundensatz: Geben Sie dann die geschätzten Stunden ein. Eine [Rahmenvereinbarung](relaties.md#rahmenvereinbarungen) des Auftraggebers wird berücksichtigt. Zeilen können frei hinzugefügt, geändert und gelöscht werden, solange das Angebot ein Entwurf ist.
- **Vorschau (PDF)** zeigt das Angebot so, wie es versendet wird. Das Layout stammt aus der Vorlage „Angebot“. → [Vorlagen](sjablonen.md)

## Senden

**Senden** vergibt die Nummer (zum Beispiel O-HQ-2026-0001), erstellt das PDF mit Fingerabdruck und kündigt das Angebot den Portalbenutzern des Auftraggebers an. Geben Sie eine Adresse ein, um das PDF auch zu mailen; leer heißt nur das Portal. Danach sind die Zeilen fest.

## Annehmen oder ablehnen

- Der Auftraggeber kann das Angebot im **Kundenportal** annehmen oder ablehnen, solange es gültig ist. → [Kundenportal](relaties.md#kundenportal)
- Haben Sie die Antwort per E-Mail oder Telefon erhalten, klicken Sie selbst auf **Annehmen** oder **Ablehnen**.
- Annehmen legt eine **Akte** mit dem Status Neu an, mit Auftraggeber, Besichtigungsart, Schiff, Hafen und Referenz. Gibt es das Schiff bereits unter demselben Namen, übernimmt Quaymark es; sonst wird ein neues angelegt. Besichtiger und Planung wählen Sie danach in der Akte.
- Die Zeilen des Angebots sind die **Pauschale** der Akte: Der Rechnungsvorschlag übernimmt sie und weist darauf hin.
- Über ein Angebot wird nur einmal entschieden. Nach **Gültig bis** ist es abgelaufen und kann nicht mehr angenommen werden.

## Siehe auch

- [Rechnungen](facturen.md)
- [Beziehungen](relaties.md#rahmenvereinbarungen)

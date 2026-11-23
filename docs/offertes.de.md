---
description: "Angebote an Auftraggeber: erstellen, senden, im Portal oder vom Büro annehmen, und die Akte, die daraus folgt."
---

# Angebote

Ein Angebot an einen Auftraggeber, in dessen Sprache. Angenommen wird es zur Akte, und seine Zeilen werden die Pauschale dieser Akte.

## Bildschirm öffnen

Klicken Sie im Menü links auf **Angebote**. Sie sehen die Angebote mit Nummer, Auftraggeber, Besichtigungsart, Schiff, Gültigkeit, Summe und Status, und bei einem angenommenen Angebot die Akte, die daraus entstand. Der Status ist Entwurf, gesendet, angenommen, abgelehnt oder abgelaufen. Der Status erscheint als farbiges Etikett, wie im Angebot selbst und im Auftraggeberportal: grün angenommen, rot abgelehnt, blau gesendet, grau Entwurf oder abgelaufen. Ansehen erfordert das Recht, Rechnungen anzusehen; erstellen, senden und entscheiden das Recht, Rechnungen zu bearbeiten.

## Angebot

- **Neues Angebot** legt einen Entwurf an. Geben Sie Auftraggeber, Niederlassung, Besichtigungsart, Datum und **Gültig bis** (standardmäßig dreißig Tage) ein, und gegebenenfalls Schiff, Hafen, Referenz und eine Beschreibung. Die Sprache folgt dem Auftraggeber. Die Währung wählen Sie aus EUR, USD oder GBP, wie in der Akte.
- **Schiff**: Wählen Sie ein Schiff, das Quaymark bereits kennt, oder **Neues Schiff…**. Bei einem neuen Schiff geben Sie den **Name des Schiffes**, die **Art** (Seeschifffahrt oder Binnenschifffahrt) und die **IMO-Nummer** oder **ENI-Nummer** ein. Das Feld sagt sofort, ob die Nummer stimmt und ob sie bereits zu einem Schiff gehört: Dann übernimmt Quaymark dieses Schiff. Ist das Schiff noch nicht bekannt, lassen Sie es leer.
- **Zeile aus den Tarifen** bereitet eine Zeile mit der Pauschale der Besichtigungsart vor, oder eine Stunde zum Stundensatz: Geben Sie dann die geschätzten Stunden ein. Eine [Rahmenvereinbarung](relaties.md#rahmenvereinbarungen) des Auftraggebers wird berücksichtigt. Zeilen können frei hinzugefügt, geändert und gelöscht werden, solange das Angebot ein Entwurf ist.
- **Vorschau (PDF)** zeigt das Angebot so, wie es versendet wird. Das Layout stammt aus der Vorlage „Angebot“. → [Vorlagen](sjablonen.md)

## Senden

**Senden** vergibt die Nummer (zum Beispiel O-HQ-2026-0001), erstellt das PDF mit Fingerabdruck und kündigt das Angebot den Portalbenutzern des Auftraggebers an. Geben Sie eine Adresse ein, um das PDF auch zu mailen; leer heißt nur das Portal. Danach sind die Zeilen fest, und das Angebot zeigt, wann es gesendet wurde.

Ein neues Schiff ohne IMO- oder ENI-Nummer hält das Angebot auf: Der Auftraggeber kann es im Portal annehmen, und dann fügt niemand mehr eine Nummer hinzu. Geben Sie die Nummer ein, wählen Sie ein bekanntes Schiff oder lassen Sie das Schiff leer.

## Annehmen oder ablehnen

- Der Auftraggeber kann das Angebot im **Auftraggeberportal** annehmen oder ablehnen, solange es gültig ist. → [Auftraggeberportal](relaties.md#auftraggeberportal)
- Haben Sie die Antwort per E-Mail oder Telefon erhalten, klicken Sie selbst auf **Annehmen** oder **Ablehnen**. Bei Ablehnen können Sie einen Grund angeben; er steht danach auf dem Angebot.
- Annehmen legt eine **Akte** mit dem Status Neu an, mit Auftraggeber, Besichtigungsart, Schiff, Hafen und Referenz. Ein bekanntes Schiff übernimmt Quaymark (über die Nummer oder über einen Namen, den nur ein Schiff trägt); ein neues Schiff erhält einen Datensatz mit der Nummer aus dem Angebot. Ein älteres Angebot mit nur einem Namen, den Quaymark nicht kennt, wird zu einer Akte ohne Schiff; der Name steht dann in einer Notiz im **Journal** der Akte, und Sie wählen oder legen das Schiff in der Akte an. Den Sachverständigen und die Planung wählen Sie danach in der Akte.
- Die Zeilen des Angebots sind die **Pauschale** der Akte: Der Rechnungsvorschlag übernimmt sie und weist darauf hin.
- Über ein Angebot wird nur einmal entschieden. Nach **Gültig bis** ist es abgelaufen und kann nicht mehr angenommen werden.

## Siehe auch

- [Rechnungen](facturen.md)
- [Beziehungen](relaties.md#rahmenvereinbarungen)

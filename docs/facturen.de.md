---
description: "Rechnungen und Gutschriften: eine Rechnung aus einer Akte vorschlagen, den Entwurf anpassen, mit Nummer und Zahlungs-QR-Code ausstellen und mit einer Gutschrift korrigieren."
---

# Rechnungen

Alle Rechnungen und Gutschriften des Büros. Eine Rechnung erstellen Sie meist aus der Akte, aus der Zeit und den Kosten, die darauf erfasst sind.

## Den Bildschirm öffnen

Klicken Sie im Menü links auf **Rechnungen**. Die Liste zeigt die neuesten oben, mit dem Status: **Entwurf**, **Ausgestellt** oder **Gutgeschrieben**. Jeder Benutzer des Büros sieht die Rechnungen; Erstellen und Ausstellen erfordert ein eigenes Recht.

## Eine Rechnung aus einer Akte vorschlagen

1. Öffnen Sie die Akte und wählen Sie die Registerkarte **Zeit und Kosten**.
2. Klicken Sie auf **Rechnung vorschlagen**.

Quaymark erstellt einen Entwurf für den Auftraggeber der Akte:

- hat die Besichtigungsart eine **Pauschale**, eine Zeile mit diesem Betrag;
- sonst pro Sachverständigen eine Zeile mit seinen Stunden mal seinem Stundensatz, und eine eigene Zeile für den Zuschlag (Wochenende, Feiertag oder Nacht), wo er gilt;
- danach die Kosten, die auf **Weiterberechnen** stehen.

Was bereits auf einer anderen Rechnung steht, zählt nicht mit. Die Tarife kommen aus [Tarife](tarieven.md). Fehlt ein Stundensatz, steht die Zeile auf 0,00 und Quaymark weist darauf hin.

## Den Entwurf anpassen

Ein Entwurf hat noch keine Nummer und lässt sich frei ändern: Kunde, Niederlassung, Datum, Sprache, Referenz und Zeilen. **Zeile hinzufügen** fügt eine Zeile hinzu.

Die **MwSt.** wird nach dem Kunden vorgeschlagen:

- dasselbe Land wie das Büro: der Normalsatz;
- ein anderes EU-Land, mit USt-IdNr.: **Umkehr der Steuerschuld** (der Kunde zahlt die MwSt.);
- ein anderes EU-Land, ohne USt-IdNr.: der Normalsatz;
- ein Land außerhalb der EU: **nicht steuerbar**.

Passen Sie sie bei Bedarf pro Zeile an. Der gesetzliche Hinweis zur Umkehr der Steuerschuld oder zur Nichtsteuerbarkeit steht auf der Rechnung.

**Vorschau (PDF)** zeigt die Rechnung so, wie sie verschickt wird, mit VORSCHAU darauf. Es wird nichts gespeichert.

## Ausstellen

Klicken Sie auf **Ausstellen** und bestätigen Sie. Die Rechnung erhält dann:

- ihre **Nummer**, pro Niederlassung und Jahr (F-HQ-2026-0001);
- ihr **Fälligkeitsdatum** nach dem Zahlungsziel des Büros;
- einen **strukturierten Verwendungszweck** und einen **Zahlungs-QR-Code**, den eine Banking-App scannen kann.

Die PDF wird mit ihrem Fingerabdruck (SHA-256) festgelegt. Danach kann die Rechnung nicht mehr geändert oder gelöscht werden. Eine Rechnung darf nicht in der Zukunft liegen und nicht vor der zuletzt ausgestellten Rechnung derselben Niederlassung.

## Über Peppol senden

Eine ausgestellte Rechnung oder Gutschrift können Sie mit **Über Peppol senden** elektronisch an die Buchhaltung des Kunden schicken. Quaymark prüft zuerst, ob der Kunde im Peppol-Netzwerk ist. Dafür ist seine USt-IdNr. nötig: Tragen Sie sie in seiner [Beziehungskarte](relaties.md) ein.

Jeder Versuch steht im Block **Peppol** der Rechnung:

- **Angenommen**: Die Rechnung ist verschickt. **Status abfragen** zeigt, ob sie zugestellt wurde.
- **Abgelehnt**: Der Grund steht dabei. Beheben Sie ihn und senden Sie erneut.
- **Unbekannt**: Es kam keine klare Antwort. Die Rechnung ist vielleicht verschickt. Fragen Sie den Status ab oder senden Sie einfach erneut: Dieselbe Rechnung geht nie zweimal raus.

Ist der Kunde nicht bei Peppol, stellen Sie die PDF auf anderem Weg zu.

## Mit einer Gutschrift korrigieren

Einen Fehler auf einer ausgestellten Rechnung korrigieren Sie mit **Gutschrift erstellen**. Es entsteht ein Gutschriftentwurf über den vollen Betrag. Erst nach dessen Ausstellung ist die Rechnung gutgeschrieben, und ihre Leistungen und Kosten werden für eine neue Rechnung wieder frei.

## Eine separate Rechnung

**Neue Rechnung** in der Liste erstellt eine Rechnung ohne Zeit oder Kosten, zum Beispiel für eine Anzahlung.

## Siehe auch

- [Firmendaten](bureaugegevens.md)
- [Tarife](tarieven.md)
- [Vorlagen](sjablonen.md)

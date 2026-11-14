---
description: "Die Eingänge aus dem Bankfeed den Rechnungen zugeordnet, automatisch wo Mitteilung und Betrag stimmen, und Erinnerungen in drei Stufen."
---

# Zahlungen

Diese Seite zeigt, welche Rechnungen bezahlt sind und was noch offen ist. Die Buchungen auf dem Bankkonto des Büros kommen aus dem Bankfeed von ADM One.

## Seite öffnen

Klicken Sie im Menü auf **Zahlungen**. Ansehen erfordert das Recht, Rechnungen anzusehen; zuordnen, erfassen und erinnern das Recht, Rechnungen zu bearbeiten.

## Die Bank verbinden

Der Administrator verbindet das Bankkonto des Büros im ADM One-Portal (Bank). Quaymark muss dafür nichts tun. Oben auf der Seite steht das verbundene Konto. Verlangt die Bank eine neue Verbindung (nach etwa 180 Tagen), steht das ebenfalls dort; bis dahin kommt nichts Neues herein.

Quaymark ruft die Buchungen beim Öffnen der Seite ab, höchstens alle fünf Minuten. **Jetzt abrufen** tut es sofort.

## Automatisch zuordnen

Steht die strukturierte Mitteilung einer Rechnung in der Buchung und ist der Betrag genau der offene Betrag dieser Rechnung, ist die Rechnung sofort bezahlt. Auf der Rechnung steht dann **Vollständig bezahlt**, mit der Zahlung darunter.

## Zu bearbeiten

Die Eingänge, die Quaymark nicht selbst zugeordnet hat, mit einem **Vorschlag**, wo das geht:

- die Mitteilung stimmt, der Betrag aber nicht (eine Teilzahlung oder zu viel bezahlt);
- die Rechnungsnummer steht im Text der Überweisung;
- der Betrag ist genau der Saldo einer einzigen Rechnung eines Kunden mit diesem Namen.

**Zuordnen** verbucht die Buchung auf die gewählte Rechnung. Sie können auch einen Teil des Betrags zuordnen und den Rest einer anderen Rechnung. **Beiseitelegen** entfernt eine Buchung, die keine Kundenzahlung ist, zum Beispiel eine Rückzahlung oder eine Überweisung zwischen eigenen Konten.

## Offen

Die ausgestellten Rechnungen mit einem Saldo, die älteste Fälligkeit zuerst, mit den Tagen Verzug. Eine Gutschrift auf eine Rechnung zählt im Saldo mit.

**Zahlung erfassen** ist für eine Zahlung, die nicht im Bankfeed steht: bar, auf ein anderes Konto oder verrechnet. Geben Sie unter **Bemerkung** an, wie bezahlt wurde.

## Erinnerungen

Nach der Anzahl Tage aus [Firmendaten](bureaugegevens.md) (standardmäßig 7, 21 und 35 nach Fälligkeit) erscheint bei der Rechnung **Erinnerung senden**, danach **Zweite Erinnerung senden** und **Mahnung senden**. Zwischen zwei Stufen liegt mindestens der Unterschied zwischen ihren Fristen (standardmäßig 14 Tage), auch wenn Sie spät mit dem Erinnern beginnen. Eine Erinnerung geht nie von selbst hinaus: nur mit einem Klick, nach einer Bestätigung.

Die E-Mail geht über ADM One an die Adresse auf der Rechnung (sonst an die der Beziehung), in der Sprache der Rechnung, mit der Rechnung als PDF, dem offenen Betrag, dem Konto und der strukturierten Mitteilung. Sie erscheint auch im Journal der Beziehung. Jede Stufe ist einmal pro Rechnung möglich.

## Bearbeitet

Die zugeordneten Zahlungen, mit wer sie zugeordnet hat. **Rückgängig machen** macht eine falsche Zuordnung rückgängig: Die Zahlung zählt nicht mehr und die Buchung erscheint wieder unter Zu bearbeiten. Die Zahlung bleibt gespeichert, mit wer sie rückgängig gemacht hat.

## Siehe auch

- [Rechnungen](facturen.md)
- [Firmendaten](bureaugegevens.md)
- [Beziehungen](relaties.md)

---
description: "Der Auftraggeber bestätigt den Auftrag und die Allgemeinen Geschäftsbedingungen des Büros, über einen Link oder im Kundenportal; mit dem Nachweis, wer, wann und welche Version."
---

# Auftragsbestätigung

Mit einer Auftragsbestätigung halten Sie fest, dass der Auftraggeber den Auftrag, den Tarif und die Allgemeinen Geschäftsbedingungen des Büros akzeptiert. Der Auftraggeber bestätigt über einen Link in einer E-Mail oder im Kundenportal.

## Die Geschäftsbedingungen einrichten

Klicken Sie im Menü auf **Einstellungen**, **Geschäftsbedingungen**. Diese Seite verlangt das Recht, die Allgemeinen Geschäftsbedingungen zu verwalten (standardmäßig nur der Administrator).

1. Klicken Sie auf **Neue Version**. Der Text der gültigen Version steht bereits da, in vier Sprachen.
2. Passen Sie den Text an. Der niederländische Text ist Pflicht; eine leer gelassene Sprache zeigt den niederländischen Text.
3. Klicken Sie auf **Version speichern**.

Die neue Version gilt für jede danach versendete Bestätigung. Eine Version wird nie geändert oder gelöscht: Der Auftraggeber akzeptiert immer eine bestimmte Version. Klicken Sie auf eine Version, um ihren Text und ihren Fingerabdruck (SHA-256) zu sehen.

Ohne Geschäftsbedingungen kann keine Auftragsbestätigung versendet werden.

## Eine Bestätigung senden

Oben auf der Akte steht der Rahmen **Auftragsbestätigung** mit dem Stand der Akte.

1. Speichern Sie die Akte mit einem Auftraggeber.
2. Klicken Sie auf **Bestätigung senden**.
3. Wählen Sie den **Ansprechpartner** des Auftraggebers, oder wählen Sie **Andere Adresse** und füllen Sie die **E-Mail** aus.
4. Klicken Sie auf **Senden**.

Der Auftraggeber erhält eine E-Mail mit einem Link. Der Link ist 14 Tage gültig. **Erneut senden** erstellt einen neuen Link und zieht den vorherigen zurück; **Zurückziehen** macht den Link ungültig, ohne einen neuen zu senden.

Die Bestätigung beschreibt den Auftrag: die Aktennummer, die Besichtigungsart, das Schiff, den Hafen, das Datum, die Referenz des Auftraggebers, den Tarif und die Beschreibung. Der Tarif stammt aus dem angenommenen Angebot, sonst aus der Rahmenvereinbarung mit dem Auftraggeber, sonst aus den Tarifen des Büros. → [Tarife](tarieven.md)

## Was der Auftraggeber sieht

Der Link öffnet eine Seite mit dem Auftrag und den Allgemeinen Geschäftsbedingungen, in vier Sprachen. Der Auftraggeber gibt seinen vollständigen Namen ein, hakt an, dass er einverstanden ist, und klickt auf **Auftrag bestätigen**. Er kann auch **Ich bestätige diesen Auftrag nicht** wählen. Danach funktioniert der Link nicht mehr.

Hat der Auftraggeber Zugang zum Kundenportal, sieht er dieselbe Bestätigung bei der Akte und kann auch dort bestätigen oder ablehnen. → [Wie gebe ich einem Auftraggeber Zugang?](hoe/klantenportaal.md)

## Der Stand der Akte

- **Nicht versendet**: Es wurde noch keine Bestätigung versendet.
- **Versendet**: Der Auftraggeber hat noch nicht geantwortet.
- **Angenommen**: mit dem Namen, den der Auftraggeber eingegeben hat, der Uhrzeit, dem Weg (über den Link oder im Kundenportal) und der Version der Bedingungen.
- **Abgelehnt**: Der Auftraggeber bestätigt diesen Auftrag nicht. Nehmen Sie Kontakt auf und senden Sie bei Bedarf eine neue Bestätigung.
- **Abgelaufen**: Der Link ist nach 14 Tagen ohne Antwort abgelaufen.
- **Zurückgezogen**: Das Büro hat den Link zurückgezogen.
- **Durch Angebot bestätigt** oder **Durch Anfrage bestätigt**: Die Akte entstand aus einem Angebot, das der Auftraggeber angenommen hat, oder aus einer Anfrage im Kundenportal. Eine eigene Bestätigung ist dann nicht nötig. → [Angebote](offertes.md), [Anfragen](aanvragen.md)

Jede Annahme oder Ablehnung erscheint auch als Notiz im Journal der Akte.

## Was gespeichert wird

Quaymark speichert, was der Auftraggeber zu sehen bekam (den Auftrag und die Version der Bedingungen, mit einem Fingerabdruck), und bei einer Antwort über den Link den Namen, die Uhrzeit, die IP-Adresse, den Browser und den Fingerabdruck der angezeigten Seite. Im Kundenportal ist es das Konto des Auftraggebers. All dies wird nur hinzugefügt, nie geändert. Wird eine Akte nach ihrer Aufbewahrungsfrist gelöscht, geht ihre Bestätigung mit. → [Aufbewahrungsfristen](bewaartermijnen.md)

## Einen Bericht ohne Bestätigung ausgeben

Hat die Akte keine angenommene Bestätigung, zeigt der Reiter **Bericht** eine Warnung. Bei der Ausgabe verlangt Quaymark eine **Begründung**: Warum geben Sie den Bericht trotzdem aus? Sie wird mit Ihrem Namen und der Uhrzeit gespeichert und steht danach im Rahmen **Auftragsbestätigung**. Klicken Sie auf **Mit der Ausgabe fortfahren**, um weiterzumachen. → [Akten](dossiers.md)

## Siehe auch

- [Akten](dossiers.md)
- [Angebote](offertes.md)
- [Tarife](tarieven.md)

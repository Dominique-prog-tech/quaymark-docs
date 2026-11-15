---
description: "Aufträge, die Auftraggeber im Kundenportal gesendet haben: ansehen, annehmen oder ablehnen."
---

# Anfragen

Die Aufträge, die Auftraggeber im Kundenportal gesendet haben oder die jemand über das Anfrageformular auf der Website des Büros gesendet hat. Eine Anfrage wird erst zur Akte, wenn das Büro sie annimmt.

## Bildschirm öffnen

Klicken Sie im Menü links auf **Anfragen**. Warten Anfragen, zeigt der Startbildschirm, wie viele.

## Die Liste

- Standardmäßig sehen Sie nur die Anfragen, die auf eine Entscheidung warten. Aktivieren Sie **Auch angenommene oder abgelehnte** für den Rest.
- Doppelklicken Sie auf eine Zeile, um die Anfrage zu öffnen.
- Die Spalte **Quelle** zeigt, woher die Anfrage kommt: **Portal** oder **Website**. Eine Webanfrage hat noch keinen Auftraggeber: Die Spalte **Auftraggeber** zeigt dann, wer sie gesendet hat.

## Anfrage

Links steht, was der Auftraggeber ausgefüllt hat: wer die Anfrage gesendet hat, die Besichtigungsart, das Schiff, der Hafen und das Terminal, das gewünschte Datum, die Referenz, die Beschreibung und die Anhänge (zum Beispiel das Auftragsschreiben oder der Stauplan).

- **Annehmen**: Wählen Sie die Niederlassung, das Schiff, den Besichtiger, den Termin und die Berichtssprache. Beim Schiff schlägt Quaymark ein vorhandenes Schiff vor, wenn IMO-Nummer, ENI-Nummer oder Name übereinstimmen; sonst ein neues Schiff aus den Daten der Anfrage. Der gewünschte Termin ist bereits ausgefüllt. Quaymark legt dann die Akte an, kopiert die Anhänge in die Registerkarte **Dokumente** und sendet dem Auftraggeber eine E-Mail.
- Arbeitet das Büro mit diesem Schiff für einen anderen Auftraggeber und ist dieser Auftraggeber dort Partei, erscheint über **Annehmen** eine Warnung. → [Interessenkonflikte](dossiers.md#interessenkonflikte)
- **Ablehnen** verlangt einen Grund. Der Auftraggeber sieht ihn im Portal und in der E-Mail.
- Entscheiden erfordert das Recht, Akten zu bearbeiten. Über eine Anfrage wird nur einmal entschieden: Klicken zwei Kollegen gleichzeitig, erfährt der zweite, dass bereits entschieden wurde.

## Webformular

Das Büro kann ein Anfrageformular auf seine eigene Website stellen. Wer es ausfüllt, braucht kein Konto. Das Formular sendet die Daten an Quaymark, und eine halbe Minute später steht die Anfrage auf dieser Seite, mit dem Abzeichen **Website** und einer Meldung an der Glocke oben rechts.

- **Einrichten**: Fragen Sie ADM-Concept nach einem Website-Schlüssel für Ihr Büro und geben Sie ihn Ihrem Webentwickler mit der technischen Erklärung unter <https://platform.digitalcloud.be/docs/leads-contactformulier>. → [Wie stelle ich ein Anfrageformular auf unsere Website?](hoe/aanvraagformulier.md)
- **Die Felder**: Name, E-Mail, Telefon, Firma, Betreff und Nachricht kommen immer mit. Soll Quaymark auch Schiff, Hafen oder Besichtigungsart ausfüllen, geben Sie den Feldern einen der Namen unten (Groß- und Kleinschreibung, Akzente und Leerzeichen zählen nicht). Alles andere und ein Wert, der nicht stimmt (eine falsche IMO-Nummer, ein Hafen, der kein UN/LOCODE ist), kommt in die Beschreibung. Es geht nichts verloren.

| Feld | Feldname (einer davon) | Wert |
|---|---|---|
| Schiff | Schiff, Schiffsname, schip, ship, navire | der Name |
| IMO | imo, IMO-Nummer | 7 Ziffern, geprüft |
| ENI | eni, ENI-Nummer | 8 Ziffern |
| Hafen | Hafen, haven, port, locode | UN/LOCODE, z. B. BEANR |
| Terminal | terminal, Kai, Liegeplatz, kaai, quai | freier Text |
| Besichtigungsart | Besichtigungsart, soort survey, survey type, type d'expertise | der Code oder Name einer Besichtigungsart |
| Wunschtermin | Wunschtermin, gewenste datum, preferred date, date souhaitée | 20/11/2026 oder 2026-11-20 14:30, in der Zeit des Büros |
| Referenz | Referenz, referentie, reference, référence | die Referenz des Anfragenden |

- **Der Auftraggeber**: Beim **Annehmen** wählen Sie den Auftraggeber. Hat eine Beziehung oder ein Kontakt dieselbe E-Mail-Adresse wie der Anfragende, wird diese Beziehung vorgeschlagen. Sie können eine andere wählen, oder **Neue Beziehung** legt eine aus den Daten des Anfragenden an (eine Firma mit dem Anfragenden als Kontakt oder eine Person). Wurde die Besichtigungsart nicht erkannt, wählen Sie sie hier ebenfalls.
- **Der Anfragende** erhält eine E-Mail, wenn die Anfrage angenommen oder abgelehnt wird, in der Sprache des Formulars. Diese E-Mail hat keinen Link: Er hat keinen Zugang zum Portal.

## Benachrichtigungen an den Auftraggeber

Die Portalbenutzer des Auftraggebers erhalten eine E-Mail, wenn ihre Anfrage angenommen oder abgelehnt wird, wenn eine Akte geplant oder verschoben wird und wenn ein Bericht, Brief, Zertifikat oder eine Rechnung ausgestellt wird. Die E-Mail enthält keinen Anhang, nur einen Link zum Portal. Sie schalten das pro Beziehung auf der Registerkarte Kundenportal aus; jeder Benutzer kann es auch selbst ausschalten. Jede gesendete Benachrichtigung steht im Journal der Akte.

## Siehe auch

- [Beziehungen](relaties.md#kundenportal)
- [Akten](dossiers.md)

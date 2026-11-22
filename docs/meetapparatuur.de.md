---
description: "Die Messgeräte des Büros mit ihren Kalibrierungen: was gültig ist, was bald abläuft, und wie Sie einen Fehler berichtigen."
---

# Messgeräte

Die Messgeräte des Büros, etwa Ultraschall-Dickenmessgeräte, Aräometer, Thermometer und Peilbänder, mit ihren Kalibrierungen. Eine Messung ist nur so zuverlässig wie das Gerät, mit dem sie gemacht wurde. Hier zeigt das Büro, welche Geräte es hat und bis wann sie kalibriert sind.

## Bildschirm öffnen

Klicken Sie unten im Menü auf **Verwaltung** und dann auf die Kachel **Messgeräte**. Nur der Administrator des Büros sieht diesen Bildschirm.

![Messgeräte mit Status und Gültig bis, darunter Gerätearten](images/meetapparatuur-de.png "Messgeräte")

## Die Liste

- Jede Zeile ist ein Gerät: die Bezeichnung des Büros (zum Beispiel *H-03*), die Art, Marke und Modell, die Seriennummer und die Niederlassung.
- **Kalibriert am** und **Gültig bis** stammen aus der geltenden Kalibrierung, also der letzten, die nicht berichtigt wurde.
- Der **Status** sagt, ob das Gerät **Gültig** ist, innerhalb von 30 Tagen abläuft (**Läuft bald ab**), **Abgelaufen** ist oder **Nie kalibriert** wurde. Eine Kalibrierung ohne Enddatum gilt bis zur nächsten.
- Haken Sie **Nur was Aufmerksamkeit braucht** an, um nur zu sehen, was abläuft, abgelaufen ist oder nie kalibriert wurde. Ein nicht aktives Gerät zählt nicht mit: Es ist außer Betrieb.
- Mit der Exportschaltfläche laden Sie die Liste als Datei herunter.

## Ein Gerät hinzufügen

1. Klicken Sie auf **Gerät hinzufügen**.
2. Wählen Sie die **Art** und tragen Sie den **Namen** ein: die Bezeichnung des Büros, die auch auf dem Gerät steht.
3. Tragen Sie bei Bedarf **Niederlassung**, **Marke**, **Modell**, **Seriennummer** und eine **Bemerkung** ein.
4. Klicken Sie auf **Speichern**. Das Datenblatt öffnet sich auf der Registerkarte **Kalibrierungen**.

Ein Doppelklick auf eine Zeile öffnet das Datenblatt des Geräts. Was Sie auf der Registerkarte **Allgemein** ändern, steht im **Verlauf**. **Löschen** verschiebt das Gerät mit seinen Kalibrierungen in den Papierkorb.

## Kalibrierungen

![Kalibrierungen von T-02 · Thermometer: oben die geltende, darunter die berichtigte durchgestrichen](images/meetapparatuur-kalibraties-de.png "Kalibrierungen")

1. Klicken Sie auf der Registerkarte **Kalibrierungen** auf **Kalibrierung hinzufügen**.
2. Tragen Sie das Datum unter **Kalibriert am** ein, und **Gültig bis**. Lassen Sie Gültig bis leer, gilt die Kalibrierung bis zur nächsten.
3. Tragen Sie das **Labor**, die **Zertifikatsnummer** und **Ergebnis oder Abweichung** ein.
4. Wählen Sie das Zertifikat unter **Zertifikat (PDF)**: eine PDF von höchstens 20 MB.
5. Klicken Sie auf **Speichern**.

Eine Kalibrierung wird nur **hinzugefügt**: Sie ändern oder löschen sie nicht. So lässt sich immer zeigen, was an einem bestimmten Tag galt. Die Spalte **Erfasst** sagt, wer sie wann eingegeben hat. **PDF** zeigt das Zertifikat. Quaymark prüft es zuerst anhand seines Fingerabdrucks (SHA-256): Stimmt die Datei nicht mehr, zeigt es nichts an.

### Einen Fehler berichtigen

1. Klicken Sie auf **⋯** in der Zeile der falschen Kalibrierung und dann auf **Berichtigen**.
2. Tragen Sie den **Grund der Berichtigung** ein und verbessern Sie die Daten.
3. Wählen Sie bei Bedarf ein neues Zertifikat. Wählen Sie keines, bleibt das Zertifikat der ersetzten Kalibrierung.
4. Klicken Sie auf **Speichern**.

Die neue Kalibrierung ersetzt die falsche. Die falsche bleibt durchgestrichen in der Liste, mit **Berichtigt**, und unter der neuen steht der Grund.

## Bei einer Messung

Beim Draft Survey (unter jeder Messung) und auf der Registerkarte **Bunker** (für die Peilungen vorher und nachher) steht ein Block **Messgeräte**. Dort halten Sie fest, mit welchem Gerät Sie gemessen haben.

1. Wählen Sie das Gerät in der Liste. Die Arten, die zur Messung passen, stehen oben (das Aräometer beim Draft Survey, das Thermometer und das Peilband beim Bunker), jede mit ihrem Status am Tag der Messung.
2. Klicken Sie auf **Gerät wählen**.

Quaymark speichert das Gerät, wie es damals war, mit der Kalibrierung, die am Tag der Messung galt: beim Bunker der Tag der Peilungen, beim Draft Survey der geplante Tag der Akte (sonst der Tag der Wahl). Eine spätere Kalibrierung oder Berichtigung ändert daran nichts. Um es zu erneuern, klicken Sie auf **Entfernen** und wählen das Gerät erneut. Solange die Akte offen ist, können Sie ein Gerät entfernen; danach ist es fest.

War die Kalibrierung abgelaufen oder hatte das Gerät an diesem Tag keine, erscheint eine Warnung. Quaymark lehnt nichts ab: An Bord muss man immer messen können, und der Bericht sagt ehrlich, wie es war.

- **Im Bericht** steht unter dem Draft Survey oder der Bunkerbesichtigung eine Zeile je Gerät: Art, Name, Marke, Modell und Seriennummer, und die Kalibrierung mit ihrer Gültigkeit und Zertifikatsnummer, oder dass sie abgelaufen war. Die Zeile kommt mit den Markierungen `{{draftsurvey}}` und `{{bunker}}`: Zeigt Ihre Vorlage sie noch nicht, fügen Sie sie ein (siehe [Vorlagen](sjablonen.md)).
- **Im Beweispaket** enthält der Ordner `meetapparatuur/` das Zertifikat (PDF) jeder verwendeten Kalibrierung, mit einer Übersicht in `meetapparatuur.json` und `meetapparatuur.csv`.

## Die Glocke

Wer die Messgeräte verwaltet, erhält auf der Glocke oben rechts eine Meldung für jedes aktive Gerät, das Aufmerksamkeit braucht: Die Kalibrierung läuft innerhalb von 30 Tagen ab, ist abgelaufen, oder das Gerät wurde nie kalibriert. Ein Klick öffnet das Gerät auf der Registerkarte **Kalibrierungen**. Eine gesehene Meldung bleibt verborgen, bis sich etwas ändert: eine neue Kalibrierung oder eine Kalibrierung, die inzwischen abgelaufen ist. Ein nicht aktives Gerät meldet nichts. → [Nachrichten](berichten.md#die-glocke)

## Gerätearten

Neben der Liste verwalten Sie die **Arten** des Büros: einen Code (Kleinbuchstaben, Ziffern und _), den Namen in vier Sprachen, aktiv und die Reihenfolge. Der Code ist fest, sobald die Art gespeichert ist, denn Geräte verweisen darauf. Einen Tippfehler beheben Sie mit einer neuen Art, und die falsche setzen Sie auf nicht aktiv. Ein neues Büro beginnt mit fünf Arten: Ultraschall-Dickenmessgerät, Aräometer/Dichtemesser, Thermometer, Peilband/Ullage-Band und anderes Gerät.

## Siehe auch

- [Qualifikationen](bevoegdheden.md)
- [Besichtigungsarten](soorten-survey.md)

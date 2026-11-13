---
description: "Die Arbeitsliste des Büros: eine Zeile pro Auftrag."
---

# Akten

Die Arbeitsliste des Büros: eine Zeile pro Auftrag.

## Bildschirm öffnen

Klicken Sie im Menü links auf **Akten**.

## Die Liste

- Die Auswahl **Status** über der Liste zeigt standardmäßig die **offenen** Akten. Wählen Sie **Alle**, um auch abgeschlossene und stornierte Akten zu sehen, oder einen einzelnen Status.
- Das **Suchfeld** sucht in allen Spalten: Nummer, Besichtigungsart, Schiff, Auftraggeber, Hafen, Planung und Status.
- Doppelklicken Sie auf eine Zeile, um die **Akte** zu öffnen; der Pfeil am Zeilenanfang öffnet sie in einem neuen Tab. **Neue Akte** legt eine an.
- Die Export-Schaltfläche lädt die Liste als Datei herunter.

![Liste der Akten mit Status und Neue Akte](images/dossiers-lijst-de.png "Die Liste der Akten")

## Akte

Ein Auftrag: was verlangt wird, wo und wann, und was der Besichtiger vor Ort feststellt.

![Akte HQ-2026-0003 mit Allgemein, Auftrag, Ort und Planung, Umstände und Anwesende](images/dossier-de.png "Eine Akte")

- **Auftrag**: Niederlassung, Besichtigungsart, Auftraggeber, Besichtiger, Referenz, Datum, Status und Berichtssprache. Die **Aktennummer** (Niederlassungscode, Jahr, laufende Nummer) wird beim ersten Speichern vergeben; danach steht die Niederlassung fest.
- **Ort und Planung**: Schiff, Hafen, Terminal oder Kai, der geplante Zeitpunkt (in der Zeitzone der Niederlassung), Währung und Beschreibung.
- **Umstände und Anwesende**: Wetter, See, Sicht, Liegeplatz und wer bei der Besichtigung anwesend war. **Verknüpfte Akte** verweist auf eine frühere Akte desselben Schiffs, zum Beispiel On-hire zu Off-hire.
- **Besichtigungsdaten**: die Felder der gewählten Besichtigungsart. Ein Pflichtfeld muss ab dem Status Berichterstellung ausgefüllt sein. Wählen Sie eine andere Art, gehen beim Speichern die Werte von Feldern verloren, die die neue Art nicht kennt.

Eine gespeicherte Akte hat Registerkarten: **Parteien** (Beziehungen mit Rolle und Referenz), **Dokumente** (in Ordnern), **Vom Schiff** (die Dokumente des Schiffs, nur lesen), **Feststellungen**, **Checkliste** und das Journal mit Notizen, Aufgaben, Anlagen und Verlauf.

### Feststellungen

Eine **Feststellung** wird hinzugefügt, nie geändert oder gelöscht. Einen Fehler berichtigen Sie mit **Berichtigen** und einem Grund: die alte Fassung bleibt durchgestrichen sichtbar. Beim Zeigen auf ein Foto erscheinen Zeitpunkt, GPS-Position und Fingerabdruck (SHA-256), die das Gerät bei der Aufnahme festgehalten hat.

![Feststellungen je Ort mit Berichtigen und Aus dem Bericht nehmen](images/dossier-vaststellingen-de.png "Feststellungen mit Foto")

### Fotos im Bericht

**Aus dem Bericht nehmen** unter einem Foto lässt es im Fotoanhang des Berichts weg, mit einer Begründung. Das Foto bleibt als Beweis gespeichert; **Wieder in den Bericht** setzt es zurück. Die Fotos erhalten im Bericht eine fortlaufende Nummer, und die Tabelle der Feststellungen nennt diese Nummern.

### Checkliste

Die **Checkliste** zeigt pro Punkt die letzte Antwort (in Ordnung, nicht in Ordnung, entfällt), von wem und wann. Jede Antwort bleibt unter **Frühere Antworten** erhalten. **Nicht in Ordnung** schlägt eine Feststellung vor. Vor Ort antwortet der Besichtiger in der Feld-App.

![Checkliste mit der letzten Antwort](images/dossier-checklist-de.png "Die Checkliste")

### Bericht

In der Registerkarte **Bericht** schreiben Sie den Text des Berichts je Abschnitt, mit einfacher Formatierung, und fügen Standardtexte des Büros ein. **Abschnitte speichern** speichert sie. Zeigt die Berichtsvorlage einen Abschnitt nicht, sagt die Registerkarte das.

![Bericht mit Schreiben und Bescheinigungen, Beweispaket, Einleitung und Vorgehensweise](images/dossier-rapport-de.png "Die Registerkarte Bericht")

### Bericht herausgeben und senden

**Bericht herausgeben** (Registerkarte Bericht, ab dem Status Berichterstellung) legt den Bericht als Version 1 fest, mit seinem Fingerabdruck (SHA-256): Er ändert sich danach nie mehr. Korrigieren = **Neue Version herausgeben**, mit Begründung. **Senden** schickt eine herausgegebene Version als PDF an den Auftraggeber; die Mail wird im Journal gespeichert. Speichern Sie zuerst die Abschnitte: Eine Version übernimmt nur gespeicherten Text.

### Entwurf vorschlagen

**Entwurf vorschlagen** (Registerkarte Bericht) lässt die KI je Abschnitt einen Vorschlag aus den Daten der Akte schreiben: Feststellungen, Checkliste, Felder und Umstände. Fotos und Ihr eigener Text werden nicht übermittelt. Jeder Vorschlag steht unter seinem Abschnitt; Sie wählen **Übernehmen**, **Am Ende hinzufügen** oder **Ignorieren** und speichern dann wie gewohnt. Es läuft über den KI-Schlüssel Ihres Büros und nur, wenn der Administrator es im ADM One-Portal erlaubt.

### Vergleich mit einer vorigen Akte

Ist die Akte mit einer vorigen Akte **verknüpft** (z. B. die On-Hire zu einer Off-Hire), zeigt die Registerkarte Feststellungen je Ort, was jene Akte dort festgestellt hat. Geben Sie je Feststellung Ihre Beurteilung: **Bestand bereits** oder **Neu**. Der Bericht zeigt den Vergleich je Ort an Bord, mit den Fotonummern und Ihrer Beurteilung; ohne Beurteilung steht nichts dabei.

![Feststellungen von ZB-2026-0002 gegenüber ZB-2026-0001 mit Bestand bereits und Neu](images/dossier-vergelijking-de.png "Der Vergleich mit einer vorigen Akte")

### Schreiben und Bescheinigungen

**Neues Schreiben** und **Neue Bescheinigung** (Registerkarte Bericht) erstellen ein Standardschreiben oder eine Bescheinigung in der Sprache der Akte. **Vorschau (PDF)** zeigt es zuerst; **Herausgeben** legt es mit seinem Fingerabdruck fest. Eine Bescheinigung erhält dann eine Nummer aus der Reihe der Niederlassung (C-HQ-2026-0001). Ersetzen Sie in einem Schreiben jedes Feld in [eckigen Klammern]: sonst ist Herausgeben nicht möglich.

Es gibt drei Schreiben und fünf Bescheinigungen. Jede Bescheinigung hat ihre eigenen Zeilen:

- **Mengenbescheinigung**, **Gewichtsbescheinigung** und **On-Hire-/Off-Hire-Bescheinigung**: eine Beschreibung, eine Menge und eine Einheit. Ein ausgefülltes Zahlenfeld der Akte übernehmen Sie mit **Aus einem Feld der Akte übernehmen**.
- **Bescheinigung über die Laderaumbesichtigung**: je Laderaum eine **Feststellung** und das **Urteil**: geeignet oder nicht geeignet für die Übernahme der angegebenen Ladung. Das Urteil ist nie vorausgefüllt. Auf dieser Bescheinigung wird die Notice of Readiness (NOR) des Kapitäns angenommen oder abgelehnt.
- **Qualitätsbescheinigung**: die Ergebnisse einer Analyse, mit je Zeile **Parameter**, **Methode**, **Ergebnis**, **Einheit** und **Spezifikation** (der Grenzwert). Darüber tragen Sie die **Probenahme** (wo und wann), das **Labor** und den **Laborbericht** ein.

![Protestschreiben zu HQ-2026-0003 mit Vorschau (PDF) und Herausgeben](images/dossier-brief-de.png "Ein neues Schreiben")

### Beweispaket

**Beweispaket (ZIP)** liefert ein ZIP zur Prüfung ohne Quaymark: die Originalfotos des Geräts (auch ausgeblendete, mit Grund), ein Manifest, die herausgegebenen Berichte und ein LIESMICH mit den Befehlen (`shasum`, `certutil`). Jede Datei wird beim Packen nachgeprüft; stimmt eine nicht mehr, entsteht kein Paket. Der Fingerabdruck des Pakets steht danach in der Registerkarte und im Journal.

### Berichtsvorschau

**Bericht (PDF)** und **Bericht (Word)** erstellen den Bericht aus den gespeicherten Daten, mit der Berichtsvorlage dieser Besichtigungsart (sonst der allgemeinen) und in der Berichtssprache. Es ist eine Vorschau: Nichts wird gespeichert oder versendet. Speichern Sie zuerst, sonst fehlen Ihre letzten Änderungen.

### Kopieren

**Kopieren** legt eine neue Akte mit demselben Auftrag an (Schiff, Auftraggeber, Art, Hafen), ohne Feststellungen, Antworten und Besichtigungsdaten, und verknüpft sie mit dieser Akte.

### Löschen

**Löschen** verschiebt die Akte in den Papierkorb.

## Siehe auch

- [Schiffe](schepen.md)
- [Beziehungen](relaties.md)
- [Vorlagen](sjablonen.md)

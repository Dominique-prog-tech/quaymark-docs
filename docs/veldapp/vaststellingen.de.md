---
description: "Feststellungen und Fotos in der Außendienst-App: was das Gerät bei der Aufnahme festhält, und warum eine Feststellung nur hinzugefügt wird."
---

# Feststellungen und Fotos

Eine **Feststellung** ist, was Sie an Bord sehen: eine Delle in der Tankdecke von Laderaum 3, nasse Ladung, eine beschädigte Lukendichtung. Mit ihren Fotos ist sie der Beweis im Bericht.

## Eine Feststellung hinzufügen

Tippen Sie auf **Hinzufügen** auf der Karte **Feststellungen**.

![Der Bildschirm Neue Feststellung, ausgefüllt: Ort an Bord, Nummer / Seite, Kategorie, Schweregrad und Beschreibung, unter Fotos ein Foto mit dem Anfang seines Fingerabdrucks, einer Stecknadel und dem Zeichen der Mediathek, die Schaltflächen Foto und Aus der Mediathek, und Speichern.](../images/app-vaststelling-de.png "Neue Feststellung"){ width="320" }

1. Wählen Sie den **Ort an Bord** und geben Sie bei Bedarf **Nummer / Seite** ein, zum Beispiel *3* oder *StB*.
2. Wählen Sie die **Kategorie** und den **Schweregrad**: **Keine**, **Gering**, **Mäßig** oder **Schwer**.
3. Beschreiben Sie unter **Beschreibung**, was Sie sehen.
4. Fügen Sie unter **Fotos** Fotos hinzu: **Foto** öffnet die Kamera, **Aus der Mediathek** wählt ein Foto, das schon auf dem Gerät ist.
5. Tippen Sie auf **Speichern**.

Ort, Kategorie und Beschreibung sind Pflicht. Die Auswahl für Ort und Kategorie kommt von Ihrem Büro. → [Auswahllisten](../categorieen-en-plaatsen.md)

Unter **Nummer / Seite** zählt die App die Zeichen mit: höchstens 20. Bei einer langen **Beschreibung** erscheint der Zähler erst, wenn Sie sich der Grenze nähern. Ist ein Text zu lang, speichert die App nicht und sagt, warum, zum Beispiel *Nummer / Seite: höchstens 20 Zeichen*.

Die Feststellung steht sofort auf der Karte, mit einer Wolke, solange sie nicht gesendet ist. Die Fotos werden nach ihrer Feststellung gesendet.

## Was das Gerät bei einem Foto festhält

In dem Moment, in dem Sie das Foto aufnehmen, hält die App fest:

- die **Uhrzeit**, zuerst, noch vor der Position;
- die **GPS-Position** und wie genau sie ist. Gibt es keine Position (keine Erlaubnis, kein Empfang im Laderaum), hält die App fest, warum;
- den **Fingerabdruck** (SHA-256) des Fotos.

Bei jedem Foto zeigt der Bildschirm die ersten Zeichen des Fingerabdrucks, mit 📍, wenn es eine Position gibt, und 🖼 bei einem Foto aus der Mediathek. Das Foto bleibt unverändert: Die App verkleinert und bearbeitet nichts. Quaymark rechnet den Fingerabdruck nach, wenn das Foto ankommt. Wurde das Foto inzwischen auf dem Gerät verändert, wird es nicht gesendet.

Ein Foto **Aus der Mediathek** trägt dieses Merkmal: Im Büro ist zu sehen, dass es nicht mit der Kamera der App aufgenommen wurde. Nehmen Sie ein Beweisfoto also am besten mit **Foto** auf.

Ist das Foto gesendet und hat Quaymark den Fingerabdruck nachgerechnet, löscht die App ihre Kopie vom Gerät. Das Original liegt dann beim Büro.

## Eine Feststellung berichtigen

Eine Feststellung wird nur **hinzugefügt**, nie geändert oder gelöscht: So bleibt nachvollziehbar, was an Bord notiert wurde. Eine Feststellung, die bei Quaymark angekommen ist, können Sie in der App deshalb nicht mehr ändern. Einen Fehler berichtigen Sie im Büro mit **Berichtigen** und einem Grund; die alte Fassung bleibt durchgestrichen sichtbar. → [Feststellungen](../dossiers.md#feststellungen)

Sehen Sie den Fehler noch vor dem Senden, können Sie die Feststellung unter **Noch zu senden** verwerfen. Ihre Fotos gehen mit. → [Offline](zonder-bereik.md)

Hat Quaymark die Feststellung abgelehnt, zum Beispiel weil ein Text zu lang war, bearbeiten Sie sie unter **Noch zu senden** mit **Bearbeiten**. → [Eine abgelehnte Aktion](zonder-bereik.md#eine-abgelehnte-aktion)

## Häufige Fehler

!!! warning "Keine Kamera auf diesem Gerät"
    Findet die App keine Kamera, sagt sie es und öffnet die Mediathek. Verwenden Sie dann ein Foto, das Sie mit dem Gerät aufgenommen haben.

!!! warning "Ein Foto ohne Position"
    Erlauben Sie der App, Ihren Standort zu verwenden (in den Einstellungen des Geräts). Tief im Laderaum gibt es manchmal keinen GPS-Empfang: Das Foto wird dann ohne Position gesendet, mit dem Grund.

## Siehe auch

- [Die Checkliste](checklist.md)
- [Unterschreiben lassen](laten-tekenen.md) — die Feststellungen unterschreiben lassen
- [Feststellungen](../dossiers.md#feststellungen) — im Büro

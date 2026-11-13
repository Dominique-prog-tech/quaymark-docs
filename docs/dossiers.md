---
description: "De werklijst van het bureau: één rij per opdracht."
---

# Dossiers

De werklijst van het bureau: één rij per opdracht.

## Het scherm openen

Klik in het menu links op **Dossiers**.

## De lijst

- De keuze **Status** boven de lijst toont standaard de **open** dossiers. Kies **Alle** om ook afgesloten en geannuleerde dossiers te zien, of één status.
- Het **zoekvak** zoekt in alle kolommen: nummer, soort survey, schip, opdrachtgever, haven, planning en status.
- Dubbelklik op een rij om het **dossier** te openen; met het pijltje vooraan de rij opent het in een nieuw tabblad. **Nieuw dossier** maakt er een aan.
- Met de exportknop haalt u de lijst op als bestand.

## Dossier

Eén opdracht: wat er gevraagd is, waar en wanneer, en wat de surveyor ter plaatse vaststelt.

- **Opdracht**: vestiging, soort survey, opdrachtgever, surveyor, referentie, datum, status en de taal van het rapport. Het **dossiernummer** (vestigingscode, jaar, volgnummer) wordt toegekend bij het eerste bewaren; daarna ligt de vestiging vast.
- **Plaats en planning**: schip, haven, terminal of kaai, het geplande moment (in de tijdzone van de vestiging), munt en omschrijving.
- **Omstandigheden en aanwezigen**: weer, zee, zicht, ligplaats en wie er bij de survey aanwezig was. **Gekoppeld dossier** verwijst naar een eerder dossier van hetzelfde schip, bijvoorbeeld de on-hire bij een off-hire.
- **Gegevens van de survey**: de velden die bij het gekozen soort survey horen. Een verplicht veld moet ingevuld zijn vanaf de status Rapportage. Kiest u een ander soort survey, dan gaan bij het bewaren de waarden verloren van velden die het nieuwe soort niet kent.

Een bewaard dossier heeft tabbladen: **Partijen** (relaties met hun rol en referentie), **Documenten** (in mappen), **Van het schip** (de documenten van het schip, alleen lezen), **Vaststellingen**, **Checklist** en het journaal met notities, taken, bijlagen en historiek.

### Vaststellingen

Een **vaststelling** wordt toegevoegd, nooit gewijzigd of verwijderd. Een fout zet u recht met **Rechtzetten** en een reden: de oude versie blijft doorgestreept staan. Een foto toont bij aanwijzen het tijdstip, de GPS-positie en de vingerafdruk (SHA-256) die het toestel bij de opname vastlegde.

### Foto's in het rapport

**Niet in rapport** onder een foto laat die foto weg uit de fotobijlage van het rapport, met een reden. De foto blijft bewaard als bewijs; **Weer in rapport** zet ze terug. De foto's krijgen in het rapport een doorlopend nummer, en de tabel met vaststellingen noemt die nummers.

### Checklist

De **checklist** toont per punt het laatste antwoord (in orde, niet in orde, n.v.t.), van wie en wanneer. Elk antwoord blijft bewaard onder **Vorige antwoorden**. **Niet in orde** stelt een vaststelling voor. Ter plaatse antwoordt de surveyor in de veldapp.

### Rapport

Op het tabblad **Rapport** schrijft u de tekst van het rapport per rubriek, met eenvoudige opmaak, en voegt u standaardteksten van het bureau in. **Rubrieken bewaren** bewaart ze. Toont het rapportsjabloon een rubriek niet, dan zegt het tabblad dat.

### Rapport uitgeven en verzenden

**Rapport uitgeven** (tabblad Rapport, vanaf de status Rapportage) legt het rapport vast als versie 1, met zijn vingerafdruk (SHA-256): het verandert daarna nooit meer. Iets rechtzetten = **Nieuwe versie uitgeven**, met een reden. **Verzenden** stuurt een uitgegeven versie als PDF naar de opdrachtgever; de mail komt in het journaal. Bewaar eerst de rubrieken: een versie neemt enkel bewaarde tekst.

### Ontwerp voorstellen

**Ontwerp voorstellen** (tabblad Rapport) laat de AI per rubriek een voorstel schrijven uit de gegevens van het dossier: vaststellingen, checklist, velden en omstandigheden. Foto's en uw eigen tekst gaan niet mee. Elk voorstel staat onder zijn rubriek; u kiest **Overnemen**, **Achteraan toevoegen** of **Negeren**, en bewaart daarna zoals altijd. Het loopt op de AI-sleutel van uw bureau en enkel als de beheerder het in het portaal van ADM One toestaat.

### Vergelijking met een vorig dossier

Is het dossier **gekoppeld** aan een vorig dossier (bv. de on-hire bij een off-hire), dan toont het tabblad Vaststellingen per plaats wat dat dossier er vaststelde. Geef per vaststelling uw oordeel: **Bestond al** of **Nieuw**. Het rapport toont de vergelijking per plaats aan boord, met de fotonummers en uw oordeel; zonder oordeel staat er geen woord bij.

### Brieven en certificaten

**Nieuwe brief** en **Nieuw certificaat** (tabblad Rapport) maken een standaardbrief of certificaat in de taal van het dossier. **Voorbeeld (PDF)** toont het eerst; **Uitgeven** legt het vast met zijn vingerafdruk. Een certificaat krijgt dan een nummer uit de reeks van de vestiging (C-HQ-2026-0001). Vervang in een brief elk invulvak tussen [rechte haken]: anders kan uitgeven niet.

### Bewijspakket

**Bewijspakket (ZIP)** geeft één ZIP om zonder Quaymark na te trekken: de originele foto's van het toestel (ook verborgen foto's, met de reden), een manifest, de uitgegeven rapporten en een LEESMIJ met de commando's (`shasum`, `certutil`). Elk bestand wordt bij het inpakken nagerekend; klopt er één niet meer, dan komt er geen pakket. De vingerafdruk van het pakket staat daarna op het tabblad en in het journaal.

### Rapport als voorbeeld

**Rapport (PDF)** en **Rapport (Word)** maken het rapport uit de bewaarde gegevens, met het rapportsjabloon van deze soort survey (anders het algemene) en in de taal van het rapport. Het is een voorbeeld: er wordt niets bewaard of verzonden. Bewaar eerst, anders staan uw laatste wijzigingen er niet in.

### Kopiëren

**Kopiëren** maakt een nieuw dossier met dezelfde opdracht (schip, opdrachtgever, soort, haven), zonder vaststellingen, antwoorden en gegevens van de survey, en koppelt het aan dit dossier.

### Verwijderen

**Verwijderen** verplaatst het dossier naar de prullenbak.

## Zie ook

- [Schepen](schepen.md)
- [Relaties](relaties.md)
- [Sjablonen](sjablonen.md)

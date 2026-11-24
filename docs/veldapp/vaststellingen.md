---
description: "Vaststellingen en foto's in de veldapp: wat het toestel bij de opname vastlegt, en waarom een vaststelling enkel wordt toegevoegd."
---

# Vaststellingen en foto's

Een **vaststelling** is wat u aan boord ziet: een deuk in de tanktop van ruim 3, een natte lading, een kapotte luikpakking. Met de foto's erbij is ze het bewijs in het rapport.

## Een vaststelling toevoegen

Tik op **Toevoegen** op de kaart **Vaststellingen**.

![Het scherm Nieuwe vaststelling, ingevuld: Plaats aan boord, Nummer / zijde, Categorie, Ernst en Omschrijving, onder Foto's een foto met het begin van haar vingerafdruk, een speld en het teken van de bibliotheek, de knoppen Foto en Uit bibliotheek, en Bewaren.](../images/app-vaststelling.png "Nieuwe vaststelling"){ width="320" }

1. Kies de **Plaats aan boord** en vul eventueel het **Nummer / zijde** in, bijvoorbeeld *3* of *SB*.
2. Kies de **Categorie** en de **Ernst**: **Geen**, **Gering**, **Matig** of **Ernstig**.
3. Beschrijf wat u ziet in **Omschrijving**.
4. Voeg foto's toe onder **Foto's**: **Foto** opent de camera, **Uit bibliotheek** kiest een foto die al op het toestel staat.
5. Tik op **Bewaren**.

Plaats, categorie en omschrijving zijn verplicht. De keuzes van plaats en categorie komen van uw bureau. → [Keuzelijsten](../categorieen-en-plaatsen.md)

Onder **Nummer / zijde** telt de app de tekens mee: hoogstens 20. Bij een lange **Omschrijving** verschijnt de teller pas als u de grens nadert. Is een tekst te lang, dan bewaart de app niet en zegt ze waarom, bijvoorbeeld *Nummer / zijde: hoogstens 20 tekens*.

De vaststelling staat meteen op de kaart, met een wolk zolang ze niet verstuurd is. De foto's vertrekken na hun vaststelling.

## Wat het toestel bij een foto vastlegt

Op het moment dat u de foto neemt, legt de app vast:

- het **tijdstip**, eerst, nog vóór de positie;
- de **GPS-positie** en hoe nauwkeurig ze is. Is er geen positie (geen toestemming, geen ontvangst in een ruim), dan legt de app vast waarom;
- de **vingerafdruk** (SHA-256) van de foto.

Bij elke foto toont het scherm de eerste tekens van de vingerafdruk, met 📍 als er een positie is, en 🖼 bij een foto uit de bibliotheek. De foto blijft onveranderd: de app verkleint niets en bewerkt niets. Quaymark rekent de vingerafdruk na wanneer de foto aankomt. Is de foto op het toestel intussen gewijzigd, dan vertrekt ze niet.

Een foto **Uit bibliotheek** draagt dat merkteken: op kantoor is te zien dat ze niet met de camera van de app genomen werd. Neem een foto voor het bewijs dus liefst met **Foto**.

Is de foto verstuurd en heeft Quaymark de vingerafdruk nagerekend, dan wist de app haar kopie van het toestel. Het origineel staat dan bij het bureau.

## Een vaststelling rechtzetten

Een vaststelling wordt enkel **toegevoegd**, nooit gewijzigd of verwijderd: zo blijft vast te stellen wat er aan boord genoteerd werd. Een vaststelling die bij Quaymark staat, kunt u in de app daarom niet meer aanpassen. Een fout zet u op kantoor recht met **Rechtzetten**, met een reden; de oude versie blijft doorgestreept staan. → [Vaststellingen](../dossiers.md#vaststellingen)

Ziet u de fout nog vóór het versturen, dan kunt u de vaststelling weggooien op **Nog te versturen**. Haar foto's gaan dan mee weg. → [Zonder bereik](zonder-bereik.md)

Weigerde Quaymark de vaststelling, bijvoorbeeld omdat een tekst te lang was, dan past u ze aan op **Nog te versturen** met **Aanpassen**. → [Een geweigerde handeling](zonder-bereik.md#een-geweigerde-handeling)

## Veelgemaakte fouten

!!! warning "Geen camera op dit toestel"
    Vindt de app geen camera, dan zegt ze het en opent ze de bibliotheek. Gebruik dan een foto die u met het toestel nam.

!!! warning "Een foto zonder positie"
    Sta de app toe uw locatie te gebruiken (bij de instellingen van het toestel). Diep in een ruim is er soms geen GPS-ontvangst: de foto gaat dan mee zonder positie, met de reden.

## Zie ook

- [De checklist](checklist.md)
- [Laten tekenen](laten-tekenen.md) — de vaststellingen laten tekenen
- [Vaststellingen](../dossiers.md#vaststellingen) — op kantoor

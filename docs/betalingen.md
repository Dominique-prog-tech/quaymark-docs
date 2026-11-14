---
description: "De ontvangsten uit de bankfeed afgepunt op de facturen, automatisch waar mededeling en bedrag kloppen, en herinneringen in drie stappen."
---

# Betalingen

Op dit scherm ziet u welke facturen betaald zijn en wat nog openstaat. De verrichtingen op de bankrekening van het bureau komen uit de bankfeed van ADM One.

## Het scherm openen

Klik in het menu op **Betalingen**. Bekijken kan met het recht om facturen te bekijken; koppelen, registreren en herinneren met het recht om facturen te bewerken.

## De bank koppelen

De beheerder koppelt de bankrekening van het bureau in het portaal van ADM One (Bank). Quaymark hoeft daarvoor niets te doen. Bovenaan het scherm staat de gekoppelde rekening. Vraagt de bank om opnieuw te koppelen (na ongeveer 180 dagen), dan staat dat er ook; tot dan komt er niets nieuws binnen.

Quaymark haalt de verrichtingen op bij het openen van het scherm, hoogstens om de vijf minuten. **Nu ophalen** doet het meteen.

## Automatisch afpunten

Staat de gestructureerde mededeling van een factuur in de verrichting, en is het bedrag precies wat er van die factuur openstaat, dan is de factuur meteen betaald. Op de factuur staat dan **Volledig betaald**, met de betaling eronder.

## Te verwerken

De ontvangsten die Quaymark niet zelf afpuntte, met een **Voorstel** waar dat kan:

- de mededeling klopt, maar het bedrag niet (een deelbetaling, of te veel betaald);
- het factuurnummer staat in de tekst van de overschrijving;
- het bedrag is precies het saldo van één factuur van een klant met die naam.

**Koppelen** punt de verrichting af op de gekozen factuur. U kunt ook een deel van het bedrag afpunten en de rest op een andere factuur. **Opzij zetten** haalt een verrichting weg die geen betaling van een klant is, bijvoorbeeld een terugbetaling of een overboeking tussen eigen rekeningen.

## Openstaand

De uitgegeven facturen met een saldo, de oudste vervaldag eerst, met de dagen te laat. Een creditnota op een factuur telt mee in het saldo.

**Betaling registreren** is voor een betaling die niet in de bankfeed staat: contant, op een andere rekening of verrekend. Zeg bij **Opmerking** hoe er betaald werd.

## Herinneringen

Na het aantal dagen dat in [Bureaugegevens](bureaugegevens.md) staat (standaard 7, 21 en 35 na de vervaldag) verschijnt bij de factuur **Herinnering versturen**, daarna **Tweede herinnering versturen** en **Aanmaning versturen**. Tussen twee stappen zit minstens het verschil tussen hun termijnen (standaard 14 dagen), ook als u laat begint met herinneren. Een herinnering vertrekt nooit vanzelf: enkel met een klik, na een bevestiging.

De mail gaat via ADM One naar het e-mailadres op de factuur (anders dat van de relatie), in de taal van de factuur, met de factuur als PDF, het openstaande bedrag, de rekening en de gestructureerde mededeling. Hij komt ook in het journaal van de relatie. Elke stap kan één keer per factuur.

## Verwerkt

De afgepunte betalingen, met wie ze afpuntte. **Ongedaan maken** zet een verkeerde koppeling terug: de betaling telt niet meer mee en de verrichting komt terug onder Te verwerken. De betaling blijft bewaard, met wie ze ongedaan maakte.

## Zie ook

- [Facturen](facturen.md)
- [Bureaugegevens](bureaugegevens.md)
- [Relaties](relaties.md)

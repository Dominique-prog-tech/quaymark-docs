---
description: "De soorten survey die het bureau aanbiedt. Een nieuw bureau start met een catalogus die u aanpast of aanvult."
---

# Soorten survey

De soorten survey die het bureau aanbiedt. Een nieuw bureau start met een catalogus die u aanpast of aanvult.

## Het scherm openen

Klik onderaan het menu op **Platformbeheer** en dan op de tegel **Soorten survey**.

## De lijst

- Per soort ziet u de code, de naam, het aantal **velden** en **checklistpunten**, de **vaart**, de standaardtaal van het rapport en of de soort actief is.
- Dubbelklik op een rij om de soort te openen. **Nieuw soort survey** maakt er een aan.
- Een soort verwijderen kan niet, want oude dossiers verwijzen ernaar. Zet een soort die u niet meer aanbiedt op **niet actief**.
- **Soorten voor de binnenvaart toevoegen** staat er enkel als er een ontbreekt, met het aantal tussen haakjes. De knop voegt de soorten voor de binnenvaart toe die er nog niet zijn: meting op ijkschalen, waardebepaling, schade, aanhuur en afhuur. Wat er al is, blijft zoals het is. Een nieuw bureau heeft ze meteen. Wilt u de meting op ijkschalen in het rapport, zet dan `{{ijkmeting}}` in uw rapportsjabloon (zie [Sjablonen](sjablonen.md)).

![De lijst Soorten survey met de knop Nieuw soort survey](images/soorten-survey.png "De soorten survey")

## Soort survey

Eén soort survey: wat er in het dossier ingevuld wordt en wat de surveyor ter plaatse afloopt.

- **Algemeen**: code, standaardtaal van het rapport, volgorde in de lijsten, actief, en de naam in de vier talen. De code ligt vast zodra er dossiers met deze soort bestaan.
- **Vier-ogen**: aangevinkt, dan wordt een rapport van deze soort pas uitgegeven na de goedkeuring van een tweede surveyor. Zie [Dossiers](dossiers.md#vier-ogen).
- **Vereiste bevoegdheden**: de bevoegdheden die de surveyor geldig moet hebben (bijvoorbeeld IIMS of ADR). Planning en dossier waarschuwen als dat niet zo is. Zie [Bevoegdheden](bevoegdheden.md).
- **Bewaartermijn (jaar)**: hoe lang een afgesloten dossier van deze soort bewaard wordt. Leeg = de termijn van het land van de vestiging. Zie [Bewaartermijnen](bewaartermijnen.md).
- **Draft survey**: aangevinkt, dan krijgen dossiers van deze soort het tabblad Draft survey met begin- en eindmeting. Zie [Dossiers](dossiers.md#draft-survey).
- **Bunker survey**: aangevinkt, dan krijgen dossiers van deze soort het tabblad Bunker met peilingen vóór en na, de leveringsbon en de berekening naar ton. Zie [Dossiers](dossiers.md#bunker-survey).
- **Meting op ijkschalen**: aangevinkt, dan krijgen dossiers van deze soort het tabblad Meting met de ijkschalen vóór en na en de ijkbrief van het binnenschip. Zie [Dossiers](dossiers.md#meting-op-ijkschalen).
- **Vaart**: zeevaart, binnenvaart of beide. Bij een dossier staan de soorten die bij het schip passen bovenaan, en het dossier waarschuwt bij een soort voor de andere vaart. Het weigert niet.
- **Schaal van de checklist**: **In orde / niet in orde / n.v.t.** voor een controle, of een **staat** (goed / redelijk / matig / slecht / n.v.t.) voor een conditiesurvey. Bestaande antwoorden blijven staan zoals ze gegeven zijn.
- **Velden**: de gegevens die een dossier van deze soort bovenop de vaste velden krijgt. Een veld heeft een **sleutel** (kleine letters, cijfers en _, ligt vast na het bewaren, want dossiers bewaren hun waarden eronder), een soort (tekst, getal, datum, ja/nee, keuze of tabel), een label in vier talen, een eenheid en of het verplicht is. Een **tabel** heeft kolommen en eventueel vaste rijen, bijvoorbeeld één rij per ruim. Een veld waarvoor een dossier al een waarde heeft, kunt u niet verwijderen; zet het op niet verplicht als u het niet meer nodig hebt.
- **Checklist**: de punten die de surveyor ter plaatse beantwoordt, elk met een sleutel, een label, en of een antwoord of een foto verplicht is. De link **Standaardbevindingen** opent per bewaard punt de gangbare gebreken, elk met een bevinding, een aanbeveling en een prioriteit, in vier talen. De surveyor zet er één met een tik in zijn antwoord; een gegeven antwoord verandert niet als u ze later wijzigt. Nieuwe punten krijgen die link na **Bewaren**.
- **Rubrieken**: de tekstblokken van het rapport (inleiding, bevindingen, conclusie …). De surveyor schrijft ze op het tabblad Rapport van het dossier; een rapportsjabloon toont ze met de markering in de kolom ernaast. Een nieuw soort survey start met de vijf standaardrubrieken.
- **Werkinstructie** (eigen tabblad): wat de surveyor bij dit soort opdracht doet, één stap per regel, in vier talen. Elk dossier van deze soort toont ze bovenaan, in de taal van de gebruiker, met dezelfde markeringen als de [standaardteksten](standaardteksten.md) ingevuld.
- **Tabbladen** (eigen tabblad): welke tabbladen een dossier van deze soort toont. Vaststellingen, checklist, schade, gezamenlijk, handtekeningen, documenten van boord, codes, tijdlijn en laytime kunt u uitzetten; laytime rekent op de tijdlijn en verdwijnt mee. Wat er al in stond, blijft bewaard (ook in het rapport en het bewijspakket) en komt terug zodra u het weer aanzet.
- Onder **⋯** naast een veld, punt of rubriek staan **Bewerken**, **Hoger**, **Lager** en **Verwijderen**; dubbelklikken opent het ook. De volgorde van de lijst is die van het dossier, de veldapp en het rapport. Wijzigingen aan velden, checklist en rubrieken tellen pas na **Bewaren**; **Annuleren** zet ze terug.

![De pagina Standaardbevindingen met de kolommen Bevinding, Aanbeveling en Prioriteit](images/standaardbevindingen.png "Standaardbevindingen")

Het tabblad **Historiek** toont wie wat wijzigde.

## Zie ook

- [Sjablonen](sjablonen.md)
- [Categorieën en plaatsen](categorieen-en-plaatsen.md)

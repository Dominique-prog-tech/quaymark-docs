---
description: "Facturen en creditnota's: een factuur voorstellen uit een dossier, het klad aanpassen, uitgeven met nummer en betaal-QR, en corrigeren met een creditnota."
---

# Facturen

Alle facturen en creditnota's van het bureau. Een factuur maakt u meestal vanuit het dossier, uit de tijd en de kosten die erop geboekt zijn.

## Het scherm openen

Klik in het menu links op **Facturen**. De lijst toont de nieuwste bovenaan, met de status: **Klad**, **Uitgegeven** of **Gecrediteerd**. Elke gebruiker van het bureau ziet de facturen; opmaken en uitgeven vraagt een apart recht.

## Een factuur voorstellen uit een dossier

1. Open het dossier en kies het tabblad **Tijd en kosten**.
2. Klik op **Factuur voorstellen**.

Quaymark maakt een klad voor de opdrachtgever van het dossier:

- heeft de soort survey een **forfait**, dan komt er één regel met dat bedrag;
- anders komt er per surveyor een regel met zijn uren maal zijn uurtarief, en een aparte regel voor de toeslag (weekend, feestdag of nacht) waar die geldt;
- daarna de kosten die u op **Doorrekenen** zette.

Wat al op een andere factuur staat, telt niet mee. De tarieven komen uit [Tarieven](tarieven.md). Ontbreekt er een uurtarief, dan staat de regel op 0,00 en zegt Quaymark het.

## Het klad aanpassen

Een klad heeft nog geen nummer en kunt u vrij aanpassen: klant, vestiging, datum, taal, referentie en de regels. Met **Regel toevoegen** zet u er een regel bij.

De **btw** is voorgesteld volgens de klant:

- hetzelfde land als het bureau: het gewone tarief;
- een ander land van de EU, met btw-nummer: **verlegd** (de klant betaalt de btw);
- een ander land van de EU, zonder btw-nummer: het gewone tarief;
- een land buiten de EU: **buiten toepassingsgebied**.

Moet het anders, pas het dan per regel aan. Op de factuur komt de wettelijke vermelding die bij verlegd of buiten toepassingsgebied hoort.

**Voorbeeld (PDF)** toont de factuur zoals ze zal vertrekken, met VOORBEELD erop. Er wordt niets bewaard.

## Uitgeven

Klik op **Uitgeven** en bevestig. De factuur krijgt dan:

- haar **nummer**, per vestiging en per jaar (F-HQ-2026-0001);
- de **vervaldatum** volgens de betaaltermijn van het bureau;
- een **gestructureerde mededeling** en een **betaal-QR** die een bankapp kan scannen.

De PDF wordt vastgelegd met haar vingerafdruk (SHA-256). Daarna kan de factuur niet meer gewijzigd of verwijderd worden. Een factuur mag niet in de toekomst liggen, en niet vroeger dan de laatst uitgegeven factuur van dezelfde vestiging.

## Versturen via Peppol

Een uitgegeven factuur of creditnota kunt u elektronisch naar de boekhouding van de klant sturen met **Via Peppol versturen**. Quaymark kijkt eerst na of de klant op het Peppol-netwerk staat. Daarvoor is zijn btw-nummer nodig: vul het in op zijn [relatiefiche](relaties.md).

Elke poging staat in het blok **Peppol** van de factuur:

- **Aanvaard**: de factuur is vertrokken. Met **Status opvragen** ziet u of ze afgeleverd is.
- **Geweigerd**: de reden staat erbij. Zet ze recht en verstuur opnieuw.
- **Onbekend**: er kwam geen duidelijk antwoord. De factuur kan vertrokken zijn. Vraag de status op, of verstuur gerust opnieuw: dezelfde factuur vertrekt geen twee keer.

Staat de klant niet op Peppol, dan bezorgt u de PDF op een andere manier.

## Corrigeren met een creditnota

Een fout op een uitgegeven factuur zet u recht met **Creditnota maken**. Er komt een klad-creditnota voor het volledige bedrag. Pas na het uitgeven van de creditnota is de factuur gecrediteerd, en komen haar prestaties en kosten weer vrij voor een nieuwe factuur.

## Een losse factuur

Met **Nieuwe factuur** in de lijst maakt u een factuur zonder tijd of kosten, bijvoorbeeld voor een voorschot.

## Zie ook

- [Bureaugegevens](bureaugegevens.md)
- [Tarieven](tarieven.md)
- [Sjablonen](sjablonen.md)

---
description: "Opdrachten uit het opdrachtgeversportaal en het webformulier op uw website: bekijken, aanvaarden of weigeren."
---

# Aanvragen

Opdrachten die opdrachtgevers indienden in het opdrachtgeversportaal, of iemand via het aanvraagformulier op de website van het bureau. Een aanvraag wordt pas een dossier als het bureau ze aanvaardt.

## Het scherm openen

Klik in het menu links op **Aanvragen**. Wachten er aanvragen, dan meldt het startscherm hoeveel.

## De lijst

- Standaard ziet u enkel de aanvragen die op een beslissing wachten. Vink **Ook aanvaard of geweigerd** aan voor de rest. Die keuze blijft staan als u een aanvraag opent en terugkeert.
- Dubbelklik op een rij om de aanvraag te openen.
- De kolom **Bron** zegt waar de aanvraag vandaan komt: **Portaal** of **Website**. Een webaanvraag heeft nog geen opdrachtgever: de kolom **Opdrachtgever** toont dan wie ze indiende.

## Aanvraag

Links staat wat de opdrachtgever invulde: wie de aanvraag indiende, de soort survey, het schip, de haven en terminal, de gewenste datum, de referentie, de omschrijving en de bijlagen (bijvoorbeeld de opdrachtbrief of het stuwplan). Een pdf opent in een venster, een ander bestand wordt gedownload.

- **Aanvaarden**: kies de vestiging, het schip, de surveyor, het tijdstip en de taal van het rapport. Bij het schip stelt Quaymark een bestaand schip voor als het IMO-nummer, het ENI-nummer of de naam overeenkomt; anders een nieuw schip uit de gegevens van de aanvraag. Het gewenste tijdstip staat al ingevuld. Met een surveyor en een tijdstip wordt het dossier **Gepland**, anders **Nieuw**. Quaymark maakt dan het dossier, kopieert de bijlagen naar het tabblad **Documenten** en stuurt de opdrachtgever een mail. Ontbreekt er nog iets (de vestiging, of bij een webaanvraag de opdrachtgever of de soort survey), dan zegt een melding bovenaan het formulier wat; Quaymark maakt dan nog niets aan.
- Werkt het bureau met dit schip voor een andere opdrachtgever, en is deze opdrachtgever daar partij, dan staat er een waarschuwing boven **Aanvaarden**. → [Belangenconflicten](dossiers.md#belangenconflicten)
- **Weigeren** vraagt een reden. De opdrachtgever ziet die in het portaal en in de mail.
- Beslissen kan met het recht om dossiers te bewerken. Over een aanvraag wordt maar één keer beslist: klikken twee collega's tegelijk, dan krijgt de tweede de melding dat er al beslist is.

## Webformulier

Het bureau kan een aanvraagformulier op zijn eigen website zetten. Wie het invult, heeft geen account nodig. Het formulier stuurt de gegevens naar Quaymark, en een halve minuut later staat de aanvraag op dit scherm, met de badge **Website** en een melding op het belletje rechtsboven.

- **Opzetten**: vraag ADM-Concept een websitesleutel voor uw bureau, en geef die aan uw webbouwer met de technische uitleg op <https://platform.digitalcloud.be/docs/leads-contactformulier>. → [Hoe zet ik een aanvraagformulier op onze website?](hoe/aanvraagformulier.md)
- **De velden**: naam, e-mail, telefoon, bedrijf, onderwerp en bericht komen altijd mee. Wil u dat Quaymark ook het schip, de haven of de soort survey invult, geef de velden dan een van de namen hieronder (hoofdletters, accenten en spaties tellen niet). Al de rest, en een waarde die niet klopt (een fout IMO-nummer, een haven die geen UN/LOCODE is), komt in de omschrijving. Er gaat niets verloren.

| Veld | Veldnaam (een van) | Waarde |
|---|---|---|
| Schip | schip, ship, vessel, navire, Schiff | de naam |
| IMO | imo, IMO-nummer | 7 cijfers, gecontroleerd |
| ENI | eni, ENI-nummer | 8 cijfers |
| Haven | haven, port, Hafen, locode | UN/LOCODE, bv. BEANR |
| Terminal | terminal, kaai, quai, quay, Kai | vrije tekst |
| Soort survey | soort survey, survey type, type d'expertise, Besichtigungsart | de code of de naam van een soort survey |
| Gewenste datum | gewenste datum, preferred date, date souhaitée, Wunschtermin | 20/11/2026 of 2026-11-20 14:30, in de tijd van het bureau |
| Referentie | referentie, reference, référence, Referenz | de referentie van de aanvrager |

- **De opdrachtgever**: bij **Aanvaarden** kiest u de opdrachtgever. Heeft een relatie of een contactpersoon hetzelfde e-mailadres als de indiener, dan staat die relatie voorgesteld. U kiest ook een andere, of **Nieuwe relatie** maakt er een uit de gegevens van de indiener (een bedrijf met de indiener als contactpersoon, of een persoon). Werd de soort survey niet herkend, dan kiest u ze hier ook.
- **De indiener** krijgt een mail als de aanvraag aanvaard of geweigerd wordt, in de taal van het formulier. Die mail heeft geen link: hij heeft geen toegang tot het portaal.

## Meldingen aan de opdrachtgever

De portaalgebruikers van de opdrachtgever krijgen een mail als hun aanvraag aanvaard of geweigerd wordt, als een dossier gepland of verplaatst wordt, en als er een rapport, brief, certificaat of factuur uitgegeven wordt. De mail bevat geen bijlage, wel een link naar het portaal. U zet het per relatie uit op het tabblad Opdrachtgeversportaal; elke gebruiker kan het ook zelf uitzetten. Elke verstuurde melding staat in het journaal van het dossier.

## Zie ook

- [Relaties](relaties.md#opdrachtgeversportaal)
- [Dossiers](dossiers.md)

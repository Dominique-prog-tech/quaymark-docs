---
description: "Missions venant du portail des donneurs d'ordre et du formulaire web de votre site : consulter, accepter ou refuser."
---

# Demandes

Les missions envoyées par les donneurs d'ordre dans le portail des donneurs d'ordre, ou par quelqu'un via le formulaire de demande sur le site web du bureau. Une demande ne devient un dossier que lorsque le bureau l'accepte.

## Ouvrir l'écran

Cliquez sur **Demandes** dans le menu de gauche. S'il y a des demandes en attente, l'écran d'accueil indique combien.

## La liste

- Par défaut, vous ne voyez que les demandes qui attendent une décision. Cochez **Également acceptées ou refusées** pour le reste. Ce choix est conservé quand vous ouvrez une demande et revenez à la liste.
- Double-cliquez sur une ligne pour ouvrir la demande.
- La colonne **Source** indique d'où vient la demande : **Portail** ou **Site web**. Une demande web n'a pas encore de donneur d'ordre : la colonne **Donneur d'ordre** affiche alors qui l'a envoyée.

## Demande

À gauche figure ce que le donneur d'ordre a rempli : qui a envoyé la demande, le type d'expertise, le navire, le port et le terminal, la date souhaitée, la référence, la description et les pièces jointes (par exemple la lettre de mission ou le plan de chargement). Un PDF s'ouvre dans une fenêtre, un autre fichier est téléchargé.

- **Accepter** : choisissez le site, le navire, l'expert, la date et la langue du rapport. Pour le navire, Quaymark propose un navire existant si le numéro IMO, le numéro ENI ou le nom correspond ; sinon un nouveau navire à partir des données de la demande. Si la demande n'avait pas de numéro OMI ou ENI (le donneur d'ordre n'est pas obligé de le remplir), indiquez pour un nouveau navire le **Type** et le **Numéro OMI** ou le **Numéro ENI** ; sans numéro, Quaymark ne crée pas de navire. Si le numéro appartient déjà à un navire, le champ le signale et Quaymark reprend ce navire. La date souhaitée est déjà remplie. Avec un expert et une date, le dossier devient **Planifié**, sinon **Nouveau**. Quaymark crée alors le dossier, copie les pièces jointes dans l'onglet **Documents** et envoie un e-mail au donneur d'ordre. S'il manque encore quelque chose (le site, ou pour une demande web le donneur d'ordre ou le type d'expertise), un message en haut du formulaire le précise ; Quaymark ne crée alors encore rien.
- Si le bureau travaille avec ce navire pour un autre donneur d'ordre et que ce donneur d'ordre y est partie, un avertissement apparaît au-dessus d'**Accepter**. → [Conflits d'intérêts](dossiers.md#conflits-dinterets)
- **Refuser** demande un motif. Le donneur d'ordre le voit dans le portail et dans l'e-mail.
- Décider demande le droit de modifier les dossiers. Une demande n'est traitée qu'une seule fois : si deux collègues cliquent en même temps, le second est averti que la décision est déjà prise.

## Formulaire web

Le bureau peut placer un formulaire de demande sur son propre site web. La personne qui le remplit n'a pas besoin de compte. Le formulaire envoie les données à Quaymark, et une demi-minute plus tard la demande figure sur cet écran, avec le badge **Site web** et une notification sur la cloche en haut à droite.

- **Mise en place** : demandez à ADM-Concept une clé de site web pour votre bureau, et transmettez-la à votre webdesigner avec l'explication technique sur <https://platform.digitalcloud.be/docs/leads-contactformulier>. → [Comment placer un formulaire de demande sur notre site web ?](hoe/aanvraagformulier.md)
- **Les champs** : nom, e-mail, téléphone, entreprise, objet et message sont toujours transmis. Pour que Quaymark complète aussi le navire, le port ou le type d'expertise, donnez aux champs un des noms ci-dessous (majuscules, accents et espaces ne comptent pas). Tout le reste, et une valeur incorrecte (un numéro IMO erroné, un port qui n'est pas un UN/LOCODE), va dans la description. Rien ne se perd.

| Champ | Nom du champ (un des) | Valeur |
|---|---|---|
| Navire | navire, schip, ship, vessel, Schiff | le nom |
| IMO | imo, numéro IMO | 7 chiffres, contrôlés |
| ENI | eni, numéro ENI | 8 chiffres |
| Port | port, haven, Hafen, locode | UN/LOCODE, p. ex. BEANR |
| Terminal | terminal, quai, kaai, quay, Kai | texte libre |
| Type d'expertise | type d'expertise, soort survey, survey type, Besichtigungsart | le code ou le nom d'un type d'expertise |
| Date souhaitée | date souhaitée, gewenste datum, preferred date, Wunschtermin | 20/11/2026 ou 2026-11-20 14:30, à l'heure du bureau |
| Référence | référence, referentie, reference, Referenz | la référence du demandeur |

- **Le donneur d'ordre** : lors de **Accepter**, vous choisissez le donneur d'ordre. Si une relation ou un contact a la même adresse e-mail que le demandeur, cette relation est proposée. Vous pouvez en choisir une autre, ou **Nouvelle relation** en crée une à partir des données du demandeur (une entreprise avec le demandeur comme contact, ou une personne). Si le type d'expertise n'a pas été reconnu, vous le choisissez ici aussi.
- **Le demandeur** reçoit un e-mail lorsque la demande est acceptée ou refusée, dans la langue du formulaire. Cet e-mail n'a pas de lien : il n'a pas accès au portail.

## Notifications au donneur d'ordre

Les utilisateurs du portail du donneur d'ordre reçoivent un e-mail lorsque leur demande est acceptée ou refusée, lorsqu'un dossier est planifié ou déplacé, lorsque le bureau envoie une offre ou un message, et lorsqu'un rapport, une lettre, un certificat ou une facture est émis. L'e-mail ne contient pas de pièce jointe, mais un lien vers le portail. Vous le désactivez par relation dans l'onglet Portail des donneurs d'ordre ; chaque utilisateur peut aussi le désactiver lui-même (si elles sont désactivées pour la relation, la page Notifications du portail le dit). Chaque notification envoyée figure dans le journal du dossier.

## Voir aussi

- [Relations](relaties.md#portail-des-donneurs-dordre)
- [Dossiers](dossiers.md)

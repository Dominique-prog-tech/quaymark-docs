---
description: "Factures et notes de crédit : proposer une facture depuis un dossier, adapter le brouillon, l'émettre avec numéro et QR de paiement, et la corriger par une note de crédit."
---

# Factures

Toutes les factures et notes de crédit du bureau. Une facture se crée en général depuis le dossier, à partir du temps et des frais qui y sont encodés.

## Ouvrir l'écran

Cliquez sur **Factures** dans le menu de gauche. La liste montre les plus récentes en haut. Le statut apparaît sous forme d'étiquette colorée :

- **Brouillon** : pas encore de numéro, librement modifiable ;
- **Ouverte** : émise et pas encore entièrement payée ;
- **Échue** : la date d'échéance est passée et il reste un montant dû ;
- **Payée** : entièrement payée (voir [Paiements](betalingen.md)) ;
- **Créditée** : corrigée par une note de crédit.

Une note de crédit elle-même est **Émise**, avec un signe moins devant le montant : ainsi, un export totalise ce qui a réellement été facturé. La colonne **Solde dû** montre ce qui reste à payer sur une facture. Choisissez **À payer** dans **Statut** pour ne voir que les factures ouvertes et échues. Le même statut figure sur la facture elle-même et dans l'onglet **Temps et frais** du dossier.

Chaque utilisateur du bureau voit les factures ; les établir et les émettre demande un droit distinct.

![Factures avec Nouvelle facture et un Brouillon pour HQ-2026-0007](images/facturen-fr.png "Les factures")

## Proposer une facture depuis un dossier

1. Ouvrez le dossier et choisissez l'onglet **Temps et frais**.
2. Cliquez sur **Proposer une facture**.

Quaymark crée un brouillon pour le donneur d'ordre du dossier :

- si le type d'expertise a un **forfait**, une ligne avec ce montant ;
- sinon une ligne par expert avec ses heures multipliées par son tarif horaire, et une ligne distincte pour le supplément (week-end, jour férié ou nuit) lorsqu'il s'applique ;
- ensuite les frais marqués **Refacturer**.

Ce qui figure déjà sur une autre facture n'est pas repris. Les tarifs viennent de [Tarifs](tarieven.md). S'il manque un tarif horaire, la ligne est à 0,00 et Quaymark le signale.

## Adapter le brouillon

Un brouillon n'a pas encore de numéro et se modifie librement : client, site, date, langue, référence et lignes. **Ajouter une ligne** ajoute une ligne. La **devise** se choisit dans la même liste que sur le dossier. Un brouillon inutile se jette avec **Supprimer**, à droite en rouge.

![Un Brouillon avec Client, Site, Lignes et Ajouter une ligne](images/factuur-fr.png "Un brouillon de facture")

La **TVA** est proposée selon le client :

- le même pays que le bureau : le taux normal ;
- un autre pays de l'UE, avec numéro de TVA : **autoliquidation** (le client paie la TVA) ;
- un autre pays de l'UE, sans numéro de TVA : le taux normal ;
- un pays hors UE : **hors champ**.

Si nécessaire, adaptez-la par ligne. La mention légale qui accompagne l'autoliquidation ou le hors champ figure sur la facture.

**Aperçu (PDF)** montre la facture telle qu'elle partira, avec APERÇU dessus. Rien n'est enregistré.

## Émettre

Cliquez sur **Émettre** et confirmez. La facture reçoit alors :

- son **numéro**, par site et par année (F-HQ-2026-0001) ;
- son **échéance** selon le délai de paiement du bureau ;
- une **communication structurée** et un **QR de paiement** qu'une application bancaire peut scanner.

Le PDF est figé avec son empreinte (SHA-256). La facture ne peut ensuite plus être modifiée ni supprimée. Une facture ne peut pas être datée dans le futur, ni avant la dernière facture émise du même site.

## Envoyer via Peppol

Une facture ou une note de crédit émise peut être envoyée par voie électronique à la comptabilité du client avec **Envoyer via Peppol**. Quaymark vérifie d'abord que le client est sur le réseau Peppol. Son numéro de TVA est nécessaire : complétez-le sur sa [fiche relation](relaties.md).

Chaque tentative figure dans le bloc **Peppol** de la facture :

- **Acceptée** : la facture est partie. **Demander le statut** indique si elle a été livrée.
- **Refusée** : la raison est indiquée. Corrigez-la et renvoyez.
- **Inconnu** : pas de réponse claire. La facture est peut-être partie. Demandez le statut, ou renvoyez sans crainte : la même facture ne part pas deux fois.

Si le client n'est pas sur Peppol, transmettez le PDF autrement.

## Devises étrangères

Une facture reçoit la devise du [dossier](dossiers.md). Si ce n'est pas l'euro :

- la **proposition** convertit les [tarifs](tarieven.md), exprimés en euros, dans la devise du dossier, au taux de référence de la Banque centrale européenne (BCE). Quaymark indique le taux utilisé. Les frais se saisissent dans la devise du dossier : ils ne sont pas convertis ;
- à l'**émission**, Quaymark fixe le taux de la date de facture : le dernier publié par la BCE ce jour-là ou avant. La facture mentionne la **contre-valeur en euros** : hors TVA, la TVA et TVA comprise, avec le taux et sa date. Le taux et la contre-valeur figurent aussi sur la facture dans Quaymark ;
- le **chiffre d'affaires** de la page d'accueil compte en euros, au taux de chaque facture ;
- **Peppol** ne peut pas encore envoyer la facture : le bloc **Peppol** le dit tout de suite, sans bouton. Transmettez le PDF autrement.

Sans taux (le taux de la BCE est momentanément indisponible), Quaymark n'émet pas la facture et le signale. Réessayez plus tard : Quaymark ne calcule jamais avec un taux estimé ou ancien. Une facture en euros n'est pas concernée.

## Corriger par une note de crédit

Une erreur sur une facture émise se corrige avec **Créer une note de crédit**. Un brouillon de note de crédit est créé pour le montant total. Ce n'est qu'après son émission que la facture est créditée et que ses prestations et frais sont libérés pour une nouvelle facture.

## Une facture indépendante

**Nouvelle facture** dans la liste crée une facture sans temps ni frais, par exemple pour un acompte.

## À facturer

Le travail de chaque dossier qui ne figure encore sur aucune facture : les prestations ouvertes, les frais à refacturer et le forfait des dossiers terminés, en estimation hors TVA, dans la devise du dossier. L'estimation calcule comme la proposition de facture, avec les suppléments de week-end, de nuit et des jours fériés du pays du site. Ouvrez la liste avec **À facturer** sur cette page, ou avec la carte **Travail non facturé** du tableau de bord.

- La plus grande estimation est en haut.
- Un clic sur une ligne ouvre l'onglet **Temps et frais** du dossier : c'est là que vous proposez la facture. → [Proposer une facture depuis un dossier](#proposer-une-facture-depuis-un-dossier)

## Voir aussi

- [Données du bureau](bureaugegevens.md)
- [Tarifs](tarieven.md)
- [Modèles](sjablonen.md)

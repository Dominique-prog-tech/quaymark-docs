---
description: "Les recettes du flux bancaire lettrées sur les factures, automatiquement quand la communication et le montant correspondent, et des rappels en trois étapes."
---

# Paiements

Cet écran montre quelles factures sont payées et ce qui reste dû. Les opérations sur le compte bancaire du bureau viennent du flux bancaire d'ADM One.

## Ouvrir l'écran

Dans le menu, cliquez sur **Paiements**. Consulter demande le droit de consulter les factures ; lettrer, enregistrer et rappeler, le droit de modifier les factures.

## Lier la banque

L'administrateur lie le compte bancaire du bureau dans le portail ADM One (Banque). Quaymark n'a rien à faire pour cela. En haut de l'écran figure le compte lié. Si la banque demande de relier à nouveau (après environ 180 jours), c'est indiqué aussi ; d'ici là, rien de nouveau n'arrive.

Quaymark récupère les opérations à l'ouverture de l'écran, au plus toutes les cinq minutes. **Récupérer maintenant** le fait immédiatement.

## Lettrage automatique

Si la communication structurée d'une facture figure dans l'opération et que le montant est exactement le solde de cette facture, la facture est payée immédiatement. La facture indique alors **Entièrement payée**, avec le paiement en dessous.

## À traiter

Les recettes que Quaymark n'a pas lettrées lui-même, avec une **Proposition** quand c'est possible :

- la communication correspond, mais pas le montant (paiement partiel, ou trop payé) ;
- le numéro de facture figure dans le texte du virement ;
- le montant est exactement le solde d'une seule facture d'un client portant ce nom ;
- la communication désigne une facture dans une autre devise. Le lettrage est alors impossible : enregistrez le paiement sur cette facture avec **Enregistrer un paiement**, dans la devise de la facture, puis écartez l'opération.

**Lettrer** impute l'opération sur la facture choisie. Vous pouvez aussi imputer une partie du montant et le reste sur une autre facture. Le lettrage ne se fait qu'avec une facture dans la même devise que l'opération ; la colonne **Devise** l'indique. **Écarter** retire une opération qui n'est pas un paiement de client, par exemple un remboursement ou un virement entre vos propres comptes. Quaymark demande d'abord confirmation. Avec **Afficher aussi les écartées**, vous la revoyez, et **Rétablir** la remet sous À traiter.

## Ouvert

Les factures émises avec un solde, l'échéance la plus ancienne en premier, avec le statut (**Ouverte** ou **Échue**, comme dans la liste [Factures](facturen.md)) et les jours de retard pour une facture échue. Une note de crédit sur une facture est prise en compte dans le solde.

**Enregistrer un paiement** sert pour un paiement absent du flux bancaire : en espèces, sur un autre compte ou par compensation. Indiquez sous **Remarque** comment le paiement a été fait.

## Rappels

Après le nombre de jours indiqué dans [Données du bureau](bureaugegevens.md) (par défaut 7, 21 et 35 après l'échéance), la facture affiche **Envoyer : Rappel**, puis **Envoyer : Deuxième rappel** et **Envoyer : Mise en demeure**. Entre deux étapes, il y a au moins la différence entre leurs délais (14 jours par défaut), même si vous commencez tard à rappeler. Un rappel ne part jamais tout seul : uniquement d'un clic, après une confirmation.

L'e-mail part via ADM One vers l'adresse sur la facture (sinon celle de la relation), dans la langue de la facture, avec la facture en PDF, le montant dû, le compte et la communication structurée. Il figure aussi dans le journal de la relation. Chaque étape est possible une fois par facture.

## Traité

Les paiements lettrés, avec le client, la devise, la remarque et qui les a lettrés. Un double-clic ouvre la facture. Au-delà de 200, la liste affiche les 200 derniers et le titre le dit. **Annuler** défait un mauvais lettrage : le paiement ne compte plus et l'opération revient sous À traiter. Le paiement reste conservé, avec qui l'a annulé.

## Voir aussi

- [Factures](facturen.md)
- [Données du bureau](bureaugegevens.md)
- [Relations](relaties.md)

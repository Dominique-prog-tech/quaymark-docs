---
description: "Offres aux donneurs d'ordre : rédiger, envoyer, accepter dans le portail ou par le bureau, et le dossier qui en découle."
---

# Offres

Une offre à un donneur d'ordre, dans la langue de celui-ci. Acceptée, elle devient un dossier, et ses lignes deviennent le forfait de ce dossier.

## Ouvrir l'écran

Cliquez sur **Offres** dans le menu de gauche. Vous voyez les offres avec leur numéro, donneur d'ordre, type d'expertise, navire, validité, total et statut, et pour une offre acceptée le dossier qui en est issu. Le statut est brouillon, envoyée, acceptée, refusée ou expirée. Le statut apparaît sous forme d'étiquette colorée, comme sur l'offre elle-même et dans le portail des donneurs d'ordre : vert acceptée, rouge refusée, bleu envoyée, gris brouillon ou expirée. La consultation demande le droit de consulter les factures ; rédiger, envoyer et décider, le droit de modifier les factures.

## Offre

- **Nouvelle offre** crée un brouillon. Indiquez le donneur d'ordre, le site, le type d'expertise, la date et **Valable jusqu'au** (trente jours par défaut), et éventuellement le navire, le port, la référence et une description. La langue suit le donneur d'ordre. La devise se choisit parmi EUR, USD ou GBP, comme sur le dossier.
- **Navire** : choisissez un navire que Quaymark connaît déjà, ou **Nouveau navire…**. Pour un nouveau navire, indiquez le **Nom du navire**, le **Type** (navigation maritime ou intérieure) et le **Numéro OMI** ou le **Numéro ENI**. Le champ indique tout de suite si le numéro est correct, et s'il appartient déjà à un navire : Quaymark reprend alors ce navire. Si le navire n'est pas encore connu, laissez-le vide.
- **Ligne d'après les tarifs** prépare une ligne avec le forfait du type d'expertise, ou une heure au tarif horaire : indiquez alors le nombre d'heures estimées. Un [accord-cadre](relaties.md#accords-cadres) du donneur d'ordre est pris en compte. Les lignes peuvent être ajoutées, modifiées et supprimées librement tant que l'offre est un brouillon.
- **Aperçu (PDF)** montre l'offre telle qu'elle part. La mise en page vient du modèle « Offre ». → [Modèles](sjablonen.md)

## Envoyer

**Envoyer** attribue son numéro à l'offre (par exemple O-HQ-2026-0001), crée le PDF avec son empreinte et annonce l'offre aux utilisateurs du portail du donneur d'ordre. Indiquez une adresse pour envoyer aussi le PDF par e-mail ; vide, c'est le portail uniquement. Ensuite les lignes sont figées, et l'offre indique quand elle a été envoyée.

Un nouveau navire sans numéro OMI ou ENI bloque l'offre : le donneur d'ordre peut l'accepter dans le portail, et personne n'y ajoutera plus de numéro. Indiquez le numéro, choisissez un navire connu, ou laissez le navire vide.

## Accepter ou refuser

- Le donneur d'ordre peut accepter ou refuser l'offre dans le **portail des donneurs d'ordre**, tant qu'elle est valable. → [Portail des donneurs d'ordre](relaties.md#portail-des-donneurs-dordre)
- Si vous avez reçu la réponse par e-mail ou par téléphone, cliquez vous-même sur **Accepter** ou **Refuser**. Avec Refuser, vous pouvez indiquer un motif ; il figure ensuite sur l'offre.
- Accepter crée un **dossier** au statut Nouveau, avec le donneur d'ordre, le type d'expertise, le navire, le port et la référence. Quaymark reprend un navire connu (sur son numéro, ou sur un nom que porte un seul navire) ; un nouveau navire reçoit une fiche avec le numéro de l'offre. Une offre plus ancienne avec seulement un nom que Quaymark ne connaît pas devient un dossier sans navire ; le nom figure alors dans une note du **Journal** du dossier, et vous choisissez ou créez le navire dans le dossier. Vous choisissez ensuite l'expert et la planification dans le dossier.
- Les lignes de l'offre constituent le **forfait** du dossier : la proposition de facture les reprend, et l'indique.
- Une offre n'est traitée qu'une seule fois. Après **Valable jusqu'au**, elle est expirée et ne peut plus être acceptée.

## Voir aussi

- [Factures](facturen.md)
- [Relations](relaties.md#accords-cadres)

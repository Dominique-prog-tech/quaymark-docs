---
description: "Le donneur d'ordre confirme la mission et les conditions générales du bureau, par un lien ou dans le portail client ; avec la preuve de qui, quand et quelle version."
---

# Confirmation de mission

Avec une confirmation de mission, vous établissez que le donneur d'ordre accepte la mission, le tarif et les conditions générales du bureau. Le donneur d'ordre confirme par un lien dans un e-mail, ou dans le portail client.

## Définir les conditions générales

Dans le menu, cliquez sur **Paramètres**, **Conditions générales**. Cet écran demande le droit de gérer les conditions générales (par défaut, seul l'administrateur).

1. Cliquez sur **Nouvelle version**. Le texte de la version en vigueur est déjà prêt, en quatre langues.
2. Adaptez le texte. Le texte néerlandais est obligatoire ; une langue laissée vide affiche le texte néerlandais.
3. Cliquez sur **Enregistrer la version**.

La nouvelle version s'applique à chaque confirmation envoyée ensuite. Une version n'est jamais modifiée ni supprimée : le donneur d'ordre accepte toujours une version précise. Cliquez sur une version pour voir son texte et son empreinte (SHA-256).

Sans conditions générales, aucune confirmation de mission ne peut partir.

## Envoyer une confirmation

En haut de la fiche du dossier se trouve le cadre **Confirmation de mission**, avec l'état du dossier.

1. Enregistrez le dossier avec un donneur d'ordre.
2. Cliquez sur **Envoyer la confirmation**.
3. Choisissez la **Personne de contact** du donneur d'ordre, ou choisissez **Autre adresse** et remplissez l'**E-mail**.
4. Cliquez sur **Envoyer**.

Le donneur d'ordre reçoit un e-mail avec un lien. Le lien est valable 14 jours. **Renvoyer** crée un nouveau lien et retire le précédent ; **Retirer** invalide le lien sans en envoyer un nouveau.

La confirmation décrit la mission : le numéro de dossier, le type d'expertise, le navire, le port, la date, la référence du donneur d'ordre, le tarif et la description. Le tarif provient de l'offre acceptée, sinon de l'accord-cadre avec le donneur d'ordre, sinon des tarifs du bureau. → [Tarifs](tarieven.md)

## Ce que voit le donneur d'ordre

Le lien ouvre une page avec la mission et les conditions générales, en quatre langues. Le donneur d'ordre tape son nom complet, coche qu'il est d'accord et clique sur **Confirmer la mission**. Il peut aussi choisir **Je ne confirme pas cette mission**. Ensuite, le lien ne fonctionne plus.

Si le donneur d'ordre a accès au portail client, il voit la même confirmation dans le dossier et peut aussi y confirmer ou refuser. → [Comment donner accès à un donneur d'ordre ?](hoe/klantenportaal.md)

## L'état du dossier

- **Non envoyée** : aucune confirmation n'a encore été envoyée.
- **Envoyée** : le donneur d'ordre n'a pas encore répondu.
- **Acceptée** : avec le nom tapé par le donneur d'ordre, l'heure, le canal (par le lien ou dans le portail client) et la version des conditions.
- **Refusée** : le donneur d'ordre ne confirme pas cette mission. Prenez contact et envoyez au besoin une nouvelle confirmation.
- **Expirée** : le lien a expiré après 14 jours sans réponse.
- **Retirée** : le bureau a retiré le lien.
- **Confirmée par l'offre** ou **Confirmée par la demande** : le dossier est issu d'une offre acceptée par le donneur d'ordre, ou d'une demande dans le portail client. Une confirmation séparée n'est alors pas nécessaire. → [Offres](offertes.md), [Demandes](aanvragen.md)

Chaque acceptation ou refus apparaît aussi comme note dans le journal du dossier.

## Ce qui est conservé

Quaymark conserve ce que le donneur d'ordre a vu (la mission et la version des conditions, avec une empreinte), et pour une réponse par le lien le nom, l'heure, l'adresse IP, le navigateur et l'empreinte de la page affichée. Dans le portail client, c'est le compte du donneur d'ordre. Tout cela est uniquement ajouté, jamais modifié. Si un dossier est effacé après son délai de conservation, sa confirmation l'est aussi. → [Délais de conservation](bewaartermijnen.md)

## Émettre un rapport sans confirmation

Si le dossier n'a pas de confirmation acceptée, l'onglet **Rapport** affiche un avertissement. À l'émission, Quaymark demande une **Justification** : pourquoi émettez-vous quand même le rapport ? Elle est conservée avec votre nom et l'heure, et figure ensuite dans le cadre **Confirmation de mission**. Cliquez sur **Continuer l'émission** pour poursuivre. → [Dossiers](dossiers.md)

## Voir aussi

- [Dossiers](dossiers.md)
- [Offres](offertes.md)
- [Tarifs](tarieven.md)

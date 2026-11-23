---
description: "Constatations et photos dans l'application de terrain : ce que l'appareil enregistre à la prise de vue, et pourquoi une constatation est seulement ajoutée."
---

# Constatations et photos

Une **constatation**, c'est ce que vous voyez à bord : un enfoncement du plafond de ballast de la cale 3, une cargaison mouillée, un joint de panneau endommagé. Avec ses photos, c'est la preuve dans le rapport.

## Ajouter une constatation

Touchez **Nouvelle constatation** en bas du dossier, ou **Ajouter** sur la carte **Constatations**.

![L'écran Nouvelle constatation, rempli : Emplacement à bord, Numéro / bord, Catégorie, Gravité et Description, sous Photos une photo avec le début de son empreinte, une punaise et le signe de la photothèque, les boutons Photo et De la photothèque, et Enregistrer.](../images/app-vaststelling-fr.png "Nouvelle constatation"){ width="320" }

1. Choisissez l'**Emplacement à bord** et indiquez éventuellement le **Numéro / bord**, par exemple *3* ou *TB*.
2. Choisissez la **Catégorie** et la **Gravité** : **Aucune**, **Légère**, **Modérée** ou **Grave**.
3. Décrivez ce que vous voyez dans **Description**.
4. Ajoutez des photos sous **Photos** : **Photo** ouvre l'appareil photo, **De la photothèque** choisit une photo déjà sur l'appareil.
5. Touchez **Enregistrer**.

L'emplacement, la catégorie et la description sont obligatoires. Les choix d'emplacement et de catégorie viennent de votre bureau. → [Listes de choix](../categorieen-en-plaatsen.md)

La constatation apparaît aussitôt sur la carte, avec un nuage tant qu'elle n'est pas envoyée. Les photos partent après leur constatation.

## Ce que l'appareil enregistre avec une photo

Au moment où vous prenez la photo, l'application enregistre :

- l'**heure**, d'abord, avant même la position ;
- la **position GPS** et sa précision. S'il n'y a pas de position (pas d'autorisation, pas de réception dans une cale), l'application enregistre pourquoi ;
- l'**empreinte** (SHA-256) de la photo.

À côté de chaque photo, l'écran affiche les premiers caractères de l'empreinte, avec 📍 s'il y a une position, et 🖼 pour une photo de la photothèque. La photo reste inchangée : l'application ne réduit rien et ne modifie rien. Quaymark recalcule l'empreinte à l'arrivée de la photo. Si la photo a été modifiée sur l'appareil entre-temps, elle ne part pas.

Une photo **De la photothèque** porte cette marque : le bureau voit qu'elle n'a pas été prise avec l'appareil photo de l'application. Pour la preuve, prenez donc de préférence la photo avec **Photo**.

Une fois la photo envoyée et son empreinte recalculée par Quaymark, l'application efface sa copie de l'appareil. L'original est alors au bureau.

## Rectifier une constatation

Une constatation est seulement **ajoutée**, jamais modifiée ni supprimée : on peut ainsi établir ce qui a été noté à bord. Vous ne pouvez donc pas la modifier dans l'application. Une erreur se corrige au bureau avec **Rectifier**, et un motif ; l'ancienne version reste visible, barrée. → [Constatations](../dossiers.md#constatations)

Si vous voyez l'erreur avant l'envoi, vous pouvez supprimer la constatation dans **À envoyer**. Ses photos disparaissent avec elle. → [Hors connexion](zonder-bereik.md)

## Erreurs fréquentes

!!! warning "Pas d'appareil photo"
    Si l'application ne trouve pas d'appareil photo, elle le dit et ouvre la photothèque. Utilisez alors une photo prise avec l'appareil.

!!! warning "Une photo sans position"
    Autorisez l'application à utiliser votre position (dans les réglages de l'appareil). Au fond d'une cale, la réception GPS manque parfois : la photo part alors sans position, avec le motif.

## Voir aussi

- [La check-list](checklist.md)
- [Faire signer](laten-tekenen.md) — faire signer les constatations
- [Constatations](../dossiers.md#constatations) — au bureau

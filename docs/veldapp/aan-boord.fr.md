---
description: "Consigner à bord avec l'application de terrain : notes vocales, codes scannés, documents de bord et sondages d'une expertise de soutes."
---

# Consigner à bord

Outre les constatations, vous consignez aussi à bord des notes, des codes, des documents et des sondages. Chacun a sa carte sur le dossier, et tout fonctionne hors connexion.

## Notes vocales

Dictez une note au lieu de la taper. Touchez **Dicter** sur la carte **Notes**.

<!-- AFBEELDING: het scherm Spraaknotitie met tekst in het vak (app-notitie-fr) -->

1. Choisissez la **Langue dans laquelle vous parlez**. L'application propose d'abord la langue de l'application.
2. Choisissez éventuellement la **Rubrique du rapport (facultative)**. Sans choix (**Pas de choix (bureau ou IA)**), le bureau ou l'IA choisit plus tard.
3. Touchez le micro et parlez. L'appareil transcrit aussitôt. Touchez à nouveau pour arrêter.
4. Corrigez le texte si nécessaire et touchez **Enregistrer**.

Seul le **texte** part vers Quaymark, avec l'heure et la position du début. Le son n'est pas conservé. S'il n'y a pas de position après 15 secondes (au fond d'une cale), la note part sans position.

Si l'appareil n'a pas de reconnaissance vocale, ou si l'application n'y est pas autorisée, l'écran le dit. Tapez alors la note, ou utilisez le micro du clavier. Au bureau, les notes figurent avec le rapport. → [Notes vocales](../dossiers.md#notes-vocales)

## Codes

Scannez des numéros de conteneur, des scellés et des échantillons. Touchez **Scanner** sur la carte **Codes**.

<!-- AFBEELDING: het scherm Code scannen met een ingetikt containernummer en Controlecijfer klopt. (app-code-fr) -->

1. Choisissez le **Type de code** : **Conteneur**, **Scellé**, **Échantillon** ou **Autre code**.
2. Dirigez la caméra vers le code. Ou touchez **Lire depuis une photo** pour lire le code sur une photo de l'appareil, ou saisissez-le dans **Code**.
3. Sous **Liée à la constatation**, choisissez la constatation à laquelle le code appartient, ou laissez **Aucune (au dossier)**.
4. Touchez **Enregistrer**.

Sous le code figure la façon dont il est entré : **Scanné**, avec le format, ou **Saisi à la main**. Si vous corrigez un code scanné, il devient un code saisi.

Un **numéro de conteneur** comporte 4 lettres, la dernière U, J ou Z, et 7 chiffres. L'application recalcule le chiffre de contrôle et dit **Le chiffre de contrôle est correct.**, ou quel chiffre elle attendait. S'il est incorrect, l'application demande **Enregistrer quand même ?** : le code est alors enregistré avec la marque *chiffre de contrôle incorrect*, et la carte affiche un avertissement. → [Codes](../dossiers.md#codes)

## Documents de bord

Enregistrez le plan de chargement, le manifeste de cargaison, le journal de bord, un bon de livraison ou un certificat. Touchez **Ajouter** sur la carte **Documents de bord**.

<!-- AFBEELDING: het scherm Document van boord met een soort en een bestand (app-boorddocument-fr) -->

1. Choisissez le **Type de document** : **Plan de chargement**, **Manifeste de cargaison**, **Journal de bord**, **Bon de livraison**, **Certificat** ou **Autre document**. Indiquez éventuellement une **Description**.
2. Ajoutez les fichiers :
    - **Photographier une page** : une photo par page ;
    - **Pdf ou fichier** : un pdf ou une photo déjà sur l'appareil ;
    - **Vidéo** : **Filmer une vidéo** ou **Choisir une vidéo**.
3. Touchez **Enregistrer**.

Une photo ou un pdf fait au plus 50 Mo, une vidéo au plus 200 Mo (mp4 ou mov). Chaque fichier devient une preuve comme une photo : avec l'heure, le lieu et l'empreinte du moment où vous l'ajoutez. La liste affiche la taille et le début de l'empreinte. Si vous n'enregistrez pas, l'application efface à nouveau les fichiers de l'appareil. → [Documents de bord](../dossiers.md#documents-de-bord)

## Expertise de soutes

Pour un type d'expertise avec expertise de soutes, le dossier porte la carte **Expertise de soutes**. Touchez-la pour voir les soutes du navire.

<!-- AFBEELDING: het scherm Bunker survey met tanks (app-bunker-fr) -->

1. Choisissez en haut **Avant** ou **Après** le soutage.
2. Touchez une soute. Une soute pas encore sondée indique *pas encore sondée*.
3. Indiquez le sondage : **Produit**, **Méthode** (**Sondage** ou **Creux**), **Mesuré (cm)**, **Correction assiette/gîte (cm)**, **Volume de la table (m³)**, **Température (°C)** et éventuellement la **Densité 15 °C (kg/m³), vide = BDN**.
4. Touchez **Enregistrer**.

Le volume et la température sont obligatoires. L'application affiche une **Estimation** en tonnes comme aide sur place ; Quaymark recalcule lui-même. Une soute que le navire n'avait pas encore s'ajoute avec **Ajouter une soute**.

Un sondage commence avec les valeurs du précédent. Une correction est un nouveau sondage : le dernier par soute compte. → [Expertise de soutes](../dossiers.md#expertise-de-soutes)

## Voir aussi

- [Le dossier](dossier.md)
- [Hors connexion](zonder-bereik.md)

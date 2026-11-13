---
description: "La liste de travail du bureau : une ligne par mission."
---

# Dossiers

La liste de travail du bureau : une ligne par mission.

## Ouvrir l'écran

Dans le menu de gauche, cliquez sur **Dossiers**.

## La liste

- Le choix **Statut** au-dessus de la liste affiche par défaut les dossiers **ouverts**. Choisissez **Tous** pour voir aussi les dossiers clôturés et annulés, ou un seul statut.
- Le **champ de recherche** cherche dans toutes les colonnes : numéro, type d'expertise, navire, donneur d'ordre, port, planning et statut.
- Double-cliquez sur une ligne pour ouvrir le **dossier** ; la flèche en début de ligne l'ouvre dans un nouvel onglet. **Nouveau dossier** en crée un.
- Le bouton d'export télécharge la liste sous forme de fichier.

![La liste Dossiers avec le choix Statut et le bouton Nouveau dossier](images/dossiers-lijst-fr.png "La liste Dossiers")

## Dossier

Une mission : ce qui est demandé, où et quand, et ce que l'expert constate sur place.

![Le dossier HQ-2026-0003 sur l'onglet Général, avec Mission, Lieu et planning, Conditions et présents](images/dossier-fr.png "Un dossier")

- **Mission** : site, type d'expertise, donneur d'ordre, expert, référence, date, statut et langue du rapport. Le **numéro de dossier** (code du site, année, numéro d'ordre) est attribué au premier enregistrement ; le site est ensuite fixé.
- **Lieu et planning** : navire, port, terminal ou quai, le moment prévu (dans le fuseau horaire du site), devise et description.
- **Conditions et présents** : temps, mer, visibilité, poste d'amarrage et les personnes présentes lors de l'expertise. **Dossier lié** renvoie à un dossier antérieur du même navire, par exemple l'on-hire d'un off-hire.
- **Données de l'expertise** : les champs propres au type d'expertise choisi. Un champ obligatoire doit être rempli à partir du statut Rapport. Si vous choisissez un autre type, les valeurs des champs inconnus du nouveau type sont perdues à l'enregistrement.

Un dossier enregistré a des onglets : **Parties** (relations avec leur rôle et leur référence), **Documents** (en répertoires), **Du navire** (les documents du navire, en lecture seule), **Constatations**, **Check-list** et le journal avec notes, tâches, pièces jointes et historique.

### Constatations

Une **constatation** est ajoutée, jamais modifiée ni supprimée. Une erreur se corrige avec **Rectifier** et un motif : l'ancienne version reste visible, barrée. Au survol, une photo affiche l'heure, la position GPS et l'empreinte (SHA-256) enregistrées par l'appareil lors de la prise de vue.

![L'onglet Constatations par emplacement à bord, avec photo, Gravité, Retirer du rapport et Rectifier](images/dossier-vaststellingen-fr.png "Les constatations et leur photo")

### Photos dans le rapport

**Retirer du rapport** sous une photo l'écarte de l'annexe photographique du rapport, avec un motif. La photo reste conservée comme preuve ; **Remettre dans le rapport** la rétablit. Les photos reçoivent un numéro continu dans le rapport, et le tableau des constatations cite ces numéros.

### Check-list

La **check-list** affiche pour chaque point la dernière réponse (conforme, non conforme, s.o.), par qui et quand. Chaque réponse reste conservée sous **Réponses précédentes**. **Non conforme** propose une constatation. Sur place, l'expert répond dans l'application mobile.

![L'onglet Check-list avec la dernière réponse par point](images/dossier-checklist-fr.png "La check-list")

### Rapport

Dans l'onglet **Rapport**, vous rédigez le texte du rapport par rubrique, avec une mise en forme simple, et insérez les textes standard du bureau. **Enregistrer les rubriques** les enregistre. Si le modèle de rapport n'affiche pas une rubrique, l'onglet le signale.

![L'onglet Rapport avec Lettres et certificats, Dossier de preuves et les rubriques Introduction et Méthode](images/dossier-rapport-fr.png "L'onglet Rapport")

### Émettre et envoyer le rapport

**Émettre le rapport** (onglet Rapport, à partir du statut Rapport) fige le rapport comme version 1, avec son empreinte (SHA-256) : il ne change plus jamais. Corriger = **Émettre une nouvelle version**, avec un motif. **Envoyer** envoie une version émise en PDF au donneur d'ordre ; le mail est conservé dans le journal. Enregistrez d'abord les rubriques : une version ne reprend que le texte enregistré.

### Proposer un projet

**Proposer un projet** (onglet Rapport) fait rédiger par l'IA une proposition par rubrique à partir des données du dossier : constatations, check-list, champs et circonstances. Les photos et votre propre texte ne sont pas transmis. Chaque proposition figure sous sa rubrique ; vous choisissez **Reprendre**, **Ajouter à la fin** ou **Ignorer**, puis vous enregistrez comme d'habitude. Cela utilise la clé IA de votre bureau et seulement si l'administrateur l'autorise dans le portail ADM One.

### Comparaison avec un dossier précédent

Si le dossier est **lié** à un dossier précédent (p. ex. l'on-hire d'un off-hire), l'onglet Constatations montre par emplacement ce que ce dossier y a constaté. Donnez votre appréciation par constatation : **Existait déjà** ou **Nouveau**. Le rapport montre la comparaison par emplacement à bord, avec les numéros de photo et votre appréciation ; sans appréciation, rien n'est ajouté.

![Les constatations de l'off-hire ZB-2026-0002 face à ZB-2026-0001, avec Existait déjà et Nouveau](images/dossier-vergelijking-fr.png "La comparaison avec un dossier précédent")

### Lettres et certificats

**Nouvelle lettre** et **Nouveau certificat** (onglet Rapport) créent une lettre type ou un certificat dans la langue du dossier. **Aperçu (PDF)** le montre d'abord ; **Émettre** le fige avec son empreinte. Un certificat reçoit alors un numéro de la série de l'établissement (C-HQ-2026-0001). Remplacez dans une lettre chaque champ entre [crochets] : sinon l'émission est impossible.

Il y a trois lettres et cinq certificats. Chaque certificat a ses propres lignes :

- **Certificat de quantité**, **Certificat de poids** et **Certificat on-hire/off-hire** : une description, une quantité et une unité. Un champ numérique rempli du dossier se reprend avec **Reprendre d'un champ du dossier**.
- **Certificat d'inspection des cales** : une **Constatation** par cale, et l'**Avis** : aptes ou non aptes au chargement de la cargaison mentionnée. L'avis n'est jamais prérempli. C'est sur ce certificat que la notice of readiness (NOR) du capitaine est acceptée ou refusée.
- **Certificat de qualité** : les résultats d'une analyse, avec par ligne le **Paramètre**, la **Méthode**, le **Résultat**, l'**Unité** et la **Spécification** (la valeur limite). Au-dessus, vous indiquez l'**Échantillonnage** (où et quand), le **Laboratoire** et le **Rapport du laboratoire**.

![Une nouvelle lettre de protestation pour HQ-2026-0003 avec Aperçu (PDF) et Émettre](images/dossier-brief-fr.png "Une nouvelle lettre")

Si une quantité est exprimée dans une autre unité que celle demandée par le client, par exemple en tonnes métriques alors que la charte-partie utilise la long ton, **Convertir** la convertit (tonne, kilogramme, long ton, short ton, mètre cube, litre, baril). D'un volume vers un poids, Quaymark demande la densité. La quantité convertie s'ajoute comme nouvelle ligne sous l'originale.

### Chronologie

L'onglet **Chronologie** est le statement of facts du dossier : les événements de l'escale, à l'heure du site. Avec **Ajouter un événement**, vous choisissez le moment, l'événement (arrivée en rade, NOR remise, NOR acceptée, amarré, panneaux ouverts, début et fin du chargement ou déchargement, interruption, reprise, panneaux fermés, documents à bord, départ ou autre) et une remarque. Un événement peut être modifié par la suite ; l'historique garde qui a modifié quoi.

![Chronologie de ZB-2026-0003 avec Ajouter un événement, De la NOR au début et Émettre le statement of facts](images/dossier-tijdlijn-fr.png "La chronologie")

En haut, les tuiles du résumé calculent : le temps de la NOR au début, la durée du chargement ou déchargement, les interruptions (d'une interruption à sa reprise), le temps de travail net et le séjour au port. S'il manque un événement pour une durée, un tiret s'affiche, pas zéro.

**Statement of facts (PDF)** montre le document ; **Émettre le statement of facts** le fige avec son empreinte, parmi les lettres et certificats du dossier, et dans le dossier de preuves. Le document prévoit la signature du capitaine. Dans le rapport, la chronologie vient avec le marqueur `{{tijdlijn}}` (voir [Modèles](sjablonen.md)).

### Temps et frais

Dans l'onglet **Temps et frais**, vous encodez les **prestations** (qui, de quand à quand, à l'heure du site) et les **frais** (déplacement, séjour, laboratoire, tiers) du dossier, avec le justificatif tiré des pièces jointes. Un frais marqué **Refacturer** figure sur la facture. **Proposer une facture** en fait un brouillon de facture ; voir [Factures](facturen.md). Ce qui figure sur une facture est figé.

![Temps et frais de ZB-2026-0003 avec Proposer une facture, Prestations et Frais](images/dossier-tijd-kosten-fr.png "Temps et frais")

### Dossier de preuves

**Dossier de preuves (ZIP)** fournit un ZIP à vérifier sans Quaymark : les photos originales de l'appareil (y compris les photos masquées, avec le motif), un manifeste, les rapports émis et un LISEZMOI avec les commandes (`shasum`, `certutil`). Chaque fichier est revérifié à l'emballage ; si l'un ne correspond plus, aucun dossier n'est créé. L'empreinte du dossier figure ensuite dans l'onglet et dans le journal.

### Aperçu du rapport

**Rapport (PDF)** et **Rapport (Word)** créent le rapport à partir des données enregistrées, avec le modèle de rapport de ce type d'expertise (sinon le modèle général) et dans la langue du rapport. C'est un aperçu : rien n'est enregistré ni envoyé. Enregistrez d'abord, sinon vos dernières modifications n'y figurent pas.

### Copier

**Copier** crée un nouveau dossier avec la même mission (navire, donneur d'ordre, type, port), sans constatations, réponses ni données d'expertise, et le lie à ce dossier.

### Bloquer juridiquement

**Bloquer juridiquement** (administrateur seulement) conserve un dossier pour un litige ou une réclamation. Indiquez un motif. Tant que le dossier est bloqué, il ne peut pas aller à la corbeille, et ses documents, pièces jointes, notes et tâches ne sont pas supprimés. La modification reste possible. **Lever le blocage** demande aussi un motif ; la fenêtre montre qui a bloqué ou levé, et quand.

### Supprimer

**Supprimer** déplace le dossier vers la corbeille.

## Voir aussi

- [Navires](schepen.md)
- [Relations](relaties.md)
- [Modèles](sjablonen.md)

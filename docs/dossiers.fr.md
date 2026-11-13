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

### Double contrôle

Pour un type d'expertise avec la case **Double contrôle** cochée (voir [Types d'expertise](soorten-survey.md)), un rapport ne peut être émis qu'après l'approbation d'un second expert. L'onglet Rapport affiche alors le bloc **Double contrôle**.

![Le bloc Double contrôle dans l'onglet Rapport de ZB-2026-0002, avec Relecture demandée par Demo Surveyor](images/dossier-vier-ogen-fr.png "Double contrôle")

- **Demander une relecture** soumet le rapport à un collègue, avec une remarque si vous le souhaitez. Sur l'écran d'accueil, il apparaît alors sous **En attente de relecture**.
- Peut approuver un collègue ayant le droit d'émettre des rapports, mais pas l'expert du dossier ni celui qui a demandé la relecture. Il consulte l'**Aperçu (PDF)** et choisit **Approuver**, ou **Renvoyer** avec ce qu'il faut adapter.
- Une approbation vaut pour le rapport tel qu'il était à ce moment. Si quelque chose qui figure dans le rapport change ensuite (un texte de rubrique, un champ, une photo masquée, le modèle), elle tombe et vous demandez une nouvelle relecture. Le bloc l'indique, et **Émettre le rapport** ne réapparaît qu'après une nouvelle approbation.
- Chaque étape est conservée, avec qui, quand et l'empreinte du contenu approuvé ou renvoyé.

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

### Dommages

L'onglet **Dommages** assure le suivi d'un dossier de sinistre : les **réclamations** et l'**estimation des dommages**.

![Dommages de HQ-2026-0003 avec Réclamations, Estimation des dommages, Réserve proposée et Enregistrer l'accord](images/dossier-schade-fr.png "Dommages")

- Un dossier peut avoir **plusieurs réclamations**, par exemple une auprès de l'assureur corps et une auprès du P&I club. **Ajouter une réclamation** ouvre une page propre avec l'assureur ou le P&I club, le numéro de police et de réclamation, la date de déclaration et les montants réclamé, reconnu et payé. Le reconnu ne peut dépasser le réclamé, le payé ne peut dépasser le reconnu.
- **Changer le statut** sur la réclamation ajoute une étape à l'**historique** : déclarée, en cours, reconnue, contestée, réglée ou rejetée, avec une date et un commentaire. Une étape reste conservée ; réglée ou rejetée fixe aussi la date de règlement. Une réclamation avec un historique ne peut plus être supprimée.
- L'**estimation des dommages** se compose de postes : description, catégorie (réparation, remplacement, main-d'œuvre, tiers, autre), réparateur, numéro de devis et le devis en pièce jointe du dossier. Par poste, le montant **estimé** et **accepté** et la **dépréciation** du neuf pour vieux en pour cent. Net = le montant accepté (sinon l'estimé) moins la dépréciation. Montants hors TVA, dans la devise du dossier.
- **Réserve proposée** : si vous la laissez vide, le total net s'applique.
- **Enregistrer l'accord** fige l'estimation telle qu'elle est, avec la partie avec qui l'accord a été conclu (par exemple l'assureur et le contre-expert). Ensuite, plus aucun poste ne peut être ajouté ou modifié. **Retirer l'accord** le permet à nouveau et demande un motif ; l'accord et le retrait restent tous deux conservés.
- Dans le rapport, l'estimation vient avec le marqueur `{{schadebegroting}}` (voir [Modèles](sjablonen.md)).

### Draft survey

Pour un type d'expertise avec la case **Draft survey** cochée (voir [Types d'expertise](soorten-survey.md)), le dossier reçoit l'onglet **Draft survey** : la mesure initiale (avant le chargement ou le déchargement) et la mesure finale (après), côte à côte, et le poids de la cargaison.

![Draft survey de HQ-2026-0004 avec Mesure initiale, Mesure finale et le résultat Chargé](images/dossier-draft-fr.png "Draft survey")

**Mesure initiale** et **Mesure finale** ouvrent chacune une page propre. Saisissez :

- les six **tirants d'eau** : avant, milieu et arrière, à bâbord et à tribord ;
- le **navire** : la LBP et les distances des marques de tirant d'eau aux perpendiculaires (avant et milieu positifs si la marque est en arrière de la perpendiculaire ou du maître-couple, arrière positif si la marque est en avant de la perpendiculaire arrière) ;
- l'**eau** : la densité de l'eau du bassin (hydromètre) et la densité des tables (généralement 1,025) ;
- les **valeurs hydrostatiques** : dès que les tirants d'eau sont saisis, Quaymark affiche le tirant moyen (quarter mean) auquel vous relevez dans les tables du navire le déplacement, le TPC, le LCF (depuis le maître-couple, positif vers l'arrière) et le MTC un demi-mètre au-dessus et en dessous ;
- les **déductions** : ballast, eau douce, combustible, huile de graissage et autres, en tonnes ; facultativement le navire lège, pour la constante.

![La mesure initiale de HQ-2026-0004 avec le calcul à côté](images/dossier-draft-meting-fr.png "Une mesure")

Le **calcul** à côté suit chaque modification : les tirants d'eau aux perpendiculaires, l'assiette, la flexion, le quarter mean, la première et la seconde correction d'assiette, la correction de densité, les déductions et le déplacement net. Une mesure finale reprend le navire et l'eau de la mesure initiale. La différence du déplacement net entre le début et la fin est le poids de la cargaison : chargée s'il a augmenté, déchargée s'il a diminué.

**Draft survey report (PDF)** affiche le document ; **Émettre le draft survey report** (lorsque les deux mesures sont complètes) le fige avec son empreinte, avec les lettres et certificats du dossier, et dans le dossier de preuves. Le document prévoit la signature du capitaine. Dans le rapport, la draft survey vient avec le marqueur `{{draftsurvey}}` (voir [Modèles](sjablonen.md)).

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

**Bloquer juridiquement** (administrateur seulement) conserve un dossier pour un litige ou une réclamation. Indiquez un motif. Tant que le dossier est bloqué, il ne peut pas aller à la corbeille, et ses documents, pièces jointes, notes et tâches ne sont pas supprimés. La modification reste possible. **Lever le blocage** demande aussi un motif ; la fenêtre montre qui a bloqué ou levé, et quand. Un dossier bloqué n'est pas non plus supprimé après son [délai de conservation](bewaartermijnen.md).

### Supprimer

**Supprimer** déplace le dossier vers la corbeille.

## Conflits d'intérêts

Un expert ne peut pas intervenir pour les deux parties. Quaymark avertit en haut du dossier si le bureau travaille, dans un autre dossier avec **le même navire** ou **le même numéro de réclamation ou de police**, pour un autre donneur d'ordre, et que ce donneur d'ordre est partie dans ce dossier (ou que votre donneur d'ordre est partie dans l'autre). Les dossiers ouverts comptent, ainsi que ceux clôturés au cours des douze derniers mois ; les dossiers annulés non.

- L'en-tête affiche alors **Conflit d'intérêts ?**, et le haut du dossier les autres dossiers avec leur donneur d'ordre.
- S'il n'y a pas de conflit, cliquez sur **Pas de conflit** et expliquez pourquoi (par exemple : autre dommage, les deux parties informées). C'est conservé avec votre nom et l'heure, et ne peut pas être modifié. C'est la preuve d'indépendance qu'un donneur d'ordre ou une accréditation peut demander.
- Le travail n'est pas bloqué : l'avertissement reste affiché jusqu'à sa justification.
- Sur une demande du portail client aussi, Quaymark avertit dès avant l'acceptation. → [Demandes](aanvragen.md#demande)

## Réclamations

L'écran **Réclamations** du menu affiche les réclamations de tous les dossiers, avec leur dossier, assureur, montants et statut.

![La liste Réclamations avec le choix Aussi clôturées](images/claims-fr.png "La liste Réclamations")

- Par défaut, seules les réclamations **ouvertes** s'affichent. Cochez **Aussi clôturées** pour les réclamations réglées et rejetées.
- Double-cliquez sur une ligne pour ouvrir la réclamation. Une nouvelle réclamation se crée dans le dossier, onglet **Dommages**.

## Voir aussi

- [Navires](schepen.md)
- [Relations](relaties.md)
- [Modèles](sjablonen.md)

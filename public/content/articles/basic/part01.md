## Partie 1 - Introduction

![Entête Tutoriel](../../content/images/tutorial_header.png)

### Créer son premier jeu phaser 3

Bienvenue dans notre premier tutoriel sur la création d'un jeu avec Phaser 3. Nous allons apprendre ici comment créer un petit jeu impliquant un joueur courant et sautant sur des plates-formes, collectant des étoiles et évitant les méchants. Tout au long de ce processus, nous expliquerons certaines des fonctionnalités essentielles du framework.

### Qu'est-ce que Phaser?

Phaser est un framework de jeu HTML5 destiné à aider les développeurs à créer très rapidement des jeux HTML5 puissants et multi-navigateurs. Il a été créé spécifiquement pour exploiter les avantages des navigateurs modernes, de bureau et mobiles. La seule exigence du navigateur est la prise en charge de la balise canvas.

### Prérequis

Téléchargez ce fichier zip qui contient chaque étape de ce didacticiel sous forme de code et les ressources qui vont avec.

Vous devez avoir une connaissance très, très basique de JavaScript.

Assurez-vous également de consulter le Guide de démarrage, qui vous montrera comment télécharger le framework, configurer un environnement de développement local et vous donner un aperçu de la structure d'un projet Phaser et de ses fonctions principales.

Si vous avez parcouru le Guide de mise en route, vous aurez téléchargé Phaser. Tout sera prêt et codé. Téléchargez les ressources de ce didacticiel et décompressez-les dans votre racine Web.

Ouvrez la page `part1.html` dans l’éditeur de votre choix et examinons le code de plus près. Après un peu de HTML standard incluant Phaser, la structure du code se présente comme suit:

```JavaScript
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
}

function create ()
{
}

function update ()
{
}
```

L'objet config est la façon dont vous configurez votre jeu Phaser. Il existe de nombreuses options pouvant être placées dans cet objet et, à mesure que vous développez vos connaissances sur Phaser, vous en rencontrez davantage. Mais dans ce tutoriel, nous allons simplement définir le moteur de rendu, les dimensions et une scène par défaut.

Une instance d'un objet Phaser.Game est affectée à une variable locale appelée `game` et l'objet de configuration lui est transmise. Cela lancera le processus de réalisation de Phaser.

Dans Phaser 2, l’objet `Game` servait de passerelle vers presque tous les systèmes internes et était souvent accessible à partir d’une variable globale. Dans Phaser 3, ce n'est plus le cas et il n'est plus utile de stocker l'instance de jeu dans une variable globale.

La propriété `type` peut être `Phaser.CANVAS`, `Phaser.WEBGL` ou `Phaser.AUTO`. C'est le contexte de rendu que vous souhaitez utiliser pour votre jeu. La valeur recommandée est `Phaser.AUTO` qui essaie automatiquement d'utiliser WebGL, mais si le navigateur ou le périphérique ne le prend pas en charge, il sera redirigé sur Canvas. L'élément de canevas créé par Phaser sera simplement ajouté au document au moment où le script a été appelé, mais vous pouvez également spécifier un conteneur parent dans la configuration du jeu si vous le souhaitez.

Les propriétés `width` et `height` définissent la taille de l'élément de canevas que Phaser va créer. Dans ce cas 800 x 600 pixels. Votre monde de jeu peut être n’importe quelle taille, mais c’est la résolution dans laquelle le jeu s’affiche.

La propriété `scène` de l'objet de configuration sera traitée plus en détail dans ce didacticiel.

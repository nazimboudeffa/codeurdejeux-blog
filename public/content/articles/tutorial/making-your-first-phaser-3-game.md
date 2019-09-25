## Partie 1 - Introduction

![Entête Tutoriel](../../content/images/tutorial_header.png)

### Créer son premier jeu phaser 3

Bienvenue dans notre premier tutoriel sur la création d'un jeu avec Phaser 3. Nous allons apprendre ici comment créer un petit jeu impliquant un joueur courant et sautant sur des plates-formes, collectant des étoiles et évitant les méchants. Tout au long de ce processus, nous expliquerons certaines des fonctionnalités essentielles du framework.

### Qu'est-ce que Phaser?

Phaser est un framework de jeu HTML5 destiné à aider les développeurs à créer très rapidement des jeux HTML5 puissants et multi-navigateurs. Il a été créé spécifiquement pour exploiter les avantages des navigateurs modernes, de bureau et mobiles. La seule exigence du navigateur est la prise en charge de la balise canvas.

### Prérequis

[Téléchargez ce fichier zip](https://phaser.io/tutorials/making-your-first-phaser-3-game/phaser3-tutorial-src.zip) qui contient chaque étape de ce didacticiel sous forme de code et les ressources qui vont avec.

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

## Partie 2 - Charger les Assets

Chargeons les actifs dont nous avons besoin pour notre jeu. Pour ce faire, vous appelez Phaser Loader dans une fonction de scène appelée `préchargement`. Phaser recherchera automatiquement cette fonction au démarrage et chargera tout ce qui y est défini.

Actuellement, la fonction de `préchargement` est vide. Changez le en:

```JavaScript
function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}
```

Cela chargera 5 éléments: 4 images et une feuille de sprite. Cela peut sembler évident à certains d’entre vous, mais j’aimerais souligner le premier paramètre, également appelé clé d’actif (c’est-à-dire «ciel», «bombe»). Cette chaîne est un lien vers l'actif chargé et constitue ce que vous utiliserez dans votre code lors de la création d'objets de jeu. Vous êtes libre d'utiliser une chaîne JavaScript valide comme clé.

## Afficher une image

Afin d’afficher une des images que nous avons chargée, placez le code suivant dans la fonction de `création`:

`this.add.image (400, 300, 'ciel');`

Vous pouvez trouver ceci dans `part3.html`. Si vous le chargez dans un navigateur, vous devriez maintenant voir un écran de jeu recouvert d’un fond de ciel bleu:

![Partie 3](../../content/images/part3.png)

Les valeurs `400` et `300` sont les coordonnées x et y de l'image. Pourquoi 400 et 300? C'est parce que dans Phaser 3, tous les objets de jeu sont positionnés par défaut en fonction de leur centre. La taille de l’arrière-plan est de 800 x 600 pixels. Par conséquent, si vous l’affichez centrée à 0 x 0, vous ne verrez que son coin inférieur droit. Si nous affichons à 400 x 300, vous voyez tout.

*Astuce:* vous pouvez utiliser `setOrigin` pour changer cela. Par exemple, le code suivant: `this.add.image (0, 0, 'ciel')`. SetOrigin (0, 0) réinitialiserait la position de dessin de l'image en haut à gauche. Dans Phaser 2, cela a été réalisé via la propriété `anchor`, mais dans Phaser 3, ce sont plutôt les propriétés `originX` et `originY`.

L'ordre d'affichage des objets de jeu correspond à l'ordre dans lequel vous les créez. Donc, si vous souhaitez placer une image-objet étoile au-dessus de l'arrière-plan, vous devez vous assurer qu'elle a été ajoutée en tant qu'image seconde, après l'image du ciel:

```JavaScript
function create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');
}
```

Si vous mettez l’image `étoile` en premier, elle sera recouverte par l’image du ciel.

## Partie 3 - Construire le Monde

`This.add.image` crée un nouvel objet de jeu d'images et l'ajoute à la liste d'affichage Scènes actuelle. Cette liste est l'endroit où tous vos objets de jeu vivent. Vous pouvez positionner l’image n’importe où et Phaser n’a aucun problème. Bien sûr, si c'est en dehors de la région 0x0 à 800x600, vous ne le verrez pas visuellement, car ce sera "hors écran", mais il existera toujours dans la scène.

La scène elle-même n'a pas de taille fixe et s'étend à l'infini dans toutes les directions. Le système de caméra contrôle votre vue sur la scène et vous pouvez déplacer et zoomer la caméra active selon vos besoins. Vous pouvez également créer de nouvelles caméras pour d'autres vues de la scène. Ce sujet dépasse le cadre de ce didacticiel spécifique. Suffit de dire que le système de caméras dans Phaser 3 est nettement plus puissant que dans la v2. Les choses qui n'étaient littéralement pas possibles avant maintenant le sont.

Pour l'instant, construisons la scène en ajoutant une image d'arrière-plan et des plates-formes. Voici la fonction de `création` mise à jour:

```JavaScript
var platforms;

function create ()
{
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
}
```

En regardant rapidement le code, vous verrez un appel à `this.physics`. Cela signifie que nous utilisons le système Arcade Physics, mais avant de pouvoir le faire, nous devons l’ajouter à notre Game Config pour indiquer à Phaser que notre jeu le requiert. Alors mettons à jour cela pour inclure le support physique. Voici la configuration du jeu révisée:

```JavaScript
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
```

La nouvelle addition est la propriété `physique`. Avec ce code en place si vous l'exécutez, ce que vous trouverez sous la forme `part4.html` dans le fichier zip du didacticiel, vous devriez voir une scène beaucoup plus semblable au jeu:

![Partie 4](../../content/images/part4.png)

Nous avons un fond et des plates-formes, mais comment fonctionnent-elles exactement?
## Partie 4 - Les Plateformes

Nous venons d'ajouter un tas de code à notre fonction de `création` qui mérite une explication plus détaillée. Tout d'abord, cette partie:

```JavaScript
platforms = this.physics.add.staticGroup();
```

Cela crée un nouveau groupe de physique statique et l’assigne aux `plates-formes` de variables locales. Dans Arcade Physics, il existe deux types de corps physiques: dynamique et statique. Un corps dynamique est un corps qui peut se déplacer grâce à des forces telles que la vitesse ou l'accélération. Il peut rebondir et entrer en collision avec d'autres objets et cette collision est influencée par la masse du corps et d'autres éléments.

À l'opposé, un corps statique a simplement une position et une taille. Il n'est pas touché par la gravité, vous ne pouvez pas régler la vitesse dessus et quand quelque chose entre en collision avec elle, elle ne bouge jamais. Statique par nom, statique par nature. Et parfait pour le sol et les plateformes sur lesquelles nous allons laisser le joueur s’exercer.

Mais qu'est-ce qu'un groupe? Comme leur nom l'indique, ils constituent un moyen de regrouper des objets similaires et de les contrôler tous comme une seule et même unité. Vous pouvez également vérifier la collision entre les groupes et les autres objets du jeu. Les groupes sont capables de créer leurs propres objets de jeu via des fonctions d'assistance pratiques telles que `créer`. Un groupe de physique créera automatiquement des enfants dotés de la physique, ce qui vous épargnera du travail sur les jambes.

Avec notre plate-forme Group made, nous pouvons maintenant l'utiliser pour créer les plates-formes:

```JavaScript
platforms.create(400, 568, 'ground').setScale(2).refreshBody();

platforms.create(600, 400, 'ground');
platforms.create(50, 250, 'ground');
platforms.create(750, 220, 'ground');
```

Comme nous l'avons vu précédemment, cela crée cette scène:

Au cours de notre précharge, nous avons importé une image «terrestre». Il s’agit d’un simple rectangle vert de 400 x 32 pixels qui répond à nos besoins de base en matière de plateforme:

![Platteforme](../../content/images/platform.png)

La première ligne de code ci-dessus ajoute une nouvelle image au sol à 400 x 568 (rappelez-vous que les images sont positionnées en fonction de leur centre). Le problème est que nous avons besoin de cette plate-forme pour couvrir toute la largeur de notre jeu, sinon le joueur ne fera que tomber. sur les côtés. Pour ce faire, nous le redimensionnons x2 avec la fonction `setScale(2)`. Il est maintenant au format 800 x 64, ce qui est parfait pour nos besoins. L'appel à `refreshBody()` est requis car nous avons mis à l'échelle un corps de physique statique. Nous devons donc informer le monde de la physique des modifications que nous avons apportées.

Le terrain est à l'échelle et en place, il est donc temps pour les autres plates-formes:

```JavaScript
platforms.create(600, 400, 'ground');
platforms.create(50, 250, 'ground');
platforms.create(750, 220, 'ground');
```

Le processus est exactement le même qu'auparavant, sauf que nous n'avons pas besoin de faire évoluer ces plates-formes, car elles ont déjà la bonne taille.

Trois plates-formes sont placées autour de l'écran, à la bonne distance pour permettre au joueur de les atteindre.

Alors ajoutons notre joueur.

## Partie 5 - Ready Player One

Nous avons de belles plateformes tentantes, mais personne ne peut les parcourir. Réglons cela.

Créez une nouvelle variable appelée `player` et ajoutez le code suivant à la fonction `create`. Vous pouvez voir ceci dans `part5.html`:

```JavaScript
player = this.physics.add.sprite(100, 450, 'dude');

player.setBounce(0.2);
player.setCollideWorldBounds(true);

this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
```

Il y a deux choses distinctes qui se passent ici: la création d'un sprite physique et la création de certaines animations qu'il peut utiliser.

## Sprite Physique

La première partie du code crée le sprite:

```JavaScript
player = this.physics.add.sprite(100, 450, 'dude');

player.setBounce(0.2);
player.setCollideWorldBounds(true);
```

Cela crée un nouveau sprite appelé `player`, positionné à 100 x 450 pixels du bas de la partie. Le sprite a été créé via la Physics Game Object Factory (`this.physics.add`), ce qui signifie qu'il possède un corps de physique dynamique par défaut.

Après avoir créé le sprite, il reçoit une légère valeur de rebond de 0,2. Cela signifie que quand il atterrit après avoir sauté, il rebondit légèrement. Le sprite est alors configuré pour entrer en collision avec les limites du monde. Les limites, par défaut, sont à l'extérieur des dimensions du jeu. Si nous fixons le jeu à 800 x 600, le joueur ne pourra pas courir en dehors de cette zone. Cela empêchera le joueur de pouvoir sortir des bords de l'écran ou de sauter par le haut.

## Animations

Si vous jetez un coup d'œil à la fonction de `préchargement`, vous verrez que "mec" a été chargé sous forme de feuille de sprite, pas d'image. C'est parce qu'il contient des images d'animation. Voici à quoi ressemble la feuille de sprite complète:

![Le dude](../../content/images/dude.png)

Il y a 9 cadres au total, 4 pour la course à gauche, 1 pour la caméra et 4 pour la course à droite. Remarque: Phaser prend en charge l’inversion des images-objets pour économiser sur les images d’animation, mais dans l’intérêt de ce didacticiel, nous allons garder la vieille école.

Nous définissons deux animations appelées 'left' et 'right'. Voici l'animation de gauche:

```JavaScript
this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});
```

L'animation "de gauche" utilise les images 0, 1, 2 et 3 et tourne à 10 images par seconde. La valeur 'repeat -1' indique à l'animation de se mettre en boucle.

Ceci est notre cycle de fonctionnement standard et nous le répétons pour la course dans le sens opposé, en utilisant la touche "droite" et la dernière pour "tour".

*Informations supplémentaires:* Dans Phaser 3, Animation Manager est un système global. Les animations créées dans celui-ci sont globalement disponibles pour tous les objets de jeu. Ils partagent les données d'animation de base tout en gérant leurs propres chronologies. Cela vous permet de définir une seule animation et de l'appliquer à autant d'objets de jeu que vous le souhaitez. Ceci est différent de Phaser 2 où les animations appartenaient spécifiquement aux objets de jeu sur lesquels elles avaient été créées.
## Partie 6 - Movement du Corps : Un Monde de Physiques

Phaser prend en charge une variété de systèmes de physique différents, chacun agissant en tant que plug-in disponible pour n'importe quelle scène de Phaser. Au moment de la rédaction de cet article, il est livré avec Arcade Physics, Impact Physics et Matter.js Physics. Pour les besoins de ce didacticiel, nous allons utiliser le système Arcade Physics pour notre jeu, qui est simple et léger, parfait pour les navigateurs mobiles.

Lorsqu'un objet physique est créé, il se voit attribuer une propriété `body`, qui fait référence à son corps Arcade Physics. Cela représente le sprite en tant que corps physique dans le moteur de physique des phasers d'Arcade. L'objet body a beaucoup de propriétés et de méthodes avec lesquelles nous pouvons jouer.

Par exemple, pour simuler les effets de la gravité sur un sprite, il suffit d’écrire:

`player.body.setGravityY(300)`

C'est une valeur arbitraire, mais logiquement, plus la valeur est élevée, plus votre objet se sent lourd et plus vite il tombe. Si vous ajoutez ceci à votre code ou si vous lancez `part5.html`, vous verrez que le joueur tombe sans s'arrêter, ignorant complètement le terrain créé précédemment:

![Partie 5](../../content/images/part5.png)

La raison en est que nous n'avons pas encore testé la collision entre le sol et le joueur.

Nous avons déjà dit à Phaser que notre sol et nos plates-formes seraient des corps statiques. Si nous n'avions pas fait cela et créé des jeux dynamiques à la place, lorsque le joueur les heurterait, le jeu s'arrêterait un instant, puis tout se serait effondré. En effet, sauf indication contraire, le sprite au sol est un objet physique en mouvement et lorsque le joueur le frappe, la force résultante de la collision est appliquée au sol. Par conséquent, les deux corps échangent leurs vitesses et le sol commence à chuter également.

Afin de permettre au joueur d'entrer en collision avec les plates-formes, nous pouvons créer un objet Collider. Cet objet surveille deux objets physiques (pouvant inclure des groupes) et vérifie les collisions ou les chevauchements. Si cela se produit, il peut alors éventuellement appeler votre propre rappel, mais dans le seul but d'entrer en collision avec des plates-formes, nous n'exigeons pas que:

```JavaScript
this.physics.add.collider(player, platforms);
```

Le collisionneur est celui qui effectue la magie. Il prend deux objets et teste la collision et effectue une séparation contre eux. Dans ce cas, nous lui donnons le sprite du joueur et le groupe de plates-formes. Il est assez intelligent pour faire une collision avec tous les membres du groupe, alors cet appel va entrer en collision avec le sol et toutes les plateformes. Le résultat est une plateforme ferme qui ne s'effondre pas:

![Partie 6](../../content/images/part6.png)

## Partie 7 - Controler le joueur avec le clavier

La collision est une bonne chose, mais nous avons vraiment besoin que le joueur bouge. Vous penserez probablement à aller dans la documentation et à chercher comment ajouter un écouteur d'événement, mais ce n'est pas nécessaire ici. Phaser a un gestionnaire de clavier intégré et l'un des avantages de son utilisation est cette petite fonction pratique:

`curseurs = this.input.keyboard.createCursorKeys();`

Cela remplit l'objet curseurs avec quatre propriétés: haut, bas, gauche, droite, qui sont toutes des occurrences d'objets Key. Ensuite, tout ce que nous avons à faire est de les interroger dans notre boucle de `mise à jour`:

```JavaScript
if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
```

Bien que nous ayons ajouté beaucoup de code, il devrait être assez lisible.

La première chose à faire est de vérifier si la touche gauche est maintenue enfoncée. Si c'est le cas, nous appliquons une vitesse horizontale négative et commençons l'animation en cours. S'ils tiennent «droit» au lieu de cela, nous faisons littéralement le contraire. En effaçant la vélocité et en la réglant de cette manière, chaque image crée un style de mouvement «stop-start».

Le lecteur ne se déplacera que si une touche est maintenue enfoncée et s’arrêtera immédiatement. Phaser vous permet également de créer des mouvements plus complexes, avec élan et accélération, mais cela nous donne l'effet dont nous avons besoin pour ce jeu. La dernière partie de la vérification de la clé définit l'animation sur 'tourner' et met la vitesse horizontale à zéro si aucune clé n'est maintenue enfoncée.

## Allons y

La dernière partie du code ajoute la possibilité de sauter. Le curseur haut est notre touche de saut et nous testons si c'est en bas. Cependant, nous testons également si le joueur touche le sol, sinon il pourrait sauter en l'air.

Si ces deux conditions sont remplies, nous appliquons une vitesse verticale de 330 px / s carré. Le joueur tombera automatiquement au sol à cause de la gravité. Avec les contrôles en place, nous avons maintenant un monde de jeu que nous pouvons explorer. Chargez part7.html et jouez. Essayez d’affiner les valeurs, comme le 330, pour passer aux valeurs les plus basses et les plus élevées afin de voir l’effet que cela produira.

![Partie 7](../../content/images/part7.png)

## Partie 8 - Stardust

Il est temps de donner un but à notre petit jeu. Laissons une pincée d'étoiles dans la scène et permettons au joueur de les collecter. Pour ce faire, nous allons créer un nouveau groupe appelé "étoiles" et le peupler. Dans notre fonction create, nous ajoutons le code suivant (cela peut être vu dans `part8.html`):

```JavaScript
stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
});

stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});
```

Le processus est similaire à celui de la création du groupe de plates-formes. Comme nous avons besoin que les étoiles bougent et rebondissent, nous créons un groupe de physique dynamique au lieu d'un groupe statique.

Les groupes peuvent utiliser des objets de configuration pour faciliter leur configuration. Dans ce cas, l'objet de configuration de groupe comprend 3 parties: il définit d'abord la texture comme image en étoile. Cela signifie que tous les enfants créés à la suite de l'objet config recevront la texture étoile par défaut. La valeur de répétition est ensuite fixée à 11. Puisqu'elle crée 1 enfant automatiquement, répéter 11 fois signifie que nous en aurons 12 au total, ce qui est exactement ce dont nous avons besoin pour notre jeu.

La dernière partie est `setXY` - elle sert à définir la position des 12 enfants créés par le groupe. Chaque enfant sera placé à partir de x: 12, y: 0 et avec un pas x de 70. Cela signifie que le premier enfant sera positionné à 12 x 0, le second est de 70 pixels par rapport à celui de 82 x 0, le troisième est à 152 x 0, et ainsi de suite. Les valeurs "step" sont un moyen très pratique d’espacer les enfants du groupe lors de la création. La valeur de 70 est choisie car cela signifie que les 12 enfants seront parfaitement espacés sur l'écran.

Le code suivant itère tous les enfants du groupe et leur donne une valeur de rebond en Y aléatoire comprise entre 0,4 et 0,8. La plage de rebond est comprise entre 0, pas de rebond du tout et 1, un rebond complet. Parce que les étoiles sont toutes engendrées à 0 ° C, la gravité les abaissera jusqu'à ce qu'elles entrent en collision avec les plates-formes ou le sol. La valeur de rebond signifie qu'ils rebondiront de manière aléatoire jusqu'à ce qu'ils se reposent enfin.

Si nous devions exécuter le code comme il est maintenant, les étoiles tomberaient au fond du jeu et seraient invisibles. Pour arrêter cela, nous devons vérifier leur collision avec les plates-formes. Nous pouvons utiliser un autre objet Collider pour faire ceci:

```JavaScript
this.physics.add.collider(stars, platforms);
```

En plus de cela, nous vérifierons également si le joueur chevauche ou non une étoile:

```JavaScript
this.physics.add.overlap(player, stars, collectStar, null, this);
```

Cela indique à Phaser de vérifier s'il existe un chevauchement entre le joueur et toute étoile du groupe d'étoiles. Si trouvé, ils sont passés à la fonction 'collectStar':

```JavaScript
function collectStar (player, star)
{
    star.disableBody(true, true);
}
```

Tout simplement, l'étoile a son corps physique désactivé et son objet de jeu parent est rendu inactif et invisible, ce qui le supprime de l'affichage. Lancer le jeu nous donne maintenant un joueur qui peut se lancer, sauter, rebondir sur les plateformes et collecter les étoiles qui tombent d'en haut. Pas mal pour quelques lignes de code plutôt lisible pour l’essentiel :)

![Partie 8](../../content/images/part8.png)
## Partie 9 - Un Score à Régler

Nous allons ajouter deux touches finales à notre jeu: un ennemi à éviter qui peut tuer le joueur et un score lorsque vous collectez les étoiles. Tout d'abord, le score.

Pour ce faire, nous allons utiliser un objet de jeu texte. Nous créons ici deux nouvelles variables, une pour contenir le score actuel et l'objet texte lui-même:

```Javascript
var score = 0;
var scoreText;
```

Le `scoreText` est mis en place dans la fonction de `création`:

```JavaScript
scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
```

16 x 16 est la coordonnée pour afficher le texte. 'score: 0' est la chaîne par défaut à afficher et l'objet qui suit contient une taille de police et une couleur de remplissage. En ne spécifiant pas la police, nous utiliserons réellement la valeur par défaut de Phaser, Courier.

Nous devons ensuite modifier la fonction `collectStar` afin que, lorsque le joueur prend une étoile, son score augmente et que le texte soit mis à jour pour refléter ceci:

```JavaScript
function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}
```

Donc, 10 points sont ajoutés pour chaque étoile et le `scoreText` est mis à jour pour afficher ce nouveau total. Si vous exécutez `part9.html`, vous verrez les étoiles tomber et le score augmenter à mesure que vous les collectez.

![Partie 9](../../content/images/part9.png)

Dans la dernière partie, nous ajouterons quelques méchants.

## Partie 10 - Faire Rebondir les Bombes

Afin de compléter notre jeu, il est temps d'ajouter quelques méchants. Cela donnera un bel élément de défi au jeu, quelque chose qui manquait auparavant.

L'idée est la suivante: lorsque vous collectez toutes les étoiles pour la première fois, une bombe rebondissante est libérée. La bombe rebondira au hasard autour du niveau et si vous entrez en collision avec elle, vous mourrez. Toutes les étoiles réapparaîtront afin que vous puissiez les récupérer, et si vous le faites, une autre bombe sera libérée. Cela donnera au joueur un défi: obtenir un score aussi élevé que possible sans mourir.

La première chose dont nous avons besoin est un groupe pour les bombes et quelques collisionneurs:

```JavaScript
bombs = this.physics.add.group();

this.physics.add.collider(bombs, platforms);

this.physics.add.collider(player, bombs, hitBomb, null, this);
```

Les bombes rebondiront bien sûr sur les plates-formes, et si le joueur les frappe, nous appellerons la fonction hitBomb. Tout ce que vous ferez, c'est d'arrêter le jeu et de rendre le joueur rouge:

```JavaScript
function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
```

Jusqu'ici, tout va bien, mais nous devons lancer une bombe. Pour ce faire, nous modifions la fonction collectStar:

```JavaScript
function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}
```

Nous utilisons une méthode de groupe appelée countActive pour voir le nombre d'étoiles laissées en vie. Si ce n'est pas le cas, le joueur les a toutes rassemblées. Nous utilisons donc la fonction iterate pour réactiver toutes les étoiles et réinitialiser leur position y à zéro. Cela fera à nouveau tomber toutes les étoiles du haut de l'écran.

La prochaine partie du code crée une bombe. Nous sélectionnons d’abord une coordonnée x aléatoire, toujours du côté opposé à l’écran du joueur, juste pour lui donner une chance. Ensuite, la bombe est créée, elle est prête à entrer en collision avec le monde, à rebondir et à avoir une vitesse aléatoire.

Le résultat final est une jolie petite image-bulle qui rebondit autour de l'écran. Assez petit pour être facile à éviter au début, mais dès que le nombre augmente, il devient beaucoup plus difficile!

![Partie 10](../../content/images/part10.png)

Et notre jeu est terminé :)

## Conclusion

Vous avez maintenant appris à créer un sprite doté de propriétés physiques, à contrôler son mouvement et à le faire interagir avec d'autres objets dans un petit monde de jeux. Il y a beaucoup plus de choses que vous pouvez faire pour améliorer cela. Pourquoi ne pas augmenter la taille du niveau et permettre à la caméra de défiler? Peut-être ajouter différents types de méchants, différentes récupérations de valeur ou donner au joueur une barre de santé.

Ou, pour un jeu de style non violent, vous pouvez en faire une course rapide et simplement leur demander de collecter les étoiles le plus rapidement possible.

Avec l'aide de ce que vous avez appris dans ce didacticiel et des centaines d'exemples à votre disposition, vous devriez maintenant disposer d'une base solide pour un futur projet. Mais comme toujours, si vous avez des questions, besoin de conseils ou si vous souhaitez partager ce que vous avez travaillé, n'hésitez pas à demander de l'aide sur le forum Phaser.

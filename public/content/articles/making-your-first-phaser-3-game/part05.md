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

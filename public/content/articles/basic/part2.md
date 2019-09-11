## Partie 2 - Charger les Assets

Chargeons les actifs dont nous avons besoin pour notre jeu. Pour ce faire, vous appelez Phaser Loader dans une fonction de scène appelée préchargement. Phaser recherchera automatiquement cette fonction au démarrage et chargera tout ce qui y est défini.

Actuellement, la fonction de préchargement est vide. Changez le en:

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

Afin d’afficher une des images que nous avons chargée, placez le code suivant dans la fonction de création:

this.add.image (400, 300, 'ciel');

Vous pouvez trouver ceci dans part3.html. Si vous le chargez dans un navigateur, vous devriez maintenant voir un écran de jeu recouvert d’un fond de ciel bleu:

![Partie 3](../../content/images/part3.png)

Les valeurs 400 et 300 sont les coordonnées x et y de l'image. Pourquoi 400 et 300? C'est parce que dans Phaser 3, tous les objets de jeu sont positionnés par défaut en fonction de leur centre. La taille de l’arrière-plan est de 800 x 600 pixels. Par conséquent, si vous l’affichez centrée à 0 x 0, vous ne verrez que son coin inférieur droit. Si nous affichons à 400 x 300, vous voyez tout.

*Astuce:* vous pouvez utiliser setOrigin pour changer cela. Par exemple, le code suivant: this.add.image (0, 0, 'ciel'). SetOrigin (0, 0) réinitialiserait la position de dessin de l'image en haut à gauche. Dans Phaser 2, cela a été réalisé via la propriété anchor, mais dans Phaser 3, ce sont plutôt les propriétés originX et originY.

L'ordre d'affichage des objets de jeu correspond à l'ordre dans lequel vous les créez. Donc, si vous souhaitez placer une image-objet étoile au-dessus de l'arrière-plan, vous devez vous assurer qu'elle a été ajoutée en tant qu'image seconde, après l'image du ciel:

```JavaScript
function create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');
}
```

Si vous mettez l’image étoile en premier, elle sera recouverte par l’image du ciel.

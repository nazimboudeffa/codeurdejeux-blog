## Partie 3 - Construire le Monde

This.add.image crée un nouvel objet de jeu d'images et l'ajoute à la liste d'affichage Scènes actuelle. Cette liste est l'endroit où tous vos objets de jeu vivent. Vous pouvez positionner l’image n’importe où et Phaser n’a aucun problème. Bien sûr, si c'est en dehors de la région 0x0 à 800x600, vous ne le verrez pas visuellement, car ce sera "hors écran", mais il existera toujours dans la scène.

La scène elle-même n'a pas de taille fixe et s'étend à l'infini dans toutes les directions. Le système de caméra contrôle votre vue sur la scène et vous pouvez déplacer et zoomer la caméra active selon vos besoins. Vous pouvez également créer de nouvelles caméras pour d'autres vues de la scène. Ce sujet dépasse le cadre de ce didacticiel spécifique. Suffit de dire que le système de caméras dans Phaser 3 est nettement plus puissant que dans la v2. Les choses qui n'étaient littéralement pas possibles avant maintenant le sont.

Pour l'instant, construisons la scène en ajoutant une image d'arrière-plan et des plates-formes. Voici la fonction de création mise à jour:

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

En regardant rapidement le code, vous verrez un appel à this.physics. Cela signifie que nous utilisons le système Arcade Physics, mais avant de pouvoir le faire, nous devons l’ajouter à notre Game Config pour indiquer à Phaser que notre jeu le requiert. Alors mettons à jour cela pour inclure le support physique. Voici la configuration du jeu révisée:

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

La nouvelle addition est la propriété physique. Avec ce code en place si vous l'exécutez, ce que vous trouverez sous la forme part4.html dans le fichier zip du didacticiel, vous devriez voir une scène beaucoup plus semblable au jeu:

![Partie 4](../../content/images/part4.png)

Nous avons un fond et des plates-formes, mais comment fonctionnent-elles exactement?

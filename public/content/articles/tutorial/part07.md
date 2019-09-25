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

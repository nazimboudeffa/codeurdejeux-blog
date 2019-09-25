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

## Partie 9 - Un Score à Régler

Nous allons ajouter deux touches finales à notre jeu: un ennemi à éviter qui peut tuer le joueur et un score lorsque vous collectez les étoiles. Tout d'abord, le score.

Pour ce faire, nous allons utiliser un objet de jeu texte. Nous créons ici deux nouvelles variables, une pour contenir le score actuel et l'objet texte lui-même:

```Javascript
var score = 0;
var scoreText;
```

Le scoreText est mis en place dans la fonction de création:

```JavaScript
scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
```

16 x 16 est la coordonnée pour afficher le texte. 'score: 0' est la chaîne par défaut à afficher et l'objet qui suit contient une taille de police et une couleur de remplissage. En ne spécifiant pas la police, nous utiliserons réellement la valeur par défaut de Phaser, Courier.

Nous devons ensuite modifier la fonction collectStar afin que, lorsque le joueur prend une étoile, son score augmente et que le texte soit mis à jour pour refléter ceci:

```JavaScript
function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}
```

Donc, 10 points sont ajoutés pour chaque étoile et le scoreText est mis à jour pour afficher ce nouveau total. Si vous exécutez part9.html, vous verrez les étoiles tomber et le score augmenter à mesure que vous les collectez.

![Partie 9](../../content/images/part9.png)

Dans la dernière partie, nous ajouterons quelques méchants.

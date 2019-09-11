## Partie 8 - Stardust

Il est temps de donner un but à notre petit jeu. Laissons une pincée d'étoiles dans la scène et permettons au joueur de les collecter. Pour ce faire, nous allons créer un nouveau groupe appelé "étoiles" et le peupler. Dans notre fonction create, nous ajoutons le code suivant (cela peut être vu dans part8.html):

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

La dernière partie est setXY - elle sert à définir la position des 12 enfants créés par le groupe. Chaque enfant sera placé à partir de x: 12, y: 0 et avec un pas x de 70. Cela signifie que le premier enfant sera positionné à 12 x 0, le second est de 70 pixels par rapport à celui de 82 x 0, le troisième est à 152 x 0, et ainsi de suite. Les valeurs "step" sont un moyen très pratique d’espacer les enfants du groupe lors de la création. La valeur de 70 est choisie car cela signifie que les 12 enfants seront parfaitement espacés sur l'écran.

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

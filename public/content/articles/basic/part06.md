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

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

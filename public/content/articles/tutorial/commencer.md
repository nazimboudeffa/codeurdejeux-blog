## Choisir un éditeur

Vous allez avoir besoin d'un éditeur pour préparer votre code JavaScript. Il en existe beaucoup, chacun avec ses forces et ses faiblesses. Si vous êtes un développeur expérimenté, vous aurez probablement déjà votre propre éditeur préféré. Dans ce cas, passez à la Hello World de ce tutoriel. Sinon, voici quelques options pour vous:

### Atom

Atom est un éditeur de texte multiplate-forme gratuit de l'équipe de GitHub. Il est moderne, accessible, et pourtant modifiable à la base. Un outil que vous pouvez personnaliser pour tout faire mais aussi pour utiliser de manière productive sans jamais toucher à un fichier de configuration.

[Visitez le site Web Atom](https://atom.io/)

### Code Visual Studio

Visual Studio Code est un éditeur de code source léger mais puissant qui s'exécute sur votre bureau et est disponible pour Windows, macOS et Linux. Il est livré avec un support intégré pour JavaScript, TypeScript et Node.js et dispose d'un écosystème riche d'extensions pour d'autres langages (tels que C ++, C #, Java, Python, PHP, Go) et les environnements d'exécution (tels que .NET et Unity). .

[Visitez le site Web de VS Code](https://code.visualstudio.com/)

## Télécharger Phaser

Phaser est un projet open source téléchargeable gratuitement. Il n'y a aucuns frais à payer lors de l'utilisation de Phaser, que vous l'utilisiez pour un projet commercial ou gratuit.

Nous utilisons github pour gérer le projet et vous avez diverses options pour le télécharger. Tout cela est expliqué sur la page de téléchargement.
Puis-je obtenir un fichier zip / tar?

Oui. Github offre la possibilité de télécharger le référentiel entier sous forme de fichier zip ou tar. Cependant, nous vous recommandons fortement d'apprendre à utiliser git à la place. Cela vous permettra de mettre facilement à jour les dernières versions de Phaser au fur et à mesure de leur publication. Et si, à terme, vous souhaitez contribuer au code de Phaser, cela vous facilite la tâche.

Donc vous pouvez obtenir Phaser en clonant le référentiel, en récupérant le fichier js ou en le téléchargeant au format zip

## Hello World!

Avec la configuration de votre éditeur et le téléchargement de Phaser, il est temps de créer quelque chose et de vérifier que tout fonctionne.

Créez un fichier appelé index.html à l'intérieur de d'un dossier et collez-y le code suivant:

```
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/phaser-ce@2.13.1/build/phaser.js"></script>
</head>
<body>

var game = new Phaser.Game({
  // antialias:               true,
  // backgroundColor:         0x000000,
  // disableVisibilityChange: false,
  // enableDebug:             true,
  // height:                  600,
  // renderer:                Phaser.AUTO,
  // resolution:              1,
  // scaleMode:               Phaser.ScaleManager.NO_SCALE,
  // transparent:             false,
  // width:                   800,
  state: {

    init: function() {

    },

    preload: function() {
      this.load.image('dude', 'phaser-dude.png');
    },

    create: function() {
      var sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'dude');
      // this.physics.enable(sprite);
    },

    update: function() {

    },

    render: function() {
      var debug = this.game.debug;
      debug.phaser(10, 580);
    },

    shutdown: function() {

    }

  }
});

</body>
</html>
```
### Tester, tester ...

Ouvrez votre navigateur Web et chargez la page `index.html`. Si tout se passe bien, la démo suivante s'affichera dans votre navigateur:

![Commencer](../../content/images/getting-started.png)

Si ce n'est pas le cas, vous devez afficher la console de débogage et voir quelles erreurs sont générées. Dans la plupart des navigateurs, vous pouvez le faire en appuyant sur F12. Cela fonctionne dans Chrome, Firefox et Internet Explorer 11. Vérifiez pour connaître l’erreur, espérons qu’il s’agit d’une erreur simple, comme un fichier manquant. Dans ce cas, vérifiez le nom de vos dossiers et actualisez la page.

Si c'est quelque chose de plus complexe, n'hésitez pas à poster à ce sujet sur le forum et nous ferons de notre mieux pour vous aider.

Ce n'est qu'un petit exemple, et nous avons des centaines d'autres à explorer, mais j'espère que cela montre à quel point Phaser est expressif et rapide à utiliser. Avec seulement quelques lignes de code facilement lisibles, nous avons quelque chose d'assez impressionnant à l'écran!

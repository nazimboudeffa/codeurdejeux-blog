Comme promis, nous voici à l'étape 3 de la migration de JavaScript vers TypeScript dans la construction de jeux HTML5 utilisant Phaser.

A l'étape 1 on a installé et configuré node.js

A l'étape 2 on a vu npm et Parcel

Maintenant il est temps de commencer à coder en TypeScript

Premièrement nous devons installer TypeScript avec npm

`npm install typescript -g`

Maintenant nous avons TypeScript installé

![type01](../../content/images/type01.png)

Que faire maintenant ? Créons un fichier appellé script.ts avec ce contenu

```javascript
s = 'Hello World';
console.log(s)
```

Executons le avec

`tsc script.ts`

On aura des erreurs

![type02](../../content/images/type02.png)

Un fichier javascript valide, mais il ne fonctionne pas en TypeScript car les variables doivent être déclarées de cette manière

```javascript
const s = 'Hello World';
console.log(s);
```

ou encore mieux de cette manière

```javascript
const s: string = 'Hello World';
console.log(s);
```

DOING THE TRANSLATION

Thank you very much to [@Emanuele Feronato](https://www.facebook.com/emanueleferonato/) for letting me translate his article to french

REFERENCE ARTICLE [https://www.emanueleferonato.com/2021/06/01/phaser-and-the-migration-from-javascript-to-typescript-step-3-typescript](https://www.emanueleferonato.com/2021/06/01/phaser-and-the-migration-from-javascript-to-typescript-step-3-typescript)
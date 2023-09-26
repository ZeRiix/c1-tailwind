# TP 1 - Sass
## Création d'un composant bioCard grâce à la méthode BEM

## [Maquette Figma](https://www.figma.com/file/HV3Sc7JoEMGcR0gCkvUcU3/TP1-sass?type=design&node-id=1-2&mode=design&t=CzWvi5a5z0mMgW1s-0)


### 1- Mise en place

 ⁃ Installation d'un préprocesseur sass (**dart-sass** de préférence)
 ⁃ Création d'un hôte local pour le projet
 ⁃ Création de la structure du projet :
   __TP-1/__
```bash
    index.html*
    assets/
        images/
            profil.png 
    src/ 
        css/
            main.scss
            partials/
                _variables.scss
                _globals.scss
            components/
                _bioCard.scss
        components/
            bioCard.html
  
    dist/
        css/
            main.css**
        js/
            main.js**
```
 ⁃ Lancement du script ```--watch vers dist/css/main. ```css (via un script dans package.json)
 
**Contenu du fichier index.html :**
<!DOCTYPE html>
```html
<html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Composant BioCard made with BEM</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' type='text/css' media='screen' href='dist/css/main.css'>
        <script src='dist/js/main.js'></script>
    </head>
    <body>
        <div class="container mt-2">
        <div data-component="bioCard"></div>
        </div>
    </body>
</html>
```

**Contenu du fichier main.js :**
```js
window.onload = () => {
    document.querySelectorAll('[data-component]')
    .forEach((element) => {
        fetch('./src/components/' + element.getAttribute('data-component') + '.html')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`erreur HTTP! statut: ${reponse.status}`);
            }
            return response.text();
        })
        .then((text) => {
            element.innerHTML = text;
        })
    })
}
```

### 2- Ecriture de la structure html

Limiter l'usage de "<div\>"
Privilégier plutôt article, header, h1, h2, footer...
Tous les éléments stylisés ont une classe selon les règles BEM (pas de petits enfants, on peut nommer d'après les noms de balises ex: bioCard__h1)
Les pictogrammes svg sont écrits dans le markup, sans le fond blanc.
Mettre tous les éléments après l'image dans une div avec la classe .bioCard__content (cela servira pour la version desktop du composant)

### 3- Ecriture des partials scss
Tous sont importés comme modules (@use) dans main.scss ou dans les fichiers de composants qui en ont besoin

- /partials/modern-normalize.css [Github](https://github.com/sindresorhus/modern-normalize)
 - ```/partials/_globals.scss``` : règles générales (:root, *, selecteurs de balises...)
 - ```/partials/_variables.scss``` : déclaration des variables css et scss (breakpoints, couleurs...)
 - ```/partials/_functions.scss``` : toutes les fonctions custom utiliséss par les composants
 - ```/partials/_mixins.scss``` : tous les mixins utilisés par les composants
 - ```/partials/_fonts.scss``` : import des typos et déclaration des variables sass ($font1...)
 - ```partials/_utilities.scss``` : classes utilitaires

 - ```/components/_bioCard.scss```
 - ```/components/_container.scss```

Les variables css utilisées :
 --mainFont + variables de couleurs (cf. déroulé)

Toutes les dimensions sont exprimées en rem ou em

### 4- Déroulé (indicatif)

 __Note :__ il est conseillé d'installer cette extension VSCode : [Extension](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)
 - incorporer normalizer
 - incorporer les fonts (Google)

 - créer un composant container 
  margin: auto, max-width, padding: 0 1rem
  Il est mobile first (@media min-width)
  Il utilise les valeurs d'une variable de type map appelée $breakpoints
  sm: 640px, md: 768px,  lg: 1024px, xl: 1280px, xxl: 1536px,
  Pour parcourir une map sass : [Documentation](https://sass-lang.com/documentation/at-rules/control/each)
 
 **Note :** pour améliorer l'affichage de nos composants, nous allons créer un set de utility classes appelé ```partials/_utilities.scss```
 Ces classes sont .mt-1 à .mt-6 pour des margin-top de 0.5rem à 3rem. Idem pour les classes .mb-1 à .mb-6
 Attention : étant donné qu'elles peuvent s'appliquer à des composants ayant déjà des règles de marge, il faudra leur ajouter le flag !important
 
 - ajouter à ```partials/_functions.scss``` une fonction rem() qui renvoie une valeur exprimée en rem à partir d'un int représentant un nombre de pixels
 Exemple: ```rem(320)``` renvoie ```20rem```

 - créer un composant bioCard
  - width, padding, border-radius : utiliser la fonction ```rem()```
  - bg-color : utiliser une variable css
   Note : les variables css sont créées à partir d'une map de couleurs sass : 
    ```scss
    "white": #fff,
    "black": #000,
    "darkBlue": #1e293a,
    "lightBlue": #5d7a97,
    "pink": #ff2896,
    "orange": #ff9b65,
    "darkGreen": #00d5d5,
    "lightGreen": #00ffbf,
    ```
  Définir également à partir de cette map des variantes de couleur éclaircies de 30%. Ces variantes sont du type ```--darBlue-lighter```.
  Utiliser pour cela la fonction scale du module sass:color
  
  - display : utiliser un mixin 
    ```scss
    flexbox($direction, $wrap, $justify, $align, $gap: 0)
    ```
   **Note :** Les éléments du composant seront séparés par un margin-bottom. Attention : les 2 titres auront une line-height de 1
  
  - image : utiliser  un mixin roundImage(radius)
  - h1 : utiliser un mixin textGradient($direction, $startColor, $endColor)
  - nav du footer : utiliser le mixin flexbox et un mixin resetList
  - liens : utiliser un mixin 
    ```scss
    pillButton($background, $color, $bigIcon: false)
    ```
***Tips css :***

Désaturation de l'image [Doc filter](https://developer.mozilla.org/fr/docs/Web/CSS/filter)
gradient dans le texte [Exemple](https://codepen.io/leocampos/pen/pPwwNR)

**Note :** prefix webkit pas top mais ok (cf canIuse)

Aspect du footer
transform skew de 7deg d'un pseudo element ```::before```

Animation au survol
C'est libre, faites-vous plaisir (transform, color, mix-blend-mode...)

### 5- Créer un modificateur --light pour notre composant
Utiliser pour cela des variables css locales :
```scss
--bgColor
--imageFilter
--gradientColor1
--gradientColor2
--gradientColor3
--gradientColor4
--pillColor
--pillAltColor
--separatorOpacity
--element-width
```

### 6 - Ajoouter une media query pour rendre le composant responsive

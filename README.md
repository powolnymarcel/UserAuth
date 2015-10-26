#Demo
<a href="http://appuser.herokuapp.com/">http://appuser.herokuapp.com/</a>

<img src:"http://www.ondego.be/divers/userauth.png"/>

<h4>Probleme avec edit ....... Working in it ... Working on Google chrome though...</h4>

<h4>INFOS sur heroku(lenteur offre FREE)</h4>

<h4>L'app est configurée pour fonctionner avec mongoLab.</h4>
#Requis pour lancer l'app:
<ul>
<li>git</li>
<li>Python (j'ai utilisé la v2.7.10)</li>
<li>Nodejs (j'ai utilisé la v0.12.7 || 4.2.1)</li>
</ul>
(Pensez à mettre à jour la variable PATH)
<hr>
#Etapes pour lancer l'APP:
Dans l'invite de commandes (npm install peut prendre un certain temps...)
<ul>
<li>npm install</li>
<li>sails lift</li>
</ul>
Voir résultat sur localhost:1337
<hr>

#TODO

<ul>
<li> Trouver une solution au probleme d'édition sous certains navigateurs.. </li>
<li>Mettre de l'ordre dans le readMe</li>
</ul>


#Info
<hr>
- Utilise le framework Sails, c'est un framwork MVC qui fonctionne sur le serveur nodeJS
- Fonctionne très bien avec des interface RESTFULL et les API DATA
<br>
<p>Utilisation AngularJS pour le front-end et on fera des requetes sur le serveur Sails</p>
<p>Utilisation de mongoDB pour le stockage des data + mongoLab.</p>
<p>Utilisation de angular-toaster, permet de prendre en charge les messages, par exemple si l'utilisateur tape un mauvais</p>
<p>mot de passe on aura une façon élegante d'indiquer qu'il y a une erreur.</p>
<p>Approche de GRUNT</p>
Heroku Sleeping:
If an app has a web dyno, and that web dyno receives no traffic in a 30 minute period, the web dyno will sleep. In addition to the web dyno sleeping, the worker dyno (if present) will also sleep.
If a sleeping web dyno receives web traffic, it will become active again after a very short delay. If the app has a worker dyno that was scaled up before sleeping, it will be scaled up again too.

#MISE EN PLACE
Etapes:
<hr>
Installation de sails (-g pour installation globale sur le système)
	npm install -g sails
creation d'un projet sails
	sails new userAuth
   Dans le dossier api se trouvent toutes les actions serveur, controlleur, modeles,...
   Dans le dossier asset se trouvent tous les fichiers public, on travaillera dans le dossier js pour AngularJS
Check pour voir si le projet se lance
	sails lift
   Voir : http://localhost:1337/

On ferme le serveur car on va generer l'api BackEnd
	CTRL + C

On crée un userController et userModel
	sails generate api user

   Voir userAuth\api\controllers pour le nouveau fichier controlleur
   Voir \userAuth\api\models pour le nouveau fichier modele

Lancer le projet
	sails lift
	choisir option 2 "alter"
   On peut tester un accès à l'api via http://localhost:1337/user
   Il n'y a pas d'user à ce moment là mais sails est fourni avec "blueprints" qui permet d'inserer des data via le navigateur
   AVEC
		localhost:1337/user/create?name=Marcel%20&email=marcel@marcel.be&password=marcel
   Resultat
	{
	"name": "Marcel ",
	"email": "marcel@marcel.be",
	"password": "marcel",
	"createdAt": "2015-10-20T10:44:01.484Z",
	"updatedAt": "2015-10-20T10:44:01.484Z",
	"id": 1
	}
	On crée un 2eme user
		http://localhost:1337/user/create?name=Julie&email=Julie@Julie.be&password=Julie
	On retourne sur http://localhost:1337/user
		On constate que l'on a 2 users le id a été auto-incrementé, à ce point du projet on a déjà une api backend

On va implementer AngularJS et les routes, on va placer toutes les dépendances dans public/asset/js/dependencies, on crée aussi dans le dossier JS
un dossier "public" pour placer les scripts perso, on crée dans ce dossier public 2 dossier "signup" & "login"
Dans signup on crée 2 fichiers "SignupCtrl.js" pour le controlleur signUp et 1 fichier "SignupMod" pour le module signup
Dans le dossier dependencies on lance l'invite de commande pour lancer bower et aller chercher angularJS
	bower install angularJS

Maintenant on va créer la vue, on va dans "views", on crée un fichier "signup.ejs" dans ce fichier on met un bout de texte juste pour verifier que ça marche
Il faut configurer les routes pour que quand on va dans localhost:1337/signup, le fichier signup.ejs soit appelé( on va lier la vue au Ctrl)
	On va dans cofig
	routes.js
On a déjà une route '/' qui lance la vue 'homepage'

On aura pas besoin de cette route donc on la modifie vers :

  'GET /signup': {
    view: 'signup'
  }

Pour l'instant on va aussi aller dans views.js et modifier :
  layout: 'layout',
vers
layout: false,

et dans 'models.js' décommenter
  // migrate: 'alter'
pour ne pas avoir à spécifier alter au lift du serveur

On relance le serveur avec
	sails lift
On se rend sur localhost:1337/signup
On peut voir notre template

Maintenant modifions le template avec une structure html
***********************************
<!DOCTYPE html>
<html>
<head>
  <title>Auth App</title>
  <!--STYLES-->
  <!--STYLES END-->
</head>
<body>
<!--SCRIPTS-->
<!--SCRIPTS END-->
</body>
</html>
***********************************

les balises commentées indiquent à GRUNT, qui est implémenté dans sails, d'aller remplir le html avec les fichiers css et js nécessaire -> TROP COOL !

Attention à l'ordre car grunt va créer ceci
*******************************************************************
<!DOCTYPE html>
<html>
<head>
  <title>Auth App</title>
  <!--STYLES-->
  <link rel="stylesheet" href="/styles/importer.css">
  <!--STYLES END-->
</head>
<body>
<!--SCRIPTS-->
<script src="/js/dependencies/sails.io.js"></script>
<script src="/js/dependencies/bower_components/angular/angular.js"></script>
<script src="/js/dependencies/bower_components/angular/angular.min.js"></script>
<script src="/js/dependencies/bower_components/angular/index.js"></script>
<script src="/js/public/signup/SignupCtrl.js"></script>
<script src="/js/public/signup/SignupMod.js"></script>
<!--SCRIPTS END-->
</body>
</html>
*******************************************************************

On veut que le module SignupMod soit chargé avant le ctrl SignupCtrl
Pour ça il faut éditer un fichier dans le dossier task qui se nomme "pipeline.js"
Si on va à la ligne
		var jsFilesToInject
un peu plus bas on a
  'js/dependencies/**/*.js',

 Il suffit d'ajouter :
  'js/public/signup/SignupMod.js',
  'js/public/signup/SignupCtrl.js',

  Restart le serveur et voir le résultat bien trié, on a bien le SignupMod avant le SignupCtrl

On va utiliser bootstrap donc :
	bower install bootstrap
		faire attention à bien etre dans le dossier "dependencies"

GRUNT va charger comme un gros sanglier qu'il est TOUS LES FICHIERS *.JS et css, il faudra donc lui indiquer quels dossier eviter avec
  exemple   :    '!js/dependencies/bower_components/jquery/src/**/*.js',


  INFO : peut etre éviter d'utiliser GRUNT et BOWER ensemble car bower se charge d'aller chercher toutes les dépendances et GRUNT se charge de tous charger
  ce qui implique la création de règles dans pipelines.js. Le mieux c'est de telecharger en zip les dépendances et les placer manuellement dans le dossier public
  GRUNG NE CHARGERA QUE CE QU'IL FAUT, RIEN DE PLUS RIEN DE MOINS


 //////////////////////////////////////////////////////////        ON VA CREER LA SIGNUP VIEW  & Ctrl & Mod      //////////////////////////////////////////////////////////////////////


Etapes:

Aller chercher un template de signupForm pour bootstrap.
On déclare le module dans SignupMod.js
		angular.module('SignupMod',[]);
On crée le controlleur dans SignupCtrl.js
On crée les attributs ng-model dans le formulaire pour que les data soient dispo dans le scope
On met un ng-submit sur le form
dans le controlleur on fait
	      $http.post('/signup'.......
Pour aller faire un post sur le serveur SAILS
On a donc besoin d'une route
	aller dans le dossier config - routes.js
	ajouter
	  'POST /signup': 'userController.signup'

dans le fichier userController du dossier api on crée une méthode signup
  signup:function(req,res){
    console.log("backendSignUp")
  }
  Apres rebbot du serveur on peu voir que dans l'invite de commande qu'on communique avec le serveurun fois le form envoyé.

  Maintenant on va encrypter le mot de passe avec nodeMachine
  Sur node-machine.org on peut trouver "machinepack-passwords"
  On va l'installer avec npm
  On stoppe le serveur et
		npm install machinepack-passwords

	Pendant ce temps là on vas aussi chercher sur node machine ""gravatar""
		npm install machinepack-gravatar --save

Ils sont installé, maintenant on peut les utiliser.
MAIS d'abord allons créer le modèle, le schéma, dans api/models/User.js - On peut y faire de la validation
Ensuite on crée l'userController sur le serveur pour créer le user avec encryptage du passwrd ainsi que fetch du gravatar

Ce qui se passe à ce moment ci:

Au click sur "enregister" dans le formulaire on lance la fonction "runSignup" du controlleur AngularJs "SignupCtrl, ce controlleur fait un $http POST sur le serveur DONC
 le fichier "routes.js" est activé et cherche ce qui correspond à POST /signup, il trouve la bonne ligne et voit qu'il doit aller chercher la fonction signup du fichier SignupController du serveur
 'UserController.signup'. Cette fonction crée le USER


Ensuite on crée le form de login
**********************************
Dans le dossier public/login on crée 2 fichiers LoginMod.js et LoginCtrl.js
Dans le dossier views on crée la vue login
Dans le fichier routes.js on ajoute la route racine pour qu'elle affiche le form de login

On attache le ng-submit au form
On attache les ng-model au form

On s'occupe du LoginCtrl

On implemente toaster dans le LoginMod et LoginCtrl


Ensuite on crée le DASHBOARD USER
**********************************
notes :
Ajout de bbower.json pour indiquer les dépendances nécessaires
Ajout de .bowerrc pour indiquer le chemin d'installation des dépendances.
Ajout dans package.json de :

 "scripts": {
    "postinstall": "bower install",

     "dependencies": {
    "bower": "*",
    "sails-disk": "^0.10.8"

# ALOS TP3 
## Objecifs
API REST : Versionnage 

JWT : Authentification
## Dependencies
bcrypt 5.0.1
dotenv 16.0.0
express js 4.17.3
joi 17.6.0
jsonwebtoken 8.5.1
supertest 6.2.2
uuid 8.3.2

Chai / Mocha for testing 
Request 2.28.2

## Authentification
- jsonwebtoken required.
- related functions will be found in [*authentifaction.js*]
## Versionnage
- // Middleware
app.use(express.json());
- related functions will be found in [*index.js*]
# ALOS TP4
## Objectifs
Apprendre Docker pour construire les microservices.

Utilisation Docker et Docker compose.

- *Docker* : fournit des containers légers pour exécuter des services indépendamment de notre infrastructure afin que nous puissions fournir des logiciels rapidement.
- *Docker compose* : comment dockeriser React, Nodejs Express et MySQL exemple en utilisant dc.

## Présentation - React, Node.js, MySQL avec Docker 
Le problème est de conteneuriser un système qui nécessite plus d'un conteneur Docker :
- React for UI
- Node.js Express for API
- MySQL for database
## HOW TO
Docker Compose nous aide à configurer le système plus facilement et plus efficacement qu'avec Docker uniquement. Nous avonc suivi ces étapes :

- Configurez l'application Nodejs avec la base de données MySQL.
- Créez Dockerfile pour l'application Nodejs.
Configurer l'application React.
- Créez Dockerfile pour l'application React.
- Écrivez les configurations Docker Compose dans le fichier YAML.
- Définir les variables d'environnement pour Docker Compose.
- Exécutez le système.

## CODE STEPS
- Tout d'abord, on ajoute le module **dotenv** dans *package.json*. -> **dependencies**
- Ensuite, nous importons **dotenv** dans **server.js** et utilisons **process.env** pour configurer **CORS et le port**.
- On modifie la configuration et l'initialisation de la base de données. -> *app/config/db.config.js* et dans *index.js*
- Creation de fichier docker pour *Nodejs App*.
- Setup React App
- Creation de fichier docker pour *React App* :

        **Etape I** - créer l'application React.

        **Etape II** - Servir l'application React avec **Nginx**.

- Docker Compose pour React, Node.js et MySQL.
- Docker Compose variables d'environnement.
- Exécutez React, Nodejs, MySQL avec Docker Compose.


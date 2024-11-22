# Booking-microservices

## Description du projet

Ce projet est un système de gestion de réservations de chambres basé sur une architecture de microservices. Il utilise plusieurs services indépendants qui communiquent entre eux via RabbitMQ pour assurer l'efficacité et l'isolation des erreurs. Chaque service est développé avec **Node.js** et **Express**, et utilise **MongoDB** pour le stockage des données. Le système inclut la gestion des utilisateurs, la vérification de la disponibilité des chambres, la gestion des réservations, et l'authentification sécurisée via JWT.

## Technologies utilisées

- **Node.js** : Environnement d'exécution pour JavaScript côté serveur.
- **Express** : Framework web pour Node.js, utilisé pour créer les API.
- **MongoDB** : Base de données NoSQL pour le stockage des données des utilisateurs, des réservations, et des informations sur les chambres.
- **RabbitMQ** : Broker de messages pour la communication asynchrone entre les microservices (par exemple, vérification de la disponibilité des chambres).
- **Docker** : Conteneurisation des services pour une gestion simplifiée.
- **Docker Compose** : Outil pour définir et exécuter des applications multi-conteneurs.
- **JWT (JSON Web Tokens)** : Pour l'authentification sécurisée des utilisateurs.
- **Swagger** : Documentation interactive de l'API pour faciliter l'intégration et les tests des services.

## Installation

1. **Cloner le dépôt :**

   ```bash
    git clone https://github.com/gpalesch/booking-microservices.git
    cd booking-microservices
   ```

2. **Copier le fichier `.env.example` pour tous les microservices et l'API Gateway** :
   - Dans chaque dossier de service (`auth-service`, `reservation-service`, `room-service`, `gateway`), crée un fichier `.env` en copiant le fichier `.env.example` :

     ```bash
     cp .env.example .env
     ```

3. **Construire et démarrer les conteneurs Docker :**

   Assurez-vous que Docker et Docker Compose sont installés sur votre machine. Ensuite, exécutez :

   ```bash
   docker-compose up --build
   ```

   Cela construira et démarrera tous les services définis dans le fichier `docker-compose.yml`.

# Documentation de l'API

Ce projet utilise [Swagger](https://swagger.io) pour documenter l'API. Vous pouvez consulter tous les endpoints et tester directement l'API via l'interface interactive.

### Accéder à Swagger UI

Une fois les services démarrés, vous pouvez accéder à Swagger UI pour chaque service via les liens suivants :

- **Room Service** : [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
- **Reservation Service** : [http://localhost:3002/api-docs](http://localhost:3002/api-docs)
- **Auth Service** : [http://localhost:3003/api-docs](http://localhost:3003/api-docs)

Cela vous permettra de voir tous les endpoints disponibles pour chaque service et d'interagir avec eux directement via l'interface Swagger.

# Lien vers présentation

https://pitch.com/v/ai-microservices-architecture-deep-dive-snzzrz
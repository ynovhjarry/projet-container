## Architecture Hugo Jarry:

Frontend <--> Backend <--> Base de données (PostgreSQL)

- Frontend : Application web (React/HTML/JS)
- Backend : API REST (Node.js + Express)
- Base de données : PostgreSQL (optionnelle, sinon stockage en mémoire)
- CI/CD : GitHub Actions + Docker + Kubernetes

## Flux des données

1. L'utilisateur interagit avec le frontend.
2. Frontend envoie des requêtes à l'API backend.
3. Backend traite les requêtes et interagit avec la DB si nécessaire.
4. Les données sont renvoyées au frontend pour affichage.

## Choix techniques

- **Node.js / Express** : simple et rapide pour un backend REST.
- **PostgreSQL** : persistance des données, optionnelle.
- **Docker** : conteneurisation pour CI/CD et déploiement.
- **Kubernetes** : orchestration pour scalabilité et résilience.
- **GitHub Actions** : CI/CD automatique pour build, push et déploiement.
- **Supertest + Jest** : tests unitaires backend.

# Projet Kubernetes de Hugo Jarry

Ce projet déploie une application 3-tier (backend, frontend, Postgres) sur Kubernetes avec Kind.

## Contenu du projet

- `/app/back` → backend Node.js / Express
- `/app/front` → frontend React
- `/k8s` → manifests Kubernetes
- `/ci` → workflow GitHub Actions pour CI/CD
- `/docs` → documentation du projet
- `reset-kind.sh` → script pour reset le cluster Kind

## Étapes principales

1. Personnaliser les images Docker avec DockerHub: hjarry.
2. Build et push les images.
3. Déploiement sur Kind.
4. CI/CD via GitHub Actions.
5. Vérification et tests.


# Projet 3-tiers Kubernetes — Starter

Contenu:
- /app/front : React SPA (liste + création)
- /app/back  : Express API (CRUD) — se connecte à PostgreSQL via variables d'environnement
- /k8s       : manifests Kubernetes (Deployments, Services, PVC, Ingress, ConfigMap, Secret templates)
- /ci        : GitHub Actions pipeline (CI + CD)
- /docs      : architecture, runbook, security
- reset-kind.sh : script pour reset Kind (supprime + recrée)
- Dockerfiles for front & back

Instructions rapides:
1. Installer Kind et Docker.
2. `./reset-kind.sh` pour créer un cluster named dev-cluster.
3. Build & push images (voir /ci).
4. `kubectl apply -f k8s/` pour déployer.


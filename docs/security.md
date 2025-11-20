## Gestion des secrets

- Secrets sensibles (DockerHub token, KUBECONFIG) **jamais commités dans le repo**.
- Utiliser les **secrets GitHub Actions** pour CI/CD.
- Accès limité aux collaborateurs du dépôt.

## Gestion des utilisateurs

- Contrôler les droits Kubernetes via RBAC.
- Accès à Docker Hub limité aux comptes autorisés.

## Bonnes pratiques pour les images

- Toujours rebuild les images après mise à jour des dépendances.
- Scanner les images pour vulnérabilités.
- Ne jamais inclure de secrets dans l'image finale.

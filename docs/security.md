# Sécurité et bonnes pratiques

## Gestion des secrets

Pour ce projet, j’ai fait en sorte que **tous les secrets sensibles** (DockerHub token, kubeconfig, mots de passe DB) **ne soient jamais commités dans le dépôt**.  
Dans ma CI/CD GitHub Actions, j’utilise les **Secrets GitHub** pour stocker ces informations et y accéder de façon sécurisée lors des builds et déploiements.  
Seuls les collaborateurs autorisés du dépôt ont accès à ces secrets.

**Bonnes pratiques supplémentaires** que j’ai suivies ou que je recommande :
- Ne jamais mettre de secrets dans les fichiers YAML Kubernetes ou Dockerfile en clair.
- Limiter la durée de vie et les permissions des tokens utilisés.
- Utiliser `kubectl apply --from-literal` ou des outils comme Sealed Secrets / SOPS pour gérer les secrets Kubernetes de manière chiffrée.

## Gestion des utilisateurs

Pour le cluster Kubernetes local (kind), j’ai testé avec mon utilisateur principal et je documente les commandes d’accès.  
Dans un vrai cluster, il serait nécessaire de :
- Contrôler finement les droits avec **RBAC** (Role / ClusterRole et RoleBinding / ClusterRoleBinding).
- Limiter l’accès aux services sensibles (backend, DB) uniquement aux comptes et pods autorisés.

## Bonnes pratiques pour les images Docker

Pour mes images front et back :
- Je rebuild toujours les images après chaque mise à jour des dépendances.
- Je pousse les images sur Docker Hub uniquement depuis la CI, avec login sécurisé via secrets.
- Les images sont construites pour **ne jamais inclure de secrets** ni utiliser le compte root lorsque possible.
- J’ai défini des `resources: requests/limits` dans les manifests Kubernetes pour limiter l’usage CPU et mémoire.
- Scanner régulièrement les images pour détecter les vulnérabilités (optionnel, mais recommandé).

## Résumé

En pratique, j’ai sécurisé :
- Les secrets via GitHub Actions et fichiers locaux non versionnés.
- L’accès au cluster avec un contexte Kubernetes dédié.
- Les images et déploiements avec des limites de ressources et sans secrets intégrés.

Ces mesures garantissent que le projet peut être déployé et testé sans exposer de données sensibles.

# Projet Kubernetes – Hugo Jarry

Ce projet déploie une application 3-tiers (frontend, backend, base de données PostgreSQL) sur un cluster Kind local. J’ai mis en place la CI/CD avec GitHub Actions pour automatiser le build et le push des images Docker, mais le déploiement automatique est désactivé sur le cluster local car Kind ne permet pas de l’exécuter directement.

---

## Ce que j’ai fait

### Architecture
- J’ai conçu une architecture simple mais complète : le frontend React communique avec le backend Node.js/Express, qui lui-même interagit avec PostgreSQL pour la persistance.
- Chaque composant est conteneurisé via Docker et orchestré avec Kubernetes pour gérer le scaling, les probes et le déploiement sans downtime.
- J’ai choisi Kind pour tester tout le déploiement localement, avec des PVC pour la base de données et des Secrets pour les credentials.

### CI/CD
- GitHub Actions build et push automatiquement les images Docker front et back vers Docker Hub.
- Les tests unitaires du backend sont intégrés dans la CI et tournent correctement à chaque push.
- Le déploiement automatique sur le cluster local est volontairement mis en `skip` car Kind ne peut pas recevoir un deploy direct depuis GitHub Actions. Mais tout est prêt pour un vrai cluster si besoin.

### Déploiement et vérifications
- Tous les pods et services ont été déployés sur Kind et sont opérationnels.
- Les probes et PVC garantissent la persistance et la disponibilité des services.

### Sécurité
- Les secrets sensibles (DockerHub token, KUBECONFIG) sont stockés dans les secrets GitHub Actions et **jamais commités** dans le repo.
- Les accès aux images Docker sont limités à mon compte, et rien de sensible n’est inclus dans les images finales.
- Sur Kubernetes, les bonnes pratiques sont appliquées : RBAC pour limiter les droits, probes et ressources définies pour éviter les surcharges.

### Documentation
Dans `/docs`, j’ai ajouté trois fichiers pour détailler le projet :
- `architecture.md` : diagramme, flux et justification des choix techniques
- `runbook.md` : déploiement, j'ai mis aussi les résultats des commandes pour montrer que ca marche.
- `security.md` : gestion des secrets, des utilisateurs et bonnes pratiques pour les images

---

Ce projet reflète exactement ce que j’ai testé et mis en place : tout fonctionne en local sur Kind et la CI est pleinement opérationnelle.

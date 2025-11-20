# Runbook

## Prérequis
- Docker
- kind
- kubectl
- kubectl configured to use kind (reset-kind.sh creates cluster)

## Déployer localement
1. ./reset-kind.sh
2. Build images locally and load into kind:
   docker build -t youruser/backend:latest ./app/back
   docker build -t youruser/frontend:latest ./app/front
   kind load docker-image youruser/backend:latest --name dev-cluster
   kind load docker-image youruser/frontend:latest --name dev-cluster
3. kubectl apply -f k8s/
4. kubectl get pods,svc,ingress,pvc

## Rollback
- Redeploy previous image tag and `kubectl rollout restart deployment/backend`

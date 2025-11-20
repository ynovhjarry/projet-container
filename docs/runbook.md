# Runbook : déploiement et troubleshooting

## Déploiement via GitHub Actions

1. Pousser vos commits sur la branche `main` :
```bash
git add .
git commit -m "Message"
git push origin main
CI/CD se déclenche automatiquement :

Build des images Docker frontend & backend
Push vers Docker Hub
Déploiement sur Kubernetes

## Prérequis
- Docker
- kind
- kubectl
- kubectl configured to use kind (reset-kind.sh creates cluster)

## Commande 



docker build -t hjarry/backend:latest ./app/back
docker build -t hjarry/frontend:latest ./app/front
docker push hjarry/backend:latest
docker push hjarry/frontend:latest
kubectl apply -f k8s/

root@PORTABLE-HUGO:~# kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
backend-7687fd8ccb-2v58r   1/1     Running   0          4h49m
backend-7687fd8ccb-g8bnw   1/1     Running   0          4h49m
frontend-5cf56fbc8-p5mpr   1/1     Running   0          4h49m
frontend-5cf56fbc8-xjtwq   1/1     Running   0          4h49m
postgres-7bf8bc65b-gfhw7   1/1     Running   0          4h49m
root@PORTABLE-HUGO:~# kubectl get pvc
NAME     STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
pgdata   Bound    pvc-bc367ed9-24a7-475b-ab66-0f763f90515a   1Gi        RWO            standard       <unset>                 4h50m
root@PORTABLE-HUGO:~# kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
backend      ClusterIP   10.96.13.178    <none>        3000/TCP   4h52m
frontend     ClusterIP   10.96.140.149   <none>        80/TCP     4h52m
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP    6h56m
postgres     ClusterIP   None            <none>        5432/TCP   4h52m
root@PORTABLE-HUGO:~# kubectl get ingress
NAME               CLASS    HOSTS       ADDRESS   PORTS   AGE
frontend-ingress   <none>   dev.local             80      4h52m
root@PORTABLE-HUGO:~# docker ps
CONTAINER ID   IMAGE                  COMMAND                  CREATED       STATUS       PORTS                       NAMES
fad73d5d2c5f   kindest/node:v1.34.0   "/usr/local/bin/entr…"   7 hours ago   Up 5 hours   127.0.0.1:36673->6443/tcp   dev-cluster-control-plane
root@PORTABLE-HUGO:~#



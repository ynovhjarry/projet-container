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

root@PORTABLE-HUGO:~/projet# kubectl apply -f k8s/
deployment.apps/backend unchanged
service/backend unchanged
deployment.apps/frontend unchanged
service/frontend unchanged
ingress.networking.k8s.io/frontend-ingress unchanged
persistentvolumeclaim/pgdata unchanged
deployment.apps/postgres unchanged
service/postgres unchanged
secret/pg-secret configured
configmap/app-config unchanged
root@PORTABLE-HUGO:~/projet# cd app/back
root@PORTABLE-HUGO:~/projet/app/back# npm test

> backend@1.0.0 test
> jest --coverage

 PASS  tests/app.test.js
  API health
    ✓ should return status ok (27 ms)

----------|---------|----------|---------|---------|-------------------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------------------
All files |   44.68 |     8.33 |      25 |   46.34 |
 index.js |   44.68 |     8.33 |      25 |   46.34 | 17-25,32-36,41-48,52-59,68-69
----------|---------|----------|---------|---------|-------------------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.54 s, estimated 1 s
Ran all test suites.



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


root@PORTABLE-HUGO:~/projet# kubectl port-forward svc/backend 3000:3000
Forwarding from 127.0.0.1:3000 -> 3000
Forwarding from [::1]:3000 -> 3000
Handling connection for 3000
Handling connection for 3000
^Croot@PORTABLE-HUGO:~/projetkubectl port-forward svc/frontend 30080:8080
Forwarding from 127.0.0.1:30080 -> 80
Forwarding from [::1]:30080 -> 80
        Handling connection for 30080
Handling connection for 30080
Handling connection for 30080
Handling connection for 30080

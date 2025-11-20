# Architecture

3-tiers:
- Front (React SPA) -> calls Backend API (ClusterIP service)
- Backend (Express) -> connects to PostgreSQL (ClusterIP service + PVC)
- Ingress exposes the front (host dev.local)

Choices:
- Kind for local cluster
- Docker Hub as image registry
- GitHub Actions for CI/CD

# Security notes

- Never commit real passwords. Use GitHub Secrets or sealed-secrets.
- Images run as default user; for production set non-root users in Dockerfiles.
- Resource limits defined in manifests to avoid noisy neighbors.

#!/bin/bash
set -euo pipefail
CLUSTER_NAME="dev-cluster"

echo "🔍 Vérification du cluster Kind existant..."
if kind get clusters | grep -q "^${CLUSTER_NAME}$"; then
  echo "🗑️  Suppression du cluster Kind : ${CLUSTER_NAME}"
  kind delete cluster --name "${CLUSTER_NAME}"
else
  echo "ℹ️  Aucun cluster nommé ${CLUSTER_NAME} n'existe."
fi

echo "🚀 Recréation du cluster Kind : ${CLUSTER_NAME}"
kind create cluster --name "${CLUSTER_NAME}"

echo "✅ Cluster réinitialisé avec succès !"

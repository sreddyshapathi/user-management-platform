#!/bin/bash

set -e

###############################################
# User Management Platform Startup Script
###############################################

MINIKUBE_CPUS=4
MINIKUBE_MEMORY=8192

FRONTEND_IMAGE="user-management-frontend:v1"
BACKEND_IMAGE="user-management-backend:v1"

echo "=================================================="
echo "   User Management Platform Startup"
echo "=================================================="

###############################################
# Check Docker
###############################################

echo ""
echo "Checking Docker..."

if ! docker info >/dev/null 2>&1; then
    echo "ERROR: Docker Desktop is not running."
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "✓ Docker is running."

###############################################
# Start Minikube
###############################################

echo ""
echo "Checking Minikube..."

if ! minikube status >/dev/null 2>&1; then

    echo "Starting Minikube..."

    minikube start \
        --driver=docker \
        --cpus=${MINIKUBE_CPUS} \
        --memory=${MINIKUBE_MEMORY}

else

    echo "✓ Minikube is already running."

fi

###############################################
# Enable Ingress
###############################################

echo ""
echo "Enabling Ingress..."

minikube addons enable ingress

###############################################
# Build Docker Images
###############################################

echo ""
echo "Building Frontend Image..."

docker build \
    -t ${FRONTEND_IMAGE} \
    ./frontend

echo ""
echo "Building Backend Image..."

docker build \
    -t ${BACKEND_IMAGE} \
    ./backend

###############################################
# Load Images into Minikube
###############################################

echo ""
echo "Loading Images into Minikube..."

minikube image load ${FRONTEND_IMAGE}

minikube image load ${BACKEND_IMAGE}

###############################################
# Deploy Kubernetes Resources
###############################################

echo ""
echo "Deploying Kubernetes Resources..."

find ./k8s -name "*.yaml" | sort | while read -r file
do
    if [ ! -s "$file" ]; then
        echo "Skipping empty file: $(basename "$file")"
        continue
    fi

    echo "Applying $(basename "$file")..."
    kubectl apply -f "$file"
done

###############################################
# Restart Deployments
###############################################

echo ""
echo "Restarting Deployments..."

kubectl rollout restart deployment/frontend -n user-management || true
kubectl rollout restart deployment/backend -n user-management || true

###############################################
# Wait for Pods
###############################################

echo ""
echo "Waiting for Pods..."

kubectl wait \
    --for=condition=Ready \
    pod \
    --all \
    -n user-management \
    --timeout=300s

###############################################
# Show Status
###############################################

echo ""
echo "=================================================="
echo "Pods"
echo "=================================================="

kubectl get pods -n user-management

echo ""
echo "=================================================="
echo "Services"
echo "=================================================="

kubectl get svc -n user-management

echo ""
echo "=================================================="
echo "Ingress"
echo "=================================================="

kubectl get ingress -n user-management

echo ""
echo "=================================================="
echo "Application Started Successfully"
echo "=================================================="

echo ""
echo "Starting Ingress Tunnel..."
echo ""
echo "Press Ctrl+C to stop the tunnel."
echo ""

echo ""
echo "=================================================="
echo "Application URLs"
echo "=================================================="

minikube service ingress-nginx-controller \
    -n ingress-nginx
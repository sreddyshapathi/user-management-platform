# Frontend Deployment (09-frontend-deployment.yaml)

# Overview

The Frontend Deployment manages the React application's Pods inside Kubernetes. A Deployment ensures that the desired number of frontend Pods are always running, supports rolling updates, self-healing, and automatic recovery from failures.

The frontend communicates with users through a Kubernetes Service and interacts with the backend using the internal backend Service.

---

# Objectives

* Deploy the React frontend.
* Maintain multiple replicas for high availability.
* Enable rolling updates with zero downtime.
* Configure CPU and memory limits.
* Add health probes for reliability.
* Prepare the application for AKS production deployment.

---

# File Location

```text
kubernetes/
└── frontend/
    └── 09-frontend-deployment.yaml
```

---

# Architecture

```text
                User
                  │
                  ▼
        Frontend Service
                  │
                  ▼
        Frontend Deployment
          ┌──────────────┐
          │ Frontend Pod │
          ├──────────────┤
          │ Frontend Pod │
          └──────────────┘
                  │
                  ▼
        Backend Service
                  │
                  ▼
            PostgreSQL
```

---

# YAML Explanation

## apiVersion

```yaml
apiVersion: apps/v1
```

Uses the Kubernetes Apps API for Deployments.

---

## kind

```yaml
kind: Deployment
```

Creates a Deployment that manages ReplicaSets and Pods.

---

## metadata

```yaml
metadata:
  name: frontend
  namespace: user-management
```

* **name**: Deployment name.
* **namespace**: Deploys into the `user-management` namespace.

---

## replicas

```yaml
replicas: 2
```

Runs two frontend Pods for high availability.

If one Pod fails, users can still access the application through the remaining Pod.

---

## selector

```yaml
selector:
  matchLabels:
    app: frontend
```

Matches Pods with the label:

```yaml
labels:
  app: frontend
```

---

## Pod Template

```yaml
template:
```

Defines how Kubernetes creates frontend Pods.

---

## Container

```yaml
containers:
```

Defines the frontend container.

---

## Image

```yaml
image: usermanagementacr.azurecr.io/frontend:latest
```

Container image stored in Azure Container Registry.

For local Minikube testing:

```yaml
image: frontend:latest
```

---

## Image Pull Policy

```yaml
imagePullPolicy: Always
```

AKS always checks for the latest image.

During local development:

```yaml
IfNotPresent
```

is preferred.

---

## Container Port

```yaml
containerPort: 80
```

The React application is served through NGINX on port **80**.

---

## Resource Requests

```yaml
requests:
  memory: "128Mi"
  cpu: "100m"
```

Guaranteed minimum resources.

---

## Resource Limits

```yaml
limits:
  memory: "256Mi"
  cpu: "250m"
```

Maximum resources the container can consume.

---

## Liveness Probe

```yaml
livenessProbe
```

Checks whether the application is still running.

If the probe fails repeatedly, Kubernetes restarts the container automatically.

---

## Readiness Probe

```yaml
readinessProbe
```

Determines when the Pod is ready to receive user traffic.

Traffic is only routed to healthy Pods.

---

# Deployment

Deploy the frontend:

```bash
kubectl apply -f kubernetes/frontend/09-frontend-deployment.yaml
```

---

# Verification

View Deployments:

```bash
kubectl get deployments -n user-management
```

Expected output:

```text
NAME       READY   UP-TO-DATE   AVAILABLE
frontend   2/2     2            2
```

---

View Pods:

```bash
kubectl get pods -n user-management
```

Expected output:

```text
frontend-xxxxx-abcde   Running
frontend-xxxxx-fghij   Running
```

---

Describe Deployment:

```bash
kubectl describe deployment frontend -n user-management
```

Verify:

* Replica count
* Events
* Image
* Resource requests
* Health probes

---

View Logs

```bash
kubectl logs deployment/frontend -n user-management
```

---

# Troubleshooting

## Pods Not Starting

```bash
kubectl describe pod <pod-name> -n user-management
```

Check Events for scheduling or image pull errors.

---

## Image Pull Error

Verify:

* Image name
* Azure Container Registry authentication
* Image tag
* `imagePullSecrets` (when using private registries)

---

## CrashLoopBackOff

Inspect logs:

```bash
kubectl logs <pod-name> -n user-management
```

Verify:

* Application startup
* Environment variables
* Backend URL configuration

---

## Readiness Probe Failed

Ensure the frontend serves HTTP requests on port **80**.

---

# Best Practices

* Run multiple replicas.
* Define CPU and memory requests/limits.
* Configure readiness and liveness probes.
* Store images in Azure Container Registry.
* Avoid using the `latest` tag in production; prefer versioned tags such as `v1.0.0`.
* Use rolling updates for zero-downtime deployments.

---

# Interview Questions

### 1. Why use a Deployment instead of creating Pods directly?

A Deployment provides self-healing, scaling, rolling updates, and rollback capabilities.

---

### 2. Why are two replicas configured?

To improve availability and ensure the application remains accessible if one Pod fails.

---

### 3. What is the difference between a Liveness Probe and a Readiness Probe?

* **Liveness Probe:** Determines whether the container should be restarted.
* **Readiness Probe:** Determines whether the Pod is ready to receive traffic.

---

### 4. Why define CPU and memory limits?

To prevent a container from consuming excessive resources and affecting other workloads on the cluster.

---

### 5. Why use Azure Container Registry?

ACR provides a secure, private image repository that integrates seamlessly with Azure Kubernetes Service.

---

# Summary

The Frontend Deployment ensures the React application is highly available, self-healing, resource-controlled, and production-ready. Combined with a Kubernetes Service and Ingress, it provides a scalable and resilient frontend architecture suitable for enterprise AKS deployments.

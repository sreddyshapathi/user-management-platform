# Backend Deployment

## Objective

Deploy the Spring Boot Backend application into the Kubernetes cluster.

The backend communicates with PostgreSQL using the internal Kubernetes Service (`postgres-service`) and retrieves its configuration from a ConfigMap and Secret.

---

# Architecture

```
                    user-management Namespace

               ConfigMap          Secret
                    │               │
                    └───────┬───────┘
                            │
                  Backend Deployment
                            │
                     Spring Boot Pod
                            │
         jdbc:postgresql://postgres-service:5432
                            │
                            ▼
                  PostgreSQL Service
                            │
                            ▼
                     PostgreSQL Pod
```

---

# Image

```
user-management-backend:v1
```

---

# Namespace

```
user-management
```

---

# Replica Count

```
1
```

---

# Port

```
8080
```

---

# Environment Variables

The backend retrieves configuration from Kubernetes resources.

## ConfigMap

| Variable | Description |
|----------|-------------|
| SPRING_DATASOURCE_USERNAME | PostgreSQL Username |
| SPRING_JPA_HIBERNATE_DDL_AUTO | Hibernate Configuration |

---

## Secret

| Variable | Description |
|----------|-------------|
| SPRING_DATASOURCE_PASSWORD | PostgreSQL Password |

---

## Direct Environment Variable

```
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-service:5432/user_management
```

---

# Resources

## Requests

Memory

```
512Mi
```

CPU

```
250m
```

---

## Limits

Memory

```
1Gi
```

CPU

```
500m
```

---

# Image Pull Policy

For Minikube

```
Never
```

Reason

The Docker image is loaded directly into Minikube.

During AKS deployment this will change to

```
Always
```

using the Helm values file.

---

# Deploy

```bash
kubectl apply -f k8s/07-backend-deployment.yaml
```

---

# Verify Deployment

```bash
kubectl get deployment -n user-management
```

---

# Verify Pods

```bash
kubectl get pods -n user-management
```

---

# View Logs

```bash
kubectl logs deployment/backend -n user-management
```

Expected

```
Started UserManagementApplication
```

---

# Production Best Practices

The backend deployment is designed following Kubernetes best practices.

Features included:

- Resource Requests
- Resource Limits
- ConfigMap Integration
- Secret Integration
- Namespace Isolation

---

# Future Improvements

The following features will be added later:

- Liveness Probe
- Readiness Probe
- Startup Probe
- Horizontal Pod Autoscaler (HPA)
- PodDisruptionBudget
- ServiceAccount
- NetworkPolicy
- Prometheus Monitoring
- Grafana Dashboards

---

# Azure AKS Compatibility

This deployment is designed to work in:

- Minikube
- AKS Development
- AKS Production

No deployment YAML changes will be required.

Only the Helm values file will change.

---

# Commands

Deploy

```bash
kubectl apply -f k8s/07-backend-deployment.yaml
```

Check Deployments

```bash
kubectl get deployment -n user-management
```

Check Pods

```bash
kubectl get pods -n user-management
```

Describe Deployment

```bash
kubectl describe deployment backend -n user-management
```

View Logs

```bash
kubectl logs deployment/backend -n user-management
```

Delete Deployment

```bash
kubectl delete -f k8s/07-backend-deployment.yaml
```

---

# Summary

The Spring Boot Backend is deployed as a Kubernetes Deployment.

It securely connects to PostgreSQL using Kubernetes Services, retrieves configuration from ConfigMaps, sensitive information from Secrets, and is prepared for future enhancements such as health probes, autoscaling, monitoring, and Helm-based deployments.

This deployment will later be reused without modification for Minikube, AKS Development, and AKS Production by changing only the Helm values files.
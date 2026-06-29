# Kubernetes Ingress (11-ingress.yaml)

# Overview

Ingress is a Kubernetes API resource that manages external HTTP and HTTPS access to applications running inside a Kubernetes cluster.

Instead of exposing every application using a separate LoadBalancer or NodePort Service, an Ingress provides a centralized entry point for all incoming traffic. An Ingress Controller (NGINX in this project) receives external requests and routes them to the appropriate Kubernetes Services based on hostname or URL path.

In this project, the Ingress routes browser requests to the React frontend, which communicates with the backend API and PostgreSQL database.

---

# Objectives

* Expose the application outside the Kubernetes cluster.
* Use a single entry point for all HTTP/HTTPS traffic.
* Enable host-based routing.
* Support future TLS/SSL configuration.
* Prepare the application for production deployment on Azure Kubernetes Service (AKS).

---

# File Location

```text
kubernetes/
└── ingress/
    └── 11-ingress.yaml
```

---

# YAML Configuration

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress

metadata:
  name: user-management-ingress
  namespace: user-management

  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /

spec:
  ingressClassName: nginx

  rules:
    - host: usermanagement.local

      http:
        paths:
          - path: /
            pathType: Prefix

            backend:
              service:
                name: frontend-service

                port:
                  number: 80
```

---

# Architecture

```text
                  Internet
                      │
                      ▼
          NGINX Ingress Controller
                      │
                      ▼
          user-management-ingress
                      │
                      ▼
            frontend-service
                      │
            ┌─────────┴─────────┐
            ▼                   ▼
      Frontend Pod 1      Frontend Pod 2
                      │
                      ▼
             backend-service
                      │
                      ▼
               Backend Pods
                      │
                      ▼
             postgres-service
                      │
                      ▼
             PostgreSQL Database
```

---

# Why Do We Need an Ingress?

Without an Ingress, every application would require its own external Service.

Example:

```text
Frontend → LoadBalancer

Backend → LoadBalancer

Grafana → LoadBalancer

Prometheus → LoadBalancer
```

This increases:

* Infrastructure cost
* Public IP usage
* Network complexity

With an Ingress:

```text
Internet

↓

NGINX Ingress Controller

↓

Frontend

Backend

Grafana

Prometheus
```

A single Ingress Controller manages routing for multiple applications.

---

# YAML Explanation

## apiVersion

```yaml
apiVersion: networking.k8s.io/v1
```

Defines the Kubernetes API version for Ingress resources.

---

## kind

```yaml
kind: Ingress
```

Creates an Ingress resource.

---

## metadata

```yaml
metadata:
```

Stores identifying information for the Ingress.

### name

```yaml
name: user-management-ingress
```

Unique name of the Ingress resource.

---

### namespace

```yaml
namespace: user-management
```

Deploys the Ingress in the application's namespace.

---

## annotations

```yaml
annotations:
  nginx.ingress.kubernetes.io/rewrite-target: /
```

Annotations customize the behavior of the NGINX Ingress Controller.

The `rewrite-target` annotation rewrites incoming request paths before forwarding them to the backend Service.

---

## spec

Defines how requests should be routed.

---

## ingressClassName

```yaml
ingressClassName: nginx
```

Specifies that the NGINX Ingress Controller should process this Ingress.

---

## rules

Defines routing rules.

---

### Host

```yaml
host: usermanagement.local
```

Requests for:

```text
http://usermanagement.local
```

are routed to the frontend application.

---

### Path

```yaml
path: /
```

Routes all requests beginning with `/`.

---

### pathType

```yaml
pathType: Prefix
```

Matches:

```text
/

 /login

 /dashboard

 /users

 /profile
```

---

### Backend

```yaml
backend:
```

Specifies the destination Service.

```yaml
service:
  name: frontend-service
```

Ingress forwards requests to the Frontend Service.

```yaml
port:
  number: 80
```

Requests are forwarded to Service port **80**.

---

# Request Flow

```text
User Browser

↓

http://usermanagement.local

↓

NGINX Ingress Controller

↓

user-management-ingress

↓

frontend-service

↓

Frontend Pods

↓

backend-service

↓

Backend Pods

↓

postgres-service

↓

PostgreSQL
```

---

# Deployment

Deploy the Ingress:

```bash
kubectl apply -f kubernetes/ingress/11-ingress.yaml
```

---

# Verification

Verify the Ingress:

```bash
kubectl get ingress
```

Describe the Ingress:

```bash
kubectl describe ingress user-management-ingress
```

Verify the Ingress Controller:

```bash
kubectl get pods -n ingress-nginx
```

Verify Services:

```bash
kubectl get svc
```

Verify Endpoints:

```bash
kubectl get endpoints
```

---

# Local Development (Minikube)

Enable the Ingress addon:

```bash
minikube addons enable ingress
```

Verify:

```bash
kubectl get pods -n ingress-nginx
```

For **macOS using the Docker driver**, expose the Ingress locally:

```bash
minikube service ingress-nginx-controller -n ingress-nginx
```

or

```bash
minikube service ingress-nginx-controller -n ingress-nginx --url
```

Keep the terminal running while accessing the application.

---

# Production (AKS)

In Azure Kubernetes Service:

```text
Internet

↓

Azure Public IP

↓

Azure Load Balancer

↓

NGINX Ingress Controller

↓

Ingress

↓

Frontend Service

↓

Frontend Pods
```

Unlike Minikube, AKS provides a public endpoint through an Azure Load Balancer. No local tunnel is required.

---

# Troubleshooting

## 404 Not Found

Possible causes:

* Incorrect host name.
* Incorrect Ingress rule.
* Backend Service not found.
* Service has no endpoints.

Check:

```bash
kubectl describe ingress user-management-ingress
```

---

## Service Has No Endpoints

Verify:

```bash
kubectl get endpoints frontend-service
```

If empty:

* Verify frontend Pods are running.
* Verify labels match the Service selector.

---

## ImagePullBackOff

Check:

```bash
kubectl describe pod <frontend-pod>
```

Ensure the container image exists locally or in the container registry.

---

## Ingress Controller Not Running

Verify:

```bash
kubectl get pods -n ingress-nginx
```

The controller Pod must be in the **Running** state.

---

## Browser Cannot Access the Application

For Minikube with the Docker driver:

```bash
minikube service ingress-nginx-controller -n ingress-nginx
```

Keep the terminal open while accessing the application.

---

# Best Practices

* Use one Ingress Controller for multiple applications.
* Keep application Services as `ClusterIP`.
* Use TLS certificates for HTTPS in production.
* Use DNS names instead of IP addresses.
* Use host-based or path-based routing.
* Configure health checks and readiness probes.
* Keep Ingress rules simple and maintainable.

---

# Interview Questions

## 1. What is an Ingress?

An Ingress is a Kubernetes resource that manages external HTTP/HTTPS access to Services inside a cluster.

---

## 2. What is an Ingress Controller?

An Ingress Controller watches Ingress resources and configures a reverse proxy (such as NGINX) to route traffic according to those rules.

---

## 3. Can an Ingress work without an Ingress Controller?

No.

An Ingress only defines routing rules. An Ingress Controller is required to implement those rules.

---

## 4. Why use an Ingress instead of a LoadBalancer?

Using one Ingress Controller reduces the number of external IP addresses and LoadBalancers, lowering infrastructure cost and simplifying traffic management.

---

## 5. What is `ingressClassName`?

It specifies which Ingress Controller should process the Ingress resource.

Example:

```yaml
ingressClassName: nginx
```

---

## 6. What is the purpose of `rewrite-target`?

It rewrites incoming request paths before forwarding them to the backend Service. This is useful when backend applications expect different URL structures.

---

## 7. What is the difference between `Prefix` and `Exact` path types?

* **Prefix** matches all paths beginning with the specified value.
* **Exact** matches only the exact path.

---

# Summary

The Ingress provides a single external entry point into the Kubernetes cluster. It routes HTTP/HTTPS traffic through the NGINX Ingress Controller to the frontend Service, which forwards requests to the frontend Pods. The frontend then communicates with the backend Service and PostgreSQL. This architecture is widely used in enterprise Kubernetes environments and aligns with production deployments on Azure Kubernetes Service.

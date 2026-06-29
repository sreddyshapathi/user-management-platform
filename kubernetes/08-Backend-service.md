# Backend Service (08-backend-service.yaml)

## Overview

The Backend Service provides a stable network endpoint for the backend application running inside the Kubernetes cluster. Since Pods are ephemeral and their IP addresses change whenever they are recreated, applications should never communicate directly with Pod IP addresses. Instead, Kubernetes Services provide a permanent virtual IP and DNS name that clients can use to communicate with backend Pods.

For the User Management Platform, the Backend Service is configured as a **ClusterIP** Service because it is only accessed internally by other Kubernetes workloads, such as the Frontend application.

---

# Objectives

* Provide a stable endpoint for backend Pods.
* Enable service discovery using Kubernetes DNS.
* Load balance traffic across multiple backend replicas.
* Hide Pod IP address changes from clients.
* Allow secure internal communication within the cluster.

---

# File Location

```
kubernetes/
└── backend/
    └── 08-backend-service.yaml
```

---

# YAML Configuration

```yaml
apiVersion: v1
kind: Service

metadata:
  name: backend-service
  namespace: user-management

spec:
  type: ClusterIP

  selector:
    app: backend

  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
```

---

# YAML Explanation

## apiVersion

```yaml
apiVersion: v1
```

Defines the Kubernetes API version for the Service resource.

---

## kind

```yaml
kind: Service
```

Creates a Kubernetes Service object.

---

## metadata

```yaml
metadata:
```

Contains identifying information for the Service.

### name

```yaml
name: backend-service
```

The Service name becomes its DNS name inside the cluster.

Applications can access the backend using:

```
http://backend-service:8080
```

---

### namespace

```yaml
namespace: user-management
```

Deploys the Service inside the `user-management` namespace.

---

## spec

Defines the behavior of the Service.

---

## type

```yaml
type: ClusterIP
```

Creates an internal virtual IP that is only accessible within the Kubernetes cluster.

This is the recommended Service type for backend microservices.

---

## selector

```yaml
selector:
  app: backend
```

The selector matches Pods with the following label:

```yaml
labels:
  app: backend
```

Only matching Pods receive traffic.

---

## ports

```yaml
ports:
```

Defines how traffic is forwarded.

### protocol

```yaml
protocol: TCP
```

The application communicates using TCP.

---

### port

```yaml
port: 8080
```

The port exposed by the Service.

Other applications connect using:

```
backend-service:8080
```

---

### targetPort

```yaml
targetPort: 8080
```

Traffic is forwarded to port **8080** inside the backend container.

---

# Traffic Flow

```
Frontend Pod
      │
      │ HTTP Request
      ▼
+-----------------------+
|   backend-service     |
|     ClusterIP         |
+-----------------------+
      │
      ▼
+-----------------------+
|   Backend Pod 1       |
|      Port 8080        |
+-----------------------+
      │
      ▼
+-----------------------+
| PostgreSQL Service    |
+-----------------------+
```

---

# Kubernetes DNS

Every Service automatically receives a DNS name.

Examples:

```
backend-service
postgres-service
frontend-service
```

The frontend communicates with the backend using:

```
http://backend-service:8080
```

No IP addresses are hardcoded.

---

# Load Balancing

If the backend Deployment has multiple replicas, the Service automatically distributes requests among healthy Pods.

Example:

```
Request 1 → Backend Pod 1

Request 2 → Backend Pod 2

Request 3 → Backend Pod 3
```

This provides high availability and scalability.

---

# Deploy the Service

```bash
kubectl apply -f kubernetes/backend/08-backend-service.yaml
```

---

# Verify Deployment

List Services:

```bash
kubectl get svc -n user-management
```

Expected output:

```
NAME              TYPE        CLUSTER-IP      PORT(S)
backend-service   ClusterIP   10.x.x.x        8080/TCP
```

---

Describe the Service:

```bash
kubectl describe svc backend-service -n user-management
```

Verify:

* Selector
* Endpoints
* Port
* TargetPort

---

View Endpoints

```bash
kubectl get endpoints -n user-management
```

Expected output:

```
backend-service

10.244.0.10:8080
10.244.0.11:8080
```

These are the backend Pods receiving traffic.

---

# Test Connectivity

Create a temporary test Pod:

```bash
kubectl run test \
--image=busybox \
-it \
--rm \
-n user-management \
-- sh
```

Inside the Pod:

```
wget -qO- http://backend-service:8080
```

Or test DNS:

```
nslookup backend-service
```

Successful responses confirm that DNS resolution and Service routing are working correctly.

---

# Troubleshooting

## No Endpoints

Check:

```bash
kubectl get endpoints backend-service -n user-management
```

If no endpoints are listed:

* Verify the Deployment labels.
* Verify the Service selector.
* Ensure backend Pods are running.

---

## Service Not Reachable

Verify backend Pods:

```bash
kubectl get pods -n user-management
```

Check logs:

```bash
kubectl logs deployment/backend -n user-management
```

---

## Incorrect Port

Ensure that:

```
containerPort = 8080
targetPort = 8080
Service Port = 8080
```

All three values should be consistent.

---

## DNS Resolution Failure

Verify CoreDNS:

```bash
kubectl get pods -n kube-system
```

Ensure the CoreDNS Pods are in the **Running** state.

---

# Best Practices

* Use ClusterIP for internal microservices.
* Keep Service selectors simple and consistent.
* Never access backend Pods directly by IP.
* Use Kubernetes DNS names for service discovery.
* Configure readiness probes so Services only send traffic to healthy Pods.
* Scale the Deployment rather than creating multiple Services.
* Keep Services stateless and focused on traffic routing.

---

# Interview Questions

### 1. Why do we need a Kubernetes Service?

A Service provides a stable network endpoint and DNS name for Pods whose IP addresses change over time.

---

### 2. Why is ClusterIP used for the backend?

Because the backend should only be accessible from within the Kubernetes cluster. External traffic should typically enter through an Ingress Controller or API Gateway.

---

### 3. What is the difference between `port` and `targetPort`?

* **port**: The port exposed by the Service.
* **targetPort**: The port on the container where the application is listening.

---

### 4. What happens if a backend Pod is deleted?

The Deployment creates a replacement Pod, and the Service automatically updates its endpoints to route traffic only to healthy Pods.

---

### 5. How does the Service know which Pods to send traffic to?

The Service uses its **selector** to match Pod labels. Any Pod with matching labels becomes an endpoint for the Service.

---

# Summary

The Backend Service provides a stable and reliable communication layer between Kubernetes workloads and the backend application. By using a ClusterIP Service, the User Management Platform follows Kubernetes best practices for internal service discovery, automatic load balancing, and resilient networking.

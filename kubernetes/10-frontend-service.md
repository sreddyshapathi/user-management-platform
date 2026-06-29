# Frontend Service (10-frontend-service.yaml)

# Overview

The Frontend Service provides a stable internal network endpoint for the frontend application running inside the Kubernetes cluster. Since frontend Pods are ephemeral and their IP addresses change whenever they are recreated, clients should never communicate directly with Pod IP addresses.

Instead, Kubernetes Services provide a stable virtual IP address and DNS name that remain unchanged even if Pods are restarted or replaced.

The Frontend Service is configured as a **ClusterIP** Service because it is accessed internally by the Ingress Controller. External user traffic enters the cluster through the Ingress Controller, which forwards requests to the Frontend Service.

---

# Objectives

* Provide a stable endpoint for frontend Pods.
* Enable Kubernetes DNS-based service discovery.
* Load balance traffic across multiple frontend Pods.
* Hide Pod IP address changes.
* Support high availability and scalability.
* Prepare the application for Ingress-based external access.

---

# File Location

```text
kubernetes/
└── frontend/
    └── 10-frontend-service.yaml
```

---

# YAML Configuration

```yaml
apiVersion: v1
kind: Service

metadata:
  name: frontend-service
  namespace: user-management

spec:
  type: ClusterIP

  selector:
    app: frontend

  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

---

# YAML Explanation

## apiVersion

```yaml
apiVersion: v1
```

Specifies the Kubernetes API version used to create a Service resource.

---

## kind

```yaml
kind: Service
```

Creates a Kubernetes Service object.

A Service provides a permanent endpoint for one or more Pods.

---

## metadata

```yaml
metadata:
  name: frontend-service
  namespace: user-management
```

### name

```yaml
frontend-service
```

The Service name becomes the DNS name inside Kubernetes.

Applications can communicate using:

```text
http://frontend-service
```

instead of using Pod IP addresses.

---

### namespace

Deploys the Service inside the **user-management** namespace.

---

## spec

Defines how the Service behaves.

---

## type

```yaml
type: ClusterIP
```

Creates an internal virtual IP address.

Only applications running inside the Kubernetes cluster can access this Service directly.

This is the recommended Service type for frontend applications when using an Ingress Controller.

---

## selector

```yaml
selector:
  app: frontend
```

The selector identifies which Pods belong to the Service.

It matches Pods created by the Frontend Deployment with the label:

```yaml
labels:
  app: frontend
```

Whenever new frontend Pods are created, they are automatically added to the Service.

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

Specifies the communication protocol.

---

### port

```yaml
port: 80
```

The Service exposes port **80** inside the Kubernetes cluster.

Applications communicate using:

```text
frontend-service:80
```

---

### targetPort

```yaml
targetPort: 80
```

Traffic received on Service port **80** is forwarded to container port **80** inside the frontend Pods.

---

# Architecture

```text
                  Internet
                      │
                      ▼
          NGINX Ingress Controller
                      │
                      ▼
             frontend-service
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
    Frontend Pod 1         Frontend Pod 2
          │
          ▼
     backend-service
          │
          ▼
      PostgreSQL
```

---

# Request Flow

```text
Browser

↓

Ingress Controller

↓

frontend-service

↓

Frontend Pod

↓

backend-service

↓

Backend Pod

↓

postgres-service

↓

PostgreSQL
```

---

# Kubernetes DNS

Every Service automatically receives a DNS name.

Examples:

```text
frontend-service

backend-service

postgres-service
```

Frontend Pods communicate with the backend using:

```text
http://backend-service:8080
```

No IP addresses are hardcoded.

---

# Load Balancing

Suppose the frontend Deployment has three replicas.

```text
Frontend Pod 1

Frontend Pod 2

Frontend Pod 3
```

Incoming requests are automatically distributed.

```text
Request 1 → Pod 1

Request 2 → Pod 2

Request 3 → Pod 3

Request 4 → Pod 1
```

This provides high availability and better performance.

---

# Deploy the Service

```bash
kubectl apply -f kubernetes/frontend/10-frontend-service.yaml
```

---

# Verification

List Services:

```bash
kubectl get svc
```

Expected output:

```text
NAME                TYPE        CLUSTER-IP      PORT(S)

frontend-service    ClusterIP   10.x.x.x        80/TCP
```

---

Describe the Service:

```bash
kubectl describe svc frontend-service
```

Verify:

* Selector
* Port
* TargetPort
* Endpoints

---

Check Endpoints

```bash
kubectl get endpoints frontend-service
```

Expected output:

```text
NAME                ENDPOINTS

frontend-service    10.244.0.15:80,10.244.0.16:80
```

These are the frontend Pods currently receiving traffic.

---

# Test Connectivity

Create a temporary Pod:

```bash
kubectl run test \
--image=busybox \
-it \
--rm \
-- sh
```

Inside the Pod:

```bash
wget -qO- http://frontend-service
```

Or verify DNS:

```bash
nslookup frontend-service
```

Successful output confirms that:

* DNS resolution works.
* The Service routes traffic correctly.

---

# Troubleshooting

## No Endpoints

```bash
kubectl get endpoints frontend-service
```

If no endpoints are displayed:

* Verify frontend Pods are running.
* Verify labels match the Service selector.

---

## Service Not Reachable

Check frontend Pods:

```bash
kubectl get pods
```

View logs:

```bash
kubectl logs deployment/frontend
```

---

## Incorrect Port

Verify that:

```text
containerPort = 80

targetPort = 80

Service Port = 80
```

All values should be consistent.

---

## DNS Resolution Failure

Verify CoreDNS:

```bash
kubectl get pods -n kube-system
```

Ensure CoreDNS Pods are in the **Running** state.

---

# Best Practices

* Use ClusterIP for internal application Services.
* Expose applications externally through an Ingress Controller.
* Never communicate directly with Pod IP addresses.
* Use Kubernetes DNS names for service discovery.
* Keep labels and selectors consistent.
* Configure readiness probes so only healthy Pods receive traffic.
* Scale Deployments instead of creating additional Services.

---

# Interview Questions

## 1. Why do we need a Frontend Service?

A Service provides a stable network endpoint for frontend Pods whose IP addresses change whenever Pods are recreated.

---

## 2. Why is ClusterIP used?

The frontend is accessed through an Ingress Controller. Therefore, the Service only needs to be reachable from inside the cluster.

---

## 3. What is the difference between port and targetPort?

* **port** – The port exposed by the Service.
* **targetPort** – The port on the frontend container where requests are forwarded.

---

## 4. How does Kubernetes know which Pods belong to the Service?

The Service uses its selector to match Pod labels. Any Pod with the label:

```yaml
app: frontend
```

becomes an endpoint.

---

## 5. What happens if a frontend Pod crashes?

The Service automatically removes the failed Pod from its endpoints.

The Deployment creates a replacement Pod.

Once the new Pod passes the readiness probe, the Service begins routing traffic to it automatically.

---

# Summary

The Frontend Service provides a stable networking layer between the Ingress Controller and the frontend Pods. It abstracts Pod IP addresses, enables Kubernetes DNS-based service discovery, and automatically load balances requests across healthy frontend replicas. This architecture improves scalability, reliability, and maintainability, making it suitable for enterprise Kubernetes deployments.

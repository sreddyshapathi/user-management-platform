# PostgreSQL Deployment

## Objective

Deploy PostgreSQL inside Kubernetes.

---

## Components Used

- Deployment
- ConfigMap
- Secret
- Persistent Volume Claim

---

## Image

postgres:16

---

## Replica Count

1

---

## Storage

PVC

```
postgres-pvc
```

---

## Secret

```
user-management-secret
```

Stores:

- PostgreSQL Password

---

## ConfigMap

```
user-management-config
```

Stores:

- Database Username

---

## Deploy

```bash
kubectl apply -f k8s/05-postgres-deployment.yaml
```

---

## Verify

```bash
kubectl get deployment -n user-management

kubectl get pods -n user-management

kubectl logs <pod-name> -n user-management
```

---

## Production Design

Database configuration is separated from the application.

Sensitive values come from Kubernetes Secrets.

Persistent storage is provided using a PVC.

This deployment will later be converted into a Helm template and reused for:

- Minikube
- AKS Dev
- AKS Production
# Kubernetes Persistent Volume Claim

## Objective

Provide persistent storage for PostgreSQL.

Without persistent storage, database data would be lost whenever the PostgreSQL pod is recreated.

---

## Namespace

user-management

---

## Storage Requested

5Gi

---

## Access Mode

ReadWriteOnce

---

## YAML

```yaml
apiVersion: v1
kind: PersistentVolumeClaim

metadata:
  name: postgres-pvc
  namespace: user-management

spec:

  accessModes:
    - ReadWriteOnce

  resources:
    requests:
      storage: 5Gi

  storageClassName: standard
```

---

## Deploy

```bash
kubectl apply -f k8s/04-postgres-pvc.yaml
```

---

## Verify

```bash
kubectl get pvc -n user-management
```

```bash
kubectl describe pvc postgres-pvc -n user-management
```

Expected Status

```
Bound
```

---

## Why PVC?

PVC abstracts storage from the application.

Benefits

- Persistent database
- Portable across Kubernetes platforms
- Automatically provisions storage in Minikube and AKS

---

## Future

During Helm implementation the storage size and StorageClass will come from:

- values-minikube.yaml
- values-dev.yaml
- values-prod.yaml
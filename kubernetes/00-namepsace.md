# Kubernetes Namespace

## Objective

Create a dedicated namespace for the User Management Platform.

---

## Why Namespace?

A Namespace logically separates Kubernetes resources.

Instead of deploying everything into the default namespace, we deploy into:

user-management

This is the same approach used in production Kubernetes clusters like AKS.

---

## Namespace YAML

```yaml
apiVersion: v1
kind: Namespace

metadata:
  name: user-management

  labels:
    app: user-management
    environment: minikube
```

---

## Deploy

```bash
kubectl apply -f k8s/01-namespace.yaml
```

---

## Verify

```bash
kubectl get namespaces
```

Expected Output

```
user-management
```

---

## Advantages

- Logical Isolation
- Better Security
- Easier Management
- Production Best Practice
- Easy Migration to AKS

---

## Future

The same namespace YAML will also be deployed to:

- AKS Dev
- AKS Production

No code changes required.

                 Kubernetes Cluster
                        │
        ┌───────────────┴───────────────┐
        │                               │
 default namespace              user-management
                                        │
                 (All our application resources)
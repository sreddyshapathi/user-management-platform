# Kubernetes ConfigMap

## Objective

Create a ConfigMap to store application configuration.

Instead of hardcoding values inside Deployments, Kubernetes stores them inside ConfigMaps.

---

## Namespace

user-management

---

## Configuration Stored

- Database Host
- Database Port
- Database Name
- Database Username
- Spring Profile
- Hibernate Configuration
- Server Port

---

## Why ConfigMap?

ConfigMaps separate configuration from application code.

Benefits:

- Easier maintenance
- Environment-specific configuration
- Reusable deployments
- Production best practice

---

## Deployment

```bash
kubectl apply -f k8s/02-configmap.yaml
```

---

## Verification

```bash
kubectl get configmap -n user-management
```

```bash
kubectl describe configmap user-management-config -n user-management
```

---

## Azure Migration

During Helm implementation this ConfigMap becomes a template.

Environment values will come from:

- values-minikube.yaml
- values-dev.yaml
- values-prod.yaml

No Deployment YAML changes will be required.

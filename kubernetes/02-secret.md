# Kubernetes Secret

## Objective

Store sensitive information securely.

Instead of hardcoding passwords inside Deployments or ConfigMaps, Kubernetes Secrets are used.

---

## Namespace

user-management

---

## Secret Name

user-management-secret

---

## Stored Values

- PostgreSQL Password

---

## YAML

```yaml
apiVersion: v1
kind: Secret

metadata:
  name: user-management-secret
  namespace: user-management

type: Opaque

stringData:

  SPRING_DATASOURCE_PASSWORD: postgres
```

---

## Deploy

```bash
kubectl apply -f k8s/03-secret.yaml
```

---

## Verify

```bash
kubectl get secret -n user-management
```

```bash
kubectl describe secret user-management-secret \
-n user-management
```

---

## Best Practices

- Never store passwords in ConfigMaps.
- Use Secrets for sensitive data.
- Use stringData for easier authoring.
- In production, integrate with Azure Key Vault or another secrets manager.

---

## Future

During the Helm phase, this Secret will become a template.

The value will come from:

- values-minikube.yaml
- values-dev.yaml
- values-prod.yaml

The Kubernetes manifests remain the same.
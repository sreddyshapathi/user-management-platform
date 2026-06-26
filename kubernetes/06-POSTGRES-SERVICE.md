# PostgreSQL Service

## Objective

Expose PostgreSQL inside the Kubernetes cluster using a ClusterIP Service.

---

## Why Service?

Pods receive dynamic IP addresses.

A Kubernetes Service provides a stable DNS name that applications can use.

Backend connects to:

```
postgres-service:5432
```

instead of using Pod IP addresses.

---

## Service Type

ClusterIP

ClusterIP exposes the service only within the Kubernetes cluster.

---

## YAML

```yaml
apiVersion: v1
kind: Service

metadata:
  name: postgres-service
  namespace: user-management

spec:

  type: ClusterIP

  selector:
    app: postgres

  ports:

    - port: 5432
      targetPort: 5432
```

---

## Deploy

```bash
kubectl apply -f k8s/06-postgres-service.yaml
```

---

## Verify

```bash
kubectl get svc -n user-management
```

```bash
kubectl get endpoints postgres-service -n user-management
```

---

## Production

ClusterIP is recommended for databases because they should not be exposed outside the Kubernetes cluster.

Only backend services communicate with PostgreSQL.
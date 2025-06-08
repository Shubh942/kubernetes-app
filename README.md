
---

# 📦 S3 File Server with Kubernetes, Prometheus, Grafana & ArgoCD

A lightweight Node.js Express API to (mock) list files from AWS S3, fully containerized and deployed on Kubernetes. Enhanced with Prometheus & Grafana for observability, and GitOps-powered using ArgoCD.

---

## 🚀 Features

- 🌐 REST API using Express.js
- 📦 Dockerized and Kubernetes-ready
- 📈 Autoscaling with Horizontal Pod Autoscaler (HPA)
- 📊 Monitoring via Prometheus + Grafana
- 🔁 GitOps-enabled with ArgoCD
- 🔐 AWS credentials via Kubernetes secrets
- ☁️ Future-ready for real S3 integration

---

## 📁 API Endpoints

| Method | Path      | Description                    |
|--------|-----------|--------------------------------|
| GET    | `/`       | Health check route             |
| GET    | `/files`  | Mocked file list from S3 (WIP) |

---

## 🛠️ Prerequisites

- Node.js (v18+)
- Docker
- Kubernetes (Minikube / KIND / GKE / etc.)
- Helm 3.x
- AWS IAM credentials (for real S3 usage)
- Tools: `kubectl`, `helm`, `argocd` CLI

---

## 🧪 Local Development

```bash
# Clone the repo
git clone https://github.com/<your-username>/s3-k8s.git
cd s3-k8s

# Install dependencies
npm install

# Run locally
node index.js
# Visit: http://localhost:10000
````

---

## 🐳 Docker Build & Push

```bash
# Build Docker image
docker build -t shubh197/s3-k8s:latest .

# Push to DockerHub
docker push shubh197/s3-k8s:latest
```

---

## ☸️ Kubernetes Deployment

### 1. Create AWS Secret

```bash
kubectl create secret generic aws-creds \
  --from-literal=AWS_ACCESS_KEY_ID=<your-key> \
  --from-literal=AWS_SECRET_ACCESS_KEY=<your-secret>
```

### 2. Apply K8s Manifests

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f hpa.yaml
kubectl apply -f ingress.yaml
```

> Make sure you have [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/) installed.

### 3. Access API

```bash
http://localhost/api/files
```

---

## 📊 Monitoring with Prometheus & Grafana

### 1. Install Kube Prometheus Stack

```bash
# Add Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install the stack
helm install kind-prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace \
  --set prometheus.service.type=NodePort \
  --set prometheus.service.nodePort=30000 \
  --set grafana.service.type=NodePort \
  --set grafana.service.nodePort=31000 \
  --set alertmanager.service.nodePort=32000
```

### 2. Access Grafana

```bash
# Get Grafana password
kubectl get secret --namespace monitoring kind-prometheus-grafana \
  -o jsonpath="{.data.admin-password}" | base64 --decode
```

* Access: [http://localhost:31000](http://localhost:31000)
* Default username: `admin`

---

## 🔁 GitOps with ArgoCD

### 1. Install ArgoCD

```bash
# Add Helm repo
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

# Install ArgoCD
helm install argocd argo/argo-cd \
  --namespace argocd --create-namespace
```

### 2. Expose ArgoCD UI

```bash
kubectl patch svc argocd-server -n argocd \
  -p '{"spec": {"type": "NodePort"}}'

# Get exposed port
kubectl get svc -n argocd
```

### 3. Access & Login

```bash
# Get admin password
kubectl get secret argocd-initial-admin-secret -n argocd \
  -o jsonpath="{.data.password}" | base64 --decode
```

* Access: `http://localhost:<nodeport>`
* Username: `admin`

---

## 📌 To Do

* ✅ Implement real AWS S3 file listing in `/files`
* 🔐 Secure ingress using TLS
* 📦 Add memory-based HPA
* 🧪 Add unit and integration tests
* ⚙️ Setup CI/CD (e.g., GitHub Actions, GitLab CI)

---

## 👨‍💻 Author

**Shubh Mehta**
🔗 [GitHub Profile](https://github.com/shubh197)




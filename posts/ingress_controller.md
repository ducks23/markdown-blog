---
title: "How to Setup Nginx Ingress Controller in EKS"
date: "2023-08-19"
---

# Summary

This repo is to help deploy an ingress controller to your EKS cluster in AWS and setting up routing by path.

# Video

[Link](https://www.youtube.com/watch?v=MvvDrvAwDfE&t=3s&ab_channel=JesseLeonard-CloudArchitect)

# Requirements

- ubuntu 20.04
- eksctl
- kubernetes
- helm
- aws-cli

# Architecture

![Ingress Controller Architecture](https://raw.githubusercontent.com/ducks23/markdown-blog/main/images/ingress_controller.png)

# Install kubectl and helm

```
sudo snap install helm --classic

sudo snap install kubectl --classic
```

# Install eksctl on your architecture

for ARM systems, set ARCH to: `arm64`, `armv6` or `armv7`

```
ARCH=arm64
PLATFORM=$(uname -s)_$ARCH

curl -sLO "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$PLATFORM.tar.gz"

curl -sL "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_checksums.txt" | grep $PLATFORM | sha256sum --check

tar -xzf eksctl_$PLATFORM.tar.gz -C /tmp && rm eksctl_$PLATFORM.tar.gz

sudo mv /tmp/eksctl /usr/local/bin

```

# Install aws-cli

```
curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"

sudo apt install unzip

unzip awscliv2.zip

sudo ./aws/install --bin-dir /usr/bin --install-dir /usr/aws-cli --update

aws --version

aws configure
```

# Create EKS Cluster

```
eksctl create cluster demo
```

```
$ kubectl get nodes -o wide

NAME                                           STATUS   ROLES    AGE     VERSION                INTERNAL-IP      EXTERNAL-IP     OS-IMAGE
ip-192-168-17-251.us-west-2.compute.internal   Ready    <none>   5m18s   v1.25.11-eks-a5565ad   192.168.17.251   35.90.152.103   Amazon Linux 2
ip-192-168-39-182.us-west-2.compute.internal   Ready    <none>   5m19s   v1.25.11-eks-a5565ad   192.168.39.182   35.87.93.163    Amazon Linux 2
```

# Add Ingress Controller to Cluster

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

kubectl create namespace nginx-ingress

helm install ingress-nginx ingress-nginx/ingress-nginx -n nginx-ingress

```

Output should look like this:

```
$ kubectl get svc -n nginx-ingress
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP                                                              PORT(S)                      AGE
ingress-nginx-controller             LoadBalancer   10.100.254.148   a651a6745282343f3bcdf313a235166e-766797931.us-west-2.elb.amazonaws.com   80:30674/TCP,443:31076/TCP   2m39s
ingress-nginx-controller-admission   ClusterIP      10.100.122.196   <none>

```

note the EXTERNAL-IP is the url that you can go to in your browser that points to your nginx load balancer now.

# Deploy Pods

```
kubectl apply -f https://raw.githubusercontent.com/ducks23/ingress-controller/main/deployments/deployment-foo.yaml
kubectl apply -f https://raw.githubusercontent.com/ducks23/ingress-controller/main/deployments/deployment-bar.yaml


```

# Deploy Ingress service to route traffic to pods

```
kubectl apply -f ./deployments/ingress.yaml
```

Now these two services are reachable is reachable at:

- https://load-balancer.com/foo
- https://load-balancer.com/bar

# Clean Up Cluster

```
eksctl delete cluster demo
```

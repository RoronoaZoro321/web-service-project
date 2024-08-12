# web-service-project


# structure
```
web-service-project/
├── back-end/
│   ├── services/
│   │   ├── auth-service/
│   │   │   └── Dockerfile
│   │   ├── user-service/
│   │   │   └── Dockerfile
│   │   ├── transaction-service/
│   │   │   └── Dockerfile
│   │   ├── topup-service/
│   │   │   └── Dockerfile
│   └── esb/
│   │   └── Dockerfile
│   └── db/
│   │  
│   └── configs/
│   │   └── config.env
│   │  
│   └── common/
```

# to run the project with kubernetes

start minikube
```
minikube start
```

```
    cd backend 
        Verify your images are built and available:
            docker images
        if not 
            docker compose build

        kubectl apply -f auth-service-deployment.yaml -f esb-deployment.yaml -f topup-service-deployment.yaml -f transaction-service-deployment.yaml -f user-service-deployment.yaml
```

Delete the pods again to force a refresh:
```
    kubectl delete pods --all
```

Check the status:
```
    kubectl get pods
```

Port forward:
```
kubectl port-forward service/esb 3000:3000
```

To test the recovery of the pods, delete one of the pods:
```
kubectl delete pod qsk-deploy-69996c4549-r59nl
```

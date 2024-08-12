# web-service-project


# enter 127.0.0.1:8000 

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

# To convert the docker-compose.yml file to files that you can use with kubectl, run
```
kompose convert
```

# to run the project with docker

```
    cd front-end 
        Verify your images are built and available:
            docker images
        if not 
            docker build -t front-end .
```

# to run the project with docker-compose
```
    cd back-end/front-end 
        Verify your images are built and available:
            docker images
        if not 
            docker compose build

        docker compose up
```

# to run the project with kubernetes

start minikube
```
minikube start
```

```
    cd back-end 
        Verify your images are built and available:
            docker images
        if not 
            docker compose build

        kubectl apply -f auth-service-deployment.yaml -f esb-deployment.yaml -f topup-service-deployment.yaml -f transaction-service-deployment.yaml -f user-service-deployment.yaml
```

for front-end
```
    cd front-end 
        Verify your images are built and available:
            docker images
        if not 
            docker build -t front-end .

        kubectl apply -f front-end-service.yaml -f front-end-deployment.yaml
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
kubectl port-forward service/front-end 8000:8000
```

To test the recovery of the pods, delete one of the pods:
```
kubectl delete pod qsk-deploy-69996c4549-r59nl
```




# error with kube

if ErrImageNeverPull

1.make sure the image name is the same
2.make sure to add the imagePullPolicy: Never , if you are using local images(not in docker hub)
3.make sure to rebuild image
```
docker build -t front-end .                                                                                                                             
```



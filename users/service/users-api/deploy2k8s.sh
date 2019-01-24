#!/bin/bash

## Deploy Users API to Minikube
## CouchDB should be deployed already 

echo " "
echo "Switch to Minikube docker environment"
eval $(minikube docker-env)

echo " "
echo "The following API image versions exist:"
echo " "
docker images | grep ^users-api

echo " "
echo "Enter a new image version (x.x.x)"
read tag

echo "##########################################"
echo "... Building version " $tag
docker build -t users-api:$tag .

echo "##########################################"
echo "... Deploying to K8s"
cd K8s
sed "s/<TAG>/$tag/g" TEMPLATE.yaml > test.yaml
kubectl apply -f test.yaml


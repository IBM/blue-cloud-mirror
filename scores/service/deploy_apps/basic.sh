docker build -t registry.eu-de.bluemix.net/scores-services/scores-service:v1 .
docker push registry.eu-de.bluemix.net/scores-services/scores-service:v1
kubectl run scores-services-deployment --image="registry.eu-de.bluemix.net/scores-services/scores-service:v1"
kubectl expose deployment/scores-services-deployment --type=NodePort --port=3002
ibmcloud cs workers paid-test-cluster-de
kubectl describe service scores-services-deployment
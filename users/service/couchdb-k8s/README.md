## CouchDB as K8s Deployment

Running CouchDB as Kubernetes deployment on Minikube, file couchdb-deployment-minikube.yaml

Base image: couchdb from Docker Hub (Apache project)

* CouchDB uses /opt/couchdb/data to store its data, this is exposed as a volume.
* CouchDB uses /opt/couchdb/etc/local.d to store its configuration, also exposed as volume.
* Starts in Admin Party (no security but requires manual configuration)

couchdb-deployment.yaml creates
* 2 PVs, storageclass HostPath, on Minikubes /data directory (which is persistent over a Minikube reboot)
* 2 PVCs for configuration and data of CouchDB
* NodePort service to expose the CouchDB port (to be able to access the Fauxton dashboard)
* CouchDB deployment with single pod

__Access externally__

`minikube service users-couchdb --url`

http://192.168.99.100:32001/_utils  to access Fauxton dashboard


__Access CouchDB within Kubernetes__

Kube DNS: users-couchdb.default.svc.cluster.local:5984

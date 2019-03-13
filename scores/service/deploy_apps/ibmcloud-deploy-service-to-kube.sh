#!/bin/bash

#SET ACTUAL PATH
CURRENT_FOLDER=$(cd $(dirname $0); pwd)
cd "../../.."
ROOT_FOLDER=$(cd $(dirname $0); pwd)
cd $CURRENT_FOLDER

# SETUP logging (redirect stdout and stderr to a log file)
readonly LOG_FILE="${CURRENT_FOLDER}/ibmcloud-deploy-service-to-cf.log"
readonly ENV_ROOT_FILE="${ROOT_FOLDER}/scores/scores.local.root.env"
readonly ENV_CLOUDANT_FILE="${ROOT_FOLDER}/scores/service/deploy_apps/cloudant/.env"
readonly ENV_SERVER_FILE="${ROOT_FOLDER}/scores/service/.env"
source $ENV_ROOT_FILE

rm $ENV_CLOUDANT_FILE
touch $ENV_CLOUDANT_FILE
source $ENV_CLOUDANT_FILE

rm $ENV_CLOUDANT_FILE
touch $ENV_SERVER_FILE
source $ENV_SERVER_FILE
ALIAS="$IBMCLOUD_CLOUDANT_NAME-alias"
KEY="$IBMCLOUD_CLOUDANT_NAME-key"

touch $LOG_FILE
exec 3>&1 # Save stdout
exec 4>&2 # Save stderr
exec 1>$LOG_FILE 2>&1

function _out() {
  echo "$@" >&3
  echo "$(date +'%F %H:%M:%S') $@"
}

function _err() {
  echo "$@" >&4
  echo "$(date +'%F %H:%M:%S') $@"
}

function ibmcloud_login() {
  # Skip version check updates
  ibmcloud config --check-version=false

  cd "$ROOT_FOLDER/scores/service"
  pwd

  # Login to Cloud
  _out 1. Login to IBM Cloud
  _out
  ibmcloud login -u $IBMCLOUD_USER_ID -apikey $IBMCLOUD_CLI_DEVOPS_PLATFORM_KEY -a $IBMCLOUD_API_ENDPOINT
  
  # Set target for Cloud Foundry Apps and Resource Groups
  _out   _set -o $IBMCLOUD_CF_ORGANIZATION_NAME
  ibmcloud target -o $IBMCLOUD_CF_ORGANIZATION_NAME

  _out   _create -s $IBMCLOUD_CF_SPACE_NAME
  ibmcloud cf create-space $IBMCLOUD_CF_SPACE_NAME

  _out   _set -s $IBMCLOUD_CF_SPACE_NAME -g $IBMCLOUD_RESOURCE_GROUP

  ibmcloud target -o $IBMCLOUD_CF_ORGANIZATION_NAME
  ibmcloud cf create-space $IBMCLOUD_CF_SPACE_NAME
  ibmcloud target -s $IBMCLOUD_CF_SPACE_NAME -g $IBMCLOUD_RESOURCE_GROUP
  
  # Show the result of login to stdout
  ibmcloud target
  _out

  _out Login end
  _out
}

function scoreCloudantDBcredentials() {
  _out 2. ScoreCloudantDBcredentials start
  _out

  cd "$ROOT_FOLDER/scores/service"
  pwd

  _out _get credentials
  CLOUDANT_USERNAME=$(ibmcloud resource service-key $KEY | awk '/username/{ print $2 }')

  rm $ENV_CLOUDANT_FILE
  touch $ENV_CLOUDANT_FILE

  rm $ENV_SERVER_FILE
  touch $ENV_SERVER_FILE
  
  # set Cloud CF env
  printf "\n# CF APP" >> $ENV_SERVER_FILE  
  printf "\nSERVICE_USER=$IBMCLOUD_CF_APP_USER" >> $ENV_SERVER_FILE
  printf "\nSERVICE_PASSWORD=$IBMCLOUD_CF_APP_PASSWORD" >> $ENV_SERVER_FILE
  printf "\nBASE_PATH=$IBMCLOUD_CF_BASE_PATH" >> $ENV_SERVER_FILE
  
  printf "\n# CLOUDANT" >> $ENV_SERVER_FILE 
  printf "\nCLOUDANT_NAME=$IBMCLOUD_CLOUDANT_NAME" >> $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_NAME=$IBMCLOUD_CLOUDANT_NAME" >> $ENV_SERVER_FILE
  
  CLOUDANT_USERNAME=$(ibmcloud resource service-key $KEY | awk '/username/{ print $2 }')
  printf "\nCLOUDANT_USERNAME=$CLOUDANT_USERNAME" >> $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_USERNAME=$CLOUDANT_USERNAME" >> $ENV_SERVER_FILE
  # _out _insert CLOUDANT_USERNAME: $CLOUDANT_USERNAME into $ENV_CLOUDANT_FILE

  CLOUDANT_PASSWORD=$(ibmcloud resource service-key $KEY | awk '/password/{ print $2 }')
  printf "\nCLOUDANT_PASSWORD=$CLOUDANT_PASSWORD" >> $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_PASSWORD=$CLOUDANT_PASSWORD" >> $ENV_SERVER_FILE
  # _out _insert CLOUDANT_PASSWORD: $CLOUDANT_PASSWORD into $ENV_CLOUDANT_FILE
  
  CLOUDANT_URL=$(ibmcloud resource service-key $KEY | awk '/url/{ print $2 }')
  # _out _insert CLOUDANT_URL: $CLOUDANT_URL into $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_URL=$CLOUDANT_URL " >> $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_URL=$CLOUDANT_URL " >> $ENV_SERVER_FILE

  CLOUDANT_PORT=$(ibmcloud resource service-key $KEY | awk '/port/{ print $2 }')
  # _out _insert CLOUDANT_URL: $CLOUDANT_PORT into $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_PORT=$CLOUDANT_PORT " >> $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_PORT=$CLOUDANT_PORT " >> $ENV_SERVER_FILE

  _out
  _out  ScoreCloudantDBcredentials end
  _out
}

function createIBMCloudContainerRegistry() {

  _out
  _out 3. createIBMCloudContainerRegistry - start
  _out
  _out _path "${ROOT_FOLDER}/scores/service"
  cd "$ROOT_FOLDER/scores/service"
  pwd
  _out
  _out logon to the IBM Cloud container registry
  _out   
  ibmcloud cr login
  
  _out create IBM Cloud container namespace
  _out
  ibmcloud cr namespace-add $IBMCLOUD_CONTAINER_NAMESPACE
  
  _out
  _out List container registry name spaces
  ibmcloud cr namespace-list

  _out
  _out End
}

function createContainerImage() {

  _out
  _out 4. Create Container Image and Push to IBM Container registry - start
  _out
  _out _path "${ROOT_FOLDER}/scores/service"
  _out
  _out Build the local docker image
  cd "${ROOT_FOLDER}/scores/service/"
  docker build -t "$IBMCLOUD_CONTAINER_REGISTRY/$IBMCLOUD_CONTAINER_NAMESPACE/$IBMCLOUD_DOCKER_IMAGE_NAME:$IBMCLOUD_DOCKER_TAG" .

  _out  
  _out Run the image local on docker
  docker run -p $IBMCLOUD_DOCKER_PORT:$IBMCLOUD_DOCKER_PORT -d "$IBMCLOUD_CONTAINER_REGISTRY/$IBMCLOUD_CONTAINER_NAMESPACE/$IBMCLOUD_DOCKER_IMAGE_NAME:$IBMCLOUD_DOCKER_TAG"

  _out List container registry name spaces
  _out *****************
  ibmcloud cr namespace-list
  
  _out 
  _out Build container image for IBM Cloud registry with tag
  ibmcloud cr build -t $IBMCLOUD_CONTAINER_REGISTRY/$IBMCLOUD_CONTAINER_NAMESPACE/$IBMCLOUD_DOCKER_IMAGE_NAME:$IBMCLOUD_DOCKER_TAG .
  
  _out
  _out Push the docker image $IBMCLOUD_DOCKER_IMAGE_NAME to the '$IBMCLOUD_CONTAINER_REGISTRY/$IBMCLOUD_CONTAINER_NAMESPACE' registry
  _out
  _out *****************
  ibmcloud cr push "$IBMCLOUD_CONTAINER_REGISTRY/$IBMCLOUD_CONTAINER_NAMESPACE/$IBMCLOUD_DOCKER_IMAGE_NAME:$IBMCLOUD_DOCKER_TAG"

  _out
  _out End
}

function deployServiceToKubernetes() {

  _out 5. Deploy Service To Kubernetes start
  _out
  _out _path "${ROOT_FOLDER}/scores/service"

  cd "$ROOT_FOLDER/scores/service"
  pwd

  ibmcloud cs region-set $IBMCLOUD_CLUSTER_REGION_SETTING
  _out
  _out list clusters with cs
  _out 
  ibmcloud cs clusters
  _out
  _out List workers for cluster '$IBMCLOUD_CLUSTER_NAME'
  _out 
  ibmcloud cs workers $IBMCLOUD_CLUSTER_NAME
  _out
  _out get the configuration information
  _out
  ibmcloud cs cluster-get $IBMCLOUD_CLUSTER_NAME --json
  _out
  _out get cluster configuration for '$CLUSTER_NAME'
  _out
  ibmcloud cs cluster-config $IBMCLOUD_CLUSTER_NAME -admin
  _out
  _out copy and past the cluster configuration export path
  _out 
  read CLUSTER_CONFIGURATION_PATH
  _out 
  _out execution of the export
  _out 
  $CLUSTER_CONFIGURATION_PATH
  _out 
  _out show kubectl version
  _out 
  kubectl version
  _out
  _out create deployment $IBMCLOUD_KUBE_DEPLOYMENT_YAML
  kubectl create -f $IBMCLOUD_KUBE_DEPLOYMENT_YAML
  _out
  _out create service $IBMCLOUD_KUBE_SERVICE_YAML
  kubectl create -f $IBMCLOUD_KUBE_SERVICE_YAML
  _out 
  _out kubectl get pods
  _out
  _out Deploy Service To Kubernetes end
  _out
}

function endMessage() {
  _out
  _out "Now please verify the setup in IBM Cloud and for details use the logfile"
  _out
}

# Main tasks
ibmcloud_login
scoreCloudantDBcredentials
createIBMCloudContainerRegistry
createContainerImage
deployServiceToKubernetes
endMessage

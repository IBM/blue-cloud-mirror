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

function createScoreCloudantDB() {
  _out 2. Create scores cloudant DB start
  _out
  ibmcloud resource service-instance-create $IBMCLOUD_CLOUDANT_NAME cloudantnosqldb lite $IBMCLOUD_REGION -p '{"legacyCredentials": true}'
  
  _out _create $ALIAS
  ibmcloud resource service-alias-create $ALIAS --instance-name $IBMCLOUD_CLOUDANT_NAME

  _out _create $KEY
  ibmcloud resource service-key-create $KEY Manager --instance-name $IBMCLOUD_CLOUDANT_NAME
  
  _out _get credentials
  CLOUDANT_USERNAME=$(ibmcloud resource service-key $KEY | awk '/username/{ print $2 }')

  rm $ENV_CLOUDANT_FILE
  touch $ENV_CLOUDANT_FILE

  rm $ENV_SERVER_FILE
  touch $ENV_SERVER_FILE
  
  # set env
  printf "\n# CF APP" >> $ENV_SERVER_FILE  
  printf "\nSERVICE_USER=$IBMCLOUD_CF_APP_USER" >> $ENV_SERVER_FILE
  printf "\nSERVICE_PASSWORD=$IBMCLOUD_CF_APP_PASSWORD" >> $ENV_SERVER_FILE
  printf "\nBASE_PATH=$IBMCLOUD_CF_BASE_PATH" >> $ENV_SERVER_FILE
  
  printf "\n# CLOUDANT" >> $ENV_SERVER_FILE 
  printf "\nCLOUDANT_NAME=$IBMCLOUD_CLOUDANT_NAME" >> $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_NAME=$IBMCLOUD_CLOUDANT_NAME" >> $ENV_SERVER_FILE
  printf "\nCLOUDANT_DES_SCORES=$IBMCLOUD_CLOUDANT_DES_SCORES"  >> $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_DES_SCORES=$IBMCLOUD_CLOUDANT_DES_SCORES"  >> $ENV_SERVER_FILE
  printf "\nCLOUDANT_IDX_SCORES=$IBMCLOUD_CLOUDANT_IDX_SCORES"  >> $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_IDX_SCORES=$IBMCLOUD_CLOUDANT_IDX_SCORES"  >> $ENV_SERVER_FILE
  printf "\nCLOUDANT_DES_HIGHSCORE=$IBMCLOUD_CLOUDANT_DES_HIGHSCORE"  >> $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_DES_HIGHSCORE=$IBMCLOUD_CLOUDANT_DES_HIGHSCORE"  >> $ENV_SERVER_FILE
  printf "\nCLOUDANT_IDX_HIGHSCORE=$IBMCLOUD_CLOUDANT_IDX_HIGHSCORE"  >> $ENV_CLOUDANT_FILE
  printf "\nCLOUDANT_IDX_HIGHSCORE=$IBMCLOUD_CLOUDANT_IDX_HIGHSCORE"  >> $ENV_SERVER_FILE
  
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

  #_out _install npm modules 
  #  cd cloudant 
  #  npm install
  #  cd ..

  _out _create database 
  # npm --prefix ${CURRENT_FOLDER}/cloudant start ${CURRENT_FOLDER}/cloudant
  curl "$CLOUDANT_URL/$IBMCLOUD_CLOUDANT_NAME" -X PUT

  _out _upload view 
  JSON=$(<../highscore_view.json)
  curl "$CLOUDANT_URL/$IBMCLOUD_CLOUDANT_NAME" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "$JSON"

  _out _upload search index 
  JSON=$(<../score_index.json)
  curl "$CLOUDANT_URL/$IBMCLOUD_CLOUDANT_NAME" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "$JSON"
  JSON=$(<../sampledata.json)
  #_out _data $JSON

  _out _upload sample data
  #_out _url "$CLOUDANT_URL/$IBMCLOUD_CLOUDANT_NAME/_bulk_docs"
  curl "$CLOUDANT_URL/$IBMCLOUD_CLOUDANT_NAME/_bulk_docs" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "$JSON"
  _out
  _out Create scores cloudant DB end
  _out
}

function deployServiceToServer() {

  _out 3. Deploy service start
  _out
  #_out _path "${ROOT_FOLDER}/scores/service"

  cd "$ROOT_FOLDER/scores/service"
  pwd

  _out _npm install
  npm install

  _out _bower install public/lib
  bower install
 
  _out _show existing spaces
  ibmcloud cf spaces

  _out _show existing apps
  ibmcloud cf apps

  _out _push "${IBMCLOUD_CF_APP_SERVICE_NAME}"
  ibmcloud cf push $IBMCLOUD_CF_APP_SERVICE_NAME

  _out _create binding
  ibmcloud resource service-binding-create $ALIAS $IBMCLOUD_CF_APP_SERVICE_NAME Manager

  _out _restage binding $IBMCLOUD_CF_APP_SERVICE_NAME
  ibmcloud cf restage $IBMCLOUD_CF_APP_SERVICE_NAME

  SERVICE_CLOUD_FOUNDRY=$(ibmcloud cf r | awk "'/$IBMCLOUD_CF_APP_SERVICE_NAME*/'" | awk '{print $2}')
  _out _application has been deployed "${SERVICE_CLOUD_FOUNDRY}"
  printf "\nSERVICE_URL=$SERVICE_CLOUD_FOUNDRY"  >> $ENV_SERVER_FILE

  _out
  _out Deploy service end
  _out
}

function endMessage() {
  _out
  _out "Now please verify the setup in IBM Cloud and for details use the logfile"
  _out
}

# Main tasks
ibmcloud_login
createScoreCloudantDB
deployServiceToServer
endMessage

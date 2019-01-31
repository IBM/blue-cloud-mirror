#!/bin/bash

# Build Webapp
SOURCE="dist"
DESTINATION="/scores/webapp/server"
CLIENT_DEVELOPMENT_DIR="/scores/webapp/client"
SERVER_DEVELOPMENT_DIR="/scores/webapp/server"
SERVER_DEPLOY_DIR="scores/webapp/server/deploy_apps"

#SET ACTUAL PATH
CURRENT_FOLDER=$(cd $(dirname $0); pwd)
cd "../../.."
ROOT_FOLDER=$(cd $(dirname $0); pwd)
cd $CURRENT_FOLDER

# SETUP logging (redirect stdout and stderr to a log file)
readonly LOG_FILE="${CURRENT_FOLDER}/ibmcloud-deploy-webapp-to-cf.log"
readonly ENV_ROOT_FILE="${ROOT_FOLDER}/scores/scores.local.root.env"
ENV_SERVER_FILE="${ROOT_FOLDER}/scores/webapp/server/.env"
source $ENV_ROOT_FILE
touch $ENV_SERVER_FILE

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

function setEnv(){
  _out
  _out 2. SetEnv
  _out
   # set env
  printf "\n# CF APP" >> $ENV_SERVER_FILE  
  printf "\nSERVICE_USER=$IBMCLOUD_CF_APP_WEB_APP_USER" >> $ENV_SERVER_FILE
  printf "\nSERVICE_PASSWORD=$IBMCLOUD_CF_APP_WEB_APP_PASSWORD" >> $ENV_SERVER_FILE
  
}

function prepareVUEClientCode() {
  _out
  _out 3. prepare VUE client code start
  _out
  cd $ROOT_FOLDER/scores/webapp/client/src
  
  _out _copy App.vue template definition
  rm "App.vue"
  cp "App-template.vue" "App.vue"
  
  cd $ROOT_FOLDER/scores/webapp/client/src/components
  _out _copy scoreMain.vue template definition
  rm "scoreMain.vue"
  cp "scoreMain-template.vue" "scoreMain.vue"

  _out _setup text-replace
  cd $ROOT_FOLDER/scores/webapp/text-replace
  npm install
  cd ..
  _out _replace $IBMCLOUD_CF_APP_WEBAPP_REPLACE_GAME_URL with $IBMCLOUD_CF_APP_WEBAPP_GAME_URL
  npm --prefix "${ROOT_FOLDER}/scores/webapp/text-replace" start "${ROOT_FOLDER}/scores/webapp/client/src/App.vue" $IBMCLOUD_CF_APP_WEBAPP_REPLACE_GAME_URL "$IBMCLOUD_CF_APP_WEBAPP_GAME_URL"
  _out _replace $IBMCLOUD_CF_APP_WEBAPP_REPLACE_FUNCTIONS_API_URL with $IBMCLOUD_CF_APP_WEBAPP_FUNCTIONS_API_URL
  npm --prefix "${ROOT_FOLDER}/scores/webapp/text-replace" start "${ROOT_FOLDER}/scores/webapp/client/src/components/scoreMain.vue" $IBMCLOUD_CF_APP_WEBAPP_REPLACE_FUNCTIONS_API_URL $IBMCLOUD_CF_APP_WEBAPP_FUNCTIONS_API_URL

  _out
  _out Prepare VUE client code end
  _out
}

function createClient() {
  _out
  _out 4. Create Client start
  _out
  cd "${ROOT_FOLDER}${CLIENT_DEVELOPMENT_DIR}"
   pwd
  rm -rf $IBMCLOUD_CF_APP_WEBAPP_SOURCE
 
  _out _npm install
  npm install

  _out _build Vue application "${ROOT_FOLDER}${IBMCLOUD_CF_APP_WEBAPP_CLIENT_DEVELOPMENT_DIR}"
  npm run build
  
  _out _copy VUE webapp to folder "${ROOT_FOLDER}${IBMCLOUD_CF_APP_WEBAPP_DESTINATION}"
  cp -R -f $IBMCLOUD_CF_APP_WEBAPP_SOURCE $ROOT_FOLDER$IBMCLOUD_CF_APP_WEBAPP_DESTINATION
  
  _out 
  _out Create client end
  _out 
}

function deployClientToServer() {
  _out
  _out 5. Deploy to CF start
  _out
  _out _path "${ROOT_FOLDER}${IBMCLOUD_CF_APP_WEBAPP_SERVER_DEVELOPMENT_DIR}"
  cd "$ROOT_FOLDER$IBMCLOUD_CF_APP_WEBAPP_SERVER_DEVELOPMENT_DIR"

  _out _deploying Vue application to Cloud Foundry App "${IBMCLOUD_CF_APP_WEBAPP_NAME}"
  cd "$ROOT_FOLDER$IBMCLOUD_CF_APP_WEBAPP_SERVER_DEVELOPMENT_DIR"
  pwd

  _out _npm install
  npm install
 
  _out _show existing spaces
  ibmcloud cf spaces

  _out _show existing apps
  ibmcloud cf apps

  _out _push "${IBMCLOUD_CF_APP_WEBAPP_NAME}"
  ibmcloud cf push $IBMCLOUD_CF_APP_WEBAPP_NAME

  HIGHSCORE_CLOUD_FOUNDRY=$(ibmcloud cf r | awk '/$IBMCLOUD_CF_APP_WEBAPP_NAME*/' | awk '{print $2}')
  _out _application has been deployed "${HIGHSCORE_CLOUD_FOUNDRY}"
  _out
  _out Deploy to CF end
  _out
}

function endMessage() {
  _out
  _out "Now please verify the setup in IBM Cloud and for details use the logfile"
  _out
}

# Main tasks
ibmcloud_login
setEnv
prepareVUEClientCode
createClient
deployClientToServer
endMessage


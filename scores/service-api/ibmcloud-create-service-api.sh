#!/bin/bash

#SET ACTUAL PATH
CURRENT_FOLDER=$(cd $(dirname $0); pwd)
cd "../.."
ROOT_FOLDER=$(cd $(dirname $0); pwd)
cd $CURRENT_FOLDER

# SETUP logging (redirect stdout and stderr to a log file)
readonly LOG_FILE="${CURRENT_FOLDER}/ibmcloud-create-service-api.log"
readonly ENV_ROOT_FILE="${ROOT_FOLDER}/scores/scores.local.root.env"
ENV_SCORES_API="${CURRENT_FOLDER}/.env"
source $ENV_ROOT_FILE
source $ENV_SCORES_API


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

function createAPIConnect() {
  _out 2. Create API Connect start
  _out

  ibmcloud cf create-service apiconnect Lite  $IBMCLOUD_API_CONNECT_NAME

  _out
  _out Create API Connect end
  _out
}

function configureAPIDefinitionCF() {
  _out 3. Configure API defintion start
  _out

  _out __copy API Definition
  rm "$API_DEFINITION"
  cp "$API_DEFINITION_TEMPLATE" "$API_DEFINITION"

  _out __copy API Product Definition
  rm "$API_PRODUCT_DEFINITION"
  cp "$API_PRODUCT_DEFINITION_TEMPLATE" "$API_PRODUCT_DEFINITION"

  _out __setup text-replace
  cd text-replace
  npm install
  cd ..

  _out __replace $REPLACE_USER with $IBMCLOUD_CF_APP_USER
  npm --prefix "${ROOT_FOLDER}/scores/service-api/text-replace" start "${ROOT_FOLDER}/scores/service-api/$API_DEFINITION" $REPLACE_USER $IBMCLOUD_CF_APP_USER

  _out __replace $REPLACE_PASSWORD with $IBMCLOUD_CF_APP_PASSWORD
  npm --prefix "${ROOT_FOLDER}/scores/service-api/text-replace" start "${ROOT_FOLDER}/scores/service-api/$API_DEFINITION" $REPLACE_PASSWORD $IBMCLOUD_CF_APP_PASSWORD

  URL="https://$IBMCLOUD_CF_APP_SERVICE_NAME.mybluemix.net"
  _out __replace $REPLACE_URL with $URL
  npm --prefix "${ROOT_FOLDER}/scores/service-api/text-replace" start "${ROOT_FOLDER}/scores/service-api/$API_DEFINITION" $REPLACE_URL $URL

  _out  
  _out Configure API defintion end
  _out
}

function endMessage() {
  _out
  _out "Now please verify the setup in IBM Cloud and for details use the logfile"
  _out
}

# Main tasks
ibmcloud_login
createAPIConnect
configureAPIDefinitionCF
endMessage
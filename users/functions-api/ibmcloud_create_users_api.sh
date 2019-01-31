#!/bin/bash
#
# Copyright 2016 IBM Corp. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the “License”);
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#  https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an “AS IS” BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

#SET ACTUAL PATH

CURRENT_FOLDER=$(cd $(dirname $0); pwd)
cd "../.."
ROOT_FOLDER=$(cd $(dirname $0); pwd)
cd $CURRENT_FOLDER

# SETUP logging (redirect stdout and stderr to a log file)
readonly LOG_FILE="${CURRENT_FOLDER}/ibmcloud-create-users-api.log"
readonly ENV_ROOT_FILE="${ROOT_FOLDER}/scores/scores.local.root.env"
ENV_FUNCTION_FILE="${CURRENT_FOLDER}/.env"
source $ENV_ROOT_FILE
source $ENV_FUNCTION_FILE

rm $ENV_FUNCTION_FILE
touch $ENV_FUNCTION_FILE
source $ENV_FUNCTION_FILE
  
# set env
printf "\n# Users service API" >> $ENV_FUNCTION_FILE  
printf "\nUSERSAPI_URL=$IBMCLOUD_USERAPI_URL" >> $ENV_FUNCTION_FILE
printf "\nUSERSAPI_CLIENT_ID=$IBMCLOUD_USERAPI_CLIENT_ID" >> $ENV_FUNCTION_FILE
printf "\nUSERSAPI_CLIENT_SECRET=$IBMCLOUD_USERAPI_CLIENT_SECRET" >> $ENV_FUNCTION_FILE

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
  _out
  _out Login to IBM Cloud
  _out
  ibmcloud login -u $IBMCLOUD_USER_ID -apikey $IBMCLOUD_CLI_DEVOPS_PLATFORM_KEY -a $IBMCLOUD_API_ENDPOINT
  
  # Set target for Cloud Foundry Apps and Resource Groups
  _out   _set -o $IBMCLOUD_CF_ORGANIZATION_NAME
  ibmcloud target -o $IBMCLOUD_CF_ORGANIZATION_NAME

  _out   _create -s $IBMCLOUD_CF_SPACE_NAME
  ibmcloud cf create-space $IBMCLOUD_CF_SPACE_NAME

  _out   _set s $IBMCLOUD_CF_SPACE_NAME -g $IBMCLOUD_RESOURCE_GROUP

  ibmcloud target -o $IBMCLOUD_CF_ORGANIZATION_NAME
  ibmcloud cf create-space $IBMCLOUD_CF_SPACE_NAME
  ibmcloud target -s $IBMCLOUD_CF_SPACE_NAME -g $IBMCLOUD_RESOURCE_GROUP
  
  _out __save functions env information
  # capture the namespace where actions will be created
  # as we need to pass it to our change listener
  printf "\n# Functions" >> $ENV_FUNCTION_FILE 
  CURRENT_NAMESPACE=`ibmcloud wsk property get --namespace | awk '{print $3}'`
  _out "__current wsk namespace is $CURRENT_NAMESPACE."
  printf "\nCURRENT_NAMESPACE=$CURRENT_NAMESPACE" >> $ENV_FUNCTION_FILE

  FUNCTIONS_APIHOST=`ibmcloud wsk property get --apihost | awk '{print $4}'`
  _out "_current wsk api host is $FUNCTIONS_APIHOST."
  printf "\nFUNCTIONS_APIHOST=$FUNCTIONS_APIHOST" >> $ENV_FUNCTION_FILE

  FUNCTIONS_AUTHORIZATION=`ibmcloud wsk property get --auth | awk '{print $3}'`
  _out "_current wsk authorization is $FUNCTIONS_AUTHORIZATION."
  printf "\nFUNCTIONS_AUTHORIZATION=$FUNCTIONS_AUTHORIZATION" >> $ENV_FUNCTION_FILE

  # Show the result of login to stdout
  ibmcloud target
    
  _out
  _out Login end
  _out
}

function usage() {
  _out  _Usage: $0 [--install,--uninstall,--reinstall,--env]
}

function install() {
  _out
  _out Installing...
  _out

  _out _creating package $IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME
  ibmcloud wsk package create $IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME
  ibmcloud wsk package list

  _out _adding parameter to package $IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME
  _out _list parameter 
  echo "Parmater: $IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME"
  echo "Parmater: $IBMCLOUD_USERAPI_URL"
  echo "Parmater: $IBMCLOUD_USERAPI_CLIENT_ID" 
  echo "Parmater: $IBMCLOUD_USERAPI_CLIENT_SECRET"
  echo "Parmater: $FUNCTIONS_APIHOST"
  echo "Parmater: $FUNCTIONS_AUTHORIZATION"
  
  
  ibmcloud wsk package update $IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME\
    --param USERAPI_URL $IBMCLOUD_USERAPI_URL\
    --param USERAPI_CLIENT_ID $IBMCLOUD_USERAPI_CLIENT_ID\
    --param USERAPI_CLIENT_SECRET $IBMCLOUD_USERAPI_CLIENT_SECRET\
    --param FUNCTIONS_APIHOST $FUNCTIONS_APIHOST\
    --param FUNCTIONS_AUTHORIZATION $FUNCTIONS_AUTHORIZATION\

  _out _creating actions
  ibmcloud wsk action create "$IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME/user-functions-API_addUser" userAPI_addUser.js

  _out _creating action sequence
  ibmcloud wsk action create "$IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME/addUserSequence" --sequence "$IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME/user-functions-API_addUser"

  _out _creating API
  
  _out _setup text-replace
  cd text-replace
  npm install
  cd ..

  _out __copy API Definition
  rm "$CURRENT_FOLDER/${IBMCLOUD_FUNCTIONS_API_DEFINTION_LOCATION}/$IBMCLOUD_FUNCTIONS_USER_API_DEFINITION"
  cp "$CURRENT_FOLDER/${IBMCLOUD_FUNCTIONS_API_DEFINTION_LOCATION}/$IBMCLOUD_FUNCTIONS_USER_API_DEFINITION_TEMPLATE" "$CURRENT_FOLDER/${IBMCLOUD_FUNCTIONS_API_DEFINTION_LOCATION}/$IBMCLOUD_FUNCTIONS_USER_API_DEFINITION"

  # Temp definitions
  NAMESPACE="${IBMCLOUD_CF_ORGANIZATION_NAME}_${IBMCLOUD_CF_SPACE_NAME}"

  _out __replace $IBMCLOUD_FUNCTIONS_REPLACE_NAMESPACE with $NAMESPACE
  npm --prefix "${ROOT_FOLDER}/users/functions-api/text-replace" start "${ROOT_FOLDER}/users/functions-api$IBMCLOUD_FUNCTIONS_API_DEFINTION_LOCATION/$IBMCLOUD_FUNCTIONS_USER_API_DEFINITION" $IBMCLOUD_FUNCTIONS_REPLACE_NAMESPACE $NAMESPACE

  _out __replace $IBMCLOUD_FUNCTIONS_REPLACE_PACKAGE_NAME with $IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME
  npm --prefix "${ROOT_FOLDER}/users/functions-api/text-replace" start "${ROOT_FOLDER}/users/functions-api$IBMCLOUD_FUNCTIONS_API_DEFINTION_LOCATION/$IBMCLOUD_FUNCTIONS_USER_API_DEFINITION" $IBMCLOUD_FUNCTIONS_REPLACE_PACKAGE_NAME $IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME

  _out __replace $IBMCLOUD_FUNCTIONS_REPLACE_OPENWHISK_API with $IBMCLOUD_FUNCTIONS_OPENWHISK_API
  npm --prefix "${ROOT_FOLDER}/users/functions-api/text-replace" start "${ROOT_FOLDER}/users/functions-api$IBMCLOUD_FUNCTIONS_API_DEFINTION_LOCATION/$IBMCLOUD_FUNCTIONS_USER_API_DEFINITION" $IBMCLOUD_FUNCTIONS_REPLACE_OPENWHISK_API $IBMCLOUD_FUNCTIONS_OPENWHISK_API
  
  _out __create Lite API
  API_HOME=$(ibmcloud wsk api create --config-file "${ROOT_FOLDER}/users/functions-api$IBMCLOUD_FUNCTIONS_API_DEFINTION_LOCATION/$IBMCLOUD_FUNCTIONS_USER_API_DEFINITION" | awk '/https:/{ print $1 }')
  
  _out _api $API_HOME
  _out

  _out Install Complete
  ibmcloud wsk list
  _out
}

function uninstall() {
  _out
  _out  Uninstalling...
  _out

  _out  _removing sequence actions...
  ibmcloud wsk action delete "$IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME/addUserSequence"
  
  _out  _removing actions...
  ibmcloud wsk action delete "$IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME/user-functions-API_addUser"
  
  _out  _removing packages...
  ibmcloud wsk package delete "$IBMCLOUD_FUNCTIONS_USER_PACKAGE_NAME"

  _out  _removing api...
  ibmcloud wsk api delete "$IBMCLOUD_FUNCTIONS_API_USERS_NAME"
  
  _out
  _out  Uninstall Complete
  ibmcloud wsk list
  _out
}

function showenv() {
  echo -e "${YELLOW}"
  echo -e "${NC}"
}

function endMessage() {
  _out
  _out "Now please verify the setup in IBM Cloud and for details use the logfile"
  _out
}

case "$1" in
"--install" )
ibmcloud_login
install
endMessage
;;
"--uninstall" )
ibmcloud_login
uninstall
;;
"--reinstall" )
ibmcloud_login
uninstall
install
endMessage
;;
"--env" )
ibmcloud_login
showenv
;;
* )
usage
;;
esac
#!/bin/bash

##############################################################################
# Copyright 2018 IBM Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
##############################################################################

root_folder=$(cd $(dirname $0); pwd)

# SETUP logging (redirect stdout and stderr to a log file)
readonly LOG_FILE="${root_folder}/deploy-twitter-functions.log"
readonly ENV_FILE="${root_folder}/../local.env"

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

function check_tools() {
    MISSING_TOOLS=""
    git --version &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} git"
    curl --version &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} curl"
    ibmcloud --version &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} ibmcloud"    
    if [[ -n "$MISSING_TOOLS" ]]; then
      _err "Some tools (${MISSING_TOOLS# }) could not be found, please install them first and then run scripts/setup-app-id.sh"
      exit 1
    fi
}

function ibmcloud_login() {
  # Skip version check updates
  ibmcloud config --check-version=false

  # Obtain the API endpoint from BLUEMIX_REGION and set it as default
  _out Logging in to IBM cloud
  ibmcloud api --unset
  #IBMCLOUD_API_ENDPOINT=$(ibmcloud api | awk '/'$BLUEMIX_REGION'/{ print $2 }')
  ibmcloud api https://cloud.ibm.com

  # Login to ibmcloud, generate .wskprops
  ibmcloud login --apikey $IBMCLOUD_API_KEY -r $BLUEMIX_REGION
  ibmcloud target -o "$IBMCLOUD_ORG" -s "$IBMCLOUD_SPACE"
  ibmcloud fn api list > /dev/null

  # Show the result of login to stdout
  ibmcloud target
}

function setup() {
  _out Preparing deployment of the two Twitter functions
  ibmcloud wsk package create emotions-demo

  readonly CONFIG_FILE="${root_folder}/../game/twitter-functions/config.json"
  rm $CONFIG_FILE
  touch $CONFIG_FILE

  printf "{\n" >> $CONFIG_FILE
  printf "\"cloudant_username\": \"" >> $CONFIG_FILE
  printf $CLOUDANT_USERNAME >> $CONFIG_FILE
  printf "\",\n" >> $CONFIG_FILE
  printf "\"cloudant_password\": \"" >> $CONFIG_FILE
  printf $CLOUDANT_PASSWORD >> $CONFIG_FILE
  printf "\"\n" >> $CONFIG_FILE
  printf "}" >> $CONFIG_FILE

  CONFIG=`cat $CONFIG_FILE`

  _out Deploying function: emotions-demo/read-last-results
  ibmcloud wsk action create emotions-demo/read-last-results --web raw ${root_folder}/../game/twitter-functions/read.js --kind nodejs:8 -a web-export true -p config "${CONFIG}"
  
  _out Deploying function: emotions-demo/write-last-results
  ibmcloud wsk action create emotions-demo/write-last-results ${root_folder}/../game/twitter-functions/write.js --kind nodejs:8 -a web-export true -p config "${CONFIG}"

  _out Downloading npm modules
  npm --prefix ${root_folder}/text-replace install ${root_folder}/text-replace

  _out Creating swagger-read.json
  rm ${root_folder}/../game/twitter-functions/swagger-read.json
  cp ${root_folder}/../game/twitter-functions/swagger-read-template.json ${root_folder}/../game/twitter-functions/swagger-read.json
  readonly NAMESPACE="${IBMCLOUD_ORG}_${IBMCLOUD_SPACE}"
  npm --prefix ${root_folder}/text-replace start ${root_folder}/text-replace ${root_folder}/../game/twitter-functions/swagger-read.json xxx-your-openwhisk-namespace-for-example:niklas_heidloff%40de.ibm.com_demo-xxx $NAMESPACE

  _out Deploying API: read-last-results
  TWITTER_API_READ=$(ibmcloud wsk api create --config-file ${root_folder}/../game/twitter-functions/swagger-read.json | awk '/https:/{ print $1 }')
  _out TWITTER_API_READ: $TWITTER_API_READ
  printf "\nTWITTER_API_READ=$TWITTER_API_READ" >> $ENV_FILE
  npm --prefix ${root_folder}/text-replace start ${root_folder}/text-replace ${root_folder}/../game/pubic/index.html twitter-url-not-defined $TWITTER_API_READ
  
  _out Creating swagger-write.json
  rm ${root_folder}/../game/twitter-functions/swagger-write.json
  cp ${root_folder}/../game/twitter-functions/swagger-write-template.json ${root_folder}/../game/twitter-functions/swagger-write.json
  npm --prefix ${root_folder}/text-replace start ${root_folder}/text-replace ${root_folder}/../game/twitter-functions/swagger-write.json xxx-your-openwhisk-namespace-for-example:niklas_heidloff%40de.ibm.com_demo-xxx $NAMESPACE

  _out Deploying API: write-last-results
  TWITTER_API_WRITE=$(ibmcloud wsk api create --config-file ${root_folder}/../game/twitter-functions/swagger-write.json | awk '/https:/{ print $1 }')
  _out TWITTER_API_WRITE: $TWITTER_API_WRITE
  printf "\nTWITTER_API_WRITE=$TWITTER_API_WRITE" >> $ENV_FILE
  npm --prefix ${root_folder}/text-replace start ${root_folder}/text-replace ${root_folder}/../game/src/store.ts twitter-url-not-defined $TWITTER_API_WRITE

  _out Done
}

# Main script starts here
check_tools

# Load configuration variables
if [ ! -f $ENV_FILE ]; then
  _err "Before deploying, copy template.local.env into local.env and fill in environment specific values."
  exit 1
fi
source $ENV_FILE
export IBMCLOUD_ORG IBMCLOUD_API_KEY BLUEMIX_REGION APPID_TENANTID APPID_OAUTHURL APPID_CLIENTID APPID_SECRET CLOUDANT_USERNAME CLOUDANT_PASSWORD IBMCLOUD_SPACE

_out Full install output in $LOG_FILE
ibmcloud_login
setup

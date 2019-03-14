#!/bin/bash

##############################################################################
# Copyright 2019 IBM Corporation
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
readonly LOG_FILE="${root_folder}/object-storage.log"
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
    vue --version &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} vue"
    yarn -v &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} yarn"
    ibmcloud --version &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} ibmcloud"    
    if [[ -n "$MISSING_TOOLS" ]]; then
      _err "Some tools (${MISSING_TOOLS# }) could not be found, please install them first"
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
  _out Creating vue.config.js
  cd ${root_folder}/
  npm install
  cp ${root_folder}/../game/vue.config.js.customdomain.template ${root_folder}/../game/vue.config.js

  npm --prefix ${root_folder}/text-replace start ${root_folder}/text-replace ${root_folder}/../game/src/store.ts other-domain-url-not-defined https://s3.us-south.objectstorage.softlayer.net/${BUCKET_NAME_CUSTOM_DOMAIN}/

  _out Building Vue application
  cd ${root_folder}/../game
  yarn install
  yarn build

  _out Uploading static web application resources
  IAM_TOKEN=$(ibmcloud iam oauth-tokens | awk '/IAM/{ print $4 }')

  cd ${root_folder}/../game/dist
  for f in * **/* **/**/*; do
    echo $f
    case $f in
      *.ico*)
        curl -X "PUT" "https://s3.us-south.objectstorage.softlayer.net/${BUCKET_NAME_CUSTOM_DOMAIN}/${f}" \
          -H "x-amz-acl: public-read" \
          -H "Authorization: Bearer ${IAM_TOKEN}" \
          -H "Content-Type: image/x-icon" \
          --upload-file "${root_folder}/../game/dist/${f}";;
      *.html*)
        curl -X "PUT" "https://s3.us-south.objectstorage.softlayer.net/${BUCKET_NAME_CUSTOM_DOMAIN}/${f}" \
          -H "x-amz-acl: public-read" \
          -H "Authorization: Bearer ${IAM_TOKEN}" \
          -H "Content-Type: text/html; charset=utf-8" \
          --upload-file "${root_folder}/../game/dist/${f}";;
      *.css*)
        curl -X "PUT" "https://s3.us-south.objectstorage.softlayer.net/${BUCKET_NAME_CUSTOM_DOMAIN}/${f}" \
          -H "x-amz-acl: public-read" \
          -H "Authorization: Bearer ${IAM_TOKEN}" \
          -H "Content-Type: text/css; charset=utf-8" \
          --upload-file "${root_folder}/../game/dist/${f}";;
      *.png*)
        curl -X "PUT" "https://s3.us-south.objectstorage.softlayer.net/${BUCKET_NAME_CUSTOM_DOMAIN}/${f}" \
          -H "x-amz-acl: public-read" \
          -H "Authorization: Bearer ${IAM_TOKEN}" \
          -H "Content-Type: image/png" \
          --upload-file "${root_folder}/../game/dist/${f}";;
      *.json*)
        curl -X "PUT" "https://s3.us-south.objectstorage.softlayer.net/${BUCKET_NAME_CUSTOM_DOMAIN}/${f}" \
          -H "x-amz-acl: public-read" \
          -H "Authorization: Bearer ${IAM_TOKEN}" \
          -H "Content-Type: application/json" \
          --upload-file "${root_folder}/../game/dist/${f}";;
      *.js*)
        curl -X "PUT" "https://s3.us-south.objectstorage.softlayer.net/${BUCKET_NAME_CUSTOM_DOMAIN}/${f}" \
          -H "x-amz-acl: public-read" \
          -H "Authorization: Bearer ${IAM_TOKEN}" \
          -H "Content-Type: text/plain; charset=utf-8" \
          --upload-file "${root_folder}/../game/dist/${f}";;
      *)
        curl -X "PUT" "https://s3.us-south.objectstorage.softlayer.net/${BUCKET_NAME_CUSTOM_DOMAIN}/${f}" \
          -H "x-amz-acl: public-read" \
          -H "Authorization: Bearer ${IAM_TOKEN}" \
          -H "Content-Type: application/octet-stream" \
          --upload-file "${root_folder}/../game/dist/${f}";;
    esac
  done;

  printf "\nGAME_URL=https://s3.us-south.objectstorage.softlayer.net/$BUCKET_NAME_CUSTOM_DOMAIN/index.html" >> $ENV_FILE

  _out Done! Run scripts/openwhisk-create-html.sh next
}

# Main script starts here
check_tools

# Load configuration variables
if [ ! -f $ENV_FILE ]; then
  _err "Before deploying, copy template.local.env into local.env and fill in environment specific values."
  exit 1
fi
source $ENV_FILE
export IBMCLOUD_ORG IBMCLOUD_API_KEY BLUEMIX_REGION APPID_TENANTID APPID_OAUTHURL APPID_CLIENTID APPID_SECRET CLOUDANT_USERNAME CLOUDANT_PASSWORD IBMCLOUD_SPACE COS_ID BUCKET_NAME BUCKET_NAME_CUSTOM_DOMAIN

_out Full install output in $LOG_FILE
ibmcloud_login
setup

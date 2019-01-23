CONFIG=`cat config.json`

ibmcloud wsk action update emotions-demo/read-last-results read.js --web raw --kind nodejs:8 -a web-export true -p config "${CONFIG}"
ibmcloud wsk action update emotions-demo/write-last-results write.js --kind nodejs:8 -a web-export true -p config "${CONFIG}"
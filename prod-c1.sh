#!/bin/bash
cp service.server.js  web/angular/service.js
npm install
echo "killing the millionsqft.js"
ps -ef | grep "node millionsqft.js" | grep -v runstatic | awk '{print $2}' | xargs kill -9
echo "Restarting Service"
node millionsqft.js
echo "Service started at port 41000"

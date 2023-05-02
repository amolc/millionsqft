#!/bin/bash
cp service.server.js  web/angular/service.js
npm install
echo "killing the royalmanpower.js"
ps -ef | grep "node royalmanpower.js" | grep -v runstatic | awk '{print $2}' | xargs kill -9
echo "Restarting Service"
node royalmanpower.js
echo "Service started at port 35000"

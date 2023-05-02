#!/usr/bin/env bash

mydir=$(dirname $0)
ps -ef | grep "node server.js" | grep -v runstatic | awk '{print $2}' | xargs kill -9

currentdir=$(dirname $mydir)
conffile=$currentdir/scripts/configs/config.sh

source $conffile

cd $FRONTEND_DEST

bash prod-c1.sh


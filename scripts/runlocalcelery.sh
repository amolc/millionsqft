#!/usr/bin/env bash

mydir=$(dirname $0)
ps -ef | grep "celery -A restserver worker" | grep -v runcelery | awk '{print $2}' | xargs kill -9

repodir=$(dirname $mydir)
echo $repodir
conffile=/Users/amolc/2020/finance/scripts/configs/iamstockbot.sh
source /Users/amolc/2020/finance/scripts/configs/iamstockbot.sh
cd /Users/amolc/2020/finance/restserver
source /Users/amolc/2020/finance/restserver/venv/bin/activate
celery -A restserver worker --loglevel=debug
#checking if only warning can work

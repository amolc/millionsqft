#!/usr/bin/env bash

mydir=$(dirname $0)
ps -ef | grep "celery -A restserver worker" | grep -v runcelery | awk '{print $2}' | xargs kill -9

repodir=$(dirname $mydir)
echo $repodir
conffile=/home/ubuntu/repos/finance/scripts/configs/iamstockbot.sh
source /home/ubuntu/repos/finance/scripts/configs/iamstockbot.sh
cd /var/www/finance/restserver
source /var/www/finance/restserver/venv/bin/activate
celery -A restserver worker --loglevel=debug
#checking if only warning can work

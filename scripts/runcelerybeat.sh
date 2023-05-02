#!/usr/bin/env bash
mydir=$(dirname $0)

repodir=$(dirname $mydir)
conffile=/home/ubuntu/repos/finance/scripts/configs/iamstockbot.sh
source $conffile
DJANGO_BASE_DIR=$PROJECT_DEST/$APISERVER


cd $DJANGO_BASE_DIR
source venv/bin/activate
celery -A restserver beat --loglevel=debug

#!/usr/bin/env bash
# exporting env variables to be used with django server
export DJANGO_SETTINGS_MODULE="restserver.settings"
export SERVICE_PORT=9001
export MYSQL_USER="stockrobot"
export MYSQL_DB="restapi"
export MYSQL_HOST="db.iamstockbot.com"
export MYSQL_PASSWORD="10gXWOqeaf"
export MYSQL_PORT="5432"
export CELERY_URL="amqp://localhost"
export REDIS_HOST="127.0.0.1"
export REDIS_PORT="6379"

# config for api server
REPO_DIR="/home/ubuntu/repos/finance"
REPO_BRANCH="main"
PROJECT_DEST="/var/www/finance"
APISERVER="restserver"
STATIC_DIR="/var/www/static"
EXCLUDE_DIRS="/venv/ /logs/ /.git/ /datafeed/csv/ /restserver/celery.py"

# supervisor names
# to disable any service comment its name
APISUPERVISORNAME="apiserver"
CELERYSUPERVISORNAME="api_celery"
CELERYBEATSUPERVISORNAME="api_celery_beat"

# frontend config
FRONTEND_DEST="/var/www/tradedigitalgold.com"
FRONTEND_REPO_DIR="/home/ubuntu/repos/tradedigitalgold.com"
FRONTEND_REPO_BRANCH="main"
FRONTEND_EXCLUDE_DIRS="/restserver/ /.git/ /node_modules/"
FRONTENDSUPERVISORNAME="tradedigitalgold"
api_config="tradedigitalgold"

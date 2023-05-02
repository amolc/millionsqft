#!/usr/bin/env bash

# Following Script prepares and installs required packages on Ubuntu Virtual Machine  
# to run finance repo
# to use this script "./scripts/setup_server config_name DNS"
# example "./scripts/setup_server iamstockbot-prod iamstockbot.com"

# This is s test server

set -e
cd "$(dirname $0)"
SCRIPTS_DIR="$PWD"
if [ -e $1 ]; then
    echo """ERROR: 'config_name' not provided
    to use this script 
    run as ./scripts/setup_server config_name DNS
    example ./scripts/setup_server iamstockbot-prod iamstockbot.com"""
    exit 1
fi
if [ -e $2 ]; then
    echo """ERROR: 'DNS' not provided
    to use this script 
    run as ./scripts/setup_server config_name DNS
    example ./scripts/setup_server iamstockbot-prod iamstockbot.com"""
    exit 1
fi
config_name=$1
dns=$2

#################################
# Install linux packages
#################################
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y \
    nginx supervisor virtualenv wget curl git libpq-dev python3-dev gcc \
    redis-server rabbitmq-server python3-certbot-nginx

#################################
# start and enable supervisor service
#################################
sudo systemctl enable supervisor.service
sudo chmod 1777 /var/run/supervisor.sock 
sudo sed -i "s/chmod=0700 ; sockef file mode (default 0700)/chmod=0777; sockef file mode (default 0700)/g" /etc/supervisor/supervisord.conf

#################################
# setup nginx and ssl cert for DNS
#################################
sed "s/dns/$dns/g" $SCRIPTS_DIR/nginx/nginx-template.conf > $SCRIPTS_DIR/nginx/default
sudo cp $SCRIPTS_DIR/nginx/default /etc/nginx/sites-available/default
sudo nginx -s reload
sudo certbot --nginx -n --redirect -d api.$dns --expand --agree-tos  --email sample@testmail.com


##################################################################
# Echo instruction to add supervisor conf and update services
##################################################################
echo """
to add services files to supervisor
like 'sudo cp -r $SCRIPTS_DIR/supervisord/apiservice.conf /etc/supervisor/conf.d/'

Update supervisor with new services
'supervisorctl update'
'supervisorctl start all' to start services to start servers
"""
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl restart apiserver
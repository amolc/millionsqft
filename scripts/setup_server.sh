#!/usr/bin/env bash

# Following Script prepares and installs required packages on Ubuntu Virtual Machine  
# to run finance repo
# to use this script "./scripts/setup_server config_name DNS"
# example "./scripts/setup_server iamstockbot-prod iamstockbot.com"

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
sudo certbot --nginx -n --redirect -d $dns -d api.$dns -d www.$dns --expand --agree-tos  --email sample@testmail.com

#################################
# setup cloudwatch agent
#################################
curl -sSL https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb > /tmp/amazon-cloudwatch-agent.deb
sudo dpkg -i -E /tmp/amazon-cloudwatch-agent.deb
sudo mkdir -p /root/.aws
sudo cp $SCRIPTS_DIR/cw/aws-config /root/.aws/config
sed "s/config_name/$config_name/g" $SCRIPTS_DIR/cw/cw-template.json > $SCRIPTS_DIR/cw/config.json
sudo cp $SCRIPTS_DIR/cw/config.json /opt/aws/amazon-cloudwatch-agent/bin/config.json
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m auto -s -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json


##################################################################
# Create projects folders and update permissions for current user
##################################################################
if ! [ -e $SCRIPTS_DIR/configs/config.sh ]; then
    cp $SCRIPTS_DIR/configs/$config_name.sh $SCRIPTS_DIR/configs/config.sh
fi
source $SCRIPTS_DIR/configs/config.sh

echo "Creating application folder '$PROJECT_DEST/$APISERVER'..."
sudo mkdir -p $STATIC_DIR $PROJECT_DEST/$APISERVER $PROJECT_DEST/$APISERVER/logs $PROJECT_DEST/$APISERVER/datafeed/csv $FRONTEND_DEST $PROJECT_DEST/$APISERVER/datafeed/broker

# change ownership of the app folder to the newly created user account
echo "Setting ownership of $PROJECT_DEST/$APISERVER and its descendents to current User and Group..."
current_user="$USER"
current_group=`id -g -n`
sudo chown -R $current_user:$current_group $STATIC_DIR $PROJECT_DEST/$APISERVER $PROJECT_DEST/$APISERVER/logs $PROJECT_DEST/$APISERVER/datafeed/csv $FRONTEND_DEST $PROJECT_DEST/$APISERVER/datafeed/broker

###############
# Mount EFS for CSV files on on iamstockbot servers
###############
if [ $config_name == "iamstockbot" ]
then
    sudo bash -c 'echo "fs-0aebf3d7b494ad1cc.efs.us-west-1.amazonaws.com:/iamstockbot-csvfiles/ /var/www/finance/restserver/datafeed/csv/ efs rw,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport,tls,_netdev 0 0" >> /etc/fstab'
    sudo bash -c 'echo "fs-0aebf3d7b494ad1cc.efs.us-west-1.amazonaws.com:/iamstockbot-broker/ /var/www/finance/restserver/datafeed/broker/ efs rw,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport,tls,_netdev 0 0" >> /etc/fstab'
    sudo mount -a
fi

##################################################################
# Echo instruction to add supervisor conf and update services
##################################################################
echo """
to add services files to supervisor
like 'sudo cp -r $SCRIPTS_DIR/supervisord/service.conf /etc/supervisor/conf.d/'

Update supervisor with new services
'supervisorctl update'
'supervisorctl start all' to start services to start servers
"""

#!/bin/bash

NAME="restserver-daphne"  # Name of the application
DJANGODIR=/var/www/finance/restserver # Django project directory
DJANGOENVDIR=/home/ubuntu/repos/finance/scripts/configs/iamstockbot.sh # Django project env

echo "Starting $NAME as `whoami`"

# Activate the virtual environment
cd $DJANGODIR
source venv/bin/activate
source $DJANGOENVDIR

# Start daphne
exec daphne  -p 9002 restserver.asgi:application

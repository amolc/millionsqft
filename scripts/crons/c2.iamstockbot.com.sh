#!/bin/bash
cp /var/www/finance/restserver/restserver/celery-collectdata.py /var/www/finance/restserver/restserver/celery.py
supervisorctl restart api_celery
supervisorctl restart api_celery_beat

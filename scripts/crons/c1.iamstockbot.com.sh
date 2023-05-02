#!/bin/bash
cp /var/www/finance/restserver/restserver/celery-supertrend.py /var/www/finance/restserver/restserver/celery.py
supervisorctl restart api_celery
supervisorctl restart api_celery_beat

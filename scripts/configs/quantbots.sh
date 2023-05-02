#!/usr/bin/env bash
# exporting env variables to be used with django server

# frontend config
FRONTEND_DEST="/var/www/quantbots"
FRONTEND_REPO_DIR="/home/ubuntu/repos/quantbots"
FRONTEND_REPO_BRANCH="master"
FRONTEND_EXCLUDE_DIRS="/.git/ /node_modules/"
FRONTENDSUPERVISORNAME="quantbots"
api_config="quantbots"

#!/usr/bin/env bash
# exporting env variables to be used with django server

# frontend config
FRONTEND_DEST="/var/www/millionsqft"
FRONTEND_REPO_DIR="/home/ubuntu/repos/millionsqft"
FRONTEND_REPO_BRANCH="main"
FRONTEND_EXCLUDE_DIRS="/.git/ /node_modules/"
FRONTENDSUPERVISORNAME="millionsqft"
api_config="millionsqft"

#!/usr/bin/env bash
# exporting env variables to be used with django server

# frontend config
FRONTEND_DEST="/var/www/nsealerts"
FRONTEND_REPO_DIR="/home/ubuntu/repos/nsealerts"
FRONTEND_REPO_BRANCH="master"
FRONTEND_EXCLUDE_DIRS="/.git/ /node_modules/"
FRONTENDSUPERVISORNAME="nsealerts"
api_config="nsealerts"

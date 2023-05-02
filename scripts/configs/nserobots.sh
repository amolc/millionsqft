#!/usr/bin/env bash
# exporting env variables to be used with django server

# frontend config
FRONTEND_DEST="/var/www/nserobots"
FRONTEND_REPO_DIR="/home/ubuntu/repos/nserobots"
FRONTEND_REPO_BRANCH="master"
FRONTEND_EXCLUDE_DIRS="/.git/ /node_modules/"
FRONTENDSUPERVISORNAME="nserobots"
api_config="nserobots"

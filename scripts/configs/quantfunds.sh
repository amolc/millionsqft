#!/usr/bin/env bash
# exporting env variables to be used with django server

# frontend config
FRONTEND_DEST="/var/www/quantfunds"
FRONTEND_REPO_DIR="/home/ubuntu/repos/quantfunds"
FRONTEND_REPO_BRANCH="main"
FRONTEND_EXCLUDE_DIRS="/.git/ /node_modules/"
FRONTENDSUPERVISORNAME="quantfunds"
api_config="quantfunds"

#!/usr/bin/env bash
# exporting env variables to be used with django server

# frontend config
FRONTEND_DEST="/var/www/hmglobaltrading"
FRONTEND_REPO_DIR="/home/ubuntu/repos/hmglobaltrading"
FRONTEND_REPO_BRANCH="main"
FRONTEND_EXCLUDE_DIRS="/restserver/ /.git/ /node_modules/"
FRONTENDSUPERVISORNAME="hmglobaltrading"
api_config="hmglobaltrading"

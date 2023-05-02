#!/usr/bin/env bash
# exporting env variables to be used with django server

# frontend config
FRONTEND_DEST="/var/www/parttimejobs"
FRONTEND_REPO_DIR="/home/ubuntu/repos/parttimejobs"
FRONTEND_REPO_BRANCH="main"
FRONTEND_EXCLUDE_DIRS="/restserver/ /.git/ /node_modules/"
FRONTENDSUPERVISORNAME="parttimejobs"
api_config="parttimejobs"

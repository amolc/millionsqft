#!/usr/bin/env bash
set -e
cd "$(dirname $0)"
SCRIPTS_DIR="$PWD"

config_name=$1
cp $SCRIPTS_DIR/configs/$config_name.sh $SCRIPTS_DIR/configs/config.sh

source $SCRIPTS_DIR/configs/config.sh

echo "Update repo code"
cd "$REPO_DIR"
git fetch
git checkout "$REPO_BRANCH"
git pull > /dev/null
git log -n 1

echo "update service.js in static"
source $REPO_DIR/deploy.sh


echo "Enable venv if not present"
cd "$PROJECT_DEST/$APISERVER"
# activate virtual env if not present
if ! [ -d "venv/" ]
then
  if [ -z "$PYTHON_EXECUTABLE" ]
  then
      virtualenv venv
  else
      virtualenv venv -p $PYTHON_EXECUTABLE
  fi
fi
echo "Install requirements.txt"
source venv/bin/activate
cd "$REPO_DIR/$APISERVER/"
pip install -U pip
pip install -r requirements.txt


echo "Update project directory"
cd "$PROJECT_DEST/$APISERVER"
rsync_excluded=""
for dir in ${EXCLUDE_DIRS}
do
    rsync_excluded+=" --exclude $dir "
done

rsync -a --info=NAME,PROGRESS --delete ${rsync_excluded} "$REPO_DIR/$APISERVER/" .

echo "migrate db"
# python manage.py migrate --noinput

# python manage.py collectstatic --noinput
# python manage.py check

echo "Starting only following services"
if [ "$APISUPERVISORNAME" != "" ]
then
    supervisorctl restart "$APISUPERVISORNAME"
fi
supervisorctl restart "$CELERYSUPERVISORNAME"
supervisorctl restart "$CELERYBEATSUPERVISORNAME"
echo """
To restart other services use supervisorct restart <service-name>
"""

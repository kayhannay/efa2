#!/bin/bash
#
####
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Copyright 2008-2012 Kay Hannay <klinux@hannay.de>
#
###
#
# Create backup of efa data to a ZIP file
# Usage: run_backup.sh <PATH_TO_STORE_BACKUP>
#
EFA_BACKUP_PATHS="/opt/efa/ausgabe/layout /opt/efa/daten /home/efa/efa"
EFALIVE_BACKUP_PATHS="/home/efa/.efalive"
BACKUP_TIMESTAMP=`/bin/date +%Y%m%d_%H%M%S`

if [ -f ~/.efalive/settings.conf ]
then
    . ~/.efalive/settings.conf
else
    /bin/echo "efaLive has not been configured yet!"
    exit 1000
fi

if [ ! $1 ]
then
	/bin/echo "Error, no backup path specified!"
	exit 1001
fi

if [ ! -d $1 ]
then
	/bin/echo "Error, specified path does not exist!"
	exit 1002
fi

### Create backup
if [ $EFA_VERSION -eq 2 ]
then
    BACKUP_DIR=$1/efaLive_backup_${BACKUP_TIMESTAMP}
    mkdir $BACKUP_DIR
    EFA_BACKUP_FILE=$BACKUP_DIR/efa_backup_$BACKUP_TIMESTAMP.zip
    /bin/echo "Create efa backup to $EFA_BACKUP_FILE ..."
    EFA_CRED=$EFA_CREDENTIALS_FILE /opt/efa2/efaCLI.sh efalive@localhost:$EFA_PORT -cmd "backup create all $EFA_BACKUP_FILE"
    CLI_RETURNCODE=$?
    if [ $CLI_RETURNCODE -ne 0 ]
    then
        /bin/echo "Error, efa backup could not be created ($CLI_RETURNCODE)"
        exit $CLI_RETURNCODE
    fi
    cd /
    EFALIVE_BACKUP_FILE="$BACKUP_DIR/efaLive_backup_${BACKUP_TIMESTAMP}.zip"
    /bin/echo "Create efaLive backup to $EFALIVE_BACKUP_FILE ..."
    /usr/bin/zip -r $EFALIVE_BACKUP_FILE $EFALIVE_BACKUP_PATHS
    if [ ! -e $EFALIVE_BACKUP_FILE ]
    then
        /bin/echo "Error, efaLive backup file has not been created"
        exit 1003
    fi
else
    cd /
    BACKUP_FILE="efaLive_backup_${BACKUP_TIMESTAMP}.zip"
    /bin/echo "Create efa backup to $BACKUP_FILE ..."
    /usr/bin/zip -r $1/$BACKUP_FILE $EFA_BACKUP_PATHS $EFALIVE_BACKUP_PATHS
    if [ ! -e $1/$BACKUP_FILE ]
    then
	    /bin/echo "Error, backup was not successful"
        exit 1003
    fi
fi


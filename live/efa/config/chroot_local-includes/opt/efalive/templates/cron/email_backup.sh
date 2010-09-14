#!/bin/bash

RECIPIENT="user@example.local"

mkdir /tmp/efa_backup
/opt/efalive/bin/run_backup /tmp/efa_backup
for i in `ls /tmp/efa_backup`
do
    (/bin/echo "Automatic efa backup"; uuencode /tmp/efa_backup/$i $i) | mail -s"efa backup `/bin/date +%d.%m.%Y %k:%M:%S`" -t"$RECIPIENT"
done
rm -r /tmp/efa_backup

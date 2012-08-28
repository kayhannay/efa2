#
# Regular cron jobs for the efa package
#
0 4	* * *	root	[ -x /usr/bin/efa_maintenance ] && /usr/bin/efa_maintenance

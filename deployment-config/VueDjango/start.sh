#!/bin/bash
printf "\n umask 002\n" >> /root/.profile
source /root/.profile

usermod -G root www-data

cd /home/csapp/GVVMC && \
chgrp -R www-data logs && \
chmod -R g+w logs

apachectl start
service apache2 reload

a2ensite dev.sitename.conf

/bin/bash
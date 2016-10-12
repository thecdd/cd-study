#!/bin/bash
printf "\n umask 002\n" >> /root/.profile
source /root/.profile

usermod -G root www-data

cd /home/app/thecd && \
chgrp -R www-data logs && \
chmod -R g+w logs

apachectl start
service apache2 reload

a2ensite dev.sitename.conf

nodejs node_modules/webpack/bin/webpack.js --config webpack.config.js --watch

/bin/bash
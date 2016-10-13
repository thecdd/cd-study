#
# This Dockerfile will install required packages of python app
#
# Usage: docker build --no-cache=true --rm=true --force-rm=true -t thecd/free-map:latest -f free-map.dockerfile .
# Usage with cache enable: docker build --tag="thecd/free-map:latest" -f free-map.dockerfile .
#

# Pull base image.
FROM thecd/apache-python-nodejs:latest

# Dockerfile Owner
MAINTAINER https://hub.docker.com/r/thecd

ENV PROJECT_HOME="/home/app" \
    PROJECT_NAME="thecd" \
    APP_NAME="VueDjango"
	
ENV APP_DIR="${PROJECT_HOME}/${PROJECT_NAME}/${APP_NAME}" \
    LOG_DIR="${PROJECT_HOME}/${PROJECT_NAME}/logs" \
    PYTHONPATH="${PROJECT_HOME}/${PROJECT_NAME}/${APP_NAME}"

# Create application folder in container
RUN	mkdir -p ${APP_DIR} && \
	mkdir -p ${LOG_DIR}

# Define project directory
WORKDIR ${PROJECT_HOME}/${PROJECT_NAME}

RUN	rm /etc/apache2/ports.conf

COPY VueDjango ${APP_DIR}
COPY deployment-config/VueDjango/dev.sitename.conf /etc/apache2/sites-available/
COPY deployment-config/VueDjango/ports.conf /etc/apache2/
COPY deployment-config/VueDjango/start.sh ${APP_DIR}/

RUN     fromdos ${APP_DIR}/start.sh && \
		pip install -r ${APP_DIR}/_doc/requirements.pip -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com && \
		cd /home/app/thecd && \
		chgrp -R www-data logs && \
		chmod -R g+w logs && \
		cd ${PROJECT_HOME}/${PROJECT_NAME} && \
		chmod -R 644 ${APP_NAME} && \
		find ${APP_NAME} -type d -exec chmod -R 755 \{\} \; && \
		cd ${APP_DIR} && \
		npm install rimraf -g && \
		rimraf node_modules && \
		npm config set registry https://registry.npm.taobao.org  && \
		npm info underscore && \
		npm install && \
		rm -rf ${APP_DIR}/static && \
		mkdir ${APP_DIR}/static && \
		nodejs node_modules/webpack/bin/webpack.js --config webpack.config.js && \
        chmod +x ${APP_DIR}/start.sh

#
# Dockerfile for thecd/apache-python.dockerfile
# Usage: docker build --no-cache=true --rm=true --force-rm=true -t thecd/apache-python:latest -f apache-python.dockerfile .
# Usage with cache enable: docker build --tag="thecd/apache-python:latest" -f apache-python.dockerfile .
#

# Pull base image.
FROM python:3.4.4

# Dockerfile Owner
MAINTAINER https://hub.docker.com/r/thecd

# Install apache server
RUN apt-get update && \
	apt-get install -y apache2 && \
	apt-get install -y libapache2-mod-wsgi-py3 && \
	apt-get install -y tofrodos

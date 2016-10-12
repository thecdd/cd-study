#
# Dockerfile for thecd/apache-python.dockerfile
# Usage: docker build --no-cache=true --rm=true --force-rm=true -t thecd/apache-python-nodejs:latest -f apache-python-nodejs.dockerfile .
# Usage with cache enable: docker build --tag="thecd/apache-python-nodejs:latest" -f apache-python-nodejs.dockerfile .
#

# Pull base image.
FROM thecd/apache-python

# Dockerfile Owner
MAINTAINER https://hub.docker.com/r/thecd

# Install apache server
RUN curl -sL https://deb.nodesource.com/setup_0.12 | bash - && \
	apt-get install -y nodejs

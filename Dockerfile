# Using buster, a Debian-based Node image, since Python needs to be available to install the project dependencies.
FROM node:lts-buster AS builder

# Copy all non-docker-ignored files from the current directory into the container and install npm dependencies
WORKDIR /usr/src/builder
COPY . .
RUN npm install
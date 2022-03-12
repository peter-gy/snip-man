#!/bin/bash

# Self-signed key for the frontend
openssl \
    req -x509 \
    -nodes \
    -days 365 \
    -subj "/C=CA/ST=QC/O=UniWienISE/CN=snip-man-web" \
    -addext "subjectAltName=DNS:snip-man-web" \
    -newkey rsa:2048 -keyout /etc/ssl/private/snip-man-web-self-signed.key \
    -out /etc/ssl/certs/snip-man-web-self-signed.crt

# Self-signed key for the backend
openssl \
    req -x509 \
    -nodes \
    -days 365 \
    -subj "/C=CA/ST=QC/O=UniWienISE/CN=snip-man-server" \
    -addext "subjectAltName=DNS:snip-man-server" \
    -newkey rsa:2048 -keyout /etc/ssl/private/snip-man-server-self-signed.key \
    -out /etc/ssl/certs/snip-man-server-self-signed.crt

FROM nginx:1.21

# Replace the default config with our own
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Script to generate self-signed certificates upon container start
COPY certgen.sh /certgen-maybe-dos.sh
# Convert DOS to Linux line endings (CRLF -> LF) of the script and make it executable
RUN cat /certgen-maybe-dos.sh | tr -d '\015' > /docker-entrypoint.d/certgen.sh &&  \
    chmod +x /docker-entrypoint.d/certgen.sh

# Turning off the daemon is necessary in Docker
CMD ["nginx", "-g", "daemon off;"]

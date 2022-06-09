FROM nginx:1.21

# Replace the default config with our own
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Generate self-signed certificates upon container start
COPY certgen.sh /docker-entrypoint.d/
# Convert DOS to Linux line endings (CRLF -> LF) of the script and make it executable
RUN sed 's/^M$//' /docker-entrypoint.d/certgen.sh &&  \
    chmod +x /docker-entrypoint.d/certgen.sh

# Turning off the daemon is necessary in Docker
CMD ["nginx", "-g", "daemon off;"]

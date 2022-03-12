# SnipMan - A Snippet Manager

## Running the App

Build and start the Docker services:

```shell
docker compose build
docker compose up
```

### Accessing App Components

Only the `web` and `server` components are exposed publicly. They can be accessed both with and without using SSL. Please note that self-signed SSL certificates are generated upon container startup, hence your browser will complain about security risks when visiting any of the below HTTPS links.

- `web`:
    - [http://localhost](http://localhost)
    - [https://localhost](https://localhost)
- `server`:
    - [http://localhost:4000](http://localhost:4000)
    - [https://localhost:8443](https://localhost:8443)

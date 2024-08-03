# Nimby rails real-world traveled rails mapping project

App used to collate KML files describing rail lines that have been travelled in real life by
members of the Nimby Rails community. 

App is built with Docker and consists of three parts:
- nginx webserver
- node.js backend
- Vue 3 frontend

In order to run the app in dev mode, ensure you have Docker Compose installed and use the following command:
```
docker-compose up --detach
```

The website will be available on localhost:80. The `/api` URL prefix maps to the node.js backend,
while all other urls are mapped to the Vue frontend project.

In order to power down the docker containers, simply run `docker-compose down`.

## Changing NPM dependencies
The docker containers have been optimised to only install the NPM dependencies once and include them as part of the container image.
Doing so speeds up the startup time after the container has been built once,
but means that changes to the NPM dependencies won't be picked up by default.

In order for changes in NPM dependencies to be picked up, the containers must be rebuilt. You can do so as follows:
```
docker-compose down
docker-compose up --build --detach
```


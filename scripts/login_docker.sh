#!/bin/bash

# This script is used to login to docker hub, username und password will be read from .env file wich is located in the root directory of this project
echo "Login to docker hub"
source ./.env
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
echo "Login to docker hub done"
```

```bash



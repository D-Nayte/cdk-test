#!/bin/bash

# This script is used to login to docker hub, username und password will be read from .env file wich is located in the root directory of this project
echo "Start container"
source
dockerrun docker run -p 80:3000 $DOCKER_IMAGE_NAME
echo "Container is running...."
```

```bash
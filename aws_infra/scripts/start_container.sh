#!/bin/bash

# This script is used to login to docker hub, username und password will be read from .env file wich is located in the root directory of this project
echo "Start container"
source ./.env

# load the dockerimage from dockerImage/dockerImage.tar and run the image in a container
docker load -i ./dockerImage/dockerImage.tar
docker run -d -p 80:3000 --name dockerImage dockerImage

echo "Container is running...."
```

```bash
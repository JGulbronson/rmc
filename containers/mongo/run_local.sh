#!/bin/bash

NAME=rmc-mongo-dev

CONTAINER_ID=`docker ps | grep $NAME | cut -d' ' -f1`

if [ ! "$CONTAINER_ID" ]; then
  docker run -d \
    --name $NAME \
    -p 27017:27017 \
    -v $(pwd)/mongodb:/data/db \
    rmc-mongo
else
  echo "$NAME is already running with ID $CONTAINER_ID"
fi

#!/bin/bash

NAME=rmc-celery-dev

HOST_IP=$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')

CONTAINER_ID=`docker ps | grep $NAME | cut -d' ' -f1`

if [ ! "$CONTAINER_ID" ]; then
  docker run --name $NAME \
    -e CELERY_BROKER_URL=redis://redis \
    -d rmc-celery
else
  echo "$NAME is already running with ID $CONTAINER_ID"
fi

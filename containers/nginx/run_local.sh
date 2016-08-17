#!/bin/bash

NAME=rmc-nginx-dev

HOST_IP=$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')

CONTAINER_ID=`docker ps | grep $NAME | cut -d' ' -f1`

if [ ! "$CONTAINER_ID" ]; then
  docker run --name $NAME \
    --add-host docker:$HOST_IP \
    -p 8080:80 \
    -v $PWD/etc/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf \
    -d rmc-nginx
else
  echo "$NAME is already running with ID $CONTAINER_ID"
fi

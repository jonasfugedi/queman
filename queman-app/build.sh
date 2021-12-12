#!/bin/sh
docker build -f Dockerfile . -t queman-nginx
echo "To run 'docker run --rm --name=queman-nginx -p 8090:8090 queman-nginx'"

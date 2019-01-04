#!/bin/sh

envsubst '$API_URL,$FORWARD_PROTO,$API_PREFIX' < /etc/nginx/nginx.conf.tempate > /etc/nginx/nginx.conf

/usr/sbin/nginx -g 'daemon off;'

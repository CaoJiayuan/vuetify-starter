FROM nginx:alpine

ENV FORWARD_PROTO=http \
    API_URL=http://localhost \
    API_PREFIX=/api

COPY nginx.conf.template /etc/nginx/nginx.conf.tempate
COPY dist /usr/share/nginx/html
COPY entry-point.sh /run/entry-point.sh
RUN  chmod +x /run/entry-point.sh

ENTRYPOINT /run/entry-point.sh

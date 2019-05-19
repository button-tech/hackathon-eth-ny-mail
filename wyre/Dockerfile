FROM nginx:1.15.12-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY www /usr/share/nginx/html

RUN apk update && apk add git

EXPOSE 80

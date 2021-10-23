FROM node:16-alpine

WORKDIR /usr/src

COPY . ./

RUN apk update && apk add gcc autoconf automake libtool dpkg pkgconfig libpng libpng-dev g++ nasm make bash

EXPOSE 3000

CMD ["bash", "./main.sh"]
FROM node:16-alpine

WORKDIR /usr/src

COPY . ./

RUN apk update && apk add --no-cache \ 
    gcc \ 
    autoconf \ 
    automake \ 
    libtool \ 
    dpkg \ 
    pkgconfig \ 
    libpng \ 
    libpng-dev \ 
    g++ \ 
    nasm \ 
    make \ 
    bash \
    chromium \
    tzdata \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont

EXPOSE 3000

CMD ["bash", "./main.sh"]
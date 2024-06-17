FROM node:22-alpine AS base

WORKDIR /usr/src/app

COPY ../next/ /usr/src/app

EXPOSE 3000

CMD npm install && npm run dev 

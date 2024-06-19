FROM node:22-alpine AS base

WORKDIR /backend

COPY ../nest/ /backend

EXPOSE 3001

CMD npm install && npm run start:dev 

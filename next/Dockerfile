FROM node:22-alpine AS base

WORKDIR /frontend

COPY ../next/ /frontend

EXPOSE 3000

CMD npm install && npm run dev 

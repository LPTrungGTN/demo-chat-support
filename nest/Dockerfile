FROM node:22-alpine AS base


RUN apk add --no-cache python3 python3-dev py3-pip build-base
RUN ln -sf python3 /usr/bin/python

COPY package*.json ./

RUN npm ci --omit=dev

RUN npm install -g @nestjs/cli

COPY . ./

RUN npm run db:generate

RUN npm run build

CMD npm run start
FROM node:16.4-alpine3.14 as builder

WORKDIR /app

COPY ./package*.json ./

COPY . /app

WORKDIR /app/backend

RUN yarn
RUN yarn build

EXPOSE 8000
CMD [ "yarn", "start" ]

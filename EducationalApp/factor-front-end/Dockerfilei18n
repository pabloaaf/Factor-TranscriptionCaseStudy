### STAGE 1: Build ###

FROM node:10-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN apk add g++ make python
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
# RUN npm update
# RUN npm run ng help
RUN npm run-script build:i18n --prod


### STAGE 2: Setup ###

FROM nginx:1.17.3-alpine

#send dist to base route nginx
COPY --from=builder /ng-app/dist/factor/ /usr/share/nginx/html
#WORKDIR /usr/share/nginx/html
#ADD ./dist/factor/ .

#update nginx config
ADD nginx.conf /etc/nginx/nginx.conf

#outside port
EXPOSE 80

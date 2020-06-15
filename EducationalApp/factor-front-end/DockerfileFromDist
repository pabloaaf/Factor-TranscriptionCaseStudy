FROM nginx:1.17.3-alpine

#send dist to base route nginx
WORKDIR /usr/share/nginx/html
ADD ./dist/factor/ .

#update nginx config
ADD nginx.conf /etc/nginx/nginx.conf

#outside port
EXPOSE 80
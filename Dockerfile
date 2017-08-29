FROM node:6-slim

USER root

COPY nginx.list /etc/apt/sources.list.d/nginx.list
COPY nginx_signing.key /tmp/nginx_signing.key

RUN apt-key add /tmp/nginx_signing.key && \
    apt-get update && \
    apt-get install -y --no-install-recommends nginx && \
    apt-get clean

CMD bash

COPY nginx.conf /etc/nginx/nginx.conf

COPY . /angular
WORKDIR /angular

RUN npm i -g @angular/cli@latest && \
    npm install
RUN ng build --prod

EXPOSE 80

RUN chmod +x /angular/run.sh
ENTRYPOINT ["/angular/run.sh"]

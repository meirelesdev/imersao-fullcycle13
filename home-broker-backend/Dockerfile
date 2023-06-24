FROM node:20-slim

WORKDIR /home/node/app

RUN apt-get update -y && apt-get install -y openssl && apt-get install net-tools

USER node

EXPOSE 3000

CMD [ "tail", "-f", "/dev/null" ]
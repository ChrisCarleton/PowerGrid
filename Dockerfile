FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --loglevel error

RUN npm install -g --loglevel error gulp

COPY . /usr/src/app

EXPOSE 28988
ENTRYPOINT ["npm","run"]

CMD ["start"]

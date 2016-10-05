FROM node:6.7.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install build-essential -y

COPY package.json /usr/src/app/
RUN npm install --loglevel error

RUN npm install -g --loglevel error gulp

COPY . /usr/src/app

EXPOSE 28988
ENTRYPOINT ["npm","run"]

CMD ["start"]

FROM node:8.9.0-alpine

RUN mkdir /app
WORKDIR /app

COPY Gruntfile.js package.json yarn.lock /app/
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY app /app/app
COPY server.js app.js post-data.js /app/

RUN yarn setup

EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/npm", "run", "dev"]

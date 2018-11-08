FROM node:8.9.4-alpine

WORKDIR /app

COPY Gruntfile.js package.json yarn.lock /app/
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY app /app/app
COPY config /app/config
COPY server.js app.js app-insights.js paths.js /app/

RUN yarn setup

EXPOSE 3000
CMD ["npm", "start"]

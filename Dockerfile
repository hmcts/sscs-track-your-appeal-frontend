FROM node:7.2

RUN ["mkdir", "/app"]
ADD . /app
WORKDIR /app

# Add package.json separately to bust docker build cache
ADD package.json /app/package.json
RUN ["npm", "install"]

ENV PATH="./node_modules/.bin:$PATH"

# Add Gruntfile.js separately to bust docker build cache
ADD Gruntfile.js /app/Gruntfile.js
RUN ["npm", "run", "generate-assets"]

EXPOSE 3000
CMD ["/usr/local/bin/npm", "run", "dev"]

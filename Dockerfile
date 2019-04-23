# ---- Base image ----
FROM node:8.9.4-alpine as base
ENV PATH="./node_modules/.bin:$PATH"
ENV WORKDIR /app
WORKDIR ${WORKDIR}
COPY package.json yarn.lock ./
RUN yarn install \
    --ignore-scripts \
    --production

# ---- Build image ----
# Yarn will install the missing dev dependencies
# then execute the setup post-install npm script hook.
# This image is only used to generate the bundles
FROM base as build
COPY app ./app
COPY config ./config
COPY Gruntfile.js server.js app.js app-insights.js paths.js ./
RUN yarn install

# ---- Runtime image ----
FROM base as runtime
COPY --from=build $WORKDIR/app ./app
COPY --from=build $WORKDIR/config ./config
COPY --from=build $WORKDIR/govuk_modules ./govuk_modules
COPY --from=build $WORKDIR/lib ./lib
COPY --from=build $WORKDIR/public ./public
COPY --from=build $WORKDIR/Gruntfile.js \
    $WORKDIR/server.js \
    $WORKDIR/app.js \
    $WORKDIR/app-insights.js \
    $WORKDIR/paths.js \
    ./
EXPOSE 3000
CMD ["npm", "start"]

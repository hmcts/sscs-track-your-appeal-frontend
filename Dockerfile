# ---- Base image ----
FROM hmcts.azurecr.io/hmcts/base/node/alpine-lts-8:latest as base
ENV PATH="./node_modules/.bin:$PATH"
COPY package.json yarn.lock ./
RUN yarn install \
    --ignore-scripts \
    --production

# ---- Build image ----
# Yarn will install the missing dev dependencies
# then execute the setup post-install npm script hook.
# This image is only used to generate the bundles
FROM base as build
RUN yarn install --ignore-scripts && npm rebuild node-sass
COPY . .
RUN yarn setup \
    && rm -rf node_modules

# ---- Runtime image ----
FROM base as runtime
COPY --from=build $WORKDIR .
EXPOSE 3000

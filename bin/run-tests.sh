#!/bin/bash
set -ex

COMPOSE_FILE="docker/test-compose.yml"

# Trap errors or exits and close everything
function shutdownDocker() {
 docker-compose -f ${COMPOSE_FILE} down
}


trap shutdownDocker INT TERM QUIT EXIT

export FRONTEND_URL=${TEST_URL}

docker-compose -f ${COMPOSE_FILE} run $1
shutdownDocker
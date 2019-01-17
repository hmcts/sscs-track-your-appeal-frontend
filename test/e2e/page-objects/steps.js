'use strict';

const requireDirectory = require('require-directory');
const steps = requireDirectory(module);

function setActorActions(data) {

  let actions = {};

  for (let k in data) {

    if (data.hasOwnProperty(k)) {

      actions[k] = data[k];
    }
  }

  return actions;
}

module.exports = function () {

  let actions = {};

  let stepsKeys = Object.keys(steps);

  for (let step in stepsKeys) {

    let sectionKeys = Object.keys(steps[stepsKeys[step]]);

    for (let section in sectionKeys) {

      actions = Object.assign(setActorActions(steps[stepsKeys[step]][sectionKeys[section]]), actions);
    }
  }

  return actor(actions);
};

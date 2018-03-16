const { filters } = require('app/core/tyaNunjucks');
const nunjucks = require('nunjucks');

const environment = () => {
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader());
  Object.keys(filters).map((key)=> env.addFilter(key, filters[key]));
  return env;
};

module.exports = { environment };

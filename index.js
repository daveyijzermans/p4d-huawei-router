'use-strict'

var Router = require('./core/Router')
var defaults = require('./defaults')

/**
 * Create an instance of Router
 *
 * @param {Object} config The config for the instance
 * @return {Router} A new instance of Router
*/
var router = (config) =>
{
  let c = Object.assign(defaults, config);
  var instance = new Router(c);
  return instance;
}

module.exports = router

// Allow use of default import syntax in TypeScript
module.exports.default = router
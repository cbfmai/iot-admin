var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_PROTOCOL : '"http"',
  API_SERVER : '"10.204.107.246"',
  API_PORT: '"9080"'
})

const {
  defaults
} = require('jest-config')
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'vue'],
  transform: {
    ...defaults.transform,
    '^.+\\.js?$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  }
}

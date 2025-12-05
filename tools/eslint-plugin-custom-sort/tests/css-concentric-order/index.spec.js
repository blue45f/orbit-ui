const { RuleTester } = require('eslint')

const { VALID_CASES } = require('./valid-case.js')
const { INVALID_CASES } = require('./invalid-case.js')

const concentricCSSRule = require('../../lib/css-concentric-order/index.js')

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
})

ruleTester.run('css-concentric-order', concentricCSSRule, {
  valid: VALID_CASES,
  invalid: INVALID_CASES,
})

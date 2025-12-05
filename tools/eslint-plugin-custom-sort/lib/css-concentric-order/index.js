const { Manager } = require('./manager.js')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion', // 에러 수준은 아닌 컨벤션
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          targetFormats: {
            type: 'array',
          },
          targetCalleeNames: {
            type: 'array',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    return {
      CallExpression(node) {
        const manager = new Manager(context, node)

        manager.fix()
      },
    }
  },
}

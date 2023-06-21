/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: '@antfu',
  rules: {
    '@typescript-eslint/ban-ts-comment': 'arrow',
  },
}

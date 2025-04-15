export default {
  '!(*.d|*.config).{ts,tsx}': 'eslint --fix --max-warnings 0 --ignore-pattern !.storybook/',
  '*.{cjs,mjs,js,json,jsx,d.ts}': 'prettier --write',
}

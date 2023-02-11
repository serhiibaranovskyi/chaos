module.exports = {
  // disable svelte for now https://github.com/sveltejs/prettier-plugin-svelte/issues/240
  // '**/*.{svelte,ts,js,cjs}': 'eslint --cache --fix',
  '**/*.{ts,js,cjs}': 'eslint --cache --fix',
  './**/*.{json,md,html,css}': 'prettier --write',
}

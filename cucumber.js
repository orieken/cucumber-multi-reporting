const formatOptions = JSON.stringify({
  snippetInterface: 'async-await',
  snippetSyntax: './features/support/snippets/ts-snippets-syntax.js',
});

const common = `
  --require features/**/*.ts
  --require-module ts-node/register
  --format @cucumber/pretty-formatter
  --format-options ${formatOptions}
  `;

module.exports = {
  default: `${common}`,
};

module.exports = {
  jsxSingleQuote: true,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.hbs',
      options: {
        parser: 'glimmer',
      },
    },
  ],
};

module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    ...require('../../.eslintrc.js').rules,
    '@typescript-eslint/no-var-requires': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@mui/material', '@mui/material/*'],
            message:
              "Please use import from 'components/ui/*' or 'styles/*' instead",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/*.*'],
      rules: {
        '@typescript-eslint/no-var-requires': 'error',
      },
    },
    {
      files: [
        'src/components/ui/**',
        'src/styles/**',
        'components/ui/**',
        'styles/**',
      ],
      rules: {
        'no-restricted-imports': [
          'off',
          {
            patterns: ['@mui/material', '@mui/material/*'],
          },
        ],
      },
    },
  ],
}

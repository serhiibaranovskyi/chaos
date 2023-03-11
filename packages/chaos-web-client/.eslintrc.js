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
            group: ['@mui/material', '@mui/material/*', '@mui/icons-material'],
            message:
              "Please use import from '@/shared/components/*' or '@/shared/styles/*' instead",
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
        'src/shared/components/**',
        'src/shared/styles/**',
        'shared/components/**',
        'shared/styles/**',
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

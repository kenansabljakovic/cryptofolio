// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // Point to your tsconfig for type-aware rules
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
    tailwindcss: {
      // Optional: Provide custom Tailwind config path if not default
      // configFile: './tailwind.config.ts', // Adjusted for .ts extension if needed
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:tailwindcss/recommended',
    'eslint-config-next/core-web-vitals',
    // IMPORTANT: Must be last to override other configs
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'jsx-a11y', 'prettier', 'tailwindcss'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/classnames-order': 'warn',
  },
  // Ignore generated files and config files from linting
  ignorePatterns: [
    '.eslintrc.js',
    '.prettierrc.js',
    'node_modules/',
    '.next/',
    'out/',
    'build/',
    'jest.config.js',
    'jest.setup.js',
  ],
};

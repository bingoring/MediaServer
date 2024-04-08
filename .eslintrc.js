module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.base.json',
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '**/dist',
    '**/node_modules/**/*',
    'node_modules/**/*',
    '**/*.js',
    '**/*.json',
    '**/README.md',
    '**/.DS_Store',
    '**/data.spec.ts',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
        tabWidth: 4,
        useTabs: false,
        semi: true,
        trailingComma: 'es5',
        endOfLine: 'auto',
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    '@typescript-eslint/no-throw-literal': ['error'],
    'no-unsafe-optional-chaining': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-useless-return': 'warn',
    'no-new-object': 'error',
    'object-shorthand': 'error',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'prefer-arrow-callback': 'error',
    'no-case-declarations': 'error',
    'no-unneeded-ternary': 'error',
    'brace-style': ['warn', '1tbs'],
    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true,
        ignoreImports: true,
        allow: ['redirect_uris'],
      },
    ],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'off',
          parameterProperties: 'off',
        },
      },
    ],
    '@typescript-eslint/prefer-readonly': 'error',
    eqeqeq: 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allowSingleOrDouble',
      },
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'variable',
        types: ['array'],
        format: ['camelCase', 'PascalCase'],
        suffix: ['List'],
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'class',
        modifiers: ['abstract'],
        format: ['PascalCase'],
        prefix: ['Abstract'],
      },
      {
        selector: 'classProperty',
        modifiers: ['readonly'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allowSingleOrDouble',
      },
      {
        selector: 'classProperty',
        modifiers: ['requiresQuotes'],
        format: null,
      },
      {
        selector: ['interface', 'typeAlias'],
        format: ['PascalCase'],
        // suffix: ['Type'],
      },
      {
        selector: ['typeParameter'],
        format: ['PascalCase'],
        custom: {
          regex: '^[A-Z][a-zA-Z]*Type$',
          match: false,
        },
      },
      {
        selector: ['typeProperty'],
        format: null,
      },
      {
        selector: ['objectLiteralProperty'],
        format: null,
      },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        classes: [
          'instance-field',
          'static-field',
          'abstract-field',
          'constructor',
          'instance-method',
          'static-method',
          'abstract-method',
        ],
      },
    ],
  },
};

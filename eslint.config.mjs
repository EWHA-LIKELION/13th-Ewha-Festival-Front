import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    }
  },
  pluginReact.configs.flat.recommended,
  prettierConfig,
  // import 정렬 규칙
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  }
];

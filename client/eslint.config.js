// Eslint config makes sure that there is no error or bug in our code before we run our app.
import js from '@eslint/js'; // For basic js rules. Like not using var that aren't defined or functions that aren't used.
import reactHooks from 'eslint-plugin-react-hooks'; // For rules of react hooks. Like not using state inside an if statement.
import reactRefresh from 'eslint-plugin-react-refresh'; // For rules of hot-reloading. Like preventing a component from unmounting when it should be mounted.
import { defineConfig, globalIgnores } from 'eslint/config'; // For defining the config.
import globals from 'globals'; // For browser globals. It tells eslint that browser related variables like 'document' or 'window' are allowed.

export default defineConfig([
  globalIgnores(['dist']), // Since dist is production code it is minfied which is intentionally hard to read so we ignore it.
  {
    files: ['**/*.{js,jsx}'], // We only want to run eslint on js and jsx files.
    extends: [
      js.configs.recommended, // Recommended rules for js
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020, // Using the modern ecma features like backticks.
      globals: globals.browser, // Allowing browser related vars.
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module', // Allowing import/export syntax.
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // Eslint gives warning when we create a var that we don't use.
      // 'no-unused-vars' is the rule that we are ignoring.
      // The 'error' means that it will stop the build process if it finds an unused var.
      // The ignore pattern ^[A-Z_] means if a var start with capital letters[React Components] or underscore[_data] then eslint will ignore it.
    },
  },
])

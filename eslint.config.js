import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,

  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',

      'vue/no-v-html': 'off',
      'vue/no-mutating-props': 'error',
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',

      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'es5',
          endOfLine: 'auto',
          vueIndentScriptAndStyle: true,
          tabWidth: 2,
          printWidth: 80,
          singleAttributePerLine: true,
        },
      ],
    },
  },
];

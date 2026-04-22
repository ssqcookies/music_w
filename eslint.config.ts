
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    'prettier', // ✅ 关闭 ESLint 格式规则
  ],
  files: ['**/*.{ts,tsx}'],
  globals: {
    ...globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    prettier, // ✅ 启用 Prettier 插件
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
       // 关闭必须导入 React 才能用 JSX 的规则
      'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error', // ✅ 格式错误标红
    '@typescript-eslint/no-explicit-any': 'off', // 可选，宽松一点
  },
});
module.exports = {
  root: true,
  rules: {
    'no-shadow': 'off',
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: true,
      jsx: true,
    },
  },
  plugins: ['react', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native-community',
  ],
};

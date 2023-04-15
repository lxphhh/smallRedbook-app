module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
  plugins: ['unused-imports'],
};

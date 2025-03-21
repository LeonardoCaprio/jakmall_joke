module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@model': './src/model',
          '@service': './src/service',
          '@assets': './src/assets',
          '@design': './src/design',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.jpg', '.jpeg'],
      },
    ],
  ],
};

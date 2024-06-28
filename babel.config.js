module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@shared': './src/shared',
            '@styles': './src/styles',
            '@utils': './src/utils',
            '@routes': './src/routes',
            '@storage': './src/storage',
            '@configs': './src/configs',
          },
        },
      ],
    ],
  };
};

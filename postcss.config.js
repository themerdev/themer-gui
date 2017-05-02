module.exports = {
  plugins: [
    require('postcss-cssnext')({
      features: {
        customProperties: {
          warnings: false,
        },
      },
    }),
  ],
};

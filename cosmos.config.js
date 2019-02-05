module.exports = {
  next: true,
  rootPath: './src',
  globalImports: ['semantic-ui-css/semantic.min.css'],
  webpack: (config, { env }) => {
    // Return customized config
    return {
      ...config,
      resolve: {
        extensions: [...config.resolve.extensions, '.ts', '.tsx']
      },
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.tsx?$/,
            loader: 'babel-loader'
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader'
              }
            ]
          }
          // {
          //   test: /\.js$/,
          //   use: ['source-map-loader'],
          //   enforce: 'pre'
          // }
        ]
      }
    };
  }
};

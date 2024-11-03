const { DefinePlugin } = require("webpack");

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".feature"],
  },
  module: {
    rules: [
      {
        test: /\.feature$/,
        use: [
          {
            loader: require.resolve("@badeball/cypress-cucumber-preprocessor/loader"), // Using require.resolve
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
      },
    }),
  ],
};

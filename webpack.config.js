// Import the DefinePlugin from webpack, which allows defining global constants
const { DefinePlugin } = require("webpack");

module.exports = {
  // Resolve file extensions in this order, so imports can omit the extensions
  resolve: {
    extensions: [".js", ".ts", ".feature"], // Enables importing these types without specifying the extension
  },
  module: {
    rules: [
      {
        // Rule for processing .feature files (Cucumber feature files)
        test: /\.feature$/, // Matches all .feature files
        use: [
          {
            // Specifies the loader to process .feature files with Cypress Cucumber preprocessor
            loader: require.resolve("@badeball/cypress-cucumber-preprocessor/loader"), // Resolve the loader path
          },
        ],
      },
      {
        // Rule for processing .ts (TypeScript) files
        test: /\.ts$/, // Matches all .ts files
        exclude: /node_modules/, // Excludes node_modules to avoid processing third-party files
        use: [
          {
            loader: "ts-loader", // Use ts-loader to compile TypeScript files to JavaScript
          },
        ],
      },
    ],
  },
  plugins: [
    // Plugin to define global constants
    new DefinePlugin({
      // Define environment variables accessible within the code
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"), // Sets NODE_ENV to the current environment or defaults to "development"
      },
    }),
  ],
};

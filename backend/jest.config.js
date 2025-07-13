/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/tests/**/*.[jt]s?(x)"], // Only run tests from the ./tests directory
  testPathIgnorePatterns: [
    "/node_modules/"
    , "/dist/"
    , "/tests/helpers/"
  ], // Ignore the dist directory
  reporters: [
    "default", // Keep the default console reporter
    ["jest-html-reporters", {
      publicPath: "./reports",
      filename: "index.html", // Change the report filename to index.html
      expand: true
    }]
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageDirectory: "./reports/coverage"
};

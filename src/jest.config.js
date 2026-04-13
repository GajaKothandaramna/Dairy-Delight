// export default {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
//   moduleNameMapper: {
//     "\\.(css|scss)$": "identity-obj-proxy",
//   },
// };

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
};
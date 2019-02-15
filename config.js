/**
 * Config File
 */

const config = {
  development: {
    httpPort: 3000,
    envName: "development"
  },
  production: {
    httpPort: 5000,
    envName: "production"
  }
};

const exportedConfig =
  process.env.NODE_ENV === "production"
    ? config.production
    : config.development;

module.exports = exportedConfig;

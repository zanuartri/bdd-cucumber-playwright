module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["features/support/**/*.ts", "features/step_definitions/**/*.ts"],
    format: ["progress-bar", "json:results/cucumber-report.json"],
    paths: ["features/**/*.feature"],
  },
};

const ora = require('ora');

exports.loading = (fn, text) => async (...args) => {
  const spinner = ora(text).start();
  const result = await fn(...args);
  spinner.succeed();
  return result;
};

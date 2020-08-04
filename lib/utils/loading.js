const ora = require('ora');

exports.loading = (fn, text) => async (...args) => {
  let spinner = ora(text).start();
  let result = await fn(...args);
  spinner.succeed();
  return result;
}

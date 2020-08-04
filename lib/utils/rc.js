const fs = require('fs-extra');
const { RC_PATH, DEFAULTS } = require('./constants');

exports.get = async (k) => {
  let isExits = await fs.exists(RC_PATH);
  let config;
  if (isExits) {
    config = await fs.readJson(RC_PATH);
    return config[k];
  }
  return undefined;
}

exports.set = async (k, v) => {
  let isExits = await fs.exists(RC_PATH);
  let config;
  if (isExits) {
    config = await fs.readJson(RC_PATH);
    Object.assign(config, { [k]: v });
  } else {
    config = Object.assign(DEFAULTS, { [k]: v });
  }

  await fs.writeFile(RC_PATH, JSON.stringify(config, null, 2), 'utf8');
}

exports.unset = async (k) => {
  let isExits = await fs.exists(RC_PATH);
  let config;
  if (isExits) {
    config = await fs.readJson(RC_PATH);
    delete config[k]
    await fs.writeFile(RC_PATH, JSON.stringify(config, null, 2), 'utf8');
  }
}

exports.getAll = async () => {
  let isExits = await fs.exists(RC_PATH);
  let config;
  if (isExits) {
    config = await fs.readJson(RC_PATH);
    return config;
  }
  return {};
}

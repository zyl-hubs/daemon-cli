const os = require('os');
const { version } = require('../../package.json');

const HOME = os.homedir();
// 配置文件的路径
const RC_PATH = `${HOME}/.daemonrc`;

// 配置模板下载的地方
const DOWNLOAD = `${HOME}/.template`;

// 默认配置
const DEFAULTS = {
  registry: 'zyl-hubs',
  type: 'orgs',
};

module.exports = {
  VERSION: version,
  RC_PATH,
  DOWNLOAD,
  DEFAULTS,
};

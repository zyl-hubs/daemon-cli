const inquirer = require('inquirer');
const ora = require('ora');
const { fetchRepoList, fetchTagList, downloadLocal } = require('./utils/fetch');

module.exports = async (name, cmd) => {
  console.log(process.argv)
  console.log(name, cmd)
  // 下载远程仓库代码
}

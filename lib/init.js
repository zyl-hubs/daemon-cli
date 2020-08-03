const inquirer = require('inquirer');
const ora = require('ora');
const { fetchRepoList, fetchTagList, downloadLocal } = require('./utils/fetch');

module.exports = async (name, cmd) => {
  // console.log(process.argv)
  // console.log(name, cmd)
  // 下载远程仓库代码
  // 1.下载模板
  let spinner = ora('fetch templates ...').start();
  let repos = await fetchRepoList();
  spinner.succeed();
  repos = repos.map(({name}) => name).filter(item => item.includes('template'));
  console.log('repos: ', repos);
}

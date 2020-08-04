const inquirer = require('inquirer');
const { loading } = require('./utils/loading');
const { fetchRepoList, fetchTagList, downloadLocal } = require('./utils/fetch');

module.exports = async (name, cmd) => {
  // console.log(process.argv)
  // console.log(name, cmd)
  // 下载远程仓库代码
  // 1.下载模板
  let repos = await loading(fetchRepoList, 'fetch templates ...')()
  repos = repos.map(({name}) => name).filter(item => item.includes('template'));
  console.log('repos: ', repos);
  // 查询版本
  
}

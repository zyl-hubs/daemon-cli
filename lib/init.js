const path = require('path');
const inquirer = require('inquirer');
const ncp = require('ncp');
const chalk = require('chalk');
const { loading } = require('./utils/loading');
const { fetchRepoList, fetchTagList, downloadLocal } = require('./utils/fetch');

module.exports = async (name, cmd) => {
  // console.log(process.argv)
  // console.log(name, cmd)
  // 下载远程仓库代码
  try {
    // 1.下载模板
    let repos = await loading(fetchRepoList, 'fetch templates ...')();
    repos = repos.map(({name}) => name).filter(item => item.includes('template'));
    // console.log('repos: ', repos);
    // 询问，选择需要的模板
    const questionForRepo = {
      name: 'repo',
      type: 'list',
      message: 'please choose a template to create project',
      choices: repos
    }
    let { repo } = await inquirer.prompt(questionForRepo);
    // console.log('selected repo: ', repo)
    // 2.获取项目版本，选择要下载的版本
    let tags = await loading(fetchTagList, 'fetch tags ...')(repo);
    tags = tags.map(({name}) => name);
    // console.log('tags: ', tags)
    let result = '';
    if (Array.isArray(tags) &&  tags.length > 0) {
      // 询问，选择需要的版本
      const questionForTag = {
        name: 'tag',
        type: 'list',
        message: 'please choose a tag',
        choices: tags
      }
      let { tag } = await inquirer.prompt(questionForTag);
      // console.log('selected tag: ', tag)
      // 3.下载对应版本的模板到本地
      result = await loading(downloadLocal, 'download project ...')(repo, tag)
    } else {
      result = await loading(downloadLocal, 'download project ...')(repo)
    }
    // 4.生成项目 根据传入的name作为目录名
    await ncp(result, path.resolve(name));
    /**
     * #TODO 
     * 如果有ask.js或ask.json文件，根据询问用户输入值插入到项目模板中，那么下载后就需要对模板进行编译后再生成项目
     */
    console.log(chalk.green('\r\n ' + 'Done'))
    console.log(chalk.green('\r\n ' + 'You can run: '))
    console.log(chalk.green('\r\n ' + chalk.cyan('    ' + 'npm install'))) // # TODO 后续应开辟子线程去执行依赖安装
    console.log(chalk.green('\r\n ' + 'and'))
    console.log(chalk.green('\r\n ' + chalk.cyan('    ' + 'npm run start')))
  } catch (error) {
    console.log(error)
    process.exit();
  }
}

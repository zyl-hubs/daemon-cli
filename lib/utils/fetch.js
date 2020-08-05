const request = require('request');
const downloadGitRepo = require('download-git-repo');
const chalk = require('chalk');
const { getAll } = require('./rc');
const { DOWNLOAD } = require('./constants');

const fetch = async (url) => {
  return new Promise((resolve, reject) => {
    const config = {
      url,
      method: 'GET',
      headers: {
        'user-agent': 'zzz' // 必须要加上这个，不然会forbidden，值随便加就行
      }
    }
    request(config, (err, response, body) => {
      if (err) reject();
      body ? resolve(JSON.parse(body)) : console.log(chalk.red('Network error. Please try again later'));
    })
  })
}

exports.fetchRepoList = async () => {
  const { type, registry } = await getAll();
  const api = `https://api.github.com/${type}/${registry}/repos`;
  return await fetch(api);
}

exports.fetchTagList = async (project) => {
  const { registry } = await getAll();
  const api = `https://api.github.com/repos/${registry}/${project}/tags`;
  return await fetch(api);
}

const download = async (src, dest) => {
  return new Promise((resolve, reject) => {
    downloadGitRepo(src, dest, (err) => {
      if (err) reject(err);
      resolve();
    })
  })
}

exports.downloadLocal = async (project, version) => {
  const { registry } = await getAll();
  let api = `${registry}/${project}`;
  if (version) {
    api += `#${version}`;
  }
  const dest = `${DOWNLOAD}/${project}`;
  await download(api, dest);
  return dest;
}

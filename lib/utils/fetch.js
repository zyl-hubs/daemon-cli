const request = require('request');
const downloadGitRepo = require('download-git-repo');
const { getAll } = require('./rc');
const { DOWNLOAD } = require('../constants');

exports.fetch = async (url) => {
  return new Promise((resolve, reject) => {
    const config = {
      url,
      method: 'GET',
      headers: {
        'user-agent': 'zzz'
      }
    }
    request(config, (err, response, body) => {
      if (err) reject();
      resolve(JSON.parse(body));
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

exports.download = async (src, dest) => {
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
    api += `#${version}`
  }
  return await download(api, DOWNLOAD + '/' + project);
}

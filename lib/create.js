const fs = require('fs');
const path = require('path');
const MetalSmith = require('metalsmith'); // 模板编译
const ncp = require('ncp');
const inquirer = require('inquirer');
const { render } = require('consolidate').ejs;

module.exports = async (name, cmd, result) => {
  /**
   * #TODO
   * 1、如果有ask.js或ask.json文件，根据询问用户输入值插入到项目模板中，那么下载后就需要对模板进行编译后再生成项目
   * 2、生成项目后开辟子进程安装依赖
   * 3、展示依赖安装进度
   */
  // console.log(name, cmd);
  if (!fs.existsSync(path.join(result, 'ask.js'))) {
    // 直接拷贝
    await ncp(result, path.resolve(name));
  } else {
    // 把git上的项目下载下来，如果有ask文件就是一个复杂的模板，需要用户选择，选择后编译模板
    await new Promise((resolve, reject) => {
      MetalSmith(__dirname) // 如果你传入路径，默认遍历当前路径下的src文件夹
        .source(result)
        .destination(path.resolve(name))
        .use(async (files, metal, done) => {
          // eslint-disable-next-line global-require
          const args = require(path.join(result, 'ask.js'));
          const obj = await inquirer.prompt(args);

          const meta = metal.metadata();
          Object.assign(meta, obj);
          // eslint-disable-next-line no-param-reassign
          delete files['ask.js'];
          done();
        })
        .use((files, metal, done) => {
          const obj = metal.metadata();
          Reflect.ownKeys(files).forEach(async (file) => {
            // 是要处理的文件
            if (file.includes('js') || file.includes('json')) {
              let content = files[file].contents.toString(); // 文件的内容
              if (content.includes('<%')) {
                content = await render(content, obj);
                // eslint-disable-next-line no-param-reassign
                files[file].contents = Buffer.from(content); // 渲染结果
              }
            }
          });
          done();
        })
        .build((err) => {
          if (err) {
            reject();
          } else {
            resolve();
          }
        });
    });
  }
};
